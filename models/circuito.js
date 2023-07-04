const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Area } = require('./area')
const { Subestacion } = require('./subestacion')
const { Numcirc } = require('./numcirc')
const { Ubicacion } = require('./ubicacion')




// Define the Circuito model
const Circuito = connection.define('circuito', {
  idarea: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idsubestacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idnumcirc: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diagrama: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Circuito.belongsTo(Area, { as: 'area', foreignKey: 'idarea' })
Circuito.belongsTo(Subestacion, { as: 'subestacion', foreignKey: 'idsubestacion' })
Circuito.belongsTo(Numcirc, { as: 'numcirc', foreignKey: 'idnumcirc' })
Circuito.hasMany(Ubicacion, { as: 'ubicaciones', foreignKey: 'idcircuito' })



module.exports = { Circuito };
