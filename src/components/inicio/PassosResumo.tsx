/**
 * COMO FUNCIONA (resumo) — quatro passos numa trilha de nuvens
 * EFEITO: os passos entram um a um; uma linha pontilhada de "rastro de
 *   balão" liga as nuvens e se desenha ao rolar. (É um caminho, não uma
 *   linha separando seções.)
 * INTERAÇÃO: cada passo aperta no toque; botão leva à página completa.
 */
import { Link } from "@tanstack/react-router";
import { Apertavel } from "@/components/site/Apertavel";
import { IconeCalendario, IconeCaminhao, IconeCoracao, IconeSeta, IconeWhatsapp } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";

export const PASSOS = [
  { icone: IconeWhatsapp, titulo: "Escolha e chame", texto: "Monte sua festa no site ou mande a data e o local no WhatsApp." },
  { icone: IconeCalendario, titulo: "Reserve a data", texto: "A Camila confirma os brinquedos livres, o valor e o horário de montagem." },
  { icone: IconeCaminhao, titulo: "A gente monta", texto: "Chegamos antes, montamos, testamos e explicamos as regras de uso." },
  { icone: IconeCoracao, titulo: "Aproveite", texto: "Depois da festa buscamos tudo. Você não carrega nada." },
];

export function PassosResumo() {
  return (
    <section className="passos" id="como-funciona">
      <div className="conteiner">
        <Revelar className="passos__cabeca">
          <span className="rotulo">Como funciona</span>
          <h2 className="titulo-secao">
            Do primeiro oi até a <span className="destaque-sol">retirada</span>
          </h2>
        </Revelar>
        <ol className="passos__trilha">
          {PASSOS.map((p, i) => (
            <Revelar como="li" key={p.titulo} atraso={i * 0.12}>
              <Apertavel className={`passo passo--${i}`}>
                <span className="passo__icone">
                  <p.icone />
                </span>
                <span className="passo__numero">Passo {i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Apertavel>
            </Revelar>
          ))}
        </ol>
        <div className="passos__acao">
          <Link to="/como-funciona" className="botao botao--ceu">
            Ver tudo sobre a reserva <IconeSeta />
          </Link>
        </div>
      </div>
    </section>
  );
}
