/**
 * ENYOJO SHADES — FULLSTACK EDITORIAL MOTION & ON-SITE PAYMENT ENGINE
 */

let currentSlideIdx = 0;
const SLIDE_DURATION = 6000;
let slideTimer = null;
let progressInterval = null;

// SHEET STATE
let currentProduct = null;
let currentQuantity = 1;
let selectedColor = '';

// MOOD REGISTRY DATA FOR DESKTOP & MOBILE INTERACTIVE MOOD STAGE
const MOOD_DATA = {
  BOLD: {
    id: 'cat-eye-white',
    badge: 'BOLD FRAME',
    name: 'The Statement White Cat Eye',
    price: '₦16,500',
    image: 'assets/products/cat_eye_white_model.jpg'
  },
  SOFT: {
    id: 'cat-eye-rose-gold',
    badge: 'SOFT FRAME',
    name: 'Rose Gold Wireframe',
    price: '₦15,000',
    image: 'assets/products/cat_eye_rose_gold_model.jpg'
  },
  CLASSIC: {
    id: 'wire-obsidian',
    badge: 'CLASSIC FRAME',
    name: 'The Obsidian Classic',
    price: '₦14,500',
    image: 'assets/slides/slide2_hero.jpg'
  },
  PLAYFUL: {
    id: 'cat-eye-lavender',
    badge: 'PLAYFUL FRAME',
    name: 'Lavender Dusk Silhouette',
    price: '₦17,000',
    image: 'assets/slides/slide3_hero.jpg'
  }
};

const MOOD_KEYS = ['BOLD', 'SOFT', 'CLASSIC', 'PLAYFUL'];
let activeMoodKey = 'BOLD';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroSliderEngine();
  initEnyojoMoodInteractivity();
  initWearMomentScroll();
  renderCatalog(CONFIG.products);
  initVibeFilters();
  initModalListeners();
});

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function toggleMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.toggle('active');
  }
}

// HERO SLIDER ENGINE
function initHeroSliderEngine() {
  startSlideTimer();

  const sliderStage = document.getElementById('hero-slider');
  if (!sliderStage) return;

  let touchStartX = 0;
  let touchEndX = 0;

  sliderStage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderStage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    if (touchEndX < touchStartX - 40) nextSlide();
    if (touchEndX > touchStartX + 40) prevSlide();
  }
}

function goToSlide(idx) {
  const slides = document.querySelectorAll('.hero-slide-item');
  const tabs = document.querySelectorAll('.slider-tab-item');
  if (!slides.length) return;

  slides.forEach(s => s.classList.remove('active'));
  tabs.forEach(t => t.classList.remove('active'));

  currentSlideIdx = (idx + slides.length) % slides.length;

  slides[currentSlideIdx].classList.add('active');
  tabs[currentSlideIdx].classList.add('active');

  resetProgressBar();
  startSlideTimer();
}

function nextSlide() { goToSlide(currentSlideIdx + 1); }
function prevSlide() { goToSlide(currentSlideIdx - 1); }

function startSlideTimer() {
  clearInterval(slideTimer);
  clearInterval(progressInterval);

  let progress = 0;
  const progressBars = document.querySelectorAll('.slider-tab-progress');
  progressBars.forEach(b => b.style.width = '0%');

  const currentProgressBar = document.getElementById(`progress-${currentSlideIdx}`);

  progressInterval = setInterval(() => {
    progress += (100 / (SLIDE_DURATION / 100));
    if (currentProgressBar) currentProgressBar.style.width = `${Math.min(progress, 100)}%`;
  }, 100);

  slideTimer = setInterval(() => { nextSlide(); }, SLIDE_DURATION);
}

function resetProgressBar() {
  const progressBars = document.querySelectorAll('.slider-tab-progress');
  progressBars.forEach(b => b.style.width = '0%');
}

// SECTION 1 INTERACTIVITY: THE ENYOJO MOOD (EDITORIAL STYLE CARD EXPAND - OPTION B)
function initEnyojoMoodInteractivity() {
  const moodSection = document.getElementById('enyojo-mood');
  const moodSpread = document.getElementById('mood-spread');
  const moodLabels = document.querySelectorAll('.mood-label-item');
  const moodCards = document.querySelectorAll('.mood-portrait-card');
  const bgMotif = document.getElementById('bg-frame-motif');

  const mobileCard = document.getElementById('mobile-mood-card');
  const moodDots = document.querySelectorAll('.mood-dot');

  if (!moodSection) return;

  // Desktop Mouse Parallax
  moodSection.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 993) return;
    const rect = moodSection.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.015;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.015;

    moodCards.forEach((card, i) => {
      const depth = (i + 1) * 0.6;
      card.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });

    if (bgMotif) {
      bgMotif.style.transform = `rotate(${x * 0.5}deg)`;
    }
  });

  // Label click & hover events
  moodLabels.forEach(label => {
    label.addEventListener('click', () => activateMood(label.dataset.mood));
  });

  // Desktop Card Click (EDITORIAL EXPAND OPTION B)
  moodCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      activateMood(card.dataset.mood);
      openEditorialStyleGuide(card.dataset.mood);
    });
  });

  // Mobile Dot Click
  moodDots.forEach(dot => {
    dot.addEventListener('click', () => activateMood(dot.dataset.mood));
  });

  // Mobile Touch Swipe Support
  if (mobileCard) {
    let mTouchStartX = 0;
    let mTouchEndX = 0;

    mobileCard.addEventListener('touchstart', (e) => {
      mTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    mobileCard.addEventListener('touchend', (e) => {
      mTouchEndX = e.changedTouches[0].screenX;
      if (mTouchEndX < mTouchStartX - 40) {
        const currentIdx = MOOD_KEYS.indexOf(activeMoodKey);
        const nextKey = MOOD_KEYS[(currentIdx + 1) % MOOD_KEYS.length];
        activateMood(nextKey);
      } else if (mTouchEndX > mTouchStartX + 40) {
        const currentIdx = MOOD_KEYS.indexOf(activeMoodKey);
        const prevKey = MOOD_KEYS[(currentIdx - 1 + MOOD_KEYS.length) % MOOD_KEYS.length];
        activateMood(prevKey);
      }
    }, { passive: true });

    mobileCard.addEventListener('click', () => {
      openEditorialStyleGuide(activeMoodKey);
    });
  }
}

function activateMood(moodName) {
  if (!MOOD_DATA[moodName]) return;
  activeMoodKey = moodName;

  const moodSpread = document.getElementById('mood-spread');
  const moodLabels = document.querySelectorAll('.mood-label-item');
  const moodCards = document.querySelectorAll('.mood-portrait-card');
  const moodDots = document.querySelectorAll('.mood-dot');

  moodLabels.forEach(l => {
    l.classList.toggle('active', l.dataset.mood === moodName);
  });

  if (moodSpread) {
    moodSpread.classList.add('has-active');
    moodCards.forEach(c => {
      c.classList.toggle('active', c.dataset.mood === moodName);
    });
  }

  const mobileCard = document.getElementById('mobile-mood-card');
  const mobileImg = document.getElementById('mobile-mood-img');
  const mobileBadge = document.getElementById('mobile-mood-badge');
  const mobileTitle = document.getElementById('mobile-mood-title');
  const mobilePrice = document.getElementById('mobile-mood-price');

  if (mobileCard && mobileImg && MOOD_DATA[moodName]) {
    const data = MOOD_DATA[moodName];
    
    mobileImg.style.opacity = '0.3';
    setTimeout(() => {
      mobileImg.src = data.image;
      if (mobileBadge) mobileBadge.textContent = data.badge;
      if (mobileTitle) mobileTitle.textContent = data.name;
      if (mobilePrice) mobilePrice.textContent = data.price;
      mobileImg.style.opacity = '1';
    }, 150);

    moodDots.forEach(d => {
      d.classList.toggle('active', d.dataset.mood === moodName);
    });
  }
}

// SECTION 1 OPTION B: OPEN EDITORIAL STYLE GUIDE DRAWER / POP-OVER
function openEditorialStyleGuide(moodName) {
  const guide = CONFIG.moodGuides[moodName];
  if (!guide) return;

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="text-align: center; padding: 6px 0; width: 100%; box-sizing: border-box; overflow-x: hidden;">
      <span style="color: var(--warm-gold); font-size: 0.72rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; display: block; margin-bottom: 6px;">
        ${guide.badge}
      </span>
      <h2 style="font-family: var(--font-serif); font-size: clamp(1.3rem, 4vw, 2.2rem); color: #FFF; margin-bottom: 12px; line-height: 1.25; word-break: break-word; max-width: 100%;">
        ${guide.title}
      </h2>
      
      <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid var(--glass-border-purple); padding: 14px; border-radius: 16px; margin-bottom: 20px; text-align: left; width: 100%; box-sizing: border-box;">
        <div style="font-size: 0.78rem; color: var(--soft-lavender); font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          FASHION STYLING TIP:
        </div>
        <p style="color: var(--text-light-secondary); font-size: 0.85rem; line-height: 1.5; word-break: break-word;">${guide.tip}</p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; width: 100%; box-sizing: border-box;">
        <button class="btn-primary" onclick="closeQuickView(); filterAndScrollToMood('${moodName}')" style="width: 100%; max-width: 100%; font-size: 0.82rem; padding: 12px 16px; box-sizing: border-box;">
          EXPLORE ${moodName} FRAMES IN SHOP →
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function filterAndScrollToMood(vibe) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    if (btn.dataset.vibe === vibe || (vibe === 'SOFT' && btn.dataset.vibe === 'MINIMAL')) {
      btn.click();
    }
  });

  const shopSection = document.getElementById('collection');
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// SECTION 2 INTERACTIVITY: WEAR THE MOMENT (SHOP HIGHLIGHT OPTION A)
function initWearMomentScroll() {
  const wrapper = document.querySelector('.wear-moment-sticky-wrapper');
  const track = document.getElementById('horizontal-track');

  if (!wrapper || !track) return;

  window.addEventListener('scroll', () => {
    if (window.innerWidth < 993) return;

    const rect = wrapper.getBoundingClientRect();
    const wrapperHeight = wrapper.offsetHeight - window.innerHeight;

    if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
      const scrolled = Math.abs(rect.top);
      const progress = Math.min(Math.max(scrolled / wrapperHeight, 0), 1);
      
      const maxTranslate = track.scrollWidth - window.innerWidth + window.innerWidth * 0.1;
      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    }
  });
}

// SECTION 2 OPTION A: DIRECT HIGHLIGHT IN SHOP
function highlightProductFrame(productId) {
  renderCatalog(CONFIG.products);
  
  const shopSection = document.getElementById('collection');
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
      if (card.getAttribute('data-product-id') === productId) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('gold-highlight-pulse');
        setTimeout(() => card.classList.remove('gold-highlight-pulse'), 3000);
      }
    });
  }, 600);
}

// RENDER FEATURED COLLECTION GRID (SECTION 3 E-COMMERCE HUB)
function renderCatalog(items) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="product-card" data-vibe="${item.vibe}" data-product-id="${item.id}">
      <div class="product-image-stage" onclick="openQuickView('${item.id}')">
        <span class="product-tag-badge">${item.tag}</span>
        
        <img src="${item.image}" alt="${item.name}" class="img-product-studio" loading="lazy" />
        <img src="${item.modelImage}" alt="${item.name} Styled Model View" class="img-product-model" loading="lazy" />
        
        <div class="product-quick-cta">
          <button class="btn-card-order" onclick="event.stopPropagation(); openQuickView('${item.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="12" r="4.5" />
              <circle cx="18" cy="12" r="4.5" />
              <path d="M10.5 11.5c.8-.7 2.2-.7 3 0" />
              <path d="M1.5 12l2.5-3" />
              <path d="M22.5 12l-2.5-3" />
            </svg>
            View Details & Order
          </button>
        </div>
      </div>
      
      <div class="product-info">
        <div class="product-header-row">
          <h3 class="product-title">${item.name}</h3>
          <span class="product-price">${item.price}</span>
        </div>
        <div style="font-size: 0.75rem; color: var(--text-light-secondary); margin-top: 4px;">
          Available Colors: <strong style="color: var(--soft-lavender);">${item.colors.join(', ')}</strong>
        </div>
      </div>
    </div>
  `).join('');
}

function initVibeFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const vibe = btn.dataset.vibe;
      if (vibe === 'ALL') {
        renderCatalog(CONFIG.products);
      } else {
        const filtered = CONFIG.products.filter(p => p.vibe === vibe);
        renderCatalog(filtered);
      }
    });
  });
}

function triggerWhatsAppOrder(productName) {
  const qty = currentQuantity || 1;
  const col = selectedColor || '';
  window.open(getWhatsAppOrderUrl(productName, qty, col), '_blank');
}

function triggerGeneralWhatsApp() {
  window.open(getGeneralWhatsAppUrl(), '_blank');
}

function initModalListeners() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });
}

// RICH MULTI-ANGLE & COLOR PRODUCT DETAIL SHEET MODAL (FOR SECTION 3 SHOP ONLY)
function openQuickView(productId) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  currentQuantity = 1;
  selectedColor = product.colors[0] || '';

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  const angles = product.angleImages || {
    front: product.image,
    side: product.modelImage,
    studio: product.image,
    model: product.modelImage
  };

  content.innerHTML = `
    <div class="sheet-grid-container" style="width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: hidden;">
      
      <!-- LEFT COLUMN: MAIN IMAGE STAGE + 4 ANGLE THUMBNAILS -->
      <div class="sheet-gallery-stage" style="width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; overflow: hidden;">
        <div class="sheet-main-img-box" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          <img src="${angles.front}" id="sheet-main-img" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <div class="angle-thumbnail-grid" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; gap: 6px; width: 100%; max-width: 100%; box-sizing: border-box; overflow: hidden; margin-top: 10px;">
          <button class="angle-thumb-btn active" onclick="switchAngleImage('${angles.front}', this)" style="flex: 1 1 0px; min-width: 0; width: 0; height: 48px; border-radius: 8px; overflow: hidden; position: relative; padding: 0; margin: 0; box-sizing: border-box; cursor: pointer;">
            <img src="${angles.front}" alt="Front View" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span class="angle-thumb-label" style="position: absolute; bottom: 2px; left: 1px; right: 1px; background: rgba(10, 6, 18, 0.9); font-size: 0.48rem; font-weight: 700; color: var(--soft-lavender); text-align: center; padding: 1px 0; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">FRONT</span>
          </button>

          <button class="angle-thumb-btn" onclick="switchAngleImage('${angles.side}', this)" style="flex: 1 1 0px; min-width: 0; width: 0; height: 48px; border-radius: 8px; overflow: hidden; position: relative; padding: 0; margin: 0; box-sizing: border-box; cursor: pointer;">
            <img src="${angles.side}" alt="Side View" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span class="angle-thumb-label" style="position: absolute; bottom: 2px; left: 1px; right: 1px; background: rgba(10, 6, 18, 0.9); font-size: 0.48rem; font-weight: 700; color: var(--soft-lavender); text-align: center; padding: 1px 0; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">SIDE</span>
          </button>

          <button class="angle-thumb-btn" onclick="switchAngleImage('${angles.studio}', this)" style="flex: 1 1 0px; min-width: 0; width: 0; height: 48px; border-radius: 8px; overflow: hidden; position: relative; padding: 0; margin: 0; box-sizing: border-box; cursor: pointer;">
            <img src="${angles.studio}" alt="Studio View" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span class="angle-thumb-label" style="position: absolute; bottom: 2px; left: 1px; right: 1px; background: rgba(10, 6, 18, 0.9); font-size: 0.48rem; font-weight: 700; color: var(--soft-lavender); text-align: center; padding: 1px 0; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">STUDIO</span>
          </button>

          <button class="angle-thumb-btn" onclick="switchAngleImage('${angles.model}', this)" style="flex: 1 1 0px; min-width: 0; width: 0; height: 48px; border-radius: 8px; overflow: hidden; position: relative; padding: 0; margin: 0; box-sizing: border-box; cursor: pointer;">
            <img src="${angles.model}" alt="Model Wear" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
            <span class="angle-thumb-label" style="position: absolute; bottom: 2px; left: 1px; right: 1px; background: rgba(10, 6, 18, 0.9); font-size: 0.48rem; font-weight: 700; color: var(--soft-lavender); text-align: center; padding: 1px 0; border-radius: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">MODEL</span>
          </button>
        </div>
      </div>

      <!-- RIGHT COLUMN: DETAILS, COLORS, QUANTITY & OPAY PAYMENTS (STRICT 100% CONTAINED) -->
      <div style="width: 100%; min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: hidden;">
        <span style="color: var(--warm-gold); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; display: block;">${product.tag}</span>
        <h2 style="font-size: clamp(1.15rem, 3.8vw, 1.8rem); color: #FFF; margin: 4px 0 8px 0; font-family: var(--font-serif); word-break: break-word; overflow-wrap: break-word; line-height: 1.25; max-width: 100%;">${product.name}</h2>
        
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; width: 100%; box-sizing: border-box;">
          <span style="font-size: 1.25rem; color: var(--warm-gold); font-weight: 700;" id="sheet-unit-price">${product.price}</span>
          <span style="font-size: 0.72rem; color: var(--soft-lavender); background: rgba(118, 91, 167, 0.25); padding: 4px 10px; border-radius: 12px; border: 1px solid var(--glass-border-purple);">In Stock</span>
        </div>

        <div class="prescription-badge" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Prescription & Fashion Lens Compatible</span>
        </div>

        <p style="color: var(--text-light-secondary); font-size: 0.78rem; line-height: 1.45; margin-bottom: 12px; word-break: break-word; max-width: 100%;">${product.description}</p>

        <!-- COLOR SWATCH SELECTOR -->
        <div style="font-size: 0.75rem; color: #FFF; font-weight: 600; margin-bottom: 6px;">Select Color Variant:</div>
        <div class="color-swatch-group" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          ${product.colors.map((c, i) => `
            <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" onclick="selectSheetColor('${c}', this)">
              ${c}
            </button>
          `).join('')}
        </div>

        <!-- QUANTITY STEPPER -->
        <div class="quantity-row" style="width: 100%; max-width: 100%; box-sizing: border-box;">
          <span style="font-size: 0.8rem; color: #FFF; font-weight: 600;">Quantity:</span>
          <div class="quantity-stepper">
            <button class="step-btn" onclick="changeSheetQuantity(-1)">-</button>
            <span class="quantity-val" id="sheet-quantity-val">1</span>
            <button class="step-btn" onclick="changeSheetQuantity(1)">+</button>
          </div>
          <span style="font-size: 1.05rem; color: var(--warm-gold); font-weight: 700;" id="sheet-total-price">${product.price}</span>
        </div>

        <!-- CUSTOMER CHECKOUT FORM FOR OPAY DIRECT PAYMENT -->
        <div class="checkout-form-box" style="width: 100%; max-width: 100%; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px;">
          <input type="text" id="cust-name" class="checkout-input" placeholder="Full Name (e.g. Amina Bello)" required style="width: 100%; max-width: 100%; box-sizing: border-box;" />
          <input type="tel" id="cust-phone" class="checkout-input" placeholder="Phone Number (e.g. 08186389898)" required style="width: 100%; max-width: 100%; box-sizing: border-box;" />
          <input type="text" id="cust-address" class="checkout-input" placeholder="Delivery Address (Abuja, Niger, Kaduna...)" required style="width: 100%; max-width: 100%; box-sizing: border-box;" />
        </div>

        <!-- DUAL ACTION BUTTONS (OPAY PAY ONLINE + WHATSAPP DIRECT ORDER) - STRICT 100% BOX CONTAINMENT -->
        <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 100%; box-sizing: border-box; margin-top: 10px;">
          <button class="opay-pay-btn" onclick="processPaystackOpayPayment()" style="width: 100%; max-width: 100%; box-sizing: border-box; padding: 12px 10px; font-size: 0.78rem; border-radius: 22px; margin-bottom: 0; display: flex; align-items: center; justify-content: center; gap: 6px; text-align: center; white-space: normal; line-height: 1.25;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
            <span>PAY ONLINE NOW (OPay / Card)</span>
          </button>

          <button class="btn-whatsapp-hero" style="width: 100%; max-width: 100%; box-sizing: border-box; justify-content: center; padding: 11px 10px; font-size: 0.78rem; border-radius: 22px; white-space: normal; text-align: center; line-height: 1.25;" onclick="triggerWhatsAppOrder('${product.name}')">
            ORDER VIA WHATSAPP INSTEAD
          </button>
        </div>

      </div>

    </div>
  `;

  modal.classList.add('active');
}

function closeQuickView() {
  document.getElementById('quick-view-modal').classList.remove('active');
}

// SWITCH ANGLE THUMBNAILS
function switchAngleImage(imgUrl, thumbEl) {
  const mainImg = document.getElementById('sheet-main-img');
  const thumbs = document.querySelectorAll('.angle-thumb-btn');

  if (mainImg) {
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = imgUrl;
      mainImg.style.opacity = '1';
    }, 150);
  }

  thumbs.forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

// SELECT COLOR VARIANT
function selectSheetColor(colorName, btnEl) {
  selectedColor = colorName;
  const buttons = document.querySelectorAll('.color-swatch-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// CHANGE QUANTITY STEPPER
function changeSheetQuantity(delta) {
  currentQuantity = Math.max(1, currentQuantity + delta);
  
  const qVal = document.getElementById('sheet-quantity-val');
  const totalPriceEl = document.getElementById('sheet-total-price');

  if (qVal) qVal.textContent = currentQuantity;
  
  if (totalPriceEl && currentProduct) {
    const total = currentProduct.rawPrice * currentQuantity;
    totalPriceEl.textContent = `₦${total.toLocaleString()}`;
  }
}

// OPAY / PAYSTACK INLINE CHECKOUT SYSTEM
function processPaystackOpayPayment() {
  if (!currentProduct) return;

  const nameInput = document.getElementById('cust-name');
  const phoneInput = document.getElementById('cust-phone');
  const addressInput = document.getElementById('cust-address');

  const custName = nameInput ? nameInput.value.trim() : '';
  const custPhone = phoneInput ? phoneInput.value.trim() : '';
  const custAddress = addressInput ? addressInput.value.trim() : '';

  if (!custName || !custPhone) {
    alert('Please enter your Name and Phone Number to proceed with payment.');
    if (nameInput) nameInput.focus();
    return;
  }

  const totalAmountKobo = currentProduct.rawPrice * currentQuantity * 100;
  const dummyEmail = `${custPhone.replace(/[^0-9]/g, '') || 'customer'}@enyojoshades.com`;

  if (typeof PaystackPop === 'undefined') {
    // Direct Fallback to WhatsApp Order with Details
    alert('Opening direct order link...');
    triggerWhatsAppOrder(currentProduct.name);
    return;
  }

  const handler = PaystackPop.setup({
    key: CONFIG.paystackPublicKey,
    email: dummyEmail,
    amount: totalAmountKobo,
    currency: 'NGN',
    ref: 'ENYOJO_' + Math.floor((Math.random() * 1000000000) + 1),
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "customer_name", value: custName },
        { display_name: "Phone Number", variable_name: "phone_number", value: custPhone },
        { display_name: "Delivery Address", variable_name: "delivery_address", value: custAddress },
        { display_name: "Product Frame", variable_name: "product_frame", value: `${currentQuantity}x ${currentProduct.name} (${selectedColor})` }
      ]
    },
    callback: function(response) {
      alert(`Payment Successful! Receipt Reference: ${response.reference}\nRouting order confirmation to WhatsApp...`);
      closeQuickView();
      window.open(getWhatsAppOrderUrl(currentProduct.name, currentQuantity, selectedColor, response.reference), '_blank');
    },
    onClose: function() {
      // User closed popup without paying
    }
  });

  handler.openIframe();
}
