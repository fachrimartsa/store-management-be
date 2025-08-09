import postgres from 'postgres';

const connectionString = 'postgresql://postgres:password@host:port/database';

const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }
});

export default sql;
