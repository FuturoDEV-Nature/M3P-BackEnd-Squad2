'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('destinos', 'destino_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('destinos', 'destino_id');
  }
};
