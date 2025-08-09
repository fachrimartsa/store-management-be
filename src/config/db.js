const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:fachri1164@db.lyqpmcszxykrnnsljkkf.supabase.co:5432/postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
