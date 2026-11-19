import { useState, FormEvent } from 'react';
import {
  Check,
  ShoppingBag,
  ChevronDown,
  Thermometer,
  Wheat,
  ShieldCheck,
  MessageCircle,
  BookOpen,
  Truck,
  Send,
  CheckCircle2,
} from 'lucide-react';
import {
  STARTER_KIT,
  STARTER_FAQS,
  STARTER_REVIEWS,
  Product,
} from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { ReviewsGrid } from './ReviewsGrid';
import { formatBs } from '../hooks/useBcvRate';

interface StarterGuideSectionProps {
  bcvRate: number | null;
  onAddProduct: (product: Product, qty?: number) => void;
  onOpenWhatsApp: () => void;
}

export function StarterGuideSection({
  bcvRate,
  onAddProduct,
  onOpenWhatsApp,
}: StarterGuideSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [customQuestion, setCustomQuestion] = useState('');
  const [questionContact, setQuestionContact] = useState('');
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(null);
  const starterKit = STARTER_KIT;

  const handleQuestionSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    setSubmittedQuestion(customQuestion.trim());
    setCustomQuestion('');
  };

  const kitContents = [
    '250 g de cultivo madre activo (cepa de centeno y trigo 2019)',
    'Frasco Weck reutilizable con tapa de lino transpirable',
    '500 g de harina orgánica molida a la piedra para tus primeros refrescos',
    'Guía impresa de 32 páginas con tablas de temperatura e hidratación',
  ];

  const maintenanceRows = [
    {
      mode: 'Horneado frecuente (encimera)',
      temp: '22–26 °C',
      ratio: '1 : 2 : 2 (30 g madre · 60 g agua · 60 g harina)',
      frequency: 'Cada 12–24 horas',
    },
    {
      mode: 'Mantenimiento semanal (nevera)',
      temp: '4 °C',
      ratio: '1 : 2 : 2 justo antes de refrigerar',
      frequency: 'Cada 7–10 días',
    },
    {
      mode: 'Activación previa al amasado',
      temp: '25–26 °C',
      ratio: '1 : 3 : 3 (agua tibia sin cloro)',
      frequency: '4–5 horas antes de amasar',
    },
  ];

  return (
    <section id="cultivo" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Kit & 4 Steps */}
        <div>
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-semibold text-[#4A5D3F] mb-2">
              Masa Madre & Guía Paso a Paso
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A151B] text-balance leading-[1.1]">
              Llévate nuestra cepa viva de obrador y aprende a hornear sin secretos
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left: Featured Starter Kit Purchase Block */}
            <div className="lg:col-span-5 bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full bg-[#EDE5D8] overflow-hidden">
                <ResilientImage
                  src={starterKit.image}
                  alt={starterKit.imageAlt}
                  fallbackTitle="Kit Cultivo Madre Activo + Guía"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#5C4E49] mb-2">
                    <span>Cepa Activa 2019</span>
                    <span aria-hidden="true">·</span>
                    <span>Envío refrigerado 24h</span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-[#4A151B] mb-3">
                    {starterKit.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-[#5C4E49] mb-5">
                    Cultivo maduro alimentado diariamente en nuestro obrador. A diferencia de los fermentos deshidratados, llega vivo y listo para tu primera hogaza en 24 horas.
                  </p>

                  <ul className="space-y-2.5">
                    {kitContents.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#231917]">
                        <Check className="w-4 h-4 text-[#4A5D3F] shrink-0 mt-0.5" strokeWidth={2.2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                  <div className="pt-5 border-t border-[#EFE8DC] space-y-3.5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#E9EDE6] text-[#2F3E27] text-xs font-semibold">
                      <Truck className="w-4 h-4 text-[#4A5D3F] shrink-0" />
                      <span>
                        Delivery gratis en pedidos desde $35 ({formatBs(35, bcvRate)})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="text-2xl font-bold text-[#231917] tabular-nums">
                          ${starterKit.price.toFixed(2)}
                        </span>
                        <span className="block text-sm font-semibold text-[#4A5D3F] tabular-nums">
                          {formatBs(starterKit.price, bcvRate)}
                        </span>
                        <p className="text-xs text-[#5C4E49] mt-0.5">
                          Incluye soporte directo por WhatsApp
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => onAddProduct(starterKit, 1)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <ShoppingBag className="w-4 h-4 shrink-0" />
                        <span>Agregar Kit + Guía</span>
                      </button>
                    </div>
                  </div>
              </div>
            </div>

            {/* Right: Culture Highlights & Guide Exclusivity Hook */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 flex-1">
                {[
                  {
                    icon: Wheat,
                    tag: 'Fermento vivo',
                    title: 'Cepa madre activa desde 2019',
                    description:
                      'Alimentada a diario en nuestro obrador con centeno y trigo orgánico. Llega viva y vigorosa en frasco de vidrio, nunca deshidratada.',
                  },
                  {
                    icon: ShieldCheck,
                    tag: '100% artesanal',
                    title: 'Mejor digestión y corteza real',
                    description:
                      'Sin levaduras comerciales ni aditivos químicos. Disfruta hogazas con miga aireada, aroma complejo y frescura natural durante varios días.',
                  },
                  {
                    icon: MessageCircle,
                    tag: 'Asesoría directa',
                    title: 'Soporte directo de panadero',
                    description:
                      '¿Tu primera vez fermentando? Resolvemos tus dudas por WhatsApp para que ajustes tu cultivo al clima y las harinas de tu cocina.',
                  },
                  {
                    icon: BookOpen,
                    tag: 'Acceso exclusivo',
                    title: 'Guía paso a paso reservada',
                    description:
                      'Nuestros secretos, tiempos exactos y método completo vienen impresos en el Kit o en el PDF gratuito al dejar tu correo más abajo.',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-white border border-[#E5DDD0] rounded-2xl p-6 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#E5DDD0] flex items-center justify-center text-[#4A151B]">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-semibold text-[#4A5D3F]">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-[#231917] mb-2">
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

              {/* Wholesale & Culinary Studio Support Callout */}
              <div className="bg-[#4A151B] text-[#FAF7F2] rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-white mb-1">
                    ¿Quieres suministro mayorista de masa madre o lotes para tu cocina?
                  </h3>
                  <p className="text-sm text-[#E9D8C4]">
                    Preparamos envases de 1 kg y 5 kg de cultivo vivo para obradores, escuelas de cocina y restaurantes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="px-5 py-3 rounded-xl bg-[#C88A4B] hover:bg-[#B87A3C] text-[#ffffff] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  Cotizar al Mayor
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reference Feeding Schedule Table */}
        <div className="bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 bg-[#F2ECE1] border-b border-[#E5DDD0] flex items-center gap-2.5">
            <Thermometer className="w-5 h-5 text-[#4A151B]" />
            <h2 className="font-serif text-2xl font-semibold text-[#4A151B]">
              Tabla rápida de mantenimiento y proporciones
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EFE8DC] text-xs font-bold text-[#5C4E49]">
                  <th className="px-6 py-3.5">Escenario de uso</th>
                  <th className="px-6 py-3.5">Temperatura</th>
                  <th className="px-6 py-3.5">Proporción recomendada</th>
                  <th className="px-6 py-3.5">Frecuencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DC]">
                {maintenanceRows.map((row) => (
                  <tr key={row.mode}>
                    <td className="px-6 py-4 font-semibold text-[#231917]">{row.mode}</td>
                    <td className="px-6 py-4 tabular-nums font-medium text-[#4A151B]">{row.temp}</td>
                    <td className="px-6 py-4 text-[#5C4E49]">{row.ratio}</td>
                    <td className="px-6 py-4 font-semibold text-[#4A5D3F]">{row.frequency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Starter Kit Reviews */}
        <ReviewsGrid
          title="Reseñas de quienes hornean con nuestro cultivo"
          subtitle="Panaderos en casa y cocinas profesionales que activaron su primera hornada con nuestra cepa viva."
          reviews={STARTER_REVIEWS}
          titleClassName="text-[#4A151B]"
        />

        {/* Starter FAQs + Open Question Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold text-[#4A5D3F] mb-1.5">
              Consultorio del fermento
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A151B] mb-6">
              Preguntas frecuentes sobre la masa madre viva
            </h2>
            <div className="space-y-3">
              {STARTER_FAQS.map((faq, idx) => {
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
              ¿Tienes otra duda?
            </p>
            <h3 className="font-serif text-2xl font-semibold text-[#4A151B] mb-2">
              Escríbenos tu pregunta
            </h3>
            <p className="text-sm text-[#5C4E49] mb-5">
              Consúltanos sobre el cultivo vivo, tiempos de envío refrigerado o tu pedido con delivery gratis desde $35.
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
                    : 'Nuestro maestro panadero responderá tu consulta a la brevedad.'}
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
                  <label htmlFor="starter-custom-question" className="block text-xs font-semibold text-[#231917] mb-1">
                    Tu pregunta
                  </label>
                  <textarea
                    id="starter-custom-question"
                    rows={3}
                    required
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="Ej. ¿Cómo conservo el frasco si viajo una semana? ¿El envío llega refrigerado?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5DDD0] bg-[#FAF7F2] text-sm text-[#231917] focus:outline-none focus:border-[#4A151B]"
                  />
                </div>

                <div>
                  <label htmlFor="starter-faq-contact" className="block text-xs font-semibold text-[#231917] mb-1">
                    Correo o WhatsApp para responderte (opcional)
                  </label>
                  <input
                    id="starter-faq-contact"
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
