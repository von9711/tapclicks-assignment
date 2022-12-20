const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Campaign = require("./campaign");

class Order extends Model {}

Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    yashiOrderId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);

Campaign.hasMany(Order, {
  foreignKey: "campaignId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Order.belongsTo(Campaign, {
  foreignKey: "campaignId",
});

module.exports = Order;
