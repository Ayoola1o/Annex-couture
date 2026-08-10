export type ProductCategory = 'Haute Couture' | 'Ready to Wear' | 'Evening Gowns' | 'Tailored Suits' | 'Luxury Accessories';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  sizes: string[];
  colors: string[];
  image: string;
  gallery?: string[];
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  fabricDetails?: string;
  careInstructions?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  shippingAddress: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  orderType: 'Standard' | 'Bespoke';
}

export interface BespokeRequest {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  bust?: string;
  waist?: string;
  hips?: string;
  height?: string;
  garmentType: string;
  preferredFabric?: string;
  eventDate?: string;
  notes?: string;
  status: 'Inquiry' | 'Consultation Scheduled' | 'In Production' | 'Completed';
  createdAt: string;
}

export interface AtelierCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: ProductCategory;
}

export interface StoreSettings {
  companyName: string;
  companyTagline: string;
  brandLogoUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  marqueeText: string;
  brandStoryText: string;
  founderName: string;
  founderTitle: string;
  founderBio: string;
  founderPhotoUrl: string;
  announcementActive: boolean;
  contactEmail: string;
  contactPhone: string;
  address: string;
  atelierCategories: AtelierCategoryCard[];
}
