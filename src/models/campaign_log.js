const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Campaign = require("./campaign");

class CampaignLog extends Model {}

CampaignLog.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    logDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    impressionCount: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    clickCount: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    viewed25Count: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    viewed50Count: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    viewed75Count: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    viewed100Count: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    sequelize,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["campaign_id", "log_date"],
      },
    ],
  }
);

Campaign.hasMany(CampaignLog, {
  foreignKey: "campaignId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
CampaignLog.belongsTo(Campaign, {
  foreignKey: "campaignId",
});

module.exports = CampaignLog;
