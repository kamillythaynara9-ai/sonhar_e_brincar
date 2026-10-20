/**
 * POR QUE A SONHAR E BRINCAR — lista grande numerada
 * EFEITO: quatro promessas em tipografia grande, sem caixas. A que está
 *   aberta mostra uma foto real numa moldura de nuvem que "enche".
 * INTERAÇÃO: passar o mouse ou tocar abre a promessa (uma por vez).
 * POR QUE: responde direto à dor que a Camila descreveu (brinquedo velho,
 *   fornecedor atrasado, ninguém responde). É confiança, não frase de efeito.
 */
import { useState } from "react";
import { Foto } from "@/components/site/Foto";
import { Revelar } from "@/components/site/Revelar";

const PROMESSAS = [
  {
    titulo: "Chega antes da festa",
    texto: "Combinamos o horário de montagem e chegamos com folga. Quando os convidados entram, o brinquedo já está de pé.",
    foto: "cama-elastica-quintal",
  },
  {
    titulo: "Brinquedo limpo e revisado",
    texto: "Cada brinquedo é higienizado e conferido depois de cada evento: costuras, redes, motor e proteções.",
    foto: "castelo-inflavel",
  },
  {
    titulo: "Montagem e retirada por nossa conta",
    texto: "Você não carrega nada. Entregamos, montamos, mostramos como usar com segurança e buscamos no fim.",
    foto: "cama-elastica-casinha",
  },
  {
    titulo: "Quem responde é a Camila",
    texto: "Nada de robô. A dona responde no WhatsApp, quase na hora, e acompanha a sua festa do começo ao fim.",
    foto: "tombo-legal",
  },
];

export function Promessas() {
  const [aberta, setAberta] = useState(0);
  return (
    <section className="promessas borda-nuvem-cima" id="por-que">
      <div className="conteiner promessas__grade">
        <Revelar className="promessas__cabeca">
          <span className="rotulo">Por que alugar com a gente</span>
          <h2 className="titulo-secao">
            Festa boa é festa <span className="destaque-ceu">sem dor de cabeça</span>
          </h2>
          <p className="texto-apoio">A Sonhar e Brincar nasceu de uma festa que deu errado. Por isso a gente cuida do que mais incomoda os pais.</p>
        </Revelar>

        <ol className="promessas__lista">
          {PROMESSAS.map((p, i) => (
            <Revelar como="li" key={p.titulo} atraso={i * 0.06} className={`promessa${aberta === i ? " promessa--aberta" : ""}`}>
              <button className="promessa__botao" aria-expanded={aberta === i} onClick={() => setAberta(i)} onPointerEnter={(e) => e.pointerType === "mouse" && setAberta(i)}>
                <span className="promessa__numero">{String(i + 1).padStart(2, "0")}</span>
                <span className="promessa__titulo">{p.titulo}</span>
              </button>
              <div className="promessa__corpo">
                <div>
                  <p>{p.texto}</p>
                </div>
              </div>
            </Revelar>
          ))}
        </ol>

        <div className="promessas__foto moldura-nuvem" aria-hidden="true">
          {PROMESSAS.map((p, i) => (
            <div key={p.foto} className={`promessas__foto-item${aberta === i ? " ativa" : ""}`}>
              <Foto nome={p.foto} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
