const { DataTypes } = require('sequelize');
const { connection } = require('../database/connection');

const Destino = connection.define('destino', {
  cep: {
    type: DataTypes.STRING(9),
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true
  },
  maps_url: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Usuario',
      key: 'id'
    }
  },
  destino_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  }
});

module.exports = Destino;
