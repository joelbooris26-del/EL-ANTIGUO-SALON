import { CONTACT, MENU, MENU_DAY, WEEK, WEEK_ORDER, formatHours, getOpenStatus, type Dish } from "../data";

export interface BotAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface BotReply {
  text: string;
  actions?: BotAction[];
  suggestions?: string[];
}

/* ---------- Utilidades ---------- */

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:()"]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (text: string, words: string[]) => words.some((w) => text.includes(w));

const DAY_WORDS: Record<string, number> = {
  domingo: 0,
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
};

const ACTIONS = {
  reservar: { label: "Reservar mesa", href: "#reservar" },
  carta: { label: "Ver la carta", href: "#carta" },
  llamar: { label: `Llamar ${CONTACT.phone}`, href: "tel:+34910123456" },
  mapa: {
    label: "Abrir en Google Maps",
    href: "https://www.google.com/maps/search/?api=1&query=C.%20de%20Anabel%20Segura%2011%2C%2028108%20Alcobendas",
    external: true,
  },
  especialidades: { label: "Ver especialidades", href: "#especialidades" },
  contacto: { label: "Ver ubicación", href: "#contacto" },
};

const ALL_DISHES: (Dish & { category: string })[] = (
  Object.keys(MENU) as (keyof typeof MENU)[]
).flatMap((cat) => MENU[cat].map((d: Dish) => ({ ...d, category: cat as string })));

const CATEGORY_LABEL: Record<string, string> = {
  entrantes: "Entrantes",
  principales: "Platos principales",
  postres: "Postres",
};

function weekList() {
  return WEEK_ORDER.map((i) => `• **${WEEK[i].day}:** ${formatHours(WEEK[i].hours)}`).join("\n");
}

function findDishes(text: string) {
  const stop = new Set(["de", "la", "el", "con", "a", "al", "del", "los", "las", "y", "en", "casa", "uds", "copa"]);
  return ALL_DISHES.filter((d) => {
    const words = norm(d.name)
      .split(" ")
      .filter((w) => w.length > 3 && !stop.has(w));
    return words.some((w) => text.includes(w));
  });
}

/* ---------- Cerebro del asistente ---------- */

export const WELCOME: BotReply = {
  text:
    "¡Hola! 👋 Soy el asistente virtual de **El Antiguo Salón**.\n\nPuedo ayudarte con el horario, la carta, el menú del día, reservas o cómo llegar. ¿En qué te ayudo?",
  suggestions: ["¿Estáis abiertos ahora?", "Menú del día", "Quiero reservar", "¿Dónde estáis?"],
};

export function getReply(input: string): BotReply {
  const t = norm(input);
  const status = getOpenStatus();

  if (!t) return { text: "¿Podrías escribir tu pregunta? 😊" };

  /* Saludos */
  if (/^(hola|buenas|buenos dias|buenas tardes|hey|holi|saludos)\b/.test(t) && t.split(" ").length <= 4) {
    return {
      text: "¡Hola! Encantado de atenderte. ¿Qué necesitas saber sobre El Antiguo Salón?",
      suggestions: ["Horario", "Especialidades", "Reservar mesa", "Menú del día"],
    };
  }

  /* Gracias / despedida */
  if (has(t, ["gracias", "genial", "perfecto", "vale ", "muy amable"]) || t === "vale" || t === "ok") {
    return {
      text: "¡A ti! Si necesitas algo más, aquí estoy. Te esperamos en El Antiguo Salón 🍽️",
      suggestions: ["Quiero reservar", "Ver la carta"],
    };
  }
  if (has(t, ["adios", "hasta luego", "chao", "nos vemos"])) {
    return { text: "¡Hasta pronto! Que tengas un gran día ☕" };
  }

  /* Abierto ahora */
  if (has(t, ["abierto", "abiertos", "abris", "abre", "cerrado", "cerrais", "cierra", "ahora"]) && !has(t, ["hora de", "a que hora"]) && !Object.keys(DAY_WORDS).some((d) => t.includes(d))) {
    const emoji = status.open ? "🟢" : "🔴";
    return {
      text: `${emoji} ${status.label}.\n\nHoy nuestro horario es: **${status.today}**.`,
      actions: status.open ? [ACTIONS.reservar, ACTIONS.mapa] : [ACTIONS.reservar],
      suggestions: ["Horario de toda la semana", "¿Dónde estáis?"],
    };
  }

  /* Horario de un día concreto */
  const dayMatch = Object.keys(DAY_WORDS).find((d) => t.includes(d));
  const asksTomorrow = t.includes("manana") && !t.includes("por la manana");
  if (dayMatch || asksTomorrow || (t.includes("hoy") && has(t, ["hora", "horario", "abr", "cierr"]))) {
    const idx = dayMatch !== undefined ? DAY_WORDS[dayMatch] : asksTomorrow ? (new Date().getDay() + 1) % 7 : new Date().getDay();
    const day = WEEK[idx];
    const label = dayMatch ? `El **${day.day.toLowerCase()}**` : asksTomorrow ? `Mañana (**${day.day.toLowerCase()}**)` : `Hoy (**${day.day.toLowerCase()}**)`;
    return {
      text: day.hours
        ? `${label} abrimos de **${day.hours[0]} a ${day.hours[1]}**.`
        : `${label} estamos **cerrados** por descanso. ¡Te esperamos el lunes desde las 8:00!`,
      actions: day.hours ? [ACTIONS.reservar] : undefined,
      suggestions: ["Horario de toda la semana", "Menú del día"],
    };
  }

  /* Horario general */
  if (has(t, ["horario", "hora", "horas", "cuando abr", "a que hora"])) {
    return {
      text: `Este es nuestro horario:\n\n${weekList()}\n\n${status.open ? "🟢" : "🔴"} Ahora mismo: ${status.label.toLowerCase()}.`,
      actions: [ACTIONS.reservar],
      suggestions: ["¿Hacéis desayunos?", "Menú del día"],
    };
  }

  /* Ubicación */
  if (has(t, ["donde", "direccion", "ubicacion", "llegar", "calle", "mapa", "estais", "situado", "alcobendas", "alba"])) {
    return {
      text: `📍 Estamos en **${CONTACT.street}, ${CONTACT.city}**.\n\nNos encontrarás dentro de **${CONTACT.building}**.`,
      actions: [ACTIONS.mapa, ACTIONS.contacto],
      suggestions: ["¿Hay parking?", "Horario"],
    };
  }

  /* Parking */
  if (has(t, ["parking", "aparcar", "aparcamiento", "coche"])) {
    return {
      text: `Al estar en **${CONTACT.building}**, hay aparcamiento en la zona y en los alrededores de la C. de Anabel Segura. Si vienes en hora punta, te recomendamos llegar con unos minutos de margen 🚗`,
      actions: [ACTIONS.mapa],
    };
  }

  /* Reservas */
  if (has(t, ["reserv", "mesa", "apartar", "sitio para"])) {
    const groups = has(t, ["grupo", "personas", "empresa", "evento", "cumple"]);
    return {
      text: groups
        ? `¡Claro! Para grupos de más de 8 personas o eventos de empresa te recomendamos llamarnos al **${CONTACT.phone}** y te preparamos un menú cerrado.`
        : "¡Perfecto! Puedes reservar en menos de un minuto con nuestro formulario. Solo necesitas nombre, teléfono, fecha y hora. Te confirmamos enseguida ✅\n\nRecuerda: los **domingos estamos cerrados**.",
      actions: [ACTIONS.reservar, ACTIONS.llamar],
    };
  }

  /* Menú del día */
  if (has(t, ["menu del dia", "menu diario", "menu de hoy", "del dia", "menu"]) && !has(t, ["carta"])) {
    return {
      text:
        `🍽️ **Menú del día — ${MENU_DAY.price}**\n_De lunes a viernes, 13:00 – 16:00_\n\n` +
        `**Primeros:** ${MENU_DAY.firsts.join(", ")}.\n\n` +
        `**Segundos:** ${MENU_DAY.seconds.join(", ")}.\n\n` +
        `**Postre o café:** ${MENU_DAY.desserts.join(", ")}.\n\n${MENU_DAY.includes}.`,
      actions: [ACTIONS.reservar, ACTIONS.carta],
      suggestions: ["Especialidades de la casa", "¿Tenéis opciones sin gluten?"],
    };
  }

  /* Desayunos */
  if (has(t, ["desayun", "cafe", "tostada", "cruasan", "croissant", "churro"])) {
    return {
      text: "☕ ¡Sí! Servimos desayunos **de lunes a viernes desde las 8:00** y los sábados desde las 12:00.\n\nCafé de tueste natural, tostadas, zumo natural, bocadillos y bollería. Perfecto antes de entrar a la oficina.",
      suggestions: ["Horario", "Menú del día"],
    };
  }

  /* Alérgenos / dietas */
  if (has(t, ["gluten", "celiac", "vegano", "vegana", "vegetarian", "alerg", "intoleran", "lactosa"])) {
    return {
      text: "🌿 Sí, tenemos opciones **vegetarianas, veganas y sin gluten**, y disponemos de carta de alérgenos.\n\nAl reservar, indícanos cualquier alergia en el campo de comentarios y cocina lo tendrá en cuenta.",
      actions: [ACTIONS.reservar],
    };
  }

  /* Especialidades */
  if (has(t, ["especialidad", "recomiend", "recomendac", "mejor plato", "que me pido", "que pido", "tipico", "favorito"])) {
    return {
      text:
        "⭐ Nuestros platos más pedidos:\n\n" +
        "• **Cochinillo asado de Segovia** — 25,00 €\n" +
        "• **Judiones de La Granja** — 16,00 €\n" +
        "• **Solomillo de ternera** — 28,00 €\n" +
        "• De postre, el **ponche segoviano** — 7,50 €\n\n" +
        "Si es tu primera vez, ¡el cochinillo asado no te lo puedes perder!",
      actions: [ACTIONS.especialidades, ACTIONS.reservar],
    };
  }

  /* Platos concretos */
  const dishes = findDishes(t);
  if (dishes.length > 0) {
    const list = dishes
      .slice(0, 4)
      .map((d) => `• **${d.name}** — ${d.price}\n  _${d.description}_`)
      .join("\n");
    return {
      text: `Esto es lo que tenemos:\n\n${list}`,
      actions: [ACTIONS.carta, ACTIONS.reservar],
    };
  }

  /* Categorías de la carta */
  const cat = (["postres", "entrantes", "principales"] as const).find(
    (c) => t.includes(c.slice(0, -1)) || (c === "principales" && has(t, ["carne", "pescado", "segundo"]))
  );
  if (cat) {
    const list = MENU[cat].map((d) => `• **${d.name}** — ${d.price}`).join("\n");
    return {
      text: `**${CATEGORY_LABEL[cat]}:**\n\n${list}`,
      actions: [ACTIONS.carta],
    };
  }

  /* Carta / precios */
  if (has(t, ["carta", "platos", "comida", "comer", "precio", "cuesta", "cuanto", "caro", "barato"])) {
    return {
      text:
        "Nuestra carta tiene **entrantes** (de 9,00 € a 18,00 €), **platos principales** (de 16,00 € a 28,00 €) y **postres caseros** (de 4,00 € a 7,50 €).\n\nY de lunes a viernes, **menú del día por 16,90 €** con bebida y postre incluidos.",
      actions: [ACTIONS.carta],
      suggestions: ["Ver entrantes", "Platos principales", "Postres"],
    };
  }

  /* Bebidas */
  if (has(t, ["bebida", "vino", "cerveza", "beber", "refresco", "vermut", "copa"])) {
    return {
      text: "🍷 Tenemos vinos de la tierra, cerveza, refrescos, café e infusiones. Pregunta a nuestro equipo por la selección de vinos del día, que va cambiando.",
      actions: [ACTIONS.carta, ACTIONS.reservar],
    };
  }

  /* Contacto */
  if (has(t, ["telefono", "llamar", "contacto", "email", "correo", "whatsapp"])) {
    return {
      text: `📞 Teléfono: **${CONTACT.phone}**\n✉️ Email: **${CONTACT.email}**`,
      actions: [ACTIONS.llamar],
    };
  }

  /* Grupos / eventos */
  if (has(t, ["grupo", "evento", "cumple", "empresa", "celebra", "comunion", "privado"])) {
    return {
      text: `🎉 Organizamos comidas de empresa, cumpleaños y celebraciones. Tenemos menús cerrados desde 28 € por persona.\n\nLlámanos al **${CONTACT.phone}** o escríbenos a **eventos@elantiguosalon.es**.`,
      actions: [ACTIONS.llamar, ACTIONS.reservar],
    };
  }

  /* Pagos / wifi / niños / terraza */
  if (has(t, ["tarjeta", "pagar", "pago", "bizum", "efectivo"])) {
    return { text: "💳 Aceptamos tarjeta, efectivo y pago con el móvil." };
  }
  if (has(t, ["wifi", "internet", "portatil", "trabajar"])) {
    return { text: "📶 Sí, tenemos **Wi-Fi gratuito**. Muchos clientes vienen a trabajar un rato con su café." };
  }
  if (has(t, ["nino", "ninos", "trona", "infantil", "bebe", "carrito"])) {
    return { text: "👶 ¡Los peques son bienvenidos! Tenemos tronas y menú infantil." };
  }
  if (has(t, ["terraza", "fuera", "exterior"])) {
    return { text: "☀️ Tenemos zona exterior cuando el tiempo acompaña. Indícalo en los comentarios al reservar y lo intentamos." };
  }
  if (has(t, ["opinion", "valoracion", "resena", "estrellas", "google"])) {
    return { text: "⭐ Tenemos una valoración de **4,6 sobre 5** en Google. ¡Gracias a todos nuestros clientes!" };
  }

  /* Por defecto */
  return {
    text:
      "Mmm, no estoy seguro de haberte entendido 🤔\n\nPuedo ayudarte con el **horario**, la **carta**, el **menú del día**, **reservas** o **cómo llegar**. Si prefieres, llámanos al " +
      `**${CONTACT.phone}**.`,
    suggestions: ["Horario", "Menú del día", "Quiero reservar", "¿Dónde estáis?"],
  };
}
