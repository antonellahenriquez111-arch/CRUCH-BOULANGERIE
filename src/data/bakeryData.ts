export type ProductCategory =
  | 'Todos'
  | 'Clásicos'
  | 'Especiales'
  | 'Dulces';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'Todos'> | 'Cultivo + Guía';
  weight: string;
  fermentation: string;
  price: number;
  description: string;
  image: string;
  imageAlt: string;
  wholesaleNote: string;
  isFeaturedKit?: boolean;
  isHomeHighlight?: boolean;
}

export interface StarterStep {
  number: string;
  title: string;
  duration: string;
  description: string;
}

export interface BakerIngredient {
  name: string;
  percentage: number;
  gramsPerUnit: number;
}

export interface Recipe {
  id: string;
  title: string;
  category: string;
  totalTime: string;
  hydration: string;
  yieldLabel: string;
  unitLabel: string;
  image: string;
  imageAlt: string;
  summary: string;
  ingredients: BakerIngredient[];
  steps: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  productTag: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CATEGORIES: ProductCategory[] = [
  'Todos',
  'Clásicos',
  'Especiales',
  'Dulces',
];

export const HERO_IMAGE = '/src/assets/images/hero_sourdough_loaf_1794950797821.jpg';

export const STARTER_KIT: Product = {
  id: 'kit-cultivo-guia',
  name: 'Kit Cultivo + Guía',
  category: 'Cultivo + Guía',
  weight: 'Frasco 250 g + Guía',
  fermentation: 'Cepa 2019',
  price: 24.0,
  description:
    'Frasco Weck con 250 g de nuestra masa madre viva de centeno y trigo, harina de arranque y guía impresa de 32 páginas.',
  image: '/src/assets/images/product_cultivo_kit_1794950799263.jpg',
  imageAlt: 'Frasco de vidrio con cultivo vivo de masa madre burbujeante, bolsa de harina y guía impresa',
  wholesaleNote: 'Incluye tabla de hidratación y soporte de obrador',
  isFeaturedKit: true,
};

export const PRODUCTS: Product[] = [
  {
    id: 'pan-campana',
    name: 'Pan de Campaña',
    category: 'Clásicos',
    weight: '950 g',
    fermentation: '40h frío',
    price: 8.5,
    description:
      'Hogaza rústica de trigo y centeno con miga alveolar abierta, acidez equilibrada y corteza caramelizada.',
    image: '/src/assets/images/product_hogaza_clasica_1794950798792.jpg',
    imageAlt: 'Pan de Campaña de masa madre cortado por la mitad mostrando miga abierta',
    wholesaleNote: 'Ideal para tostadas de cafetería y mesa',
    isHomeHighlight: true,
  },
  {
    id: 'pan-semillas-cereales',
    name: 'Pan de Semillas',
    category: 'Clásicos',
    weight: '900 g',
    fermentation: '42h frío',
    price: 9.5,
    description:
      'Harina integral molida a la piedra con mezcla tostada de sésamo, lino dorado, girasol y avena.',
    image: '/src/assets/images/product_hogaza_semillas_1794950798196.jpg',
    imageAlt: 'Panes artesanales de masa madre cubiertos de semillas y cereales tostados',
    wholesaleNote: 'Alta retención de humedad hasta 5 días',
    isHomeHighlight: true,
  },
  {
    id: 'focaccia-madre',
    name: 'Focaccia Romero',
    category: 'Especiales',
    weight: '1.2 kg',
    fermentation: '36h frío',
    price: 14.0,
    description:
      'Placa de alta hidratación (82%) con aceite de oliva virgen extra, romero fresco y escamas de sal.',
    image: '/src/assets/images/recipe_focaccia_oliva_1794950799597.jpg',
    imageAlt: 'Focaccia dorada de masa madre con romero fresco y aceite de oliva',
    wholesaleNote: 'Rinde 12 porciones para sándwiches gourmet',
    isHomeHighlight: true,
  },
  {
    id: 'ciabatta-artesanal',
    name: 'Ciabatta Rústica',
    category: 'Clásicos',
    weight: '4 × 280 g',
    fermentation: '36h frío',
    price: 10.5,
    description:
      'Alveolado generoso y corteza fina enharinada gracias a su alta hidratación y reposo en bloque.',
    image: '/src/assets/images/product_ciabatta_cristal_1794953149629.jpg',
    imageAlt: 'Ciabatta artesanal cortada por la mitad mostrando grandes alveolos de masa madre',
    wholesaleNote: 'Formato estrella para paninis y bocadillos',
  },
  {
    id: 'pan-de-cristal',
    name: 'Pan de Cristal',
    category: 'Especiales',
    weight: '4 × 220 g',
    fermentation: '44h frío',
    price: 11.8,
    description:
      'Corteza ultrafina vitrificada al 90% de hidratación con miga ligera y crujiente al primer mordisco.',
    image: '/src/assets/images/product_ciabatta_cristal_1794953149629.jpg',
    imageAlt: 'Pan de cristal de masa madre con corteza translúcida y miga muy aireada',
    wholesaleNote: 'Favorito para tostas con tomate y tapas frías',
  },
  {
    id: 'baguette-tradicion',
    name: 'Baguette Tradición',
    category: 'Clásicos',
    weight: '3 × 320 g',
    fermentation: '36h frío',
    price: 9.8,
    description:
      'Greñado diagonal profundo, puntas crujientes y miga crema suave con aroma a cereal tostado.',
    image: '/src/assets/images/product_baguette_tradicion_1794952599724.jpg',
    imageAlt: 'Tres baguettes artesanales de masa madre con greñado dorado sobre lino',
    wholesaleNote: 'Formato bocadillo francés y canasta de mesa',
  },
  {
    id: 'pan-de-centeno',
    name: 'Pan de Centeno',
    category: 'Clásicos',
    weight: '950 g',
    fermentation: '48h frío',
    price: 9.9,
    description:
      'Miga húmeda, compacta y aromática elaborada 100% con centeno molido a la piedra y notas malteadas.',
    image: '/src/assets/images/product_pan_centeno_1794953151042.jpg',
    imageAlt: 'Pan de centeno oscuro de masa madre con corteza agrietada enharinada',
    wholesaleNote: 'Ideal para salmón ahumado y tablas nórdicas',
  },
  {
    id: 'pain-au-levain',
    name: 'Pain au Levain',
    category: 'Clásicos',
    weight: '1 kg',
    fermentation: '42h frío',
    price: 9.2,
    description:
      'Fórmula francesa clásica con harina T65 y trigo semi-integral, corteza dorada fina y miga sedosa.',
    image: '/src/assets/images/product_pain_levain_batard_1794953150516.jpg',
    imageAlt: 'Pain au Levain francés artesanal con oreja dorada sobre lino',
    wholesaleNote: 'Estándar de mesa para bistrós y restaurantes',
  },
  {
    id: 'batard-artesanal',
    name: 'Batard Clásico',
    category: 'Clásicos',
    weight: '850 g',
    fermentation: '40h frío',
    price: 8.9,
    description:
      'Formato ovalado pensado para obtener rebanadas uniformes de principio a fin con greña de espiga.',
    image: '/src/assets/images/product_pain_levain_batard_1794953150516.jpg',
    imageAlt: 'Batard ovalado de masa madre con greñado en espiga sobre piedra',
    wholesaleNote: 'Máximo aprovechamiento por rebanada',
  },
  {
    id: 'pan-espelta',
    name: 'Pan de Espelta',
    category: 'Clásicos',
    weight: '900 g',
    fermentation: '42h frío',
    price: 9.8,
    description:
      'Cereal ancestral de espelta integral con toque suave de miel orgánica y miga dorada tierna.',
    image: '/src/assets/images/product_pan_espelta_1794954620613.jpg',
    imageAlt: 'Pan de espelta artesanal cortado por la mitad sobre piedra oscura',
    wholesaleNote: 'Alta digestibilidad y aroma delicado a nuez',
  },
  {
    id: 'pan-molde-brioche',
    name: 'Pan de Molde',
    category: 'Clásicos',
    weight: '800 g',
    fermentation: '36h frío',
    price: 10.2,
    description:
      'Molde cuadrado de masa madre y mantequilla con corteza dorada fina para sándwiches artesanales.',
    image: '/src/assets/images/product_molde_brioche_1794954621592.jpg',
    imageAlt: 'Pan de molde artesanal rebanado sobre encimera de piedra',
    wholesaleNote: 'Rebanada pareja para club sándwich y brunch',
  },
  {
    id: 'baguette-semillas',
    name: 'Baguette Semillas',
    category: 'Clásicos',
    weight: '3 × 300 g',
    fermentation: '38h frío',
    price: 10.6,
    description:
      'Baguette crujiente rebozada en ajonjolí tostado, amapola y lino dorado de fermentación lenta.',
    image: '/src/assets/images/product_baguette_tradicion_1794952599724.jpg',
    imageAlt: 'Baguettes artesanales horneadas sobre lino de obrador',
    wholesaleNote: 'Textura extra crocante para bocadillos fríos',
  },
  {
    id: 'hogaza-kalamata-romero',
    name: 'Pan Kalamata',
    category: 'Especiales',
    weight: '950 g',
    fermentation: '38h frío',
    price: 10.5,
    description:
      'Aceitunas griegas kalamata troceadas a mano, romero fresco y aceite de oliva virgen extra.',
    image: '/src/assets/images/product_hogaza_semillas_1794950798196.jpg',
    imageAlt: 'Hogaza especial de masa madre con aceitunas kalamata y romero',
    wholesaleNote: 'Favorita para cartas de tapas, quesos y vinos',
  },
  {
    id: 'hogaza-nueces-pasas',
    name: 'Hogaza Nueces',
    category: 'Especiales',
    weight: '900 g',
    fermentation: '40h frío',
    price: 11.0,
    description:
      'Trigo integral y centeno enriquecido con nueces tostadas de nogal y pasas dulces maceradas.',
    image: '/src/assets/images/product_hogaza_nueces_1794952599572.jpg',
    imageAlt: 'Hogaza de masa madre con nueces tostadas y pasas cortada en rebanadas',
    wholesaleNote: 'Maridaje clásico con quesos curados y brunch',
  },
  {
    id: 'pan-ajo-confitado',
    name: 'Pan Ajo Confitado',
    category: 'Especiales',
    weight: '850 g',
    fermentation: '38h frío',
    price: 10.8,
    description:
      'Dientes de ajo asados lentamente en aceite de oliva y tomillo fresco envueltos en miga cremosa.',
    image: '/src/assets/images/product_ajo_confitado_1794954621603.jpg',
    imageAlt: 'Hogaza artesanal con dientes de ajo confitados y tomillo sobre tabla de madera',
    wholesaleNote: 'Perfecto para acompañar carnes, sopas y pastas',
  },
  {
    id: 'brioche-burger-mayor',
    name: 'Brioche Burger',
    category: 'Especiales',
    weight: 'Pack ×6 (780 g)',
    fermentation: '38h frío',
    price: 12.5,
    description:
      'Bollos elásticos de mantequilla y masa madre dulce con sésamo que soportan salsas sin romperse.',
    image: '/src/assets/images/product_brioche_burger_1794952601798.jpg',
    imageAlt: 'Seis bollos de brioche de masa madre con sésamo dorado',
    wholesaleNote: 'Diseñado para smash burgers y hamburgueserías',
  },
  {
    id: 'bolleria-madre-caja',
    name: 'Croissant Madre',
    category: 'Dulces',
    weight: 'Caja ×4 uds',
    fermentation: '48h laminado',
    price: 13.5,
    description:
      'Hojaldre crujiente fermentado únicamente con masa madre dulce y mantequilla francesa AOP.',
    image: '/src/assets/images/product_bolleria_madre_1794950799258.jpg',
    imageAlt: 'Croissants laminados de masa madre sobre papel pergamino',
    wholesaleNote: 'Horneado diario 05:30 para barras de café',
  },
  {
    id: 'nudo-cardamomo',
    name: 'Nudo Cardamomo',
    category: 'Dulces',
    weight: 'Caja ×4 uds',
    fermentation: '48h laminado',
    price: 12.0,
    description:
      'Masa brioche trenzada con cardamomo verde recién molido, mantequilla tostada y azúcar perlado.',
    image: '/src/assets/images/product_bolleria_madre_1794950799258.jpg',
    imageAlt: 'Nudos de cardamomo artesanales recién horneados',
    wholesaleNote: 'Acompañante ideal de espresso y filtrados',
  },
];

export const ALL_CATALOG_ITEMS: Product[] = [...PRODUCTS, STARTER_KIT];

export const HOME_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Mateo Valdivia',
    role: 'Jefe de Cocina · Bistro Terraza Norte',
    rating: 5,
    productTag: 'Pain au Levain & Batard · Mayorista',
    quote:
      'Las mermas de tostadas bajaron a cero. La corteza mantiene el crunch real y la miga sigue tierna hasta el tercer día de servicio.',
  },
  {
    id: 'rev-2',
    author: 'Camila Roldán',
    role: 'Fundadora · Bruma Café de Especialidad',
    rating: 5,
    productTag: 'Ciabatta, Focaccia & Bollería',
    quote:
      'Llegan puntuales cada madrugada directamente desde su obrador. Nuestros clientes preguntan todos los días por el pan de cristal y los croissants.',
  },
  {
    id: 'rev-3',
    author: 'Daniela Santoro',
    role: 'Panadera casera · Cliente del Kit',
    rating: 5,
    productTag: 'Kit Cultivo Madre + Guía',
    quote:
      'Nunca había logrado una oreja abierta en casa. Con la cepa viva y la tabla de porcentajes de la guía, mi segundo pan de campaña salió espectacular.',
  },
];

export const STARTER_REVIEWS: ReviewItem[] = [
  {
    id: 'srev-1',
    author: 'Javier Ibarra',
    role: 'Compró el Kit Cultivo + Guía',
    rating: 5,
    productTag: 'Cepa Activa 2019',
    quote:
      'Al primer refresco triplicó el volumen en menos de 4 horas. Tener la guía impresa en la cocina evita estar buscando fórmulas confusas.',
  },
  {
    id: 'srev-2',
    author: 'Lucía Serrano',
    role: 'Chef de Partida · Restaurante Raíz',
    rating: 5,
    productTag: 'Soporte de Obrador',
    quote:
      'Empezamos con el kit para hacer pruebas de carta y terminamos pidiendo 40 panes semanales al mayor. El equilibrio láctico es impecable.',
  },
  {
    id: 'srev-3',
    author: 'Andrés Mendoza',
    role: 'Aficionado al pan artesanal',
    rating: 5,
    productTag: 'Guía de 4 Pasos',
    quote:
      'Lo que más valoro es que el cultivo llega vivo en su frasco, no en polvo. En dos días ya tenía mi primer batard crujiente enfriando en rejilla.',
  },
];

export const ORDER_FAQS: FaqItem[] = [
  {
    question: '¿Tienen tienda física para comprar directamente?',
    answer:
      'No, trabajamos exclusivamente bajo pedido online y despacho directo desde nuestro obrador central (sin tienda física al público). Así garantizamos que cada pieza salga recién horneada hacia tu local o domicilio sin mermas de vitrina.',
  },
  {
    question: '¿Cómo se activa el 15% de descuento mayorista?',
    answer:
      'Al reunir 10 o más unidades en tu carrito (puedes combinar hogazas, ciabattas, pan de cristal, focaccias o bollería), el sistema descuenta automáticamente el 15% del subtotal antes de confirmar el pedido.',
  },
  {
    question: '¿Con cuánta anticipación debo pedir para reparto al día siguiente?',
    answer:
      'Como nuestras masas fermentan entre 36 y 48 horas, recibimos pedidos para el día siguiente hasta las 16:00. Para pedidos recurrentes de restaurantes y negocios fijamos una pauta semanal.',
  },
  {
    question: '¿Se puede congelar el pan sin perder el crunch?',
    answer:
      'Sí. Puedes congelar las hogazas enteras o ya rebanadas hasta 60 días. Para recuperar la corteza crujiente original, hornea la pieza 6 minutos a 200 °C con el horno precalentado.',
  },
];

export const STARTER_FAQS: FaqItem[] = [
  {
    question: '¿Qué hago si aparece una capa de líquido grisáceo o alcohol arriba?',
    answer:
      'Es totalmente normal cuando el cultivo tiene hambre ("hooch"). Solo retira el líquido con una cuchara o mézclalo si es poco, y realiza un refresco 1:2:2 con harina y agua tibia.',
  },
  {
    question: '¿Cuánto tiempo dura el cultivo en la nevera sin alimentarlo?',
    answer:
      'En refrigeración a 4 °C se mantiene sano entre 10 y 14 días sin refrescos. Cuando quieras hornear, sácalo la noche anterior y haz dos refrescos seguidos a 25 °C.',
  },
  {
    question: '¿Cómo sé con certeza que la masa madre está lista para amasar?',
    answer:
      'Debe haber duplicado o triplicado su volumen, presentar una cúpula ligeramente abombada llena de burbujas finas y tener un aroma fresco a yogur y manzana verde.',
  },
];

export const STARTER_STEPS: StarterStep[] = [
  {
    number: '01.',
    title: 'Alimentar y activar el fermento',
    duration: 'Día 1 · 5 min',
    description:
      'Mezcla 30 g de tu cultivo vivo con 60 g de agua filtrada tibia (26 °C) y 60 g de harina de fuerza sin blanquear hasta obtener una crema homogénea.',
  },
  {
    number: '02.',
    title: 'Observar el pico de actividad',
    duration: '4 a 5 horas',
    description:
      'Deja reposar tapado con el lino a temperatura ambiente (24–26 °C). Cuando duplique o triplique su volumen con cúpula aireada, está listo para amasar.',
  },
  {
    number: '03.',
    title: 'Autólisis y serie de pliegues',
    duration: '3 horas en bloque',
    description:
      'Integra la masa madre al 20% sobre el peso total de harina. Realiza 4 pliegues suaves en el bol cada 30 minutos para desarrollar gluten sin amasado agresivo.',
  },
  {
    number: '04.',
    title: 'Fermentación en frío y greñado',
    duration: '18–36h a 4 °C',
    description:
      'Forma con tensión en banetón enharinado, refrigera toda la noche, greña con cuchilla a 35° y hornea a 250 °C con vapor los primeros 20 minutos.',
  },
];

export const RECIPES: Recipe[] = [
  {
    id: 'receta-pan-campana',
    title: 'Pan de Campaña',
    category: 'Clásicos',
    totalTime: '40h frío',
    hydration: '78% hidratación',
    yieldLabel: '1 hogaza de 950 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_hogaza_clasica_1794950798792.jpg',
    imageAlt: 'Pan de Campaña de masa madre cortado por la mitad mostrando miga abierta',
    summary:
      'Nuestra fórmula madre de obrador: equilibrio perfecto entre harina panadera blanca, trigo molido a la piedra y centeno aromático.',
    ingredients: [
      { name: 'Harina de fuerza panadera (T65)', percentage: 80, gramsPerUnit: 400 },
      { name: 'Harina integral de trigo a la piedra', percentage: 15, gramsPerUnit: 75 },
      { name: 'Harina de centeno integral', percentage: 5, gramsPerUnit: 25 },
      { name: 'Agua filtrada (26 °C)', percentage: 78, gramsPerUnit: 390 },
      { name: 'Cultivo madre activo al pico', percentage: 20, gramsPerUnit: 100 },
      { name: 'Sal marina fina', percentage: 2.2, gramsPerUnit: 11 },
    ],
    steps: [
      'Autólisis: Mezcla las tres harinas con 360 g de agua y deja reposar 45 minutos tapado.',
      'Incorporación: Añade los 100 g de cultivo madre activo y pellizca 3 minutos. Reposa 20 minutos e integra la sal con los 30 g de agua restantes.',
      'Fermentación en bloque: Mantén a 25 °C durante 3.5 a 4 horas realizando 4 series de pliegues cada 35 minutos.',
      'Formado: Preforma en bola, reposa 20 minutos y tensa en banetón enharinado.',
      'Horneado: Refrigera a 4 °C entre 18 y 36 horas. Greña y hornea en olla precalentada a 255 °C (20 min tapado + 22 min a 225 °C).',
    ],
  },
  {
    id: 'receta-pan-semillas',
    title: 'Pan de Semillas',
    category: 'Clásicos',
    totalTime: '42h frío',
    hydration: '80% hidratación',
    yieldLabel: '1 hogaza de 900 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_hogaza_semillas_1794950798196.jpg',
    imageAlt: 'Panes artesanales de masa madre cubiertos de semillas y cereales tostados',
    summary:
      'Miga húmeda y aromática gracias al remojo previo (soaker) de sésamo, lino dorado, girasol y copos de avena tostados.',
    ingredients: [
      { name: 'Harina panadera de fuerza', percentage: 70, gramsPerUnit: 350 },
      { name: 'Harina integral de trigo', percentage: 30, gramsPerUnit: 150 },
      { name: 'Agua filtrada (masa)', percentage: 80, gramsPerUnit: 400 },
      { name: 'Mix de semillas tostadas + agua remojo (1:1)', percentage: 24, gramsPerUnit: 120 },
      { name: 'Cultivo madre activo', percentage: 20, gramsPerUnit: 100 },
      { name: 'Sal marina fina', percentage: 2.2, gramsPerUnit: 11 },
    ],
    steps: [
      'Tuesta ligeramente las semillas en sartén seca e hidrátalas con su mismo peso en agua tibia 2 horas antes.',
      'Haz autólisis de harinas y agua 45 minutos, luego incorpora el cultivo madre y a los 20 minutos la sal.',
      'Integra las semillas hidratadas mediante laminado sobre la mesa antes del primer pliegue en bol.',
      'Realiza 4 pliegues cada 30 minutos a 25 °C hasta lograr 40% de crecimiento y forma pasando el lomo por avena.',
      'Fermenta en frío 18–24h a 4 °C y hornea a 250 °C con vapor inicial 20 minutos y otros 22 minutos a 220 °C.',
    ],
  },
  {
    id: 'receta-focaccia-romero',
    title: 'Focaccia Romero',
    category: 'Especiales',
    totalTime: '36h frío',
    hydration: '82% hidratación',
    yieldLabel: '1 placa de 1.2 kg',
    unitLabel: 'placa',
    image: '/src/assets/images/recipe_focaccia_oliva_1794950799597.jpg',
    imageAlt: 'Focaccia dorada de masa madre con romero fresco y aceite de oliva',
    summary:
      'Miga sedosa con grandes burbujas internas y base crujiente en aceite de oliva virgen extra, sin levadura comercial.',
    ingredients: [
      { name: 'Harina de gran fuerza (W300+)', percentage: 100, gramsPerUnit: 550 },
      { name: 'Agua filtrada tibia', percentage: 82, gramsPerUnit: 451 },
      { name: 'Cultivo madre activo líquido', percentage: 22, gramsPerUnit: 121 },
      { name: 'Aceite de oliva virgen extra', percentage: 6, gramsPerUnit: 33 },
      { name: 'Sal marina en escamas + romero fresco', percentage: 2.4, gramsPerUnit: 13 },
    ],
    steps: [
      'Disuelve el cultivo madre en el agua, añade la harina y mezcla hasta hidratar sin grumos. Reposa 30 minutos.',
      'Incorpora la sal y después el aceite de oliva poco a poco mediante pliegues en bol.',
      'Realiza 4 pliegues cada 30 minutos. Pasa a una bandeja bien aceitada y lleva al frío (4 °C) 18–24 horas.',
      'Saca la bandeja 3 horas antes de hornear hasta que alcance temperatura ambiente y llene las esquinas.',
      'Rocía con salmuera ligera, hunde los dedos con firmeza, corona con romero y escamas de sal. Hornea 24 min a 235 °C.',
    ],
  },
  {
    id: 'receta-ciabatta-rustica',
    title: 'Ciabatta Rústica',
    category: 'Clásicos',
    totalTime: '36h frío',
    hydration: '84% hidratación',
    yieldLabel: '4 piezas de 280 g',
    unitLabel: 'lote (×4 uds)',
    image: '/src/assets/images/product_ciabatta_cristal_1794953149629.jpg',
    imageAlt: 'Ciabatta artesanal cortada por la mitad mostrando grandes alveolos de masa madre',
    summary:
      'Alveolado abierto e irregular sin amasado agresivo, fermentada en bloque rectangular y cortada con rasqueta.',
    ingredients: [
      { name: 'Harina de fuerza W300', percentage: 100, gramsPerUnit: 560 },
      { name: 'Agua fría (bassinage en 2 tiempos)', percentage: 84, gramsPerUnit: 470 },
      { name: 'Cultivo madre activo', percentage: 20, gramsPerUnit: 112 },
      { name: 'Aceite de oliva virgen extra', percentage: 3, gramsPerUnit: 17 },
      { name: 'Sal marina fina', percentage: 2.1, gramsPerUnit: 12 },
    ],
    steps: [
      'Mezcla harina con 420 g de agua en autólisis 1 hora. Incorpora cultivo madre y agrega los 50 g de agua finales poco a poco.',
      'Añade sal y aceite con amasado suave hasta que la masa se despegue de las paredes.',
      'Realiza 4 pliegues (coil folds) cada 30 minutos en cubeta aceitada y refrigera 18h a 4 °C.',
      'Vuelca con cuidado sobre mesa generosamente enharinada, desgasifica lo mínimo y corta 4 rectángulos con rasqueta.',
      'Reposa 45 min tapados en tela y hornea a 250 °C con vapor intenso durante 22 minutos sobre piedra.',
    ],
  },
  {
    id: 'receta-pan-cristal',
    title: 'Pan de Cristal',
    category: 'Especiales',
    totalTime: '44h frío',
    hydration: '90% hidratación',
    yieldLabel: '4 piezas de 220 g',
    unitLabel: 'lote (×4 uds)',
    image: '/src/assets/images/product_ciabatta_cristal_1794953149629.jpg',
    imageAlt: 'Pan de cristal de masa madre con corteza translúcida y miga muy aireada',
    summary:
      'Técnica de doble hidratación al 90% para conseguir corteza ultrafina vitrificada y miga prácticamente hueca.',
    ingredients: [
      { name: 'Harina de gran fuerza W340+', percentage: 100, gramsPerUnit: 450 },
      { name: 'Agua total (70% inicial + 20% bassinage)', percentage: 90, gramsPerUnit: 405 },
      { name: 'Cultivo madre líquido al 100%', percentage: 22, gramsPerUnit: 99 },
      { name: 'Sal marina fina', percentage: 2.2, gramsPerUnit: 10 },
    ],
    steps: [
      'Amasa harina con 70% de agua y el cultivo madre 8 minutos hasta desarrollar buena red de gluten.',
      'Incorpora la sal y luego agrega el 20% de agua restante hilo a hilo hasta que la masa brille como seda.',
      'Realiza 5 pliegues suaves cada 25 minutos y lleva a fermentación controlada en frío 24 horas.',
      'Divide con rasqueta sobre abundante sémola fina sin doblar la masa para conservar los gases.',
      'Hornea sobre piedra precalentada a 255 °C con mucho vapor inicial durante 20 minutos.',
    ],
  },
  {
    id: 'receta-baguette-tradicion',
    title: 'Baguette Tradición',
    category: 'Clásicos',
    totalTime: '36h frío',
    hydration: '73% hidratación',
    yieldLabel: '3 baguettes de 320 g',
    unitLabel: 'lote (×3 uds)',
    image: '/src/assets/images/product_baguette_tradicion_1794952599724.jpg',
    imageAlt: 'Tres baguettes artesanales de masa madre con greñado dorado sobre lino',
    summary:
      'Greñado solapado clásico de boulangerie con puntas afiladas, corteza fina dorada y miga color crema.',
    ingredients: [
      { name: 'Harina francesa T65', percentage: 100, gramsPerUnit: 540 },
      { name: 'Agua filtrada fresca', percentage: 73, gramsPerUnit: 394 },
      { name: 'Cultivo madre joven (pico reciente)', percentage: 18, gramsPerUnit: 97 },
      { name: 'Sal fina marina', percentage: 2, gramsPerUnit: 11 },
    ],
    steps: [
      'Autólisis de harina y agua durante 60 minutos para favorecer extensibilidad sin exceso de tenacidad.',
      'Añade el cultivo madre y la sal; mezcla 4 minutos y haz 3 pliegues espaciados cada 40 minutos.',
      'Fermenta en frío 18 horas a 4 °C. Divide en 3 piezas de 320 g, preforma en cilindros y reposa 20 minutos.',
      'Forma barras de 50 cm sellando con el talón de la mano y colócalas sobre couche de lino plegado.',
      'Greña 5 cortes casi paralelos al eje y hornea con vapor a 250 °C durante 21 minutos.',
    ],
  },
  {
    id: 'receta-pan-centeno',
    title: 'Pan de Centeno',
    category: 'Clásicos',
    totalTime: '48h frío',
    hydration: '82% hidratación',
    yieldLabel: '1 molde de 950 g',
    unitLabel: 'pieza',
    image: '/src/assets/images/product_pan_centeno_1794953151042.jpg',
    imageAlt: 'Pan de centeno oscuro de masa madre con corteza agrietada enharinada',
    summary:
      'Fórmula nórdica 100% centeno molido a la piedra con cultivo puro de centeno y reposo post-horneado de 24h.',
    ingredients: [
      { name: 'Harina de centeno integral 100%', percentage: 100, gramsPerUnit: 500 },
      { name: 'Agua caliente (45 °C)', percentage: 82, gramsPerUnit: 410 },
      { name: 'Masa madre de centeno activa', percentage: 30, gramsPerUnit: 150 },
      { name: 'Melaza o miel oscura (opcional)', percentage: 3, gramsPerUnit: 15 },
      { name: 'Sal marina fina', percentage: 2.2, gramsPerUnit: 11 },
    ],
    steps: [
      'Refresca tu cultivo con centeno integral 6 horas antes para acidificar lo justo y evitar miga gomosa.',
      'Mezcla todos los ingredientes en bol durante 4 minutos (el centeno no forma red de gluten como el trigo).',
      'Reposa 60 minutos a 27 °C y pasa la masa a un molde rectangular engrasado alisando con mano mojada.',
      'Fermenta 2.5 a 3 horas hasta que aparezcan pequeñas grietas en la superficie enharinada.',
      'Hornea 15 min a 240 °C y 45 min a 195 °C. Envuelve en paño de lino 24h antes de rebanar.',
    ],
  },
  {
    id: 'receta-pain-au-levain',
    title: 'Pain au Levain',
    category: 'Clásicos',
    totalTime: '42h frío',
    hydration: '76% hidratación',
    yieldLabel: '1 hogaza de 1 kg',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_pain_levain_batard_1794953150516.jpg',
    imageAlt: 'Pain au Levain francés artesanal con oreja dorada sobre lino',
    summary:
      'El estándar gastronómico francés: harina T65 con 10% integral, fermentación lenta y sabor láctico limpio.',
    ingredients: [
      { name: 'Harina T65 tradicional', percentage: 90, gramsPerUnit: 495 },
      { name: 'Harina integral T110', percentage: 10, gramsPerUnit: 55 },
      { name: 'Agua filtrada (24 °C)', percentage: 76, gramsPerUnit: 418 },
      { name: 'Levain líquido al pico', percentage: 20, gramsPerUnit: 110 },
      { name: 'Sal marina fina', percentage: 2.1, gramsPerUnit: 11.5 },
    ],
    steps: [
      'Autólisis de harinas y 390 g de agua durante 45 minutos.',
      'Integra el levain y espera 15 minutos antes de incorporar la sal con los últimos 28 g de agua.',
      'Fermenta en bloque 4 horas a 24 °C haciendo 4 pliegues suaves cada 35 minutos.',
      'Preforma en bola, reposa 25 min, forma boule tenso en banetón y refrigera 20h a 4 °C.',
      'Greña en ángulo de 30° y hornea a 250 °C con vapor 20 min + 22 min a 225 °C.',
    ],
  },
  {
    id: 'receta-batard-clasico',
    title: 'Batard Clásico',
    category: 'Clásicos',
    totalTime: '40h frío',
    hydration: '75% hidratación',
    yieldLabel: '1 batard de 850 g',
    unitLabel: 'batard',
    image: '/src/assets/images/product_pain_levain_batard_1794953150516.jpg',
    imageAlt: 'Batard ovalado de masa madre con greñado en espiga sobre piedra',
    summary:
      'Formado ovalado de tensión progresiva para rebanadas uniformes de principio a fin y gran apertura de oreja.',
    ingredients: [
      { name: 'Harina panadera T65', percentage: 85, gramsPerUnit: 390 },
      { name: 'Harina integral fina', percentage: 15, gramsPerUnit: 70 },
      { name: 'Agua filtrada (25 °C)', percentage: 75, gramsPerUnit: 345 },
      { name: 'Cultivo madre activo', percentage: 20, gramsPerUnit: 92 },
      { name: 'Sal marina fina', percentage: 2.1, gramsPerUnit: 10 },
    ],
    steps: [
      'Mezcla harinas y agua 45 min en autólisis. Añade cultivo y sal dejando reposar 20 minutos entre sí.',
      'Realiza 4 pliegues en bloque durante 3.5 horas hasta notar la masa aireada y sedosa.',
      'Preforma suavemente en óvalo y deja relajar 20 minutos tapado sobre la mesa.',
      'Estira en rectángulo, pliega en sobre lateral y enrolla cerrando las puntas hacia un banetón ovalado.',
      'Refrigera 18h a 4 °C, realiza un único corte longitudinal curvo y hornea 38 minutos en hierro.',
    ],
  },
  {
    id: 'receta-pan-espelta',
    title: 'Pan de Espelta',
    category: 'Clásicos',
    totalTime: '42h frío',
    hydration: '72% hidratación',
    yieldLabel: '1 hogaza de 900 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_pan_espelta_1794954620613.jpg',
    imageAlt: 'Pan de espelta artesanal cortado por la mitad sobre piedra oscura',
    summary:
      'Cereal ancestral de espelta con hidratación calibrada y miel orgánica para cuidar su gluten delicado.',
    ingredients: [
      { name: 'Harina blanca de espelta', percentage: 70, gramsPerUnit: 350 },
      { name: 'Harina integral de espelta', percentage: 30, gramsPerUnit: 150 },
      { name: 'Agua filtrada fresca', percentage: 72, gramsPerUnit: 360 },
      { name: 'Cultivo madre activo', percentage: 18, gramsPerUnit: 90 },
      { name: 'Miel orgánica de flores', percentage: 2, gramsPerUnit: 10 },
      { name: 'Sal marina fina', percentage: 2, gramsPerUnit: 10 },
    ],
    steps: [
      'Evita autólisis largas con la espelta: mezcla harinas, agua, cultivo madre y miel solo 15 minutos antes de la sal.',
      'Realiza 3 pliegues muy delicados cada 30 minutos (la espelta pierde estructura si se sobretrabaja).',
      'Acorta la fermentación en bloque a 2.5–3 horas hasta notar un 30% de aumento de volumen.',
      'Forma con tensión suave y refrigera 16 horas a 4 °C en banetón enharinado con arroz.',
      'Hornea a 245 °C tapado 18 minutos y destapa 20 minutos más a 215 °C.',
    ],
  },
  {
    id: 'receta-pan-molde',
    title: 'Pan de Molde',
    category: 'Clásicos',
    totalTime: '36h frío',
    hydration: '66% hidratación',
    yieldLabel: '1 molde de 800 g',
    unitLabel: 'molde',
    image: '/src/assets/images/product_molde_brioche_1794954621592.jpg',
    imageAlt: 'Pan de molde artesanal rebanado sobre encimera de piedra',
    summary:
      'Miga tierna de corte uniforme enriquecida con mantequilla y leche entera fermentada solo con masa madre.',
    ingredients: [
      { name: 'Harina panadera de fuerza', percentage: 100, gramsPerUnit: 450 },
      { name: 'Leche entera + agua (50/50)', percentage: 66, gramsPerUnit: 297 },
      { name: 'Cultivo madre dulce refrescado', percentage: 20, gramsPerUnit: 90 },
      { name: 'Mantequilla pomada 82% MG', percentage: 8, gramsPerUnit: 36 },
      { name: 'Miel o azúcar + sal fina', percentage: 4, gramsPerUnit: 18 },
    ],
    steps: [
      'Amasa harina, líquidos, cultivo madre y miel 6 minutos hasta obtener textura lisa.',
      'Añade la sal y la mantequilla en dados poco a poco hasta que quede completamente elástica.',
      'Fermenta en bloque 3 horas haciendo 2 pliegues; refrigera toda la noche a 4 °C.',
      'Desgasifica suavemente, enrolla como cilindro firme y coloca dentro de molde pullman engrasado.',
      'Fermenta a 26 °C hasta alcanzar 1 cm bajo el borde (4–5h) y hornea 35 minutos a 195 °C.',
    ],
  },
  {
    id: 'receta-baguette-semillas',
    title: 'Baguette Semillas',
    category: 'Clásicos',
    totalTime: '38h frío',
    hydration: '74% hidratación',
    yieldLabel: '3 baguettes de 300 g',
    unitLabel: 'lote (×3 uds)',
    image: '/src/assets/images/product_baguette_tradicion_1794952599724.jpg',
    imageAlt: 'Baguettes artesanales horneadas sobre lino de obrador',
    summary:
      'Barra francesa clásica con mezcla crujiente de ajonjolí tostado, amapola y linaza dorada adherida a la corteza.',
    ingredients: [
      { name: 'Harina francesa T65', percentage: 90, gramsPerUnit: 450 },
      { name: 'Harina semi-integral T80', percentage: 10, gramsPerUnit: 50 },
      { name: 'Agua filtrada', percentage: 74, gramsPerUnit: 370 },
      { name: 'Cultivo madre activo', percentage: 18, gramsPerUnit: 90 },
      { name: 'Mix ajonjolí, amapola y lino (rebozado)', percentage: 12, gramsPerUnit: 60 },
      { name: 'Sal marina fina', percentage: 2, gramsPerUnit: 10 },
    ],
    steps: [
      'Realiza autólisis de harinas y agua 45 minutos, luego incorpora cultivo madre y sal.',
      'Haz 3 series de pliegues cada 35 minutos y refrigera el bloque 18 horas a 4 °C.',
      'Divide en 3 piezas, preforma y tras 20 min forma las barras de 48 cm.',
      'Humedece ligeramente la parte superior con paño mojado y ruédalas sobre la cama de semillas.',
      'Deja levar 45 min en couche, greña con corte firme y hornea con vapor a 250 °C durante 20 minutos.',
    ],
  },
  {
    id: 'receta-pan-kalamata',
    title: 'Pan Kalamata',
    category: 'Especiales',
    totalTime: '38h frío',
    hydration: '76% hidratación',
    yieldLabel: '1 hogaza de 950 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_hogaza_semillas_1794950798196.jpg',
    imageAlt: 'Hogaza especial de masa madre con aceitunas kalamata y romero',
    summary:
      'Hogaza mediterránea aromática con aceitunas griegas kalamata escurridas, romero fresco y aceite de oliva.',
    ingredients: [
      { name: 'Harina panadera T65', percentage: 85, gramsPerUnit: 425 },
      { name: 'Sémola rimacinata o integral', percentage: 15, gramsPerUnit: 75 },
      { name: 'Agua filtrada (25 °C)', percentage: 76, gramsPerUnit: 380 },
      { name: 'Aceitunas kalamata picadas + romero', percentage: 22, gramsPerUnit: 110 },
      { name: 'Cultivo madre activo', percentage: 20, gramsPerUnit: 100 },
      { name: 'Sal marina (reducida por aceituna)', percentage: 1.8, gramsPerUnit: 9 },
    ],
    steps: [
      'Escurre y seca bien las aceitunas kalamata picadas sobre papel para no teñir en exceso la miga.',
      'Haz autólisis 45 min, incorpora cultivo madre y sal reducida (1.8%).',
      'Durante el segundo pliegue mediante laminado sobre mesa, reparte aceitunas y hojas frescas de romero.',
      'Completa 2 pliegues más cada 35 minutos, forma en boule y lleva a frío 18 horas.',
      'Hornea en olla precalentada a 250 °C (20 min tapado + 20 min destapado a 220 °C).',
    ],
  },
  {
    id: 'receta-hogaza-nueces',
    title: 'Hogaza Nueces',
    category: 'Especiales',
    totalTime: '40h frío',
    hydration: '77% hidratación',
    yieldLabel: '1 hogaza de 900 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_hogaza_nueces_1794952599572.jpg',
    imageAlt: 'Hogaza de masa madre con nueces tostadas y pasas cortada en rebanadas',
    summary:
      'Base de trigo integral y centeno con nueces tostadas al horno y pasas dulces previamente hidratadas.',
    ingredients: [
      { name: 'Harina de fuerza panadera', percentage: 75, gramsPerUnit: 360 },
      { name: 'Harina integral + centeno (15/10)', percentage: 25, gramsPerUnit: 120 },
      { name: 'Agua filtrada', percentage: 77, gramsPerUnit: 370 },
      { name: 'Nueces tostadas + pasas maceradas', percentage: 28, gramsPerUnit: 135 },
      { name: 'Cultivo madre activo', percentage: 20, gramsPerUnit: 96 },
      { name: 'Sal marina fina', percentage: 2.1, gramsPerUnit: 10 },
    ],
    steps: [
      'Tuesta las nueces 8 min a 170 °C y remoja las pasas 1 hora en agua tibia; escúrrelas por completo.',
      'Realiza autólisis de harinas y agua 45 min; incorpora fermento y sal.',
      'Integra nueces y pasas en dos capas mediante laminado suave tras los primeros 40 minutos.',
      'Completa 3 pliegues adicionales en bloque, tensa en batard y refrigera 18–24h a 4 °C.',
      'Hornea 20 min tapado a 250 °C y 20 min destapado a 215 °C (vigila el dorado por las pasas).',
    ],
  },
  {
    id: 'receta-pan-ajo-confitado',
    title: 'Pan Ajo Confitado',
    category: 'Especiales',
    totalTime: '38h frío',
    hydration: '76% hidratación',
    yieldLabel: '1 hogaza de 850 g',
    unitLabel: 'hogaza',
    image: '/src/assets/images/product_ajo_confitado_1794954621603.jpg',
    imageAlt: 'Hogaza artesanal con dientes de ajo confitados y tomillo sobre tabla de madera',
    summary:
      'Dientes de ajo confitados a fuego mínimo en oliva virgen y tomillo fresco distribuidos en una miga cremosa.',
    ingredients: [
      { name: 'Harina panadera T65', percentage: 90, gramsPerUnit: 405 },
      { name: 'Harina integral de trigo', percentage: 10, gramsPerUnit: 45 },
      { name: 'Agua filtrada', percentage: 76, gramsPerUnit: 342 },
      { name: 'Dientes de ajo confitados + tomillo fresco', percentage: 18, gramsPerUnit: 81 },
      { name: 'Aceite del confitado (suave)', percentage: 2, gramsPerUnit: 9 },
      { name: 'Cultivo madre activo + sal (2.1%)', percentage: 22.1, gramsPerUnit: 99 },
    ],
    steps: [
      'Confita 2 cabezas de ajo peladas en aceite de oliva a 95 °C durante 45 min hasta que estén tiernos como mantequilla.',
      'Realiza autólisis, incorpora cultivo madre y sal; tras el primer pliegue añade una cucharada del aceite aromático.',
      'Distribuye los dientes enteros o troceados y el tomillo durante el laminado antes del segundo pliegue.',
      'Completa 3 horas de bloque, forma boule firme sin romper los ajos superficiales y refrigera 18h.',
      'Hornea con vapor a 245 °C durante 20 min tapado y 18 min destapado a 220 °C.',
    ],
  },
  {
    id: 'receta-brioche-burger',
    title: 'Brioche Burger',
    category: 'Especiales',
    totalTime: '38h frío',
    hydration: '60% líquidos + huevo',
    yieldLabel: '6 bollos de 130 g',
    unitLabel: 'pack (×6 uds)',
    image: '/src/assets/images/product_brioche_burger_1794952601798.jpg',
    imageAlt: 'Seis bollos de brioche de masa madre con sésamo dorado',
    summary:
      'Bollos elásticos y esponjosos con fermentación lenta natural pensados para sostener jugos y salsas.',
    ingredients: [
      { name: 'Harina de gran fuerza', percentage: 100, gramsPerUnit: 420 },
      { name: 'Leche entera + huevo batido', percentage: 60, gramsPerUnit: 252 },
      { name: 'Cultivo madre dulce (50% hidr.)', percentage: 24, gramsPerUnit: 100 },
      { name: 'Mantequilla 82% MG en dados', percentage: 18, gramsPerUnit: 76 },
      { name: 'Azúcar orgánica + sal fina', percentage: 10, gramsPerUnit: 42 },
    ],
    steps: [
      'Amasa harina, leche, huevo, cultivo madre dulce y azúcar durante 6 minutos a velocidad baja-media.',
      'Añade la sal y luego la mantequilla fría en tandas hasta lograr una prueba de ventana fina.',
      'Fermenta 3.5 horas a 26 °C y lleva al frío 12 horas para manejar fácilmente la masa.',
      'Bolea 6 piezas de 130 g con base bien sellada, aplasta suavemente y fermenta 4h a 26 °C tapados.',
      'Pinta con yema + leche, espolvorea sésamo tostado y hornea 15 min a 195 °C.',
    ],
  },
  {
    id: 'receta-croissant-madre',
    title: 'Croissant Madre',
    category: 'Dulces',
    totalTime: '48h laminado',
    hydration: '52% hidratación',
    yieldLabel: '12 croissants',
    unitLabel: 'lote (×12 uds)',
    image: '/src/assets/images/product_bolleria_madre_1794950799258.jpg',
    imageAlt: 'Croissants laminados de masa madre sobre papel pergamino',
    summary:
      'Aroma profundo a mantequilla tostada AOP y fermentación natural lenta sin levadura prensada.',
    ingredients: [
      { name: 'Harina panadera T55', percentage: 100, gramsPerUnit: 500 },
      { name: 'Leche entera fría + agua (50/50)', percentage: 52, gramsPerUnit: 260 },
      { name: 'Cultivo madre dulce refrescado (50% hidr.)', percentage: 28, gramsPerUnit: 140 },
      { name: 'Azúcar orgánica de caña', percentage: 12, gramsPerUnit: 60 },
      { name: 'Mantequilla seca 84% MG (empaste)', percentage: 50, gramsPerUnit: 250 },
      { name: 'Sal fina', percentage: 2, gramsPerUnit: 10 },
    ],
    steps: [
      'Refresca tu cultivo madre dos veces seguidas con harina fuerte y 5% de azúcar para reducir acidez.',
      'Amasa el pastón 8 minutos hasta lograr membrana elástica y refrigera 12 horas a 2 °C.',
      'Prepara placa de mantequilla fría (15 °C), encierra en el pastón y da un pliegue doble y un simple con 45 min de frío entre vueltas.',
      'Estira a 4 mm, corta triángulos de 9×28 cm, enrolla sin apretar y fermenta 5–6h a 26 °C con humedad.',
      'Pinta con huevo y pizca de sal. Hornea a 200 °C durante 17 minutos hasta lograr dorado caoba.',
    ],
  },
  {
    id: 'receta-nudo-cardamomo',
    title: 'Nudo Cardamomo',
    category: 'Dulces',
    totalTime: '48h laminado',
    hydration: '56% hidratación',
    yieldLabel: '8 nudos trenzados',
    unitLabel: 'lote (×8 uds)',
    image: '/src/assets/images/product_bolleria_madre_1794950799258.jpg',
    imageAlt: 'Nudos de cardamomo artesanales recién horneados',
    summary:
      'Brioche sueco de masa madre especiado con cardamomo verde recién machacado, mantequilla tostada y azúcar perlado.',
    ingredients: [
      { name: 'Harina fuerte de trigo', percentage: 100, gramsPerUnit: 450 },
      { name: 'Leche entera infusionada con cardamomo', percentage: 56, gramsPerUnit: 252 },
      { name: 'Cultivo madre dulce al pico', percentage: 26, gramsPerUnit: 117 },
      { name: 'Mantequilla + relleno especiado', percentage: 30, gramsPerUnit: 135 },
      { name: 'Azúcar morena orgánica + sal (1.8%)', percentage: 16, gramsPerUnit: 72 },
    ],
    steps: [
      'Machaca en mortero semillas de cardamomo verde e infusiónalas con la leche tibia 20 minutos.',
      'Amasa harina, leche fría, cultivo dulce, azúcar y sal e integra la mantequilla hasta masa sedosa.',
      'Refrigera toda la noche a 4 °C. Estira en rectángulo de 4 mm y unta pasta de mantequilla, cardamomo y azúcar morena.',
      'Dobla en tercios, corta tiras de 2.5 cm, retuerce y anuda formando caracolas limpias.',
      'Fermenta 4–5 horas a 26 °C, pinta con huevo, espolvorea azúcar perlado y hornea 14 min a 200 °C.',
    ],
  },
];

