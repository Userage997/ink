document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const screen1 = document.getElementById('screen1');
    const screen2 = document.getElementById('screen2');
    const aboutOwnerBtn = document.getElementById('aboutOwner');
    const backBtn = document.getElementById('backBtn');
    const animatedText = document.getElementById('animated-text');
    
    // Анимация текста при загрузке
    function animateWelcomeText() {
        const text = animatedText.textContent;
        animatedText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                animatedText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Инициализация анимации текста
    animateWelcomeText();
    
    // Переход на второй экран
    aboutOwnerBtn.addEventListener('click', function() {
        // Плавное скрытие первого экрана
        screen1.style.opacity = '0';
        screen1.style.visibility = 'hidden';
        
        setTimeout(() => {
            // Показываем второй экран
            screen2.style.opacity = '1';
            screen2.style.visibility = 'visible';
            screen2.classList.add('active');
            
            // Прокрутка к верху
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
    
    // Возврат на первый экран
    backBtn.addEventListener('click', function() {
        // Плавное скрытие второго экрана
        screen2.style.opacity = '0';
        screen2.style.visibility = 'hidden';
        
        setTimeout(() => {
            // Показываем первый экран
            screen1.style.opacity = '1';
            screen1.style.visibility = 'visible';
            screen1.classList.add('active');
            
            // Прокрутка к верху
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 300);
    });
    
    // Плавная анимация для всех кнопок
    const buttons = document.querySelectorAll('.btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Эффект волны при клике
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Добавляем стили для эффекта волны
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: 20px;
            height: 20px;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Параллакс эффект для фона при прокрутке
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const circles = document.querySelectorAll('.circle');
        
        circles.forEach((circle, index) => {
            const speed = 0.2 + (index * 0.1);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
        });
    });
    
    // Обработка нажатия клавиши Escape для возврата
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && screen2.classList.contains('active')) {
            backBtn.click();
        }
    });
    
    // Инициализация анимации кругов
    function initCircleAnimations() {
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            const delay = Math.random() * 10;
            circle.style.animationDelay = `${delay}s`;
            
            const duration = 10 + Math.random() * 10;
            circle.style.animationDuration = `${duration}s`;
        });
    }
    
    initCircleAnimations();
    
    // Предзагрузка изображений для плавного отображения
    function preloadImages() {
        const images = [
            'https://imgfoto.host/i/OHNXpd',  // Аватар Инквизитора
            'https://imgfoto.host/i/OHlVDn'   // Аватар проекта
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // Дополнительные эффекты для тематики "Инквизиция"
    function addInquisitionEffects() {
        // Добавляем свечение к логотипу при наведении
        const logoImg = document.querySelector('.logo-img');
        if (logoImg) {
            logoImg.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 15px rgba(178, 34, 34, 0.7))';
                this.style.transition = 'filter 0.3s ease';
            });
            
            logoImg.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
            });
        }
        
        // Добавляем свечение к аватару Инквизитора при наведении
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 20px rgba(139, 0, 0, 0.8))';
                this.style.transition = 'filter 0.3s ease';
            });
            
            profileImg.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
            });
        }
        
        // Добавляем эффект пламени для заголовка
        const projectTitle = document.querySelector('.project-title-line');
        if (projectTitle) {
            setInterval(() => {
                const intensity = 0.5 + Math.random() * 0.5;
                const redIntensity = 0.3 + Math.random() * 0.3;
                const darkRedIntensity = 0.2 + Math.random() * 0.2;
                
                projectTitle.style.textShadow = `
                    0 0 10px rgba(255, 69, 0, ${intensity}),
                    0 0 20px rgba(255, 0, 0, ${redIntensity}),
                    0 0 30px rgba(139, 0, 0, ${darkRedIntensity})
                `;
            }, 1000);
        }
        
        // Добавляем эффект свечения к кнопкам при наведении
        const btns = document.querySelectorAll('.btn-primary, .btn-reputation');
        btns.forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 30px rgba(139, 0, 0, 0.4)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
            });
        });
    }
    
    // Инициализация дополнительных эффектов
    setTimeout(addInquisitionEffects, 1000);
    
    // Обработка ошибок загрузки изображений
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                console.error(`Ошибка загрузки изображения: ${this.src}`);
                // Замена на стандартное изображение при ошибке
                if (this.classList.contains('logo-img')) {
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiByeD0iOTAiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjFfNTMpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTIxXzUzIiB4MT0iMCIgeTE9IjAiIHgyPSIxODAiIHkyPSIxODAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzEzOTAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNCMDg4ODgiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
                } else if (this.classList.contains('profile-img')) {
                    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDI4MCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjgwIiByeD0iMjAiIGZpbGw9InVybCgjcGFpbnQwX2xpbmVhcl8xMjFfNTMpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTIxXzUzIiB4MT0iMCIgeTE9IjAiIHgyPSIyODAiIHkyPSIyODAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzEzOTAwMCIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNCMDg4ODgiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K';
                }
            });
        });
    }
    
    // Инициализация обработки ошибок изображений
    handleImageErrors();
    
    // Плавный скролл для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация появления элементов при скролле
    function animateOnScroll() {
        const elements = document.querySelectorAll('.description-section, .skills-list li');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }
    
    // Инициализация анимации при скролле
    setTimeout(animateOnScroll, 1500);
    
    // Управление историей браузера
    function manageHistory() {
        // При переходе на второй экран добавляем в историю
        aboutOwnerBtn.addEventListener('click', function() {
            history.pushState({ screen: 'about' }, '', '#about');
        });
        
        // При возврате на первый экран добавляем в историю
        backBtn.addEventListener('click', function() {
            history.pushState({ screen: 'home' }, '', '#home');
        });
        
        // Обработка кнопок назад/вперед браузера
        window.addEventListener('popstate', function(event) {
            if (window.location.hash === '#about' || (event.state && event.state.screen === 'about')) {
                aboutOwnerBtn.click();
            } else {
                backBtn.click();
            }
        });
        
        // Проверяем начальный хэш в URL
        if (window.location.hash === '#about') {
            setTimeout(() => aboutOwnerBtn.click(), 100);
        }
    }
    
    // Инициализация управления историей
    manageHistory();
    
    // Добавление favicon динамически
    function addFavicon() {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22 fill=%22%23B22222%22>⚔️</text></svg>';
        document.head.appendChild(link);
    }
    
    addFavicon();
});
