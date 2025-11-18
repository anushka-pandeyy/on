const { Pool } = require('pg');
const config = require('./app/config/db.config');

const pool = new Pool({
  host: config.HOST || process.env.PGHOST || 'localhost',
  user: config.USER || process.env.PGUSER || 'postgres',
  password: config.PASSWORD || process.env.PGPASSWORD || '',
  database: config.DB || process.env.PGDATABASE || 'testdb',
  port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
  max: (config.pool && config.pool.max) || 5,
  idleTimeoutMillis: (config.pool && config.pool.idle) || 10000,
});

module.exports = { pool };
