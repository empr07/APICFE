const express = require('express');
const ubicacionController = require('../controllers/ubicacionController');
const router = express.Router();
const { Ubicacion } = require('../models/ubicacion');
const { authenticateToken } = require('../middlewares/authMiddlewares')


// Get all Ubicaciones
router.get('/ubicaciones', authenticateToken, ubicacionController.getAllUbicaciones);

router.get('/ubicaciones/:id', authenticateToken, ubicacionController.getById)

// Create a Ubicacion
router.post('/ubicaciones', authenticateToken, ubicacionController.createUbicacion);

// Update a Ubicacion
router.put('/ubicaciones/:id', authenticateToken, ubicacionController.updateUbicacion);

// Delete a Ubicacion
router.delete('/ubicaciones/:id', authenticateToken, ubicacionController.deleteUbicacion);

module.exports = router;
