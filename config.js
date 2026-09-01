/**
 * ENYOJO SHADES — Centralized Brand & Product Data Configuration
 * Easy for developer / business owner to edit products, prices, and phone numbers in one place.
 */

const CONFIG = {
  brandName: 'ENYOJO SHADES',
  tagline: 'YOUR FRAME. YOUR STATEMENT.',
  supportingTagline: 'Eyewear made to complete the way you show up.',
  whatsappNumber: '2348186389898',
  instagramUrl: 'https://www.instagram.com/enyojoshades_nigeria',
  telegramUrl: 'https://t.me/enyojoshades',
  
  // Product Catalogue Architecture
  products: [
    {
      id: 'frame-01',
      name: 'ENYOJO FRAME 01 — Royal Rose Gold',
      price: '₦15,000',
      rawPrice: 15000,
      vibe: 'BOLD',
      category: 'Cat Eye',
      tag: 'Bestseller',
      image: 'assets/products/cat_eye_rose_gold_studio.jpg',
      modelImage: 'assets/products/cat_eye_rose_gold_model.jpg',
      description: 'A statement cat eye wire frame featuring rose gold accents designed to complete your everyday look.',
      colors: ['Rose Gold', 'Gold'],
      specifications: ['Cat Eye Silhouette', 'Wire Rim Alloy Frame', 'Comfort Ergonomic Nose Bridge']
    },
    {
      id: 'frame-02',
      name: 'ENYOJO FRAME 02 — Imperial White Rim',
      price: '₦16,500',
      rawPrice: 16500,
      vibe: 'MINIMAL',
      category: 'Wire Rim',
      tag: 'Trending',
      image: 'assets/products/cat_eye_white_studio.jpg',
      modelImage: 'assets/products/cat_eye_white_model.jpg',
      description: 'Sleek white top accent frame offering effortless modern elegance for corporate and casual outings.',
      colors: ['White / Gold', 'Silver'],
      specifications: ['Sleek Accent Top Rim', 'Featherweight Metal Alloy', 'Spring Flex Hinge']
    },
    {
      id: 'frame-03',
      name: 'ENYOJO FRAME 03 — Midnight Obsidian Wire',
      price: '₦14,500',
      rawPrice: 14500,
      vibe: 'CLASSIC',
      category: 'Wire Rim',
      tag: 'Executive',
      image: 'assets/products/wire_obsidian_studio.jpg',
      modelImage: 'assets/products/wire_obsidian_model.jpg',
      description: 'Deep black wire frame with gold hinges that pairs seamlessly with suits, native attire, and daily wear.',
      colors: ['Obsidian Black', 'Gold'],
      specifications: ['Classic Contour Rim', 'Durable Metal Hinges', 'Universal Bridge Fit']
    },
    {
      id: 'frame-04',
      name: 'ENYOJO FRAME 04 — Lavender Dusk Luxe',
      price: '₦17,000',
      rawPrice: 17000,
      vibe: 'COLOURFUL',
      category: 'Cat Eye',
      tag: 'New Arrival',
      image: 'assets/products/cat_eye_lavender_studio.jpg',
      modelImage: 'assets/products/cat_eye_lavender_model.jpg',
      description: 'Signature royal purple cat eye glasses crafted for those who love bold, expressive fashion.',
      colors: ['Royal Lavender', 'Purple Tint'],
      specifications: ['Signature Purple Accent', 'Lightweight Structure', 'Expressive Cat Eye Silhouette']
    },
    {
      id: 'frame-05',
      name: 'ENYOJO FRAME 05 — Classic Gold Aviator',
      price: '₦15,500',
      rawPrice: 15500,
      vibe: 'CLASSIC',
      category: 'Aviator',
      tag: 'Unisex',
      image: 'assets/products/wire_gold_studio.jpg',
      modelImage: 'assets/products/wire_gold_model.jpg',
      description: 'Timeless featherweight gold wire aviators built for effortless street style and outdoor vibes.',
      colors: ['Gold Wire'],
      specifications: ['Classic Aviator Silhouette', 'Slim Metal Temples', 'All-Day Lightweight Comfort']
    },
    {
      id: 'frame-06',
      name: 'ENYOJO FRAME 06 — Velvet Pink Statement',
      price: '₦18,000',
      rawPrice: 18000,
      vibe: 'COLOURFUL',
      category: 'Shades',
      tag: 'Statement',
      image: 'assets/products/pink_statement_studio.jpg',
      modelImage: 'assets/products/pink_statement_model.jpg',
      description: 'Oversized statement cat eye frame with soft pink accents for sunny outings and events.',
      colors: ['Velvet Pink', 'Gold'],
      specifications: ['Oversized Cat Eye Fit', 'Statement Tint Accent', 'Comfort Temple Tips']
    }
  ]
};

// Helper function to build 1-tap WhatsApp Order URLs
function getWhatsAppOrderUrl(productName) {
  const message = `Hi Enyojo Shades, I'm interested in ${productName}. Is it available?`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getGeneralWhatsAppUrl() {
  const message = `Hi Enyojo Shades, I would like to make an inquiry about your frames.`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
