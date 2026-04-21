import express from 'express';
import dotenv from 'dotenv';
import app from './app.js';
import init from './core/database/init.js';

dotenv.config();


const PORT = process.env.BACKEND_PORT;

await init();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});