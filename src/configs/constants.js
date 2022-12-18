require("dotenv").config();

const port = process.env.PORT || 8080;

// database config

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "test";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";

module.exports = {
  port,
  dbHost,
  dbName,
  dbUser,
  dbPassword,
};
