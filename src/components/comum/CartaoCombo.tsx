/**
 * CARTÃO DE COMBO
 * EFEITO: as fotos reais dos brinquedos do combo ficam empilhadas como
 *   fotos sobre a mesa; ao passar o mouse (ou tocar) elas se abrem em
 *   leque e o cartão aperta como inflável.
 * INTERAÇÃO: "Pôr tudo na festa" enche o balão com todos os itens;
 *   "Pedir orçamento" abre o WhatsApp com o combo escrito.
 */
import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { Apertavel } from "@/components/site/Apertavel";
import { Foto } from "@/components/site/Foto";
import { IconeCheck, IconeMais, IconeWhatsapp } from "@/components/site/Icones";
import { buscarBrinquedo, type Combo } from "@/config/brinquedos";
import { useFesta } from "@/lib/festa";
import { linkWhatsapp, mensagemCombo } from "@/lib/whatsapp";

export function CartaoCombo({ combo }: { combo: Combo }) {
  const { adicionar, itens } = useFesta();
  const todosDentro = combo.itens.every((id) => itens.includes(id));
  const brinquedos = combo.itens.map(buscarBrinquedo).filter((b) => b !== undefined);
  return (
    <Apertavel className={`combo combo--${combo.cor}`} tabIndex={-1}>
      <div className="combo__pilha" aria-hidden="true">
        {brinquedos.map((b, i) => (
          <div key={b.id} className="combo__foto" style={{ "--i": i, "--n": brinquedos.length } as CSSProperties}>
            <Foto nome={b.fotos[0] ?? ""} alt="" />
          </div>
        ))}
      </div>
      <div className="combo__corpo">
        <h3>{combo.nome}</h3>
        <p className="combo__quem">{combo.paraQuem}</p>
        <ul className="combo__itens">
          {brinquedos.map((b) => (
            <li key={b.id}>
              <Link to="/brinquedos/$id" params={{ id: b.id }}>
                {b.nome}
              </Link>
            </li>
          ))}
        </ul>
        <div className="combo__botoes">
          <button type="button" className={`botao botao--pequeno ${todosDentro ? "botao--ceu" : "botao--sol"}`} onClick={() => adicionar(combo.itens)} aria-pressed={todosDentro}>
            {todosDentro ? <IconeCheck /> : <IconeMais />}
            {todosDentro ? "Tudo na festa" : "Pôr tudo na festa"}
          </button>
          <a className="botao botao--pequeno botao--nuvem" href={linkWhatsapp(mensagemCombo(combo.nome, combo.itens))} target="_blank" rel="noopener">
            <IconeWhatsapp /> Pedir orçamento
          </a>
        </div>
      </div>
    </Apertavel>
  );
}
