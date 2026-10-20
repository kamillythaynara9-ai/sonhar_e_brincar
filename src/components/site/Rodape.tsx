/**
 * RODAPÉ — última chamada + contatos + mapa do site.
 * Começa com uma borda de nuvem (sem linha) e fundo de anoitecer: a lua da
 * logo aparece aqui, fechando o "dia de festa".
 */
import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-360.webp";
import { MARCA } from "@/config/marca";
import { MENSAGEM_PADRAO, linkWhatsapp } from "@/lib/whatsapp";
import { PAGINAS } from "./Cabecalho";
import { IconeInstagram, IconeWhatsapp } from "./Icones";

export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="rodape borda-nuvem-cima" style={{ "--cor-proxima": "var(--nuvem)" } as CSSProperties}>
      <span className="rodape__lua" aria-hidden="true" />
      <div className="conteiner rodape__grade">
        <div className="rodape__chamada">
          <h2>
            Bora deixar a sua festa <span className="destaque-sol">pronta para brincar</span>?
          </h2>
          <p>Mande a data e o local. A Camila responde com os brinquedos disponíveis e o valor.</p>
          <div className="rodape__botoes">
            <a className="botao botao--sol" href={linkWhatsapp(MENSAGEM_PADRAO)} target="_blank" rel="noopener">
              <IconeWhatsapp /> Chamar no WhatsApp
            </a>
            <Link className="botao botao--nuvem" to="/monte-sua-festa">
              Monte sua festa
            </Link>
          </div>
        </div>
        <div className="rodape__colunas">
          <div>
            <img className="rodape__logo" src={logo} alt="Sonhar e Brincar" width={360} height={216} loading="lazy" />
            <p className="rodape__texto">
              {MARCA.slogan} para festas e eventos em {MARCA.regiao}.
            </p>
          </div>
          <nav aria-label="Páginas do site" className="rodape__links">
            {PAGINAS.map((p) => (
              <Link key={p.para} to={p.para}>
                {p.nome}
              </Link>
            ))}
          </nav>
          <div className="rodape__links">
            <a href={linkWhatsapp(MENSAGEM_PADRAO)} target="_blank" rel="noopener">
              <IconeWhatsapp /> {MARCA.whatsappVisivel}
            </a>
            <a href={`https://instagram.com/${MARCA.instagram}`} target="_blank" rel="noopener">
              <IconeInstagram /> @{MARCA.instagram}
            </a>
            <span>{MARCA.atendimento}</span>
          </div>
        </div>
        <p className="rodape__assinatura">
          © {ano} {MARCA.nome} · Site por DERS
        </p>
      </div>
    </footer>
  );
}
