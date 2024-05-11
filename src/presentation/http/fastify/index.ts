import http from 'http';
import Fastify from 'fastify';
import { IServer } from '../../../@types/abstractions/server.abstractions';

const fastify = Fastify({
  logger: true,
});

export function init(services: any) {
  const httpServer = http.createServer((req, res) => {
    fastify.server.emit('request', req, res);
  });
  return httpServer;
}

class FastifyFactory implements IServer {
  private app = Fastify({
    logger: true,
  });
  public init() {
    const httpServer = http.createServer((req, res) => {
      fastify.server.emit('request', req, res);
    });
    return httpServer;
  }
}

export default FastifyFactory;
