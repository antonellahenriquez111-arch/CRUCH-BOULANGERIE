import { useState, FormEvent } from 'react';
import { X, Check, Copy, MessageCircle, UserCheck, ShoppingBag } from 'lucide-react';
import { Recipe, STARTER_KIT, Product } from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { formatBs } from '../hooks/useBcvRate';

/* ============================================================================
   1. Recipe Modal (Baker's Percentages & Step-by-Step Instructions)
   ============================================================================ */

interface RecipeModalProps {
  recipe: Recipe | null;
  bcvRate: number | null;
  onClose: () => void;
  onAddStarterKit: (product: Product) => void;
}

export function RecipeModal({ recipe, bcvRate, onClose, onAddStarterKit }: RecipeModalProps) {
  const [multiplier, setMultiplier] = useState<number>(1);

  if (!recipe) return null;

  const starterKit = STARTER_KIT;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Receta: ${recipe.title}`}
    >
      <div
        className="fixed inset-0 bg-[#1A0D0E]/60 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-[#FAF7F2] rounded-xl border border-[#E5DDD0] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5DDD0] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-[#4A5D3F]">
              {recipe.category} · {recipe.hydration} · {recipe.totalTime}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#231917]">
              {recipe.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar receta"
            className="w-9 h-9 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] hover:bg-[#EFE8DC] flex items-center justify-center text-[#231917] cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-[#F2ECE1] border border-[#E5DDD0]">
              <ResilientImage
                src={recipe.image}
                alt={recipe.imageAlt}
                fallbackTitle={recipe.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7">
              <p className="text-sm leading-relaxed text-[#645752] mb-4">
                {recipe.summary}
              </p>

              {/* Live Batch Multiplier */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-[#E5DDD0] rounded-lg p-3">
                <span className="text-xs font-semibold text-[#231917]">
                  Escalar fórmula ({recipe.yieldLabel}):
                </span>
                <div className="inline-flex items-center gap-1">
                  {[1, 2, 5].map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => setMultiplier(scale)}
                      className={`px-3 py-1 rounded text-xs font-semibold tabular-nums cursor-pointer transition-colors ${
                        multiplier === scale
                          ? 'bg-[#4A151B] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#231917] hover:bg-[#EFE8DC]'
                      }`}
                    >
                      ×{scale} {recipe.unitLabel}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Baker's Percentages Table */}
          <div className="bg-white border border-[#E5DDD0] rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 bg-[#F2ECE1] border-b border-[#E5DDD0] flex items-center justify-between">
              <h3 className="font-serif text-xl font-semibold text-[#231917]">
                Porcentajes panaderos
              </h3>
              <span className="text-xs font-medium text-[#645752] tabular-nums">
                Rendimiento: ×{multiplier}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EFE8DC] text-xs font-semibold text-[#645752]">
                    <th className="px-5 py-3">Ingrediente</th>
                    <th className="px-5 py-3 text-right">% Panadero</th>
                    <th className="px-5 py-3 text-right">Peso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DC]">
                  {recipe.ingredients.map((ing) => (
                    <tr key={ing.name}>
                      <td className="px-5 py-3 text-[#231917] font-medium">{ing.name}</td>
                      <td className="px-5 py-3 text-right tabular-nums text-[#4A5D3F] font-semibold">
                        {ing.percentage}%
                      </td>
                      <td className="px-5 py-3 text-right tabular-nums font-bold text-[#231917]">
                        {ing.gramsPerUnit * multiplier} g
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Preparation */}
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#231917] mb-4">
              Preparación paso a paso
            </h3>
            <ol className="space-y-3.5">
              {recipe.steps.map((step, index) => (
                <li
                  key={index}
                  className="bg-white border border-[#E5DDD0] rounded-xl p-4 flex gap-4 items-start"
                >
                  <span className="font-serif text-2xl font-bold text-[#C88A4B] tabular-nums leading-none mt-0.5">
                    0{index + 1}.
                  </span>
                  <p className="text-sm leading-relaxed text-[#231917]">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t border-[#E5DDD0] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#645752]">
            ¿Aún no tienes fermento activo? Comienza con nuestra cepa viva de obrador.
          </p>
          <button
            type="button"
            onClick={() => {
              onAddStarterKit(starterKit);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              Añadir Kit Cultivo (${starterKit.price.toFixed(2)} · {formatBs(starterKit.price, bcvRate)})
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. WhatsApp Wholesale Modal
   ============================================================================ */

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppModal({ isOpen, onClose }: WhatsAppModalProps) {
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Cafetería de Especialidad');
  const [weeklyVolume, setWeeklyVolume] = useState('25–50 hogazas / semana');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const draftedMessage = `Hola Crunch Boulangerie, soy de ${businessName || '[Nombre del local]'} (${businessType}). Buscamos suministro mayorista estimado de ${weeklyVolume}.${notes ? ` Notas: ${notes}` : ''}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;
    setSent(true);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(draftedMessage).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Chat rápido WhatsApp para mayoristas"
    >
      <div className="fixed inset-0 bg-[#1A0D0E]/60 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#FAF7F2] rounded-xl border border-[#E5DDD0] shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#4A5D3F] text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5" />
            <h2 className="font-serif text-2xl font-semibold">
              Escríbenos
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chat mayorista"
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {sent ? (
            <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 text-center space-y-4">
              <div className="w-11 h-11 rounded-full bg-[#E9EDE6] text-[#4A5D3F] flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#231917]">
                Consulta mayorista registrada
              </h3>
              <p className="text-sm text-[#645752]">
                Nuestro maestro panadero responderá a <strong className="text-[#231917]">{businessName}</strong> en menos de 2 horas con tarifas B2B y muestras de cortesía.
              </p>
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-lg p-3 text-left text-xs text-[#231917]">
                {draftedMessage}
              </div>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg border border-[#E5DDD0] bg-white hover:bg-[#F2ECE1] text-xs font-semibold text-[#231917] cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Mensaje copiado' : 'Copiar mensaje'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#4A151B] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#645752]">
                Atención directa de obrador para cafeterías, restaurantes y hoteles. Descuentos escalonados desde 10 unidades diarias o semanales.
              </p>

              <div>
                <label htmlFor="wa-business" className="block text-xs font-semibold text-[#231917] mb-1">
                  Nombre de tu restaurante, café o empresa
                </label>
                <input
                  id="wa-business"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Ej. Tostadores del Sur"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="wa-type" className="block text-xs font-semibold text-[#231917] mb-1">
                    Tipo de negocio
                  </label>
                  <select
                    id="wa-type"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                  >
                    <option>Cafetería de Especialidad</option>
                    <option>Restaurante / Bistró</option>
                    <option>Hotel Boutique</option>
                    <option>Tienda Gourmet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="wa-volume" className="block text-xs font-semibold text-[#231917] mb-1">
                    Volumen semanal estimado
                  </label>
                  <select
                    id="wa-volume"
                    value={weeklyVolume}
                    onChange={(e) => setWeeklyVolume(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                  >
                    <option>10–25 hogazas / semana</option>
                    <option>25–50 hogazas / semana</option>
                    <option>50–120 hogazas / semana</option>
                    <option>+120 hogazas / semana</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="wa-notes" className="block text-xs font-semibold text-[#231917] mb-1">
                  Formato o horario de entrega preferido (opcional)
                </label>
                <textarea
                  id="wa-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Hogazas rebanadas a 14 mm antes de las 07:30..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#4A5D3F] hover:bg-[#3A4A31] text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   3. Club Crunch Registration Modal
   ============================================================================ */

interface ClubModalProps {
  isOpen: boolean;
  memberName: string | null;
  onClose: () => void;
  onRegister: (name: string) => void;
  onLogout: () => void;
}

export function ClubModal({
  isOpen,
  memberName,
  onClose,
  onRegister,
  onLogout,
}: ClubModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Hornear en casa con Cultivo Vivo');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onRegister(name.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Registro al Club Crunch"
    >
      <div className="fixed inset-0 bg-[#1A0D0E]/60 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-[#FAF7F2] rounded-xl border border-[#E5DDD0] shadow-2xl overflow-hidden">
        <div className="px-6 py-4 bg-[#4A151B] text-[#FAF7F2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-[#C88A4B]" />
            <h2 className="font-serif text-2xl font-semibold">Club Crunch</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal del Club"
            className="w-8 h-8 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {memberName ? (
            <div className="bg-white border border-[#E5DDD0] rounded-xl p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E9EDE6] text-[#4A5D3F] flex items-center justify-center mx-auto font-serif text-2xl font-bold">
                {memberName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#4A5D3F]">Miembro Activo</p>
                <h3 className="font-serif text-2xl font-semibold text-[#231917]">
                  {memberName}
                </h3>
              </div>
              <p className="text-sm text-[#645752]">
                Tienes acceso preferente a lotes limitados de harina molida a la piedra, recetario estacional y asesoría en fermentación.
              </p>
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex-1 py-2.5 rounded-lg border border-[#E5DDD0] bg-[#FAF7F2] text-xs font-semibold text-[#645752] hover:text-[#231917] cursor-pointer"
                >
                  Cambiar cuenta
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-[#4A151B] text-[#FAF7F2] text-xs font-semibold cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-[#645752]">
                Únete sin costo al Club Crunch para recibir alertas de hornadas especiales, guías de mantenimiento de masa madre y tarifas preferentes para tu obrador o cocina.
              </p>

              <div>
                <label htmlFor="club-name" className="block text-xs font-semibold text-[#231917] mb-1">
                  Nombre completo
                </label>
                <input
                  id="club-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Elena Morales"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                />
              </div>

              <div>
                <label htmlFor="club-email" className="block text-xs font-semibold text-[#231917] mb-1">
                  Correo electrónico
                </label>
                <input
                  id="club-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@ejemplo.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                />
              </div>

              <div>
                <label htmlFor="club-interest" className="block text-xs font-semibold text-[#231917] mb-1">
                  Tu interés principal
                </label>
                <select
                  id="club-interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DDD0] bg-white text-sm text-[#231917]"
                >
                  <option>Hornear en casa con Cultivo Vivo</option>
                  <option>Pedidos al mayor para restaurantes y cafés</option>
                  <option>Hogazas semanales a domicilio</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer"
              >
                Registrarme en el Club
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
