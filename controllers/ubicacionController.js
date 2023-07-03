const { Ubicacion } = require('../models/ubicacion');

// Get all Ubicaciones
exports.getAllUbicaciones = (req, res) => {
  Ubicacion.findAll()
    .then(Ubicaciones => {
      res.json(Ubicaciones);
    })
    .catch(err => {
      throw err;
    });
};

exports.getById = (request, response) => {
  const id = request.params.id;
  Ubicacion.findByPk(id)
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

// Create a Ubicacion
exports.createUbicacion = (req, res) => {
  Ubicacion.create(req.body)
    .then(data => {
      res.json({ message: 'Ubicacion created successfully', data: data });
    })
    .catch(err => {
      res.status(400).json({ message: err })
    });
};

// Update a Ubicacion
exports.updateUbicacion = (req, res) => {
  const { id } = req.params;
  const { idcircuito, cuchilla, tipo, direccion, enlace, normal, latitud, longitud } = req.body;

  Ubicacion.update({
    idcircuito,
    cuchilla,
    tipo,
    direccion,
    enlace,
    normal,
    latitud,
    longitud
  }, {
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Ubicacion updated successfully' });
    })
    .catch(err => {
      throw err;
    });
};

// Delete a Ubicacion
exports.deleteUbicacion = (req, res) => {
  const { id } = req.params;

  Ubicacion.destroy({
    where: { id }
  })
    .then(() => {
      res.json({ message: 'Ubicacion deleted successfully' });
    })
    .catch(err => {
      throw err;
    });
};
