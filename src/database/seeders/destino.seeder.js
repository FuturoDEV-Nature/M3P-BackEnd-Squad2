const { QueryInterface, Sequelize } = require("sequelize");
const Destino = require("../../models/Destino")

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Destino.bulkCreate([
            {
                cep: '88056351',
                endereco: 'Rua Leonel Pereira, 300',
                descricao: 'Bairro Cacheoria do Bom Jesus',
                usuario_id: '8'
            },
            {
                cep: '88058560',
                endereco: 'Rua dos Canudos, 100',
                descricao: 'Bairro Ingleses Rio Vermelho',
                usuario_id: '8'
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Destino.destroy({
            cep: [
                '88056351',
                '88058560'
            ] })
    }
}