const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Главная страница
router.get('/', mainController.getHomePage);

// Страница заявок на беспилотники
//router.get('/po-drones', mainController.getDronesPage);

// Страница новостей
router.get('/news', mainController.getNewsPage);

module.exports = router;