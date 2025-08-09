import postgres from 'postgres';

const connectionString = 'postgresql://postgres:fachri1164@db.lyqpmcszxykrnnsljkkf.supabase.co:5432/postgres';

const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }
});

export default sql;
