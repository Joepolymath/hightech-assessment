import http from 'http';

export interface IServer {
  init: (
    services: any
  ) => http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}
