require("dotenv").config();

module.exports = {
  SECRET: process.env.APP_SECRET,
  DB: process.env.APP_DB,
  PORT: process.env.PORT,
  CLIENT_URL: process.env.CLIENT_URL,
};
