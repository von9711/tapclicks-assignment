const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const Creative = require("./creative");

class CreativeLog extends Model {}

CreativeLog.init(
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
        fields: ["creative_id", "log_date"],
      },
    ],
  }
);

Creative.hasMany(CreativeLog, {
  foreignKey: "creativeId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});
CreativeLog.belongsTo(Creative, {
  foreignKey: "creativeId",
});

module.exports = CreativeLog;
