const { sequelize } = require("./configs/db");
const csv = require("csv-parser");
const fs = require("fs/promises");
const path = require("path");
const {
  Campaign,
  CampaignLog,
  Order,
  OrderLog,
  Creative,
  CreativeLog,
} = require("./models");
const { addFileDataToDB } = require("./utility/db");
const { getDateString } = require("./utility/util");

const processAllFiles = async () => {
  try {
    const dirPath = path.resolve("src/data_files");
    const files = await fs.readdir(dirPath);

    for (let file of files) {
      const fileDate = new Date(getDateString(file));
      if (fileDate.getMonth() === 4) {
        const fileUrl = path.join(dirPath, file);
        await addFileDataToDB(fileUrl);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

sequelize.sync({ force: true }).then(() => {
  console.log("sync done");
  //   processAllFiles();
  addFileDataToDB(path.resolve("src/data_files/Yashi_2016-05-30.csv"));
});
