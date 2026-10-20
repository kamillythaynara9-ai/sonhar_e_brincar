/**
 * Relógio da intro, compartilhado com o topo e o botão do WhatsApp para
 * entrarem logo depois que ela sobe. Contado desde a abertura da página
 * (performance.now), não desde que o JavaScript carregou.
 */
export const DURACAO_INTRO = 2.6;

/** Segundos que faltam até a intro acabar (+ folga). */
export function atrasoAposIntro(folga = 0): number {
  const agora = typeof performance === "undefined" ? 0 : performance.now() / 1000;
  return Math.max(0, DURACAO_INTRO + folga - agora);
}

/** A intro roda só na primeira página aberta; ao navegar entre páginas, não. */
let jaRodou = false;
export function introJaRodou(): boolean {
  return jaRodou;
}
export function marcarIntroRodou(): void {
  jaRodou = true;
  // Textos com .entra-apos-intro passam a entrar sem esperar (navegação interna).
  document.documentElement.classList.add("intro-feita");
}
