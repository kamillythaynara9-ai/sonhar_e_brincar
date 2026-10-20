/**
 * BRINQUEDOS EM DESTAQUE — vitrine arrastável
 * EFEITO: fotos reais em cartões com canto de nuvem; o cartão "aperta"
 *   como inflável no toque e inclina de leve conforme o mouse.
 * INTERAÇÃO: arrastar com o dedo ou o mouse (com inércia), setas no
 *   computador, "Pôr na festa" direto do cartão.
 */
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Apertavel } from "@/components/site/Apertavel";
import { BotaoFesta } from "@/components/site/BotaoFesta";
import { Foto } from "@/components/site/Foto";
import { IconeSeta, IconeVoltar } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { BRINQUEDOS, CATEGORIAS } from "@/config/brinquedos";
import { useArrastar } from "@/lib/arrastar";

export function Destaques() {
  const trilho = useRef<HTMLDivElement>(null);
  useArrastar(trilho);
  const rolar = (dir: number) => trilho.current?.scrollBy({ left: dir * trilho.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section className="destaques" id="brinquedos">
      <div className="conteiner destaques__cabeca">
        <Revelar>
          <span className="rotulo">Nossos brinquedos</span>
          <h2 className="titulo-secao">
            Escolha o que vai <span className="destaque-rosa">encher a festa</span>
          </h2>
        </Revelar>
        <div className="destaques__setas">
          <button className="seta-redonda" onClick={() => rolar(-1)} aria-label="Anteriores">
            <IconeVoltar />
          </button>
          <button className="seta-redonda" onClick={() => rolar(1)} aria-label="Próximos">
            <IconeSeta />
          </button>
        </div>
      </div>

      <div className="destaques__trilho" ref={trilho}>
        {BRINQUEDOS.map((b, i) => {
          const cat = CATEGORIAS.find((c) => c.id === b.categoria);
          return (
            <Revelar key={b.id} atraso={Math.min(i, 4) * 0.08} className="destaques__item">
              <Apertavel className={`cartao-brinquedo cartao-brinquedo--${cat?.cor ?? "ceu"}`}>
                <Link to="/brinquedos/$id" params={{ id: b.id }} className="cartao-brinquedo__foto" draggable={false}>
                  <Foto nome={b.fotos[0] ?? ""} alt={b.nome} />
                  <span className="cartao-brinquedo__selo">{cat?.nome}</span>
                </Link>
                <div className="cartao-brinquedo__corpo">
                  <h3>
                    <Link to="/brinquedos/$id" params={{ id: b.id }} draggable={false}>
                      {b.nome}
                    </Link>
                  </h3>
                  <p>{b.resumo}</p>
                  <BotaoFesta id={b.id} nome={b.nome} pequeno />
                </div>
              </Apertavel>
            </Revelar>
          );
        })}
        <div className="destaques__fim">
          <Link to="/brinquedos" className="botao botao--ceu">
            Ver catálogo completo <IconeSeta />
          </Link>
        </div>
      </div>
    </section>
  );
}
