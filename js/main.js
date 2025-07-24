$(document).ready(function() {
    // Loading animation
    const isFirstVisit = !document.referrer || !document.referrer.includes(window.location.hostname);
    
    if (isFirstVisit) {
        setTimeout(function() {
            $('#loading-cover').addClass('hide');
            setTimeout(function() {
                $('#loading-cover').remove();
            }, 1000);
        }, 2000);
    } else {
        $('#loading-cover').remove();
    }

    // Header scroll effect
    let scrollPos = 0;
    $(window).scroll(function() {
        const currentPos = $(this).scrollTop();
        
        if (currentPos > 100) {
            $('.header').addClass('headerFixed');
        } else {
            $('.header').removeClass('headerFixed');
        }
        
        scrollPos = currentPos;
    });

    // Smooth scroll for navigation links
    $('.global-nav a[href^="#"], .site-logo a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // Banner slider initialization
    $('.banner-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        fade: true,
        cssEase: 'linear',
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // Video slider initialization
    $('.video-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev">Previous</button>',
        nextArrow: '<button type="button" class="slick-next">Next</button>',
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '40px'
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '20px',
                    arrows: false
                }
            }
        ]
    });

    // Video modal functionality
    const $videoModal = $('#video-modal');
    const $modalContent = $('.modal-content');
    let player;

    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Video item click handler
    $('.video-item').click(function() {
        const videoId = $(this).data('video-id');
        openVideoModal(videoId);
    });

    // Close modal
    $('.close-modal').click(function() {
        closeVideoModal();
    });

    // Close modal on background click
    $videoModal.click(function(e) {
        if (e.target === this) {
            closeVideoModal();
        }
    });

    // Open video modal function
    function openVideoModal(videoId) {
        $videoModal.fadeIn(300);
        $('body').css('overflow', 'hidden');
        
        // Create YouTube player
        if (typeof YT !== 'undefined' && YT.Player) {
            createPlayer(videoId);
        } else {
            // Wait for API to load
            window.onYouTubeIframeAPIReady = function() {
                createPlayer(videoId);
            };
        }
    }

    // Create YouTube player
    function createPlayer(videoId) {
        $('#youtube-player').html('<div id="player"></div>');
        player = new YT.Player('player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                'showinfo': 0,
                'modestbranding': 1,
                'rel': 0
            }
        });
    }

    // Close video modal function
    function closeVideoModal() {
        $videoModal.fadeOut(300);
        $('body').css('overflow', 'auto');
        
        // Stop and destroy player
        if (player && player.destroy) {
            player.destroy();
        }
        $('#youtube-player').html('');
    }

    // Parallax effect for key visual
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallaxSpeed = 0.5;
        
        $('.key-visual img').css({
            'transform': 'translateY(' + (scrolled * parallaxSpeed) + 'px)'
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for fade-in effect
    $('.section--info, .section--release, .section--video, .section--bio').each(function() {
        observer.observe(this);
    });

    // Add fade-in class styles dynamically
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .section--info,
            .section--release,
            .section--video,
            .section--bio {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 1s ease, transform 1s ease;
            }
            
            .fade-in {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    // Hover effect for info items
    $('.info-list li').hover(
        function() {
            $(this).css({
                'background': 'rgba(0, 255, 255, 0.05)',
                'padding-left': '10px',
                'transition': 'all 0.3s ease'
            });
        },
        function() {
            $(this).css({
                'background': 'transparent',
                'padding-left': '0',
                'transition': 'all 0.3s ease'
            });
        }
    );

    // Dynamic typing effect for tagline
    const tagline = $('.tagline');
    const originalText = tagline.text();
    tagline.text('');
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalText.length) {
            tagline.text(tagline.text() + originalText.charAt(charIndex));
            charIndex++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Start typing effect after loading
    setTimeout(typeWriter, isFirstVisit ? 2500 : 500);

    // Mobile menu toggle (if needed in future)
    const mobileMenuBreakpoint = 768;
    
    function checkMobileMenu() {
        if ($(window).width() <= mobileMenuBreakpoint) {
            // Add mobile menu functionality here if needed
        }
    }
    
    checkMobileMenu();
    $(window).resize(checkMobileMenu);

    // Performance optimization: Throttle scroll events
    let scrollTimer;
    $(window).on('scroll', function() {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            // Scroll-based animations can be added here
        }, 100);
    });
});