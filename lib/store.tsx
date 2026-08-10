'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, BespokeRequest, StoreSettings, ProductCategory } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_BESPOKE_REQUESTS, INITIAL_SETTINGS } from './data';

interface AppContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Bespoke Requests
  bespokeRequests: BespokeRequest[];
  createBespokeRequest: (req: Omit<BespokeRequest, 'id' | 'createdAt' | 'status'>) => BespokeRequest;
  updateBespokeStatus: (id: string, status: BespokeRequest['status']) => void;

  // Storefront Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;

  // Toast / Notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Quick View Product Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load initial states with localStorage hydration fallback
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [bespokeRequests, setBespokeRequests] = useState<BespokeRequest[]>(INITIAL_BESPOKE_REQUESTS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state from localStorage after mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('annex_products');
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCart = localStorage.getItem('annex_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('annex_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedBespoke = localStorage.getItem('annex_bespoke');
      if (savedBespoke) setBespokeRequests(JSON.parse(savedBespoke));

      const savedSettings = localStorage.getItem('annex_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

      const savedAdminAuth = localStorage.getItem('annex_admin_auth');
      if (savedAdminAuth === 'true') setIsAdminLoggedIn(true);
    } catch (e) {
      console.error('Failed to load local state', e);
    }
  }, []);

  // Save changes to localStorage helper
  const saveLocal = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProd,
      id: `annex-${Date.now().toString().slice(-4)}`
    };
    const updated = [created, ...products];
    setProducts(updated);
    saveLocal('annex_products', updated);
    showToast(`Product "${created.name}" added to catalog.`);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    saveLocal('annex_products', updated);
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveLocal('annex_products', updated);
    showToast('Product removed from catalog.');
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === cartItemId);
      let updatedCart: CartItem[];
      if (existing) {
        updatedCart = prevCart.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        updatedCart = [...prevCart, { id: cartItemId, product, selectedSize: size, selectedColor: color, quantity }];
      }
      saveLocal('annex_cart', updatedCart);
      return updatedCart;
    });
    setIsCartOpen(true);
    showToast(`Added ${product.name} (${size}) to Bag.`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== cartItemId);
      saveLocal('annex_cart', updated);
      return updated;
    });
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item));
      saveLocal('annex_cart', updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveLocal('annex_cart', []);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString()
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveLocal('annex_orders', updated);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveLocal('annex_orders', updated);
    showToast(`Order #${orderId} status changed to ${status}`);
  };

  // Bespoke
  const createBespokeRequest = (req: Omit<BespokeRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: BespokeRequest = {
      ...req,
      id: `BESP-${Math.floor(100 + Math.random() * 900)}`,
      status: 'Inquiry',
      createdAt: new Date().toISOString()
    };
    const updated = [newReq, ...bespokeRequests];
    setBespokeRequests(updated);
    saveLocal('annex_bespoke', updated);
    showToast('Bespoke Atelier Request submitted!');
    return newReq;
  };

  const updateBespokeStatus = (id: string, status: BespokeRequest['status']) => {
    const updated = bespokeRequests.map((b) => (b.id === id ? { ...b, status } : b));
    setBespokeRequests(updated);
    saveLocal('annex_bespoke', updated);
    showToast(`Bespoke Request #${id} updated to ${status}`);
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveLocal('annex_settings', updated);
    showToast('Storefront banner & settings updated live.');
  };

  // Admin Auth (default password: "annexadmin" or any simple credential)
  const adminLogin = (password: string) => {
    if (password === 'admin' || password === 'annexadmin' || password.length > 0) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('annex_admin_auth', 'true');
      showToast('Admin session authenticated.');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('annex_admin_auth');
    showToast('Logged out of Admin portal.');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        bespokeRequests,
        createBespokeRequest,
        updateBespokeStatus,
        settings,
        updateSettings,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        toastMessage,
        showToast,
        quickViewProduct,
        setQuickViewProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
