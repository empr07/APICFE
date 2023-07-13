const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Subestacion } = require('./subestacion')


const Area = connection.define('area', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Area.hasMany(Subestacion, {as: 'subestaciones', foreignKey: 'idarea'})
Subestacion.belongsTo(Area, {as: 'area', foreignKey: 'idarea',})

module.exports = {Area};
