export interface IDb {
  getConnection?: () => any;
  connect: () => Promise<any>;
  close?: () => any;
  schemas?: any;
}

export type DBInitType = (dbConnectionString: string) => IDb;
