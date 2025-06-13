document.addEventListener('DOMContentLoaded', function() {
    // Обработка формы заявки
    const form = document.getElementById('drone-dev-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Здесь будет код отправки формы
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            form.reset();

            // Можно добавить отправку данных на сервер
            // const formData = new FormData(form);
            // fetch('/submit-drone-form', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
            //     form.reset();
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            //     alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            // });
        });
    }
});