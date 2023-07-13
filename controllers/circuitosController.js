const { Circuito } = require('../models/circuito');
const { Area } = require('../models/area')
const { Subestacion } = require('../models/subestacion')
const { Numcirc } = require('../models/numcirc');
const { Ubicacion } = require('../models/ubicacion');



const relations = [
  {
    model: Area,
    attributes: ['id', 'nombre'],
    as: 'area'
  },
  {
    model: Subestacion,
    attributes: ['id', 'nombre'],
    as: 'subestacion'
  },
  {
    model: Numcirc,
    attributes: ['id', 'numero'],
    as: 'numcirc'
  },
]

const relationUbicacion = [
  {
    model: Ubicacion,
    as: 'ubicaciones'
  }
]

const relationForById = relations.concat(relationUbicacion)

// Get all circuitos
exports.getAllCircuitos = (req, res) => {
  Circuito.findAll({
    include: relationForById,
    attributes: ['id', 'idarea', 'idsubestacion', 'idnumcirc', 'nombre', 'createdAt', 'updatedAt']

  })
    .then(circuitos => {
      res.json(circuitos);
    })
    .catch(err => {
      throw err;
    });
};

exports.getById = (request, response) => {
  const id = request.params.id;
  Circuito.findByPk(id, {
    include: relationForById
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

exports.createCircuito = (req, res) => {
  Circuito.create(req.body)
    .then(data => {
      res.json({ message: 'Circuito created successfully', data: data });
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

// Update a circuito
exports.updateCircuito = (req, res) => {
  const { id } = req.params;
  const { idarea, idsubestacion, idnumcirc, nombre, diagrama } = req.body;

  Circuito.update({
    idarea,
    idsubestacion,
    idnumcirc,
    nombre,
    diagrama
  }, {
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Circuito updated successfully' });
    })
    .catch(err => {
      throw err;
    });
};

// Delete a circuito
exports.deleteCircuito = (req, res) => {
  const { id } = req.params;

  Circuito.destroy({
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Circuito deleted successfully' });
    })
    .catch(err => {
      throw err;
    });
};
