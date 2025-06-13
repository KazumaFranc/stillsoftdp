const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');

// Страница о компании
router.get('/', aboutController.getAboutPage);

module.exports = router;