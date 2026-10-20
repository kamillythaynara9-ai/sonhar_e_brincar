/**
 * CÉU VIVO (fundo fixo de todas as páginas)
 * EFEITO: três camadas de nuvens atravessam a tela devagar, cada uma numa
 *   velocidade (perto = mais rápida e maior), e estrelinhas piscam.
 *   Ao rolar, as camadas se deslocam em velocidades diferentes (parallax).
 * POR QUE: é o "céu" da logo sempre em movimento, sem pesar: CSS infinito +
 *   uma variável --rolagem atualizada em requestAnimationFrame.
 */
import { useEffect, type CSSProperties } from "react";

const NUVENS = [
  { camada: 1, topo: 8, tamanho: 220, duracao: 95, atraso: -10 },
  { camada: 1, topo: 46, tamanho: 180, duracao: 110, atraso: -70 },
  { camada: 2, topo: 22, tamanho: 300, duracao: 75, atraso: -40 },
  { camada: 2, topo: 70, tamanho: 260, duracao: 85, atraso: -5 },
  { camada: 3, topo: 58, tamanho: 420, duracao: 60, atraso: -30 },
];
const ESTRELAS = [
  { x: 12, y: 18, cor: "sol", atraso: 0 },
  { x: 84, y: 12, cor: "rosa", atraso: 1.2 },
  { x: 68, y: 40, cor: "ceu", atraso: 0.6 },
  { x: 24, y: 64, cor: "rosa", atraso: 2 },
  { x: 90, y: 72, cor: "sol", atraso: 1.6 },
  { x: 46, y: 86, cor: "ceu", atraso: 0.3 },
];

export function CeuVivo() {
  useEffect(() => {
    let quadro = 0;
    const raiz = document.documentElement;
    const atualizar = () => {
      quadro = 0;
      raiz.style.setProperty("--rolagem", String(window.scrollY));
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <div className="ceu" aria-hidden="true">
      {[1, 2, 3].map((c) => (
        <div key={c} className={`ceu__camada ceu__camada--${c}`}>
          {NUVENS.filter((n) => n.camada === c).map((n, i) => (
            <span
              key={i}
              className="ceu__nuvem"
              style={{ top: `${n.topo}%`, width: n.tamanho, animationDuration: `${n.duracao}s`, animationDelay: `${n.atraso}s` } as CSSProperties}
            />
          ))}
        </div>
      ))}
      {ESTRELAS.map((e, i) => (
        <span key={i} className={`ceu__estrela ceu__estrela--${e.cor}`} style={{ left: `${e.x}%`, top: `${e.y}%`, animationDelay: `${e.atraso}s` }} />
      ))}
    </div>
  );
}
