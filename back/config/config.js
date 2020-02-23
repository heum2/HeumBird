const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "heumbird",
    host: "127.0.0.1",
    timezone: "+09:00",
    dialect: "mysql",
    operatorsAliases: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "heumbird",
    timezone: "+09:00",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "heumbird",
    timezone: "+09:00",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  }
};
