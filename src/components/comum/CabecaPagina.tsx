/**
 * CABEÇA DAS PÁGINAS INTERNAS
 * EFEITO: título grande com a palavra-chave no degradê da logo, sobre um
 *   céu claro; fotos reais flutuam à direita em molduras de nuvem (sobem
 *   e descem devagar, em ritmos diferentes). Borda de nuvem embaixo.
 * POR QUE: cada página abre com a mesma "cara de céu", mas com as fotos
 *   do assunto da página.
 */
import type { CSSProperties, ReactNode } from "react";
import { Foto } from "@/components/site/Foto";

type Props = { rotulo: string; titulo: ReactNode; texto?: ReactNode; fotos?: string[]; children?: ReactNode };

export function CabecaPagina({ rotulo, titulo, texto, fotos = [], children }: Props) {
  return (
    <section className={`cabeca-pagina borda-nuvem-baixo${fotos.length ? " cabeca-pagina--com-fotos" : ""}`}>
      <div className="conteiner cabeca-pagina__grade">
        <div className="cabeca-pagina__texto">
          <span className="rotulo entra-apos-intro">{rotulo}</span>
          <h1 className="titulo-pagina entra-apos-intro" style={{ "--ordem": 1 } as CSSProperties}>
            {titulo}
          </h1>
          {texto && (
            <p className="texto-apoio entra-apos-intro" style={{ "--ordem": 2 } as CSSProperties}>
              {texto}
            </p>
          )}
          {children && (
            <div className="entra-apos-intro" style={{ "--ordem": 3 } as CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {fotos.length > 0 && (
          <div className="cabeca-pagina__fotos" aria-hidden="true">
            {fotos.slice(0, 3).map((f, i) => (
              <div key={f} className={`cabeca-pagina__foto cabeca-pagina__foto--${i} moldura-nuvem`}>
                <Foto nome={f} alt="" prioridade />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
