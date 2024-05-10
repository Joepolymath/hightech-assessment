import dotenv from 'dotenv';
import { IEnv } from '../@types/env.types';
dotenv.config();

declare var process: {
  env: any;
};

export const { PORT, DB_URI, NODE_ENV, API_KEY }: IEnv = process.env;
