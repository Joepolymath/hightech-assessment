import http from 'http';

export interface IServer {
  init: (
    services: any
  ) => http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
}

export interface IDb {
  getConnection?: () => any;
  connect: () => Promise<any>;
  close?: () => any;
  schemas?: any;
}

export type DBInitType = (dbConnectionString: string) => IDb;
