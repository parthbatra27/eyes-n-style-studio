/**
 * Eyesnstylestudio Production Script
 * Functionality: Floating Nav, Intersection Reveal, Form Handling, & Spotlights
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SMART NAVIGATION 
    // Adds background blur and padding changes as the user scrolls
    const navGlass = document.querySelector('.nav-glass');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navGlass.style.padding = '0.6rem 1.5rem';
            navGlass.style.background = 'rgba(5, 7, 10, 0.9)';
            navGlass.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navGlass.style.padding = '0.7rem 2rem';
            navGlass.style.background = 'rgba(5, 7, 10, 0.7)';
            navGlass.style.boxShadow = 'none';
        }
    });

    // 2. INTERSECTION OBSERVER (REVEAL ON SCROLL)
    // Creates that premium "fade-up" effect as sections enter the viewport
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, revealOptions);

    // Select all elements to be revealed
    const revealElements = document.querySelectorAll('.bento-item, .frame-card, .specs-table, .hero-content, form');
    
    revealElements.forEach(el => {
        // Initial state via inline style (or handled in CSS if preferred)
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        revealObserver.observe(el);
    });

    // 3. MOUSE TRACKING SPOTLIGHT 
    // Adds a subtle interactive glow that follows the cursor on cards
    const interactiveCards = document.querySelectorAll('.bento-item, .frame-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 122, 255, 0.08), transparent 40%), var(--card-bg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = `var(--card-bg)`;
        });
    });

    // 4. APPOINTMENT FORM HANDLING
    const appointmentForm = document.querySelector('#book form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = appointmentForm.querySelector('button');
            const originalText = submitBtn.innerText;
            
            // Visual feedback
            submitBtn.innerText = 'Securing your slot...';
            submitBtn.style.opacity = '0.7';
            submitBtn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                submitBtn.innerText = 'Appointment Confirmed! ✅';
                submitBtn.style.background = '#22c55e'; // Success green
                
                // Clear form and reset button after 4 seconds
                setTimeout(() => {
                    appointmentForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '1';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1500);
        });
    }

    // 5. HELPER: CSS REVEAL CLASS
    const style = document.createElement('style');
    style.textContent = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});