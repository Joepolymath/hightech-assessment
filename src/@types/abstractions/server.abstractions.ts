import http from 'http';
import { IServices } from './services';

export interface IServer {
  init: (
    services: IServices
  ) => http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}
