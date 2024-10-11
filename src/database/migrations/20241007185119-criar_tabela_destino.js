'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('destinos', 
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        nomelocal: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cep: {
          type: Sequelize.STRING(9),
          allowNull: true
        },
        endereco: {
          type: Sequelize.STRING,
          allowNull: false
        },
        numero: {
          type: Sequelize.STRING,
          allowNull: false
        },
        cidade: {
          type: Sequelize.STRING
        },
        latitude: {
          type: Sequelize.DECIMAL(10, 6),
          allowNull: true
        },
        longitude: {
          type: Sequelize.DECIMAL(10, 6),
          allowNull: true
        },
        descricao: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        maps_url: {
          type: Sequelize.STRING, 
          allowNull: true
        },
        usuario_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'usuarios',
            key: 'id'
          }
        },
        destino_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('destino');
  }
};
