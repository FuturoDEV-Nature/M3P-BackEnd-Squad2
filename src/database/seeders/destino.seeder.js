const { QueryInterface, Sequelize } = require("sequelize");
const Destino = require("../../models/Destino");

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Destino.bulkCreate([
      {
        cep: "88010102",
        endereco: "Rod. Francisco Thomaz dos Santos 3150",
        descricao:
          "Lagoa de água doce em parque natural com área de lazer, bar, snacks, churrasqueiras e mais.",
        latitude: "-27.732435",
        longitude: "-48.525032",
        usuario_id: "1",
        maps_url: "https://maps.app.goo.gl/R5XU3gHrYUpzsmhE6",
        nomelocal: "Lagoa do Peri",
      },
      {
        cep: "88058701",
        endereco: "Servidão Manoel João da Silva, 136",
        descricao:
          "Porção estreita de areia entre as praias dos Ingleses e do Santinho com dunas, pequenos lagos, restingas",
        latitude: "-27.446425",
        longitude: "-48.374285",
        usuario_id: "2",
        maps_url: "https://maps.app.goo.gl/xwAuYqxpsdDM5LM57",
        nomelocal: "Dunas do Santinho",
      },
    ]);
  },

  down: async (QueryInterface, Sequelize) => {
    await Destino.destroy({
      where: {
        cep: ["88010102", "88058701"],
      },
    });
  },
};
