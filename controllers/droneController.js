const { sendEmail } = require('../utils/email');

class DroneController {
  // Страница заявок на беспилотники
  getDronesPage(req, res) {
    const pageData = {
      title: 'Разработка ПО для беспилотных устройств | Стилсофт',
      currentPage: 'po-drones',
      meta: {
        description: 'Создаем интеллектуальные системы управления для дронов, роботов и автономных транспортных средств',
        keywords: 'беспилотники, дроны, ПО для дронов, автономные системы'
      },
      droneTypes: [
        {
          id: "drones",
          name: "Беспилотные летательные аппараты",
          description:
            "Описание дронов",
        },
        {
          id: "dirt-robot",
          name: "Наземные роботы",
          description: "Описание наземных роботов",
        },
        {
          id: "sea-robot",
          name: "Морские дроны",
          description:
            "Описание морских дронов",
        },
        {
          id: "lava-robot",
          name: "Лава дроны",
          description:
            "Описание морских дронов",
        },
        {
          id: "other",
          name: "Другое",
          description:
            "Описание другого",
        },
      ],
    };
    
    res.render('pages/po-drones', pageData);
  }


  async submitDroneApplication(req, res) {
    try {
      const { company, name, email, phone, type, message } = req.body;



      /*
      // Проверка данных
      if (!company || !name || !email || !phone || !type) {
        return res.status(400).json({
          success: false,
          message: "Заполните все обязательные поля",
        });
      }*/

      // Формируем текст письма
      const emailText = `
        📩 Новая заявка на разработку

        Компания: ${company}
        Имя: ${name}
        Email: ${email}
        Телефон: ${phone}
        Тип проекта: ${type}
        
        Сообщение:
        ${message || "Без сообщения"}
      `;

      // Отправляем письмо
      await sendEmail(
        process.env.EMAIL_FROM,
        "Новая заявка на разработку",
        emailText
      );

      res.json({
        success: true,
        message:
          "Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.",
      });
    } catch (error) {
      console.error("Ошибка обработки заявки:", error);
      res.status(500).json({
        success: false,
        message: "Произошла ошибка при отправке заявки",
      });
    }
  }
}

module.exports = new DroneController();
