import { ArrowRight, Flame, Clock, Wheat, Truck, PhoneCall, CalendarClock } from 'lucide-react';
import { HOME_REVIEWS } from '../data/bakeryData';
import { ReviewsGrid } from './ReviewsGrid';
import { PageId } from '../App';

interface AboutSectionProps {
  onNavigate: (page: PageId) => void;
  onOpenWhatsApp: () => void;
}

export function AboutSection({ onNavigate, onOpenWhatsApp }: AboutSectionProps) {
  const pillars = [
    {
      icon: Clock,
      title: '01. Fermentación lenta (36–48h)',
      detail:
        'Maduración controlada en cámara fría para descomponer azúcares complejos, lograr una miga alveolada digerible y mantener el pan fresco hasta 5 días.',
    },
    {
      icon: Wheat,
      title: '02. Harinas molidas a la piedra',
      detail:
        'Trabajamos con molinos locales de grano entero, agua filtrada y nuestra cepa madre viva desde 2019. Sin levaduras comerciales ni mejorantes.',
    },
    {
      icon: Flame,
      title: '03. Horno refractario a 260 °C',
      detail:
        'Suela de piedra caliente con inyección de vapor al arranque para formar esa corteza gruesa, caramelizada y sonoramente crujiente.',
    },
  ];

  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro & Metrics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A151B] text-balance leading-[1.1] mb-5">
              Un obrador de producción directa, sin tienda física ni vitrinas
            </h1>
            <p className="text-base leading-relaxed text-[#5C4E49] mb-4">
              En Crunch Boulangerie no contamos con un local abierto al público: somos un obrador artesanal 100% online enfocado exclusivamente en hornear bajo encargo. Así evitamos pan sobrante en estanterías y garantizamos que cada pieza llegue recién hecha a tu cocina o negocio.
            </p>
            <p className="text-base leading-relaxed text-[#5C4E49] mb-7">
              Cada madrugada despachamos rutas directas para restaurantes, cafeterías de especialidad y hoteles, además de enviar nuestro cultivo madre vivo en frasco con guía impresa a panaderos en casa.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('productos')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4A151B] hover:bg-[#380F14] text-[#FAF7F2] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Ver productos al mayor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#4A5D3F] bg-white hover:bg-[#E9EDE6] text-[#2F3E27] text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Hablar con obrador</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-6">
              <p className="font-serif text-4xl font-bold text-[#4A151B] tabular-nums mb-1">
                +42
              </p>
              <p className="text-sm font-bold text-[#231917] mb-1">
                Restaurantes y cafés aliados
              </p>
              <p className="text-xs leading-relaxed text-[#5C4E49]">
                Reciben hogazas recién salidas del horno de piedra cada madrugada de martes a domingo.
              </p>
            </div>

            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-6">
              <p className="font-serif text-4xl font-bold text-[#4A5D3F] tabular-nums mb-1">
                260 °C
              </p>
              <p className="text-sm font-bold text-[#231917] mb-1">
                Cocción sobre suela refractaria
              </p>
              <p className="text-xs leading-relaxed text-[#5C4E49]">
                Inyección directa de vapor para una corteza fina, quebradiza y sonoramente crujiente.
              </p>
            </div>

            <figure className="sm:col-span-2 bg-[#F2ECE1] border border-[#E5DDD0] rounded-2xl p-6">
              <blockquote className="font-sans text-lg font-medium italic text-[#231917] leading-relaxed mb-3">
                “Desde que cambiamos a las hogazas Campagne de Crunch Boulangerie, las mermas de tostadas bajaron a cero porque el pan conserva su miga húmeda y el crunch de la corteza hasta el tercer día.”
              </blockquote>
              <figcaption className="text-xs font-medium text-[#5C4E49]">
                <span className="font-bold text-[#231917]">Mateo Valdivia</span> · Jefe de Cocina en Bistro Terraza Norte
              </figcaption>
            </figure>
          </div>
        </div>

        {/* 3 Craftsmanship Pillars */}
        <div>
          <h2 className="font-serif text-3xl font-semibold text-[#4A151B] mb-6">
            Nuestro método en 3 etapas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white border border-[#E5DDD0] rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-[#F2ECE1] text-[#4A151B] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" strokeWidth={1.9} />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#231917] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5C4E49]">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Reviews */}
        <ReviewsGrid
          title="Opiniones de nuestros aliados y clientes"
          subtitle="Experiencias reales de cafeterías de especialidad, cocinas y panaderos que confían en nuestro obrador."
          reviews={HOME_REVIEWS}
          titleClassName="text-[#4A151B]"
        />

        {/* Online Dispatch Model & Direct Contact */}
        <div className="bg-white border border-[#E5DDD0] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-[#4A151B] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#231917] mb-1">
                Modelo 100% Despacho Directo
              </h3>
              <p className="text-sm text-[#5C4E49]">
                No atendemos venta presencial en local. Toda nuestra producción viaja directa del horno a tu puerta o cocina.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CalendarClock className="w-5 h-5 text-[#4A5D3F] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#231917] mb-1">
                Rutas de Entrega Diaria
              </h3>
              <p className="text-sm text-[#5C4E49]">
                Horneado martes a domingo. Rutas B2B de 05:30 a 08:30 y envíos particulares programados hasta las 14:30.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <PhoneCall className="w-5 h-5 text-[#C88A4B] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#231917] mb-1">
                Contacto Mayorista
              </h3>
              <p className="text-sm text-[#5C4E49] mb-2">
                pedidos@crunchboulangerie.es · Atención directa para cartas y eventos.
              </p>
              <button
                type="button"
                onClick={onOpenWhatsApp}
                className="text-xs font-bold text-[#4A151B] hover:underline cursor-pointer"
              >
                Abrir chat WhatsApp →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
