// ============================================
// THEME MANAGEMENT
// ============================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Initialize theme from localStorage or default to dark
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

// Set theme
function setTheme(theme) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
    updateThemeToggleIcon(theme);
}

// Update theme toggle icon
function updateThemeToggleIcon(theme) {
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.title = 'تبديل إلى الثيم النهاري';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggle.title = 'تبديل إلى الثيم الليلي';
        }
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Add animation
    body.style.opacity = '0.9';
    setTimeout(() => {
        body.style.opacity = '1';
    }, 150);
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Keyboard shortcut for theme toggle (Alt + T)
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        toggleTheme();
    }
});

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// ============================================
// ACCORDION MANAGEMENT - FULLY WORKING
// ============================================

function initializeAccordions() {
    const stageHeaders = document.querySelectorAll('.stage-header');
    
    stageHeaders.forEach((header, index) => {
        const targetId = header.getAttribute('data-bs-target');
        const targetContent = document.querySelector(targetId);
        
        if (!targetContent) return;
        
        // Initialize state
        header.classList.add('collapsed');
        targetContent.classList.remove('show');
        
        // Add click event listener
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isCurrentlyExpanded = targetContent.classList.contains('show');
            
            // Close all accordions
            stageHeaders.forEach((otherHeader, otherIndex) => {
                const otherTargetId = otherHeader.getAttribute('data-bs-target');
                const otherContent = document.querySelector(otherTargetId);
                
                if (otherContent) {
                    otherContent.classList.remove('show');
                    otherHeader.classList.add('collapsed');
                    
                    // Reset icon rotation
                    const otherIcon = otherHeader.querySelector('.toggle-icon');
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                }
            });
            
            // Toggle current accordion only if it wasn't already expanded
            if (!isCurrentlyExpanded) {
                // Open the current accordion
                targetContent.classList.add('show');
                header.classList.remove('collapsed');
                
                // Rotate icon
                const icon = header.querySelector('.toggle-icon');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                // Close the current accordion (already closed by the loop above)
                // Just ensure the icon is rotated back
                const icon = header.querySelector('.toggle-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAccordions();
});


// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.prep-card, .system-card, .note-card, .intro-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// NAVBAR ACTIVE STATE
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

// Create back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'btn btn-primary back-to-top';
backToTopBtn.style.display = 'none';
backToTopBtn.style.position = 'fixed';
backToTopBtn.style.bottom = '30px';
backToTopBtn.style.right = '30px';
backToTopBtn.style.zIndex = '999';
backToTopBtn.style.borderRadius = '50%';
backToTopBtn.style.width = '50px';
backToTopBtn.style.height = '50px';
backToTopBtn.style.padding = '0';
backToTopBtn.style.display = 'flex';
backToTopBtn.style.alignItems = 'center';
backToTopBtn.style.justifyContent = 'center';
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Home key - scroll to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // End key - scroll to bottom
    if (e.key === 'End') {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🔒 دليل الإقفالات السنوية - نظام المتكامل بلس ERP v6', 'font-size: 16px; color: #3b82f6; font-weight: bold;');
console.log('%cشكراً لاستخدامك هذا الدليل الشامل', 'font-size: 12px; color: #06b6d4;');
