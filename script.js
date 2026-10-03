/* ==========================================================================
   AROMA & BEAN - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');
  const toast = document.getElementById('toast');

  /* ------------------------------------------------------------------------
     1. STICKY HEADER ON SCROLL
     ------------------------------------------------------------------------ */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight Active Nav Item on Scroll
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. MOBILE NAVIGATION DRAWER TOGGLE
     ------------------------------------------------------------------------ */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('show')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // Close Mobile Menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        if (navToggle) {
          navToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     3. INTERACTIVE MENU CATEGORY FILTERING
     ------------------------------------------------------------------------ */
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      menuTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-target');

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     4. TOAST NOTIFICATION HELPER
     ------------------------------------------------------------------------ */
  function showToast(message, icon = 'fa-check-circle') {
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ------------------------------------------------------------------------
     5. ADD TO ORDER & ADD TO CART BUTTON HANDLERS
     ------------------------------------------------------------------------ */
  // Quick Order Plus Buttons in Menu
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.menu-card');
      const itemTitle = card ? card.querySelector('.menu-name').textContent : 'Item';
      showToast(`Added 1x "${itemTitle}" to your order!`);
    });
  });

  // Add to Cart Buttons in Beans Shop
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.shop-card');
      const beanTitle = card ? card.querySelector('.shop-title').textContent : 'Coffee Beans';
      showToast(`Added 1x "${beanTitle}" to cart!`, 'fa-bag-shopping');
    });
  });

  /* ------------------------------------------------------------------------
     6. FORM SUBMISSIONS (RESERVATION & NEWSLETTER)
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your inquiry has been sent.', 'fa-paper-plane');
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Welcome to the Coffee Club! Check your inbox.', 'fa-envelope');
      newsletterForm.reset();
    });
  }
});

