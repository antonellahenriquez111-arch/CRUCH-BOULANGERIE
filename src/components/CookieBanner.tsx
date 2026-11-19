import { useState } from 'react';
import { Cookie, X, ChevronDown } from 'lucide-react';

export type CookieConsentChoice = 'all' | 'essential';

interface CookieBannerProps {
  isVisible: boolean;
  onAcceptAll: () => void;
  onAcceptEssential: () => void;
  onDismiss: () => void;
}

export function CookieBanner({
  isVisible,
  onAcceptAll,
  onAcceptEssential,
  onDismiss,
}: CookieBannerProps) {
  const [showDetails, setShowDetails] = useState(false);

  if (!isVisible) return null;

  return (
    <aside
      role="dialog"
      aria-label="Política de cookies"
      className="fixed bottom-5 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm bg-white border border-[#E5DDD0] rounded-2xl shadow-2xl p-5 text-[#231917]"
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] border border-[#E5DDD0] flex items-center justify-center text-[#4A151B] shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-lg font-semibold text-[#4A151B] leading-tight">
            Política de Cookies
          </h3>
        </div>

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar aviso de cookies"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5C4E49] hover:bg-[#F2ECE1] hover:text-[#231917] transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-[13px] leading-relaxed text-[#5C4E49] mb-3">
        Utilizamos cookies para garantizar que tu experiencia sea tan crujiente como nuestro pan recién horneado, recordando tu carrito y tus preferencias en Crunch Boulangerie.
      </p>

      <button
        type="button"
        onClick={() => setShowDetails((prev) => !prev)}
        aria-expanded={showDetails}
        className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A151B] hover:text-[#380F14] mb-3.5 cursor-pointer"
      >
        <span>{showDetails ? 'Ocultar detalles' : 'Ver política completa'}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            showDetails ? 'rotate-180' : ''
          }`}
        />
      </button>

      {showDetails && (
        <div className="mb-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] space-y-2 text-xs text-[#5C4E49] leading-relaxed">
          <p>
            <strong className="text-[#231917]">Esenciales (activas):</strong> mantienen los panes en tu carrito, calculan tu descuento mayorista del 15% y aseguran una compra ágil.
          </p>
          <p>
            <strong className="text-[#231917]">Preferencias y medición:</strong> nos ayudan a mejorar el catálogo de horneado y recordar tus favoritos entre visitas. Nunca vendemos tus datos.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onAcceptAll}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          Aceptar todas
        </button>
        <button
          type="button"
          onClick={onAcceptEssential}
          className="px-3.5 py-2.5 rounded-xl border border-[#D8CFC2] hover:bg-[#F2ECE1] text-[#231917] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          Solo esenciales
        </button>
      </div>
    </aside>
  );
}
