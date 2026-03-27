// ========================= 
// DARK MODE TOGGLE
// ========================= 
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
htmlElement.classList.add(currentTheme);
updateThemeIcon(currentTheme === 'dark-mode');

// Toggle theme
themeToggle.addEventListener('click', () => {
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    
    if (isDarkMode) {
        htmlElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
        updateThemeIcon(false);
    } else {
        htmlElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        updateThemeIcon(true);
    }
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ========================= 
// MOBILE HAMBURGER MENU
// ========================= 
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.style.transform = navMenu.classList.contains('active') 
        ? 'scale(1.1)' 
        : 'scale(1)';
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        setActiveLink(link);
    });
});

// ========================= 
// ACTIVE NAVIGATION LINK
// ========================= 
function setActiveLink(clickedLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedLink.classList.add('active');
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ========================= 
// TYPING ANIMATION
// ========================= 
const typingCursor = document.querySelector('.typing-cursor');
if (typingCursor) {
    // The typing effect is handled by CSS animation in style.css
    // This ensures the cursor blinks smoothly
}

// ========================= 
// SCROLL REVEAL ANIMATION
// ========================= 
function revealOnScroll() {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealtop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealtop < windowHeight - revealPoint) {
            element.classList.add('reveal');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Call on page load

// ========================= 
// SMOOTH SCROLL BEHAVIOR
// ========================= 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================= 
// PROJECT MODAL
// ========================= 
const projectData = [
    {
        title: "CNN-Powered Real-Time Image Classification",
        description: "An intelligent system that leverages Convolutional Neural Networks for real-time image classification with preprocessing and a user-friendly interface built with Streamlit. This project demonstrates expertise in deep learning, image processing, and modern web frameworks. The model is trained on diverse datasets and optimized for accuracy and performance. Features include drag-and-drop image upload, real-time predictions, and confidence scores.",
        tech: ["Python", "TensorFlow", "Keras", "Streamlit", "OpenCV", "NumPy"]
    },
    {
        title: "Web Development Project",
        description: "A responsive web application showcasing modern web technologies and best practices in UI/UX design. This project demonstrates proficiency in HTML5, CSS3, and JavaScript ES6+. It includes interactive components, smooth animations, and optimized performance. The application is fully responsive and works seamlessly across all devices.",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
        title: "Data Structures Implementation",
        description: "Custom implementations of fundamental data structures with optimized algorithms and comprehensive documentation. This project includes various data structures like arrays, linked lists, stacks, queues, trees, and graphs. Each implementation is thoroughly tested and includes complexity analysis. Great for interview preparation and understanding core computer science concepts.",
        tech: ["Python", "C", "Algorithms", "Data Structures"]
    }
];

const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function openProjectModal(index) {
    const project = projectData[index];
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    
    const techDiv = document.getElementById('modalTech');
    techDiv.innerHTML = project.tech
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// ========================= 
// CONTACT FORM
// ========================= 
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Validate form
    if (!name.trim() || !email.trim() || !message.trim()) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! Thank you for reaching out.', 'success');
    
    // Clear form
    contactForm.reset();
    
    // In a real application, you would send the data to a server
    console.log({ name, email, message });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 3000;
        animation: slideInUp 0.3s ease;
        ${type === 'success' 
            ? 'background: linear-gradient(135deg, #10b981 0%, #059669 100%);' 
            : 'background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);'
        }
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========================= 
// PAGE LOAD ANIMATIONS
// ========================= 
window.addEventListener('load', () => {
    // Add stagger animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });

    // Add stagger animation to education timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s both`;
    });

    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
    });

    // Add stagger animation to certification cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s both`;
    });

    // Add stagger animation to skill badges
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach((badge, index) => {
        badge.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });

    // Add stagger animation to interest cards
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s both`;
    });

    // Add stagger animation to language cards
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.15}s both`;
    });

    // Add stagger animation to highlight cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });

    // Add stagger animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });
});

// ========================= 
// PARALLAX EFFECT
// ========================= 
window.addEventListener('scroll', () => {
    const blobs = document.querySelectorAll('.blob');
    const scrollPosition = window.pageYOffset;
    
    blobs.forEach((blob, index) => {
        blob.style.transform = `translateY(${scrollPosition * (0.1 + index * 0.05)}px)`;
    });
});

// ========================= 
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ========================= 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ========================= 
// PROGRESS BAR ANIMATION
// ========================= 
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);
}

// ========================= 
// NAVBAR SCROLL EFFECT
// ========================= 
let navScrolled = false;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        if (!navScrolled) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
            navScrolled = true;
        }
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navScrolled = false;
    }
});

// ========================= 
// HIDE MOBILE MENU ON CLICK OUTSIDE
// ========================= 
document.addEventListener('click', (e) => {
    const isClickInsideNav = document.querySelector('.nav-container').contains(e.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ========================= 
// KEYBOARD NAVIGATION
// ========================= 
document.addEventListener('keydown', (e) => {
    // Close modal on Escape
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ========================= 
// PAGE PERFORMANCE OPTIMIZATION
// ========================= 
// Lazy loading for images (if any are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================= 
// COUNTER ANIMATION FOR STATS
// ========================= 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================= 
// SCROLL TO TOP BUTTON (optional enhancement)
// ========================= 
function createScrollToTop() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
    });
}

// Uncomment to enable scroll to top button
// createScrollToTop();

// ========================= 
// INITIALIZATION
// ========================= 
console.log('✨ Portfolio loaded successfully!');
console.log('💡 Tips: Use the theme toggle to switch between light and dark modes.');
console.log('📱 This portfolio is fully responsive - try resizing your browser!');
