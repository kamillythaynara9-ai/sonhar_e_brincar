/**
 * O BALÃO DA LOGO, desenhado como forma (não é foto de produto).
 * Cada gomo é um brinquedo escolhido: com 0 itens é um balão branco de
 * contorno; a cada brinquedo ganha um gomo colorido nas cores da logo.
 */
const CORES = ["var(--rosa)", "var(--sol)", "var(--agua)", "var(--ceu)"];

export function Balao({ gomos, className }: { gomos: number; className?: string }) {
  const n = Math.max(gomos, 1);
  const larguraGomo = 64 / n;
  return (
    <svg className={className} viewBox="0 0 80 104" aria-hidden="true">
      <defs>
        <clipPath id="balao-corpo">
          <path d="M40 4C20 4 6 19 6 37c0 20 20 36 28 46h12c8-10 28-26 28-46C74 19 60 4 40 4Z" />
        </clipPath>
        <radialGradient id="balao-brilho" cx="0.32" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g clipPath="url(#balao-corpo)">
        <rect x="0" y="0" width="80" height="90" fill="#fff" />
        {gomos > 0 &&
          Array.from({ length: n }, (_, i) => (
            <rect key={i} x={8 + i * larguraGomo} y="0" width={larguraGomo + 0.5} height="90" fill={CORES[i % CORES.length]} />
          ))}
        <rect x="0" y="0" width="80" height="90" fill="url(#balao-brilho)" />
      </g>
      <path d="M40 4C20 4 6 19 6 37c0 20 20 36 28 46h12c8-10 28-26 28-46C74 19 60 4 40 4Z" fill="none" stroke="var(--nuvem-3)" strokeWidth="2.5" />
      <path d="M34 83l-3 9M46 83l3 9" stroke="#b07a3a" strokeWidth="2" />
      <rect x="29" y="91" width="22" height="11" rx="3" fill="var(--sol-forte)" />
    </svg>
  );
}
