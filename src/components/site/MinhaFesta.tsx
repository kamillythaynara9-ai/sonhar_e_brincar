/**
 * MINHA FESTA (balão flutuante + gaveta)
 * EFEITO: aparece quando a pessoa escolhe o primeiro brinquedo. O balão
 *   ganha um gomo colorido e "enche" (passa do ponto e volta) a cada item.
 * INTERAÇÃO: toque abre a gaveta com a lista; dá para tirar itens e seguir
 *   para o "Monte sua festa" com tudo já marcado.
 * POR QUE: é a interação assinatura do site. Juntar brinquedos enquanto
 *   navega é o jeito real de montar uma festa, e o balão é da logo.
 */
import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { buscarBrinquedo } from "@/config/brinquedos";
import { useFesta } from "@/lib/festa";
import { Balao } from "./Balao";
import { Foto } from "./Foto";
import { IconeFechar, IconeSeta } from "./Icones";

export function MinhaFesta() {
  const { itens, remover, pulso } = useFesta();
  const [aberta, setAberta] = useState(false);
  const local = useLocation();
  const naPaginaDaFesta = local.pathname.endsWith("/monte-sua-festa");

  useEffect(() => setAberta(false), [local.pathname]);
  useEffect(() => {
    if (itens.length === 0) setAberta(false);
  }, [itens.length]);

  if (itens.length === 0 || naPaginaDaFesta) return null;

  return (
    <>
      <button className="minha-festa" onClick={() => setAberta(true)} aria-haspopup="dialog" aria-expanded={aberta}>
        <span key={pulso} className="minha-festa__balao">
          <Balao gomos={itens.length} />
        </span>
        <span className="minha-festa__texto">
          Minha festa
          <strong>
            {itens.length} {itens.length === 1 ? "brinquedo" : "brinquedos"}
          </strong>
        </span>
      </button>

      {aberta && (
        <div className="gaveta" role="dialog" aria-modal="true" aria-label="Brinquedos da minha festa">
          <button className="gaveta__fundo" aria-label="Fechar" onClick={() => setAberta(false)} />
          <div className="gaveta__painel">
            <div className="gaveta__topo">
              <h2>Minha festa</h2>
              <button className="gaveta__fechar" onClick={() => setAberta(false)} aria-label="Fechar">
                <IconeFechar />
              </button>
            </div>
            <ul className="gaveta__lista">
              {itens.map((id) => {
                const b = buscarBrinquedo(id);
                if (!b) return null;
                return (
                  <li key={id}>
                    <Foto nome={b.fotos[0] ?? ""} alt="" className="gaveta__foto" />
                    <span>{b.nome}</span>
                    <button className="gaveta__tirar" onClick={() => remover(id)} aria-label={`Tirar ${b.nome}`}>
                      <IconeFechar />
                    </button>
                  </li>
                );
              })}
            </ul>
            <Link to="/monte-sua-festa" className="botao botao--sol gaveta__acao">
              Escolher data e pedir orçamento <IconeSeta />
            </Link>
            <Link to="/brinquedos" className="gaveta__mais">
              Ver mais brinquedos
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
