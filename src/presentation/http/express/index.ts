import http from 'http';
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '@dimosbotsaris/express-error-handler';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(morgan('dev'));
app.use(cors());

export function init(services: any) {
  app.use(errorHandler({ trace: true }));
  const httpServer = http.createServer(app);
  return httpServer;
}
