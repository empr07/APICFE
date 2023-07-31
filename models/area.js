const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Subestacion } = require('./subestacion');
const { Numcirc } = require('./numcirc');
const { Circuito } = require('./circuito');
const { Ubicacion } = require('./ubicacion');


const Area = connection.define('area', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Area.hasMany(Subestacion, { as: 'subestaciones', foreignKey: 'idarea' })
Subestacion.belongsTo(Area, { as: 'area', foreignKey: 'idarea', })
Numcirc.belongsTo(Subestacion, { as: 'subestacion', foreignKey: 'idsubestacion' })
Subestacion.hasMany(Numcirc, { as: 'numcircs', foreignKey: 'idsubestacion' })
Numcirc.belongsTo(Area, { as: 'area', foreignKey: 'idarea' })
Numcirc.hasOne(Circuito, { as: 'circuito', foreignKey: 'idnumcirc' })
Circuito.belongsTo(Area, { as: 'area', foreignKey: 'idarea' })
Circuito.belongsTo(Subestacion, { as: 'subestacion', foreignKey: 'idsubestacion' })
Circuito.belongsTo(Numcirc, { as: 'numcirc', foreignKey: 'idnumcirc' })
Circuito.hasMany(Ubicacion, { as: 'ubicaciones', foreignKey: 'idcircuito' })

module.exports = { Area };
