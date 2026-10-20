/**
 * CABEÇALHO
 * EFEITO: transparente sobre a primeira tela; ao rolar vira vidro claro
 *   e encolhe um pouco. Logo grande no canto esquerdo.
 * INTERAÇÃO: no celular o menu abre em tela cheia com links grandes que
 *   entram um a um; a página atual fica marcada.
 */
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo-360.webp";
import { IconeFechar, IconeMenu } from "./Icones";

export const PAGINAS = [
  { para: "/", nome: "Início" },
  { para: "/brinquedos", nome: "Brinquedos" },
  { para: "/combos", nome: "Combos" },
  { para: "/como-funciona", nome: "Como funciona" },
  { para: "/sobre", nome: "Nossa história" },
  { para: "/contato", nome: "Contato" },
] as const;

export function Cabecalho() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 24);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  return (
    <header className={`cabecalho${rolou ? " cabecalho--rolou" : ""}`}>
      <div className="cabecalho__barra">
        <Link to="/" className="cabecalho__logo" aria-label="Sonhar e Brincar, página inicial" onClick={() => setAberto(false)}>
          <img src={logo} alt="Sonhar e Brincar · Locação de brinquedos" width={360} height={216} />
        </Link>
        <nav className="cabecalho__nav" aria-label="Principal">
          {PAGINAS.slice(1).map((p) => (
            <Link key={p.para} to={p.para} className="cabecalho__link" activeProps={{ "aria-current": "page" }}>
              {p.nome}
            </Link>
          ))}
        </nav>
        <Link to="/monte-sua-festa" className="botao botao--pequeno cabecalho__acao">
          Monte sua festa
        </Link>
        <button className="cabecalho__menu" aria-expanded={aberto} aria-controls="menu-celular" onClick={() => setAberto((a) => !a)}>
          {aberto ? <IconeFechar /> : <IconeMenu />}
          <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
        </button>
      </div>

      <div id="menu-celular" className={`menu-celular${aberto ? " menu-celular--aberto" : ""}`} hidden={!aberto}>
        <nav aria-label="Menu">
          {PAGINAS.map((p, i) => (
            <Link
              key={p.para}
              to={p.para}
              className="menu-celular__link"
              style={{ transitionDelay: `${0.05 * i + 0.08}s` }}
              activeOptions={{ exact: p.para === "/" }}
              activeProps={{ "aria-current": "page" }}
              onClick={() => setAberto(false)}
            >
              {p.nome}
            </Link>
          ))}
        </nav>
        <Link to="/monte-sua-festa" className="botao botao--sol menu-celular__acao" onClick={() => setAberto(false)}>
          Monte sua festa
        </Link>
      </div>
    </header>
  );
}
