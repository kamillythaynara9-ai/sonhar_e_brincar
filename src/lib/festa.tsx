/**
 * "Minha festa": os brinquedos que a pessoa vai juntando enquanto navega
 * (no catálogo, nos combos, na página de cada brinquedo). O balão flutuante
 * mostra quantos são, e o "Monte sua festa" já começa com eles.
 * Guardado no localStorage (com try/catch: pode estar bloqueado).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const CHAVE = "sonhar-e-brincar:festa";

type Festa = {
  itens: string[];
  tem: (id: string) => boolean;
  alternar: (id: string) => void;
  adicionar: (ids: string[]) => void;
  remover: (id: string) => void;
  limpar: () => void;
  /** muda a cada item novo, para o balão "encher" */
  pulso: number;
};

const ContextoFesta = createContext<Festa | null>(null);

function ler(): string[] {
  try {
    const v = JSON.parse(window.localStorage.getItem(CHAVE) ?? "[]") as unknown;
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function FestaProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<string[]>([]);
  const [pulso, setPulso] = useState(0);

  useEffect(() => setItens(ler()), []);
  useEffect(() => {
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(itens));
    } catch {
      /* sem armazenamento: a festa vale só nesta visita */
    }
  }, [itens]);

  const adicionar = useCallback((ids: string[]) => {
    setItens((atual) => {
      const novos = ids.filter((id) => !atual.includes(id));
      if (novos.length) setPulso((p) => p + 1);
      return [...atual, ...novos];
    });
  }, []);
  const remover = useCallback((id: string) => setItens((a) => a.filter((x) => x !== id)), []);
  const alternar = useCallback(
    (id: string) => {
      setItens((atual) => {
        if (atual.includes(id)) return atual.filter((x) => x !== id);
        setPulso((p) => p + 1);
        return [...atual, id];
      });
    },
    [],
  );
  const limpar = useCallback(() => setItens([]), []);

  const valor = useMemo<Festa>(
    () => ({ itens, tem: (id) => itens.includes(id), alternar, adicionar, remover, limpar, pulso }),
    [itens, alternar, adicionar, remover, limpar, pulso],
  );
  return <ContextoFesta.Provider value={valor}>{children}</ContextoFesta.Provider>;
}

export function useFesta(): Festa {
  const f = useContext(ContextoFesta);
  if (!f) throw new Error("useFesta fora do FestaProvider");
  return f;
}
