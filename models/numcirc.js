const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Area } = require('./area')
const { Subestacion } = require('./subestacion')



// Define the Numcirc model
const Numcirc = connection.define('numcircs', {
  idarea: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idsubestacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Numcirc.belongsTo(Area, { as: 'area', foreignKey: 'idarea' })
Numcirc.belongsTo(Subestacion, { as: 'subestacion', foreignKey: 'idsubestacion' })



module.exports = {Numcirc};
