const { Sequelize, DataTypes } = require('sequelize');
const { connection } = require("../config.db");


// Define the Area model
const Area = connection.define('Area', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Get all areas
Area.getAll = () => {
  return Area.findAll();
};


// Update an area
Area.updateArea = (id, nombre) => {
  return Area.update({ nombre }, { where: { id } });
};

// Delete an area
Area.deleteArea = (id) => {
  return Area.destroy({ where: { id } });
};

module.exports = {Area};
