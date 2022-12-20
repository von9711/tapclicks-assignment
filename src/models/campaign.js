const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");

class Campaign extends Model {}

Campaign.init(
  {
    campaignId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    yashiCampaignId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    advertiserId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    advertiserName: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);

module.exports = Campaign;
