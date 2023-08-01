const { Numcirc } = require('../models/numcirc');
const { Area } = require('../models/area')
const { Subestacion } = require('../models/subestacion');
const { Circuito } = require('../models/circuito');

const relations = [{
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
  model: Circuito,
  as: 'circuito',
  attributes: ['id', 'nombre', 'diagrama']
}
]
// Get all numcircs
exports.getAllNumcircs = (req, res) => {
  const notrelations = req.query.notrelations || false
  Numcirc.findAll({
    include: !notrelations ? relations : ''
  })
    .then(numcircs => {
      res.json(numcircs);
    })
    .catch(err => {
      throw err;
    });
};

exports.getById = (request, response) => {
  const notrelations = request.query.notrelations || false
  const id = request.params.id;
  Numcirc.findByPk(id, {
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

// Create a numcirc
exports.createNumcirc = (req, res) => {
  Numcirc.create(req.body)
    .then(data => {
      res.json({ message: 'Numcirc created successfully', data: data });
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

// Update a numcirc
exports.updateNumcirc = (req, res) => {
  const { id } = req.params;
  const { idarea, idsubestacion, numero } = req.body;

  Numcirc.update(
    {
      idarea,
      idsubestacion,
      numero
    }, {
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Numcirc updated successfully' });
    })
    .catch(err => {
      throw err;
    });
};

// Delete a numcirc
exports.deleteNumcirc = (req, res) => {
  const { id } = req.params;

  Numcirc.destroy({
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Numcirc deleted successfully' });
    })
    .catch(err => {
      throw err;
    });
};
