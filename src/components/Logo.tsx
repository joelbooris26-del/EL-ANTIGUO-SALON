/**
 * Logo de El Antiguo Salón recreado en SVG:
 * arco con forma de puerta, arcos concéntricos en la parte superior y las iniciales "EAS".
 */

export function EASMark({
  className = "",
  color = "currentColor",
  strokeWidth = 4.2,
}: {
  className?: string;
  color?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 80 110"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="El Antiguo Salón"
    >
      {/* Arco exterior (puerta) */}
      <path d="M5 107 V42 A35 35 0 0 1 75 42 V107" />
      {/* Arcos concéntricos */}
      <path d="M13 46 A27 27 0 0 1 67 46" />
      <path d="M20 46 A20 20 0 0 1 60 46" />
      <path d="M27 46 A13 13 0 0 1 53 46" />
      <path d="M34 46 A6 6 0 0 1 46 46" />
      {/* E */}
      <path d="M27 57 H13 V100 H27 M13 78.5 H24" />
      {/* A */}
      <path d="M31 100 L40 57 L49 100 M34.6 84 H45.4" />
      {/* S */}
      <path d="M67 61 C64 55 53 55 53 65 C53 75 67 74 67 88 C67 100 55 101 52 95" />
    </svg>
  );
}

/** Logo como sello: arco sobre fondo (claro u oscuro) */
export function EASLogo({
  size = 48,
  className = "",
  variant = "light",
}: {
  size?: number;
  className?: string;
  /** light: arco cobre sobre fondo claro · dark: arco blanco sobre fondo cobre */
  variant?: "light" | "dark";
}) {
  const bg = variant === "light" ? "bg-parchment border border-linen" : "bg-brand";
  const color = variant === "light" ? "var(--color-brand)" : "#ffffff";
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-md ${bg} ${className}`}
      style={{ width: size, height: size }}
    >
      <EASMark color={color} className="h-[80%] w-auto" strokeWidth={size < 60 ? 5 : 4.2} />
    </span>
  );
}

/** Nombre del restaurante en tipografía */
export function BrandName({
  className = "",
  subtitle = true,
  light = false,
}: {
  className?: string;
  subtitle?: boolean;
  light?: boolean;
}) {
  return (
    <span className={`block leading-none ${className}`}>
      <span
        className={`block text-[10px] font-semibold uppercase tracking-[0.3em] ${
          light ? "text-gold-light" : "text-fawn"
        }`}
      >
        El
      </span>
      <span className={`mt-0.5 block font-serif text-[22px] font-bold tracking-tight ${light ? "text-white" : "text-brand"}`}>
        Antiguo Salón
      </span>
      {subtitle && (
        <span
          className={`mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.24em] ${
            light ? "text-stone-300" : "text-fawn"
          }`}
        >
          Café · Restaurante
        </span>
      )}
    </span>
  );
}
