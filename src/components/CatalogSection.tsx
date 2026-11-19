import { useState, useMemo, FormEvent } from 'react';
import {
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  ORDER_FAQS,
  ProductCategory,
  Product,
} from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { formatBs } from '../hooks/useBcvRate';

interface CatalogSectionProps {
  cartQuantities: Record<string, number>;
  bcvRate: number | null;
  onAddProduct: (product: Product, qty?: number) => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onOpenCart: () => void;
  onOpenWhatsApp: () => void;
}

const ITEMS_PER_BLOCK = 6;

export function CatalogSection({
  cartQuantities,
  bcvRate,
  onAddProduct,
  onUpdateQuantity,
  onOpenCart,
  onOpenWhatsApp,
}: CatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [currentBlock, setCurrentBlock] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [customQuestion, setCustomQuestion] = useState('');
  const [questionContact, setQuestionContact] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(null);

  const handleQuestionSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setSubmittedQuestion(customQuestion.trim());
    setCustomQuestion('');
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const totalBlocks = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_BLOCK));
  const safeBlock = Math.min(currentBlock, totalBlocks - 1);
  const visibleProducts = filteredProducts.slice(
    safeBlock * ITEMS_PER_BLOCK,
    safeBlock * ITEMS_PER_BLOCK + ITEMS_PER_BLOCK
  );

  const handleCategoryChange = (category: ProductCategory) => {
    setSelectedCategory(category);
    setCurrentBlock(0);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentBlock(0);
  };

  const wholesaleTiers = [
    {
      range: '1 a 9 unidades',
      discount: 'Tarifa estándar',
      benefit: 'Ideal para disfrutar en casa o hacer pruebas de carta.',
      action: 'Compra directa online',
    },
    {
      range: '10 a 29 unidades',
      discount: '−15% automático en carrito',
      benefit: 'Se aplica al instante al sumar 10 o más piezas combinadas.',
      action: 'Activado automáticamente',
    },
    {
      range: '30+ unidades semanales',
      discount: 'Tarifa Obrador B2B',
      benefit: 'Rebanado a medida, reparto fijo de madrugada y facturación mensual.',
      action: 'Cotizar por WhatsApp',
    },
  ];

  return (
    <section id="catalogo" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Catalog Header + Filters + Product Grid */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A151B] text-balance leading-[1.1]">
                Catálogo de Panes al Mayor
              </h1>
              <p className="mt-2.5 text-base text-[#5C4E49] max-w-[62ch]">
                Combina hogazas clásicas, panes especiales y bollería de masa madre recién horneada. Al alcanzar{' '}
                <span className="font-bold text-[#4A151B]">10 o más unidades</span> en tu carrito se aplica automáticamente un{' '}
                <span className="font-bold text-[#4A5D3F]">15% de descuento mayorista</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
              {totalBlocks > 1 && (
                <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DDD0] rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentBlock((prev) => (prev - 1 + totalBlocks) % totalBlocks)
                    }
                    aria-label="Ver bloque anterior de panes"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-2 text-xs font-bold text-[#5C4E49] tabular-nums">
                    {safeBlock + 1} / {totalBlocks}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentBlock((prev) => (prev + 1) % totalBlocks)}
                    aria-label="Ver siguiente bloque de panes"
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={onOpenCart}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E5DDD0] bg-white hover:border-[#4A151B] text-sm font-semibold text-[#231917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ShoppingCart className="w-4 h-4 text-[#4A151B]" />
                <span>Ver carrito</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs + Search & Sort Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div
              role="tablist"
              aria-label="Filtrar productos por categoría"
              className="flex flex-wrap items-center gap-2"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#4A151B] text-[#FAF7F2]'
                        : 'bg-white border border-[#E5DDD0] text-[#4A3E3B] hover:border-[#C88A4B] hover:text-[#231917]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-4 h-4 text-[#5C4E49] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar ciabatta, levain, brioche..."
                  aria-label="Buscar productos"
                  className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc');
                  setCurrentBlock(0);
                }}
                aria-label="Ordenar catálogo"
                className="h-10 px-3 rounded-xl border border-[#E5DDD0] bg-white text-sm font-medium text-[#231917] cursor-pointer"
              >
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-10 text-center">
              <p className="font-serif text-2xl font-semibold text-[#231917] mb-2">
                No encontramos panes con esa búsqueda
              </p>
              <p className="text-sm text-[#5C4E49] mb-4">
                Prueba con otro término o selecciona la categoría «Todos».
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setCurrentBlock(0);
                }}
                className="px-4 py-2 rounded-xl bg-[#4A151B] text-[#FAF7F2] text-sm font-semibold cursor-pointer"
              >
                Mostrar todo el catálogo
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {visibleProducts.map((product) => {
                  const qtyInCart = cartQuantities[product.id] || 0;
                  const wholesaleUsd = product.price * 0.85;

                  return (
                    <article
                      key={product.id}
                      className="group bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="aspect-[4/3] w-full bg-[#F2ECE1] overflow-hidden relative">
                        <ResilientImage
                          src={product.image}
                          alt={product.imageAlt}
                          fallbackTitle={product.name}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5C4E49] mb-2">
                            <span>{product.category}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.weight}</span>
                            <span aria-hidden="true">·</span>
                            <span>{product.fermentation}</span>
                          </div>

                          <h2 className="font-serif text-[22px] leading-snug font-semibold text-[#231917] mb-2">
                            {product.name}
                          </h2>

                          <p className="text-sm leading-relaxed text-[#5C4E49] mb-3">
                            {product.description}
                          </p>

                          <p className="text-xs font-semibold text-[#4A5D3F]">
                            {product.wholesaleNote}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#EFE8DC] flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-baseline">
                                <span className="text-lg font-bold text-[#231917] tabular-nums">
                                  ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xs text-[#5C4E49] ml-1.5">/ ud</span>
                              </div>
                              <span className="block text-xs font-semibold text-[#4A151B] tabular-nums">
                                {formatBs(product.price, bcvRate)}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="block text-xs font-semibold text-[#4A5D3F] tabular-nums">
                                Mayor (10+): ${wholesaleUsd.toFixed(2)}
                              </span>
                              <span className="block text-[11px] font-medium text-[#5C4E49] tabular-nums">
                                {formatBs(wholesaleUsd, bcvRate)}
                              </span>
                            </div>
                          </div>

                          {qtyInCart === 0 ? (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => onAddProduct(product, 1)}
                                className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                <Plus className="w-4 h-4 shrink-0" />
                                <span>Agregar</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => onAddProduct(product, 5)}
                                title="Añadir lote de 5 unidades para mayoristas"
                                className="h-10 px-3 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] hover:border-[#4A5D3F] hover:text-[#4A5D3F] text-xs font-bold text-[#231917] transition-colors cursor-pointer whitespace-nowrap shrink-0 tabular-nums"
                              >
                                +5 uds
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <div className="inline-flex items-center border border-[#4A151B] rounded-xl overflow-hidden h-10 bg-[#FAF7F2]">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(product.id, -1)}
                                  aria-label={`Restar una unidad de ${product.name}`}
                                  className="w-10 h-full flex items-center justify-center text-[#4A151B] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="px-3 text-sm font-bold text-[#231917] tabular-nums min-w-[2.5rem] text-center">
                                  {qtyInCart}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQuantity(product.id, 1)}
                                  aria-label={`Sumar una unidad de ${product.name}`}
                                  className="w-10 h-full flex items-center justify-center text-[#4A151B] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={onOpenCart}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl bg-[#E9EDE6] text-[#2F3E27] hover:bg-[#DDE4D8] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                              >
                                <Check className="w-3.5 h-3.5 shrink-0" />
                                <span>En carrito</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Block Pagination Controls matching Inicio */}
              {totalBlocks > 1 && (
                <div className="mt-9 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5DDD0]">
                  <p className="text-sm font-medium text-[#5C4E49] tabular-nums">
                    Bloque {safeBlock + 1} de {totalBlocks} · {filteredProducts.length} panes disponibles
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DDD0] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentBlock((prev) => (prev - 1 + totalBlocks) % totalBlocks)
                      }
                      aria-label="Ver bloque anterior de panes"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#5C4E49] tabular-nums">
                      {safeBlock + 1} / {totalBlocks}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentBlock((prev) => (prev + 1) % totalBlocks)}
                      aria-label="Ver siguiente bloque de panes"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Wholesale Volume Pricing Tiers */}
        <div className="bg-[#F2ECE1] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold text-[#4A5D3F] mb-1">
                Tarifas transparentes
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A151B]">
                Descuentos por volumen para tu local o evento
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenWhatsApp}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-[#4A5D3F] hover:bg-[#3A4A31] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              Solicitar muestras B2B
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {wholesaleTiers.map((tier) => (
              <div
                key={tier.range}
                className="bg-white border border-[#E5DDD0] rounded-xl p-5 flex flex-col justify-between gap-3"
              >
                <div>
                  <p className="text-xs font-semibold text-[#5C4E49] mb-1">{tier.range}</p>
                  <h3 className="font-serif text-xl font-bold text-[#4A151B] mb-2">
                    {tier.discount}
                  </h3>
                  <p className="text-sm text-[#5C4E49] leading-relaxed">{tier.benefit}</p>
                </div>
                <p className="text-xs font-bold text-[#4A5D3F] pt-3 border-t border-[#EFE8DC]">
                  {tier.action}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ordering & Delivery FAQs + Open Question Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[#4A5D3F] mb-1.5">
              Dudas frecuentes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A151B] mb-6">
              Envíos, conservación y pedidos al mayor
            </h2>
            <div className="space-y-3">
              {ORDER_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className="bg-white border border-[#E5DDD0] rounded-xl overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#231917] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#4A151B] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm leading-relaxed text-[#5C4E49] border-t border-[#EFE8DC] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-7">
            <p className="text-xs font-bold text-[#4A5D3F] mb-1.5">
              ¿No ves tu respuesta?
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#4A151B] mb-2">
              Escríbenos cualquier pregunta
            </h3>
            <p className="text-sm text-[#5C4E49] mb-5">
              Consúltanos sobre ingredientes, entregas en tu zona, alérgenos o pedidos especiales y te responderemos directamente.
            </p>

            {submittedQuestion ? (
              <div className="bg-[#FAF7F2] border border-[#4A5D3F]/35 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-[#4A5D3F]">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-bold">¡Pregunta recibida!</span>
                </div>
                <p className="text-xs sm:text-sm text-[#231917] italic bg-white border border-[#E5DDD0] rounded-lg px-3.5 py-2.5">
                  “{submittedQuestion}”
                </p>
                <p className="text-xs text-[#5C4E49]">
                  {questionContact.trim()
                    ? `Te responderemos muy pronto a ${questionContact.trim()}.`
                    : 'Nuestro equipo de obrador responderá tu consulta a la brevedad.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedQuestion(null)}
                  className="w-full py-2.5 rounded-xl border border-[#E5DDD0] bg-white hover:border-[#4A151B] text-xs font-bold text-[#4A151B] transition-colors cursor-pointer"
                >
                  Hacer otra pregunta
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="faq-custom-question" className="block text-xs font-semibold text-[#231917] mb-1">
                    Tu pregunta
                  </label>
                  <textarea
                    id="faq-custom-question"
                    rows={3}
                    required
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ej. ¿Entregan los domingos por la mañana? ¿Tienen opciones 100% integrales?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917] focus:outline-none focus:border-[#4A151B]"
                  />
                </div>

                <div>
                  <label htmlFor="faq-contact" className="block text-xs font-semibold text-[#231917] mb-1">
                    Correo o WhatsApp para responderte (opcional)
                  </label>
                  <input
                    id="faq-contact"
                    type="text"
                    value={questionContact}
                    onChange={(e) => setQuestionContact(e.target.value)}
                    placeholder="tucorreo@ejemplo.com o +58 412..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917] focus:outline-none focus:border-[#4A151B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar pregunta</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
