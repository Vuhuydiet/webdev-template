import express, { Request, Response } from 'express';
const router = express.Router();

import { servePath, serveIndexPath } from '../configs/serve.config.js';

import accessRouter from './access/index.js';

router.use(express.static(servePath));
router.use('/', (_req: Request, res: Response) => {
  res.sendFile(serveIndexPath);
});

router.get('/v1/api', accessRouter);

export default router;