const { Area } = require('../models/area');

// Get all areas
exports.getAllAreas = (req, res) => {
  Area.findAll()
    .then(areas => {
      res.json(areas);
    })
    .catch(err => {
      throw err;
    });
};

// Create an area
exports.createArea = (req, res) => {
  Area.create(req.body)
    .then(data => {
      res.json({ message: 'Area created successfully', data: data });
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

exports.getById = (request, response) => {
  const id = request.params.id;
  Area.findByPk(id)
    .then(entitie => {
      if (entitie) {
        response.json(entitie);
      }
      else {
        response.status(404).send('Recurso no encontrado')
      }
    })
    .catch(err => {
      response.status(500).send('Error al consultar el dato');
    })
}

// Update an area
exports.updateArea = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  Area.update({ nombre }, { where: { id } })
    .then(() => {
      res.json({ message: 'Area updated successfully' });
    })
    .catch(err => {
      throw err;
    });
};

// Delete an area
exports.deleteArea = (req, res) => {
  const { id } = req.params;
  Area.destroy({ where: { id } })
    .then(() => {
      res.json({ message: 'Area deleted successfully' });
    })
    .catch(err => {
      throw err;
    });
};
