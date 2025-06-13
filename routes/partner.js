const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');

// Страница партнерам
router.get('/', partnerController.getPartnerPage);

// Обработка заявки на партнерство
router.post('/apply', partnerController.submitPartnerApplication);

module.exports = router;