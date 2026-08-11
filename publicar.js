// Copia onepage/ para publicar/ deixando de fora o que nao vai para o ar.
// O gerar.py escreve dentro de onepage/; este passo e o que mantem publicar/ igual.

const fs = require('node:fs');
const path = require('node:path');

const ORIGEM = path.join(__dirname, 'onepage');
const DESTINO = path.join(__dirname, 'publicar');

// Arquivos de trabalho: fonte, gerador, originais das imagens, anotacoes.
const FORA = new Set(['gerar.py', 'leia-me.md']);
const ficaDeFora = (nome) => nome.startsWith('_') || FORA.has(nome);

let copiados = 0;

function copiar(origem, destino) {
  fs.mkdirSync(destino, { recursive: true });
  for (const item of fs.readdirSync(origem, { withFileTypes: true })) {
    if (ficaDeFora(item.name)) continue;
    const de = path.join(origem, item.name);
    const para = path.join(destino, item.name);
    if (item.isDirectory()) {
      copiar(de, para);
    } else {
      fs.copyFileSync(de, para);
      copiados++;
    }
  }
}

copiar(ORIGEM, DESTINO);
console.log(`publicar/  ${copiados} arquivos`);
