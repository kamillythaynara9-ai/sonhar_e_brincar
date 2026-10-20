/**
 * PÁGINA INICIAL — ordem da conversa de venda:
 *   impacto (Topo) -> o que temos (Destaques) -> por que confiar (Promessas)
 *   -> escolha (Combos) -> como funciona (Passos) -> história (confiança)
 *   -> dúvidas (Perguntas) -> última chamada (Rodapé, na moldura).
 */
import { createFileRoute } from "@tanstack/react-router";
import { Perguntas } from "@/components/comum/Perguntas";
import { CombosResumo } from "@/components/inicio/CombosResumo";
import { Destaques } from "@/components/inicio/Destaques";
import { HistoriaResumo } from "@/components/inicio/HistoriaResumo";
import { PassosResumo } from "@/components/inicio/PassosResumo";
import { Promessas } from "@/components/inicio/Promessas";
import { Topo } from "@/components/inicio/Topo";
import { MARCA } from "@/config/marca";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${MARCA.nome} · Aluguel de brinquedos para festas em ${MARCA.regiao}` },
      { property: "og:title", content: `${MARCA.nome} · Locação de brinquedos` },
      { property: "og:description", content: "A diversão chega antes da festa. Entrega, montagem no horário e retirada. Monte sua festa e peça o orçamento no WhatsApp." },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  return (
    <>
      <Topo />
      <Destaques />
      <Promessas />
      <CombosResumo />
      <PassosResumo />
      <HistoriaResumo />
      <Perguntas quantas={4} />
    </>
  );
}
