    // Бургер-меню для мобильных
    document.addEventListener('DOMContentLoaded', function() {
        const burgerMenu = document.getElementById('burgerMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMenu = document.getElementById('closeMenu');
        
        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        }
        
        if (burgerMenu && mobileMenu && closeMenu && mobileMenuOverlay) {
            burgerMenu.addEventListener('click', toggleMenu);
            
            closeMenu.addEventListener('click', toggleMenu);
            
            mobileMenuOverlay.addEventListener('click', toggleMenu);
            
            // Закрытие меню при клике на ссылку
            const menuLinks = document.querySelectorAll('.mobile-menu-items a');
            menuLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
        }
    });

    // Плавная прокрутка к секциям
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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

    // Добавляем обработчики для карточек категорий
    document.addEventListener('DOMContentLoaded', function() {
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', function() {
                const targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                scrollToSection(targetId);
            });
        });
    });