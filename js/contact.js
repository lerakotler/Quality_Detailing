// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    initMobileMenu();
    initCallbackForm();
    initYandexMap();
    initBackToTop();
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
function initBackToTop() {
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
}

// Инициализация Яндекс карты с меткой
function initYandexMap() {
    // Проверяем, загружена ли библиотека Яндекс Карт
    if (typeof ymaps === 'undefined') {
        console.error('Библиотека Яндекс Карт не загружена');
        // Пытаемся загрузить снова через 1 секунду
        setTimeout(initYandexMap, 1000);
        return;
    }
    
    ymaps.ready(function() {
        // Координаты Кронштадтского бульвара 37Б, Москва
        const coordinates = [55.8479, 37.5176];
        
        // Проверяем, существует ли элемент для карты
        const mapElement = document.getElementById('yandex-map');
        if (!mapElement) {
            console.error('Элемент для карты не найден');
            return;
        }
        
        try {
            // Создаем карту
            const myMap = new ymaps.Map("yandex-map", {
                center: coordinates,
                zoom: 17,
                controls: ['zoomControl', 'fullscreenControl', 'typeSelector']
            }, {
                searchControlProvider: 'yandex#search'
            });
            
            // Создаем метку с детальной информацией
            const myPlacemark = new ymaps.Placemark(coordinates, {
                balloonContentHeader: 'Quality Detailing',
                balloonContentBody: `
                    <div style="padding: 5px 0;">
                        <strong>Адрес:</strong><br>
                        Москва, Кронштадтский бульвар, д. 37Б
                    </div>
                    <div style="padding: 5px 0;">
                        <strong>Телефоны:</strong><br>
                        +7 (977) 830-36-70<br>
                        +7 (977) 928-08-59
                    </div>
                    <div style="padding: 5px 0;">
                        <strong>Часы работы:</strong><br>
                        Пн-Пт: 9:00-20:00<br>
                        Сб: 10:00-18:00<br>
                        Вс: Выходной
                    </div>
                `,
                hintContent: 'Quality Detailing - детейлинг-центр'
            }, {
                preset: 'islands#goldIcon',
                iconColor: '#D4AF37',
                balloonCloseButton: true,
                hideIconOnBalloonOpen: false
            });
            
            // Добавляем метку на карту
            myMap.geoObjects.add(myPlacemark);
            
            // Открываем балун при клике на метку
            myPlacemark.events.add('click', function(e) {
                if (!myPlacemark.balloon.isOpen()) {
                    myPlacemark.balloon.open();
                }
            });
            
            // Закрытие балуна при клике на карту
            myMap.events.add('click', function(e) {
                myPlacemark.balloon.close();
            });
            
            // Оптимизация для мобильных устройств
            if (window.innerWidth <= 768) {
                myMap.behaviors.disable('drag');
                myMap.behaviors.disable('scrollZoom');
            }
            
        } catch (error) {
            console.error('Ошибка при создании карты:', error);
            
            // Альтернатива - показываем статичное изображение карты
            mapElement.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    background: #f5f5f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                ">
                    <div>
                        <h3>Карта не загрузилась</h3>
                        <p>Quality Detailing находится по адресу:</p>
                        <p><strong>Москва, Кронштадтский бульвар, д. 37Б</strong></p>
                        <p>Телефон: +7 (977) 830-36-70</p>
                    </div>
                </div>
            `;
        }
    });
}
