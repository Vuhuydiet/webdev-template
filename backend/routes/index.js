import express from 'express';
const router = express.Router();

import { servePath, serveIndexPath } from '../configs/serve.config.js';

import accessRouter from './access';

app.use(express.static(servePath));
app.use('/', (req, res) => {
  res.sendFile(serveIndexPath);
});

app.get('/v1/api', accessRouter);

export default router;