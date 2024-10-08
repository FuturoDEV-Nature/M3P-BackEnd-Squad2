'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'João Silva',
        sexo: 'Masculino',
        cpf: '12345678901',
        email: 'joao.silva@example.com',
        senha: 'senha123',
        rua: 'Rua das Flores',
        bairro: 'Centro',
        cidade: 'Florianópolis',
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Maria Oliveira',
        sexo: 'Feminino',
        cpf: '10987654321',
        email: 'maria.oliveira@example.com',
        senha: 'senha123',
        rua: 'Avenida das Torres',
        bairro: 'Trindade',
        cidade: 'Florianópolis',
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Pedro Santos',
        sexo: 'Masculino',
        cpf: '11223344556',
        email: 'pedro.santos@example.com',
        senha: 'senha123',
        rua: 'Rua do Sol',
        bairro: 'Córrego Grande',
        cidade: 'Florianópolis',
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Ana Costa',
        sexo: 'Feminino',
        cpf: '22334455667',
        email: 'ana.costa@example.com',
        senha: 'senha123',
        rua: 'Travessa da Alegria',
        bairro: 'Campeche',
        cidade: 'Florianópolis',
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Lucas Pereira',
        sexo: 'Masculino',
        cpf: '33445566778',
        email: 'lucas.pereira@example.com',
        senha: 'senha123',
        rua: 'Rua do Mar',
        bairro: 'Lagoinha do Leste',
        cidade: 'Florianópolis',
        uf: 'SC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
