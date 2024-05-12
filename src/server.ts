import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import dataInfrastucture from './data/infrastucture';
import signals from './signals';
import { DB_URI, PORT as PORT_NUMBER } from './configs/env.config';
import { DBInitType } from './@types/abstractions/db.abstractions';
import { IServer } from './@types/abstractions/server.abstractions';
import Presentation from './presentation';
import {
  IMountRepo,
  IRepository,
} from './@types/abstractions/repository.abstractions';
import MessageRepo from './data/repositories/mongodb/messages';
import { MessageModel } from './data/models/mongodb/message.model';
import { IMessageService } from './@types/abstractions/services/message.services.abstractions';
import MessageService from './domain/messages/service';
import { IServices } from './@types/abstractions/services';
import { TYPES } from './@types/abstractions';

const repositories: IMountRepo = {
  messageRepo: new MessageRepo(MessageModel).getRepoActions(),
};

const services: IServices = {
  messageService: new MessageService(repositories),
};

@injectable()
class App {
  private server: any;
  private messageService!: IMessageService;
  constructor(
    @inject(TYPES.IServer)
    readonly serverFactory: IServer = new Presentation.http.Express(),
    private PORT: number = Number(PORT_NUMBER) || 5002,
    @inject(TYPES.DBInitType)
    private dbConnector: DBInitType = dataInfrastucture.mongodbInit
  ) {}

  public bootstrap() {
    const app = this.serverFactory.init(services);
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
