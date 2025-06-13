const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const engine = require('ejs-mate');


require('dotenv').config();

const app = express();

app.engine('ejs', engine);

const PORT = process.env.PORT || 3000;

// Безопасность и сжатие
app.use(helmet({
  contentSecurityPolicy: false // Отключаем для работы с inline стилями
}));
app.use(compression());

// Настройка EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Импорт маршрутов
const indexRoutes = require('./routes/index'); // Главная страница
const aboutRoutes = require('./routes/about'); // О нас
const partnerRoutes = require('./routes/partner'); // как стать партнером
const droneRoutes = require('./routes/drone'); // Заявки
const servicesRoutes = require('./routes/services'); // услуги
const contactsRoutes = require('./routes/contacts'); // контакты

const apiRoutes = require('./routes/api');

// Использование маршрутов
app.use('/', indexRoutes);
app.use('/about', aboutRoutes);
app.use('/partner', partnerRoutes);
app.use('/drone', droneRoutes);
app.use('/services', servicesRoutes);
app.use('/contacts', contactsRoutes);

app.use('/api', apiRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).render('pages/404', {
    title: 'Страница не найдена | Стилсофт',
    currentPage: '404'
  });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).render('pages/error', {
    title: 'Внутренняя ошибка сервера | Стилсофт',
    currentPage: 'error',
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📁 Статические файлы обслуживаются из: ${path.join(__dirname, 'public')}`);
  console.log(`🎨 Шаблоны EJS из: ${path.join(__dirname, 'views')}`);
});