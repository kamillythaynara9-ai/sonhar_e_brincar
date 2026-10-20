/**
 * CONTATO
 * EFEITO: três "nuvens" de contato (WhatsApp, Instagram, atendimento)
 *   que flutuam em ritmos diferentes; formulário curto em bolha branca.
 * INTERAÇÃO: o formulário valida e abre o WhatsApp com a mensagem
 *   organizada (assunto em botões, nada de <select>).
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CabecaPagina } from "@/components/comum/CabecaPagina";
import { IconeInstagram, IconeLocal, IconeRelogio, IconeWhatsapp } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { MARCA } from "@/config/marca";
import { MENSAGEM_PADRAO, linkWhatsapp, mensagemContato } from "@/lib/whatsapp";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: `Contato · ${MARCA.nome}` },
      { name: "description", content: "Fale com a Sonhar e Brincar pelo WhatsApp ou Instagram. Atendimento direto com a Camila." },
      { property: "og:title", content: `Contato · ${MARCA.nome}` },
    ],
  }),
  component: Contato,
});

const ASSUNTOS = ["Orçamento", "Disponibilidade de data", "Festa em escola ou empresa", "Outro assunto"];

function Contato() {
  const [nome, setNome] = useState("");
  const [assunto, setAssunto] = useState(ASSUNTOS[0] ?? "");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (nome.trim().length < 2) return setErro("Escreva o seu nome.");
    if (mensagem.trim().length < 5) return setErro("Conte um pouco do que você precisa.");
    setErro("");
    window.open(linkWhatsapp(mensagemContato({ nome: nome.trim(), assunto, mensagem: mensagem.trim() })), "_blank", "noopener");
  }

  const canais = [
    { icone: IconeWhatsapp, titulo: "WhatsApp", texto: MARCA.whatsappVisivel, link: linkWhatsapp(MENSAGEM_PADRAO), cor: "rosa" },
    { icone: IconeInstagram, titulo: "Instagram", texto: `@${MARCA.instagram}`, link: `https://instagram.com/${MARCA.instagram}`, cor: "sol" },
    { icone: IconeRelogio, titulo: "Atendimento", texto: MARCA.atendimento, cor: "ceu" },
    {
      icone: IconeLocal,
      titulo: "Onde atendemos",
      texto: MARCA.areasAtendidas.length ? MARCA.areasAtendidas.join(" · ") : `${MARCA.regiao}. Pergunte pelo seu bairro.`,
      cor: "agua",
    },
  ];

  return (
    <>
      <CabecaPagina
        rotulo="Contato"
        titulo={
          <>
            Fale direto <span className="destaque-festa">com a Camila</span>
          </>
        }
        texto="Quem responde é a dona, quase na hora. Mande a data e o local da festa para agilizar."
      />
      <section className="conteiner contato">
        <div className="contato__canais">
          {canais.map((c, i) => {
            const conteudo = (
              <>
                <span className="canal__icone">
                  <c.icone />
                </span>
                <span className="canal__titulo">{c.titulo}</span>
                <span className="canal__texto">{c.texto}</span>
              </>
            );
            return (
              <Revelar key={c.titulo} atraso={i * 0.08}>
                {c.link ? (
                  <a className={`canal canal--${c.cor} canal--${i}`} href={c.link} target="_blank" rel="noopener">
                    {conteudo}
                  </a>
                ) : (
                  <div className={`canal canal--${c.cor} canal--${i}`}>{conteudo}</div>
                )}
              </Revelar>
            );
          })}
        </div>

        <Revelar className="contato__form-caixa">
          <form className="contato__form" onSubmit={enviar} noValidate>
            <h2>Mande uma mensagem</h2>
            <label className="campo">
              <span>Seu nome</span>
              <input type="text" autoComplete="name" maxLength={50} value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>
            <p className="campo__titulo">Assunto</p>
            <div className="opcoes" role="group" aria-label="Assunto">
              {ASSUNTOS.map((a) => (
                <button type="button" key={a} className="chip" aria-pressed={assunto === a} onClick={() => setAssunto(a)}>
                  {a}
                </button>
              ))}
            </div>
            <label className="campo">
              <span>Mensagem</span>
              <textarea rows={4} maxLength={500} value={mensagem} onChange={(e) => setMensagem(e.target.value)} placeholder="Ex.: festa de 5 anos no salão do prédio, dia 15/11, umas 20 crianças." />
            </label>
            {erro && (
              <p className="aviso aviso--erro" role="alert">
                {erro}
              </p>
            )}
            <button type="submit" className="botao botao--sol">
              <IconeWhatsapp /> Enviar pelo WhatsApp
            </button>
          </form>
        </Revelar>
      </section>
    </>
  );
}
