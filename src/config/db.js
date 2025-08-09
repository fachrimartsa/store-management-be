const postgres = require('postgres')

const connectionString = 'postgresql://postgres.lyqpmcszxykrnnsljkkf:YOUR_PASSWORD@aws-0-us-east-2.pooler.supabase.com:6543/postgres'

const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }
})

module.exports = sql
