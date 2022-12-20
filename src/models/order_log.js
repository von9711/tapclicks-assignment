const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Order = require("./order");

class OrderLog extends Model {}

OrderLog.init(
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
        fields: ["order_id", "log_date"],
      },
    ],
  }
);

Order.hasMany(OrderLog, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
OrderLog.belongsTo(Order, {
  foreignKey: "orderId",
});

module.exports = OrderLog;
