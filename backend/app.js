import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import cors from 'cors';

import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import { NODE_ENV } from './configs/serve.config.js'

// import routes
import router from './routes';

// middlewares
// app.use(cors());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(compression);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', router);

export default app;

