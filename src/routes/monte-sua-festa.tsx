/**
 * MONTE SUA FESTA — o pedido de orçamento em passos curtos
 * EFEITO: um assunto por tela; o balão da logo sobe pela trilha à medida
 *   que os passos avançam, e ganha um gomo colorido para cada brinquedo
 *   escolhido. As telas entram deslizando com mola.
 * INTERAÇÃO: só botões grandes (nada de <select>); data no calendário do
 *   celular com bloqueio de datas passadas; aviso de temporada em outubro
 *   e dezembro; brinquedos sugeridos pelo espaço e pela idade; no fim a
 *   mensagem organizada abre no WhatsApp da Camila.
 * POR QUE: é a interação assinatura do site e o pedido que a Camila mais
 *   recebe ("data, local, quantas crianças, quais brinquedos").
 */
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Balao } from "@/components/site/Balao";
import { Foto } from "@/components/site/Foto";
import { IconeCheck, IconeSeta, IconeVoltar, IconeWhatsapp } from "@/components/site/Icones";
import { BRINQUEDOS, type Espaco } from "@/config/brinquedos";
import { MARCA } from "@/config/marca";
import { useFesta } from "@/lib/festa";
import { diaDaSemana, formatarData, linkWhatsapp, mensagemFesta, nomesDosBrinquedos, type PedidoFesta } from "@/lib/whatsapp";

export const Route = createFileRoute("/monte-sua-festa")({
  head: () => ({
    meta: [
      { title: `Monte sua festa · ${MARCA.nome}` },
      { name: "description", content: "Escolha a data, o local, quantas crianças vão e os brinquedos. O pedido chega organizado no WhatsApp da Sonhar e Brincar." },
      { property: "og:title", content: `Monte sua festa · ${MARCA.nome}` },
    ],
  }),
  component: MonteSuaFesta,
});

const HORARIOS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const DURACOES = ["3 horas", "4 horas", "5 horas", "6 horas", "O dia todo"];
const LOCAIS = ["Salão de festas", "Casa ou quintal", "Condomínio", "Escola ou buffet", "Evento na rua", "Outro"];
const QUANTIDADES = ["Até 15", "16 a 30", "31 a 50", "Mais de 50"];
const IDADES = ["Até 3 anos", "4 a 7 anos", "8 a 12 anos", "Adolescentes"];
const PASSOS = ["Data", "Horário", "Local", "Crianças", "Brinquedos", "Você"];

function hojeISO(somarDias = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + somarDias);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function proximoSabado(semanas = 0): string {
  const d = new Date();
  const faltam = (6 - d.getDay() + 7) % 7 || 7;
  d.setDate(d.getDate() + faltam + semanas * 7);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Idade mínima aproximada do brinquedo, lida do texto "3 a 10 anos" / "7 anos ou mais". */
function idadeMinima(texto: string): number {
  return Number(/\d+/.exec(texto)?.[0] ?? 0);
}

type Dados = Omit<PedidoFesta, "brinquedos" | "espaco"> & { espaco: Espaco | "" };

function MonteSuaFesta() {
  const festa = useFesta();
  const [passo, setPasso] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [enviado, setEnviado] = useState(false);
  const [d, setD] = useState<Dados>({ data: "", inicio: "", duracao: "", local: "", espaco: "", bairro: "", criancas: "", idades: [], nome: "", observacao: "" });
  const tela = useRef<HTMLDivElement>(null);
  const mudar = <K extends keyof Dados>(k: K, v: Dados[K]) => setD((a) => ({ ...a, [k]: v }));

  const minimo = hojeISO(1);
  const dataInvalida = d.data !== "" && d.data < minimo;
  const mesDaData = d.data ? Number(d.data.split("-")[1]) - 1 : -1;
  const temporada = (MARCA.mesesTemporada as readonly number[]).includes(mesDaData);

  const podeAvancar = [
    d.data !== "" && !dataInvalida,
    d.inicio !== "" && d.duracao !== "",
    d.local !== "" && d.espaco !== "" && d.bairro.trim().length >= 2,
    d.criancas !== "" && d.idades.length > 0,
    festa.itens.length > 0,
    d.nome.trim().length >= 2,
  ][passo];

  /** Maior idade marcada: o brinquedo serve se a idade mínima dele couber. */
  const maiorIdade = useMemo(() => {
    const mapa: Record<string, number> = { "Até 3 anos": 3, "4 a 7 anos": 7, "8 a 12 anos": 12, Adolescentes: 17 };
    return d.idades.length ? Math.max(...d.idades.map((i) => mapa[i] ?? 17)) : 17;
  }, [d.idades]);

  function sugerido(espacos: Espaco[], idade: string) {
    const cabe = d.espaco === "" || espacos.includes(d.espaco);
    return cabe && idadeMinima(idade) <= maiorIdade;
  }

  function ir(n: number) {
    setDir(n > passo ? 1 : -1);
    setPasso(n);
  }
  useEffect(() => {
    tela.current?.focus({ preventScroll: true });
    tela.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [passo]);

  const pedido: PedidoFesta = { ...d, espaco: d.espaco === "coberto" ? "Coberto" : "Ao ar livre", brinquedos: festa.itens, observacao: d.observacao?.trim() || undefined, bairro: d.bairro.trim(), nome: d.nome.trim() };

  return (
    <section className="monte conteiner">
      <div className="monte__cabeca">
        <span className="rotulo entra-apos-intro">Monte sua festa</span>
        <h1 className="titulo-pagina entra-apos-intro">
          Seis toques e o pedido <span className="destaque-festa">chega pronto</span>
        </h1>
      </div>

      <div className="monte__palco">
        {/* Trilha do balão: o balão sobe com os passos */}
        <div className="trilha-balao" aria-hidden="true" style={{ "--progresso": (enviado ? PASSOS.length : passo) / PASSOS.length } as CSSProperties}>
          <div className="trilha-balao__ceu" />
          <div className="trilha-balao__balao" key={festa.pulso}>
            <Balao gomos={festa.itens.length} />
          </div>
        </div>

        <div className="monte__cartao">
          <ol className="monte__passos" aria-label="Passos">
            {PASSOS.map((p, i) => (
              <li key={p}>
                <button className={`monte__passo${i === passo ? " atual" : ""}${i < passo ? " feito" : ""}`} disabled={i > passo} onClick={() => ir(i)} aria-current={i === passo ? "step" : undefined}>
                  <span>{i < passo ? <IconeCheck /> : i + 1}</span>
                  {p}
                </button>
              </li>
            ))}
          </ol>

          <div ref={tela} tabIndex={-1} className={`monte__tela monte__tela--${dir === 1 ? "frente" : "volta"}`} key={enviado ? "fim" : passo}>
            {enviado ? (
              <Tela titulo="Pedido enviado! 🎈" texto="Se o WhatsApp não abriu, toque no botão abaixo. A Camila responde com os brinquedos livres e o valor para a sua data.">
                <div className="linha-botoes">
                  <a className="botao botao--sol" href={linkWhatsapp(mensagemFesta(pedido))} target="_blank" rel="noopener">
                    <IconeWhatsapp /> Abrir o WhatsApp de novo
                  </a>
                  <Link to="/" className="botao botao--nuvem">
                    Voltar ao início
                  </Link>
                </div>
              </Tela>
            ) : passo === 0 ? (
              <Tela titulo="Qual é a data da festa?">
                <div className="opcoes">
                  {[
                    { nome: "Próximo sábado", v: proximoSabado() },
                    { nome: "Sábado seguinte", v: proximoSabado(1) },
                  ].map((o) => (
                    <button key={o.nome} className="chip" aria-pressed={d.data === o.v} onClick={() => mudar("data", o.v)}>
                      {o.nome} · {formatarData(o.v).slice(0, 5)}
                    </button>
                  ))}
                </div>
                <label className="campo">
                  <span>Ou escolha no calendário</span>
                  <input type="date" min={minimo} value={d.data} onChange={(e) => mudar("data", e.target.value)} />
                </label>
                {dataInvalida && <p className="aviso aviso--erro">Escolha uma data a partir de amanhã.</p>}
                {d.data && !dataInvalida && (
                  <p className="aviso">
                    {formatarData(d.data)}, {diaDaSemana(d.data)}.
                    {temporada && " Esse mês é de temporada e as datas saem rápido: vale garantir logo."}
                  </p>
                )}
              </Tela>
            ) : passo === 1 ? (
              <Tela titulo="Que horas a festa começa?" texto="A montagem é feita antes desse horário.">
                <div className="opcoes opcoes--horas">
                  {HORARIOS.map((h) => (
                    <button key={h} className="chip" aria-pressed={d.inicio === h} onClick={() => mudar("inicio", h)}>
                      {h}
                    </button>
                  ))}
                </div>
                <p className="campo__titulo">E quanto tempo de brincadeira?</p>
                <div className="opcoes">
                  {DURACOES.map((h) => (
                    <button key={h} className="chip" aria-pressed={d.duracao === h} onClick={() => mudar("duracao", h)}>
                      {h}
                    </button>
                  ))}
                </div>
              </Tela>
            ) : passo === 2 ? (
              <Tela titulo="Onde vai ser?">
                <div className="opcoes">
                  {LOCAIS.map((l) => (
                    <button key={l} className="chip" aria-pressed={d.local === l} onClick={() => mudar("local", l)}>
                      {l}
                    </button>
                  ))}
                </div>
                <p className="campo__titulo">Os brinquedos ficam…</p>
                <div className="opcoes">
                  <button className="chip" aria-pressed={d.espaco === "coberto"} onClick={() => mudar("espaco", "coberto")}>
                    Em lugar coberto
                  </button>
                  <button className="chip" aria-pressed={d.espaco === "externo"} onClick={() => mudar("espaco", "externo")}>
                    Ao ar livre
                  </button>
                </div>
                <label className="campo">
                  <span>Bairro e cidade</span>
                  <input type="text" autoComplete="address-level2" placeholder="Ex.: Vila Mariana, São Paulo" maxLength={60} value={d.bairro} onChange={(e) => mudar("bairro", e.target.value)} />
                </label>
              </Tela>
            ) : passo === 3 ? (
              <Tela titulo="Quantas crianças vão brincar?">
                <div className="opcoes">
                  {QUANTIDADES.map((q) => (
                    <button key={q} className="chip" aria-pressed={d.criancas === q} onClick={() => mudar("criancas", q)}>
                      {q}
                    </button>
                  ))}
                </div>
                <p className="campo__titulo">De que idades? (pode marcar mais de uma)</p>
                <div className="opcoes">
                  {IDADES.map((i) => {
                    const marcado = d.idades.includes(i);
                    return (
                      <button key={i} className="chip" aria-pressed={marcado} onClick={() => mudar("idades", marcado ? d.idades.filter((x) => x !== i) : [...d.idades, i])}>
                        {i}
                      </button>
                    );
                  })}
                </div>
              </Tela>
            ) : passo === 4 ? (
              <Tela titulo="Quais brinquedos?" texto="Os marcados com estrela combinam com o seu espaço e as idades. Cada brinquedo é um gomo novo no balão.">
                <div className="escolha-brinquedos">
                  {BRINQUEDOS.map((b) => {
                    const dentro = festa.tem(b.id);
                    const bom = sugerido(b.espacos, b.idade);
                    return (
                      <button key={b.id} className={`escolha${dentro ? " escolha--dentro" : ""}${bom ? " escolha--sugerida" : " escolha--fora"}`} aria-pressed={dentro} onClick={() => festa.alternar(b.id)}>
                        <Foto nome={b.fotos[0] ?? ""} alt="" />
                        <span className="escolha__nome">
                          {bom && <span className="escolha__estrela" aria-label="Combina com a sua festa">★</span>}
                          {b.nome}
                        </span>
                        <span className="escolha__marca">{dentro ? <IconeCheck /> : "+"}</span>
                      </button>
                    );
                  })}
                </div>
                {festa.itens.includes("toboga-piscina") && d.espaco === "coberto" && <p className="aviso">O tobogã com piscina precisa de área aberta e ponto de água. A Camila confirma com você.</p>}
              </Tela>
            ) : (
              <Tela titulo="Para quem é o orçamento?">
                <label className="campo">
                  <span>Seu nome</span>
                  <input type="text" autoComplete="name" maxLength={50} value={d.nome} onChange={(e) => mudar("nome", e.target.value)} />
                </label>
                <label className="campo">
                  <span>Alguma observação? (opcional)</span>
                  <textarea rows={3} maxLength={300} placeholder="Ex.: tema da festa, escada no local, horário de retirada" value={d.observacao ?? ""} onChange={(e) => mudar("observacao", e.target.value)} />
                </label>
                <div className="resumo">
                  <h3>Resumo</h3>
                  <ul>
                    <li>
                      <strong>Data</strong> {formatarData(d.data)} ({diaDaSemana(d.data)})
                    </li>
                    <li>
                      <strong>Horário</strong> {d.inicio}, {d.duracao}
                    </li>
                    <li>
                      <strong>Local</strong> {d.local}, {pedido.espaco.toLowerCase()} · {d.bairro}
                    </li>
                    <li>
                      <strong>Crianças</strong> {d.criancas} · {d.idades.join(", ")}
                    </li>
                    <li>
                      <strong>Brinquedos</strong> {nomesDosBrinquedos(festa.itens).join(", ")}
                    </li>
                  </ul>
                </div>
              </Tela>
            )}
          </div>

          {!enviado && (
            <div className="monte__navegacao">
              {passo > 0 ? (
                <button className="botao botao--nuvem botao--pequeno" onClick={() => ir(passo - 1)}>
                  <IconeVoltar /> Voltar
                </button>
              ) : (
                <span />
              )}
              {passo < PASSOS.length - 1 ? (
                <button className="botao botao--ceu" disabled={!podeAvancar} onClick={() => ir(passo + 1)}>
                  Continuar <IconeSeta />
                </button>
              ) : (
                <a
                  className={`botao botao--sol${podeAvancar ? "" : " desativado"}`}
                  aria-disabled={!podeAvancar}
                  href={podeAvancar ? linkWhatsapp(mensagemFesta(pedido)) : undefined}
                  target="_blank"
                  rel="noopener"
                  onClick={(e) => {
                    if (!podeAvancar) {
                      e.preventDefault();
                      return;
                    }
                    setEnviado(true);
                  }}
                >
                  <IconeWhatsapp /> Enviar no WhatsApp
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Tela({ titulo, texto, children }: { titulo: string; texto?: string; children: ReactNode }) {
  return (
    <>
      <h2 className="monte__pergunta">{titulo}</h2>
      {texto && <p className="monte__ajuda">{texto}</p>}
      {children}
    </>
  );
}
