const express = require('express');
const bodyParser = require('body-parser');
const areas = require('./routes/areas');
const subestacion = require('./routes/subestacion');
const numcirc = require('./routes/numcirc');
const circuitos = require('./routes/circuitos');
const ubicaciones = require('./routes/ubicacion');
const cors = require('cors')

const auth = require('./routes/auth');
const { PORT } = require("./config");


const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}))

// Middleware for parsing JSON data
app.use(bodyParser.json({ limit: '20mb' }));

// Routes
app.use('/api', areas, subestacion, numcirc, circuitos, ubicaciones, auth);


app.listen(PORT, () => {
  console.log('El Servidor escuchando en el puerto ' + PORT);
});
