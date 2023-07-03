const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();
const { User } = require('../models/usuario');
const { authenticateToken } = require('../middlewares/authMiddlewares')

// Register a new user
router.post('/auth/register', authController.register);

// Login user
router.post('/auth/login', authController.login);


router.get('/usuarios', authenticateToken, authController.getUsers)
router.get('/usuarios/:id', authenticateToken, authController.getUserById)
router.delete('/usuarios/:id', authenticateToken, authController.destroyUser)
router.put('/usuarios/:id', authenticateToken, authController.updateUser)




module.exports = router;
