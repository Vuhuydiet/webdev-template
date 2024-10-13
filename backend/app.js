import dotenv from 'dotenv';
dotenv.config();
import getPath from './lib/getPath.js';
import path from 'path';

import express from 'express';
const app = express();
import cors from 'cors';

// import routes


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// static assets
const envArg = process.argv.find(arg => arg.startsWith('NODE_ENV='));
const NODE_ENV = envArg ? envArg.split('=')[1] : null;
const servePath = (() => { 
  switch (NODE_ENV) {
    case 'production': return getPath(import.meta.url, '../frontend/dist');
    case 'development': return getPath(import.meta.url, '../frontend');
  }
  console.error('NODE_ENV not set');
  process.exit(1);
})();
const serveIndexPath = path.join(servePath, 'index.html');
app.use(express.static(servePath));
app.get('*', (req, res) => {
  res.sendFile(serveIndexPath);
});

// routes

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
