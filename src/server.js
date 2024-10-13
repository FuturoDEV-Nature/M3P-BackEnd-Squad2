const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const routes = require('./routes/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/doc.swagger.json');

// Usando a variável de ambiente DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL;
const PORT_API = process.env.PORT_API || 3000; // Valor padrão caso PORT_API não esteja definido

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
    // Criar uma instância do Sequelize usando a DATABASE_URL
    const connection = new Sequelize(DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Para evitar erros de SSL em produção
        },
      },
    });

    // Tentar autenticar a conexão
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
