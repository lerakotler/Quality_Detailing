        // Мобильное меню
        document.addEventListener('DOMContentLoaded', function() {
            const burgerMenu = document.getElementById('burgerMenu');
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const closeMenu = document.getElementById('closeMenu');

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
        });

        // Карусель
        document.addEventListener('DOMContentLoaded', function() {
            const track = document.querySelector('.carousel-track');
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.carousel-dot');
            const prevBtn = document.querySelector('.carousel-arrow.prev');
            const nextBtn = document.querySelector('.carousel-arrow.next');
            let currentSlide = 0;
            
            function goToSlide(slideIndex) {
                track.style.transform = `translateX(-${slideIndex * 100}%)`;
                currentSlide = slideIndex;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === slideIndex);
                });
            }
            
            prevBtn.addEventListener('click', () => {
                let prevSlide = currentSlide - 1;
                if (prevSlide < 0) prevSlide = slides.length - 1;
                goToSlide(prevSlide);
            });
            
            nextBtn.addEventListener('click', () => {
                let nextSlide = (currentSlide + 1) % slides.length;
                goToSlide(nextSlide);
            });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    goToSlide(index);
                });
            });
            
            setInterval(() => {
                let nextSlide = (currentSlide + 1) % slides.length;
                goToSlide(nextSlide);
            }, 5000);
        });

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
// Форма обратной связи
document.addEventListener('DOMContentLoaded', function() {
    const callbackForm = document.querySelector('.callback-form');
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем стандартную отправку формы
            
            // Получаем значения полей
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            const submitBtn = this.querySelector('.submit-btn');
            
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            
            // Валидация
            if (!name || name.length < 2) {
                showError(nameInput, 'Введите имя (минимум 2 символа)');
                return;
            }
            
            if (!phone || !isValidPhone(phone)) {
                showError(phoneInput, 'Введите корректный номер телефона');
                return;
            }
            
            // Сохраняем оригинальный текст кнопки
            const originalText = submitBtn.textContent;
            
            // Показываем загрузку
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            // Эмуляция отправки на сервер (в реальном проекте здесь будет fetch или XMLHttpRequest)
            setTimeout(() => {
                // В реальном проекте здесь будет код отправки данных на сервер
                console.log('Данные для отправки:', { name, phone });
                
                // Показываем успешное сообщение
                showSuccessMessage(this, 'Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                
                // Возвращаем кнопку в исходное состояние
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Очищаем форму
                nameInput.value = '';
                phoneInput.value = '';
                
            }, 1500); // Имитация задержки сети
            
            // Убираем ошибки при успешной валидации
            clearErrors();
        });
        
        // Валидация в реальном времени
        const inputs = callbackForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                clearError(this);
                
                // Маска для телефона
                if (this.type === 'tel') {
                    formatPhoneNumber(this);
                }
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Функции валидации
        function isValidPhone(phone) {
            // Простая валидация телефона (можно расширить)
            const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
            return phoneRegex.test(phone.replace(/\D/g, ''));
        }
        
        function formatPhoneNumber(input) {
            let value = input.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0,3)}) ${value.slice(3)}`;
                } else if (value.length <= 8) {
                    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
                } else {
                    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,8)}-${value.slice(8,10)}`;
                }
            }
            
            input.value = value;
        }
        
        function validateField(field) {
            const value = field.value.trim();
            
            if (field.type === 'text') {
                if (!value || value.length < 2) {
                    showError(field, 'Введите имя (минимум 2 символа)');
                    return false;
                }
            }
            
            if (field.type === 'tel') {
                if (!value || !isValidPhone(value)) {
                    showError(field, 'Введите корректный номер телефона');
                    return false;
                }
            }
            
            return true;
        }
        
        function showError(input, message) {
            clearError(input);
            
            const errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.style.color = '#ff4444';
            errorElement.style.fontSize = '0.875rem';
            errorElement.style.marginTop = '0.25rem';
            errorElement.style.textAlign = 'left';
            errorElement.textContent = message;
            
            input.style.borderColor = '#ff4444';
            input.style.boxShadow = '0 0 0 2px rgba(255, 68, 68, 0.1)';
            
            input.parentNode.appendChild(errorElement);
            
            // Анимация ошибки
            errorElement.style.opacity = '0';
            errorElement.style.transform = 'translateY(-5px)';
            
            setTimeout(() => {
                errorElement.style.transition = 'all 0.3s ease';
                errorElement.style.opacity = '1';
                errorElement.style.transform = 'translateY(0)';
            }, 10);
        }
        
        function clearError(input) {
            const errorElement = input.parentNode.querySelector('.form-error');
            if (errorElement) {
                errorElement.style.opacity = '0';
                errorElement.style.transform = 'translateY(-5px)';
                
                setTimeout(() => {
                    errorElement.remove();
                }, 300);
            }
            
            input.style.borderColor = 'var(--accent-gold)';
            input.style.boxShadow = 'none';
        }
        
        function clearErrors() {
            const errors = callbackForm.querySelectorAll('.form-error');
            errors.forEach(error => error.remove());
            
            const inputs = callbackForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.style.borderColor = 'var(--accent-gold)';
                input.style.boxShadow = 'none';
            });
        }
        
        function showSuccessMessage(form, message) {
            // Удаляем предыдущее сообщение об успехе
            const existingMessage = form.querySelector('.form-success');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const successElement = document.createElement('div');
            successElement.className = 'form-success';
            successElement.style.backgroundColor = '#4CAF50';
            successElement.style.color = 'white';
            successElement.style.padding = 'var(--space-sm) var(--space-md)';
            successElement.style.borderRadius = '0.5rem';
            successElement.style.textAlign = 'center';
            successElement.style.marginTop = 'var(--space-md)';
            successElement.style.fontWeight = '600';
            successElement.style.opacity = '0';
            successElement.style.transform = 'translateY(-10px)';
            successElement.style.transition = 'all 0.3s ease';
            successElement.textContent = message;
            
            // Добавляем иконку успеха
            successElement.innerHTML = `
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                ${message}
            `;
            
            form.appendChild(successElement);
            
            // Анимация появления
            setTimeout(() => {
                successElement.style.opacity = '1';
                successElement.style.transform = 'translateY(0)';
            }, 10);
            
            // Автоматическое скрытие через 5 секунд
            setTimeout(() => {
                successElement.style.opacity = '0';
                successElement.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    successElement.remove();
                }, 300);
            }, 5000);
        }
    }
    
    // Обработка кликов на иконки телефона
    const phoneIcons = document.querySelectorAll('.callback-icon, .mobile-callback');
    phoneIcons.forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Плавная прокрутка к форме
            const callbackSection = document.getElementById('callback');
            if (callbackSection) {
                callbackSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Фокус на поле телефона
                setTimeout(() => {
                    const phoneInput = document.querySelector('input[type="tel"]');
                    if (phoneInput) {
                        phoneInput.focus();
                        
                        // Добавляем эффект привлечения внимания
                        phoneInput.style.transition = 'all 0.3s ease';
                        phoneInput.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.5)';
                        
                        setTimeout(() => {
                            phoneInput.style.boxShadow = 'none';
                        }, 1000);
                    }
                }, 500);
            }
        });
    });
});