const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");


// Define the User model
const Usuario = connection.define('usuarios', {
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_p: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido_m: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  puesto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  esadministrador: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});


// Export the User model
module.exports = {Usuario};
