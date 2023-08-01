const { Area } = require('../models/area');
const { Subestacion } = require('../models/subestacion');

const relations = [{
  model: Subestacion,
  attributes: ['id', 'nombre'],
  as: 'subestaciones'
}]

// Get all areas
exports.getAllAreas = (req, res) => {
  const notrelations = req.query.notrelations || false
  Area.findAll({
    include: !notrelations ? relations : ''

  })
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
  const notrelations = request.query.notrelations || false
  Area.findByPk(id, {
    include: !notrelations ? relations : ''
  })
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
