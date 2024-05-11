import http from 'http';
import express, { Express } from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '@dimosbotsaris/express-error-handler';
import { IServer } from '../../../@types/abstractions/server.abstractions';

class ExpressFactory implements IServer {
  private app: Express = express();
  constructor() {
    this.app.disable('x-powered-by');
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json({ limit: '5mb' }));
    this.app.use(compress);
    this.app.use(morgan('dev'));
    this.app.use(cors());
  }
  public init() {
    this.app.use(errorHandler({ trace: true }));
    const httpServer = http.createServer(this.app);
    return httpServer;
  }
}

export default ExpressFactory;
