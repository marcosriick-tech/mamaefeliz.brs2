/**
 * Main JavaScript for Mamãe Feliz Theme
 */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        
        // Mobile Menu Toggle
        $('.menu-toggle').on('click', function() {
            $(this).toggleClass('active');
            $('.nav-menu').toggleClass('active');
            
            // Animate hamburger
            const hamburgers = $(this).find('.hamburger');
            if ($(this).hasClass('active')) {
                hamburgers.eq(0).css('transform', 'rotate(45deg) translate(5px, 5px)');
                hamburgers.eq(1).css('opacity', '0');
                hamburgers.eq(2).css('transform', 'rotate(-45deg) translate(7px, -6px)');
            } else {
                hamburgers.css({
                    'transform': 'none',
                    'opacity': '1'
                });
            }
        });

        // Smooth Scrolling for Anchor Links
        $('a[href*="#"]:not([href="#"])').on('click', function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800);
                    
                    // Close mobile menu if open
                    $('.nav-menu').removeClass('active');
                    $('.menu-toggle').removeClass('active');
                    $('.menu-toggle .hamburger').css({
                        'transform': 'none',
                        'opacity': '1'
                    });
                    
                    return false;
                }
            }
        });

        // Header Scroll Effect
        let lastScrollTop = 0;
        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();
            const header = $('.site-header');
            
            if (scrollTop > 100) {
                header.addClass('scrolled');
            } else {
                header.removeClass('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.addClass('header-hidden');
            } else {
                header.removeClass('header-hidden');
            }
            lastScrollTop = scrollTop;
        });

        // Contact Form Handler
        $('.contact-form').on('submit', function(e) {
            e.preventDefault();
            
            const form = $(this);
            const submitBtn = form.find('.contact-submit');
            const originalText = submitBtn.text();
            
            // Show loading state
            submitBtn.text('Enviando... ⏳').prop('disabled', true);
            
            // Simulate form submission (replace with actual AJAX call)
            setTimeout(function() {
                // Show success message
                form.html(`
                    <div class="success-message" style="text-align: center; padding: 2rem;">
                        <div style="font-size: 3rem; margin-bottom: 1rem;">🌸</div>
                        <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Obrigada por entrar em contato!</h3>
                        <p>Sua mensagem foi enviada com sucesso. Responderemos em breve!</p>
                    </div>
                `);
                
                // Reset form after 5 seconds
                setTimeout(function() {
                    location.reload();
                }, 5000);
                
            }, 2000);
        });

        // Animate Cards on Scroll
        function animateOnScroll() {
            $('.category-card, .offer-card, .post-card').each(function() {
                const elementTop = $(this).offset().top;
                const elementBottom = elementTop + $(this).outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).addClass('animate-in');
                }
            });
        }
        
        // Initial animation check
        animateOnScroll();
        
        // Animation on scroll
        $(window).on('scroll', animateOnScroll);

        // Floating Elements Animation
        function createFloatingElement(emoji, delay = 0) {
            const element = $(`<span class="floating-emoji">${emoji}</span>`);
            element.css({
                position: 'fixed',
                fontSize: '2rem',
                opacity: '0.1',
                pointerEvents: 'none',
                zIndex: '-1',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: delay + 's'
            });
            
            $('body').append(element);
            
            // Remove after animation
            setTimeout(() => {
                element.remove();
            }, 10000);
        }

        // Create floating elements periodically
        setInterval(() => {
            const emojis = ['💖', '✨', '🌸', '💕', '🌷', '💫'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            createFloatingElement(randomEmoji);
        }, 3000);

        // Marketplace Cards Click Handler
        $('.offer-card').on('click', function(e) {
            if (!$(e.target).is('a')) {
                const link = $(this).find('.offer-btn');
                if (link.length) {
                    window.location.href = link.attr('href');
                }
            }
        });

        // Category Cards Click Handler
        $('.category-card').on('click', function(e) {
            if (!$(e.target).is('a')) {
                const link = $(this).find('.category-link');
                if (link.length) {
                    window.location.href = link.attr('href');
                }
            }
        });

        // Search Form Enhancement
        $('.search-form input[type="search"]').on('focus', function() {
            $(this).parent().addClass('search-focused');
        }).on('blur', function() {
            $(this).parent().removeClass('search-focused');
        });

        // Comments Form Enhancement
        $('.comment-form input, .comment-form textarea').on('focus', function() {
            $(this).parent().addClass('field-focused');
        }).on('blur', function() {
            if (!$(this).val()) {
                $(this).parent().removeClass('field-focused');
            }
        });

        // Lazy Loading for Images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Back to Top Button
        const backToTop = $('<button class="back-to-top" aria-label="Voltar ao topo">↑</button>');
        backToTop.css({
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            zIndex: '1000'
        });
        
        $('body').append(backToTop);
        
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                backToTop.css({
                    opacity: '1',
                    visibility: 'visible'
                });
            } else {
                backToTop.css({
                    opacity: '0',
                    visibility: 'hidden'
                });
            }
        });
        
        backToTop.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
        });

        // Preloader (if needed)
        $(window).on('load', function() {
            $('.preloader').fadeOut('slow');
        });

    });

    // Window Load
    $(window).on('load', function() {
        // Remove loading classes
        $('body').removeClass('loading');
        
        // Trigger resize to fix any layout issues
        $(window).trigger('resize');
    });

    // Window Resize
    $(window).on('resize', function() {
        // Close mobile menu on resize
        if ($(window).width() > 768) {
            $('.nav-menu').removeClass('active');
            $('.menu-toggle').removeClass('active');
            $('.menu-toggle .hamburger').css({
                'transform': 'none',
                'opacity': '1'
            });
        }
    });

})(jQuery);

// Vanilla JS for better performance on some features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header-hidden {
            transform: translateY(-100%);
        }
        
        .scrolled {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(15px);
        }
        
        .search-focused {
            transform: scale(1.02);
        }
        
        .field-focused {
            transform: translateY(-2px);
        }
        
        .back-to-top:hover {
            background: var(--accent-color);
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        // Custom scroll logic here if needed
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
});