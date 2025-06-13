const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// API маршруты
router.get('/test', apiController.test);
router.post('/subscribe', apiController.subscribe);
router.post('/contact-form', apiController.handleContactForm);

module.exports = router;