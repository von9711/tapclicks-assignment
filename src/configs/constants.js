require("dotenv").config();

const port = process.env.PORT || 8080;

// database config

const host = process.env.SERVER_HOST || "localhost";
const database = process.env.DATABASR || "test";
const user = process.env.USER || "";
const password = process.env.PASSWD || "";

module.exports = {
  port,
  host,
  database,
  user,
  password,
};
