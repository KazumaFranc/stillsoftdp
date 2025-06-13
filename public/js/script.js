document.addEventListener('DOMContentLoaded', function() {

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }


    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length && productCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {

                filterButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');


                productCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }


    initClientsSlider();
    
    if (document.querySelector('.team-grid')) {
        loadTeamMembers();
    }
});

// Инициализация слайдера клиентов
function initClientsSlider() {
    const clientsSlider = document.querySelector('.clients-slider');
    if (!clientsSlider) return;

    // Здесь может быть код для инициализации слайдера (например, с использованием библиотеки)
    // Для примера просто добавим логотипы клиентов
    const clients = [
        { name: 'Client 1', logo: 'images/client1.png' },
        { name: 'Client 2', logo: 'images/client2.png' },
        { name: 'Client 3', logo: 'images/client3.png' },
        { name: 'Client 4', logo: 'images/client4.png' },
        { name: 'Client 5', logo: 'images/client5.png' }
    ];

    clients.forEach(client => {
        const clientElement = document.createElement('div');
        clientElement.className = 'client-item';
        clientElement.innerHTML = `<img src="${client.logo}" alt="${client.name}">`;
        clientsSlider.appendChild(clientElement);
    });
}

// Загрузка данных команды
function loadTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    // Здесь может быть запрос к API или использование статических данных
    const teamMembers = [
        { name: 'Иван Иванов', position: 'CEO', photo: 'images/team1.jpg' },
        { name: 'Петр Петров', position: 'CTO', photo: 'images/team2.jpg' },
        { name: 'Анна Сидорова', position: 'Менеджер проектов', photo: 'images/team3.jpg' },
        { name: 'Мария Кузнецова', position: 'UX/UI дизайнер', photo: 'images/team4.jpg' }
    ];

    teamMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.innerHTML = `
            <img src="${member.photo}" alt="${member.name}">
            <div class="team-member-info">
                <h3>${member.name}</h3>
                <p>${member.position}</p>
            </div>
        `;
        teamGrid.appendChild(memberElement);
    });
}

// Easter Eggs для музыкальных кодов
class EasterEggs {
    constructor() {
        this.sequence = [];
        this.codePatterns = {
            'nessa': () => this.playMusic('sounds/contra.mp3', 0.5),
            'iddqd': () => this.playMusic('sounds/doom.mp3', 0.7),
            'nokia': () => this.playMusic('sounds/nokia.mp3', 0.3),
            'secret': () => this.playMusic('sounds/secret.mp3', 0.4),
            'stilsoft': () => {
                this.playMusic('sounds/anthem.mp3', 0.6);
                this.showVisualEffect();
            }
        };

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.detectCode(e));
    }

    detectCode(e) {
        // Ограничиваем длину последовательности
        if (this.sequence.length > 20) {
            this.sequence.shift();
        }

        this.sequence.push(e.key.toLowerCase());
        const currentSequence = this.sequence.join('');

        // Проверяем совпадение с известными кодами
        for (const [code, action] of Object.entries(this.codePatterns)) {
            if (currentSequence.includes(code)) {
                action();
                this.sequence = []; // Сбрасываем последовательность
                break;
            }
        }
    }

    playMusic(src, volume = 0.5) {
        // Останавливаем предыдущую музыку
        this.stopMusic();

        // Создаем аудио элемент
        this.audio = new Audio(src);
        this.audio.volume = volume;
        this.audio.play()
            .catch(e => console.log('Автовоспроизведение заблокировано:', e));

        // Создаем кнопку отключения
        this.createStopButton();
    }

    stopMusic() {
        if (this.audio) {
            this.audio.pause();
            this.audio = null;
        }
        if (this.stopBtn) {
            this.stopBtn.remove();
            this.stopBtn = null;
        }
    }

    createStopButton() {
        this.stopBtn = document.createElement('div');
        this.stopBtn.className = 'music-stop-btn';
        this.stopBtn.innerHTML = '✕';
        this.stopBtn.title = 'Остановить музыку';
        this.stopBtn.addEventListener('click', () => this.stopMusic());

        document.body.appendChild(this.stopBtn);
    }

    showVisualEffect() {
        const effect = document.createElement('div');
        effect.className = 'easter-egg-effect';
        document.body.appendChild(effect);

        setTimeout(() => {
            effect.remove();
        }, 5000);
    }
}

// Инициализация после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    window.easterEggs = new EasterEggs();
});