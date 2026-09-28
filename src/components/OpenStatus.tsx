import { useEffect, useState } from "react";
import { getOpenStatus } from "../data";

export function useOpenStatus() {
  const [status, setStatus] = useState(() => getOpenStatus());
  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);
  return status;
}

export function StatusDot({ open, closingSoon }: { open: boolean; closingSoon?: boolean }) {
  const color = open ? (closingSoon ? "bg-amber-400" : "bg-emerald-400") : "bg-red-400";
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      {open && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`} />}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  );
}
