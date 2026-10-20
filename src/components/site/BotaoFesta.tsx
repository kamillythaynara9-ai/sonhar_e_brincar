/**
 * Botão "Pôr na festa" usado no catálogo, na página do brinquedo e nos combos.
 * Troca para "Na festa ✓" quando o item já está no balão.
 */
import { useFesta } from "@/lib/festa";
import { IconeCheck, IconeMais } from "./Icones";

export function BotaoFesta({ id, nome, pequeno = false }: { id: string; nome: string; pequeno?: boolean }) {
  const { tem, alternar } = useFesta();
  const dentro = tem(id);
  return (
    <button
      type="button"
      className={`botao ${dentro ? "botao--ceu" : "botao--sol"}${pequeno ? " botao--pequeno" : ""}`}
      aria-pressed={dentro}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        alternar(id);
      }}
    >
      {dentro ? <IconeCheck /> : <IconeMais />}
      {dentro ? "Na festa" : "Pôr na festa"}
      <span className="sr-only"> · {nome}</span>
    </button>
  );
}
