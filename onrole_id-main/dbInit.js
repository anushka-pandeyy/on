const { pool } = require('./db');

const createInfoTable = `
CREATE TABLE IF NOT EXISTS info (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function init() {
  try {
    await pool.query(createInfoTable);
    console.log('✅ `info` table is ready');
  } catch (err) {
    console.error('Failed to ensure `info` table:', err);
  }
}

module.exports = { init };
