import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
import cors from 'cors';

import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

import { NODE_ENV } from './configs/serve.config.js';

// import routes
import router from './routes/index.js';

// middlewares
app.use(cors());
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(helmet());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', router);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is closed.');
  });
});


