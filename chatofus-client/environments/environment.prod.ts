export const environment = {
  production: true,
  version: '1.0.0',
  SOCKET_ENDPOINT: 'http://monsite.com:3400',
  SERVER_HOST: 'monsite.com',
  SERVER_PORT: 3400,
  API_URI: 'api/v1/',
  DOMAIN: 'http://monsite.com',
};

// To test local docker (which uses prod command)

// export const environment = {
//   production: true,
//   SOCKET_ENDPOINT: 'http://localhost:3400',
//   SERVER_HOST: 'localhost',
//   SERVER_PORT: 3400,
//   API_URI: 'api/v1/',
//   DOMAIN: 'http://localhost:4400',
// };
