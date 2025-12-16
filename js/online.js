// ОБНОВЛЕННЫЕ ДАННЫЕ УСЛУГ С НОВЫМИ КАТЕГОРИЯМИ
// ОБНОВЛЕННЫЕ ДАННЫЕ УСЛУГ В СООТВЕТСТВИИ СО СТРАНИЦЕЙ УСЛУГ
const services = {
    exterior: [
        { name: "Комплексная мойка", price: 1500 },
        { name: "Детейлинг-мойка", price: 3000 },
        { name: "Полировка кузова", price: 8000 },
        { name: "Восстановление фар", price: 2000 },
        { name: "Чистка колесных арок", price: 1200 }
    ],
    interior: [
        { name: "Химчистка салона", price: 5000 },
        { name: "Чистка кожи", price: 3500 },
        { name: "Чистка текстиля", price: 2800 },
        { name: "Озонирование", price: 1500 },
        { name: "Чистка потолка", price: 2000 }
    ],
    protection: [
        { name: "Керамическое покрытие (1 год)", price: 15000 },
        { name: "Керамическое покрытие (2 года)", price: 25000 },
        { name: "Антигравийная пленка (капот)", price: 8000 },
        { name: "Жидкое стекло", price: 7000 },
        { name: "Восковое покрытие", price: 3500 }
    ],
    glass: [
        { name: "Гидрофобное покрытие стекол", price: 3000 },
        { name: "Полировка лобового стекла", price: 4000 },
        { name: "Восстановление фар (пара)", price: 3500 },
        { name: "Защитная пленка на фары", price: 2500 },
        { name: "Чистка системы омывателя", price: 800 }
    ],
    // КАТЕГОРИИ ИЗ СТРАНИЦЫ УСЛУГ
    wheels: [
        { name: "Чистка дисков и шин", price: 1500 },
        { name: "Полировка литых дисков", price: 3000 },
        { name: "Защитное покрытие дисков", price: 2500 },
        { name: "Чернение шин", price: 800 },
        { name: "Восстановление кованых дисков", price: 6000 }
    ],
    premium: [
        { name: "Полный детейлинг комплекс", price: 25000 },
        { name: "Нано-керамическое покрытие", price: 40000 },
        { name: "Антихром покрытие", price: 15000 },
        { name: "Защита карбона", price: 12000 },
        { name: "Консьерж-сервис", price: 5000 }
    ]
};

let selectedServices = [];
let categoryCounter = 0;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен');
    initApp();
});

function initApp() {
    initMobileMenu();
    initForm();
    initModals();
    addServiceCategory();
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

function initForm() {
    const form = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const addCategoryBtn = document.getElementById('addCategoryBtn');

    if (!form || !submitBtn || !addCategoryBtn) {
        console.error('Не найдены элементы формы');
        return;
    }

    console.log('Инициализация формы');

    // Обработчик отправки формы
    form.addEventListener('submit', function(e) {
        console.log('Форма отправляется');
        e.preventDefault();
        handleFormSubmit();
    });

    // Обработчик клика по кнопке
    submitBtn.addEventListener('click', function(e) {
        console.log('Кнопка отправки нажата');
        e.preventDefault();
        handleFormSubmit();
    });

    // Валидация полей в реальном времени
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        field.addEventListener('input', function() {
            clearError(this);
        });
    });

    // Кнопка добавления категории
    addCategoryBtn.addEventListener('click', function() {
        console.log('Добавление категории');
        addServiceCategory();
    });

    // Политика конфиденциальности
    const privacyCheckbox = document.getElementById('privacyAgreement');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', function() {
            const errorElement = document.getElementById('privacyError');
            if (errorElement) {
                errorElement.style.display = this.checked ? 'none' : 'block';
            }
        });
    }
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

function addServiceCategory() {
    categoryCounter++;
    const servicesCategories = document.getElementById('servicesCategories');
    
    if (!servicesCategories) {
        console.error('Не найден контейнер для категорий');
        return;
    }

    const categoryElement = document.createElement('div');
    categoryElement.className = 'service-category';
    categoryElement.innerHTML = `
        <div class="category-title">
            <span>Категория услуг #${categoryCounter}</span>
            <button type="button" class="add-category-btn remove-category" data-category="${categoryCounter}">
                <i class="fas fa-times"></i> Удалить
            </button>
        </div>
        <div class="form-group">
            <label for="serviceCategory${categoryCounter}">Выберите категорию</label>
            <select id="serviceCategory${categoryCounter}" class="service-category-select">
                <option value="">Выберите категорию</option>
                <option value="exterior">Экстерьер</option>
                <option value="interior">Интерьер</option>
                <option value="protection">Защитные покрытия</option>
                <option value="glass">Стекла и оптика</option>
                <option value="wheels">Диски и шины</option>
                <option value="premium">Премиум услуги</option>
            </select>
        </div>
        <div id="servicesContainer${categoryCounter}">
            <div class="time-note" style="text-align: left; background: transparent; border-left: none;">
                Выберите категорию для отображения услуг
            </div>
        </div>
    `;
    
    servicesCategories.appendChild(categoryElement);
    
    // Обработчик выбора категории
    const categorySelect = document.getElementById(`serviceCategory${categoryCounter}`);
    categorySelect.addEventListener('change', function() {
        updateServicesList(this.value, categoryCounter);
    });
    
    // Обработчик удаления категории
    const removeBtn = categoryElement.querySelector('.remove-category');
    removeBtn.addEventListener('click', function() {
        if (document.querySelectorAll('.service-category').length > 1) {
            // Удаляем услуги этой категории из выбранных
            selectedServices = selectedServices.filter(service => service.categoryId !== categoryCounter);
            updateSelectedServices();
            servicesCategories.removeChild(categoryElement);
        } else {
            alert('Должна остаться хотя бы одна категория услуг');
        }
    });
}

function updateServicesList(category, categoryId) {
    const container = document.getElementById(`servicesContainer${categoryId}`);
    
    if (!container) return;

    if (!category || !services[category]) {
        container.innerHTML = '<div class="time-note" style="text-align: left; background: transparent; border-left: none;">Выберите категорию для отображения услуг</div>';
        return;
    }
    
    container.innerHTML = '';
    
    services[category].forEach(service => {
        const isSelected = selectedServices.some(s => s.name === service.name && s.categoryId === categoryId);
        
        const serviceElement = document.createElement('div');
        serviceElement.className = 'service-checkbox';
        serviceElement.innerHTML = `
            <input type="checkbox" id="service-${categoryId}-${service.name.replace(/\s+/g, '-')}" 
                    value="${service.name}" data-price="${service.price}" data-category-id="${categoryId}"
                    ${isSelected ? 'checked' : ''}>
            <label for="service-${categoryId}-${service.name.replace(/\s+/g, '-')}">${service.name}</label>
            <span class="service-price">от ${service.price.toLocaleString()} ₽</span>
        `;
        
        container.appendChild(serviceElement);
        
        // Обработчик выбора услуги
        const checkbox = serviceElement.querySelector('input');
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                selectedServices.push({
                    name: this.value,
                    price: parseInt(this.dataset.price),
                    categoryId: categoryId
                });
            } else {
                selectedServices = selectedServices.filter(s => 
                    !(s.name === this.value && s.categoryId === categoryId)
                );
            }
            updateSelectedServices();
        });
    });
}

function updateSelectedServices() {
    const list = document.getElementById('selectedServicesList');
    const totalElement = document.getElementById('totalPrice');
    const totalAmount = document.getElementById('totalAmount');
    const errorElement = document.getElementById('servicesError');
    
    if (!list) return;

    if (selectedServices.length === 0) {
        list.innerHTML = '<div class="time-note" style="text-align: left; background: transparent; border-left: none;">Услуги не выбраны</div>';
        if (totalElement) totalElement.style.display = 'none';
        if (errorElement) errorElement.style.display = 'block';
        return;
    }
    
    list.innerHTML = '';
    let total = 0;
    
    selectedServices.forEach((service, index) => {
        total += service.price;
        
        const item = document.createElement('div');
        item.className = 'selected-service-item';
        item.innerHTML = `
            <div class="selected-service-name">${service.name}</div>
            <div class="selected-service-price">от ${service.price.toLocaleString()} ₽</div>
            <button type="button" class="remove-service" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        list.appendChild(item);
        
        // Обработчик удаления
        item.querySelector('.remove-service').addEventListener('click', function() {
            selectedServices.splice(parseInt(this.dataset.index), 1);
            updateSelectedServices();
            updateServicesCheckboxes();
        });
    });
    
    if (totalAmount) totalAmount.textContent = `от ${total.toLocaleString()} ₽`;
    if (totalElement) totalElement.style.display = 'flex';
    if (errorElement) errorElement.style.display = 'none';
}

function updateServicesCheckboxes() {
    document.querySelectorAll('.service-category-select').forEach(select => {
        const categoryId = select.id.replace('serviceCategory', '');
        if (select.value) {
            updateServicesList(select.value, categoryId);
        }
    });
}

function initModals() {
    // Политика конфиденциальности
    const privacyLink = document.getElementById('privacyLink');
    const footerPrivacyLink = document.getElementById('footerPrivacyLink');
    const privacyModal = document.getElementById('privacyModal');
    const closePrivacyModal = document.getElementById('closePrivacyModal');
    
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function() {
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (footerPrivacyLink && privacyModal) {
        footerPrivacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closePrivacyModal && privacyModal) {
        closePrivacyModal.addEventListener('click', function() {
            privacyModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Подтверждение отправки
    const confirmationModal = document.getElementById('confirmationModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    
    if (closeConfirmationModal && confirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Закрытие по клику вне окна
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('privacyModal')) {
            document.getElementById('privacyModal').classList.remove('active');
            document.body.style.overflow = '';
        }
        if (e.target === document.getElementById('confirmationModal')) {
            document.getElementById('confirmationModal').classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function validateField(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (!errorElement) return true;

    let isValid = true;
    
    if (!field.value.trim()) {
        isValid = false;
    } else if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
        }
    } else if (field.type === 'tel') {
        const phoneRegex = /^[\+]?[7-8]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.style.display = 'block';
    } else {
        field.classList.remove('error');
        errorElement.style.display = 'none';
    }
    
    return isValid;
}

function clearError(field) {
    const errorId = field.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        field.classList.remove('error');
        errorElement.style.display = 'none';
    }
}

function handleFormSubmit() {
    console.log('Начало обработки отправки формы');
    
    // Валидация обязательных полей
    const requiredFields = ['clientName', 'clientPhone', 'clientEmail', 'carModel'];
    let isFormValid = true;

    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !validateField(field)) {
            isFormValid = false;
        }
    });

    // Проверка выбора услуг
    if (selectedServices.length === 0) {
        const servicesError = document.getElementById('servicesError');
        if (servicesError) {
            servicesError.style.display = 'block';
        }
        isFormValid = false;
    }

    // Проверка политики конфиденциальности
    const privacyCheckbox = document.getElementById('privacyAgreement');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        const privacyError = document.getElementById('privacyError');
        if (privacyError) {
            privacyError.style.display = 'block';
        }
        isFormValid = false;
    }

    if (!isFormValid) {
        console.log('Форма не прошла валидацию');
        alert('Пожалуйста, заполните все обязательные поля правильно и выберите хотя бы одну услугу');
        return;
    }

    console.log('Форма прошла валидацию, начинаем имитацию отправки');
    simulateFormSubmission();
}

function simulateFormSubmission() {
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    if (!submitBtn) return;

    // Блокируем кнопку
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Собираем данные формы для отображения в консоли
    const formData = {
        name: document.getElementById('clientName').value,
        phone: document.getElementById('clientPhone').value,
        email: document.getElementById('clientEmail').value,
        carModel: document.getElementById('carModel').value,
        carYear: document.getElementById('carYear').value,
        services: selectedServices,
        additionalInfo: document.getElementById('additionalInfo').value,
        totalAmount: selectedServices.reduce((sum, service) => sum + service.price, 0)
    };

    console.log('📧 ИМИТАЦИЯ ОТПРАВКИ НА ПОЧТУ');
    console.log('Получатель: lerakotler1408@icloud.com');
    console.log('Тема: Новая заявка с сайта Quality Detailing');
    console.log('Данные формы:', formData);
    console.log('--- КОНЕЦ ИМИТАЦИИ ---');

    // Имитация задержки отправки (2 секунды)
    setTimeout(() => {
        console.log('✅ Заявка успешно отправлена! (имитация)');
        
        // Сбрасываем форму
        document.getElementById('bookingForm').reset();
        
        // Сбрасываем выбранные услуги
        selectedServices = [];
        updateSelectedServices();
        
        // Сбрасываем категории
        const servicesCategories = document.getElementById('servicesCategories');
        if (servicesCategories) {
            servicesCategories.innerHTML = '';
            categoryCounter = 0;
            addServiceCategory();
        }

        // Показываем сообщение об успехе
        if (successMessage) {
            successMessage.style.display = 'block';
        }

        // Показываем модальное окно подтверждения
        const confirmationModal = document.getElementById('confirmationModal');
        if (confirmationModal) {
            confirmationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        // Восстанавливаем кнопку
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку на запись';

        // Скрываем сообщение об успехе через 5 секунд
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = 'none';
            }
        }, 5000);

    }, 2000);
}