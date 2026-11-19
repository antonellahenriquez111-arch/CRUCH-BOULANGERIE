import { useState, useMemo, useEffect } from 'react';
import { ALL_CATALOG_ITEMS, Product, Recipe } from './data/bakeryData';
import { useBcvRate } from './hooks/useBcvRate';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { CatalogSection } from './components/CatalogSection';
import { StarterGuideSection } from './components/StarterGuideSection';
import { RecipesSection } from './components/RecipesSection';
import { InboundLeadSection } from './components/InboundLeadSection';
import { CartDrawer, CartItem } from './components/CartDrawer';
import {
  CheckoutModal,
  PaymentConfirmedModal,
  ConfirmedOrderReceipt,
} from './components/CheckoutModal';
import { RecipeModal, WhatsAppModal, ClubModal } from './components/Modals';
import { CookieBanner, CookieConsentChoice } from './components/CookieBanner';
import { Check, ShoppingCart } from 'lucide-react';

export type PageId = 'inicio' | 'nosotros' | 'productos' | 'recetario' | 'masa-madre';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('inicio');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<ConfirmedOrderReceipt | null>(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null);
  const [clubMemberName, setClubMemberName] = useState<string | null>(null);
  const [leadUnlocked, setLeadUnlocked] = useState<{
    email: string;
    profile: 'hogar' | 'mayorista';
    code: string;
  } | null>(null);
  const { rate: bcvRate, isLoading: bcvLoading, refreshRate: refreshBcvRate } = useBcvRate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cookieConsent, setCookieConsent] = useState<CookieConsentChoice | 'dismissed' | null>(
    null
  );

  const handleCookieChoice = (choice: CookieConsentChoice) => {
    setCookieConsent(choice);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setConfirmedReceipt(null);
        setIsWhatsAppOpen(false);
        setIsClubOpen(false);
        setActiveRecipe(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartItems: CartItem[] = useMemo(() => {
    return ALL_CATALOG_ITEMS.filter((p) => (cart[p.id] || 0) > 0).map((product) => ({
      product,
      quantity: cart[product.id],
    }));
  }, [cart]);

  const totalUnits = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const handleAddProduct = (product: Product, qty = 1) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + qty,
    }));
    setToastMessage(`Añadido al carrito: ${qty}× ${product.name}`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      const nextQty = (prev[productId] || 0) + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: nextQty };
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#231917]">
      <Header
        activePage={activePage}
        totalUnits={totalUnits}
        clubMemberName={clubMemberName}
        bcvRate={bcvRate}
        bcvLoading={bcvLoading}
        onRefreshBcv={refreshBcvRate}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        onOpenClub={() => setIsClubOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'inicio' && (
          <HeroSection
            cartQuantities={cart}
            bcvRate={bcvRate}
            onNavigate={navigateTo}
            onAddProduct={handleAddProduct}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {activePage === 'nosotros' && (
          <AboutSection
            onNavigate={navigateTo}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          />
        )}

        {activePage === 'productos' && (
          <CatalogSection
            cartQuantities={cart}
            bcvRate={bcvRate}
            onAddProduct={handleAddProduct}
            onUpdateQuantity={handleUpdateQuantity}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          />
        )}

        {activePage === 'masa-madre' && (
          <StarterGuideSection
            bcvRate={bcvRate}
            onAddProduct={handleAddProduct}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          />
        )}

        {activePage === 'recetario' && (
          <RecipesSection onSelectRecipe={(recipe) => setActiveRecipe(recipe)} />
        )}
      </main>

      {/* Inbound Marketing Lead Capture Section */}
      <InboundLeadSection
        leadUnlocked={leadUnlocked}
        onUnlockLead={(payload) => setLeadUnlocked(payload)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Editorial Footer */}
      <footer className="bg-[#231917] text-[#FAF7F2] py-12 border-t border-[#3A2B28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#3A2B28]">
            <div className="md:col-span-5">
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                aria-label="Crunch Boulangerie — Volver al inicio"
                className="inline-flex items-center bg-[#FAF7F2] rounded-xl px-3.5 py-2 mb-3.5 cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88A4B]"
              >
                <span className="relative block w-[132px] aspect-[445/208] overflow-hidden shrink-0">
                  <img
                    src="/assets/aistudio/EMBUDO_NUEVO_71c9a737.svg"
                    alt="Crunch Boulangerie"
                    className="absolute top-0 left-0 w-[324%] max-w-none h-auto -translate-x-[33.7%] -translate-y-[45.06%] mix-blend-multiply pointer-events-none select-none"
                  />
                </span>
              </button>
              <p className="text-sm text-[#CFC3B7] max-w-[42ch] leading-relaxed">
                Obrador artesanal 100% online especializado en pan de masa madre al mayor para restaurantes, cafés y hogares, y cultivo vivo con guía paso a paso. Sin tienda física al público.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 text-sm text-[#CFC3B7]">
              <p className="font-semibold text-white">Producción y Despacho Directo</p>
              <p>Rutas de reparto: Martes a Domingo · 05:30 a 14:30</p>
              <p>Pedidos por encargo online y WhatsApp B2B</p>
              <p>pedidos@crunchboulangerie.es</p>
            </div>

            <div className="md:col-span-3 flex flex-col items-start gap-2 text-sm">
              <p className="font-semibold text-white">Secciones</p>
              <button
                type="button"
                onClick={() => navigateTo('inicio')}
                className="text-[#CFC3B7] hover:text-white transition-colors cursor-pointer"
              >
                Inicio
              </button>
              <button
                type="button"
                onClick={() => navigateTo('nosotros')}
                className="text-[#CFC3B7] hover:text-white transition-colors cursor-pointer"
              >
                Sobre nosotros
              </button>
              <button
                type="button"
                onClick={() => navigateTo('productos')}
                className="text-[#CFC3B7] hover:text-white transition-colors cursor-pointer"
              >
                Productos al Mayor
              </button>
              <button
                type="button"
                onClick={() => navigateTo('masa-madre')}
                className="text-[#CFC3B7] hover:text-white transition-colors cursor-pointer"
              >
                Masa Madre & Guía
              </button>
              <button
                type="button"
                onClick={() => navigateTo('recetario')}
                className="text-[#CFC3B7] hover:text-white transition-colors cursor-pointer"
              >
                Recetario
              </button>
              <button
                type="button"
                onClick={() => setIsWhatsAppOpen(true)}
                className="text-[#C88A4B] hover:text-[#DF9E5E] font-medium transition-colors cursor-pointer pt-1"
              >
                Cotización WhatsApp Mayorista
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A89A8E]">
            <p>© {new Date().getFullYear()} Crunch Boulangerie. Todos los derechos reservados.</p>
            <p>Obrador 100% online · Fermentación 36–48h · Horno refractario</p>
          </div>
        </div>
      </footer>

      {/* Subtle Add-to-Cart Feedback Toast */}
      {toastMessage && !isCartOpen && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 z-50 bg-[#231917] text-[#FAF7F2] border border-[#4A151B] rounded-xl px-4 py-3 shadow-xl flex items-center gap-3 transition-all ${
            cookieConsent === null ? 'bottom-64 sm:bottom-60' : 'bottom-5'
          }`}
        >
          <span className="w-6 h-6 rounded-full bg-[#4A5D3F] text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C88A4B] hover:text-[#E5A96A] pl-2 border-l border-white/15 cursor-pointer whitespace-nowrap"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Ver carrito</span>
          </button>
        </div>
      )}

      {/* Bottom-Right Cookie Policy Popup */}
      <CookieBanner
        isVisible={cookieConsent === null}
        onAcceptAll={() => handleCookieChoice('all')}
        onAcceptEssential={() => handleCookieChoice('essential')}
        onDismiss={() => setCookieConsent('dismissed')}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        bcvRate={bcvRate}
        leadUnlocked={leadUnlocked}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        bcvRate={bcvRate}
        leadUnlocked={leadUnlocked}
        onClose={() => setIsCheckoutOpen(false)}
        onPaymentConfirmed={(receipt) => {
          handleClearCart();
          setIsCheckoutOpen(false);
          setConfirmedReceipt(receipt);
        }}
      />

      <PaymentConfirmedModal
        receipt={confirmedReceipt}
        bcvRate={bcvRate}
        onClose={() => setConfirmedReceipt(null)}
      />

      <RecipeModal
        recipe={activeRecipe}
        bcvRate={bcvRate}
        onClose={() => setActiveRecipe(null)}
        onAddStarterKit={(kit) => {
          handleAddProduct(kit, 1);
          setIsCartOpen(true);
        }}
      />

      <WhatsAppModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
      />

      <ClubModal
        isOpen={isClubOpen}
        memberName={clubMemberName}
        onClose={() => setIsClubOpen(false)}
        onRegister={(name) => setClubMemberName(name)}
        onLogout={() => setClubMemberName(null)}
      />
    </div>
  );
}
