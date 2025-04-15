'use strict';

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeAOS();
    setupMobileMenu();
    generateStarfield();
    homepageCaroussel();

    // Enhanced ripple effect with proper cleanup
    const buttons = document.querySelectorAll('button, a.group');
    
    if (buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rippleElement = this.querySelector('.ripple-effect');
                
                if (rippleElement) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    rippleElement.style.left = `${x - 50}px`; // Center the 100px ripple
                    rippleElement.style.top = `${y - 50}px`;
                    
                    // Reset animation with proper cleanup
                    rippleElement.style.animation = 'none';
                    rippleElement.offsetHeight; // Force reflow
                    rippleElement.style.animation = 'ripple 1.5s linear';
                }
            });
        });
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send the form data to your backend
            alert('Merci pour votre message ! Nous vous contacterons très bientôt.');
            contactForm.reset();
        });
    }
    
    // Improved tilt effect with performance optimizations
    const tiltElements = document.querySelectorAll('.tilt-on-hover');
    
    if (tiltElements && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tiltElements.forEach(element => {
            let rafId = null;
            
            element.addEventListener('mousemove', function(e) {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                
                rafId = requestAnimationFrame(() => {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const xPercent = (x / rect.width - 0.5) * 10; // Reduced intensity for smoother effect
                    const yPercent = (y / rect.height - 0.5) * 10;
                    
                    this.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg)`;
                });
            });
            
            element.addEventListener('mouseleave', function() {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }
});

function initializeAOS() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    // Initialize reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            checkReveal();
            handleParallax();
            handleStickyHeader();
            handleBackToTop();
        });
    });
    
    // Check on initial load
    checkReveal();
}

function generateStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    const layers = [
        { count: 50, size: '1px', color: 'rgba(255,255,255,0.5)', speed: 0.2 },
        { count: 30, size: '2px', color: 'rgba(255,255,255,0.7)', speed: 0.3 },
        { count: 15, size: '3px', color: 'rgba(255,255,255,0.9)', speed: 0.5 }
    ];
    
    layers.forEach(createStarLayer(starfield));
}

function homepageCaroussel() {
    // Image carousel functionality
    const slides = document.querySelectorAll('.carousel-slides');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.opacity = '0';
        });
        
        // Show the current slide
        slides[index].style.opacity = '1';
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Start the carousel
    showSlide(currentSlide);
    setInterval(nextSlide, 10000);
}

// Generate dynamic star field with improved parallax
function generateStarfield() {
    const starfield = document.getElementById('starfield');
    if (!starfield) return;
    
    // Clear existing stars
    starfield.innerHTML = '';
    
    // Create three layers of stars for enhanced parallax
    const layers = [
        { count: 50, size: '1px', color: 'rgba(255,255,255,0.5)', speed: 0.2, class: 'star-layer-1' },
        { count: 30, size: '2px', color: 'rgba(255,255,255,0.7)', speed: 0.3, class: 'star-layer-2' },
        { count: 15, size: '3px', color: 'rgba(255,255,255,0.9)', speed: 0.5, class: 'star-layer-3' }
    ];
    
    layers.forEach((layer, layerIndex) => {
        const starLayer = document.createElement('div');
        starLayer.className = `absolute inset-0 ${layer.class}`;
        starLayer.style.transform = 'translateZ(0)'; // Hardware acceleration
        starfield.appendChild(starLayer);
        
        for (let i = 0; i < layer.count; i++) {
            const star = document.createElement('div');
            star.className = 'absolute rounded-full';
            star.style.width = layer.size;
            star.style.height = layer.size;
            star.style.backgroundColor = layer.color;
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animation = `twinkle ${3 + Math.random() * 3}s ease-in-out infinite`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            starLayer.appendChild(star);
        }
    });
}

// Enhanced parallax effect for star layers
function enhancedParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const scrollY = window.scrollY;
    
    // Apply different parallax speeds to each star layer
    const starLayer1 = document.querySelector('.star-layer-1');
    const starLayer2 = document.querySelector('.star-layer-2');
    const starLayer3 = document.querySelector('.star-layer-3');
    
    if (starLayer1) starLayer1.style.transform = `translateY(${scrollY * 0.2}px)`;
    if (starLayer2) starLayer2.style.transform = `translateY(${scrollY * 0.4}px)`;
    if (starLayer3) starLayer3.style.transform = `translateY(${scrollY * 0.6}px)`;
}

// Update the handleParallax function to use our enhanced version
function handleParallax() {
    if (starsContainer && parallaxStars && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const scrollY = window.scrollY;
        parallaxStars.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    
    // Call our enhanced parallax effect
    enhancedParallax();
}

function setupMobileMenu() {
    // Mobile menu toggle with improved animation
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('hidden');
                // Wait for a frame to ensure the browser recognizes the element
                requestAnimationFrame(() => {
                    mobileMenu.classList.add('active');
                    
                    // Animate hamburger to X
                    line1.classList.add('rotate-45', 'translate-y-1.5');
                    line2.classList.add('opacity-0');
                    line3.classList.add('-rotate-45', '-translate-y-1.5');
                });
            } else {
                mobileMenu.classList.remove('active');
                
                // Animate X back to hamburger
                line1.classList.remove('rotate-45', 'translate-y-1.5');
                line2.classList.remove('opacity-0');
                line3.classList.remove('-rotate-45', '-translate-y-1.5');
                
                // Wait for the transition to complete before hiding
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 500);
            }
        });
    }
    
    // Improved sticky header handling
    const nav = document.querySelector('nav');
    
    function handleStickyHeader() {
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.remove('py-3');
                nav.classList.add('py-2', 'shadow-md');
            } else {
                nav.classList.add('py-3');
                nav.classList.remove('py-2', 'shadow-md');
            }
        }
    }
    
    // Back to top button with improved visibility handling
    const backToTopButton = document.getElementById('back-to-top');
    
    function handleBackToTop() {
        if (backToTopButton) {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('opacity-100', 'pointer-events-auto');
                backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                backToTopButton.classList.remove('opacity-100', 'pointer-events-auto');
                backToTopButton.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    }
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });
    }
}