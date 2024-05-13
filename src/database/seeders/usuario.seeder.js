const { QueryInterface, Sequelize } = require("sequelize");
const Usuario = require("../../models/Usuario")

module.exports = {
    up: async (QueryInterface, Sequelize) => {
        await Usuario.bulkCreate([
            {
                nome: 'novousuario1',
                sexo: 'masculino',
                cpf: '01010100100',
                email: 'novousuario1@email.com',
                senha: '123456'
            },
            {
                nome: 'novousuario2',
                sexo: 'feminino',
                cpf: '01010100105',
                email: 'novousuario2@email.com',
                senha: '123456'
            }
        ])
    },

    down: async (QueryInterface, Sequelize) => {
        await Usuario.destroy({
            email: [
                'novousuario1@email.com',
                'novousuario2@email.com'
            ] })
    }
}