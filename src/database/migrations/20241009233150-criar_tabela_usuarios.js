'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios', 
      {    
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sexo: {
        type: Sequelize.ENUM('masculino', 'feminino', 'outro'),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: true
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: true
    },
    numero: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cep: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isLogado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
      }
  )},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  }
};
