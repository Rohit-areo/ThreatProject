const express = require('express');
const router = express.Router();
const threatController = require('../controllers/threatController');
const threatRoutes = require('./routes/threatRoutes');

// API Routes
router.get('/', threatController.getAllThreats);
router.post('/', threatController.createThreat);

module.exports = router;
