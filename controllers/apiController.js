class ApiController {
  test(req, res) {
    res.json({ 
      message: 'API работает!',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }

  async subscribe(req, res) {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes('@')) {
        return res.status(400).json({
          success: false,
          message: 'Некорректный email адрес'
        });
      }

      // Здесь можно добавить логику сохранения подписки
      console.log('Новая подписка:', email);

      res.json({
        success: true,
        message: 'Спасибо за подписку!'
      });
    } catch (error) {
      console.error('Ошибка подписки:', error);
      res.status(500).json({
        success: false,
        message: 'Произошла ошибка при подписке'
      });
    }
  }

  async handleContactForm(req, res) {
    try {
      const { name, email, message } = req.body;

      // Валидация
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Все поля обязательны для заполнения'
        });
      }

      // Здесь можно добавить отправку email или сохранение в БД
      console.log('Новое сообщение:', { name, email, message });

      res.json({
        success: true,
        message: 'Сообщение отправлено успешно!'
      });
    } catch (error) {
      console.error('Ошибка обработки формы:', error);
      res.status(500).json({
        success: false,
        message: 'Произошла ошибка при отправке сообщения'
      });
    }
  }
}

module.exports = new ApiController();