import dotenv from 'dotenv';

dotenv.config();

const database = {
  user: process.env.DB_USER || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'e-commerce',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 7916,
}

export default database;