import dataInfrastucture from './data/infrastucture';
import signals from './signals';
import { DB_URI, PORT as PORT_NUMBER } from './configs/env.config';
import { DBInitType } from './@types/abstractions/db.abstractions';
import { IServer } from './@types/abstractions/server.abstractions';
import ExpressFactory from './presentation/http/express/index';
import FastifyFactory from './presentation/http/fastify';

class App {
  private server: any;
  constructor(
    readonly serverFactory: IServer = new ExpressFactory(),
    private PORT: number = Number(PORT_NUMBER) || 5002,
    private dbConnector: DBInitType = dataInfrastucture.mongodbInit
  ) {}

  public bootstrap() {
    const app = this.serverFactory.init();
    this.server = app.listen(this.PORT, () => {
      console.log(`Server spitting fire 🔥🔥🔥 on ${this.PORT}`);
    });
    (async () => {
      try {
        await this.dbConnector(DB_URI).connect();
      } catch (error) {
        await this.shutdown();
      }
    })();
  }

  shutdown() {
    signals.init(async () => {
      await this.server.close();
    });
  }
}

const serverInstance = new App();
serverInstance.bootstrap();
