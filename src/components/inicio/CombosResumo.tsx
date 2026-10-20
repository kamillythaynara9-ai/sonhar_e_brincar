/**
 * COMBOS (resumo na página inicial) — dois combos e o convite para montar
 * o próprio. Fundo de céu azul com borda de nuvem em cima e embaixo.
 */
import { Link } from "@tanstack/react-router";
import { CartaoCombo } from "@/components/comum/CartaoCombo";
import { IconeSeta } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { COMBOS } from "@/config/brinquedos";

export function CombosResumo() {
  return (
    <section className="combos-resumo borda-nuvem-cima borda-nuvem-baixo" id="combos">
      <div className="conteiner">
        <Revelar className="combos-resumo__cabeca">
          <span className="rotulo rotulo--claro">Combos</span>
          <h2 className="titulo-secao">
            Junte brinquedos e <span className="destaque-sol">monte a festa inteira</span>
          </h2>
          <p className="texto-apoio">A pergunta que a Camila mais ouve é "tem combo?". Tem, e você também pode montar o seu.</p>
        </Revelar>
        <div className="combos-resumo__lista">
          {COMBOS.slice(0, 2).map((c, i) => (
            <Revelar key={c.id} atraso={i * 0.1}>
              <CartaoCombo combo={c} />
            </Revelar>
          ))}
        </div>
        <div className="linha-botoes linha-botoes--centro">
          <Link to="/combos" className="botao botao--nuvem">
            Ver todos os combos <IconeSeta />
          </Link>
          <Link to="/monte-sua-festa" className="botao botao--sol">
            Montar o meu
          </Link>
        </div>
      </div>
    </section>
  );
}
