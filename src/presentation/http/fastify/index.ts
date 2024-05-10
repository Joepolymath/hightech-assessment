import http from 'http';
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

export function init(services: any) {
  const httpServer = http.createServer((req, res) => {
    fastify.server.emit('request', req, res);
  });
  return httpServer;
}
