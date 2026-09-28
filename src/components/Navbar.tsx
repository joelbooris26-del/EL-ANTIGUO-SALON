import { useEffect, useState } from "react";
import { Phone, MapPin, Clock, Menu, X, Globe, AtSign } from "lucide-react";
import { EASLogo, BrandName } from "./Logo";
import { StatusDot, useOpenStatus } from "./OpenStatus";


const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Carta", href: "#carta" },
  { label: "Galería", href: "#galeria" },
  { label: "Opiniones", href: "#opiniones" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const status = useOpenStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Barra superior */}
      <div className="hidden bg-espresso text-[13px] text-stone-300 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gold" />
              C. de Anabel Segura 11, Alcobendas
            </span>
            <span className="flex items-center gap-2">
              <StatusDot open={status.open} closingSoon={status.closingSoon} />
              <span className="font-medium text-white">{status.label}</span>
            </span>
            <span className="hidden items-center gap-1.5 xl:flex">
              <Clock className="h-3.5 w-3.5 text-gold" />
              L–M 8:00–16:30 · X–V 8:00–21:00 · S 12:00–17:00 · D cerrado
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+34910000000" className="flex items-center gap-1.5 font-medium text-white hover:text-gold-light">
              <Phone className="h-3.5 w-3.5 text-gold" />
              910 123 456
            </a>
            <span className="h-4 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Web" className="hover:text-gold-light">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Redes sociales" className="hover:text-gold-light">
                <AtSign className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <div
        className={`border-b bg-parchment/95 backdrop-blur transition-shadow ${
          scrolled ? "border-linen shadow-[0_2px_20px_rgba(30,27,22,0.08)]" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3" aria-label="El Antiguo Salón - Inicio">
            <EASLogo size={56} />
            <BrandName />
          </a>

          {/* Links escritorio */}
          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-bark transition-colors hover:text-terracotta"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+34910000000"
              className="flex items-center gap-2 rounded-md border border-linen-dark px-4 py-2.5 text-sm font-semibold text-bark transition-colors hover:border-terracotta hover:text-terracotta"
            >
              <Phone className="h-4 w-4" />
              910 123 456
            </a>
            <a
              href="#reservar"
              className="rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              Reservar mesa
            </a>
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-linen text-bark lg:hidden"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Menú móvil */}
        {open && (
          <nav className="border-t border-linen bg-parchment px-6 pb-6 pt-2 lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-linen/70 py-3 text-[15px] font-medium text-bark last:border-0 hover:text-terracotta"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="tel:+34910000000"
                className="flex items-center justify-center gap-2 rounded-md border border-linen-dark px-4 py-3 text-sm font-semibold text-bark"
              >
                <Phone className="h-4 w-4" /> Llamar
              </a>
              <a
                href="#reservar"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-md bg-terracotta px-4 py-3 text-sm font-semibold text-white"
              >
                Reservar mesa
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
