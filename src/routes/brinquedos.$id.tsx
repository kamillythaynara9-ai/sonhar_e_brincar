/**
 * PÁGINA DE UM BRINQUEDO
 * EFEITO: foto grande numa moldura de canto de nuvem; as miniaturas
 *   trocam a foto com um "pulo". Ficha técnica em lista tipográfica,
 *   sem tabela nem linhas.
 * INTERAÇÃO: "Pôr na festa" (enche o balão), "Perguntar no WhatsApp"
 *   com o nome do brinquedo, combos em que ele aparece e outros brinquedos.
 */
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";
import { CartaoCombo } from "@/components/comum/CartaoCombo";
import { BotaoFesta } from "@/components/site/BotaoFesta";
import { Foto } from "@/components/site/Foto";
import { IconeSeta, IconeVoltar, IconeWhatsapp } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { BRINQUEDOS, CATEGORIAS, COMBOS, buscarBrinquedo } from "@/config/brinquedos";
import { MARCA } from "@/config/marca";
import { linkWhatsapp, mensagemBrinquedo } from "@/lib/whatsapp";

export const Route = createFileRoute("/brinquedos/$id")({
  loader: ({ params }) => {
    const brinquedo = buscarBrinquedo(params.id);
    if (!brinquedo) throw notFound();
    return brinquedo;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.nome} para festa · ${MARCA.nome}` },
          { name: "description", content: `${loaderData.resumo} Aluguel com entrega, montagem e retirada.` },
          { property: "og:title", content: `${loaderData.nome} · ${MARCA.nome}` },
          { property: "og:description", content: loaderData.resumo },
        ]
      : [],
  }),
  component: PaginaBrinquedo,
});

function PaginaBrinquedo() {
  const b = Route.useLoaderData();
  const [foto, setFoto] = useState(0);
  const cat = CATEGORIAS.find((c) => c.id === b.categoria);
  const combos = COMBOS.filter((c) => c.itens.includes(b.id));
  const outros = BRINQUEDOS.filter((x) => x.id !== b.id).slice(0, 4);

  const ficha = [
    { nome: "Idade indicada", valor: b.idade },
    { nome: "Crianças por vez", valor: b.criancas },
    { nome: "Tamanho montado", valor: b.medidas },
    { nome: "Onde montar", valor: b.espacos.map((e) => (e === "coberto" ? "salão ou área coberta" : "ao ar livre")).join(" ou ") },
    { nome: "Tomada", valor: b.energia ? "precisa de uma tomada perto (motor)" : "não precisa" },
    ...(b.agua ? [{ nome: "Água", valor: "precisa de mangueira para encher a piscina" }] : []),
  ];

  return (
    <article className="brinquedo" key={b.id}>
      <div className="conteiner">
        <Link to="/brinquedos" className="link-voltar entra-apos-intro">
          <IconeVoltar /> Todos os brinquedos
        </Link>
        <div className="brinquedo__grade">
          <div className="brinquedo__galeria entra-apos-intro">
            <div className={`brinquedo__foto-grande brinquedo__foto-grande--${cat?.cor ?? "ceu"}`}>
              <Foto key={foto} nome={b.fotos[foto] ?? b.fotos[0] ?? ""} alt={b.nome} prioridade className="brinquedo__foto-img" />
            </div>
            {b.fotos.length > 1 && (
              <div className="brinquedo__miniaturas" role="group" aria-label="Fotos">
                {b.fotos.map((f, i) => (
                  <button key={f} className="brinquedo__miniatura" aria-pressed={foto === i} onClick={() => setFoto(i)} aria-label={`Foto ${i + 1}`}>
                    <Foto nome={f} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="brinquedo__info">
            <span className="rotulo entra-apos-intro">{cat?.nome}</span>
            <h1 className="titulo-pagina entra-apos-intro" style={{ "--ordem": 1 } as CSSProperties}>
              {b.nome}
            </h1>
            <p className="brinquedo__descricao entra-apos-intro" style={{ "--ordem": 2 } as CSSProperties}>
              {b.descricao}
            </p>
            <div className="linha-botoes entra-apos-intro" style={{ "--ordem": 3 } as CSSProperties}>
              <BotaoFesta id={b.id} nome={b.nome} />
              <a className="botao botao--nuvem" href={linkWhatsapp(mensagemBrinquedo(b.nome))} target="_blank" rel="noopener">
                <IconeWhatsapp /> Perguntar no WhatsApp
              </a>
            </div>
            <dl className="ficha entra-apos-intro" style={{ "--ordem": 4 } as CSSProperties}>
              {ficha.map((f) => (
                <div key={f.nome} className="ficha__item">
                  <dt>{f.nome}</dt>
                  <dd>{f.valor}</dd>
                </div>
              ))}
            </dl>
            <p className="ficha__nota">Medidas e idades de referência: confirmamos tudo na reserva, junto com o espaço da sua festa.</p>
          </div>
        </div>
      </div>

      {combos.length > 0 && (
        <section className="brinquedo__combos conteiner">
          <Revelar>
            <span className="rotulo">Vem junto em</span>
            <h2 className="titulo-secao">Combos com o {b.nome.toLowerCase()}</h2>
          </Revelar>
          <div className="combos-lista">
            {combos.map((c) => (
              <Revelar key={c.id}>
                <CartaoCombo combo={c} />
              </Revelar>
            ))}
          </div>
        </section>
      )}

      <section className="brinquedo__outros conteiner">
        <Revelar>
          <span className="rotulo">Para completar a festa</span>
          <h2 className="titulo-secao">Outros brinquedos</h2>
        </Revelar>
        <div className="mini-lista">
          {outros.map((o, i) => (
            <Revelar key={o.id} atraso={i * 0.06}>
              <Link to="/brinquedos/$id" params={{ id: o.id }} className="mini-cartao">
                <Foto nome={o.fotos[0] ?? ""} alt="" />
                <span>{o.nome}</span>
                <IconeSeta />
              </Link>
            </Revelar>
          ))}
        </div>
      </section>
    </article>
  );
}
