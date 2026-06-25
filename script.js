document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Transform hamburger to X
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Tab Filtering Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const orgCards = document.querySelectorAll('.org-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const targetCategory = btn.getAttribute('data-target');

            orgCards.forEach(card => {
                if (targetCategory === 'all' || card.getAttribute('data-category') === targetCategory) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    card.style.animation = 'none';
                    card.style.animation = 'fadeIn 0.4s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Smooth Scrolling & Active Link Highlighting ---
    const navLinks = document.querySelectorAll('.new-nav-links a[href^="#"], .new-mobile-links a[href^="#"]');
    const navbar = document.querySelector('.navbar');
    
    // Smooth scroll on click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                // Calculate offset for fixed navbar
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active link on scroll
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = navbar ? navbar.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10; // 10px buffer
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
