/**
 * Foto real do brinquedo (public/fotos), em WebP com JPEG de reserva.
 * Fora da primeira tela carrega só quando chega perto (loading="lazy").
 */
import type { CSSProperties } from "react";

type Props = { nome: string; alt: string; className?: string; prioridade?: boolean; style?: CSSProperties };

export function caminhoFoto(nome: string, ext: "jpg" | "webp" = "jpg"): string {
  return `${import.meta.env.BASE_URL}fotos/${nome}.${ext}`;
}

export function Foto({ nome, alt, className, prioridade = false, style }: Props) {
  return (
    <picture>
      <source srcSet={caminhoFoto(nome, "webp")} type="image/webp" />
      <img
        src={caminhoFoto(nome)}
        alt={alt}
        className={className}
        style={style}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </picture>
  );
}
