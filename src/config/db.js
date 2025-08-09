const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres.lyqpmcszxykrnnsljkkf:[YOUR-PASSWORD]@aws-0-us-east-2.pooler.supabase.com:6543/postgres',
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
