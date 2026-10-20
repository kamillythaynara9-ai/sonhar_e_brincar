/**
 * BOTÃO DO WHATSAPP (flutuante, zona do polegar)
 * EFEITO: entra logo depois da intro com um pulo; um anel de luz respira
 *   em volta para chamar o dedo sem piscar demais.
 */
import { MENSAGEM_PADRAO, linkWhatsapp } from "@/lib/whatsapp";
import { IconeWhatsapp } from "./Icones";

export function BotaoWhatsapp() {
  return (
    <a className="whats-flutuante" href={linkWhatsapp(MENSAGEM_PADRAO)} target="_blank" rel="noopener" aria-label="Falar com a Sonhar e Brincar no WhatsApp">
      <IconeWhatsapp />
    </a>
  );
}
