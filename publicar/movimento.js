/* =============================================================
   movimento.js — O MOTOR DE MOVIMENTO
   Regras que valem em todo o arquivo:
   - Só transform e opacity são animados (as duas propriedades baratas).
   - Nada roda fora da viewport. Nada roda com a aba em segundo plano.
   - prefers-reduced-motion desliga tudo, e a página continua completa.
   - Um único IntersectionObserver serve a página inteira.
   ============================================================= */
(function () {
  'use strict';

  var CFG = window.CONFIG || {};
  var REDUZ = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINO = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ----------------------------------------------------------
     1. ABERTURA DO HERO
     A cena só começa quando a fonte está pronta (senão o peso
     pula em vez de assentar). Teto de 900ms para não travar.
     Se a pessoa já rolou, corta para o estado final.
  ---------------------------------------------------------- */
  function abrir() {
    document.body.classList.add('pronto');
    if (scrollY > 40) document.body.classList.add('sem-cena');
  }
  if (REDUZ) {
    document.body.classList.add('pronto', 'sem-cena');
  } else {
    var teto = new Promise(function (r) { setTimeout(r, 900); });
    var fontes = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.race([fontes, teto]).then(function () { setTimeout(abrir, 200); });
  }

  /* ----------------------------------------------------------
     2. REVELAÇÃO UNIVERSAL
     Um observer só. Dispara na linha de leitura (28% acima da
     borda inferior), não na borda, e para de observar depois.
  ---------------------------------------------------------- */
  var alvos = document.querySelectorAll('.rev, .regua, .masc, .campo-e, .etapa, .case-lista li');
  if ('IntersectionObserver' in window && !REDUZ) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('on');
        obs.unobserve(e.target);
        if (e.target.classList.contains('case-lista')) {
          e.target.classList.add('costurado');
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -22% 0px' });
    alvos.forEach(function (a) { obs.observe(a); });

    var lista = document.querySelector('.case-lista');
    if (lista) obs.observe(lista);
  } else {
    alvos.forEach(function (a) { a.classList.add('on'); });
    var l2 = document.querySelector('.case-lista');
    if (l2) l2.classList.add('on', 'costurado');
  }

  /* ----------------------------------------------------------
     3. MÉTODO: a faixa de leitura
     Uma faixa de 10% no meio da tela funciona como cabeça de
     leitura. O estado ACUMULA: etapa acesa nunca apaga.
  ---------------------------------------------------------- */
  var etapas = [].slice.call(document.querySelectorAll('.etapa'));
  var trilho = document.querySelector('.trilho');
  if (etapas.length && 'IntersectionObserver' in window) {
    var maxIdx = -1;
    var leitor = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = etapas.indexOf(e.target);
        if (i > maxIdx) maxIdx = i;
        for (var k = 0; k <= maxIdx; k++) etapas[k].classList.add('ativa');
        if (trilho) trilho.style.setProperty('--p', (maxIdx + 1) / etapas.length);
      });
    }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });
    etapas.forEach(function (et) { leitor.observe(et); });
  } else {
    etapas.forEach(function (et) { et.classList.add('ativa'); });
  }

  /* ----------------------------------------------------------
     4. VÍDEO DO DEPOIMENTO
     O hero é imagem. O vídeo vive no bloco de depoimento e só
     carrega quando a pessoa clica: zero custo para quem não pede.
  ---------------------------------------------------------- */
  function montarDepoimento() {
    var v = CFG.video || {};
    var caixa = document.querySelector('.modal-video');
    if (!v.ativo || !caixa) return;
    caixa.innerHTML = '';
    var el = document.createElement('video');
    el.controls = true; el.playsInline = true; el.preload = 'none';
    if (v.poster) el.poster = v.poster;
    el.src = v.completo;
    if (v.legenda) {
      var t = document.createElement('track');
      t.kind = 'captions'; t.srclang = 'pt'; t.label = 'Português';
      t.src = v.legenda; t.default = true;
      el.appendChild(t);
    }
    caixa.appendChild(el);
    var dur = document.querySelector('.player-rot .dur');
    if (dur) { dur.textContent = 'Assistir'; dur.dataset.en = 'Watch'; }
  }
  montarDepoimento();

  /* ----------------------------------------------------------
     5. MODAL DO DEPOIMENTO
     <dialog> nativo: foco preso, fundo inerte, Escape, tudo grátis.
  ---------------------------------------------------------- */
  var dlg = document.getElementById('modalDepo');
  var btnDepo = document.getElementById('btnDepo');
  if (dlg && btnDepo) {
    btnDepo.addEventListener('click', function () { dlg.showModal(); });
    dlg.querySelector('.modal-fechar').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('close', function () {
      var v = dlg.querySelector('video');
      if (v) { v.pause(); v.currentTime = 0; }
    });
  }

  /* ----------------------------------------------------------
     6. O FORMULÁRIO
     Capta o lead ANTES de encaminhar, guarda rascunho para
     sobreviver à volta do WhatsApp, e acende a régua conforme
     a pessoa preenche de verdade.
  ---------------------------------------------------------- */
  var form = document.getElementById('formDiag');
  if (form) {
    var RASCUNHO = 'diag_rascunho';
    var campos = ['nome', 'empresa', 'setor', 'contato', 'gargalo'];
    var segs = document.querySelectorAll('.progresso span');
    var btn = form.querySelector('.btn');

    // restaura o que a pessoa já tinha digitado
    try {
      var salvo = JSON.parse(sessionStorage.getItem(RASCUNHO) || '{}');
      campos.forEach(function (c) { if (salvo[c]) form.elements[c].value = salvo[c]; });
    } catch (e) {}

    function medir() {
      var ok = 0;
      campos.forEach(function (c, i) {
        var val = (form.elements[c].value || '').trim();
        var bom = val.length > 1;
        if (segs[i]) segs[i].classList.toggle('ok', bom);
        if (bom) ok++;
      });
      if (btn) btn.classList.toggle('energizado', ok === campos.length);
    }

    form.addEventListener('input', function () {
      medir();
      try {
        var o = {};
        campos.forEach(function (c) { o[c] = form.elements[c].value; });
        sessionStorage.setItem(RASCUNHO, JSON.stringify(o));
      } catch (e) {}
    });
    medir();

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var d = {};
      campos.forEach(function (c) { d[c] = (form.elements[c].value || '').trim(); });
      d.pagina = location.href;
      d.origem = document.referrer || 'direto';

      /* 1. CAPTA O LEAD PRIMEIRO.
         sendBeacon não é cancelado pela navegação que vem a seguir.
         Sem endpoint configurado, o protótipo só guarda localmente. */
      var alvo = (CFG.lead && CFG.lead.endpoint) || '';
      if (alvo && navigator.sendBeacon) {
        try {
          navigator.sendBeacon(alvo, new Blob([JSON.stringify(d)], { type: 'application/json' }));
        } catch (e) {}
      }

      /* 2. MONTA A CONVERSA COM O CONTEXTO JÁ ESCRITO. */
      var msg = 'Olá André, sou ' + d.nome + ', da ' + d.empresa + ' (' + d.setor + ').\n\n'
              + 'Pedi o diagnóstico pelo seu site.\n\n'
              + 'O maior gargalo hoje: ' + d.gargalo;
      var url = 'https://wa.me/' + (CFG.marca && CFG.marca.whatsapp) + '?text=' + encodeURIComponent(msg);

      /* 3. CONFIRMA E ENCAMINHA. */
      form.style.display = 'none';
      var ok = document.getElementById('formOk');
      var link = document.getElementById('linkWhats');
      if (link) link.href = url;
      if (ok) {
        ok.classList.add('on');
        ok.focus();
      }
      try { sessionStorage.removeItem(RASCUNHO); } catch (e) {}
      // location.href, não window.open: bloqueador de popup ignora o open.
      setTimeout(function () { location.href = url; }, 350);
    });
  }

  /* ----------------------------------------------------------
     7. NAVEGAÇÃO QUE APARECE DEPOIS DO HERO
     Sentinela no fim do hero: enquanto ele está visível, a barra
     fica escondida. Zero listener de scroll.
  ---------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var hero = document.querySelector('.hero');
  if (nav && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      nav.classList.toggle('on', !es[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-70% 0px 0px 0px' }).observe(hero);
  }

  /* ----------------------------------------------------------
     8. BARRA DE PROGRESSO (só onde não há scroll-driven nativo)
  ---------------------------------------------------------- */
  var barra = document.querySelector('.progresso-leitura i');
  var temNativo = CSS.supports && CSS.supports('animation-timeline', 'scroll()');
  if (barra && !temNativo && !REDUZ) {
    var tick = false;
    addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        var alt = document.documentElement.scrollHeight - innerHeight;
        barra.style.setProperty('--lido', alt > 0 ? (scrollY / alt) : 0);
        tick = false;
      });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     9. PLAYER DO DEPOIMENTO
     O bloco inteiro abre o mesmo <dialog> do hero.
  ---------------------------------------------------------- */
  var player = document.getElementById('btnPlayer');
  if (player && dlg) player.addEventListener('click', function () { dlg.showModal(); });

  /* ----------------------------------------------------------
     10. FIGURAS: a cortina que abre a imagem
  ---------------------------------------------------------- */
  var figs = document.querySelectorAll('.figura');
  if (figs.length && 'IntersectionObserver' in window && !REDUZ) {
    var oF = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('on');
        oF.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -12% 0px' });
    figs.forEach(function (f) { oF.observe(f); });
  } else {
    figs.forEach(function (f) { f.classList.add('on'); });
  }

  /* ----------------------------------------------------------
     11. IDIOMA
     Não há motor de idioma aqui: cada idioma tem URL própria
     (/ em inglês, /pt/ em português) e o seletor é um link de
     verdade. O buscador segue link; ele não clica em botão.
  ---------------------------------------------------------- */
})();
