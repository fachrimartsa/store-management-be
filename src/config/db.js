import postgres from 'postgres';

const sql = postgres('postgresql://postgres.lyqpmcszxykrnnsljkkf:YOUR_PASSWORD@aws-0-us-east-2.pooler.supabase.com:6543/postgres', {
  ssl: {
    rejectUnauthorized: false
  }
});

export default sql;
