const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/usuario');
const { Op } = require('sequelize');

// Register a new user
exports.register = (req, res) => {
  const { nombres, apellido_p, apellido_m, correo, contraseña, puesto, esadministrador } = req.body;

  Usuario.findOne({ where: { correo } })
    .then(user => {
      if (!user) {
        const hashedPassword = bcrypt.hashSync(contraseña, 10);
        Usuario.create({
          nombres,
          apellido_p,
          apellido_m,
          correo,
          contraseña: hashedPassword,
          puesto,
          esadministrador
        })
          .then(user => {
            res.status(201).json({ message: 'User registered successfully', id: user.id });
          })
          .catch(err => {
            res.status(500).json({ message: 'Error registering user' });
          });
      }
      else {
        return res.status(409).json({ message: 'Already exists an user with this email' });
      }
    })
    .catch(error => {
      return res.status(400).json({ message: 'No data for register' });
    })
};

// Login a user
exports.login = (req, res) => {
  const { correo, contraseña } = req.body;

  Usuario.findOne({ where: { correo } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const passwordMatch = bcrypt.compareSync(contraseña, user.contraseña);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, correo: user.correo, esadministrador: user.esadministrador }, 'lkjpqjcnporsthmlpqsc', { expiresIn: '24h' });
      res.json({ message: 'Login successful', token });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error finding user' });
    });
};

exports.updateUser = (req, res) => {
  const { nombres, apellido_p, apellido_m, correo, puesto, esadministrador } = req.body;
  let { contraseña } = req.body
  const { id } = req.params;

  Usuario.findOne({
    where: {
      correo,
      id: {
        [Op.ne]: id
      }
    }
  })
    .then(user => {
      if (!user) {
        if (contraseña) {
          contraseña = bcrypt.hashSync(contraseña, 10);
        }

        Usuario.update(
          {
            nombres,
            apellido_p,
            apellido_m,
            correo,
            contraseña,
            puesto,
            esadministrador
          },
          {
            where: { id }
          })
          .then(() => {
            res.json({ message: 'Numcirc updated successfully' });
          })
          .catch(err => {
            throw err;
          });
      }
      else {
        return res.status(409).json({ message: 'Already exists an user with this email' });
      }
    })
    .catch(error => {
      return res.status(400).json({ message: 'No data for update' });
    })


}

exports.getUsers = (request, response) => {
  const filters = request.query
  Usuario.findAll({
    where: filters,
  })
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
      console.log(err)
      response.status(500).send('Error consultando los datos');
    })
}

exports.getUserById = (request, response) => {
  const id = request.params.id;
  Usuario.findByPk(id)
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

exports.destroyUser = (request, response) => {
  const id = request.params.id;
  Usuario.destroy(
    {
      where: {
        id: id
      }
    }
  ).then(numRowsDeleted => {
    response.status(200).send(`${numRowsDeleted} registro eliminado`);
  })
    .catch(err => {
      response.status(500).send('Error al eliminar');
    });
}