import { useState, FormEvent } from 'react';
import {
  X,
  Lock,
  CreditCard,
  Smartphone,
  DollarSign,
  Coins,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Loader2,
  Receipt,
  CalendarClock,
  MapPin,
} from 'lucide-react';
import { CartItem } from './CartDrawer';
import { ResilientImage } from './ResilientImage';
import { formatBs } from '../hooks/useBcvRate';

export type PaymentMethodId = 'pago-movil' | 'tarjeta' | 'zelle' | 'binance';

export interface ConfirmedOrderReceipt {
  orderCode: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  orderType: 'hogar' | 'mayorista';
  address: string;
  city: string;
  deliveryWindow: string;
  notes: string;
  paymentMethod: PaymentMethodId;
  paymentSummary: string;
  items: CartItem[];
  totalUnits: number;
  subtotal: number;
  discountLabel: string | null;
  discountAmount: number;
  deliveryFee: number;
  grandTotal: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  bcvRate: number | null;
  leadUnlocked: {
    email: string;
    profile: 'hogar' | 'mayorista';
    code: string;
  } | null;
  onClose: () => void;
  onPaymentConfirmed: (receipt: ConfirmedOrderReceipt) => void;
}

const FREE_DELIVERY_THRESHOLD = 35;
const STANDARD_DELIVERY_FEE = 3.5;

const VENEZUELAN_BANKS = [
  'Banesco (0134)',
  'Banco de Venezuela (0102)',
  'Mercantil (0105)',
  'Provincial (0108)',
  'BNC (0191)',
  'Bancamiga (0172)',
  'Banplus (0174)',
  'Bancaribe (0114)',
];

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export function CheckoutModal({
  isOpen,
  items,
  bcvRate,
  leadUnlocked,
  onClose,
  onPaymentConfirmed,
}: CheckoutModalProps) {
  const [orderType, setOrderType] = useState<'hogar' | 'mayorista'>('hogar');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(leadUnlocked?.email || '');
  const [city, setCity] = useState('Caracas');
  const [address, setAddress] = useState('');
  const [deliveryWindow, setDeliveryWindow] = useState('Mañana (07:30 – 11:00)');
  const [notes, setNotes] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('pago-movil');

  // Pago Móvil state
  const [pmBank, setPmBank] = useState(VENEZUELAN_BANKS[0]);
  const [pmPhone, setPmPhone] = useState('');
  const [pmReference, setPmReference] = useState('');

  // Card state
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Zelle state
  const [zelleSender, setZelleSender] = useState('');
  const [zelleReference, setZelleReference] = useState('');

  // Binance state
  const [binanceOrderId, setBinanceOrderId] = useState('');

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const qualifiesForWholesale = totalUnits >= 10;
  const hasWelcomeDiscount = !qualifiesForWholesale && leadUnlocked?.profile === 'hogar';
  const discountRate = qualifiesForWholesale ? 0.15 : hasWelcomeDiscount ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discountAmount;
  const qualifiesForFreeDelivery = discountedSubtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = items.length > 0 && !qualifiesForFreeDelivery ? STANDARD_DELIVERY_FEE : 0;
  const grandTotal = discountedSubtotal + deliveryFee;
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - discountedSubtotal);

  const discountLabel = qualifiesForWholesale
    ? 'Descuento Mayorista (15%)'
    : hasWelcomeDiscount
    ? 'Cupón Bienvenida CRUNCH10 (10%)'
    : null;

  const handleCopy = (label: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (items.length === 0) {
      setErrorMsg('Tu carrito está vacío.');
      return;
    }

    if (!customerName.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      setErrorMsg('Por favor completa todos los datos de contacto y entrega.');
      return;
    }

    let paymentSummary = '';

    if (paymentMethod === 'pago-movil') {
      if (!pmPhone.trim() || pmReference.trim().length < 4) {
        setErrorMsg('Ingresa tu teléfono de Pago Móvil y los últimos dígitos de la referencia.');
        return;
      }
      paymentSummary = `Pago Móvil · ${pmBank.split(' ')[0]} · Ref. #${pmReference.trim()}`;
    } else if (paymentMethod === 'tarjeta') {
      const rawDigits = cardNumber.replace(/\D/g, '');
      if (!cardHolder.trim() || rawDigits.length < 15 || cardExpiry.length < 5 || cardCvv.length < 3) {
        setErrorMsg('Verifica los datos completos de tu tarjeta (número, vencimiento y CVV).');
        return;
      }
      paymentSummary = `Tarjeta terminada en ${rawDigits.slice(-4)}`;
    } else if (paymentMethod === 'zelle') {
      if (!zelleSender.trim() || !zelleReference.trim()) {
        setErrorMsg('Ingresa el titular de la cuenta Zelle y el código de confirmación.');
        return;
      }
      paymentSummary = `Zelle (${zelleSender.trim()}) · Ref. ${zelleReference.trim()}`;
    } else if (paymentMethod === 'binance') {
      if (!binanceOrderId.trim()) {
        setErrorMsg('Ingresa el ID de orden o Pay ID de tu transferencia en Binance.');
        return;
      }
      paymentSummary = `Binance Pay (USDT) · ID ${binanceOrderId.trim()}`;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const code = `CB-${Math.floor(1040 + Math.random() * 8900)}`;
      const now = new Date();
      const createdAt = now.toLocaleString('es-VE', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const receipt: ConfirmedOrderReceipt = {
        orderCode: code,
        createdAt,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        orderType,
        address: address.trim(),
        city,
        deliveryWindow,
        notes: notes.trim(),
        paymentMethod,
        paymentSummary,
        items: items.map((item) => ({ ...item })),
        totalUnits,
        subtotal,
        discountLabel,
        discountAmount,
        deliveryFee,
        grandTotal,
      };

      setIsProcessing(false);
      onPaymentConfirmed(receipt);
    }, 850);
  };

  const paymentOptions: {
    id: PaymentMethodId;
    label: string;
    subtitle: string;
    icon: typeof Smartphone;
  }[] = [
    {
      id: 'pago-movil',
      label: 'Pago Móvil',
      subtitle: 'Bolívares a tasa BCV',
      icon: Smartphone,
    },
    {
      id: 'tarjeta',
      label: 'Tarjeta',
      subtitle: 'Visa · Mastercard',
      icon: CreditCard,
    },
    {
      id: 'zelle',
      label: 'Zelle',
      subtitle: 'Transferencia USD',
      icon: DollarSign,
    },
    {
      id: 'binance',
      label: 'Binance Pay',
      subtitle: 'USDT sin comisión',
      icon: Coins,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Pasarela de pago Crunch Boulangerie"
    >
      <div
        className="fixed inset-0 bg-[#1A0D0E]/65 backdrop-blur-[2px]"
        onClick={!isProcessing ? onClose : undefined}
      />

      <div className="relative z-10 w-full max-w-5xl bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Security Bar */}
        <div className="px-5 sm:px-7 py-4 bg-white border-b border-[#E5DDD0] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4A151B] text-[#FAF7F2] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#4A151B] leading-tight">
                Pasarela de Pago Segura
              </h2>
              <p className="text-xs text-[#5C4E49]">
                Crunch Boulangerie · Obrador Online · Despacho Directo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Cerrar pasarela de pago"
            className="w-9 h-9 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] hover:bg-[#EFE8DC] flex items-center justify-center text-[#231917] cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body: 2 Columns */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Customer Info + Payment Method */}
          <div className="lg:col-span-7 p-5 sm:p-7 space-y-6 border-b lg:border-b-0 lg:border-r border-[#E5DDD0]">
            {/* Step 1: Customer & Delivery */}
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold text-[#4A151B]">
                  1. Datos de entrega
                </h3>
                <div className="inline-flex rounded-lg border border-[#E5DDD0] p-0.5 bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setOrderType('hogar')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      orderType === 'hogar'
                        ? 'bg-[#4A151B] text-[#FAF7F2]'
                        : 'text-[#5C4E49] hover:text-[#231917]'
                    }`}
                  >
                    Hogar
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('mayorista')}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      orderType === 'mayorista'
                        ? 'bg-[#4A151B] text-[#FAF7F2]'
                        : 'text-[#5C4E49] hover:text-[#231917]'
                    }`}
                  >
                    Negocio / Café
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="gw-name" className="block text-xs font-semibold text-[#231917] mb-1">
                    {orderType === 'mayorista' ? 'Nombre del local y contacto *' : 'Nombre completo *'}
                  </label>
                  <input
                    id="gw-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={orderType === 'mayorista' ? 'Café Bruma · Lucía Méndez' : 'Sofía Navarro'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917]"
                  />
                </div>

                <div>
                  <label htmlFor="gw-phone" className="block text-xs font-semibold text-[#231917] mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="gw-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+58 412 555 0199"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917]"
                  />
                </div>

                <div>
                  <label htmlFor="gw-email" className="block text-xs font-semibold text-[#231917] mb-1">
                    Correo para comprobante *
                  </label>
                  <input
                    id="gw-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917]"
                  />
                </div>

                <div>
                  <label htmlFor="gw-window" className="block text-xs font-semibold text-[#231917] mb-1">
                    Horario de despacho
                  </label>
                  <select
                    id="gw-window"
                    value={deliveryWindow}
                    onChange={(e) => setDeliveryWindow(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917] cursor-pointer"
                  >
                    <option>Mañana (07:30 – 11:00)</option>
                    <option>Mediodía (11:00 – 14:30)</option>
                    <option>Madrugada B2B (05:30 – 08:00)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label htmlFor="gw-city" className="block text-xs font-semibold text-[#231917] mb-1">
                    Ciudad / Zona
                  </label>
                  <select
                    id="gw-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917] cursor-pointer"
                  >
                    <option>Caracas</option>
                    <option>Valencia</option>
                    <option>Maracay</option>
                    <option>Barquisimeto</option>
                    <option>Lechería</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="gw-address" className="block text-xs font-semibold text-[#231917] mb-1">
                    Dirección exacta de entrega *
                  </label>
                  <input
                    id="gw-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Urbanización, avenida, edificio o punto de referencia"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gw-notes" className="block text-xs font-semibold text-[#231917] mb-1">
                  Notas del pedido (opcional)
                </label>
                <input
                  id="gw-notes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Rebanar las hogazas de campaña, llamar al llegar a garita"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917]"
                />
              </div>
            </div>

            {/* Step 2: Payment Methods */}
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-5 space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#4A151B]">
                2. Forma de pago
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {paymentOptions.map((option) => {
                  const Icon = option.icon;
                  const active = paymentMethod === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setPaymentMethod(option.id);
                        setErrorMsg(null);
                      }}
                      className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#4A151B] border-[#4A151B] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] border-[#E5DDD0] text-[#231917] hover:border-[#C88A4B]'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 mb-1.5 ${
                          active ? 'text-[#C88A4B]' : 'text-[#4A151B]'
                        }`}
                      />
                      <span className="block text-xs font-bold leading-tight">
                        {option.label}
                      </span>
                      <span
                        className={`block text-[10px] mt-0.5 ${
                          active ? 'text-[#E9D8C4]' : 'text-[#5C4E49]'
                        }`}
                      >
                        {option.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Method Specific Panel */}
              {paymentMethod === 'pago-movil' && (
                <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DDD0]">
                    <div>
                      <p className="text-xs font-bold text-[#4A151B]">
                        Datos Pago Móvil Crunch Boulangerie
                      </p>
                      <p className="text-xs text-[#5C4E49] mt-0.5">
                        Banesco (0134) · 0412-555-0194 · RIF J-50184920-3
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('pm', '0134 04125550194 J501849203')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E5DDD0] text-[11px] font-bold text-[#231917] hover:border-[#4A151B] cursor-pointer"
                    >
                      {copiedField === 'pm' ? (
                        <>
                          <Check className="w-3 h-3 text-[#4A5D3F]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#4A151B]" />
                          <span>Copiar datos</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-white border border-[#E5DDD0] rounded-lg px-3 py-2">
                    <span className="text-[#5C4E49] font-medium">Monto exacto a transferir:</span>
                    <span className="font-bold text-[#4A151B] tabular-nums">
                      {formatBs(grandTotal, bcvRate)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="pm-bank" className="block text-xs font-semibold text-[#231917] mb-1">
                        Tu banco *
                      </label>
                      <select
                        id="pm-bank"
                        value={pmBank}
                        onChange={(e) => setPmBank(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917]"
                      >
                        {VENEZUELAN_BANKS.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pm-phone" className="block text-xs font-semibold text-[#231917] mb-1">
                        Teléfono emisor *
                      </label>
                      <input
                        id="pm-phone"
                        type="tel"
                        value={pmPhone}
                        onChange={(e) => setPmPhone(e.target.value)}
                        placeholder="0412-1234567"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917]"
                      />
                    </div>
                    <div>
                      <label htmlFor="pm-ref" className="block text-xs font-semibold text-[#231917] mb-1">
                        N° Referencia (6 díg.) *
                      </label>
                      <input
                        id="pm-ref"
                        type="text"
                        inputMode="numeric"
                        maxLength={12}
                        value={pmReference}
                        onChange={(e) => setPmReference(e.target.value.replace(/\D/g, ''))}
                        placeholder="482910"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917] tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'tarjeta' && (
                <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 space-y-3">
                  <div>
                    <label htmlFor="card-holder" className="block text-xs font-semibold text-[#231917] mb-1">
                      Nombre en la tarjeta *
                    </label>
                    <input
                      id="card-holder"
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="SOFIA NAVARRO"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-number" className="block text-xs font-semibold text-[#231917] mb-1">
                      Número de tarjeta *
                    </label>
                    <input
                      id="card-number"
                      type="text"
                      inputMode="numeric"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="4532 8910 2345 6789"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917] tabular-nums"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="card-expiry" className="block text-xs font-semibold text-[#231917] mb-1">
                        Vencimiento (MM/AA) *
                      </label>
                      <input
                        id="card-expiry"
                        type="text"
                        inputMode="numeric"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="08/28"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917] tabular-nums"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvv" className="block text-xs font-semibold text-[#231917] mb-1">
                        CVV *
                      </label>
                      <input
                        id="card-cvv"
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917] tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'zelle' && (
                <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DDD0]">
                    <div>
                      <p className="text-xs font-bold text-[#4A151B]">
                        Cuenta Zelle Autorizada
                      </p>
                      <p className="text-xs text-[#5C4E49] mt-0.5">
                        pagos@crunchboulangerie.com · Crunch Boulangerie LLC
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('zelle', 'pagos@crunchboulangerie.com')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E5DDD0] text-[11px] font-bold text-[#231917] hover:border-[#4A151B] cursor-pointer"
                    >
                      {copiedField === 'zelle' ? (
                        <>
                          <Check className="w-3 h-3 text-[#4A5D3F]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#4A151B]" />
                          <span>Copiar correo</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="zelle-sender" className="block text-xs font-semibold text-[#231917] mb-1">
                        Titular de la cuenta Zelle *
                      </label>
                      <input
                        id="zelle-sender"
                        type="text"
                        value={zelleSender}
                        onChange={(e) => setZelleSender(e.target.value)}
                        placeholder="Ej. Carlos Mendoza"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917]"
                      />
                    </div>
                    <div>
                      <label htmlFor="zelle-ref" className="block text-xs font-semibold text-[#231917] mb-1">
                        Código de confirmación *
                      </label>
                      <input
                        id="zelle-ref"
                        type="text"
                        value={zelleReference}
                        onChange={(e) => setZelleReference(e.target.value)}
                        placeholder="Ej. ZL-992014"
                        className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'binance' && (
                <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E5DDD0]">
                    <div>
                      <p className="text-xs font-bold text-[#4A151B]">
                        Binance Pay (USDT)
                      </p>
                      <p className="text-xs text-[#5C4E49] mt-0.5">
                        Pay ID: 482910455 · Monto exacto: {grandTotal.toFixed(2)} USDT
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('binance', '482910455')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#E5DDD0] text-[11px] font-bold text-[#231917] hover:border-[#4A151B] cursor-pointer"
                    >
                      {copiedField === 'binance' ? (
                        <>
                          <Check className="w-3 h-3 text-[#4A5D3F]" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#4A151B]" />
                          <span>Copiar Pay ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <label htmlFor="binance-order" className="block text-xs font-semibold text-[#231917] mb-1">
                      ID de transacción / Orden Binance *
                    </label>
                    <input
                      id="binance-order"
                      type="text"
                      value={binanceOrderId}
                      onChange={(e) => setBinanceOrderId(e.target.value)}
                      placeholder="Ej. 289104756129"
                      className="w-full px-3 py-2 rounded-lg border border-[#E5DDD0] bg-white text-xs text-[#231917] tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Complete Order Summary */}
          <div className="lg:col-span-5 p-5 sm:p-7 bg-[#F5EFE6]/70 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-semibold text-[#4A151B]">
                  Resumen de compra
                </h3>
                <span className="text-xs font-bold text-[#5C4E49] tabular-nums">
                  {totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="bg-white border border-[#E5DDD0] rounded-xl p-3 flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F2ECE1] shrink-0">
                      <ResilientImage
                        src={product.image}
                        alt={product.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm font-semibold text-[#231917] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#5C4E49] tabular-nums">
                        {quantity}× ${product.price.toFixed(2)} ({product.weight})
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-sm font-bold text-[#231917] tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                      <span className="block text-[11px] font-medium text-[#4A5D3F] tabular-nums">
                        {formatBs(product.price * quantity, bcvRate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Delivery Banner */}
              <div
                className={`rounded-xl px-3.5 py-2.5 border flex items-center gap-2.5 text-xs font-semibold ${
                  qualifiesForFreeDelivery
                    ? 'bg-[#E9EDE6] border-[#4A5D3F]/30 text-[#2F3E27]'
                    : 'bg-white border-[#E5DDD0] text-[#5C4E49]'
                }`}
              >
                <Truck className="w-4 h-4 text-[#4A5D3F] shrink-0" />
                <span>
                  {qualifiesForFreeDelivery
                    ? '¡Tienes delivery gratis incluido por tu compra desde $35!'
                    : `Te faltan $${amountForFreeDelivery.toFixed(2)} para obtener delivery gratis (desde $35).`}
                </span>
              </div>

              {/* Breakdown */}
              <div className="bg-white border border-[#E5DDD0] rounded-2xl p-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-[#5C4E49]">
                  <span>Subtotal productos</span>
                  <span className="font-semibold text-[#231917] tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                {discountLabel && (
                  <div className="flex justify-between text-[#4A5D3F] font-semibold">
                    <span>{discountLabel}</span>
                    <span className="tabular-nums">−${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#5C4E49]">
                  <span>Delivery obrador</span>
                  <span
                    className={`font-semibold tabular-nums ${
                      qualifiesForFreeDelivery ? 'text-[#4A5D3F]' : 'text-[#231917]'
                    }`}
                  >
                    {qualifiesForFreeDelivery ? 'GRATIS' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EFE8DC] flex items-baseline justify-between">
                  <span className="font-semibold text-[#231917]">Total a pagar</span>
                  <div className="text-right">
                    <span className="block font-serif text-3xl font-bold text-[#4A151B] tabular-nums leading-none">
                      ${grandTotal.toFixed(2)}
                    </span>
                    <span className="block text-xs font-bold text-[#4A5D3F] tabular-nums mt-1">
                      {formatBs(grandTotal, bcvRate)} · Tasa BCV
                    </span>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="bg-[#FDF2F2] border border-[#4A151B]/40 text-[#4A151B] rounded-xl px-3.5 py-2.5 text-xs font-semibold"
                >
                  {errorMsg}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] disabled:opacity-75 text-[#FAF7F2] text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Procesando y verificando pago...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Confirmar y Pagar ${grandTotal.toFixed(2)}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-[#5C4E49] flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3 text-[#4A5D3F]" />
                <span>Pago protegido · Recibirás tu comprobante al instante</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

interface PaymentConfirmedModalProps {
  receipt: ConfirmedOrderReceipt | null;
  bcvRate: number | null;
  onClose: () => void;
}

export function PaymentConfirmedModal({
  receipt,
  bcvRate,
  onClose,
}: PaymentConfirmedModalProps) {
  if (!receipt) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Pago confirmado"
    >
      <div
        className="fixed inset-0 bg-[#1A0D0E]/65 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-white border border-[#E5DDD0] rounded-2xl shadow-2xl overflow-hidden my-auto">
        <div className="bg-[#FAF7F2] px-6 pt-7 pb-6 border-b border-[#E5DDD0] text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar confirmación de pago"
            className="absolute right-4 top-4 w-8 h-8 rounded-lg border border-[#E5DDD0] bg-white hover:bg-[#EFE8DC] flex items-center justify-center text-[#231917] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-[#E9EDE6] border border-[#4A5D3F]/30 text-[#4A5D3F] flex items-center justify-center mx-auto mb-3.5">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#E9EDE6] text-[#2F3E27] text-xs font-bold mb-2">
            Pago Verificado · En Preparación
          </span>

          <h2 className="font-serif text-3xl font-semibold text-[#4A151B]">
            ¡Pago Confirmado!
          </h2>
          <p className="text-sm text-[#5C4E49] mt-1">
            Orden <strong className="text-[#231917]">#{receipt.orderCode}</strong> · {receipt.createdAt}
          </p>
        </div>

        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          {/* Payment & Total Summary */}
          <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[#5C4E49]">Método confirmado</p>
              <p className="text-sm font-bold text-[#231917] mt-0.5">
                {receipt.paymentSummary}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="block font-serif text-2xl font-bold text-[#4A151B] tabular-nums leading-tight">
                ${receipt.grandTotal.toFixed(2)}
              </span>
              <span className="block text-xs font-semibold text-[#4A5D3F] tabular-nums">
                {formatBs(receipt.grandTotal, bcvRate)}
              </span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-2 text-xs sm:text-sm text-[#5C4E49]">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#4A151B] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#231917]">{receipt.customerName}</strong> · {receipt.city}, {receipt.address}
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarClock className="w-4 h-4 text-[#4A5D3F] shrink-0" />
              <span>
                Despacho programado: <strong className="text-[#231917]">{receipt.deliveryWindow}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#C88A4B] shrink-0" />
              <span>
                Delivery:{' '}
                <strong className="text-[#231917]">
                  {receipt.deliveryFee === 0 ? 'Gratis (desde $35)' : `$${receipt.deliveryFee.toFixed(2)}`}
                </strong>
              </span>
            </div>
          </div>

          {/* Purchased Items */}
          <div className="border-t border-[#EFE8DC] pt-4 space-y-2">
            <p className="text-xs font-bold text-[#231917] flex items-center gap-1.5 mb-2">
              <Receipt className="w-3.5 h-3.5 text-[#4A151B]" />
              <span>Detalle de tu pedido ({receipt.totalUnits} uds.)</span>
            </p>
            {receipt.items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center justify-between text-xs sm:text-sm text-[#5C4E49]"
              >
                <span>
                  {quantity}× <strong className="text-[#231917]">{product.name}</strong>
                </span>
                <span className="tabular-nums font-medium text-[#231917]">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
            {receipt.discountLabel && (
              <div className="flex items-center justify-between text-xs font-semibold text-[#4A5D3F] pt-1">
                <span>{receipt.discountLabel}</span>
                <span className="tabular-nums">−${receipt.discountAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <p className="text-xs text-[#5C4E49] bg-[#FAF7F2] rounded-xl px-3.5 py-2.5 border border-[#E5DDD0]">
            Enviamos copia de tu comprobante a <strong className="text-[#231917]">{receipt.email}</strong> y te contactaremos al <strong className="text-[#231917]">{receipt.phone}</strong> antes de salir de ruta.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-bold transition-colors cursor-pointer"
          >
            Listo, seguir explorando el obrador
          </button>
        </div>
      </div>
    </div>
  );
}
