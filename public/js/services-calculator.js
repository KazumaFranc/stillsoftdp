// Обработка формы заявки
document.getElementById('service-request').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = this;
    const submitBtn = form.querySelector('button[type="submit"]');
    const notificationArea = document.getElementById('notification-area');

    // Собираем данные
    const formData = {
        name: document.getElementById('client-name').value,
        phone: document.getElementById('client-phone').value,
        email: document.getElementById('client-email').value,
        message: document.getElementById('client-message').value,
        service: document.getElementById('selected-service').value,
        price: document.getElementById('calculated-price').value
    };

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    try {
        // Отправляем данные на сервер
        const response = await fetch('php/submit_request.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Показываем уведомление
        const notification = document.createElement('div');
        notification.className = `notification ${result.success ? 'success' : 'error'}`;
        notification.textContent = result.message;
        notificationArea.appendChild(notification);

        // Автоматическое закрытие через 5 сек
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 5000);

        // Очищаем форму при успехе
        if (result.success) {
            form.reset();
            resetCalculation();
        }

    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
    }
});