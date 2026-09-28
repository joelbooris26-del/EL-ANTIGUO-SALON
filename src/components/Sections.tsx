import { useState } from "react";
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Check,
  ChefHat,
  Leaf,
  Users,
  BookOpenText,
  CalendarCheck,
  Quote,
  CakeSlice,
  Salad,
  Beef,
  Mail,
  Car,
  Wifi,
  Baby,
  CreditCard,
} from "lucide-react";
import {
  IMAGES,
  MENU,
  MENU_DAY,
  TESTIMONIALS,
  HOURS,
  WEEK,
  WEEK_ORDER,
  formatHours,
  getSlotsForDate,
  type MenuCategory,
} from "../data";
import { StatusDot, useOpenStatus } from "./OpenStatus";
import { EASLogo, EASMark } from "./Logo";

/* ---------- Utilidades ---------- */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`${centered ? "mx-auto text-center" : "text-left"} max-w-2xl`}>
      <p
        className={`flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.24em] ${
          light ? "text-gold-light" : "text-terracotta"
        } ${centered ? "justify-center" : ""}`}
      >
        <span className={`h-px w-8 ${light ? "bg-gold-light/60" : "bg-terracotta/40"}`} />
        {eyebrow}
        {centered && <span className={`h-px w-8 ${light ? "bg-gold-light/60" : "bg-terracotta/40"}`} />}
      </p>
      <h2
        className={`mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl ${
          light ? "text-white" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-stone-300" : "text-mocha"}`}>
          {description}
        </p>
      )}
    </div>
  );
}

/** Valoración media del restaurante */
const RATING = 4.6;
const RATING_TEXT = "4,6";

function Stars({ count = 5, className = "h-4 w-4" }: { count?: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count.toString().replace(".", ",")} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, count - i)); // 0 a 1
        return (
          <span key={i} className="relative inline-flex">
            <Star className={`${className} fill-linen text-linen`} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${className} fill-gold text-gold`} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/* ---------- Hero ---------- */

export function Hero() {
  const status = useOpenStatus();
  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-28 md:pt-36">
      <img
        src={IMAGES.hero}
        alt="Interior acogedor de El Antiguo Salón"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-espresso/65" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(42,24,18,0.85),rgba(42,24,18,0.25)_55%,transparent)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <div className="flex flex-col items-center">
          <EASLogo size={104} variant="light" className="shadow-2xl ring-4 ring-white/15" />
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.28em] text-gold-light">
            El Antiguo Salón · Café · Restaurante
          </p>
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.1] text-white md:text-6xl">
          El encanto de lo clásico,
          <br />
          <span className="font-normal italic text-gold-light">del desayuno a la sobremesa</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-stone-200">
          Cocina tradicional con producto de temporada, trato cercano y precios honestos.
          Desde el primer café de la mañana hasta la comida y la merienda, en el corazón de Alcobendas.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#reservar"
            className="w-full rounded-md bg-terracotta px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-dark sm:w-auto"
          >
            Reservar mesa
          </a>
          <a
            href="#carta"
            className="w-full rounded-md border border-white/40 bg-white/10 px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-espresso sm:w-auto"
          >
            Ver la carta
          </a>
        </div>

        {/* Info rápida */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-3 rounded-md bg-white/10 px-4 py-3 backdrop-blur-sm">
            <Stars count={RATING} />
            <span className="text-sm font-medium text-white">{RATING_TEXT} · 1.240 opiniones</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 rounded-md bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
            <StatusDot open={status.open} closingSoon={status.closingSoon} />
            <span className="text-left leading-tight">
              {status.open ? "Abierto ahora" : "Cerrado ahora"}
              <span className="block text-[12px] font-normal text-stone-300">Hoy: {status.today}</span>
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-gold-light" />
            C. de Anabel Segura 11, Alcobendas
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Franja de confianza ---------- */

export function TrustBar() {
  const items = [
    { icon: ChefHat, title: "Cocina casera", text: "Recetas de siempre, hechas cada mañana" },
    { icon: Leaf, title: "Producto fresco", text: "Mercado diario y proveedores locales" },
    { icon: Users, title: "Para todos", text: "Familias, grupos y celebraciones" },
    { icon: BookOpenText, title: "Menú del día", text: "16,90 € con bebida y postre" },
  ];
  return (
    <section className="border-b border-linen bg-parchment">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta-light text-terracotta">
              <item.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-serif text-lg font-bold text-espresso">{item.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-mocha">{item.text}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Nosotros ---------- */

export function About() {
  const points = [
    "Ingredientes frescos del mercado cada mañana",
    "Carta corta y de temporada que cambia con la estación",
    "Salón acogedor, terraza y comedor privado para grupos",
    "Opciones vegetarianas, veganas y sin gluten",
  ];
  return (
    <section id="nosotros" className="bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Imágenes */}
        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-linen-dark shadow-[0_10px_40px_rgba(30,27,22,0.12)]">
            <img src={IMAGES.chef1} alt="Nuestro equipo en cocina" className="h-[420px] w-full object-cover md:h-[520px]" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-64 overflow-hidden rounded-lg border-4 border-parchment shadow-xl sm:block md:-right-8 md:w-72">
            <img src={IMAGES.chef2} alt="Preparando verduras frescas" className="h-48 w-full object-cover" />
          </div>
          <div className="absolute -left-4 top-6 rounded-md bg-espresso px-5 py-4 text-center shadow-xl md:-left-8">
            <p className="font-serif text-3xl font-bold text-gold-light">4,6★</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-300">
              en Google
            </p>
          </div>
        </div>

        {/* Texto */}
        <div>
          <SectionHeading
            centered={false}
            eyebrow="Nuestra historia"
            title="Un salón de los de antes, con el sabor de siempre"
          />
          <p className="mt-5 text-[15px] leading-relaxed text-mocha">
            El Antiguo Salón es ese lugar al que se vuelve: el café con tostada antes del
            trabajo, el menú del mediodía entre semana y la comida tranquila del sábado. Un
            salón clásico, cálido y sin pretensiones.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-mocha">
            Cocinamos con calma, con buen producto y pensando en que cada cliente repita.
            Aquí encontrarás los desayunos de toda la vida, platos caseros y una carta de
            vinos sencilla pero cuidada.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] text-bark">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4 border-t border-linen pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={IMAGES.chef3}
                alt="Chef"
                className="h-14 w-14 rounded-full border-2 border-linen-dark object-cover"
              />
              <div>
                <p className="font-serif text-lg font-bold italic text-espresso">Equipo de El Antiguo Salón</p>
                <p className="text-sm text-fawn">Sala y cocina</p>
              </div>
            </div>
            <a
              href="#carta"
              className="inline-flex items-center justify-center rounded-md border border-bark/30 px-6 py-3 text-sm font-semibold text-bark transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Descubrir la carta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Especialidades ---------- */

export function Specialties() {
  const dishes = [
    {
      img: "./images/raviolis-langostinos.jpg",
      name: "Raviolis con langostinos",
      desc: "Pasta rellena en salsa cremosa de langostinos, cebolla crujiente, cebollino fresco y reducción de Módena.",
      price: "15,90 €",
      tag: "Especialidad",
    },
    {
      img: "./images/entrecot-patatas.jpg",
      name: "Entrecot a la brasa",
      desc: "Jugoso entrecot con escamas de sal, patatas fritas caseras y salsa de mostaza antigua.",
      price: "19,50 €",
      tag: "Recomendado",
    },
    {
      img: "./images/salmorejo-remolacha.jpg",
      name: "Salmorejo de remolacha",
      desc: "Nuestra versión del clásico cordobés, con jamón ibérico, huevo rallado, queso y un hilo de aceite de oliva virgen.",
      price: "8,50 €",
      tag: "El favorito",
    },
  ];
  return (
    <section id="especialidades" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Platos destacados"
          title="Las especialidades de la casa"
          description="Tres platos que nos han hecho conocidos en el barrio. Sencillos, generosos y hechos con cariño."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {dishes.map((d) => (
            <article
              key={d.name}
              className="group overflow-hidden rounded-lg border border-linen bg-white shadow-[0_4px_24px_rgba(30,27,22,0.06)] transition-shadow hover:shadow-[0_12px_40px_rgba(30,27,22,0.12)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={d.img}
                  alt={d.name}
                  className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-espresso/90 px-3 py-1 text-[12px] font-semibold uppercase tracking-wider text-gold-light">
                  {d.tag}
                </span>
                <span className="absolute bottom-4 right-4 rounded-md bg-parchment px-3 py-1.5 font-serif text-lg font-bold text-terracotta shadow">
                  {d.price}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-espresso">{d.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mocha">{d.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-linen pt-4">
                  <Stars />
                  <a href="#reservar" className="text-sm font-semibold text-terracotta hover:text-terracotta-dark">
                    Reservar para probarlo →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Carta ---------- */

const CATEGORY_META: Record<MenuCategory, { label: string; icon: typeof Salad }> = {
  entrantes: { label: "Entrantes", icon: Salad },
  principales: { label: "Principales", icon: Beef },
  postres: { label: "Postres", icon: CakeSlice },
};

export function MenuSection() {
  const [cat, setCat] = useState<MenuCategory>("entrantes");

  return (
    <section id="carta" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Nuestra carta"
          title="Nuestra carta"
          description="Explora la variedad de nuestros platos, desde entrantes tradicionales hasta postres irresistibles. Descubre por qué El Antiguo Salón es un destino culinario imprescindible."
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {(Object.keys(CATEGORY_META) as MenuCategory[]).map((key) => {
            const Icon = CATEGORY_META[key].icon;
            const active = cat === key;
            return (
              <button
                key={key}
                onClick={() => setCat(key)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-terracotta bg-terracotta text-white"
                    : "border-linen-dark bg-white text-bark hover:border-terracotta hover:text-terracotta"
                }`}
              >
                <Icon className="h-4 w-4" />
                {CATEGORY_META[key].label}
              </button>
            );
          })}
        </div>

        {/* Lista de platos */}
        <div className="paper-texture mx-auto mt-8 max-w-4xl rounded-lg border border-linen-dark p-6 shadow-[0_6px_30px_rgba(30,27,22,0.07)] md:p-10">
          <div className="mb-8 text-center">
            <EASMark className="mx-auto mb-2 h-12 w-auto" color="var(--color-brand)" />
            <p className="font-serif text-lg italic text-fawn">El Antiguo Salón</p>
            <h3 className="font-serif text-2xl font-bold text-espresso">
              {CATEGORY_META[cat].label}
            </h3>
            <div className="mx-auto mt-3 h-px w-24 bg-gold/60" />
          </div>
          <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">
            {MENU[cat].map((dish) => (
              <div key={dish.name}>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-serif text-[17px] font-bold leading-snug text-espresso">
                    {dish.name}
                    {dish.tag && (
                      <span className="ml-2 inline-block -translate-y-0.5 rounded-full bg-terracotta-light px-2 py-0.5 align-middle font-sans text-[11px] font-bold uppercase tracking-wide text-terracotta">
                        {dish.tag}
                      </span>
                    )}
                  </h4>
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-mocha">{dish.description}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="menu-dots flex-1" />
                  <span className="font-serif text-[17px] font-bold text-terracotta">{dish.price}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 rounded-md bg-cream-dark/60 px-4 py-3 text-center text-[13px] leading-relaxed text-mocha">
            Si tienes alguna necesidad dietética especial, por favor, háznoslo saber. Estamos
            encantados de adaptar nuestros platos siempre que sea posible para que disfrutes de tu
            experiencia con nosotros.
          </p>
        </div>

        {/* Menú del día */}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-olive-dark bg-olive text-white">
          <div className="grid md:grid-cols-[1fr_1.4fr]">
            <div className="flex flex-col items-center justify-center bg-olive-dark px-8 py-10 text-center">
              <CalendarCheck className="h-10 w-10 text-gold-light" />
              <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.22em] text-gold-light">
                Lunes a viernes · 13:00 – 16:00
              </p>
              <h3 className="mt-2 font-serif text-3xl font-bold">Menú del día</h3>
              <p className="mt-2 font-serif text-4xl font-bold text-gold-light">{MENU_DAY.price}</p>
              <p className="mt-2 text-[13px] text-stone-300">{MENU_DAY.includes}</p>
              <a
                href="#reservar"
                className="mt-6 rounded-md bg-gold-light px-6 py-2.5 text-sm font-bold text-olive-dark transition-colors hover:bg-white"
              >
                Reservar mediodía
              </a>
            </div>
            <div className="grid gap-6 px-8 py-10 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-light">Primeros</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-snug text-stone-100">
                  {MENU_DAY.firsts.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold">·</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-light">Segundos</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-snug text-stone-100">
                  {MENU_DAY.seconds.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold">·</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gold-light">Postre o café</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-snug text-stone-100">
                  {MENU_DAY.desserts.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold">·</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Galería ---------- */

export function Gallery() {
  const photos = [
    { src: IMAGES.interior1, alt: "Salón principal con luz cálida" },
    { src: IMAGES.gourmet, alt: "Platos de la casa a la luz del día" },
    { src: IMAGES.interior2, alt: "Rincón acogedor del comedor" },
    { src: IMAGES.steak3, alt: "Corte de carne a la brasa" },
    { src: IMAGES.interior3, alt: "Clientes disfrutando de la sobremesa" },
    { src: IMAGES.dessert2, alt: "Postre de chocolate con helado" },
  ];
  return (
    <section id="galeria" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="El local"
          title="Un sitio para estar a gusto"
          description="Madera, luz cálida y mesas amplias. Sin lujos innecesarios: un comedor pensado para conversar y disfrutar."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {photos.map((p, i) => (
            <div
              key={p.src}
              className={`overflow-hidden rounded-lg border border-linen ${
                i === 0 ? "col-span-2 row-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
                  i === 0 ? "h-64 sm:h-80 lg:h-full lg:min-h-[420px]" : "h-48 sm:h-60 lg:h-[200px]"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mocha">
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-terracotta" /> Comedor privado hasta 20 personas</span>
          <span className="flex items-center gap-2"><Car className="h-4 w-4 text-terracotta" /> Parking cercano concertado</span>
          <span className="flex items-center gap-2"><Wifi className="h-4 w-4 text-terracotta" /> Wi-Fi gratuito</span>
          <span className="flex items-center gap-2"><Baby className="h-4 w-4 text-terracotta" /> Tronas y menú infantil</span>
          <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-terracotta" /> Todos los medios de pago</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Opiniones ---------- */

export function Testimonials() {
  return (
    <section id="opiniones" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Opiniones"
          title="Lo que dicen nuestros clientes"
          description="La mejor publicidad es la de quienes repiten. Esto opinan algunos de nuestros clientes habituales."
        />

        <div className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-lg border border-linen-dark bg-white px-6 py-4 shadow-sm">
          <p className="font-serif text-4xl font-bold text-espresso">{RATING_TEXT}</p>
          <div>
            <Stars count={RATING} />
            <p className="mt-1 text-[13px] text-mocha">Basado en 1.240 reseñas de Google</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-lg border border-linen bg-white p-7 shadow-[0_4px_20px_rgba(30,27,22,0.05)]"
            >
              <Quote className="h-7 w-7 text-terracotta/30" />
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-bark">
                “{t.text}”
              </blockquote>
              <div className="mt-5">
                <Stars count={t.rating} />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-linen pt-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive font-serif text-lg font-bold text-white">
                  {t.initial}
                </span>
                <span>
                  <span className="block text-sm font-bold text-espresso">{t.name}</span>
                  <span className="block text-[13px] text-fawn">
                    {t.role} · {t.date}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reserva ---------- */

export function Reservation() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const status = useOpenStatus();
  const todayIdx = new Date().getDay();

  const slots = getSlotsForDate(form.date);
  const isClosedDay = !!form.date && slots.length === 0;

  const update = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "date") {
      const newSlots = getSlotsForDate(value);
      setForm({ ...form, date: value, time: newSlots.includes(form.time) ? form.time : newSlots[0] ?? "" });
      setError(value && newSlots.length === 0 ? "Ese día estamos cerrados. Por favor, elige otro día." : "");
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date) {
      setError("Por favor, completa al menos nombre, teléfono y fecha.");
      return;
    }
    if (isClosedDay || !form.time) {
      setError("Ese día estamos cerrados. Por favor, elige otro día.");
      return;
    }
    setError("");
    setSent(true);
  };

  const prettyDate = form.date
    ? new Date(form.date + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
    : "";

  const inputCls =
    "w-full rounded-md border border-linen-dark bg-white px-4 py-3 text-[14px] text-espresso placeholder:text-fawn/70 outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/15";

  return (
    <section id="reservar" className="bg-espresso py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          light
          eyebrow="Reservas"
          title="Reserva tu mesa en un minuto"
          description="Completa el formulario y te confirmamos por teléfono o WhatsApp en menos de 2 horas. Para grupos de más de 8, llámanos directamente."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Formulario */}
          <div className="rounded-lg bg-parchment p-7 shadow-xl md:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </span>
                <h3 className="mt-5 font-serif text-2xl font-bold text-espresso">
                  ¡Solicitud recibida, {form.name.split(" ")[0]}!
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-mocha">
                  Hemos registrado tu reserva para <strong>{form.guests} personas</strong> el{" "}
                  <strong>{prettyDate}</strong> a las <strong>{form.time}</strong>. Te llamaremos
                  al <strong>{form.phone}</strong> para confirmar.
                </p>
                <p className="mt-4 rounded-md bg-terracotta-light/60 px-4 py-2 text-[13px] font-medium text-terracotta-dark">
                  Esta es una página de demostración: no se ha enviado ninguna reserva real.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", phone: "", email: "", date: "", time: "", guests: "2", message: "" });
                  }}
                  className="mt-6 rounded-md border border-bark/30 px-6 py-2.5 text-sm font-semibold text-bark hover:border-terracotta hover:text-terracotta"
                >
                  Hacer otra reserva
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-[13px] font-semibold text-bark">
                    Nombre y apellidos *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Ej. María García"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1.5 block text-[13px] font-semibold text-bark">Teléfono *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="600 123 456"
                    type="tel"
                    className={inputCls}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-bark">
                    Correo electrónico
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="maria@ejemplo.com"
                    type="email"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-bark">Fecha *</label>
                  <input
                    name="date"
                    value={form.date}
                    onChange={update}
                    type="date"
                    className={`${inputCls} ${isClosedDay ? "border-red-300" : ""}`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {form.date && !isClosedDay && (
                    <p className="mt-1.5 text-[12px] text-fawn">
                      Horario ese día: {formatHours(WEEK[new Date(form.date + "T12:00:00").getDay()].hours)}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-bark">Hora</label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={update}
                      disabled={!form.date || isClosedDay}
                      className={`${inputCls} disabled:cursor-not-allowed disabled:bg-cream-dark/60 disabled:text-fawn`}
                    >
                      {!form.date && <option value="">Elige fecha</option>}
                      {isClosedDay && <option value="">Cerrado</option>}
                      {slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-semibold text-bark">Comensales</label>
                    <select name="guests" value={form.guests} onChange={update} className={inputCls}>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                      <option value="9+">9 o más (grupo)</option>
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-semibold text-bark">
                    Comentarios (alergias, trona, terraza…)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={update}
                    rows={3}
                    placeholder="Cuéntanos si necesitas algo especial…"
                    className={`${inputCls} resize-none`}
                  />
                </div>
                {error && (
                  <p className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-800 sm:col-span-2">
                    {error}
                  </p>
                )}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-terracotta px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-terracotta-dark"
                  >
                    Solicitar reserva
                  </button>
                  <p className="mt-3 text-center text-[12.5px] text-fawn">
                    Sin pago por adelantado. Cancelación gratuita hasta 3 horas antes.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Información lateral */}
          <div className="flex flex-col gap-6">
            <div className="rounded-lg border border-white/10 bg-bark p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-bold text-white">Horario</h3>
                <span
                  className={`flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold ${
                    status.open ? "bg-emerald-400/15 text-emerald-300" : "bg-red-400/15 text-red-300"
                  }`}
                >
                  <StatusDot open={status.open} closingSoon={status.closingSoon} />
                  {status.open ? "Abierto ahora" : "Cerrado ahora"}
                </span>
              </div>
              <ul className="mt-5 space-y-1">
                {WEEK_ORDER.map((idx) => {
                  const d = WEEK[idx];
                  const isToday = idx === todayIdx;
                  return (
                    <li
                      key={d.day}
                      className={`flex items-center justify-between gap-4 rounded-md px-3 py-2 text-sm ${
                        isToday ? "bg-white/10" : ""
                      }`}
                    >
                      <span className={`font-semibold ${isToday ? "text-white" : "text-gold-light"}`}>
                        {d.day}
                        {isToday && (
                          <span className="ml-2 rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                            Hoy
                          </span>
                        )}
                      </span>
                      <span className={d.hours ? "text-stone-200" : "font-medium text-red-300"}>
                        {formatHours(d.hours)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-stone-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Desayunos desde las 8:00 de lunes a viernes. Domingos cerrado. Última reserva 1 hora antes del cierre.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-bark p-7">
              <h3 className="font-serif text-xl font-bold text-white">¿Prefieres llamar?</h3>
              <a
                href="tel:+34910123456"
                className="mt-4 flex items-center gap-3 rounded-md bg-terracotta px-5 py-3.5 font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                <Phone className="h-5 w-5" />
                910 123 456
              </a>
              <div className="mt-4 space-y-2.5 text-sm text-stone-300">
                <p className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-gold" /> C. de Anabel Segura 11, 28108 Alcobendas
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-gold" /> reservas@daily-restaurante.es
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contacto / ubicación ---------- */

export function Location() {
  return (
    <section id="contacto" className="bg-parchment py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Encuéntranos"
          title="En Alcobendas, dentro de Alba 3 Centro de Negocios"
          description="Estamos en la C. de Anabel Segura, 11. Ideal para desayunar antes de la oficina, comer entre semana o reunirte con tu equipo."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-linen-dark shadow-sm">
            <iframe
              title="Mapa - El Antiguo Salón"
              src="https://maps.google.com/maps?q=C.%20de%20Anabel%20Segura%2011%2C%2028108%20Alcobendas%2C%20Madrid&z=16&output=embed"
              className="h-[380px] w-full md:h-[440px]"
              loading="lazy"
            />
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-lg border border-linen bg-white p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-espresso">
                <MapPin className="h-5 w-5 text-terracotta" /> Dirección
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mocha">
                C. de Anabel Segura, 11
                <br />
                28108 Alcobendas, Madrid
                <br />
                <span className="mt-1 inline-block text-fawn">Se encuentra en: Alba 3 Centro de Negocios</span>
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=C.%20de%20Anabel%20Segura%2011%2C%2028108%20Alcobendas"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-terracotta hover:text-terracotta-dark"
              >
                Cómo llegar →
              </a>
            </div>
            <div className="rounded-lg border border-linen bg-white p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg font-bold text-espresso">
                <Phone className="h-5 w-5 text-terracotta" /> Contacto directo
              </h3>
              <p className="mt-2 text-sm text-mocha">Teléfono: <strong className="text-espresso">910 123 456</strong></p>
              <p className="mt-1 text-sm text-mocha">Email: <strong className="text-espresso">reservas@elantiguosalon.es</strong></p>
              <p className="mt-1 text-sm text-mocha">Grupos y eventos: <strong className="text-espresso">eventos@elantiguosalon.es</strong></p>
            </div>
            <div className="rounded-lg bg-terracotta-light/70 p-6">
              <h3 className="font-serif text-lg font-bold text-terracotta-dark">¿Un evento especial?</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-bark">
                Comuniones, cumpleaños y comidas de empresa. Comedor privado y menús cerrados desde 28 €.
              </p>
              <a
                href="#reservar"
                className="mt-4 inline-block rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-dark"
              >
                Pedir presupuesto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer className="bg-espresso text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-4">
              <EASLogo size={76} variant="light" />
              <span className="leading-none">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-light">El</span>
                <span className="mt-1 block font-serif text-2xl font-bold text-white">Antiguo Salón</span>
              </span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Café y restaurante en Alcobendas, del desayuno a la comida. Cocina tradicional,
              producto de temporada y trato de siempre.
            </p>
            <div className="mt-4">
              <Stars count={RATING} />
              <p className="mt-1.5 text-[13px] text-stone-400">{RATING_TEXT} · 1.240 reseñas en Google</p>
            </div>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gold-light">Contacto</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span>C. de Anabel Segura 11<br />28108 Alcobendas, Madrid</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> 910 123 456</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> reservas@elantiguosalon.es</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gold-light">Horario</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span className="font-semibold text-white">{h.day}</span>
                  <br />
                  <span className="text-stone-400">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gold-light">Enlaces</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#nosotros" className="hover:text-white">Nuestra historia</a></li>
              <li><a href="#carta" className="hover:text-white">Carta y menú del día</a></li>
              <li><a href="#galeria" className="hover:text-white">Galería del local</a></li>
              <li><a href="#reservar" className="hover:text-white">Reservar mesa</a></li>
              <li><a href="#contacto" className="hover:text-white">Cómo llegar</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[13px] text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} El Antiguo Salón · Página de demostración</p>
          <p className="flex items-center gap-4">
            <a href="#" className="hover:text-stone-300">Aviso legal</a>
            <a href="#" className="hover:text-stone-300">Privacidad</a>
            <a href="#" className="hover:text-stone-300">Cookies</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
