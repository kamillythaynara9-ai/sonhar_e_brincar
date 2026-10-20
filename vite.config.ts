// Build próprio: gera o site como arquivos estáticos prontos para a Vercel.
// Cada página do site entra em `pages` para sair pré-renderizada (boa para o
// Google e abre rápido no celular). BASE = endereço onde o site fica publicado.
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { BRINQUEDOS } from "./src/config/brinquedos";

const BASE = process.env["SITE_BASE"] ?? "/";

const PAGINAS = [
  "/",
  "/brinquedos",
  "/combos",
  "/monte-sua-festa",
  "/como-funciona",
  "/sobre",
  "/contato",
  ...BRINQUEDOS.map((b) => `/brinquedos/${b.id}`),
];

export default defineConfig({
  base: BASE,
  server: { host: "127.0.0.1" },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      router: { basepath: BASE },
      server: { entry: "server" },
      prerender: { enabled: true, crawlLinks: false },
      pages: PAGINAS.map((path) => ({ path })),
    }),
    viteReact(),
  ],
});
