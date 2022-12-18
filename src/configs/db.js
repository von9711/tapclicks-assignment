const { Sequelize } = require("sequelize");
const { database, user, password, host } = require("./constants");

// connect to database
const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

// testing database connection
async function checkDBConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Unable to connect to database");
    console.log(err);
  }
}

checkDBConnection();

module.exports = { sequelize, checkDBConnection };
