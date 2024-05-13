const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Projeto Natureza365",
    description: "API Rest MVP",
    version: "1.0.0"
  },
  host: 'localhost:3000',
  security: [{"apiKeyAuth": []}],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header', 
      name: 'authorization',
      description: 'Token de Autenticação'
    }
  }
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);