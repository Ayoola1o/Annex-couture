import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/lib/store';
import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';
import CartDrawer from '@/components/storefront/CartDrawer';
import QuickViewModal from '@/components/storefront/QuickViewModal';
import Toast from '@/components/storefront/Toast';
import MobileBottomDock from '@/components/storefront/MobileBottomDock';

export const metadata: Metadata = {
  title: 'Annex Couture | Haute Couture & Luxury Apparel',
  description: 'Exquisite haute couture, tailored evening gowns, bespoke suits, and luxury accessories by Annex Couture. Experience Paris & New York atelier elegance.',
  keywords: ['Annex Couture', 'Haute Couture', 'Luxury Fashion', 'Bespoke Tailoring', 'Evening Gowns'],
  icons: {
    icon: '/favicon.ico',
    apple: '/icon.png',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-noir-950 text-neutral-100 min-h-screen flex flex-col font-sans selection:bg-gold-500 selection:text-noir-950">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <CartDrawer />
          <QuickViewModal />
          <MobileBottomDock />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
