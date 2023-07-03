const express = require('express');
const numcircController = require('../controllers/numcircController');
const router = express.Router();
const { Numcirc } = require('../models/numcirc');
const { authenticateToken } = require('../middlewares/authMiddlewares')


// Get all numcircs
router.get('/numcircs', authenticateToken, numcircController.getAllNumcircs);

router.get('/numcircs/:id', authenticateToken, numcircController.getById)

// Create a numcirc
router.post('/numcircs', authenticateToken, numcircController.createNumcirc);

// Update a numcirc
router.put('/numcircs/:id', authenticateToken, numcircController.updateNumcirc);

// Delete a numcirc
router.delete('/numcircs/:id', authenticateToken, numcircController.deleteNumcirc);

module.exports = router;
