import { useState } from 'react';
import { MessageCircle, User, ShoppingCart, Menu, X, RefreshCw } from 'lucide-react';
import { PageId } from '../App';
import { formatBcvRate } from '../hooks/useBcvRate';

interface HeaderProps {
  activePage: PageId;
  totalUnits: number;
  clubMemberName: string | null;
  bcvRate: number | null;
  bcvLoading: boolean;
  onRefreshBcv: () => void;
  onNavigate: (page: PageId) => void;
  onOpenCart: () => void;
  onOpenWhatsApp: () => void;
  onOpenClub: () => void;
}

export function Header({
  activePage,
  totalUnits,
  clubMemberName,
  bcvRate,
  bcvLoading,
  onRefreshBcv,
  onNavigate,
  onOpenCart,
  onOpenWhatsApp,
  onOpenClub,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'nosotros', label: 'Sobre nosotros' },
    { id: 'productos', label: 'Productos' },
    { id: 'recetario', label: 'Recetario' },
    { id: 'masa-madre', label: 'Masa madre' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-3 lg:gap-6">
        {/* Zone 1: Uploaded Crunch Boulangerie SVG logo + tiny live BCV rate pill */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('inicio')}
            aria-label="Crunch Boulangerie — Ir a Inicio"
            className="flex items-center whitespace-nowrap shrink-0 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-sm"
          >
            <span className="relative block w-[112px] sm:w-[134px] aspect-[445/208] overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-[1.02]">
              <img
                src="/assets/aistudio/EMBUDO_NUEVO_71c9a737.svg"
                alt="Crunch Boulangerie"
                className="absolute top-0 left-0 w-[324%] max-w-none h-auto -translate-x-[33.7%] -translate-y-[45.06%] mix-blend-multiply pointer-events-none select-none"
              />
            </span>
          </button>

          <button
            type="button"
            onClick={onRefreshBcv}
            title="Tasa oficial Banco Central de Venezuela (BCV) · Clic para actualizar"
            aria-label={`Tasa oficial BCV: Bs. ${formatBcvRate(bcvRate)} por dólar. Actualizar`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-[#E5DDD0] hover:border-[#C88A4B] text-[11px] font-bold text-[#231917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="text-[#4A151B]">BCV</span>
            <span className="text-[#CFC3B7]" aria-hidden="true">·</span>
            <span className="tabular-nums text-[#4A5D3F]">
              Bs. {formatBcvRate(bcvRate)}
            </span>
            <RefreshCw
              className={`w-3 h-3 text-[#5C4E49] ${bcvLoading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>

        {/* Zone 2: Clean single-line page navigation */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex items-center gap-8 text-[15px] font-semibold"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#C88A4B]'
                    : 'text-[#3C2F2C] hover:text-[#4A151B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 bottom-0 h-[2px] rounded-full bg-[#C88A4B] transition-all duration-200 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Functional icons (WhatsApp, Usuario, Cesta) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenWhatsApp}
            aria-label="Chat rápido WhatsApp para mayoristas"
            title="WhatsApp Mayoristas"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[#4A151B] hover:bg-[#EFE7DA] transition-colors duration-150 cursor-pointer shrink-0"
          >
            <MessageCircle className="w-[22px] h-[22px]" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={onOpenClub}
            aria-label={clubMemberName ? `Perfil Club Crunch: ${clubMemberName}` : 'Registro al Club Crunch'}
            title={clubMemberName ? `Miembro: ${clubMemberName}` : 'Club Crunch'}
            className={`inline-flex items-center justify-center h-10 rounded-full transition-colors duration-150 cursor-pointer shrink-0 ${
              clubMemberName
                ? 'px-3 gap-1.5 bg-[#E9EDE6] text-[#2F3E27]'
                : 'w-10 text-[#4A151B] hover:bg-[#EFE7DA]'
            }`}
          >
            <User className="w-[22px] h-[22px] shrink-0" strokeWidth={2} />
            {clubMemberName && (
              <span className="hidden sm:inline text-xs font-bold whitespace-nowrap max-w-[96px] truncate">
                {clubMemberName.split(' ')[0]}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Abrir carrito de compra, ${totalUnits} unidades`}
            title="Carrito de compra"
            className="relative inline-flex items-center justify-center w-10 h-10 rounded-full text-[#4A151B] hover:bg-[#EFE7DA] transition-colors duration-150 cursor-pointer shrink-0"
          >
            <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={2} />
            <span
              className={`absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[19px] h-[19px] px-1 rounded-full text-[11px] font-bold tabular-nums transition-transform ${
                totalUnits > 0
                  ? 'bg-[#4A151B] text-[#FAF7F2] scale-100'
                  : 'bg-[#E5DDD0] text-[#5C4E49] scale-90'
              }`}
              data-testid="cart-count"
            >
              {totalUnits}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full text-[#4A151B] hover:bg-[#EFE7DA] cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Navegación móvil"
          className="lg:hidden border-t border-[#E5DDD0] bg-[#FAF7F2] px-4 py-3 flex flex-col gap-1"
        >
          <button
            type="button"
            onClick={() => handleNavClick('inicio')}
            className={`text-left py-2.5 px-3 rounded-xl text-[15px] font-semibold transition-colors cursor-pointer ${
              activePage === 'inicio'
                ? 'bg-[#EFE7DA] text-[#4A151B]'
                : 'text-[#231917] hover:bg-[#F2ECE1]'
            }`}
          >
            Inicio
          </button>
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3 rounded-xl text-[15px] font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#EFE7DA] text-[#4A151B]'
                    : 'text-[#231917] hover:bg-[#F2ECE1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
