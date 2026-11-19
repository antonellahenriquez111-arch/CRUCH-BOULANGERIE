import { useState, useMemo } from 'react';
import {
  ArrowUpRight,
  Scale,
  Flame,
  Timer,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  CATEGORIES,
  RECIPES,
  STARTER_REVIEWS,
  ProductCategory,
  Recipe,
} from '../data/bakeryData';
import { ResilientImage } from './ResilientImage';
import { ReviewsGrid } from './ReviewsGrid';

interface RecipesSectionProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

const ITEMS_PER_BLOCK = 6;

export function RecipesSection({ onSelectRecipe }: RecipesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBlock, setCurrentBlock] = useState(0);

  const filteredRecipes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RECIPES.filter((r) => {
      const matchesCat = selectedCategory === 'Todos' || r.category === selectedCategory;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const totalBlocks = Math.max(1, Math.ceil(filteredRecipes.length / ITEMS_PER_BLOCK));
  const safeBlock = Math.min(currentBlock, totalBlocks - 1);
  const visibleRecipes = filteredRecipes.slice(
    safeBlock * ITEMS_PER_BLOCK,
    safeBlock * ITEMS_PER_BLOCK + ITEMS_PER_BLOCK
  );

  const bakingTips = [
    {
      icon: Scale,
      title: 'La regla del 100% panadero',
      description:
        'Todas las cantidades se calculan respecto al peso total de harina (100%). Así, si usas 500 g de harina, un 78% de agua equivale exactamente a 390 g.',
    },
    {
      icon: Flame,
      title: 'Olla de hierro o piedra con vapor',
      description:
        'Precalienta la olla holandesa 45 minutos a 255 °C. El vapor atrapado durante los primeros 20 minutos permite que la greña expanda al máximo antes de dorar.',
    },
    {
      icon: Timer,
      title: 'Reposo mínimo de 2 horas en rejilla',
      description:
        'Cortar la hogaza caliente libera el vapor interno y apelmaza la miga. Espera a que enfríe por completo para disfrutar el crujido real de la corteza.',
    },
  ];

  return (
    <section id="recetario" className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Recipe Grid matching the 18-bread catalog (recipe-only, no prices) */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold text-[#4A5D3F] mb-2">
                Recetario del Obrador
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#4A151B] text-balance leading-[1.1]">
                Fórmulas con porcentajes panaderos
              </h1>
              <p className="mt-2.5 text-base text-[#5C4E49] max-w-[60ch]">
                Los 18 panes de nuestro catálogo con sus fórmulas abiertas para hornear en casa. Haz clic en cualquiera para ver la receta, porcentajes y preparación paso a paso.
              </p>
            </div>

            {totalBlocks > 1 && (
              <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DDD0] rounded-xl p-1 self-start lg:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentBlock((prev) => (prev - 1 + totalBlocks) % totalBlocks)
                  }
                  aria-label="Ver bloque anterior de recetas"
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
                  aria-label="Ver siguiente bloque de recetas"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Filter Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div
              role="tablist"
              aria-label="Filtrar recetas por categoría"
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
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentBlock(0);
                    }}
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

            <div className="relative sm:w-64">
              <Search className="w-4 h-4 text-[#5C4E49] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentBlock(0);
                }}
                placeholder="Buscar receta (ciabatta, centeno...)"
                aria-label="Buscar recetas"
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-[#E5DDD0] bg-white text-sm text-[#231917]"
              />
            </div>
          </div>

          {/* Targeted div:nth-of-type(2) - Recipe Cards Catalog */}
          {filteredRecipes.length === 0 ? (
            <div className="bg-white border border-[#E5DDD0] rounded-2xl p-10 text-center">
              <p className="font-serif text-2xl font-semibold text-[#231917] mb-2">
                No encontramos recetas con esa búsqueda
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Todos');
                  setCurrentBlock(0);
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#4A151B] text-[#FAF7F2] text-sm font-semibold cursor-pointer"
              >
                Ver todas las recetas
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {visibleRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => onSelectRecipe(recipe)}
                    className="group text-left bg-white border border-[#E5DDD0] rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <div className="aspect-[4/3] w-full bg-[#F2ECE1] overflow-hidden">
                      <ResilientImage
                        src={recipe.image}
                        alt={recipe.imageAlt}
                        fallbackTitle={recipe.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between gap-4 w-full">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5C4E49] mb-2">
                          <span>{recipe.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{recipe.hydration}</span>
                          <span aria-hidden="true">·</span>
                          <span>{recipe.totalTime}</span>
                        </div>

                        <h2 className="font-serif text-2xl font-semibold text-[#231917] group-hover:text-[#4A151B] transition-colors mb-2">
                          {recipe.title}
                        </h2>

                        <p className="text-sm leading-relaxed text-[#5C4E49]">
                          {recipe.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between text-sm font-semibold text-[#4A151B]">
                        <span>Ver receta e instrucciones</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {totalBlocks > 1 && (
                <div className="mt-9 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5DDD0]">
                  <p className="text-sm font-medium text-[#5C4E49] tabular-nums">
                    Bloque {safeBlock + 1} de {totalBlocks} · {filteredRecipes.length} recetas disponibles
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-white border border-[#E5DDD0] rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentBlock((prev) => (prev - 1 + totalBlocks) % totalBlocks)
                      }
                      aria-label="Ver bloque anterior de recetas"
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
                      aria-label="Ver siguiente bloque de recetas"
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-[#4A151B] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Essential Baker Tips */}
        <div className="bg-[#F2ECE1] border border-[#E5DDD0] rounded-2xl p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold text-[#4A5D3F] mb-1">
              Técnica de obrador en casa
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#4A151B]">
              3 claves para dominar nuestras fórmulas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {bakingTips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div
                  key={tip.title}
                  className="bg-white border border-[#E5DDD0] rounded-xl p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F2ECE1] text-[#4A151B] flex items-center justify-center mb-3.5">
                    <Icon className="w-5 h-5" strokeWidth={1.9} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#231917] mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#5C4E49]">
                    {tip.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community Reviews */}
        <ReviewsGrid
          title="Resultados de nuestra comunidad"
          subtitle="Testimonios de quienes replican nuestras fórmulas en casa y en cocinas profesionales."
          reviews={STARTER_REVIEWS}
          titleClassName="text-[#4A151B]"
        />
      </div>
    </section>
  );
}
