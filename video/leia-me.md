# video/

Onde ficam os vídeos da one page. A estrutura no HTML já está pronta: quando os arquivos existirem, é só descomentar a tag `<video>` no hero e apagar a `div.hero-placeholder`.

## 1. `depoimento-neiva-loop.mp4` (fundo do hero)

Roda mudo, em loop, atrás do texto. Serve de atmosfera e prova ao mesmo tempo.

| Item | Especificação |
|---|---|
| Duração | 12 a 20 segundos, com corte que fecha em loop |
| Formato | MP4 (H.264) |
| Resolução | 1920x1080 (a página escala sozinha) |
| Peso | **máximo 3 MB.** Vídeo pesado no hero derruba a conversão no celular |
| Áudio | remover a faixa de áudio do arquivo (roda mudo de qualquer jeito e economiza peso) |
| Enquadramento | ela à direita do quadro; o texto ocupa a esquerda no desktop |
| Conteúdo | ela falando, gesticulando, no ambiente do instituto. Não precisa entender a fala: é presença, não mensagem |

**Cuidado de direção:** o véu escuro cobre 86% à esquerda e 55% à direita. Movimento suave funciona; corte rápido compete com a leitura.

## 2. `depoimento-poster.jpg` (primeiro quadro)

Aparece enquanto o vídeo carrega. JPG, 1920x1080, menos de 200 KB. Escolher um quadro em que o rosto dela esteja bem iluminado.

## 3. `depoimento-completo.mp4` (modal, com som)

O depoimento inteiro, que abre quando alguém clica em "Ver o depoimento de uma cliente". Aqui pode ter 1 a 3 minutos, com áudio e legenda queimada.

## Travas antes de publicar

- **Termo de imagem assinado.** Os modelos em quatro idiomas já existem em `G:\Neiva Cimini — Maison Ipanema\juridico\`.
- **Autorização para nomear.** Sem ela, a página segue dizendo "um instituto premium na Bélgica" e o vídeo não identifica a marca dela.
- **Compliance belga.** Nada no depoimento pode sugerir promessa clínica.
