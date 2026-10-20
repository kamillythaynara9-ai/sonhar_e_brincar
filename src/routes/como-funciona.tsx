/**
 * COMO FUNCIONA
 * EFEITO: linha do tempo do dia da festa. Ao rolar, um balão desce pela
 *   trilha e cada etapa acende quando ele passa (variável CSS atualizada
 *   em requestAnimationFrame). Depois: cuidados com limpeza e segurança
 *   em lista tipográfica grande, e as perguntas frequentes completas.
 * INTERAÇÃO: rolagem conduz o balão; cada etapa aperta no toque.
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties } from "react";
import { CabecaPagina } from "@/components/comum/CabecaPagina";
import { Perguntas } from "@/components/comum/Perguntas";
import { Apertavel } from "@/components/site/Apertavel";
import { Balao } from "@/components/site/Balao";
import { IconeSeta } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { MARCA } from "@/config/marca";

export const Route = createFileRoute("/como-funciona")({
  head: () => ({
    meta: [
      { title: `Como funciona o aluguel · ${MARCA.nome}` },
      { name: "description", content: "Reserva, entrega, montagem antes da festa, regras de uso e retirada. Veja como funciona o aluguel de brinquedos." },
      { property: "og:title", content: `Como funciona · ${MARCA.nome}` },
    ],
  }),
  component: ComoFunciona,
});

const ETAPAS = [
  { quando: "Dias antes", titulo: "Você monta a festa e chama", texto: "Pelo site ou pelo WhatsApp: data, local, quantas crianças e quais brinquedos." },
  { quando: "No mesmo dia", titulo: "A Camila confirma", texto: "Você recebe os brinquedos livres para a data, o valor e o horário de montagem. Reservou, a data é sua." },
  { quando: "Véspera", titulo: "Brinquedo revisado", texto: "Conferimos costuras, redes, motor e proteções e higienizamos tudo antes de sair." },
  { quando: "Antes da festa", titulo: "Chegamos e montamos", texto: "Montagem com folga antes do horário dos convidados, teste completo e explicação das regras de uso." },
  { quando: "Durante", titulo: "Criançada brincando", texto: "Você aproveita a festa. Qualquer dúvida, a Camila está a uma mensagem." },
  { quando: "Depois", titulo: "A gente busca", texto: "No horário combinado desmontamos e levamos tudo. Você não carrega nada." },
];

const CUIDADOS = [
  { titulo: "Higienização a cada festa", texto: "Lona, redes e bolinhas limpas depois de cada evento, antes de voltar para o depósito." },
  { titulo: "Revisão antes de sair", texto: "Costuras, zíperes, molas, redes e motor conferidos. Brinquedo com defeito não sai." },
  { titulo: "Montagem segura", texto: "Brinquedo bem preso ao chão, área livre em volta e motor protegido." },
  { titulo: "Regras de uso explicadas", texto: "Idade, número de crianças por vez e supervisão de um adulto: a gente explica para quem vai cuidar." },
];

function ComoFunciona() {
  const trilha = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = trilha.current;
    if (!el) return;
    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const r = el.getBoundingClientRect();
      const meio = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (meio - r.top) / r.height));
      el.style.setProperty("--avanco", p.toFixed(3));
      el.querySelectorAll<HTMLElement>(".etapa").forEach((etapa, i, todas) => {
        etapa.classList.toggle("etapa--acesa", p >= (i + 0.3) / todas.length);
      });
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      cancelAnimationFrame(quadro);
    };
  }, []);

  return (
    <>
      <CabecaPagina
        rotulo="Como funciona"
        titulo={
          <>
            Você cuida dos convidados. <span className="destaque-festa">A gente cuida do resto.</span>
          </>
        }
        texto="Do pedido à retirada, este é o caminho de cada festa da Sonhar e Brincar."
        fotos={["cama-elastica-quintal", "castelo-inflavel", "gladiador-inflavel"]}
      />

      <section className="conteiner linha-tempo">
        <ol className="linha-tempo__trilha" ref={trilha} style={{ "--avanco": 0 } as CSSProperties}>
          <span className="linha-tempo__caminho" aria-hidden="true" />
          <span className="linha-tempo__balao" aria-hidden="true">
            <Balao gomos={4} />
          </span>
          {ETAPAS.map((e, i) => (
            <li key={e.titulo} className={`etapa etapa--${i % 2 ? "direita" : "esquerda"}`}>
              <Apertavel className="etapa__bolha">
                <span className="etapa__quando">{e.quando}</span>
                <h2>{e.titulo}</h2>
                <p>{e.texto}</p>
              </Apertavel>
            </li>
          ))}
        </ol>
      </section>

      <section className="cuidados borda-nuvem-cima borda-nuvem-baixo">
        <div className="conteiner">
          <Revelar>
            <span className="rotulo rotulo--claro">Limpeza e segurança</span>
            <h2 className="titulo-secao">
              Brinquedo novo de cuidado, <span className="destaque-sol">não de idade</span>
            </h2>
            <p className="texto-apoio">O que mais incomoda os pais é brinquedo velho e sem manutenção. Por isso isto é regra aqui:</p>
          </Revelar>
          <ol className="cuidados__lista">
            {CUIDADOS.map((c, i) => (
              <Revelar como="li" key={c.titulo} atraso={i * 0.08} className="cuidado">
                <span className="cuidado__numero">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{c.titulo}</h3>
                  <p>{c.texto}</p>
                </div>
              </Revelar>
            ))}
          </ol>
        </div>
      </section>

      <Perguntas />

      <section className="conteiner chamada-simples">
        <Revelar className="chamada-simples__caixa">
          <h2>Pronto para escolher os brinquedos?</h2>
          <Link to="/monte-sua-festa" className="botao botao--sol">
            Monte sua festa <IconeSeta />
          </Link>
        </Revelar>
      </section>
    </>
  );
}
