/**
 * TOPO DA PÁGINA INICIAL — "cenas que inflam"
 * EFEITO: fotos reais dos brinquedos numa moldura de canto de nuvem, no
 *   tamanho certo (sem esticar nem ampliar). A cada 5 s a próxima foto
 *   entra por uma nuvem que cresce do meio da moldura, como um inflável
 *   enchendo; a seguinte já espia por trás, como uma pilha de fotos.
 * INTERAÇÃO: os nomes dos brinquedos embaixo trocam a cena no toque; o
 *   nome da cena atual leva à página do brinquedo. Arrastar para o lado
 *   também troca.
 * POR QUE: o produto real é o protagonista. As fotos são de celular
 *   (até ~1100 px): em tela cheia ficavam cortadas e borradas (pedido da
 *   Thaynara, 20/10), então a moldura nunca passa do tamanho da foto.
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

  const proxima = CENAS[(atual + 1) % CENAS.length] ?? CENAS[0]!;

  return (
    <section className="topo" id="topo">
      <div className="conteiner topo__conteudo">
        <div className="topo__texto">
          <span className="rotulo entra-apos-intro">Aluguel de brinquedos</span>
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
          className="topo__vitrine entra-apos-intro"
          style={{ "--ordem": 2 } as CSSProperties}
          onPointerEnter={() => (pausado.current = true)}
          onPointerLeave={() => (pausado.current = false)}
          onPointerDown={(e) => (inicioToque.current = e.clientX)}
          onPointerUp={(e) => {
            if (inicioToque.current === null) return;
            const dx = e.clientX - inicioToque.current;
            inicioToque.current = null;
            if (Math.abs(dx) > 50) irPara(atual + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="topo__pilha">
            {/* a próxima foto espia por trás, inclinada, como uma pilha de fotos */}
            <div className="topo__carta-tras" aria-hidden="true" key={proxima.foto}>
              <Foto nome={proxima.foto} alt="" style={{ objectPosition: proxima.foco }} />
            </div>
            <div className="topo__moldura" aria-hidden="true">
              {CENAS.map((c, i) => (
                <div key={c.foto} className={`topo__cena${i === atual ? " topo__cena--atual" : ""}${i === anterior ? " topo__cena--anterior" : ""}`}>
                  <Foto nome={c.foto} alt="" prioridade={i === 0} style={{ objectPosition: c.foco }} />
                </div>
              ))}
            </div>
          </div>

          <div className="topo__seletor">
            <Link to="/brinquedos/$id" params={{ id: cena.brinquedo }} className="topo__agora">
              <span>Na foto</span>
              <strong key={nomeAtual}>{nomeAtual}</strong>
              <IconeSeta />
            </Link>
            <div className="topo__pontos" role="tablist" aria-label="Escolher foto">
              {CENAS.map((c, i) => (
                <button key={c.foto} role="tab" aria-selected={i === atual} aria-label={buscarBrinquedo(c.brinquedo)?.nome} className="topo__ponto" onClick={() => irPara(i)}>
                  <span key={i === atual ? `a${atual}` : "x"} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
