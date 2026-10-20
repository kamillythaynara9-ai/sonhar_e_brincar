/**
 * PERGUNTAS FREQUENTES
 * EFEITO: cada pergunta é uma bolha branca; a aberta estufa e mostra a
 *   resposta com altura animada. Sem linhas entre os itens.
 * INTERAÇÃO: toque abre e fecha; teclado funciona (botões nativos).
 */
import { useState } from "react";
import { IconeMais } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { PERGUNTAS } from "@/config/perguntas";

export function Perguntas({ quantas, titulo = true }: { quantas?: number; titulo?: boolean }) {
  const [aberta, setAberta] = useState<number | null>(0);
  const lista = quantas ? PERGUNTAS.slice(0, quantas) : PERGUNTAS;
  return (
    <section className="perguntas" id="perguntas">
      <div className="conteiner perguntas__grade">
        {titulo && (
          <Revelar>
            <span className="rotulo">Perguntas frequentes</span>
            <h2 className="titulo-secao">
              O que os pais <span className="destaque-rosa">mais perguntam</span>
            </h2>
          </Revelar>
        )}
        <div className="perguntas__lista">
          {lista.map((p, i) => {
            const aberto = aberta === i;
            return (
              <Revelar key={p.pergunta} atraso={i * 0.05} className={`pergunta${aberto ? " pergunta--aberta" : ""}`}>
                <h3>
                  <button aria-expanded={aberto} aria-controls={`resposta-${i}`} id={`pergunta-${i}`} onClick={() => setAberta(aberto ? null : i)}>
                    {p.pergunta}
                    <span className="pergunta__sinal">
                      <IconeMais />
                    </span>
                  </button>
                </h3>
                <div className="pergunta__resposta" id={`resposta-${i}`} role="region" aria-labelledby={`pergunta-${i}`}>
                  <div>
                    <p>{p.resposta}</p>
                  </div>
                </div>
              </Revelar>
            );
          })}
        </div>
      </div>
    </section>
  );
}
