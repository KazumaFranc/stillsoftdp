const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

router.get('/', droneController.getDronesPage);

router.post('/apply', droneController.submitDroneApplication);

module.exports = router;