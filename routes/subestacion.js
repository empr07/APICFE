const express = require('express');
const subestacionController = require('../controllers/subestacionController');
const router = express.Router();
const { Subestacion } = require('../models/subestacion');
const { authenticateToken } = require('../middlewares/authMiddlewares')


// Get all subestaciones
router.get('/subestaciones', authenticateToken, subestacionController.getAllSubestaciones);

router.get('/subestaciones/:id', authenticateToken, subestacionController.getById)


// Create a subestacion
router.post('/subestaciones', authenticateToken, subestacionController.createSubestacion);

// Update a subestacion
router.put('/subestaciones/:id', authenticateToken, subestacionController.updateSubestacion);

// Delete a subestacion
router.delete('/subestaciones/:id', authenticateToken, subestacionController.deleteSubestacion);

module.exports = router;
