import { X, Plus, Minus, Trash2, ShoppingCart, Tag, Gift, Truck, ArrowRight } from 'lucide-react';
import { Product } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { formatBs } from '../hooks/useBcvRate';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  bcvRate: number | null;
  leadUnlocked: {
    email: string;
    profile: 'hogar' | 'mayorista';
    code: string;
  } | null;
  onClose: () => void;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  items,
  bcvRate,
  leadUnlocked,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const FREE_DELIVERY_THRESHOLD = 35;
  const STANDARD_DELIVERY_FEE = 3.5;
  const qualifiesForWholesale = totalUnits >= 10;
  const hasWelcomeDiscount = !qualifiesForWholesale && leadUnlocked?.profile === 'hogar';
  const discountRate = qualifiesForWholesale ? 0.15 : hasWelcomeDiscount ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const qualifiesForFreeDelivery = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - discountedSubtotal);
  const deliveryFee = items.length > 0 && !qualifiesForFreeDelivery ? STANDARD_DELIVERY_FEE : 0;
  const finalTotal = discountedSubtotal + deliveryFee;
  const unitsRemaining = Math.max(0, 10 - totalUnits);
  const progressPercent = Math.min(100, (totalUnits / 10) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compra"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A0D0E]/55 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <aside className="relative z-10 w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl border-l border-[#E5DDD0] flex flex-col">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E5DDD0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#4A151B]" />
            <h2 className="font-serif text-2xl font-semibold text-[#231917]">
              Tu Carrito
            </h2>
            <span className="text-xs font-semibold text-[#5C4E49] tabular-nums">
              ({totalUnits} {totalUnits === 1 ? 'ud.' : 'uds.'})
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] hover:bg-[#EFE8DC] flex items-center justify-center text-[#231917] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wholesale 10+ Units Progress Bar */}
        <div
          className={`px-6 py-3.5 border-b border-[#E5DDD0] ${
            qualifiesForWholesale ? 'bg-[#E9EDE6]' : 'bg-[#F2ECE1]'
          }`}
        >
          <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-2">
            <span className="inline-flex items-center gap-1.5 text-[#231917]">
              <Tag className="w-3.5 h-3.5 text-[#4A5D3F]" />
              {qualifiesForWholesale
                ? 'Descuento Mayorista del 15% aplicado'
                : `Faltan ${unitsRemaining} ${unitsRemaining === 1 ? 'unidad' : 'unidades'} para 15% dto. mayorista`}
            </span>
            <span className="tabular-nums text-[#4A151B]">{totalUnits}/10 uds</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-[#E5DDD0]">
            <div
              className={`h-full transition-all duration-200 ${
                qualifiesForWholesale ? 'bg-[#4A5D3F]' : 'bg-[#C88A4B]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {leadUnlocked && (
            <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-bold text-[#4A5D3F]">
              <Gift className="w-3.5 h-3.5 shrink-0" />
              <span>
                {qualifiesForWholesale
                  ? 'Cupón CRUNCH10 sustituido por el 15% mayorista (mayor beneficio)'
                  : 'Beneficio CRUNCH10 (−10%) activo en este carrito'}
              </span>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <ShoppingCart className="w-10 h-10 text-[#C88A4B] mx-auto mb-3 opacity-80" strokeWidth={1.5} />
              <h3 className="font-serif text-2xl font-semibold text-[#231917] mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-[#5C4E49] max-w-[30ch] mx-auto mb-6">
                Añade hogazas de masa madre o nuestro kit de cultivo vivo. Suma 10 o más unidades para obtener 15% de descuento automático.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-[#4A151B] text-[#FAF7F2] text-sm font-semibold cursor-pointer"
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#E5DDD0] rounded-xl p-3.5 flex gap-3.5"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#F2ECE1] shrink-0">
                    <ResilientImage
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-serif text-lg font-semibold text-[#231917] leading-tight truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#5C4E49] mt-0.5 tabular-nums">
                          {product.weight} · ${product.price.toFixed(2)} ({formatBs(product.price, bcvRate)})
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        aria-label={`Eliminar ${product.name}`}
                        className="text-[#5C4E49] hover:text-[#4A151B] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="inline-flex items-center border border-[#E5DDD0] rounded-lg bg-[#FAF7F2]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          aria-label={`Restar unidad de ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#231917] hover:bg-[#EFE8DC] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-[#231917]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          aria-label={`Sumar unidad de ${product.name}`}
                          className="w-7 h-7 flex items-center justify-center text-[#231917] hover:bg-[#EFE8DC] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="block text-sm font-bold text-[#231917] tabular-nums">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                        <span className="block text-[11px] font-semibold text-[#4A5D3F] tabular-nums">
                          {formatBs(product.price * quantity, bcvRate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Order Totals Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 bg-white border-t border-[#E5DDD0] space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#5C4E49]">
                <span>Subtotal ({totalUnits} uds.)</span>
                <span className="tabular-nums font-medium text-[#231917]">
                  ${subtotal.toFixed(2)} · {formatBs(subtotal, bcvRate)}
                </span>
              </div>

              {qualifiesForWholesale && (
                <div className="flex justify-between text-[#4A5D3F] font-semibold">
                  <span>Descuento Mayorista (15%)</span>
                  <span className="tabular-nums">
                    −${discountAmount.toFixed(2)} · {formatBs(discountAmount, bcvRate)}
                  </span>
                </div>
              )}

              {hasWelcomeDiscount && (
                <div className="flex justify-between text-[#4A5D3F] font-semibold">
                  <span>Bienvenida CRUNCH10 (10%)</span>
                  <span className="tabular-nums">
                    −${discountAmount.toFixed(2)} · {formatBs(discountAmount, bcvRate)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 text-[#5C4E49]">
                  <Truck className="w-3.5 h-3.5 text-[#4A5D3F]" />
                  <span>Delivery (gratis desde $35)</span>
                </span>
                <span
                  className={`font-semibold tabular-nums ${
                    qualifiesForFreeDelivery ? 'text-[#4A5D3F]' : 'text-[#5C4E49]'
                  }`}
                >
                  {qualifiesForFreeDelivery
                    ? '¡GRATIS!'
                    : `$${deliveryFee.toFixed(2)} (faltan $${amountForFreeDelivery.toFixed(2)})`}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-2 border-t border-[#EFE8DC]">
                <span className="font-semibold text-[#231917]">Total estimado</span>
                <div className="text-right">
                  <span className="block font-serif text-2xl font-bold text-[#4A151B] tabular-nums leading-tight">
                    ${finalTotal.toFixed(2)}
                  </span>
                  <span className="block text-xs font-bold text-[#4A5D3F] tabular-nums">
                    {formatBs(finalTotal, bcvRate)} (Tasa BCV)
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Ir a pagar ({totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
