const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');

// Страница услуг
router.get('/', servicesController.getServicesPage);

// API для калькулятора
router.post('/calculate', servicesController.calculatePrice);
router.post('/sendcalculate', servicesController.sendServiceRequest);


module.exports = router;