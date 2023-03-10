const csv = require("csv-parser");
const fs = require("fs");
const { sequelize } = require("../configs/db");
const {
  Campaign,
  CampaignLog,
  Order,
  OrderLog,
  Creative,
  CreativeLog,
} = require("../models");

const processLogFile = (table1, table2, groupBy, as, on) => {
  return `select ${groupBy} as ${as}, log_date as logDate,
sum(impression_count) as impressionCount,
sum(click_count) as clickCount,
sum(viewed25_count) as viewed25Count,
sum(viewed50_count) as viewed50Count,
sum(viewed75_count) as viewed75Count,
sum(viewed100_count) as viewed100Count
from ${table1} as t1 
join ${table2} as t2
on t1.${on} = t2.${on}
group by ${groupBy}, log_date
order by log_date, ${groupBy}`;
};

const generateLogFiles = async () => {
  try {
    const [creative_results] = await sequelize.query(
      processLogFile(
        "creatives",
        "creative_logs",
        "order_id",
        "orderId",
        "creative_id"
      )
    );

    if (creative_results && creative_results.length > 0)
      await OrderLog.bulkCreate(creative_results);

    const [order_results] = await sequelize.query(
      processLogFile(
        "orders",
        "order_logs",
        "campaign_id",
        "campaignId",
        "order_id"
      )
    );

    if (order_results && order_results.length > 0)
      await CampaignLog.bulkCreate(order_results);
  } catch (err) {
    console.log(err);
  }
};

const insertDataInDB = async (data) => {
  if (!data) return;

  try {
    const [campaign] = await Campaign.findOrCreate({
      where: {
        yashiCampaignId: parseInt(data["Campaign ID"], 10),
      },
      defaults: {
        yashiCampaignId: parseInt(data["Campaign ID"], 10),
        name: data["Campaign Name"],
        advertiserId: parseInt(data["Advertiser ID"], 10),
        advertiserName: data["Advertiser Name"],
      },
    });

    const [order] = await Order.findOrCreate({
      where: { yashiOrderId: parseInt(data["Order ID"], 10) },
      defaults: {
        yashiOrderId: parseInt(data["Order ID"], 10),
        name: data["Order Name"],
        campaignId: campaign.dataValues.campaignId,
      },
    });

    const [creative, created] = await Creative.findOrCreate({
      where: { yashiCreativeId: parseInt(data["Creative ID"], 10) },
      defaults: {
        yashiCreativeId: parseInt(data["Creative ID"], 10),
        name: data["Creative Name"],
        previewUrl: data["Creative Preview URL"],
        orderId: order.dataValues.orderId,
      },
    });

    await CreativeLog.create({
      logDate: new Date(data["Date"]),
      impressionCount: parseInt(data["Impressions"], 10),
      clickCount: parseInt(data["Clicks"], 10),
      viewed25Count: parseInt(data["25% Viewed"], 10),
      viewed50Count: parseInt(data["50% Viewed"], 10),
      viewed75Count: parseInt(data["75% Viewed"], 10),
      viewed100Count: parseInt(data["100% Viewed"], 10),
      creativeId: creative.dataValues.creativeId,
    });
  } catch (err) {
    console.log(err);
  }
};

const addFileDataToDB = async (fileUrls) => {
  if (!fileUrls || fileUrls?.length === 0) {
    await generateLogFiles();

    return;
  }

  const fileUrl = fileUrls.shift();

  const data = [];

  fs.createReadStream(fileUrl)
    .pipe(csv())
    .on("data", async (row) => {
      data.push(row);
    })
    .on("end", async () => {
      console.log("file successfully processed");

      for (let row of data) {
        await insertDataInDB(row);
      }

      addFileDataToDB(fileUrls);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addFileDataToDB,
  insertDataInDB,
  processLogFile,
  generateLogFiles,
};
