// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initMobileMenu();
    initCallbackForm();
    initYandexMap();
}

function initMobileMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    if (!burgerMenu || !mobileMenu) return;

    function toggleMenu() {
        const isActive = mobileMenu.classList.contains('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.style.overflow = isActive ? '' : 'hidden';
    }

    burgerMenu.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-menu-items a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

function initCallbackForm() {
    const callbackForm = document.getElementById('callbackForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    
    if (!callbackForm) return;
    
    callbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('callbackName').value;
        const phone = document.getElementById('callbackPhone').value;
        
        // Валидация формы
        if (!name || !phone) {
            alert('Пожалуйста, заполните все поля');
            return;
        }
        
        // Имитация отправки формы
        console.log('📞 Заявка на обратный звонок:');
        console.log('Имя:', name);
        console.log('Телефон:', phone);
        
        // Показываем модальное окно подтверждения
        if (confirmationModal) {
            confirmationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Очищаем форму
        callbackForm.reset();
    });
    
    // Закрытие модального окна
    if (closeConfirmationModal && confirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Стрелка наверх
    document.addEventListener('DOMContentLoaded', function() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (backToTopBtn) {
            // Показываем/скрываем стрелку при прокрутке
            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            });
            
            // Плавная прокрутка наверх при клике
            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });

// Инициализация Яндекс карты с меткой
function initYandexMap() {
    ymaps.ready(function () {
        // Создаем карту
        var myMap = new ymaps.Map("yandex-map", {
            center: [55.8479, 37.5176], // Координаты Кронштадтского бульвара
            zoom: 16,
            controls: ['zoomControl', 'fullscreenControl']
        }, {
            searchControlProvider: 'yandex#search'
        });

        // Создаем метку
        var myPlacemark = new ymaps.Placemark([55.8479, 37.5176], {
            balloonContent: '<strong>Quality Detailing</strong><br>Кронштадтский бульвар, д. 37Б<br>Москва'
        }, {
            preset: 'islands#goldIcon', // Золотая иконка
            iconColor: '#D4AF37' // Цвет как accent-gold
        });

        // Добавляем метку на карту
        myMap.geoObjects.add(myPlacemark);

        // Открываем балун при клике на метку
        myPlacemark.events.add('click', function (e) {
            myPlacemark.balloon.open();
        });
    });
}