const { QueryInterface, Sequelize } = require("sequelize");
const Destino = require("../../models/Destino");

module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await Destino.bulkCreate([
      {
        nomelocal: "Lagoa do Peri",
        cep: "88010102",
        endereco: "Rod. Francisco Thomaz dos Santos",
        numero: "3150",
        cidade: "Florianópolis",
        latitude: "-27.732435",
        longitude: "-48.525032",
        descricao:
          "Lagoa de água doce em parque natural com área de lazer, bar, snacks, churrasqueiras e mais.",
        maps_url: "https://maps.app.goo.gl/R5XU3gHrYUpzsmhE6",
        usuario_id: "1",
      },
      {
        nomelocal: "Dunas do Santinho",
        cep: "88058701",
        endereco: "Servidão Manoel João da Silva",
        numero: "136",
        cidade: "Florianópolis",
        latitude: "-27.446425",
        longitude: "-48.374285",
        descricao:
          "Porção estreita de areia entre as praias dos Ingleses e do Santinho com dunas, pequenos lagos, restingas",
        maps_url: "https://maps.app.goo.gl/xwAuYqxpsdDM5LM57",
        usuario_id: "2",
      },
      {
        nomelocal: "Dunas da Joaquina",
        cep: "",
        endereco: "Avenida das Rendeiras",
        numero: "748",
        cidade: "Florianópolis",
        latitude: "-27.60731909929563",
        longitude: "-48.45610137474476",
        descricao:
          "Lugar incrível, diferente de todos os outros atrativos na ilha. Seguro, fácil estacionar.",
        maps_url: "https://maps.app.goo.gl/cA5J2ew4PN4cLYcA6",
        usuario_id: "3",      
      },
      {     
        nomelocal: "Parque da Luz",
        cep: "",
        endereco: "Rua Felipe Schmidt",
        numero: "1200",
        cidade: "Florianópolis",
        latitude: "-27.590480830441024",
        longitude: "-48.56035041085223",
        descricao:
          "Localizado na cabeceira insular da Ponte Hercílio Luz, em Florianópolis, é uma grande área verde (aproximadamente 40.000 m2), arborizada, com trilhas, área para piquenique, campo de futebol e muito bancos para sentar e ver a vida",
        maps_url: "https://maps.app.goo.gl/F7RQNU7bH4QVvr4g6",
        usuario_id: "4",  
      },
      {
        nomelocal: "Parque de Coqueiros",
        cep: "88080010",
        endereco: "Avenida Engenheiro Max de Souza",
        numero: "",
        cidade: "Florianópolis",
        latitude: "-27.601250770458208",
        longitude: "-48.5737805544158",
        descricao:
          "O Parque de Coqueiros em Florianópolis é um verdadeiro refúgio urbano! Perfeito para atividades ao ar livre, oferece pistas para caminhada, áreas verdes bem cuidadas e uma vista linda da Baía Sul",
        maps_url: "https://maps.app.goo.gl/1tZNhzi8RTCAUYzdA",
        usuario_id: "5",  
      },
    ]);
  },

  down: async (QueryInterface, Sequelize) => {
    await Destino.destroy({
      where: {
        nomelocal: ["Parque de Coqueiros", "Lagoa do Peri", "Dunas do Santinho", "Dunas da Joaquina", "Parque da Luz"],
      },
    });
  },
};