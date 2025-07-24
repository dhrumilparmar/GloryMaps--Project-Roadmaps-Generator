import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import roadmapRoutes from './routes/roadmaproutes.js';
import { connectdb } from './config/db.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', roadmapRoutes);

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });