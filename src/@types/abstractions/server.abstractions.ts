import http from 'http';

export interface IServer {
  init: () => http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
}
