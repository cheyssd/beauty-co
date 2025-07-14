        // Variables globales
        let scrollRevealObserver;
        let lastScrollY = window.scrollY;

        // Fonction d'initialisation
        function initializeWebsite() {
            document.body.classList.add('loaded');

            // Initialiser les révélations au scroll
            initScrollReveal();

            // Trigger animations pour le hero
            setTimeout(() => {
                const heroElements = document.querySelectorAll('#accueil .scroll-reveal');
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, index * 200);
                });
            }, 500);
        }

        // Fonction de révélation au scroll
        function initScrollReveal() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            scrollRevealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.scroll-reveal').forEach(el => {
                scrollRevealObserver.observe(el);
            });
        }

        // Navigation fluide
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 100;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        // Effets du header au scroll
        function initHeaderEffects() {
            window.addEventListener('scroll', () => {
                const header = document.getElementById('header');
                const currentScrollY = window.scrollY;

                // Changement d'apparence selon la position
                if (currentScrollY > 100) {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.1)';
                    header.style.backdropFilter = 'blur(20px)';
                    header.style.boxShadow = 'none';
                }

                // Cache/montre le header selon la direction du scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
            });
        }

        // Gestion du formulaire de contact
        function initContactForm() {
            const form = document.getElementById('contactForm');
            if (!form) return;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const inputs = this.querySelectorAll('input[required], textarea[required]');
                let isValid = true;

                // Validation des champs
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderBottomColor = '#ef4444';
                        input.style.boxShadow = '0 1px 0 0 #ef4444';

                        // Reset du style d'erreur après 3 secondes
                        setTimeout(() => {
                            input.style.borderBottomColor = 'rgba(255,255,255,0.3)';
                            input.style.boxShadow = 'none';
                        }, 3000);
                    } else {
                        input.style.borderBottomColor = '#d4b896';
                        input.style.boxShadow = '0 1px 0 0 #d4b896';
                    }
                });

                if (isValid) {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.querySelector('span').textContent;

                    // État de chargement
                    submitBtn.querySelector('span').textContent = 'Envoi en cours...';
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.7';

                    // Simulation d'envoi
                    setTimeout(() => {
                        // Notification de succès
                        showNotification('Merci ! Nous vous recontacterons sous 24h.', 'success');

                        // Reset du formulaire
                        this.reset();
                        submitBtn.querySelector('span').textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';

                        // Reset des bordures
                        inputs.forEach(input => {
                            input.style.borderBottomColor = 'rgba(255,255,255,0.3)';
                            input.style.boxShadow = 'none';
                        });
                    }, 2000);
                }
            });
        }

        // Fonction de notification
        function showNotification(message, type = 'success') {
            const notification = document.createElement('div');
            const bgColor = type === 'success' ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600';

            notification.innerHTML = `
                <div class="fixed top-4 right-4 bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-lg shadow-xl z-50 transform translate-x-full transition-transform duration-300" id="notification">
                    <div class="flex items-center space-x-3">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>${message}</span>
                    </div>
                </div>
            `;

            document.body.appendChild(notification);

            // Animation d'entrée
            setTimeout(() => {
                const notif = document.getElementById('notification');
                if (notif) {
                    notif.style.transform = 'translateX(0)';
                }
            }, 100);

            // Suppression après 5 secondes
            setTimeout(() => {
                const notif = document.getElementById('notification');
                if (notif) {
                    notif.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        notification.remove();
                    }, 300);
                }
            }, 5000);
        }

        // Effets hover améliorés
        function initHoverEffects() {
            document.querySelectorAll('.hover-lift').forEach(element => {
                element.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateY(-12px) scale(1.02)';
                    this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                });

                element.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '';
                });
            });
        }

        // Menu mobile (placeholder)
        function initMobileMenu() {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.addEventListener('click', () => {
                    console.log('Menu mobile cliqué - À implémenter si nécessaire');
                });
            }
        }

        // Optimisation des performances
        function initPerformanceOptimizations() {
            let ticking = false;

            function updateAnimations() {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        // Animations supplémentaires basées sur le scroll peuvent être ajoutées ici
                        ticking = false;
                    });
                    ticking = true;
                }
            }

            window.addEventListener('scroll', updateAnimations, { passive: true });
        }

        // Initialisation complète au chargement de la page
        window.addEventListener('load', () => {
            initializeWebsite();
            initSmoothScrolling();
            initHeaderEffects();
            initContactForm();
            initHoverEffects();
            initMobileMenu();
            initPerformanceOptimizations();
        });

        // Gestion des erreurs JavaScript
        window.addEventListener('error', (e) => {
            console.warn('Erreur JavaScript capturée:', e.error);
        });

        // Support pour les navigateurs plus anciens
        if (!window.IntersectionObserver) {
            console.warn('IntersectionObserver non supporté - les animations de scroll sont désactivées');

            // Fallback : afficher tous les éléments scroll-reveal
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.scroll-reveal').forEach(el => {
                    el.classList.add('revealed');
                });
            });
        }