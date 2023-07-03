const express = require('express');
const circuitosController = require('../controllers/circuitosController');
const router = express.Router();
const { Circuito } = require('../models/circuito');
const { authenticateToken } = require('../middlewares/authMiddlewares')


// Get all circuitos
router.get('/circuitos', authenticateToken, circuitosController.getAllCircuitos);

router.get('/circuitos/:id', authenticateToken, circuitosController.getById)

// Create a circuito
router.post('/circuitos', authenticateToken, circuitosController.createCircuito);

// Update a circuito
router.put('/circuitos/:id', authenticateToken, circuitosController.updateCircuito);

// Delete a circuito
router.delete('/circuitos/:id', authenticateToken, circuitosController.deleteCircuito);

module.exports = router;
