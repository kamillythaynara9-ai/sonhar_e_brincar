/**
 * Links do WhatsApp com a mensagem pronta.
 * SEMPRE com encodeURIComponent: acentos, quebras de linha e "&" quebram o
 * link se não forem codificados. Campos em *negrito* para a Camila ler rápido.
 */
import { MARCA } from "@/config/marca";
import { buscarBrinquedo } from "@/config/brinquedos";

export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${MARCA.whatsappDigitos}?text=${encodeURIComponent(mensagem)}`;
}

/** Converte "2026-10-21" em "21/10/2026" sem depender de fuso horário. */
export function formatarData(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/** "2026-10-21" -> "terça-feira" */
export function diaDaSemana(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  const data = new Date(a ?? 2000, (m ?? 1) - 1, d ?? 1);
  return data.toLocaleDateString("pt-BR", { weekday: "long" });
}

export function nomesDosBrinquedos(ids: string[]): string[] {
  return ids.map((id) => buscarBrinquedo(id)?.nome ?? id);
}

export type PedidoFesta = {
  data: string; // AAAA-MM-DD
  inicio: string; // "14:00"
  duracao: string; // "4 horas"
  local: string; // "Salão de festas"
  espaco: string; // "Coberto" | "Ao ar livre"
  bairro: string;
  criancas: string; // "Até 15"
  idades: string[]; // ["3 a 5 anos", ...]
  brinquedos: string[]; // ids
  nome: string;
  observacao?: string | undefined;
};

/** Pedido completo do "Monte sua festa". */
export function mensagemFesta(p: PedidoFesta): string {
  return [
    `Olá, ${MARCA.nome}! Quero um orçamento para a minha festa 🎈`,
    ``,
    `*Data:* ${formatarData(p.data)} (${diaDaSemana(p.data)})`,
    `*Horário:* a partir das ${p.inicio}, ${p.duracao}`,
    `*Local:* ${p.local} · ${p.espaco}`,
    `*Bairro/cidade:* ${p.bairro}`,
    `*Crianças:* ${p.criancas} · ${p.idades.join(", ")}`,
    `*Brinquedos:*`,
    ...nomesDosBrinquedos(p.brinquedos).map((n) => `• ${n}`),
    ...(p.observacao ? [`*Observação:* ${p.observacao}`] : []),
    `*Nome:* ${p.nome}`,
  ].join("\n");
}

export function mensagemBrinquedo(nome: string): string {
  return `Olá, ${MARCA.nome}! Quero saber a disponibilidade e o valor do *${nome}*.`;
}

export function mensagemCombo(nome: string, itens: string[]): string {
  return [
    `Olá, ${MARCA.nome}! Quero o orçamento do combo *${nome}*:`,
    ...nomesDosBrinquedos(itens).map((n) => `• ${n}`),
    ``,
    `*Data da festa:* `,
  ].join("\n");
}

export type Contato = { nome: string; assunto: string; mensagem: string };

export function mensagemContato(c: Contato): string {
  return [`Olá, ${MARCA.nome}!`, ``, `*Assunto:* ${c.assunto}`, `*Mensagem:* ${c.mensagem}`, `*Nome:* ${c.nome}`].join("\n");
}

export const MENSAGEM_PADRAO = `Olá, ${MARCA.nome}! Vim pelo site e quero saber sobre o aluguel de brinquedos para a minha festa.`;
