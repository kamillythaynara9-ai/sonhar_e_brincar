/**
 * INTRO (2,6 s, só na primeira página aberta)
 * EFEITO: uma nuvem enche como um inflável (passa do ponto e volta), a logo
 *   pula para dentro dela, estrelas piscam e o balão sobe. Depois a tela
 *   inteira sobe como uma cortina de nuvens e revela o site.
 * INTERAÇÃO: um toque pula. Com "reduzir movimento" não aparece.
 * POR QUE: a nuvem é a forma da logo e "encher" é o que um brinquedo
 *   inflável faz. Toda a animação é CSS, então começa junto com a página
 *   (antes do JavaScript) e nunca trava: termina sozinha mesmo sem JS.
 */
import { useEffect, useState } from "react";
import logo from "@/assets/logo-720.webp";
import { DURACAO_INTRO, introJaRodou, marcarIntroRodou } from "@/lib/intro";

export function Intro() {
  const [ativa, setAtiva] = useState(() => !introJaRodou());
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (!ativa) return;
    const restante = Math.max(0, DURACAO_INTRO * 1000 - performance.now());
    const t = window.setTimeout(() => {
      marcarIntroRodou();
      setAtiva(false);
    }, restante + 120);
    return () => window.clearTimeout(t);
  }, [ativa]);

  if (!ativa) return null;

  function pular() {
    setSaindo(true);
    marcarIntroRodou();
    window.setTimeout(() => setAtiva(false), 520);
  }

  return (
    <div className={`intro${saindo ? " intro--pulando" : ""}`} onClick={pular} aria-hidden="true">
      <div className="intro__palco">
        <div className="intro__nuvem" />
        <img className="intro__logo" src={logo} alt="" width={720} height={431} />
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={`intro__estrela intro__estrela--${i}`} />
        ))}
      </div>
    </div>
  );
}
