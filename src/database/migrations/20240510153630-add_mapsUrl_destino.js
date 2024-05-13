'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('destinos', 'maps_url', {
      type: Sequelize.STRING,
      allowNull: true // Ou false, dependendo se você quer permitir ou não valores nulos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('destinos', 'maps_url');
  }
};
