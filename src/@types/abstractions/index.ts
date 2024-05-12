import { IServer } from './server.abstractions';
import { IServices } from './services';
import { IDb } from './db.abstractions';
import { DBInitType } from './db.abstractions';
import { IRepository } from './repository.abstractions';
import { IMountRepo } from './repository.abstractions';
import { IRoute } from './routes.abstractions';

const TYPES = {
  IServer: Symbol.for('IServer'),
  IServices: Symbol.for('IServices'),
  IDb: Symbol.for('IDb'),
  DBInitType: Symbol.for('DBInitType'),
  IRepository: Symbol.for('IRepository'),
  IMountRepo: Symbol.for('IMountRepo'),
  IRoute: Symbol.for('IRoute'),
};

export { TYPES };
