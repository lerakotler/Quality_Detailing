
// Мобильное меню и кнопка наверх
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
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

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', toggleMenu);
        closeMenu.addEventListener('click', toggleMenu);
        mobileMenuOverlay.addEventListener('click', toggleMenu);

        document.querySelectorAll('.mobile-menu-items a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }
    
    // Стрелка наверх
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
