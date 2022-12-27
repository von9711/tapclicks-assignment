const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Order = require("./order");

class Creative extends Model {}

Creative.init(
  {
    creativeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    yashiCreativeId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    previewUrl: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    sequelize,
    underscored: true,
  }
);

Order.hasMany(Creative, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
Creative.belongsTo(Order, {
  foreignKey: "orderId",
});

module.exports = Creative;
