import { Product, Order, BespokeRequest, StoreSettings, AtelierCategoryCard } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'annex-001',
    name: 'Obsidian Velvet Corset Gown',
    description: 'Sculpted midnight velvet evening gown with hand-embroidered metallic bronze corset detailing and a sweeping floor-length train. Designed for regal gala appearances.',
    price: 1850,
    originalPrice: 2200,
    category: 'Evening Gowns',
    sizes: ['XS', 'S', 'M', 'L', 'Bespoke Custom'],
    colors: ['Obsidian Black', 'Deep Emerald', 'Royal Ruby'],
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 8,
    isFeatured: true,
    isNewArrival: true,
    fabricDetails: '100% Premium Silk Velvet lining, structured boning, glass crystal beads',
    careInstructions: 'Specialist Dry Clean Only'
  },
  {
    id: 'annex-002',
    name: 'Champagne Silk Draped Trench',
    description: 'Effortless luxury outer layer crafted from pure double-faced silk crepe. Features structured shoulder pads, horn buttons, and a removable waist tie.',
    price: 1250,
    category: 'Ready to Wear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Champagne Gold', 'Nude Sand', 'Midnight Navy'],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 12,
    isFeatured: true,
    isNewArrival: false,
    fabricDetails: '100% Mulberry Silk, Horn Button Closures',
    careInstructions: 'Dry Clean Only'
  },
  {
    id: 'annex-003',
    name: 'Architectural Tuxedo Suit',
    description: 'Precision-tailored double-breasted tuxedo featuring satin peak lapels, gold crest buttons, and slim high-waisted cigarette trousers.',
    price: 2100,
    originalPrice: 2400,
    category: 'Tailored Suits',
    sizes: ['36R', '38R', '40R', '42R', 'Bespoke Custom'],
    colors: ['Jet Black & Gold', 'Ivory & Silver', 'Imperial Navy'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 5,
    isFeatured: true,
    isNewArrival: true,
    fabricDetails: 'Italian Wool Super 150s, Silk Satin Trim',
    careInstructions: 'Dry Clean Only'
  },
  {
    id: 'annex-004',
    name: 'Aurelia Gold Leaf Cape Dress',
    description: 'Haute Couture showstopper embellished with hand-applied 24k gold leaf motif lace, plunging neckline, and sheer tulle cape overlay.',
    price: 3400,
    category: 'Haute Couture',
    sizes: ['XS', 'S', 'M', 'Bespoke Custom'],
    colors: ['Gold & Tulle', 'Rose Gold Satin'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    stock: 3,
    isFeatured: true,
    isNewArrival: true,
    fabricDetails: 'French Illusion Tulle, Metallic Thread Embroidery, Silk Lining',
    careInstructions: 'Haute Couture Specialist Preservation Only'
  },
  {
    id: 'annex-005',
    name: 'Monogrammed Calfskin Mini Bag',
    description: 'Structured box bag sculpted from full-grain Italian calfskin with a signature Annex Couture 18k gold-plated lock clasp and detachable chain.',
    price: 750,
    category: 'Luxury Accessories',
    sizes: ['One Size'],
    colors: ['Noir Black', 'Caramel Tan', 'Burgundy'],
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    stock: 15,
    isFeatured: false,
    isNewArrival: false,
    fabricDetails: 'Full-Grain Italian Calf Leather, 18k Gold Electroplated Hardware',
    careInstructions: 'Store in dust bag provided'
  },
  {
    id: 'annex-006',
    name: 'Sculpted Satin Bustier Top',
    description: 'Modern evening silhouette featuring structural internal boning, exposed back zipper, and sweetheart neckline in luminous heavy satin.',
    price: 620,
    category: 'Ready to Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ivory Silk', 'Obsidian Black', 'Oxblood Red'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    stock: 10,
    isFeatured: false,
    isNewArrival: true,
    fabricDetails: 'Heavy Silk Duchesse Satin',
    careInstructions: 'Dry Clean Only'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8941',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.vance@vogue-luxury.com',
    phone: '+1 (555) 234-8901',
    shippingAddress: '740 Park Avenue, Apt 12A, New York, NY 10021',
    items: [
      {
        productId: 'annex-001',
        productName: 'Obsidian Velvet Corset Gown',
        size: 'S',
        color: 'Obsidian Black',
        quantity: 1,
        price: 1850
      }
    ],
    totalAmount: 1850,
    status: 'Processing',
    createdAt: '2026-08-09T14:32:00Z',
    orderType: 'Standard'
  },
  {
    id: 'ORD-8942',
    customerName: 'Marcus Thorne',
    customerEmail: 'm.thorne@savile.co.uk',
    phone: '+44 20 7946 0912',
    shippingAddress: '14 Mayfair Square, London W1K 2HP, UK',
    items: [
      {
        productId: 'annex-003',
        productName: 'Architectural Tuxedo Suit',
        size: '40R',
        color: 'Jet Black & Gold',
        quantity: 1,
        price: 2100
      }
    ],
    totalAmount: 2100,
    status: 'Shipped',
    createdAt: '2026-08-08T09:15:00Z',
    orderType: 'Standard'
  }
];

export const INITIAL_BESPOKE_REQUESTS: BespokeRequest[] = [
  {
    id: 'BESP-102',
    clientName: 'Sophia Laurent',
    email: 'sophia.laurent@paris.fr',
    phone: '+33 6 12 34 56 78',
    bust: '34B',
    waist: '26 in',
    hips: '37 in',
    height: "5'9\"",
    garmentType: 'Red Carpet Bridal Gown',
    preferredFabric: 'French Chantilly Lace & Silk Organza',
    eventDate: '2026-10-15',
    notes: 'Desires a dramatic cathedral length cape train with pearl hand embroideries.',
    status: 'Consultation Scheduled',
    createdAt: '2026-08-07T16:20:00Z'
  }
];

export const INITIAL_ATELIER_CATEGORIES: AtelierCategoryCard[] = [
  {
    id: 'cat-1',
    title: 'Haute Couture',
    subtitle: 'One-of-a-Kind Atelier Masterpieces',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    category: 'Haute Couture',
  },
  {
    id: 'cat-2',
    title: 'Evening Gowns',
    subtitle: 'Velvet & Silk Red Carpet Sculptures',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
    category: 'Evening Gowns',
  },
  {
    id: 'cat-3',
    title: 'Tailored Suits',
    subtitle: 'Precision Italian Wool & Crest Lapels',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    category: 'Tailored Suits',
  },
  {
    id: 'cat-4',
    title: 'Ready to Wear',
    subtitle: 'Contemporary Luxury Outerwear',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    category: 'Ready to Wear',
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  heroTitle: 'HAUTE COUTURE & TAILORED SPLENDOR',
  heroSubtitle: 'Discover the new Autumn/Winter collection. Crafted by master artisans for the bold and iconic.',
  heroImageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90',
  marqueeText: '✦ FREE WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $1,000 ✦ BOOK A PRIVATE FIT APPOINTMENT IN PARIS & NY ✦ NEW AUTUMN HAUTE COUTURE LINE OUT NOW',
  brandStoryText: 'Annex Couture stands at the crossroads of timeless atelier craftsmanship and futuristic elegance. Every silhouette is individually sculpted to accentuate grace, power, and prestige.',
  announcementActive: true,
  contactEmail: 'concierge@annexcouture.com',
  contactPhone: '+234 810 236 3541',
  address: '11, Avenue Rander Old road, Abeokuta, Ogun State Nigeria',
  atelierCategories: INITIAL_ATELIER_CATEGORIES
};
