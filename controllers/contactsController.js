const { sendEmail } = require('../utils/email');

class ContactsController {
  getContactsPage(req, res) {
    const pageData = {
      title: 'Контакты | Стилсофт',
      currentPage: 'contacts',
      meta: {
        description: 'Свяжитесь с нами удобным для вас способом',
        keywords: 'контакты, адрес, телефон, email'
      },
      contacts: {
        address: 'Россия, 355042, г. Ставрополь, ул. Васильковая, 29, а/я 12',
        phones: ['+7 (8652) 52-44-44', '+7 (495) 663-71-75'],
        fax: '+7 (8652) 52-88-88',
        email: 'info@stilsoft.ru',
        workingHours: 'Пн-Пт: 9:00 - 18:00 (мск)'
      }
    };
    
    res.render('pages/contacts', pageData);
  }

  async sendContactForm(req, res) {
    try {
      const { name, email, phone, message } = req.body;

      // Проверка данных
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "Заполните все обязательные поля",
        });
      }

      // Формируем текст письма
      const emailText = `
        📩 Сообщение от пользователя на сайте

        Имя: ${name}
        Email: ${email}
        Телефон: ${phone || "Без номера телефона"}
        
        Сообщение:
        ${message || "Без сообщения"}
      `;

      // Отправляем письмо
      await sendEmail(
        process.env.EMAIL_FROM,
        "Сообщение от пользователя на сайте",
        emailText
      );



      res.json({
        success: true,
        message: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.'
      });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      res.status(500).json({
        success: false,
        message: 'Произошла ошибка при отправке сообщения'
      });
    }
  }
}

module.exports = new ContactsController();