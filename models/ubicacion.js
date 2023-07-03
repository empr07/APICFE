const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Circuito } = require('./circuito')



// Define the Numcirc model
const Ubicacion = connection.define('ubicaciones', {
    idcircuito: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cuchilla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enlace : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    normal : {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitud : {
        type: DataTypes.FLOAT,
        allowNull: false
    }, 
    longitud : {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});





module.exports = { Ubicacion };
