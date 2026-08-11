# onepage/ — a página

Direção escolhida por painel de direção de arte (10/08/2026): **"Peso e Silêncio"**, editorial, com hero cinematográfico.

> O critério não foi "qual é mais bonita". Foi: *ela não avalia tecnologia, avalia acabamento, porque acabamento é o produto dela.*

## A assinatura: a régua que esfria

Todo bloco nasce do mesmo gesto: um fio de 1px é plotado da esquerda para a direita **em âmbar**, o texto sobe de dentro de uma máscara 140ms depois, e aos 620ms o fio **esfria** para cinza e fica.

**O âmbar é a luz do desenho. O cinza é a estrutura construída.**

## Os arquivos

| Arquivo | Camada | Muda por cliente? |
|---|---|---|
| `marca.css` | Cor, fonte, escala, ritmo | **Sim** |
| `config.js` | WhatsApp, vídeo, endpoint do lead | **Sim** |
| `index.html` | Estrutura + texto PT (com o inglês em `data-en`) | Textos sim |
| `estilo.css` | Motor visual, sem uma cor literal | Não |
| `movimento.js` | Motor de movimento e idioma | Não |
| `img/` | As imagens em WebP (originais em `img/_originais/`) | Sim |

## Bilíngue sem duplicar página

O **português vive no HTML** (sem JS a página continua completa, e o buscador indexa PT). O **inglês vive no atributo `data-en`** de cada elemento. O botão PT/EN no topo troca tudo e guarda a preferência. Quem chega com navegador em outro idioma vê inglês na primeira visita.

## As imagens

Geradas com Higgsfield (Cinema Studio 2.5), direção cinematográfica dark na paleta da marca. Todas em WebP, somando **236 KB** (hero com 66 KB, versão de celular com 11 KB).

| Arquivo | Onde | O que é |
|---|---|---|
| `hero.webp` / `hero-mob.webp` | Hero | Concreto brutalista com uma fresta de luz âmbar. A régua da marca virou arquitetura. |
| `espelho.webp` | O problema | Recepção de instituto vazia à noite, tablet fechado, uma luz acesa. A operação parada. |
| `metodo.webp` | Método | Escada em espiral: geometria, repetição, ordem. |
| `entregas.webp` | Card "nada disso é pacote" | Textura de metal escovado, quase invisível. |
| `case.webp` | Case e player do depoimento | Sala de atendimento vazia, luz quente contra luz da cidade. |
| `diagnostico.webp` | Fundo da porta | Prancha técnica, a 15% de opacidade. |

## O vídeo, destacado de outra forma

Saiu do fundo do hero (onde seria textura muda) e ganhou **bloco próprio**: player grande com poster tratado, a citação da cliente em Newsreader ao lado, e um aviso honesto de que o vídeo entra quando a gravação existir. O clique abre um `<dialog>` nativo. O arquivo só carrega quando alguém pede.

## Travas técnicas (auditoria de performance)

`.js` no `<head>` (sem JS a página é estática e completa) · `overflow-x:clip` e nunca `hidden` · `100vh` com `@supports` para `svh` · `viewport-fit=cover` e safe-area · só `transform` e `opacity` animam · zero `backdrop-filter` · um IntersectionObserver para a página · campos com 16px no celular · `<dialog>` nativo · `--texto-2` corrigido para passar em AA · `prefers-reduced-motion` desliga tudo.

## Antes de publicar

- [ ] Gravar o vídeo (specs em `../video/leia-me.md`) e virar `config.video.ativo`
- [ ] Definir `config.lead.endpoint`, senão o lead só existe no navegador da pessoa
- [ ] LinkedIn real em `config.marca.linkedin` ou o item fica fora
- [ ] Autorização para nomear a cliente (hoje é "um instituto premium na Bélgica")
- [ ] Checklist móvel: Slow 4G com CPU 4x, iPhone com Pouca Energia, navegador interno do Instagram
