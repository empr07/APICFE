const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Area } = require('./area')



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




module.exports = {Numcirc};
