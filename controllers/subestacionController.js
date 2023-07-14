const { Subestacion } = require('../models/subestacion');
const { Area } = require('../models/area');
const { Numcirc } = require('../models/numcirc');

const relations = [
  {
    model: Area,
    attributes: ['id', 'nombre'],
    as: 'area'
  },
  {
    model: Numcirc,
    attributes: ['id', 'numero'],
    as: 'numcircs'
  }
]

// Get all subestaciones
exports.getAllSubestaciones = (req, res) => {
  Subestacion.findAll({
    include: relations
  })
    .then(subestaciones => {
      res.json(subestaciones);
    })
    .catch(err => {
      throw err;
    });
};

exports.getById = (request, response) => {
  const id = request.params.id;
  Subestacion.findByPk(id, {
    include: relations
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

// Create a subestacion
exports.createSubestacion = (req, res) => {
  Subestacion.create(req.body)
    .then(data => {
      res.json({ message: 'Subestacion created successfully', data: data });
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

// Update a subestacion
exports.updateSubestacion = (req, res) => {
  const { id } = req.params;
  const { idarea, nombre } = req.body;

  Subestacion.update({
    idarea,
    nombre
  }, {
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Subestacion updated successfully' });
    })
    .catch(err => {
      throw err;
    });
};

// Delete a subestacion
exports.deleteSubestacion = (req, res) => {
  const { id } = req.params;

  Subestacion.destroy({
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Subestacion deleted successfully' });
    })
    .catch(err => {
      throw err;
    });
};
