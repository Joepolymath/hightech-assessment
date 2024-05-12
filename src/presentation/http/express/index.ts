import http from 'http';
import express, { Application, Express, Request, Response } from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '@dimosbotsaris/express-error-handler';
import { IServer } from '../../../@types/abstractions/server.abstractions';
import { IServices } from '../../../@types/abstractions/services';
import { API_PREFIX } from '../../../common/constants';
import logging from '../../../common/logging';
import { injectable } from 'inversify';

// const app = express();
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json({ works: true });
// });

// const httpServer = http.createServer(app);
// httpServer.listen(5007, () => {
//   console.log(`Server spitting fire 🔥🔥🔥 on ${5007}`);
// });

@injectable()
class ExpressFactory implements IServer {
  private app: Application;
  constructor() {
    this.app = express();
    this.app.disable('x-powered-by');
    this.app.use(helmet());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json({ limit: '5mb' }));
    this.app.use(compress);
    this.app.use(morgan('dev'));
    this.app.use(cors());

    this.app.get(`/`, (req: Request, res: Response) => {
      console.log('ENDPOINT HIT');
      res.status(200).json({
        message: 'Server Running',
        status: 'success',
        meta: { pid: process.pid },
      });
    });
  }
  public init(services: IServices) {
    logging.info('Initiating Express...');
    this.app.use(errorHandler({ trace: true }));
    this.app.get(`/`, (req: Request, res: Response) => {
      console.log('ENDPOINT HIT');
      res.status(200).json({
        message: 'Server Running',
        status: 'success',
        meta: { pid: process.pid },
      });
    });
    const httpServer = http.createServer(this.app);
    // httpServer.listen(5008, () => {
    //   console.log(`Server spitting fire 🔥🔥🔥 on ${5008}`);
    // });
    return httpServer;
  }
}

export default ExpressFactory;
