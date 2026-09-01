/**
 * ENYOJO SHADES — FULLSTACK EDITORIAL MOTION ENGINE
 */

let currentSlideIdx = 0;
const SLIDE_DURATION = 6000;
let slideTimer = null;
let progressInterval = null;

// MOOD REGISTRY DATA FOR DESKTOP & MOBILE INTERACTIVE MOOD STAGE
const MOOD_DATA = {
  BOLD: {
    id: 'cat-eye-white',
    badge: 'BOLD FRAME',
    name: 'The Statement White Cat Eye',
    price: '₦18,500',
    image: 'assets/products/cat_eye_white_model.jpg'
  },
  SOFT: {
    id: 'cat-eye-rose-gold',
    badge: 'SOFT FRAME',
    name: 'Rose Gold Wireframe',
    price: '₦16,500',
    image: 'assets/products/cat_eye_rose_gold_model.jpg'
  },
  CLASSIC: {
    id: 'wire-obsidian',
    badge: 'CLASSIC FRAME',
    name: 'The Obsidian Classic',
    price: '₦17,500',
    image: 'assets/slides/slide2_hero.jpg'
  },
  PLAYFUL: {
    id: 'cat-eye-lavender',
    badge: 'PLAYFUL FRAME',
    name: 'Lavender Dusk Silhouette',
    price: '₦19,000',
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

// SECTION 1 INTERACTIVITY: THE ENYOJO MOOD (DESKTOP + MOBILE STAGE)
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
    label.addEventListener('mouseenter', () => activateMood(label.dataset.mood));
    label.addEventListener('click', () => activateMood(label.dataset.mood));
  });

  // Desktop Card Hover
  moodCards.forEach(card => {
    card.addEventListener('mouseenter', () => activateMood(card.dataset.mood));
    card.addEventListener('mouseleave', () => deactivateMoods());
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
        // Swipe left -> next mood
        const currentIdx = MOOD_KEYS.indexOf(activeMoodKey);
        const nextKey = MOOD_KEYS[(currentIdx + 1) % MOOD_KEYS.length];
        activateMood(nextKey);
      } else if (mTouchEndX > mTouchStartX + 40) {
        // Swipe right -> prev mood
        const currentIdx = MOOD_KEYS.indexOf(activeMoodKey);
        const prevKey = MOOD_KEYS[(currentIdx - 1 + MOOD_KEYS.length) % MOOD_KEYS.length];
        activateMood(prevKey);
      }
    }, { passive: true });
  }

  function deactivateMoods() {
    if (window.innerWidth >= 993 && moodSpread) {
      moodSpread.classList.remove('has-active');
      moodCards.forEach(c => c.classList.remove('active'));
    }
  }
}

// GLOBAL FUNCTION TO ACTIVATE MOOD (DESKTOP & MOBILE STAGE)
function activateMood(moodName) {
  if (!MOOD_DATA[moodName]) return;
  activeMoodKey = moodName;

  const moodSpread = document.getElementById('mood-spread');
  const moodLabels = document.querySelectorAll('.mood-label-item');
  const moodCards = document.querySelectorAll('.mood-portrait-card');
  const moodDots = document.querySelectorAll('.mood-dot');

  // Update Top Mood Labels
  moodLabels.forEach(l => {
    l.classList.toggle('active', l.dataset.mood === moodName);
  });

  // Desktop Spread Updates
  if (moodSpread) {
    moodSpread.classList.add('has-active');
    moodCards.forEach(c => {
      c.classList.toggle('active', c.dataset.mood === moodName);
    });
  }

  // Mobile Interactive Mood Stage Updates
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
      mobileCard.onclick = () => openQuickView(data.id);
      mobileImg.style.opacity = '1';
    }, 150);

    // Update Dots
    moodDots.forEach(d => {
      d.classList.toggle('active', d.dataset.mood === moodName);
    });
  }
}

// SECTION 2 INTERACTIVITY: WEAR THE MOMENT
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

// RENDER FEATURED COLLECTION GRID
function renderCatalog(items) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="product-card" data-vibe="${item.vibe}">
      <div class="product-image-stage" onclick="openQuickView('${item.id}')">
        <span class="product-tag-badge">${item.tag}</span>
        
        <img src="${item.image}" alt="${item.name}" class="img-product-studio" loading="lazy" />
        <img src="${item.modelImage}" alt="${item.name} Styled Model View" class="img-product-model" loading="lazy" />
        
        <div class="product-quick-cta">
          <button class="btn-card-order" onclick="event.stopPropagation(); triggerWhatsAppOrder('${item.name}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="6" cy="12" r="4.5" />
              <circle cx="18" cy="12" r="4.5" />
              <path d="M10.5 11.5c.8-.7 2.2-.7 3 0" />
              <path d="M1.5 12l2.5-3" />
              <path d="M22.5 12l-2.5-3" />
            </svg>
            Order Frame on WhatsApp
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
  window.open(getWhatsAppOrderUrl(productName), '_blank');
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

function openQuickView(productId) {
  const product = CONFIG.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quick-view-modal');
  const content = document.getElementById('quick-view-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="modal-grid-container">
      <div class="modal-img-wrapper" style="position: relative; border-radius: 16px; overflow: hidden; background: #120C22; height: 320px;">
        <img src="${product.modelImage}" style="width: 100%; height: 100%; object-fit: cover;" alt="${product.name}" />
      </div>
      <div>
        <span style="color: var(--warm-gold); font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${product.tag}</span>
        <h2 style="font-size: clamp(1.3rem, 4vw, 1.8rem); color: #FFF; margin: 6px 0;">${product.name}</h2>
        <p style="font-size: clamp(1.2rem, 3vw, 1.5rem); color: var(--warm-gold); font-weight: 700; margin-bottom: 10px;">${product.price}</p>
        
        <p style="color: var(--text-light-secondary); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px;">${product.description}</p>
        
        <div style="font-size: 0.75rem; color: var(--soft-lavender); background: rgba(118, 91, 167, 0.15); padding: 12px; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--glass-border-purple);">
          <strong>Available Colors:</strong> ${product.colors.join(', ')}<br>
          <strong>Specifications:</strong> ${product.specifications.join(' • ')}
        </div>
        
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button class="btn-whatsapp-hero" style="flex: 1; min-width: 160px; justify-content: center; padding: 12px;" onclick="triggerWhatsAppOrder('${product.name}')">
            Order on WhatsApp
          </button>
          <a href="${CONFIG.instagramUrl}" target="_blank" class="btn-primary" style="padding: 12px 20px;">
            Instagram DM
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeQuickView() {
  document.getElementById('quick-view-modal').classList.remove('active');
}
