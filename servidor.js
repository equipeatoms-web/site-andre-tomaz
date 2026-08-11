// Servidor de desenvolvimento: serve a pasta publicar/ do jeito que o host serve em producao.
// Sem dependencias — roda com `npm run dev`.

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.join(__dirname, 'publicar');
const PORTA = Number(process.env.PORT) || 3000;

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let alvo = path.join(RAIZ, path.normalize(url).replace(/^(\.\.[/\\])+/, ''));

    // Fora da raiz: nao serve.
    if (!alvo.startsWith(RAIZ)) {
      res.writeHead(403).end('403');
      return;
    }

    // Diretorio vira index.html, igual ao nginx.
    if (fs.existsSync(alvo) && fs.statSync(alvo).isDirectory()) {
      alvo = path.join(alvo, 'index.html');
    }

    fs.readFile(alvo, (erro, conteudo) => {
      if (erro) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404</h1>');
        return;
      }
      res.writeHead(200, {
        'Content-Type': TIPOS[path.extname(alvo).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(conteudo);
    });
  })
  .listen(PORTA, () => {
    console.log(`  EN  http://localhost:${PORTA}/`);
    console.log(`  PT  http://localhost:${PORTA}/pt/`);
  });
