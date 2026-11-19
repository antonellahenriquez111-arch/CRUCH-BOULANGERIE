import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sprout,
  Flame,
  Wheat,
  Plus,
  Minus,
  Check,
  ArrowRight,
  Truck,
  BadgePercent,
  Sparkles,
} from 'lucide-react';
import { HERO_IMAGE, PRODUCTS, HOME_REVIEWS, Product } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { ReviewsGrid } from './ReviewsGrid';
import { PageId } from '../App';
import { formatBs } from '../hooks/useBcvRate';

interface HeroSectionProps {
  cartQuantities: Record<string, number>;
  bcvRate: number | null;
  onNavigate: (page: PageId) => void;
  onAddProduct: (product: Product, qty?: number) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onOpenCart: () => void;
}

const HERO_SLIDES: {
  image: string;
  alt: string;
  eyebrow: string;
  prefix: string;
  highlight: string;
  suffix: string;
  primaryLabel: string;
  primaryPage: PageId;
}[] = [
  {
    image: HERO_IMAGE,
    alt: 'Hogazas artesanales de masa madre recién horneadas en el obrador de Crunch Boulangerie',
    eyebrow: 'Obrador Online · Pan de Masa Madre al Mayor y Cultivo Vivo',
    prefix: 'Siente el verdadero ',
    highlight: 'Crunch',
    suffix: ' del pan hecho a mano.',
    primaryLabel: 'Ordenar',
    primaryPage: 'productos',
  },
  {
    image: '/src/assets/images/product_hogaza_semillas_1794950798196.jpg',
    alt: 'Hogazas de centeno y semillas tostadas para suministro mayorista de cafeterías y restaurantes',
    eyebrow: 'Despacho directo a restaurantes y cafés · 15% dto. desde 10 unidades',
    prefix: 'Suministro ',
    highlight: 'artesanal',
    suffix: ' cada madrugada en tu mesa.',
    primaryLabel: 'Ver catálogo al mayor',
    primaryPage: 'productos',
  },
  {
    image: '/src/assets/images/product_cultivo_kit_1794950799263.jpg',
    alt: 'Kit de cultivo madre vivo en frasco de vidrio con guía impresa de preparación',
    eyebrow: 'Cepa viva desde 2019 · Guía paso a paso incluida',
    prefix: 'Hornea con ',
    highlight: 'masa madre',
    suffix: ' viva en tu propia cocina.',
    primaryLabel: 'Ver guía paso a paso',
    primaryPage: 'masa-madre',
  },
];

export function HeroSection({
  cartQuantities,
  bcvRate,
  onNavigate,
  onAddProduct,
  onUpdateQuantity,
  onOpenCart,
}: HeroSectionProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [breadBlockIndex, setBreadBlockIndex] = useState(0);
  const currentSlide = HERO_SLIDES[slideIndex];

  // Showcase all artisan breads in paginated blocks of 3
  const showcaseBreads = PRODUCTS;
  const totalBreadBlocks = Math.ceil(showcaseBreads.length / 3);
  const visibleBreads = showcaseBreads.slice(breadBlockIndex * 3, breadBlockIndex * 3 + 3);

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevBreadBlock = () => {
    setBreadBlockIndex((prev) => (prev - 1 + totalBreadBlocks) % totalBreadBlocks);
  };

  const handleNextBreadBlock = () => {
    setBreadBlockIndex((prev) => (prev + 1) % totalBreadBlocks);
  };

  const trustBadges = [
    {
      icon: Sprout,
      label: '100% Orgánico · 3 ingredientes',
      iconColor: 'text-[#4A5D3F]',
    },
    {
      icon: Flame,
      label: 'Horneado Diario en piedra',
      iconColor: 'text-[#4A151B]',
    },
    {
      icon: Wheat,
      label: '36–48h Fermentación · Sabor único',
      iconColor: 'text-[#C88A4B]',
    },
  ];

  const pillars = [
    {
      icon: Truck,
      title: 'Obrador 100% online y despacho directo',
      description:
        'No tenemos tienda física al público: horneamos exclusivamente bajo encargo y despachamos directo a restaurantes, cafés y hogares.',
    },
    {
      icon: BadgePercent,
      title: '15% descuento mayorista automático',
      description:
        'Al combinar 10 o más unidades en tu carrito se aplica al instante la tarifa de obrador sin trámites previos.',
    },
    {
      icon: Sparkles,
      title: 'Cultivo vivo garantizado con guía',
      description:
        '¿Prefieres hornear en casa? Nuestro fermento activo de 2019 llega listo para tu primera hogaza en 24 horas.',
    },
  ];

  return (
    <section id="inicio" className="bg-[#FAF7F2]">
      {/* Full-width centerpiece hero frame */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between overflow-hidden bg-[#2A1B17]">
        <ResilientImage
          src={currentSlide.image}
          alt={currentSlide.alt}
          fallbackTitle="Crunch Boulangerie"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1E110E]/45 via-[#1E110E]/40 to-[#1E110E]/65 pointer-events-none"
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={handlePrevSlide}
          aria-label="Diapositiva anterior"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#FAF7F2]/60 bg-[#231917]/40 hover:bg-[#4A151B] text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNextSlide}
          aria-label="Siguiente diapositiva"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-[#FAF7F2]/60 bg-[#231917]/40 hover:bg-[#4A151B] text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Centered Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-12 sm:px-16 pt-16 sm:pt-20 pb-8 flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="font-serif text-[clamp(2.35rem,5vw,4.15rem)] leading-[1.08] font-bold text-[#FAF7F2] text-balance drop-shadow-[0_2px_16px_rgba(20,10,8,0.65)] mb-7">
            {currentSlide.prefix}
            <span className="inline-block px-3 py-0.5 mx-1 rounded-xl bg-[#FAF7F2]/92 text-[#4A151B] shadow-sm">
              {currentSlide.highlight}
            </span>
            {currentSlide.suffix}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onNavigate(currentSlide.primaryPage)}
              className="inline-flex items-center justify-center min-w-[190px] px-9 py-3.5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-base font-bold shadow-lg transition-colors duration-150 cursor-pointer whitespace-nowrap"
            >
              {currentSlide.primaryLabel}
            </button>
          </div>
        </div>

        {/* Bottom Floating Rounded Cream Bar */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="bg-[#FAF7F2]/95 backdrop-blur-md border border-[#E5DDD0] rounded-2xl shadow-lg px-5 py-4 sm:px-8 sm:py-4.5 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-center">
            {trustBadges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-center gap-2.5 text-center ${
                    idx < 2 ? 'sm:border-r sm:border-[#E2D6C5] sm:pr-4' : ''
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${item.iconColor}`} strokeWidth={2.1} />
                  <span className="text-sm sm:text-[15px] font-bold text-[#231917]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Brief 3-Bread Paginated Showcase with Left/Right Arrows */}
      <div className="py-14 sm:py-18 border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-9">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#4A151B] text-balance">
                Nuestros panes artesanales
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Block Arrow Controls */}
              <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DDD0] rounded-xl p-1">
                <button
                  type="button"
                  onClick={handlePrevBreadBlock}
                  aria-label="Ver bloque anterior de 3 panes"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-2 text-xs font-bold text-[#5C4E49] tabular-nums">
                  {breadBlockIndex + 1} / {totalBreadBlocks}
                </span>
                <button
                  type="button"
                  onClick={handleNextBreadBlock}
                  aria-label="Ver siguiente bloque de 3 panes"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('productos')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#4A151B] text-[#4A151B] hover:bg-[#4A151B] hover:text-[#FAF7F2] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver catálogo completo ({PRODUCTS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {visibleBreads.map((product) => {
              const qtyInCart = cartQuantities[product.id] || 0;
              return (
                <article
                  key={product.id}
                  className="group bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="aspect-[4/3] w-full bg-[#F2ECE1] overflow-hidden">
                    <ResilientImage
                      src={product.image}
                      alt={product.imageAlt}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#5C4E49] mb-1.5">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.weight}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.fermentation}</span>
                      </div>

                      <h3 className="font-serif text-[22px] font-semibold text-[#231917] mb-2">
                        {product.name}
                      </h3>

                      <p className="text-sm leading-relaxed text-[#5C4E49]">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline">
                          <span className="text-lg font-bold text-[#231917] tabular-nums">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-[#5C4E49] ml-1">/ ud</span>
                        </div>
                        <span className="block text-xs font-semibold text-[#4A5D3F] tabular-nums">
                          {formatBs(product.price, bcvRate)}
                        </span>
                      </div>

                      {qtyInCart === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddProduct(product, 1)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Agregar</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="inline-flex items-center border border-[#4A151B] rounded-lg overflow-hidden h-9 bg-[#FAF7F2]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, -1)}
                              aria-label={`Restar unidad de ${product.name}`}
                              className="w-8 h-full flex items-center justify-center text-[#4A151B] hover:bg-[#EFE8DC] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold tabular-nums">
                              {qtyInCart}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(product.id, 1)}
                              aria-label={`Sumar unidad de ${product.name}`}
                              className="w-8 h-full flex items-center justify-center text-[#4A151B] hover:bg-[#EFE8DC] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={onOpenCart}
                            className="h-9 px-3 rounded-lg bg-[#E9EDE6] text-[#2F3E27] text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Carrito</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works / Online-Only Bakery Guarantees */}
      <div className="py-12 sm:py-14 bg-[#F2ECE1]/65 border-b border-[#E5DDD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E5DDD0] rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F2ECE1] text-[#4A151B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.9} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#231917] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5C4E49]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Verified Customer & Hospitality Reviews on Home */}
      <div className="py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsGrid
            title="Lo que dicen cafés, cocinas y panaderos"
            subtitle="Más de 42 restaurantes, cafés y cientos de hogares reciben nuestro pan directamente desde el obrador."
            reviews={HOME_REVIEWS}
            titleClassName="text-[#4A151B]"
          />
        </div>
      </div>
    </section>
  );
}
