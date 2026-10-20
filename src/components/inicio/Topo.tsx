/**
 * TOPO DA PÁGINA INICIAL — "cenas que inflam"
 * EFEITO: fotos reais dos brinquedos da Camila em tela cheia, com zoom
 *   lento. A cada 5 s a próxima cena entra por uma nuvem que cresce do
 *   meio da tela (máscara em forma da nuvem da logo), como um inflável
 *   enchendo. Ao rolar, a cena desce mais devagar que a página.
 * INTERAÇÃO: os nomes dos brinquedos embaixo trocam a cena no toque; o
 *   nome da cena atual leva à página do brinquedo. Arrastar para o lado
 *   também troca.
 * POR QUE: o produto real é o protagonista e a transição é a própria
 *   identidade (nuvem + encher), sem repetir o topo dos últimos sites.
 */
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Foto } from "@/components/site/Foto";
import { IconeSeta } from "@/components/site/Icones";
import { buscarBrinquedo } from "@/config/brinquedos";

const CENAS = [
  { brinquedo: "cama-elastica", foto: "cama-elastica-quintal", foco: "50% 55%" },
  { brinquedo: "toboga-piscina", foto: "toboga-piscina", foco: "50% 45%" },
  { brinquedo: "castelo-inflavel", foto: "castelo-inflavel", foco: "50% 55%" },
  { brinquedo: "tombo-legal", foto: "tombo-legal", foco: "50% 55%" },
  { brinquedo: "cama-elastica-casinha", foto: "cama-elastica-casinha", foco: "50% 60%" },
  { brinquedo: "gladiador-inflavel", foto: "gladiador-inflavel", foco: "50% 50%" },
];
const INTERVALO = 5200;

export function Topo() {
  const [atual, setAtual] = useState(0);
  const [anterior, setAnterior] = useState<number | null>(null);
  const pausado = useRef(false);
  const inicioToque = useRef<number | null>(null);

  function irPara(i: number) {
    const proximo = (i + CENAS.length) % CENAS.length;
    if (proximo === atual) return;
    setAnterior(atual);
    setAtual(proximo);
  }

  useEffect(() => {
    const t = window.setInterval(() => {
      if (!pausado.current && !document.hidden) irPara(atual + 1);
    }, INTERVALO);
    return () => window.clearInterval(t);
  });

  const cena = CENAS[atual] ?? CENAS[0]!;
  const nomeAtual = buscarBrinquedo(cena.brinquedo)?.nome ?? "";

  return (
    <section
      className="topo"
      id="topo"
      onPointerDown={(e) => (inicioToque.current = e.clientX)}
      onPointerUp={(e) => {
        if (inicioToque.current === null) return;
        const dx = e.clientX - inicioToque.current;
        inicioToque.current = null;
        if (Math.abs(dx) > 60) irPara(atual + (dx < 0 ? 1 : -1));
      }}
    >
      <div className="topo__cenas" aria-hidden="true">
        {CENAS.map((c, i) => (
          <div
            key={c.foto}
            className={`topo__cena${i === atual ? " topo__cena--atual" : ""}${i === anterior ? " topo__cena--anterior" : ""}`}
          >
            <Foto nome={c.foto} alt="" prioridade={i === 0} style={{ objectPosition: c.foco }} />
          </div>
        ))}
      </div>
      <div className="topo__veu" aria-hidden="true" />

      <div className="conteiner topo__conteudo">
        <div className="topo__texto vidro">
          <span className="rotulo entra-apos-intro">Locação de brinquedos para festas</span>
          <h1 className="topo__titulo entra-apos-intro" style={{ "--ordem": 1 } as CSSProperties}>
            A diversão chega <span className="destaque-festa">antes da festa.</span>
          </h1>
          <p className="topo__sub entra-apos-intro" style={{ "--ordem": 2 } as CSSProperties}>
            Castelo inflável, cama elástica, tobogã com piscina, Tombo Legal e mais. A gente entrega, monta no horário combinado e busca depois. Você só aproveita.
          </p>
          <div className="linha-botoes entra-apos-intro" style={{ "--ordem": 3 } as CSSProperties}>
            <Link to="/monte-sua-festa" className="botao botao--sol">
              Monte sua festa <IconeSeta />
            </Link>
            <Link to="/brinquedos" className="botao botao--nuvem">
              Ver os brinquedos
            </Link>
          </div>
        </div>

        <div
          className="topo__seletor entra-apos-intro"
          style={{ "--ordem": 4 } as CSSProperties}
          onPointerEnter={() => (pausado.current = true)}
          onPointerLeave={() => (pausado.current = false)}
        >
          <Link to="/brinquedos/$id" params={{ id: cena.brinquedo }} className="topo__agora">
            <span>Na foto</span>
            <strong key={nomeAtual}>{nomeAtual}</strong>
            <IconeSeta />
          </Link>
          <div className="topo__pontos" role="tablist" aria-label="Escolher cena">
            {CENAS.map((c, i) => (
              <button
                key={c.foto}
                role="tab"
                aria-selected={i === atual}
                aria-label={buscarBrinquedo(c.brinquedo)?.nome}
                className="topo__ponto"
                onClick={() => irPara(i)}
              >
                <span key={i === atual ? `a${atual}` : "x"} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
