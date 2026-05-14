/**
 * Global Configuration for the Demo Project
 */
const SITE = {
  name: "Nature's Bounty Wholesale",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "info@naturesbountywholesale.com",
  address: "123 Spice Market, Industrial Area, City Name, State - 123456",
  fssai: "12345678901234",
  tagline: "Your Trusted Partner for Premium Dry Fruits & Spices"
};

/**
 * Renders the global header component
 */
function renderHeader() {
  const mount = document.querySelector('[data-component="header"]');
  if (!mount) return;

  mount.innerHTML = `
    <div class="top-bar">
      <div class="container top-bar-flex">
        <div class="top-info-item"><i class="fas fa-truck"></i> <span>Bulk Wholesale Worldwide</span></div>
        <div class="top-info-item"><i class="fas fa-certificate"></i> <span>FSSAI Certified: ${SITE.fssai}</span></div>
        <div class="top-info-item hide-mobile"><i class="fas fa-star"></i> <span>Premium Quality Assurance</span></div>
      </div>
    </div>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <div class="container">
      <nav class="site-nav" aria-label="Primary navigation">
        <a class="logo" href="index.html" aria-label="${SITE.name} home">
          <span>${SITE.name}</span>
        </a>
        <button class="hamburger" type="button" aria-label="Toggle navigation" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="products.html">Our Catalog</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </nav>
    </div>
  `;
}

/**
 * Renders the global footer component
 */
function renderFooter() {
  const mount = document.querySelector('[data-component="footer"]');
  if (!mount) return;

  mount.innerHTML = `
    <footer class="footer-wrap">
      <div class="container">
        <div class="footer-main-grid">
          <div class="footer-col">
            <h3>${SITE.name}</h3>
            <p>${SITE.tagline}. We provide high-quality agro-commodities to businesses worldwide with a focus on integrity and quality.</p>
            <div class="social-links">
              <a href="https://wa.me/${SITE.whatsapp}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>
              <a href="mailto:${SITE.email}" aria-label="Email Us"><i class="fas fa-envelope"></i></a>
              <a href="tel:${SITE.phone}" aria-label="Call Us"><i class="fas fa-phone-alt"></i></a>
            </div>
          </div>
          
          <div class="footer-col">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">Wholesale Catalog</a></li>
              <li><a href="about.html">Our Story</a></li>
              <li><a href="contact.html">Get in Touch</a></li>
            </ul>
          </div>
          
          <div class="footer-col">
            <h3>Contact Info</h3>
            <ul class="footer-links">
              <li><i class="fas fa-map-marker-alt"></i> ${SITE.address}</li>
              <li><i class="fas fa-phone-alt"></i> ${SITE.phone}</li>
              <li><i class="fas fa-envelope"></i> ${SITE.email}</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>FSSAI License: ${SITE.fssai}</p>
          <p>&copy; ${new Date().getFullYear()} ${SITE.name}. All rights reserved. | Demo Wholesale Site</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Renders the floating WhatsApp action button
 */
function renderFloatingActions() {
  const mount = document.querySelector('[data-component="whatsapp"]');
  if (!mount) return;

  mount.innerHTML = `
    <div class="floating-actions">
      <a href="https://wa.me/${SITE.whatsapp}" class="whatsapp-btn" target="_blank" rel="noopener" aria-label="Inquiry on WhatsApp">
        <i class="fab fa-whatsapp"></i>
      </a>
    </div>
  `;
}

/**
 * Initializes navigation logic (Sticky header, Hamburger menu)
 */
function initNavigation() {
  const header = document.querySelector('[data-component="header"]');
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active");
      hamburger.classList.toggle("active", isOpen);
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
}

/**
 * Main Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderFloatingActions();
  initNavigation();
});
