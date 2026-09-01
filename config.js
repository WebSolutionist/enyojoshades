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
  
  // OPay / Merchant Configuration
  opayMerchantName: 'ENYOJO SHADES',
  opayAccountNo: '8186389898',
  paystackPublicKey: 'pk_test_d3a51f0c39f0417937397e5df0f02781b0a2dfd2',
  
  // Product Catalogue Architecture with Multi-Angle Gallery Support
  products: [
    {
      id: 'cat-eye-rose-gold',
      name: 'ENYOJO FRAME 01 — Royal Rose Gold',
      price: '₦15,000',
      rawPrice: 15000,
      vibe: 'BOLD',
      category: 'Cat Eye',
      tag: 'Bestseller',
      image: 'assets/products/cat_eye_rose_gold_studio.jpg',
      modelImage: 'assets/products/cat_eye_rose_gold_model.jpg',
      angleImages: {
        front: 'assets/products/cat_eye_rose_gold_studio.jpg',
        side: 'assets/products/cat_eye_rose_gold_model.jpg',
        studio: 'assets/products/cat_eye_rose_gold_studio.jpg',
        model: 'assets/products/cat_eye_rose_gold_model.jpg'
      },
      description: 'A statement cat eye wire frame featuring rose gold accents designed to complete your everyday look. Prescription optical lenses can easily be fitted.',
      colors: ['Rose Gold', 'Classic Gold', 'Silver'],
      specifications: ['Prescription Lens Compatible', 'Cat Eye Silhouette', 'Wire Rim Alloy Frame', 'Comfort Ergonomic Nose Bridge']
    },
    {
      id: 'cat-eye-white',
      name: 'ENYOJO FRAME 02 — Imperial White Rim',
      price: '₦16,500',
      rawPrice: 16500,
      vibe: 'MINIMAL',
      category: 'Wire Rim',
      tag: 'Trending',
      image: 'assets/products/cat_eye_white_studio.jpg',
      modelImage: 'assets/products/cat_eye_white_model.jpg',
      angleImages: {
        front: 'assets/products/cat_eye_white_studio.jpg',
        side: 'assets/products/cat_eye_white_model.jpg',
        studio: 'assets/products/cat_eye_white_studio.jpg',
        model: 'assets/products/cat_eye_white_model.jpg'
      },
      description: 'Sleek white top accent frame offering effortless modern elegance for corporate and casual outings. Perfect for custom prescription fitting.',
      colors: ['Imperial White', 'Gold Rim', 'Silver Accent'],
      specifications: ['Prescription Lens Compatible', 'Sleek Accent Top Rim', 'Featherweight Metal Alloy', 'Spring Flex Hinge']
    },
    {
      id: 'wire-obsidian',
      name: 'ENYOJO FRAME 03 — Midnight Obsidian Wire',
      price: '₦14,500',
      rawPrice: 14500,
      vibe: 'CLASSIC',
      category: 'Wire Rim',
      tag: 'Executive',
      image: 'assets/products/wire_obsidian_studio.jpg',
      modelImage: 'assets/products/wire_obsidian_model.jpg',
      angleImages: {
        front: 'assets/products/wire_obsidian_studio.jpg',
        side: 'assets/products/wire_obsidian_model.jpg',
        studio: 'assets/products/wire_obsidian_studio.jpg',
        model: 'assets/products/wire_obsidian_model.jpg'
      },
      description: 'Deep black wire frame with gold hinges that pairs seamlessly with suits, native attire, and daily wear. Ready for optical prescription lenses.',
      colors: ['Obsidian Black', 'Gold Wire', 'Gunmetal'],
      specifications: ['Prescription Lens Compatible', 'Classic Contour Rim', 'Durable Metal Hinges', 'Universal Bridge Fit']
    },
    {
      id: 'cat-eye-lavender',
      name: 'ENYOJO FRAME 04 — Lavender Dusk Luxe',
      price: '₦17,000',
      rawPrice: 17000,
      vibe: 'COLOURFUL',
      category: 'Cat Eye',
      tag: 'New Arrival',
      image: 'assets/products/cat_eye_lavender_studio.jpg',
      modelImage: 'assets/products/cat_eye_lavender_model.jpg',
      angleImages: {
        front: 'assets/products/cat_eye_lavender_studio.jpg',
        side: 'assets/products/cat_eye_lavender_model.jpg',
        studio: 'assets/products/cat_eye_lavender_studio.jpg',
        model: 'assets/products/cat_eye_lavender_model.jpg'
      },
      description: 'Signature royal purple cat eye glasses crafted for those who love bold, expressive fashion. Fully prescription lens friendly.',
      colors: ['Royal Lavender', 'Purple Tint', 'Gold Wire'],
      specifications: ['Prescription Lens Compatible', 'Signature Purple Accent', 'Lightweight Structure', 'Expressive Cat Eye Silhouette']
    },
    {
      id: 'wire-gold',
      name: 'ENYOJO FRAME 05 — Classic Gold Aviator',
      price: '₦15,500',
      rawPrice: 15500,
      vibe: 'CLASSIC',
      category: 'Aviator',
      tag: 'Unisex',
      image: 'assets/products/wire_gold_studio.jpg',
      modelImage: 'assets/products/wire_gold_model.jpg',
      angleImages: {
        front: 'assets/products/wire_gold_studio.jpg',
        side: 'assets/products/wire_gold_model.jpg',
        studio: 'assets/products/wire_gold_studio.jpg',
        model: 'assets/products/wire_gold_model.jpg'
      },
      description: 'Timeless featherweight gold wire aviators built for effortless street style and outdoor vibes. Prescription lens ready.',
      colors: ['Gold Wire', 'Silver Wire'],
      specifications: ['Prescription Lens Compatible', 'Classic Aviator Silhouette', 'Slim Metal Temples', 'All-Day Comfort Fit']
    },
    {
      id: 'pink-statement',
      name: 'ENYOJO FRAME 06 — Velvet Pink Statement',
      price: '₦18,000',
      rawPrice: 18000,
      vibe: 'COLOURFUL',
      category: 'Shades',
      tag: 'Statement',
      image: 'assets/products/pink_statement_studio.jpg',
      modelImage: 'assets/products/pink_statement_model.jpg',
      angleImages: {
        front: 'assets/products/pink_statement_studio.jpg',
        side: 'assets/products/pink_statement_model.jpg',
        studio: 'assets/products/pink_statement_studio.jpg',
        model: 'assets/products/pink_statement_model.jpg'
      },
      description: 'Oversized statement cat eye frame with soft pink accents for sunny outings and events. Optical lens customizable.',
      colors: ['Velvet Pink', 'Gold Rim'],
      specifications: ['Prescription Lens Compatible', 'Oversized Cat Eye Fit', 'Statement Tint Accent', 'Comfort Temple Tips']
    }
  ]
};

// Helper functions for WhatsApp links
function getWhatsAppOrderUrl(productName, quantity = 1, color = '', paymentRef = '') {
  let message = `Hi Enyojo Shades, I want to order ${quantity}x ${productName}`;
  if (color) message += ` in ${color}`;
  if (paymentRef) message += ` (Payment Ref: ${paymentRef})`;
  message += `. Please confirm delivery.`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function getGeneralWhatsAppUrl() {
  const message = `Hi Enyojo Shades, I would like to make an inquiry about your frames.`;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
