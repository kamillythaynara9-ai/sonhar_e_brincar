/**
 * Inclinação 3D leve conforme a posição do mouse sobre o cartão.
 * Só no mouse: no toque o cartão "aperta" (Apertavel) em vez de inclinar.
 */
import type { PointerEvent } from "react";

export function inclinarComMouse(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--inclina-x", `${(-y * 6).toFixed(2)}deg`);
  el.style.setProperty("--inclina-y", `${(x * 8).toFixed(2)}deg`);
}

export function soltarInclinacao(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--inclina-x", "0deg");
  e.currentTarget.style.setProperty("--inclina-y", "0deg");
}
