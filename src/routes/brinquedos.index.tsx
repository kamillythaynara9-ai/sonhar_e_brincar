/**
 * CATÁLOGO DE BRINQUEDOS
 * EFEITO: grade solta de fotos reais (tamanhos alternados), cada cartão
 *   aperta como inflável no toque e inclina com o mouse.
 * INTERAÇÃO: filtros por tipo e por espaço em botões (nunca <select>),
 *   busca por nome, "Pôr na festa" em cada cartão. Os filtros reorganizam
 *   a grade com uma pequena mola.
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CabecaPagina } from "@/components/comum/CabecaPagina";
import { Apertavel } from "@/components/site/Apertavel";
import { BotaoFesta } from "@/components/site/BotaoFesta";
import { Foto } from "@/components/site/Foto";
import { IconeBusca, IconeSeta } from "@/components/site/Icones";
import { BRINQUEDOS, CATEGORIAS, type Categoria, type Espaco } from "@/config/brinquedos";
import { MARCA } from "@/config/marca";
import { inclinarComMouse, soltarInclinacao } from "@/lib/inclinar";

export const Route = createFileRoute("/brinquedos/")({
  head: () => ({
    meta: [
      { title: `Brinquedos para alugar · ${MARCA.nome}` },
      { name: "description", content: "Castelo inflável, tobogã com piscina, gladiador, futebol inflável, cama elástica e Tombo Legal. Veja as fotos e monte a sua festa." },
      { property: "og:title", content: `Brinquedos · ${MARCA.nome}` },
    ],
  }),
  component: Catalogo,
});

const ESPACOS: { id: Espaco; nome: string }[] = [
  { id: "coberto", nome: "Salão ou coberto" },
  { id: "externo", nome: "Ao ar livre" },
];

function semAcento(t: string) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function Catalogo() {
  const [categoria, setCategoria] = useState<Categoria | "todos">("todos");
  const [espaco, setEspaco] = useState<Espaco | "todos">("todos");
  const [busca, setBusca] = useState("");

  const lista = useMemo(
    () =>
      BRINQUEDOS.filter(
        (b) =>
          (categoria === "todos" || b.categoria === categoria) &&
          (espaco === "todos" || b.espacos.includes(espaco)) &&
          (!busca.trim() || semAcento(`${b.nome} ${b.resumo}`).includes(semAcento(busca.trim()))),
      ),
    [categoria, espaco, busca],
  );

  return (
    <>
      <CabecaPagina
        rotulo="Catálogo"
        titulo={
          <>
            Nossos <span className="destaque-festa">brinquedos</span>
          </>
        }
        texto="Fotos reais dos nossos brinquedos. Escolha os que combinam com o seu espaço e a idade das crianças, ponha na festa e peça o orçamento de tudo junto."
        fotos={["castelo-inflavel", "tombo-legal", "toboga-piscina"]}
      />

      <section className="catalogo conteiner" aria-label="Lista de brinquedos">
        <div className="filtros">
          <div className="filtros__grupo" role="group" aria-label="Tipo de brinquedo">
            <button className="chip" aria-pressed={categoria === "todos"} onClick={() => setCategoria("todos")}>
              Todos
            </button>
            {CATEGORIAS.map((c) => (
              <button key={c.id} className="chip" aria-pressed={categoria === c.id} onClick={() => setCategoria(c.id)}>
                {c.nome}
              </button>
            ))}
          </div>
          <div className="filtros__linha">
            <div className="filtros__grupo" role="group" aria-label="Onde vai ser a festa">
              {ESPACOS.map((e) => (
                <button key={e.id} className="chip" aria-pressed={espaco === e.id} onClick={() => setEspaco(espaco === e.id ? "todos" : e.id)}>
                  {e.nome}
                </button>
              ))}
            </div>
            <label className="busca">
              <IconeBusca />
              <span className="sr-only">Buscar brinquedo</span>
              <input type="search" placeholder="Buscar brinquedo" value={busca} maxLength={40} onChange={(e) => setBusca(e.target.value)} />
            </label>
          </div>
        </div>

        <p className="catalogo__contagem" aria-live="polite">
          {lista.length === 0 ? "Nenhum brinquedo com esses filtros." : `${lista.length} ${lista.length === 1 ? "brinquedo" : "brinquedos"}`}
        </p>

        <div className="catalogo__grade">
          {lista.map((b, i) => {
            const cat = CATEGORIAS.find((c) => c.id === b.categoria);
            return (
              <Apertavel
                key={b.id}
                className={`cartao-brinquedo cartao-brinquedo--${cat?.cor ?? "ceu"} catalogo__item catalogo__item--${i % 3}`}
                onPointerMove={inclinarComMouse}
                onPointerLeave={soltarInclinacao}
              >
                <Link to="/brinquedos/$id" params={{ id: b.id }} className="cartao-brinquedo__foto">
                  <Foto nome={b.fotos[0] ?? ""} alt={b.nome} />
                  <span className="cartao-brinquedo__selo">{cat?.nome}</span>
                </Link>
                <div className="cartao-brinquedo__corpo">
                  <h2>
                    <Link to="/brinquedos/$id" params={{ id: b.id }}>
                      {b.nome}
                    </Link>
                  </h2>
                  <p>{b.resumo}</p>
                  <div className="cartao-brinquedo__botoes">
                    <BotaoFesta id={b.id} nome={b.nome} pequeno />
                    <Link to="/brinquedos/$id" params={{ id: b.id }} className="link-seta">
                      Detalhes <IconeSeta />
                    </Link>
                  </div>
                </div>
              </Apertavel>
            );
          })}
        </div>

        {lista.length === 0 && (
          <button
            className="botao botao--ceu"
            onClick={() => {
              setCategoria("todos");
              setEspaco("todos");
              setBusca("");
            }}
          >
            Ver todos os brinquedos
          </button>
        )}
      </section>
    </>
  );
}
