import mongoose from 'mongoose';
import logging from '../../../common/logging/index';
import { create } from '../../models/mongodb/index';

export const init = (dbConnectionString: string) => {
  mongoose.connection.on('error', (err) => {
    logging.error(`Error! DB Connection failed. Error: ${err}`);
    return err;
  });

  // Connection opened successfully
  mongoose.connection.once('open', () => {
    logging.info('Connection to MongoDB established');
    // mongoose.connection.db.dropDatabase()
  });

  mongoose.connection.on('disconnected', () => {
    logging.info('Connection to MongoDB closed');
    logging.info('-------------------');
  });

  return {
    getConnection() {
      return mongoose.connection;
    },
    connect() {
      // Open Connection to Mongo DB
      logging.info('Connecting to Db');
      return mongoose.connect(dbConnectionString);
    },
    close() {
      return mongoose.connection.close();
    },
    schemas: create(),
  };
};
