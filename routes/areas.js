const express = require('express');
const areasController = require('../controllers/areasController');
const router = express.Router();
const { Area } = require('../models/area');
const { authenticateToken } = require('../middlewares/authMiddlewares')


// Get all areas
router.get('/areas', authenticateToken, areasController.getAllAreas);

router.get('/areas/:id', authenticateToken, areasController.getById)

// Create an area
router.post('/areas', authenticateToken, areasController.createArea);

// Update an area
router.put('/areas/:id', authenticateToken, areasController.updateArea);

// Delete an area
router.delete('/areas/:id', authenticateToken, areasController.deleteArea);

module.exports = router;
