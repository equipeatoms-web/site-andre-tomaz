# Pacote pronto para publicar

Tudo nesta pasta vai para a raiz do site. **332 KB no total.** Site estático puro: não precisa de Node, de build nem de banco.

```
/                    index.html          inglês (padrão, x-default)
/pt/                 pt/index.html       português
                     marca.css           tokens da identidade
                     estilo.css          motor visual
                     movimento.js        motor de movimento
                     config.js           WhatsApp, vídeo, endpoint do lead
                     robots.txt          libera crawlers de IA
                     sitemap.xml         as duas URLs com hreflang
                     llms.txt            como a IA deve citar o negócio
/img/                7 arquivos WebP     217 KB
```

## O que substitui

O `andretomaz.com` está no ar hoje com o site antigo (título "Arquiteto de Sistemas", e o `og:title` ainda com a frase aposentada). Este pacote substitui aquele conteúdo por inteiro.

## Como publicar no EasyPanel

1. EasyPanel → o app que serve o `andretomaz.com` hoje.
2. Se for um app estático: substituir o conteúdo da pasta pública por tudo que está aqui.
3. Se for um app com build (o site antigo parece Vite/React): o caminho limpo é criar um **novo app do tipo estático**, subir estes arquivos, apontar o domínio para ele e desligar o antigo.
4. Conferir depois de publicar:
   - `https://andretomaz.com/` abre em inglês
   - `https://andretomaz.com/pt/` abre em português
   - `https://andretomaz.com/robots.txt`, `/sitemap.xml` e `/llms.txt` respondem
   - HTTPS ativo e redirecionamento de www para sem-www (ou o contrário, mas escolha um só)

## Depois de publicar, na ordem

1. **Google Search Console**: adicionar a propriedade, verificar por DNS (a verificação por domínio cobre www, sem-www e subdomínios de uma vez), e enviar o `sitemap.xml`.
2. **Bing Webmaster Tools**: importa direto do Search Console, leva um minuto e alimenta o Copilot.
3. **Pedir indexação** das duas URLs manualmente no Search Console, para não esperar o rastreio natural.
4. **Definir `config.lead.endpoint`** no `config.js`. Sem ele, o lead só existe no navegador da pessoa: se ela não completar a conversa no WhatsApp, some.

## O que ainda falta no conteúdo

- Vídeo do depoimento (specs em `../video/leia-me.md`), e virar `config.video.ativo` para `true`
- LinkedIn real em `config.marca.linkedin`, ou o item continua fora
- Autorização para nomear a cliente: hoje o case diz "um instituto premium na Bélgica"
- Métricas do painel: enquanto não existirem, nenhum número aparece na página, e isso está correto

## Como mudar texto depois

Não edite `index.html` nem `pt/index.html`: eles são **gerados**. Edite `../onepage/_fonte.html` (inglês no HTML, português em `data-pt`) e rode:

```
python gerar.py
```

Isso reescreve as duas versões, já com title, description, hreflang e dados estruturados de cada idioma.
