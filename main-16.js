/**
 * Main JavaScript for Home Money Theme
 */

(function($) {
    'use strict';

    // DOM Ready
    $(document).ready(function() {
        initializeTheme();
    });

    // Window Load
    $(window).on('load', function() {
        handlePageLoad();
    });

    // Window Resize
    $(window).on('resize', debounce(function() {
        handleResize();
    }, 250));

    // Window Scroll
    $(window).on('scroll', throttle(function() {
        handleScroll();
    }, 16));

    /**
     * Initialize theme functionality
     */
    function initializeTheme() {
        setupMobileMenu();
        setupSearchToggle();
        setupSmoothScrolling();
        setupAnimations();
        setupFormEnhancements();
        setupAccessibility();
        setupLazyLoading();
        setupSocialSharing();
        setupNewsletterForm();
        setupCommentEnhancements();
        setupThemeCustomizer();
    }

    /**
     * Handle page load events
     */
    function handlePageLoad() {
        // Fade in animations
        $('.fade-in-up').each(function(index) {
            $(this).delay(index * 100).animate({
                opacity: 1,
                transform: 'translateY(0)'
            }, 600);
        });

        // Initialize floating elements animation
        animateFloatingElements();
        
        // Track page views (if analytics is enabled)
        trackPageView();
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Adjust mobile menu
        if ($(window).width() > 768) {
            $('.main-navigation ul').removeClass('show');
            $('.menu-toggle').attr('aria-expanded', 'false');
        }

        // Recalculate sticky elements
        updateStickyElements();
    }

    /**
     * Handle scroll events
     */
    function handleScroll() {
        var scrollTop = $(window).scrollTop();
        
        // Header scroll effect
        if (scrollTop > 100) {
            $('.site-header').addClass('scrolled');
        } else {
            $('.site-header').removeClass('scrolled');
        }

        // Parallax effect for hero section
        if ($('.hero-section').length) {
            var parallaxOffset = scrollTop * 0.5;
            $('.hero-section').css('transform', 'translateY(' + parallaxOffset + 'px)');
        }

        // Animate elements on scroll
        animateOnScroll();
        
        // Update reading progress (for single posts)
        updateReadingProgress();
    }

    /**
     * Setup mobile menu functionality
     */
    function setupMobileMenu() {
        $('.menu-toggle').on('click', function() {
            var $this = $(this);
            var $menu = $('.main-navigation ul');
            var expanded = $this.attr('aria-expanded') === 'true';
            
            $this.attr('aria-expanded', !expanded);
            $menu.toggleClass('show');
            
            // Animate menu items
            if (!expanded) {
                $menu.find('li').each(function(index) {
                    $(this).delay(index * 50).animate({
                        opacity: 1,
                        transform: 'translateY(0)'
                    }, 300);
                });
            }
        });

        // Close menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.main-navigation, .menu-toggle').length) {
                $('.main-navigation ul').removeClass('show');
                $('.menu-toggle').attr('aria-expanded', 'false');
            }
        });

        // Close menu on escape key
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27) { // Escape key
                $('.main-navigation ul').removeClass('show');
                $('.menu-toggle').attr('aria-expanded', 'false');
            }
        });
    }

    /**
     * Setup search toggle functionality
     */
    function setupSearchToggle() {
        $('.search-toggle-button').on('click', function() {
            var $searchForm = $('#header-search');
            var expanded = $(this).attr('aria-expanded') === 'true';
            
            $(this).attr('aria-expanded', !expanded);
            $searchForm.toggleClass('active');
            
            if (!expanded) {
                setTimeout(function() {
                    $searchForm.find('input[type="search"]').focus();
                }, 100);
            }
        });

        $('.search-close').on('click', function() {
            $('#header-search').removeClass('active');
            $('.search-toggle-button').attr('aria-expanded', 'false');
        });

        // Close search on escape key
        $(document).on('keydown', function(e) {
            if (e.keyCode === 27 && $('#header-search').hasClass('active')) {
                $('#header-search').removeClass('active');
                $('.search-toggle-button').attr('aria-expanded', 'false');
            }
        });
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    function setupSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800, 'easeInOutCubic');
            }
        });
    }

    /**
     * Setup animations
     */
    function setupAnimations() {
        // Hover effects for cards
        $('.post, .widget, .sidebar').hover(
            function() {
                $(this).addClass('hovered');
            },
            function() {
                $(this).removeClass('hovered');
            }
        );

        // Button hover effects
        $('.btn').hover(
            function() {
                $(this).addClass('btn-hover');
            },
            function() {
                $(this).removeClass('btn-hover');
            }
        );

        // Image hover effects
        $('.post-thumbnail img').hover(
            function() {
                $(this).addClass('img-hover');
            },
            function() {
                $(this).removeClass('img-hover');
            }
        );
    }

    /**
     * Animate floating elements
     */
    function animateFloatingElements() {
        $('.floating-element').each(function(index) {
            var $element = $(this);
            var delay = index * 0.5;
            var duration = 3 + (index * 0.5);
            
            $element.css({
                'animation': 'float ' + duration + 's ease-in-out ' + delay + 's infinite'
            });
        });
    }

    /**
     * Animate elements on scroll
     */
    function animateOnScroll() {
        $('.fade-in-up:not(.animated)').each(function() {
            var $element = $(this);
            var elementTop = $element.offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < windowBottom - 100) {
                $element.addClass('animated');
                $element.animate({
                    opacity: 1,
                    transform: 'translateY(0)'
                }, 600);
            }
        });
    }

    /**
     * Setup form enhancements
     */
    function setupFormEnhancements() {
        // Auto-resize textareas
        $('textarea').on('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });

        // Form validation
        $('form').on('submit', function(e) {
            var $form = $(this);
            var isValid = true;
            
            // Check required fields
            $form.find('[required]').each(function() {
                var $field = $(this);
                var value = $field.val().trim();
                
                if (!value) {
                    isValid = false;
                    $field.addClass('error');
                    showFieldError($field, 'Este campo é obrigatório');
                } else {
                    $field.removeClass('error');
                    hideFieldError($field);
                }
                
                // Email validation
                if ($field.attr('type') === 'email' && value) {
                    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        $field.addClass('error');
                        showFieldError($field, 'Por favor, insira um email válido');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                $form.find('.error').first().focus();
            }
        });

        // Clear errors on input
        $('input, textarea').on('input', function() {
            $(this).removeClass('error');
            hideFieldError($(this));
        });
    }

    /**
     * Show field error
     */
    function showFieldError($field, message) {
        var $error = $field.siblings('.field-error');
        
        if (!$error.length) {
            $error = $('<div class="field-error"></div>');
            $field.after($error);
        }
        
        $error.text(message).show();
    }

    /**
     * Hide field error
     */
    function hideFieldError($field) {
        $field.siblings('.field-error').hide();
    }

    /**
     * Setup accessibility features
     */
    function setupAccessibility() {
        // Skip link functionality
        $('.skip-link').on('click', function(e) {
            var target = $($(this).attr('href'));
            if (target.length) {
                target.attr('tabindex', '-1').focus();
            }
        });

        // Keyboard navigation for menus
        $('.main-navigation a').on('keydown', function(e) {
            var $this = $(this);
            var $menu = $this.closest('ul');
            var $items = $menu.find('a');
            var currentIndex = $items.index($this);
            
            switch(e.keyCode) {
                case 37: // Left arrow
                    e.preventDefault();
                    if (currentIndex > 0) {
                        $items.eq(currentIndex - 1).focus();
                    }
                    break;
                case 39: // Right arrow
                    e.preventDefault();
                    if (currentIndex < $items.length - 1) {
                        $items.eq(currentIndex + 1).focus();
                    }
                    break;
            }
        });

        // ARIA labels for dynamic content
        updateAriaLabels();
    }

    /**
     * Update ARIA labels
     */
    function updateAriaLabels() {
        // Update search button label
        $('.search-toggle-button').attr('aria-label', 'Abrir pesquisa');
        
        // Update menu toggle label
        $('.menu-toggle').attr('aria-label', 'Abrir menu de navegação');
        
        // Update social links
        $('.social-link').each(function() {
            var $this = $(this);
            var platform = $this.attr('class').match(/social-link (\w+)/);
            if (platform) {
                $this.attr('aria-label', 'Seguir no ' + platform[1]);
            }
        });
    }

    /**
     * Setup lazy loading for images
     */
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Setup social sharing
     */
    function setupSocialSharing() {
        $('.share-button').on('click', function(e) {
            var $this = $(this);
            var url = $this.attr('href');
            
            if (url && url.indexOf('http') === 0) {
                e.preventDefault();
                
                var width = 600;
                var height = 400;
                var left = (screen.width / 2) - (width / 2);
                var top = (screen.height / 2) - (height / 2);
                
                window.open(url, 'share', 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
            }
        });

        // Copy link functionality
        $('.copy-link').on('click', function() {
            var url = window.location.href;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function() {
                    showNotification('Link copiado para a área de transferência! 💖');
                });
            } else {
                // Fallback for older browsers
                var textArea = document.createElement('textarea');
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Link copiado para a área de transferência! 💖');
            }
        });
    }

    /**
     * Setup newsletter form
     */
    function setupNewsletterForm() {
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            var $form = $(this);
            var email = $form.find('input[type="email"]').val();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter subscription
                $form.find('button').text('Inscrevendo...').prop('disabled', true);
                
                setTimeout(function() {
                    showNotification('Obrigada por se inscrever! Em breve você receberá nossas melhores ofertas! 💖');
                    $form[0].reset();
                    $form.find('button').text('Inscrever').prop('disabled', false);
                }, 1500);
            } else {
                showNotification('Por favor, insira um email válido.', 'error');
            }
        });
    }

    /**
     * Setup comment enhancements
     */
    function setupCommentEnhancements() {
        // Comment voting
        $('.vote-btn').on('click', function() {
            var $this = $(this);
            var commentId = $this.data('comment-id');
            var voteType = $this.data('vote');
            var $countElement = $this.find('.vote-count');
            var currentCount = parseInt($countElement.text()) || 0;
            
            if ($this.hasClass('active')) {
                // Remove vote
                currentCount = Math.max(0, currentCount - 1);
                $this.removeClass('active');
            } else {
                // Add vote
                currentCount += 1;
                $this.addClass('active');
            }
            
            $countElement.text(currentCount);
            
            // Store in localStorage
            localStorage.setItem('comment_vote_' + commentId, $this.hasClass('active') ? '1' : '0');
        });

        // Restore vote states from localStorage
        $('.vote-btn').each(function() {
            var $this = $(this);
            var commentId = $this.data('comment-id');
            var savedVote = localStorage.getItem('comment_vote_' + commentId);
            
            if (savedVote === '1') {
                $this.addClass('active');
            }
        });

        // Character counter for comment textarea
        var $commentTextarea = $('#comment');
        if ($commentTextarea.length) {
            var maxLength = $commentTextarea.attr('maxlength');
            
            if (maxLength) {
                var $counter = $('<div class="character-counter"></div>');
                $commentTextarea.after($counter);
                
                function updateCounter() {
                    var remaining = maxLength - $commentTextarea.val().length;
                    $counter.text(remaining + ' caracteres restantes');
                    
                    if (remaining < 100) {
                        $counter.addClass('warning');
                    } else {
                        $counter.removeClass('warning');
                    }
                }
                
                $commentTextarea.on('input', updateCounter);
                updateCounter();
            }
        }
    }

    /**
     * Setup theme customizer live preview
     */
    function setupThemeCustomizer() {
        if (typeof wp !== 'undefined' && wp.customize) {
            // Primary color
            wp.customize('homemoney_primary_color', function(value) {
                value.bind(function(newval) {
                    updatePrimaryColor(newval);
                });
            });

            // Footer text
            wp.customize('homemoney_footer_text', function(value) {
                value.bind(function(newval) {
                    $('.copyright').text(newval);
                });
            });
        }
    }

    /**
     * Update primary color
     */
    function updatePrimaryColor(color) {
        var css = ':root { --primary-color: ' + color + '; }';
        var $style = $('#dynamic-primary-color');
        
        if (!$style.length) {
            $style = $('<style id="dynamic-primary-color"></style>');
            $('head').append($style);
        }
        
        $style.text(css);
    }

    /**
     * Update reading progress
     */
    function updateReadingProgress() {
        if ($('body').hasClass('single-post')) {
            var $content = $('.entry-content');
            
            if ($content.length) {
                var contentTop = $content.offset().top;
                var contentHeight = $content.outerHeight();
                var windowTop = $(window).scrollTop();
                var windowHeight = $(window).height();
                
                var progress = Math.min(100, Math.max(0, 
                    ((windowTop + windowHeight - contentTop) / contentHeight) * 100
                ));
                
                // Update progress bar if it exists
                $('.reading-progress-bar').css('width', progress + '%');
            }
        }
    }

    /**
     * Update sticky elements
     */
    function updateStickyElements() {
        $('.sidebar').each(function() {
            var $sidebar = $(this);
            var headerHeight = $('.site-header').outerHeight();
            
            $sidebar.css('top', headerHeight + 20 + 'px');
        });
    }

    /**
     * Track page view
     */
    function trackPageView() {
        if ($('body').hasClass('single-post')) {
            var postId = $('body').attr('class').match(/postid-(\d+)/);
            
            if (postId) {
                // Increment view count (this would typically be an AJAX call)
                var viewCount = localStorage.getItem('post_views_' + postId[1]) || 0;
                viewCount++;
                localStorage.setItem('post_views_' + postId[1], viewCount);
            }
        }
    }

    /**
     * Show notification
     */
    function showNotification(message, type) {
        type = type || 'success';
        
        var $notification = $('<div class="notification notification-' + type + '">' + message + '</div>');
        
        $('body').append($notification);
        
        setTimeout(function() {
            $notification.addClass('show');
        }, 100);
        
        setTimeout(function() {
            $notification.removeClass('show');
            setTimeout(function() {
                $notification.remove();
            }, 300);
        }, 3000);
    }

    /**
     * Validate email
     */
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Debounce function
     */
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    /**
     * Throttle function
     */
    function throttle(func, limit) {
        var inThrottle;
        return function() {
            var args = arguments;
            var context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(function() {
                    inThrottle = false;
                }, limit);
            }
        };
    }

    // Custom easing function
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    // Global functions
    window.HomeMoney = {
        showNotification: showNotification,
        updatePrimaryColor: updatePrimaryColor,
        isValidEmail: isValidEmail
    };

})(jQuery);

// Vanilla JavaScript for critical functionality (no jQuery dependency)
document.addEventListener('DOMContentLoaded', function() {
    
    // Critical CSS loading
    var criticalCSS = document.getElementById('critical-css');
    if (criticalCSS) {
        criticalCSS.onload = function() {
            this.media = 'all';
        };
    }
    
    // Service Worker registration (for PWA features)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function(error) {
            console.log('Service Worker registration failed:', error);
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                var perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                }
            }, 0);
        });
    }
    
    // Dark mode detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode-preferred');
    }
    
    // Reduced motion detection
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
});

// CSS for notifications and dynamic styles
var notificationCSS = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 300px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-success {
    background: linear-gradient(45deg, #4caf50, #66bb6a);
}

.notification-error {
    background: linear-gradient(45deg, #f44336, #ef5350);
}

.notification-warning {
    background: linear-gradient(45deg, #ff9800, #ffb74d);
}

.field-error {
    color: #f44336;
    font-size: 0.8rem;
    margin-top: 0.25rem;
    display: none;
}

.form-group input.error,
.form-group textarea.error {
    border-color: #f44336;
}

.character-counter {
    text-align: right;
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

.character-counter.warning {
    color: #e91e63;
    font-weight: 600;
}

.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(233, 30, 99, 0.2);
    z-index: 9999;
}

.reading-progress-bar {
    height: 100%;
    background: linear-gradient(45deg, #e91e63, #ff6b9d);
    width: 0%;
    transition: width 0.1s ease;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100%);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {
    .notification,
    .floating-element,
    .fade-in-up {
        animation: none !important;
        transition: none !important;
    }
}
`;

// Inject notification CSS
var style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);