/**
 * COMBOS — todos os combos de exemplo + convite para montar o próprio.
 * Os combos e valores reais vêm da Camila (A CONFIRMAR).
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { CabecaPagina } from "@/components/comum/CabecaPagina";
import { CartaoCombo } from "@/components/comum/CartaoCombo";
import { Balao } from "@/components/site/Balao";
import { IconeSeta } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { COMBOS } from "@/config/brinquedos";
import { MARCA } from "@/config/marca";

export const Route = createFileRoute("/combos")({
  head: () => ({
    meta: [
      { title: `Combos de brinquedos para festa · ${MARCA.nome}` },
      { name: "description", content: "Combos prontos para salão, quintal e dias de calor, ou monte o seu. Orçamento pelo WhatsApp." },
      { property: "og:title", content: `Combos · ${MARCA.nome}` },
    ],
  }),
  component: Combos,
});

function Combos() {
  return (
    <>
      <CabecaPagina
        rotulo="Combos"
        titulo={
          <>
            Tem combo? <span className="destaque-festa">Tem.</span>
          </>
        }
        texto="Combos pensados pelo espaço e pela idade das crianças. Ponha um combo inteiro na festa e ajuste do seu jeito antes de pedir o orçamento."
        fotos={["cama-elastica-casinha", "gladiador-inflavel", "futebol-inflavel"]}
      />
      <section className="conteiner combos-pagina">
        <div className="combos-lista">
          {COMBOS.map((c, i) => (
            <Revelar key={c.id} atraso={(i % 2) * 0.1}>
              <CartaoCombo combo={c} />
            </Revelar>
          ))}
        </div>
        <Revelar className="monte-convite">
          <Balao gomos={4} className="monte-convite__balao" />
          <div>
            <h2>Nenhum combo é a cara da sua festa?</h2>
            <p>Escolha brinquedo por brinquedo, diga a data, o local e quantas crianças vão. O orçamento sai certinho para o que você montou.</p>
          </div>
          <Link to="/monte-sua-festa" className="botao botao--sol">
            Monte sua festa <IconeSeta />
          </Link>
        </Revelar>
      </section>
    </>
  );
}
