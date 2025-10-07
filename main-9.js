/**
 * Mamãe Feliz - Main JavaScript
 * Funcionalidades interativas do tema
 */

(function($) {
    'use strict';

    // Aguarda o DOM estar pronto
    $(document).ready(function() {
        
        // Inicializar funcionalidades
        initMobileMenu();
        initSmoothScroll();
        initScrollToTop();
        initImageLazyLoad();
        initCommentForm();
        initSearchForm();
        initAnimations();
        
        console.log('🌸 Mamãe Feliz Theme carregado com sucesso!');
    });

    /**
     * Menu Mobile
     */
    function initMobileMenu() {
        const menuToggle = $('.menu-toggle');
        const navigation = $('.main-navigation ul');
        
        menuToggle.on('click', function(e) {
            e.preventDefault();
            
            navigation.toggleClass('show');
            $(this).toggleClass('active');
            
            // Alterar ícone do menu
            if (navigation.hasClass('show')) {
                $(this).html('✕');
                $(this).attr('aria-expanded', 'true');
            } else {
                $(this).html('☰');
                $(this).attr('aria-expanded', 'false');
            }
        });
        
        // Fechar menu ao clicar em um link
        $('.main-navigation a').on('click', function() {
            if ($(window).width() <= 768) {
                navigation.removeClass('show');
                menuToggle.removeClass('active').html('☰');
                menuToggle.attr('aria-expanded', 'false');
            }
        });
        
        // Fechar menu ao redimensionar janela
        $(window).on('resize', function() {
            if ($(window).width() > 768) {
                navigation.removeClass('show');
                menuToggle.removeClass('active').html('☰');
                menuToggle.attr('aria-expanded', 'false');
            }
        });
    }

    /**
     * Scroll Suave
     */
    function initSmoothScroll() {
        $('a[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
                location.hostname === this.hostname) {
                
                const target = $(this.hash);
                const targetElement = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (targetElement.length) {
                    e.preventDefault();
                    
                    $('html, body').animate({
                        scrollTop: targetElement.offset().top - 100
                    }, 800, 'easeInOutCubic');
                }
            }
        });
    }

    /**
     * Botão Voltar ao Topo
     */
    function initScrollToTop() {
        // Criar botão se não existir
        if (!$('.scroll-to-top').length) {
            $('body').append('<button class="scroll-to-top" aria-label="Voltar ao topo">↑</button>');
        }
        
        const scrollButton = $('.scroll-to-top');
        
        // Mostrar/ocultar botão baseado no scroll
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                scrollButton.addClass('show');
            } else {
                scrollButton.removeClass('show');
            }
        });
        
        // Ação do clique
        scrollButton.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 600, 'easeInOutCubic');
        });
    }

    /**
     * Lazy Loading para Imagens
     */
    function initImageLazyLoad() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Melhorias no Formulário de Comentários
     */
    function initCommentForm() {
        const commentForm = $('#commentform');
        
        if (commentForm.length) {
            // Adicionar placeholders aos campos
            $('#author').attr('placeholder', 'Seu nome completo');
            $('#email').attr('placeholder', 'seu@email.com');
            $('#url').attr('placeholder', 'https://seusite.com (opcional)');
            $('#comment').attr('placeholder', 'Compartilhe seus pensamentos...');
            
            // Validação em tempo real
            commentForm.find('input, textarea').on('blur', function() {
                validateField($(this));
            });
            
            // Submissão do formulário
            commentForm.on('submit', function(e) {
                let isValid = true;
                
                $(this).find('input[required], textarea[required]').each(function() {
                    if (!validateField($(this))) {
                        isValid = false;
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    showNotification('Por favor, corrija os erros no formulário.', 'error');
                }
            });
        }
    }

    /**
     * Validar campo individual
     */
    function validateField($field) {
        const value = $field.val().trim();
        const fieldType = $field.attr('type') || $field.prop('tagName').toLowerCase();
        let isValid = true;
        let message = '';
        
        // Remover mensagens de erro anteriores
        $field.removeClass('error').next('.field-error').remove();
        
        // Validação por tipo
        if ($field.prop('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório.';
        } else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Por favor, insira um email válido.';
            }
        } else if (fieldType === 'url' && value) {
            const urlRegex = /^https?:\/\/.+/;
            if (!urlRegex.test(value)) {
                isValid = false;
                message = 'Por favor, insira uma URL válida (com http:// ou https://).';
            }
        }
        
        // Mostrar erro se inválido
        if (!isValid) {
            $field.addClass('error');
            $field.after('<span class="field-error" style="color: #ff6b6b; font-size: 0.9rem; display: block; margin-top: 0.5rem;">' + message + '</span>');
        }
        
        return isValid;
    }

    /**
     * Melhorias no Formulário de Busca
     */
    function initSearchForm() {
        const searchForm = $('.search-form');
        const searchInput = searchForm.find('input[type="search"]');
        
        if (searchInput.length) {
            // Placeholder dinâmico
            searchInput.attr('placeholder', 'Pesquisar no blog...');
            
            // Limpar busca
            searchInput.on('input', function() {
                const value = $(this).val();
                if (value.length > 0 && !$('.search-clear').length) {
                    $(this).after('<button type="button" class="search-clear" aria-label="Limpar busca">✕</button>');
                } else if (value.length === 0) {
                    $('.search-clear').remove();
                }
            });
            
            // Ação do botão limpar
            $(document).on('click', '.search-clear', function() {
                searchInput.val('').focus();
                $(this).remove();
            });
        }
    }

    /**
     * Animações de Entrada
     */
    function initAnimations() {
        // Animação de fade-in para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        animationObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observar elementos para animação
            document.querySelectorAll('.post, .page, .widget, .comment').forEach(el => {
                el.classList.add('animate-ready');
                animationObserver.observe(el);
            });
        }
    }

    /**
     * Sistema de Notificações
     */
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = $(`
            <div class="notification notification-${type}" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#ff6b6b' : '#4CAF50'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 9999;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 300px;
                font-weight: 500;
            ">
                ${message}
                <button class="notification-close" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    margin-left: 1rem;
                    cursor: pointer;
                    opacity: 0.8;
                ">×</button>
            </div>
        `);
        
        $('body').append(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.css('transform', 'translateX(0)');
        }, 100);
        
        // Auto-remover
        setTimeout(() => {
            removeNotification(notification);
        }, duration);
        
        // Botão fechar
        notification.find('.notification-close').on('click', () => {
            removeNotification(notification);
        });
    }

    /**
     * Remover notificação
     */
    function removeNotification($notification) {
        $notification.css('transform', 'translateX(400px)');
        setTimeout(() => {
            $notification.remove();
        }, 300);
    }

    /**
     * Utilitários
     */
    
    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Easing personalizado para jQuery
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

})(jQuery);

// CSS adicional para funcionalidades JavaScript
const additionalCSS = `
    /* Botão Voltar ao Topo */
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #ff6b6b, #e91e63);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 1000;
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
    }
    
    /* Animações */
    .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Campos de formulário com erro */
    .error {
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
    }
    
    /* Lazy loading */
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    /* Botão limpar busca */
    .search-form {
        position: relative;
    }
    
    .search-clear {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #666;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .search-clear:hover {
        background: #f0f0f0;
        color: #e91e63;
    }
    
    /* Menu mobile ativo */
    .menu-toggle.active {
        background: rgba(255,255,255,0.2);
    }
    
    /* Responsividade para notificações */
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            max-width: none !important;
            transform: translateY(-100px) !important;
        }
        
        .notification.show {
            transform: translateY(0) !important;
        }
        
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 1.3rem;
        }
    }
`;

// Adicionar CSS ao head
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}