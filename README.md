# Sonhar e Brincar · site

Site da Sonhar e Brincar (locação de brinquedos para festas), feito pela DERS.
React + TanStack Start, gerado como páginas estáticas (pré-renderizadas) para a Vercel.

## Páginas
- `/` início: topo com as fotos reais trocando por uma nuvem que "enche", vitrine arrastável, por que confiar, combos, como funciona, história e perguntas
- `/brinquedos` catálogo com filtros (tipo e espaço) e busca
- `/brinquedos/<brinquedo>` uma página por brinquedo, com ficha, combos e "Pôr na festa"
- `/combos` combos prontos + convite para montar o próprio
- `/monte-sua-festa` pedido de orçamento em 6 passos, que chega organizado no WhatsApp
- `/como-funciona` linha do tempo do dia da festa, limpeza e segurança, perguntas
- `/sobre` a história da Camila e o nome novo
- `/contato` canais e mensagem rápida pelo WhatsApp

"Minha festa": em qualquer página a pessoa junta brinquedos; o balão da logo ganha um gomo colorido por brinquedo e leva tudo para o "Monte sua festa".

## Onde mudar o conteúdo
- Contato, região, horário, história: `src/config/marca.ts`
- Brinquedos e combos: `src/config/brinquedos.ts` (fotos em `public/fotos`, .webp e .jpg com o mesmo nome)
- Perguntas frequentes: `src/config/perguntas.ts`
- Cores, fontes, formas e animações: `src/styles.css` (só lá)

## O que é real e o que é exemplo
Real: logo, as 9 fotos dos brinquedos, a história da Camila, o público, o tom de voz, as perguntas que ela mais ouve, a temporada (outubro e dezembro), o nome antigo (Sonho Real) e o Instagram atual.

**A CONFIRMAR com a Camila antes do site final:**
- WhatsApp (hoje `5500000000000`) e o @ novo do Instagram
- Cidades e bairros atendidos, horário de atendimento
- Nomes certos dos brinquedos, medidas, idade indicada e crianças por vez (valores de referência)
- Combos reais (os 4 do site são exemplo) e se há monitor durante a festa
- Respostas das perguntas frequentes e regras de segurança
- 4 fotos grandes da pasta do Drive (8 a 10 MB) não baixaram; podem entrar depois

## Rodar e publicar
```
bun install
bun run dev        # http://127.0.0.1:3000
bun run build      # gera dist/client
```
Na Vercel: importar o repositório e clicar em Deploy (o `vercel.json` já diz o comando e a pasta).
