// ========================================
// SANDEEP AANJANA PORTFOLIO - JAVASCRIPT
// Interactive Features & Animations
// ========================================

// === DOCUMENT READY ===
document.addEventListener('DOMContentLoaded', function() {
  initCustomCursor();
  initNavbar();
  initScrollAnimations();
  initResumeDownload();
  initMobileMenu();
  initSmoothScroll();
});

// === CUSTOM CURSOR ===
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  
  if (!cursorDot) return;
  
  // Hide cursor on mobile
  if (window.innerWidth <= 768) {
    cursorDot.style.display = 'none';
    return;
  }
  
  document.addEventListener('mousemove', function(e) {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  
  // Hover effects - dot ko bada kar dete hain
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category, .skill-item');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursorDot.style.transform = 'scale(2.5)';
    });
    
    el.addEventListener('mouseleave', function() {
      cursorDot.style.transform = 'scale(1)';
    });
  });
}

// === NAVBAR SCROLL EFFECT ===
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navbar) return;
  
  // Scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Active section highlighting
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.skill-category, .project-card, .quality-item, .timeline-item, .contact-method');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
}

// === RESUME DOWNLOAD ===
function initResumeDownload() {
  const resumeBtn = document.getElementById('resume-btn');
  
  if (!resumeBtn) return;
  
  resumeBtn.addEventListener('click', function() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'resume/Sandeep_Aanjana_Resume.pdf'; // Path to resume
    link.download = 'Sandeep_Aanjana_Resume.pdf';
    link.click();
    
    // Show download notification
    showNotification('📥 Resume downloaded successfully!');
  });
}

// === MOBILE MENU TOGGLE ===
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  if (!hamburger || !navMenu) return;
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = this.querySelectorAll('span');
    if (this.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translateY(12px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if href is just "#"
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for navbar height
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// === NOTIFICATION HELPER ===
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #00ff88;
    color: #0a0e27;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0, 255, 136, 0.3);
    z-index: 10000;
    animation: slideInUp 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutDown 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// === PROFILE IMAGE FALLBACK ===
window.addEventListener('load', function() {
  const profileImg = document.getElementById('profile-img');
  
  if (profileImg) {
    profileImg.onerror = function() {
      // If image fails to load, create a placeholder
      this.style.display = 'none';
      const parent = this.parentElement;
      
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(0, 255, 136, 0.2));
        font-size: 72px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.3);
        font-family: 'Space Grotesk', sans-serif;
      `;
      placeholder.textContent = 'SA';
      
      parent.insertBefore(placeholder, this);
    };
  }
});

// === TYPING EFFECT (Optional Enhancement) ===
function initTypingEffect() {
  const subtitle = document.querySelector('.subtitle');
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '2px solid var(--accent-primary)';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    } else {
      subtitle.style.borderRight = 'none';
    }
  }
  
  setTimeout(type, 1000);
}

// === PARALLAX EFFECT FOR BLOBS ===
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const blobs = document.querySelectorAll('.gradient-blob');
  
  blobs.forEach((blob, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    blob.style.transform = `translateY(${yPos}px)`;
  });
});

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', function(e) {
  // ESC to close mobile menu
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
});

// === PERFORMANCE: Lazy Load Images ===
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// === CONSOLE MESSAGE ===
console.log('%c👋 Hello, Curious Developer!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s connect!', 'color: #6366f1; font-size: 14px;');
console.log('%c📧 sandeep67patel@gmail.com', 'color: #94a3b8; font-size: 12px;');