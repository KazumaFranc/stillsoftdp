const { sendEmail } = require('../utils/email');

class PartnerController {
  getPartnerPage(req, res) {
    const pageData = {
      title: "Партнерская программа | Стилсофт",
      currentPage: "partner",
      meta: {
        description: "Присоединяйтесь к нашей партнерской программе",
        keywords: "партнеры, партнерская программа, сотрудничество",
      },
      partnershipTypes: [
        {
          id: "reseller",
          name: "Партнер-реселлер",
          description:
            "Продажа наших программных продуктов под вашим брендом или совместно с нашим",
          benefits: [
            "До 30% от стоимости лицензий",
            "Готовые ценовые предложения",
            "Маркетинговая поддержка",
            "Обучение продуктам",
          ],
          image: "images/gtt/photo_5321395193787840892_x.jpg",
        },
        {
          id: "integrator",
          name: "Системный интегратор",
          description: "Внедрение наших решений в составе комплексных проектов",
          benefits: [
            "До 40% от стоимости проекта",
            "Техническая поддержка",
            "Сертификация специалистов",
            "Участие в тендерах",
          ],
          image: "images/gtt/i.jpg",
        },
        {
          id: "developer",
          name: "Партнер-разработчик",
          description:
            "Создание дополнительных модулей и интеграций для наших продуктов",
          benefits: [
            "До 50% от стоимости разработки",
            "Доступ к API и документации",
            "Техническая поддержка",
            "Продвижение решений",
          ],
          image: "images/gtt/programming-background-collage-2-1.jpg",
        },
      ],
    };

    res.render("pages/partner", pageData);
  }

  async submitPartnerApplication(req, res) {
    try {
      const { company, name, email, phone, type, message } = req.body;

      // Проверка данных
      if (!company || !name || !email || !phone || !type) {
        return res.status(400).json({
          success: false,
          message: "Заполните все обязательные поля",
        });
      }

      // Формируем текст письма
      const emailText = `
        📩 Новая заявка на партнерство

        Компания: ${company}
        Имя: ${name}
        Email: ${email}
        Телефон: ${phone}
        Тип партнера: ${type}
        
        Сообщение:
        ${message || "Без сообщения"}
      `;

      // Отправляем письмо
      await sendEmail(
        process.env.EMAIL_FROM,
        "Новая заявка на партнерство",
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

module.exports = new PartnerController();
