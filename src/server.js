const express = require('express');
const cors = require('cors');
const { connection } = require('./database/connection');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/doc.swagger.json');

const PORT_API = process.env.PORT_API;

class Server {

  constructor(server = express()) {
    this.middlewares(server);
    this.database();
    this.setupRoutes(server);
    this.initializeServer(server);
  }

  async middlewares(app) {
    app.use(cors());
    app.use(express.json());
  }

  async database() {
    try {
      await connection.authenticate();
      console.log('Conexão bem sucedida!');
    } catch (error) {
      console.error('Não foi possível conectar no banco de dados.', error);
      throw error;
    }
  }

  async setupRoutes(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    app.use(routes);
  }

  async initializeServer(app) {
    app.listen(PORT_API, () => console.log(`Servidor executando na porta ${PORT_API}`));
  }
}

module.exports = { Server };
