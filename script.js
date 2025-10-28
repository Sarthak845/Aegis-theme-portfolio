// AEGIS Interface JavaScript
class AegisInterface {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.initNavigation();
        this.initScrollEffects();
        this.initTerminal();
    }

    createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${Math.random() > 0.5 ? 'var(--electric-blue)' : 'var(--tactical-amber)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            `;

            const keyframes = `
                @keyframes floatParticle {
                    0% {
                        transform: translate(0, 0) rotate(0deg);
                        opacity: ${Math.random() * 0.5 + 0.2};
                    }
                    25% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(90deg);
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(180deg);
                        opacity: ${Math.random() * 0.8 + 0.2};
                    }
                    75% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(270deg);
                    }
                    100% {
                        transform: translate(0, 0) rotate(360deg);
                        opacity: ${Math.random() * 0.5 + 0.2};
                    }
                }
            `;

            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);

            particlesContainer.appendChild(particle);
        }
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', (e) => {
                this.activateHoverEffect(e.target);
            });

            link.addEventListener('mouseleave', (e) => {
                this.deactivateHoverEffect(e.target);
            });
        });

        // Smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    activateHoverEffect(element) {
        element.style.transform = 'translateY(-2px)';
        element.style.background = 'rgba(0, 194, 255, 0.15)';
        element.style.border = '1px solid rgba(0, 194, 255, 0.4)';
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(0,194,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    deactivateHoverEffect(element) {
        element.style.transform = 'translateY(0)';
        element.style.background = '';
        element.style.border = '1px solid transparent';
    }

    initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.glass-panel, .section-header').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initTerminal() {
        const terminal = document.querySelector('.terminal-body');
        const messages = [
            "> System diagnostics: COMPLETE",
            "> Interface responsiveness: OPTIMAL", 
            "> Security protocols: ENGAGED",
            "> AEGIS system: READY",
            "> Awaiting user commands..."
        ];

        let messageIndex = 0;

        function typeMessage() {
            if (messageIndex < messages.length) {
                const message = messages[messageIndex];
                const p = document.createElement('p');
                terminal.appendChild(p);
                
                let charIndex = 0;
                const typing = setInterval(() => {
                    p.textContent = message.substring(0, charIndex);
                    charIndex++;
                    
                    if (charIndex > message.length) {
                        clearInterval(typing);
                        messageIndex++;
                        setTimeout(typeMessage, 1000);
                    }
                }, 50);
            }
        }

        // Start typing after a delay
        setTimeout(typeMessage, 2000);
    }
}

// Initialize AEGIS Interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AegisInterface();
});

// Add ripple animation to CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleExpand {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
