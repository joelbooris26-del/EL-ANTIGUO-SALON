export const IMAGES = {
  hero: "https://images.pexels.com/photos/10135116/pexels-photo-10135116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  interior1:
    "https://images.pexels.com/photos/30420679/pexels-photo-30420679.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  interior2:
    "https://images.pexels.com/photos/6876589/pexels-photo-6876589.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  interior3:
    "https://images.pexels.com/photos/7244274/pexels-photo-7244274.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  interior4:
    "https://images.pexels.com/photos/29109683/pexels-photo-29109683.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  chef1:
    "https://images.pexels.com/photos/4253292/pexels-photo-4253292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  chef2:
    "https://images.pexels.com/photos/4252142/pexels-photo-4252142.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  chef3:
    "https://images.pexels.com/photos/8629103/pexels-photo-8629103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  pulpo:
    "https://images.pexels.com/photos/37068830/pexels-photo-37068830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  carpaccio:
    "https://images.pexels.com/photos/36183157/pexels-photo-36183157.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  pasta:
    "https://images.pexels.com/photos/24289217/pexels-photo-24289217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  mediterraneo:
    "https://images.pexels.com/photos/33123427/pexels-photo-33123427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  steak1:
    "https://images.pexels.com/photos/18015000/pexels-photo-18015000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  steak2:
    "https://images.pexels.com/photos/34434636/pexels-photo-34434636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  steak3:
    "https://images.pexels.com/photos/31235409/pexels-photo-31235409.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  steak4:
    "https://images.pexels.com/photos/35546723/pexels-photo-35546723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dessert1:
    "https://images.pexels.com/photos/39073426/pexels-photo-39073426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dessert2:
    "https://images.pexels.com/photos/36740866/pexels-photo-36740866.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dessert3:
    "https://images.pexels.com/photos/30350315/pexels-photo-30350315.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  gourmet:
    "https://images.pexels.com/photos/34973513/pexels-photo-34973513.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export type MenuCategory = "entrantes" | "principales" | "postres";

export interface Dish {
  name: string;
  description: string;
  price: string;
  tag?: string;
}

export const MENU: Record<MenuCategory, Dish[]> = {
  entrantes: [
    { name: "Croquetas caseras", description: "Cremosas por dentro y crujientes por fuera, receta de siempre", price: "9,00 €" },
    { name: "Tabla de ibéricos", description: "Selección de embutidos ibéricos con pan de la casa", price: "18,00 €" },
    { name: "Ensalada de la huerta", description: "Verduras y brotes frescos de temporada", price: "12,50 €" },
    { name: "Revuelto de setas", description: "Setas de temporada salteadas con huevo campero", price: "14,00 €" },
  ],
  principales: [
    { name: "Cochinillo asado de Segovia", description: "Asado al horno, piel crujiente y carne melosa. Nuestro plato más emblemático", price: "25,00 €", tag: "Especialidad" },
    { name: "Judiones de La Granja", description: "Guisados a fuego lento con su sofrito tradicional", price: "16,00 €" },
    { name: "Bacalao confitado", description: "Confitado a baja temperatura en aceite de oliva virgen", price: "22,00 €" },
    { name: "Solomillo de ternera", description: "A la brasa, en su punto, con guarnición de la casa", price: "28,00 €", tag: "Recomendado" },
  ],
  postres: [
    { name: "Ponche segoviano", description: "El clásico de Segovia: bizcocho, crema y mazapán tostado", price: "7,50 €", tag: "El favorito" },
    { name: "Tarta de queso casera", description: "Horneada cada día en nuestra cocina", price: "6,50 €" },
    { name: "Helado artesanal", description: "Elaboración artesana, pregunta por los sabores del día", price: "5,00 €" },
    { name: "Fruta de temporada", description: "Selección fresca del mercado", price: "4,00 €" },
  ],
};

export const MENU_DAY = {
  price: "16,90 €",
  includes: "Pan, bebida y postre o café incluidos",
  firsts: ["Ensalada mixta de la huerta", "Sopa del día / Crema de verduras", "Macarrones gratinados de la casa"],
  seconds: ["Pollo asado con patatas", "Merluza a la romana con ensalada", "Lomo a la plancha con pimientos"],
  desserts: ["Natillas caseras", "Fruta del tiempo", "Helado (2 bolas)", "Café"],
};

export const TESTIMONIALS = [
  {
    name: "Carmen Ruiz",
    role: "Clienta habitual",
    text: "El restaurante de barrio de toda la vida pero con un nivel altísimo. El menú del día es imbatible y el trato es cercano, como en casa. El solomillo es obligatorio.",
    rating: 5,
    date: "Hace 2 semanas",
    initial: "C",
  },
  {
    name: "Javier Mendoza",
    role: "Celebró su aniversario",
    text: "Reservamos para nuestro aniversario y nos trataron de maravilla. Mesa tranquila, buen vino y un coulant de chocolate espectacular. Volveremos seguro.",
    rating: 5,
    date: "Hace 1 mes",
    initial: "J",
  },
  {
    name: "Lucía Fernández",
    role: "Comida de empresa",
    text: "Fuimos 12 personas de la oficina y todo salió perfecto. Servicio rápido pese a ser un viernes, buena relación calidad-precio y postres caseros riquísimos.",
    rating: 4,
    date: "Hace 3 semanas",
    initial: "L",
  },
];

/* ---------- Horarios reales ---------- */

/** Horario por día. Índice = Date.getDay() (0 = domingo). null = cerrado */
export const WEEK: { day: string; hours: [string, string] | null }[] = [
  { day: "Domingo", hours: null },
  { day: "Lunes", hours: ["8:00", "16:30"] },
  { day: "Martes", hours: ["8:00", "16:30"] },
  { day: "Miércoles", hours: ["8:00", "21:00"] },
  { day: "Jueves", hours: ["8:00", "21:00"] },
  { day: "Viernes", hours: ["8:00", "21:00"] },
  { day: "Sábado", hours: ["12:00", "17:00"] },
];

/** Orden de visualización empezando en lunes */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Horario agrupado para mostrar de forma compacta */
export const HOURS = [
  { day: "Lunes – Martes", time: "8:00 – 16:30" },
  { day: "Miércoles – Viernes", time: "8:00 – 21:00" },
  { day: "Sábado", time: "12:00 – 17:00" },
  { day: "Domingo", time: "Cerrado" },
];

/* ---------- Datos de contacto ---------- */
export const CONTACT = {
  street: "C. de Anabel Segura, 11",
  city: "28108 Alcobendas, Madrid",
  building: "Alba 3 Centro de Negocios",
  short: "C. de Anabel Segura 11, Alcobendas",
  phone: "910 123 456",
  email: "reservas@elantiguosalon.es",
  lat: 40.5305,
  lon: -3.6395,
};

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

export function formatHours(hours: [string, string] | null) {
  return hours ? `${hours[0]} – ${hours[1]}` : "Cerrado";
}

/** Estado actual: abierto / cerrado y próxima apertura */
export function getOpenStatus(now = new Date()) {
  const dayIdx = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = WEEK[dayIdx].hours;

  if (today && mins >= toMin(today[0]) && mins < toMin(today[1])) {
    const left = toMin(today[1]) - mins;
    return {
      open: true,
      closingSoon: left <= 45,
      label: left <= 45 ? `Cierra pronto · ${today[1]}` : `Abierto ahora · hasta las ${today[1]}`,
      today: formatHours(today),
    };
  }

  // Buscar próxima apertura
  if (today && mins < toMin(today[0])) {
    return { open: false, closingSoon: false, label: `Cerrado · abre hoy a las ${today[0]}`, today: formatHours(today) };
  }
  for (let i = 1; i <= 7; i++) {
    const idx = (dayIdx + i) % 7;
    const h = WEEK[idx].hours;
    if (h) {
      const when = i === 1 ? "mañana" : `el ${WEEK[idx].day.toLowerCase()}`;
      return { open: false, closingSoon: false, label: `Cerrado · abre ${when} a las ${h[0]}`, today: formatHours(today) };
    }
  }
  return { open: false, closingSoon: false, label: "Cerrado", today: formatHours(today) };
}

/** Franjas de reserva cada 30 min para una fecha (YYYY-MM-DD). Última reserva 1 h antes del cierre. */
export function getSlotsForDate(date: string): string[] {
  if (!date) return [];
  const [y, m, d] = date.split("-").map(Number);
  const hours = WEEK[new Date(y, m - 1, d).getDay()].hours;
  if (!hours) return [];
  const slots: string[] = [];
  for (let t = toMin(hours[0]); t <= toMin(hours[1]) - 60; t += 30) slots.push(toTime(t));
  return slots;
}
