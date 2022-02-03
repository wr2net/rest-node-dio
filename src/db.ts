import { Pool } from 'pg';

const connectionString = process.env['DATABASE_STRING'];
const db = new Pool({ connectionString });

export default db;