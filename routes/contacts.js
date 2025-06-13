const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

// Страница контактов
router.get('/', contactsController.getContactsPage);

// Обработка формы обратной связи
router.post('/send', contactsController.sendContactForm);

module.exports = router;