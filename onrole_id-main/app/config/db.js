const { Pool } = require("pg");
const dbConfig = require("./db.config.js");

const pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: 5432,
});

module.exports = pool;
