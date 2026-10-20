/**
 * CATÁLOGO DE BRINQUEDOS — fotos reais enviadas pela Camila.
 * Os nomes saíram das fotos; medidas, idade indicada e número de crianças
 * são EXEMPLO (A CONFIRMAR com a Camila). Valores não aparecem no site:
 * o orçamento é feito no WhatsApp.
 */
export type Categoria = "inflaveis" | "camas-elasticas" | "bolinhas" | "aquaticos";
export type Espaco = "coberto" | "externo";

export type Brinquedo = {
  id: string;
  nome: string;
  categoria: Categoria;
  resumo: string;
  descricao: string;
  fotos: string[]; // arquivos em public/fotos (sem extensão; há .webp e .jpg)
  espacos: Espaco[];
  idade: string; // A CONFIRMAR
  criancas: string; // A CONFIRMAR: quantas brincam ao mesmo tempo
  medidas: string; // A CONFIRMAR
  energia: boolean; // precisa de tomada (infláveis com motor)
  agua?: boolean;
};

export const CATEGORIAS: { id: Categoria; nome: string; cor: "sol" | "rosa" | "ceu" | "agua" }[] = [
  { id: "inflaveis", nome: "Infláveis", cor: "rosa" },
  { id: "camas-elasticas", nome: "Camas elásticas", cor: "ceu" },
  { id: "bolinhas", nome: "Bolinhas e desafios", cor: "sol" },
  { id: "aquaticos", nome: "Com água", cor: "agua" },
];

export const BRINQUEDOS: Brinquedo[] = [
  {
    id: "castelo-inflavel",
    nome: "Castelo inflável",
    categoria: "inflaveis",
    resumo: "O pula-pula clássico, com torres e rede de proteção dos lados.",
    descricao:
      "Castelo azul, vermelho e amarelo com área de pulo cercada por rede. Cabe em salão de festas e em quintal, e é o brinquedo que mais segura a criançada no mesmo lugar.",
    fotos: ["castelo-inflavel", "castelo-festa-rua"],
    espacos: ["coberto", "externo"],
    idade: "3 a 10 anos",
    criancas: "até 6 por vez",
    medidas: "3 x 3 m, 3 m de altura",
    energia: true,
  },
  {
    id: "toboga-piscina",
    nome: "Tobogã com piscina",
    categoria: "aquaticos",
    resumo: "Escorregador inflável que termina numa piscina. Sucesso garantido no calor.",
    descricao:
      "Tobogã alto com escada lateral e descida até a piscina inflável. Ideal para festas em área externa nos dias quentes. Pode ser montado sem água, como escorregador.",
    fotos: ["toboga-piscina"],
    espacos: ["externo"],
    idade: "5 a 12 anos",
    criancas: "1 descendo por vez",
    medidas: "6 x 3 m, 4 m de altura",
    energia: true,
    agua: true,
  },
  {
    id: "gladiador-inflavel",
    nome: "Gladiador inflável",
    categoria: "inflaveis",
    resumo: "Ringue fofinho com duas bases e bastões acolchoados para o duelo.",
    descricao:
      "Cada criança sobe na sua base e tenta derrubar a outra com o bastão de espuma. A queda é no colchão inflável. Diverte quem joga e quem assiste, e funciona bem com adolescentes.",
    fotos: ["gladiador-inflavel"],
    espacos: ["coberto", "externo"],
    idade: "7 anos ou mais",
    criancas: "2 por rodada",
    medidas: "5 x 5 m",
    energia: true,
  },
  {
    id: "futebol-inflavel",
    nome: "Futebol inflável",
    categoria: "inflaveis",
    resumo: "Campinho de mesa inflável com gols nas pontas, para jogar em dupla ou em time.",
    descricao:
      "Campo de futebol inflável em tamanho mesa, com borda alta para a bola não fugir. Entra em salão pequeno e vira campeonato rápido entre as crianças.",
    fotos: ["futebol-inflavel"],
    espacos: ["coberto", "externo"],
    idade: "4 anos ou mais",
    criancas: "2 a 4 por partida",
    medidas: "2,5 x 1,5 m",
    energia: false,
  },
  {
    id: "cama-elastica",
    nome: "Cama elástica",
    categoria: "camas-elasticas",
    resumo: "Cama elástica com rede de proteção alta, proteção de molas e escadinha.",
    descricao:
      "Cama elástica redonda com tela de proteção colorida em volta, capa sobre as molas e escada para subir. Vai bem em quintal, área de condomínio e salão com pé-direito alto.",
    fotos: ["cama-elastica-quintal", "cama-elastica-produto"],
    espacos: ["coberto", "externo"],
    idade: "3 a 12 anos",
    criancas: "até 3 por vez",
    medidas: "3,05 m de diâmetro",
    energia: false,
  },
  {
    id: "cama-elastica-casinha",
    nome: "Cama elástica com casinha",
    categoria: "camas-elasticas",
    resumo: "Cama elástica junto de uma casinha coberta com piscina de bolinhas.",
    descricao:
      "Dois brinquedos lado a lado: a cama elástica com rede e uma casinha de lona colorida com piscina de bolinhas para os menores. Bom para festas com idades misturadas.",
    fotos: ["cama-elastica-casinha"],
    espacos: ["coberto", "externo"],
    idade: "2 a 10 anos",
    criancas: "até 6 por vez",
    medidas: "4,5 x 3 m",
    energia: false,
  },
  {
    id: "tombo-legal",
    nome: "Tombo Legal",
    categoria: "bolinhas",
    resumo: "A cadeira que tomba para trás numa piscina cheia de bolinhas.",
    descricao:
      "A criança senta, alguém puxa a alavanca e a cadeira tomba devagar dentro da piscina de bolinhas. Vira fila na festa e rende as melhores fotos.",
    fotos: ["tombo-legal"],
    espacos: ["coberto", "externo"],
    idade: "3 a 12 anos",
    criancas: "1 por vez",
    medidas: "1,2 x 2 m",
    energia: false,
  },
];

export function buscarBrinquedo(id: string): Brinquedo | undefined {
  return BRINQUEDOS.find((b) => b.id === id);
}

/** Combos de EXEMPLO: a Camila confirma os combos e valores reais. */
export type Combo = {
  id: string;
  nome: string;
  paraQuem: string;
  itens: string[]; // ids de brinquedos
  cor: "sol" | "rosa" | "ceu";
};

export const COMBOS: Combo[] = [
  {
    id: "festa-no-salao",
    nome: "Festa no salão",
    paraQuem: "Salão de festas ou área coberta, crianças de 3 a 10 anos.",
    itens: ["castelo-inflavel", "tombo-legal"],
    cor: "rosa",
  },
  {
    id: "quintal-animado",
    nome: "Quintal animado",
    paraQuem: "Quintal ou área de condomínio, idades misturadas.",
    itens: ["cama-elastica-casinha", "futebol-inflavel"],
    cor: "ceu",
  },
  {
    id: "dia-de-calor",
    nome: "Dia de calor",
    paraQuem: "Área externa com ponto de água, crianças maiores.",
    itens: ["toboga-piscina", "gladiador-inflavel"],
    cor: "sol",
  },
  {
    id: "festa-completa",
    nome: "Festa completa",
    paraQuem: "Eventos grandes, aniversários de condomínio e festas de rua.",
    itens: ["castelo-inflavel", "cama-elastica", "gladiador-inflavel", "tombo-legal"],
    cor: "rosa",
  },
];
