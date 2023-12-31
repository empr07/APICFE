const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Area } = require('./area')



// Define the Subestacion model
const Subestacion = connection.define('subestacions', {
  idarea: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


// Export the Subestacion model
module.exports = { Subestacion };
