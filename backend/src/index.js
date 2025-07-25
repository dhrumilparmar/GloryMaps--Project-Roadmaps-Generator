import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import roadmapRoutes from './routes/roadmaproutes.js';
import { connectdb } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', roadmapRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/*splat', (req, res) => {
    console.log('Catch-all route hit:', req.path); // Add this line
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

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