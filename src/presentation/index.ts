import ExpressFactory from './http/express';
import FastifyFactory from './http/fastify';

export default {
  http: {
    Express: ExpressFactory,
    Fastify: FastifyFactory,
  },
  webSockets: {},
};
