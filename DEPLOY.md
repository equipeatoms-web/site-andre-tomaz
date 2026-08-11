# Deploy no EasyPanel

Repositório: `equipeatoms-web/site-andre-tomaz` (privado), branch `main`.

O site não tem etapa de build. O `Dockerfile` só copia `publicar/` para dentro de um nginx.

## 1. Criar o app

EasyPanel → projeto → **+ Service** → **App**.

- **Name**: `andretomaz`
- **Source**: GitHub
  - Owner `equipeatoms-web`, Repo `site-andre-tomaz`, Branch `main`
  - Repositório privado: o EasyPanel precisa da conexão GitHub autorizada
    (Settings → GitHub → conectar a conta `equipeatoms-web`). Sem isso o clone falha.
- **Build**: **`Dockerfile`**, caminho `Dockerfile`
- **Deploy**: porta **80**

> **O erro mais comum aqui.** O EasyPanel vem com **Nixpacks** selecionado por padrão.
> O Nixpacks vê o `package.json`, conclui que é uma app Node e monta uma imagem Node em
> vez do nginx. Tem que trocar para Dockerfile na aba **Build** — se o log mencionar
> `nixpacks`, `npm ci` ou `npm run build`, é isso.
>
> Se por algum motivo o Nixpacks for mesmo o caminho, ele funciona: o `npm start` sobe o
> `servidor.js` na porta que o EasyPanel injetar via `PORT`. Nesse caso a porta do
> **Deploy** é `3000`, não 80. Mas o Dockerfile é o certo — nginx serve estático melhor
> que Node.

Clicar em **Deploy** e acompanhar o log até `Successfully built`.

## 2. Domínio

App → **Domains** → Add:

- Host: `andretomaz.com`
- Port: `80`
- **HTTPS** ligado (Let's Encrypt)

No DNS, `andretomaz.com` tem que apontar (A) para o IP do servidor do EasyPanel.
Adicionar também `www.andretomaz.com` como domínio e marcar redirecionamento para
a versão sem www — escolher um dos dois e ficar com ele.

> O `andretomaz.com` já está no ar com o site antigo. Se ele é servido por outro app
> do mesmo EasyPanel, remova o domínio daquele app **antes** de adicionar aqui —
> dois apps não podem responder pelo mesmo host. Depois de conferir que o novo está
> certo, desligue o antigo.

## 3. Conferir depois do deploy

```
https://andretomaz.com/            → inglês (x-default)
https://andretomaz.com/pt/         → português
https://andretomaz.com/robots.txt
https://andretomaz.com/sitemap.xml
https://andretomaz.com/llms.txt
```

## 4. Publicar uma alteração

Editar `onepage/_fonte.html` (nunca os `index.html`, que são gerados), então:

```bash
npm run gerar    # reescreve publicar/index.html e publicar/pt/index.html
npm run dev      # confere em http://localhost:3000
git add -A && git commit -m "..." && git push
```

No EasyPanel, **Deploy** de novo (ou ligar o auto-deploy por webhook em
App → Source → Auto Deploy, que redeploya a cada push na `main`).

## Rodando local

```bash
npm run dev
```

Serve `publicar/` em `http://localhost:3000` com as mesmas regras do nginx
(diretório vira `index.html`, `/pt/` funciona).
