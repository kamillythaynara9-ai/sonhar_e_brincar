/**
 * INTERAÇÃO: ao tocar ou clicar, o elemento "aperta" e volta como um
 * inflável (classe .apertando). Usado nos cartões de brinquedo e combos.
 */
import { useRef, type HTMLAttributes, type ReactNode } from "react";

export function Apertavel({ children, className = "", ...resto }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function apertar() {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("apertando");
    void el.offsetWidth; // reinicia a animação
    el.classList.add("apertando");
  }
  return (
    <div ref={ref} className={className} onPointerDown={apertar} onAnimationEnd={() => ref.current?.classList.remove("apertando")} {...resto}>
      {children}
    </div>
  );
}
