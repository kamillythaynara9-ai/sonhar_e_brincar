/**
 * MOLDURA DE TODAS AS PÁGINAS: fontes, cabeçalho, céu de fundo, rodapé,
 * WhatsApp flutuante e o balão "Minha festa". A intro roda só na primeira
 * página aberta (ao navegar pelo menu ela não se repete).
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HeadContent, Link, Outlet, Scripts, createRootRouteWithContext, type ErrorComponentProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BotaoWhatsapp } from "@/components/site/BotaoWhatsapp";
import { Cabecalho } from "@/components/site/Cabecalho";
import { CeuVivo } from "@/components/site/CeuVivo";
import { Intro } from "@/components/site/Intro";
import { MinhaFesta } from "@/components/site/MinhaFesta";
import { Rodape } from "@/components/site/Rodape";
import { MARCA } from "@/config/marca";
import { FestaProvider } from "@/lib/festa";
import appCss from "../styles.css?url";

const BASE = import.meta.env.BASE_URL;

function NaoEncontrada() {
  return (
    <section className="pagina-vazia conteiner">
      <span className="rotulo">Ops</span>
      <h1 className="titulo-secao">Essa página voou com o balão.</h1>
      <p className="texto-apoio">O endereço pode ter mudado. Volte para o início ou veja os brinquedos.</p>
      <div className="linha-botoes">
        <Link to="/" className="botao">
          Ir para o início
        </Link>
        <Link to="/brinquedos" className="botao botao--nuvem">
          Ver brinquedos
        </Link>
      </div>
    </section>
  );
}

function Erro({ error }: ErrorComponentProps) {
  console.error(error);
  return (
    <section className="pagina-vazia conteiner">
      <h1 className="titulo-secao">Essa página não carregou.</h1>
      <p className="texto-apoio">Tente atualizar. Se continuar, chame a gente no WhatsApp.</p>
      <a href={BASE} className="botao">
        Ir para o início
      </a>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${MARCA.nome} · Locação de brinquedos para festas` },
      { name: "description", content: "Castelo inflável, cama elástica, tobogã com piscina e mais para a sua festa. Entrega, montagem no horário e retirada. Orçamento pelo WhatsApp." },
      { name: "theme-color", content: "#e2f2fd" },
      { property: "og:site_name", content: MARCA.nome },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${BASE}og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Fredoka (títulos, redonda como o nome na logo) + Figtree (texto)
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;700;800&family=Fredoka:wght@500;600;700&display=swap" },
      { rel: "icon", href: `${BASE}favicon.png`, type: "image/png" },
      { rel: "apple-touch-icon", href: `${BASE}favicon.png` },
    ],
  }),
  shellComponent: Casca,
  component: Moldura,
  notFoundComponent: NaoEncontrada,
  errorComponent: Erro,
});

function Casca({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Moldura() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <FestaProvider>
        <Intro />
        <CeuVivo />
        <Cabecalho />
        <main id="conteudo">
          <Outlet />
        </main>
        <Rodape />
        <MinhaFesta />
        <BotaoWhatsapp />
      </FestaProvider>
    </QueryClientProvider>
  );
}
