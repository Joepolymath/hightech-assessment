import { DBInitType, IDb, IServer } from './@types/interfaces/server.types';
import { init as expressInit } from './presentation/http/express/index';
import { init as fastifyInit } from './presentation/http/fastify';
import dataInfrastucture from './data/infrastucture';
import signals from './signals';
import { DB_URI, PORT as PORT_NUMBER } from './configs/env.config';

let services;

class App implements IServer {
  private server: any;

  constructor(
    readonly init = expressInit,
    private PORT: number = Number(PORT_NUMBER) || 5002,
    private dbConnector: DBInitType = dataInfrastucture.mongodbInit
  ) {}

  public bootstrap() {
    const app = this.init(5);
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
