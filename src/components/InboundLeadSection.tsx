import { useState, FormEvent } from 'react';
import { Check, Copy, ArrowRight } from 'lucide-react';

interface InboundLeadSectionProps {
  leadUnlocked: {
    email: string;
    profile: 'hogar' | 'mayorista';
    code: string;
  } | null;
  onUnlockLead: (payload: { email: string; profile: 'hogar' | 'mayorista'; code: string }) => void;
  onOpenCart: () => void;
}

export function InboundLeadSection({
  leadUnlocked,
  onUnlockLead,
  onOpenCart,
}: InboundLeadSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onUnlockLead({
      email: email.trim(),
      profile: 'hogar',
      code: 'CRUNCH10',
    });
  };

  const handleCopyCode = () => {
    if (!leadUnlocked || !navigator.clipboard) return;
    navigator.clipboard.writeText(leadUnlocked.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-label="Beneficio exclusivo por suscripción"
      className="bg-[#F2ECE1] border-t border-[#E5DDD0] py-14 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5DDD0] rounded-2xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Clear Value Offer */}
          <div className="lg:col-span-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#231917] text-balance leading-[1.12] mb-3">
              Déjanos tu correo y llévate 10% de descuento + Guía de Hidratación en PDF
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#5C4E49] mb-5">
              Como operamos únicamente por encargo directo (sin tienda física), enviamos nuestras fórmulas semanales y beneficios directo a tu bandeja. Si tienes cafetería o restaurante, desbloqueas además una{' '}
              <strong className="text-[#4A151B]">caja degustación de 3 panes al mayor sin cargo</strong> en tu primer pedido.
            </p>

            <ul className="space-y-2 text-sm text-[#231917]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4A5D3F] shrink-0" />
                <span>Código inmediato <strong>CRUNCH10</strong> (−10% aplicable hoy en tu carrito)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4A5D3F] shrink-0" />
                <span>Tabla descargable de porcentajes panaderos y temperaturas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#4A5D3F] shrink-0" />
                <span>Acceso prioritario a hornadas limitadas de fin de semana</span>
              </li>
            </ul>
          </div>

          {/* Right: Interactive Capture Form or Unlocked Reward */}
          <div className="lg:col-span-6">
            {leadUnlocked ? (
              <div className="bg-[#FAF7F2] border border-[#4A5D3F]/40 rounded-2xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E9EDE6] text-[#4A5D3F] flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4A5D3F]">Beneficio desbloqueado</p>
                    <h3 className="font-serif text-2xl font-semibold text-[#231917]">
                      ¡Listo para {leadUnlocked.email}!
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#5C4E49]">
                  {leadUnlocked.profile === 'hogar'
                    ? 'Hemos activado automáticamente tu 10% de descuento de bienvenida en el carrito y enviado tu Guía PDF de Hidratación.'
                    : 'Hemos registrado tu caja degustación de 3 panes sin cargo (código MUESTRAB2B) y enviado el dossier de tarifas mayoristas a tu correo.'}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E5DDD0] rounded-xl px-4 py-3">
                  <div>
                    <span className="block text-[11px] font-medium text-[#5C4E49]">
                      Tu código activo
                    </span>
                    <span className="font-serif text-xl font-bold text-[#4A151B] tracking-wide">
                      {leadUnlocked.code}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#E5DDD0] text-xs font-semibold text-[#231917] hover:bg-[#F2ECE1] cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenCart}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4A151B] text-[#FAF7F2] text-xs font-semibold hover:bg-[#380F14] cursor-pointer"
                    >
                      <span>Ir al carrito</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-6 sm:p-7 space-y-4"
              >
                <div>
                  <label htmlFor="inbound-name" className="block text-xs font-semibold text-[#231917] mb-1">
                    Tu nombre
                  </label>
                  <input
                    id="inbound-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Mateo García"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                  />
                </div>

                <div>
                  <label htmlFor="inbound-email" className="block text-xs font-semibold text-[#231917] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    id="inbound-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-bold transition-colors cursor-pointer"
                >
                  Obtener 10% de descuento + Guía PDF
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
