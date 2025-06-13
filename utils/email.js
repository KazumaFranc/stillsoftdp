const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Отправляет email
 * @param {string} to - Email получателя
 * @param {string} subject - Тема письма
 * @param {string} text - Текст письма
 */
async function sendEmail(to, subject, text) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    });
    console.log('Email отправлен:', info.messageId);
  } catch (error) {
    console.error('Ошибка отправки email:', error);
    throw error;
  }
}

module.exports = { sendEmail };