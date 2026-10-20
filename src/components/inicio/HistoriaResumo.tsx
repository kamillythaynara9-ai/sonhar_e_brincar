/**
 * HISTÓRIA (resumo) — a frase da Camila em letra grande dentro de uma
 * nuvem, com estrelas da logo girando devagar em volta.
 * POR QUE: a história real dela é o maior argumento de confiança.
 */
import { Link } from "@tanstack/react-router";
import { IconeEstrela, IconeSeta } from "@/components/site/Icones";
import { Revelar } from "@/components/site/Revelar";
import { MARCA } from "@/config/marca";

export function HistoriaResumo() {
  return (
    <section className="historia-resumo" id="historia">
      <div className="conteiner">
        <Revelar className="historia-resumo__nuvem">
          <IconeEstrela className="historia-resumo__estrela historia-resumo__estrela--a" />
          <IconeEstrela className="historia-resumo__estrela historia-resumo__estrela--b" />
          <IconeEstrela className="historia-resumo__estrela historia-resumo__estrela--c" />
          <span className="rotulo">{MARCA.historia.titulo}</span>
          <blockquote>
            <p>“{MARCA.historia.frase}”</p>
            <footer>{MARCA.responsavel}, fundadora</footer>
          </blockquote>
          <p className="texto-apoio">{MARCA.historia.texto[0]}</p>
          <Link to="/sobre" className="botao botao--ceu">
            Conheça a nossa história <IconeSeta />
          </Link>
        </Revelar>
      </div>
    </section>
  );
}
