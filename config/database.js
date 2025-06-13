const mysql = require('mysql2/promise');
require('dotenv').config();

// Конфигурация базы данных
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'stilsoft_site',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
};

// Создание пула соединений
const pool = mysql.createPool(dbConfig);

// Функция для тестирования соединения
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Соединение с базой данных установлено');
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Ошибка подключения к базе данных:', error.message);
        return false;
    }
}

// Экспорт пула и функций
module.exports = {
    pool,
    testConnection
};