/**
 * NOSSA HISTÓRIA
 * EFEITO: a história real da Camila contada em "capítulos" que entram ao
 *   rolar, com a frase dela em letra grande; os três valores da marca
 *   (palavras que ela escolheu) como bolhas que flutuam em ritmos diferentes.
 * POR QUE: a desconfiança é a maior objeção dos clientes; a história de
 *   mãe que passou pelo problema responde isso melhor que qualquer selo.
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { CabecaPagina } from "@/components/comum/CabecaPagina";
import { IconeEstrela, IconeSeta } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { MARCA } from "@/config/marca";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Nossa história · ${MARCA.nome}` },
      { name: "description", content: "A Sonhar e Brincar nasceu na festa de um ano da filha da Camila. Conheça a nossa história." },
      { property: "og:title", content: `Nossa história · ${MARCA.nome}` },
    ],
  }),
  component: Sobre,
});

function Sobre() {
  return (
    <>
      <CabecaPagina
        rotulo="Nossa história"
        titulo={
          <>
            Uma festa que deu errado <span className="destaque-festa">virou a nossa missão</span>
          </>
        }
        fotos={["castelo-inflavel", "cama-elastica-quintal", "tombo-legal"]}
      />

      <section className="conteiner capitulos">
        {MARCA.historia.texto.map((t, i) => (
          <Revelar key={i} className={`capitulo capitulo--${i}`}>
            <span className="capitulo__numero">{i === 0 ? "O começo" : "A decisão"}</span>
            <p>{t}</p>
          </Revelar>
        ))}
        <Revelar className="frase-grande">
          <IconeEstrela className="frase-grande__estrela" />
          <p>“{MARCA.historia.frase}”</p>
          <span>
            {MARCA.responsavel}, fundadora da {MARCA.nome}
          </span>
        </Revelar>
      </section>

      <section className="valores borda-nuvem-cima">
        <div className="conteiner">
          <Revelar>
            <span className="rotulo">Do que a gente não abre mão</span>
            <h2 className="titulo-secao">
              Comprometida, confiável <span className="destaque-rosa">e amiga</span>
            </h2>
          </Revelar>
          <div className="valores__bolhas">
            {MARCA.valores.map((v, i) => (
              <Revelar key={v.titulo} atraso={i * 0.12} className={`valor valor--${i}`}>
                <h3>{v.titulo}</h3>
                <p>{v.texto}</p>
              </Revelar>
            ))}
          </div>
        </div>
      </section>

      <section className="conteiner novo-nome">
        <Revelar className="novo-nome__caixa">
          <span className="rotulo">Nome novo, mesmo cuidado</span>
          <h2>
            A {MARCA.nomeAntigo} agora é <span className="destaque-festa">{MARCA.nome}</span>
          </h2>
          <p className="texto-apoio">
            Se você já conhecia a gente pelo nome antigo, é a mesma equipe, com os mesmos brinquedos e o mesmo atendimento. Só o nome ficou mais a cara do que a gente faz.
          </p>
          <Link to="/brinquedos" className="botao botao--ceu">
            Ver os brinquedos <IconeSeta />
          </Link>
        </Revelar>
      </section>
    </>
  );
}
