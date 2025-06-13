/**
 * Colorblind Mode Toggle
 * Добавляет возможность переключения в режим для дальтоников
 */
class ColorblindMode {
    constructor() {
        this.isEnabled = false;
        this.colorblindCSS = document.getElementById('colorblind-css');
        this.toggleButton = document.getElementById('colorblind-toggle');
        this.init();
    }

    init() {
        // Проверяем сохраненные настройки
        this.checkSavedPreferences();

        // Инициализируем кнопку
        if (this.toggleButton) {
            this.toggleButton.addEventListener('click', () => this.toggleMode());
            this.updateButtonState();
        }
    }

    checkSavedPreferences() {
        // Проверяем localStorage
        const savedState = localStorage.getItem('colorblindMode');
        if (savedState === 'enabled') {
            this.enableMode();
        }
    }

    toggleMode() {
        this.isEnabled = !this.isEnabled;

        if (this.isEnabled) {
            this.enableMode();
        } else {
            this.disableMode();
        }

        this.updateButtonState();
        this.savePreferences();
    }

    enableMode() {
        this.isEnabled = true;
        if (this.colorblindCSS) {
            this.colorblindCSS.removeAttribute('disabled');
        }

        // Добавляем класс к body для дополнительного контроля
        document.body.classList.add('colorblind-mode');
    }

    disableMode() {
        this.isEnabled = false;
        if (this.colorblindCSS) {
            this.colorblindCSS.setAttribute('disabled', 'true');
        }

        // Удаляем класс из body
        document.body.classList.remove('colorblind-mode');
    }

    updateButtonState() {
        if (this.toggleButton) {
            if (this.isEnabled) {
                this.toggleButton.classList.add('active');
                this.toggleButton.setAttribute('aria-pressed', 'true');
            } else {
                this.toggleButton.classList.remove('active');
                this.toggleButton.setAttribute('aria-pressed', 'false');
            }
        }
    }

    savePreferences() {
        localStorage.setItem('colorblindMode', this.isEnabled ? 'enabled' : 'disabled');
    }
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    const colorblindMode = new ColorblindMode();

    // Для доступа из других скриптов
    window.colorblindMode = colorblindMode;
});