/**
 * FATOS DA SONHAR E BRINCAR — o único lugar com nome, contato, horários e
 * textos que vêm da cliente. Nenhum componente escreve telefone ou endereço
 * na mão. O que está marcado "A CONFIRMAR" é exemplo e precisa ser trocado
 * antes do site final (lista completa no README).
 */
export const MARCA = {
  nome: "Sonhar e Brincar",
  nomeAntigo: "Sonho Real",
  slogan: "Locação de brinquedos",
  responsavel: "Camila",

  // A CONFIRMAR: WhatsApp da Camila (só dígitos, com 55 + DDD).
  whatsappDigitos: "5500000000000",
  whatsappVisivel: "(00) 00000-0000",

  // Instagram atual. A CONFIRMAR: o @ novo com o nome Sonhar e Brincar.
  instagram: "sonhoreal.brinquedos",

  // A CONFIRMAR: cidades e bairros atendidos (a página de contato lista
  // os bairros quando esta lista tiver itens).
  regiao: "São Paulo e região",
  areasAtendidas: [] as string[],

  // A CONFIRMAR: horário de atendimento no WhatsApp.
  atendimento: "Todos os dias, das 8h às 20h",

  // Temporada forte informada pela Camila (outubro e dezembro).
  mesesTemporada: [9, 11], // 0 = janeiro

  historia: {
    titulo: "Começou numa festa de um ano",
    texto: [
      "A Sonhar e Brincar nasceu na festa de um ano da filha da Camila. Os fornecedores atrasaram, os brinquedos chegaram velhos e a festa que ela tinha sonhado virou dor de cabeça.",
      "Foi ali que ela decidiu trabalhar com eventos, para que nenhuma outra mãe passasse pelo que ela passou: brinquedo bonito, limpo, montado na hora combinada e alguém do outro lado do WhatsApp que responde de verdade.",
    ],
    frase: "Não é sobre alugar brinquedos. É sobre confiança, bons relacionamentos e clientes que voltam.",
  },

  valores: [
    { titulo: "Comprometida", texto: "Horário combinado é horário cumprido. A montagem fica pronta antes de a festa começar." },
    { titulo: "Confiável", texto: "Brinquedos limpos, revisados e montados com cuidado a cada evento." },
    { titulo: "Amiga", texto: "Atendimento direto com a Camila, do primeiro oi até a retirada." },
  ],
} as const;

export type Marca = typeof MARCA;
