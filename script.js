// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Profile image handling
function handleProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    
    if (!profileImage || !imagePlaceholder) return;
    
    // Hide placeholder when image loads successfully
    profileImage.addEventListener('load', function() {
        console.log('Profile image loaded successfully - hiding placeholder');
        imagePlaceholder.style.display = 'none';
    });
    
    // Show placeholder if image fails to load
    profileImage.addEventListener('error', function() {
        console.log('Profile image failed to load - showing placeholder');
        imagePlaceholder.style.display = 'flex';
    });
    
    // Check if image is already loaded (cached)
    if (profileImage.complete && profileImage.naturalHeight !== 0) {
        console.log('Image already loaded from cache - hiding placeholder');
        imagePlaceholder.style.display = 'none';
    } else if (profileImage.complete && profileImage.naturalHeight === 0) {
        // Image failed to load
        console.log('Image failed to load (cached) - showing placeholder');
        imagePlaceholder.style.display = 'flex';
    } else {
        // Image is still loading
        console.log('Image is loading...');
    }
}

// Initialize profile image handling
document.addEventListener('DOMContentLoaded', handleProfileImage);

// Animation on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.highlight-item, .skill-category, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to update about section with LinkedIn data
function updateAboutSection(linkedinData) {
    const aboutDescription = document.getElementById('aboutDescription');
    if (linkedinData && aboutDescription) {
        aboutDescription.innerHTML = linkedinData;
    }
}

// Function to add profile photo
function addProfilePhoto(photoUrl) {
    const profileImage = document.getElementById('profileImage');
    if (photoUrl && profileImage) {
        profileImage.src = photoUrl;
    }
}

// Export functions for external use
window.portfolioUtils = {
    updateAboutSection,
    addProfilePhoto
};
