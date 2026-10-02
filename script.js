// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
const typingElement = document.querySelector('.typing');
const revealElements = document.querySelectorAll('.reveal-element');
const donationForm = document.getElementById('donation-form');
const contactForm = document.querySelector('.contact-form');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const adminLogin = document.getElementById('admin-login');
const adminDashboard = document.getElementById('admin-dashboard');
const exportCsvBtn = document.getElementById('export-csv');

// Typing Effect
const typingTexts = [
  "Empowering Young Minds",
  "Building Brighter Futures",
  "Creating Opportunities",
  "Transforming Communities"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const currentText = typingTexts[textIndex];
  
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeText, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
    setTimeout(typeText, 500);
  } else {
    setTimeout(typeText, isDeleting ? 50 : 100);
  }
}

typeText();

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      navUl.classList.remove('active');
    }
  });
});

// Reveal Elements on Scroll
const revealOnScroll = () => {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Call once on load

// Donation Form
const amountBtns = document.querySelectorAll('.amount-btn');
const customAmountInput = document.getElementById('custom-amount');

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const amount = btn.getAttribute('data-amount');
    customAmountInput.value = amount;
    
    // Visual feedback
    amountBtns.forEach(b => b.style.background = 'transparent');
    btn.style.background = 'var(--secondary-color)';
    btn.style.color = 'var(--primary-color)';
  });
});

donationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const donationType = document.querySelector('input[name="donation-type"]:checked').value;
  const amount = customAmountInput.value;
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const donorName = document.getElementById('donor-name').value;
  const donorEmail = document.getElementById('donor-email').value;
  const isAnonymous = document.getElementById('anonymous').checked;
  const subscribeNewsletter = document.getElementById('newsletter').checked;
  
  // Validate amount
  if (!amount || amount < 100) {
    alert('Please enter a valid donation amount (minimum ₦100)');
    return;
  }
  
  // Simulate donation processing
  const submitBtn = donationForm.querySelector('.donate-submit');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    // Update donation progress
    updateDonationProgress(parseInt(amount));
    
    // Show success message
    alert('Thank you for your donation! A confirmation email has been sent to you.');
    
    // Reset form
    donationForm.reset();
    amountBtns.forEach(btn => btn.style.background = 'transparent');
    submitBtn.innerHTML = '<i class="fas fa-heart"></i> Donate Now';
    submitBtn.disabled = false;
  }, 2000);
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;
  
  // Simulate form submission
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
    submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    submitBtn.disabled = false;
  }, 1500);
});

// Admin Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('admin-email').value;
  const password = document.getElementById('admin-password').value;
  
  // Simulate login (in real app, this would be server-side)
  if (email === 'owenosai@gmail.com' && password === '12345678910') {
    adminLogin.style.display = 'none';
    adminDashboard.style.display = 'block';
    updateAdminDashboard();
  } else {
    alert('Invalid credentials. Please try again.');
  }
});

// Admin Logout
logoutBtn.addEventListener('click', () => {
  adminLogin.style.display = 'block';
  adminDashboard.style.display = 'none';
  loginForm.reset();
});

// Update Admin Dashboard
function updateAdminDashboard() {
  // Simulate data
  const totalDonations = 250000;
  const totalDonors = 25;
  
  document.getElementById('total-donations').textContent = totalDonations.toLocaleString();
  document.getElementById('total-donors').textContent = totalDonors;
  
  // Update donations table
  const donationsTbody = document.getElementById('donations-tbody');
  donationsTbody.innerHTML = `
    <tr>
      <td>John Doe</td>
      <td>₦25,000</td>
      <td>2025-10-15</td>
      <td><span class="status-badge completed">Completed</span></td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>₦10,000</td>
      <td>2025-10-14</td>
      <td><span class="status-badge completed">Completed</span></td>
    </tr>
    <tr>
      <td>Anonymous</td>
      <td>₦50,000</td>
      <td>2025-10-13</td>
      <td><span class="status-badge completed">Completed</span></td>
    </tr>
  `;
}

// Export CSV
exportCsvBtn.addEventListener('click', () => {
  // Simulate CSV export
  alert('CSV export functionality would be implemented here. In a real application, this would download a CSV file of all donations.');
});

// Update Donation Progress
function updateDonationProgress(amount) {
  const progressFill = document.querySelector('.progress-fill');
  const progressAmount = document.querySelector('.progress-amount');
  const donorCount = document.getElementById('donor-count');
  
  // Simulate progress update
  const currentAmount = parseInt(progressAmount.textContent.replace('₦', '').replace(/,/g, ''));
  const newAmount = currentAmount + amount;
  const goal = 1500000; // ₦1,500,000 goal
  const progressPercent = Math.min((newAmount / goal) * 100, 100);
  
  progressFill.style.width = `${progressPercent}%`;
  progressAmount.textContent = `₦${newAmount.toLocaleString()}`;
  
  // Update donor count
  const currentDonors = parseInt(donorCount.textContent);
  donorCount.textContent = currentDonors + 1;
}

// Animate Stats on Scroll
const animateStats = () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateStat = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateStat);
      } else {
        stat.textContent = target;
      }
    };
    
    updateStat();
  });
};

// Intersection Observer for stats animation
const statsSection = document.querySelector('.about-stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}// Mobile Profile Fade-in Script
document.addEventListener('DOMContentLoaded', function() {
  const mobileProfile = document.querySelector('.mobile-profile');
  
  if (!mobileProfile) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show immediately without animation
    mobileProfile.classList.add('visible');
  } else {
    // Wait a bit then fade in
    setTimeout(() => {
      mobileProfile.classList.add('visible');
    }, 400);
  }
});// Mobile Profile Fade-in Script
document.addEventListener('DOMContentLoaded', function() {
  const mobileProfile = document.querySelector('.mobile-profile');
  
  if (!mobileProfile) return;
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Show immediately without animation
    mobileProfile.classList.add('visible');
  } else {
    // Wait a bit then fade in
    setTimeout(() => {
      mobileProfile.classList.add('visible');
    }, 400);
  }
});