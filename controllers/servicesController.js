const { sendEmail } = require('../utils/email');

class ServicesController {
  getServicesPage(req, res) {
    const pageData = {
      title: 'Наши услуги | Стилсофт',
      currentPage: 'services',
      meta: {
        description: 'Комплексные IT-решения для безопасности и автоматизации вашего бизнеса',
        keywords: 'услуги, IT-решения, безопасность, автоматизация'
      },
      services: [
        {
          id: 'Комплексные системы безопасности',
          name: 'Комплексные системы безопасности',
          description: 'Полный цикл проектирования и внедрения систем безопасности объектов',
          image: 'images/part/ksbo-hover.png',
          basePrice: 500000
        },
        {
          id: 'special',
          name: 'Специальная техника',
          description: 'Оборудование для охраны больших территорий и периметров',
          image: 'images/part/spets-hover.png',
          basePrice: 800000
        },
        {
          id: 'ais',
          name: 'Автоматизированные системы',
          description: 'Разработка и внедрение информационных систем управления',
          image: 'images/part/ais-hover.png',
          basePrice: 300000
        }
      ]
    };
    
    res.render('pages/services', pageData);
  }

  // Обработка формы заявки с калькулятора
  async sendServiceRequest(req, res) {
    try {
      const { 
        name, 
        phone, 
        email,
        message
      } = req.body;

      // Проверка обязательных полей
      if (!name || !email ) {
        return res.status(400).json({
          success: false,
          message: 'Заполните все обязательные поля'
        });
      }

      // Формирование текста письма
      const emailText = `
        📩 Новая заявка с калькулятора стоимости услуг
        
        Имя: ${name}
        Email: ${email}
        Телефон: ${phone}
        
        Дополнительная информация:
        ${message || 'Без дополнительных комментариев'}
      `;

      // Отправка письма
      await sendEmail(
        process.env.EMAIL_FROM,
        'Новая заявка с калькулятора стоимости услуг',
        emailText
      );

      res.json({
        success: true,
        message: 'Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.'
      });
    } catch (error) {
      console.error('Ошибка обработки заявки:', error);
      res.status(500).json({
        success: false,
        message: 'Произошла ошибка при отправке заявки'
      });
    }
  }


  // ТУТ НАДО РАССЧИТАТЬ ЦЕНЫ, работает только для Комплексные системы безопасности
  calculatePrice(req, res) {
    try {
        const { serviceType, parameters } = req.body;
        let price = 0;
        let details = '';

        switch (serviceType) {
            case 'ksbo':
                const { objectArea, cameraCount, securityLevel } = parameters;
                price = (objectArea * 1000 + cameraCount * 50000) * securityLevel;
                details = `КСБО: ${objectArea} м², ${cameraCount} камер, уровень защиты ${securityLevel}`;
                break;
            
            case 'special':
                const { perimeterLength, techType } = parameters;
                price = perimeterLength * 5000 + techType;
                details = `Спецтехника: ${perimeterLength} м периметра, тип техники ${techType}`;
                break;
            
            case 'ais':
                const { usersCount, systemComplexity } = parameters;
                price = usersCount * 10000 + systemComplexity;
                details = `АИС: ${usersCount} пользователей, сложность ${systemComplexity}`;
                break;
            
            default:
                return res.status(400).json({
                    success: false,
                    message: 'Неверный тип услуги'
                });
        }

        // Учет срока реализации (базовая цена * 1.2 при сроке < 2 месяцев)
        if (parameters.timeframe && parameters.timeframe < 2) {
            price *= 1.2;
            details += `, срочный срок (${parameters.timeframe} мес.)`;
        }

        res.json({
            success: true,
            price: Math.round(price),
            serviceType,
            details: `Расчет для ${serviceType}: ${details}`
        });
    } catch (error) {
        console.error('Ошибка расчета:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при расчете стоимости'
        });
    }
  }
}

module.exports = new ServicesController();