import dotenv from 'dotenv';
dotenv.config();
import getPath from './lib/getPath.js';
import path from 'path';

import express from 'express';
const app = express();
import cors from 'cors';

import serveInfo from './lib/getServeInfo.js'

// import routes


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// static assets
app.use(express.static(serveInfo.servePath));
app.get('*', (req, res) => {
  res.sendFile(serveInfo.serveIndexPath);
});

// routes

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
