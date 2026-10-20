/**
 * EFEITO: o bloco sobe e "estufa" de leve quando entra na tela (mola).
 * POR QUE: dá o mesmo ritmo a todas as seções sem biblioteca de animação.
 */
import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type Props = { children: ReactNode; como?: ElementType; atraso?: number; className?: string; id?: string };

export function Revelar({ children, como: Tag = "div", atraso = 0, className = "", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  // "visivel" fica no estado do React: se ficasse só no classList, uma troca de
  // className (ex.: item aberto/fechado) apagava a classe e o bloco sumia.
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisivel(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            setVisivel(true);
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
    <Tag ref={ref} id={id} className={`revelar${visivel ? " visivel" : ""} ${className}`} style={{ "--atraso": `${atraso}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
