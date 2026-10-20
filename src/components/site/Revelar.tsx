/**
 * EFEITO: o bloco sobe e "estufa" de leve quando entra na tela (mola).
 * POR QUE: dá o mesmo ritmo a todas as seções sem biblioteca de animação.
 */
import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = { children: ReactNode; como?: ElementType; atraso?: number; className?: string; id?: string };

export function Revelar({ children, como: Tag = "div", atraso = 0, className = "", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("visivel");
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("visivel");
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} id={id} className={`revelar ${className}`} style={{ "--atraso": `${atraso}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
