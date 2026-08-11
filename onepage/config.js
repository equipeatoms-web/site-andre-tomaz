/**
 * config.js — CAMADA "CONFIGURAÇÃO DO CLIENTE" (comportamento)
 *
 * Aqui vive só o que o motor precisa saber em tempo de execução.
 * A identidade visual está em marca.css (tokens).
 * O texto vive no index.html, em português, com a versão inglesa
 * no atributo data-en de cada elemento. Assim a página continua
 * completa sem JavaScript e o buscador indexa o português.
 *
 * Trocar de cliente = trocar este arquivo + marca.css + os textos do HTML.
 */

window.CONFIG = {

  marca: {
    nome: 'ANDRÉ TOMAZ',
    whatsapp: '5511975956901',   // destino do formulário
    instagram: 'https://www.instagram.com/andretomazsd/',
    linkedin: '',                // vazio = o item não vai para o rodapé
  },

  /* ---------- VÍDEO DO DEPOIMENTO ----------
     ativo: false enquanto a gravação não existe. O bloco de depoimento
     mostra o poster com "Em breve" e continua fazendo sentido.
     Quando os arquivos existirem (specs em ../video/leia-me.md):
     virar true e conferir os caminhos.                              */
  video: {
    ativo: false,
    completo: '../video/depoimento-completo.mp4',
    poster:   '../video/depoimento-poster.jpg',
    legenda:  '../video/depoimento-pt.vtt',
  },

  /* ---------- CAPTAÇÃO DO LEAD ----------
     O lead é registrado AQUI antes de o WhatsApp abrir. Sem endpoint,
     nada sai do navegador e o lead se perde se a pessoa não completar
     a conversa. Na produção: uma rota no VPS, um Formspree ou o
     webhook de uma planilha.                                        */
  lead: {
    endpoint: '',
  },
};
