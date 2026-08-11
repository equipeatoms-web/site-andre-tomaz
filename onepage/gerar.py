# -*- coding: utf-8 -*-
"""
gerar.py — GERADOR DAS DUAS VERSÕES DE IDIOMA

Fonte única: _fonte.html (inglês no HTML, português em data-pt).
Saída:
    index.html      inglês  (raiz, x-default)
    pt/index.html   português

Por que assim: o Google não enxerga texto trocado por JavaScript. Idioma que
vive em atributo não existe para o buscador. Cada idioma precisa de URL real,
com title, description e hreflang próprios.

Rodar depois de qualquer mudança de texto:
    python gerar.py
"""
import io, os, re, html

BASE = os.path.dirname(os.path.abspath(__file__))
FONTE = os.path.join(BASE, '_fonte.html')
DOMINIO = 'https://andretomaz.com'

# ------------------------------------------------------------------ textos por idioma
META = {
    'en': {
        'lang': 'en',
        'url': DOMINIO + '/',
        'title': 'André Tomaz | Business Operations Consultant',
        'desc': 'I go into your company to understand how it works today, map the operation and customer service, and build the structure that takes you out of the centre of everything. Starts with a diagnosis.',
        'og_title': 'André Tomaz | Business Operations Consultant',
        'og_desc': 'First I understand how your company works. Then I build what it needs.',
        'locale': 'en_US',
    },
    'pt': {
        'lang': 'pt-BR',
        'url': DOMINIO + '/pt/',
        'title': 'André Tomaz | Consultoria de processos e operação',
        'desc': 'Entro na sua empresa para entender como ela funciona hoje, mapeio a operação e o atendimento, e construo a estrutura que tira você do centro de tudo. Começa por um diagnóstico.',
        'og_title': 'André Tomaz | Consultoria de processos e operação',
        'og_desc': 'Primeiro eu entendo como a empresa funciona. Depois eu construo o que ela precisa.',
        'locale': 'pt_BR',
    },
}

# ------------------------------------------------------------------ dados estruturados
def jsonld(idioma):
    m = META[idioma]
    pt = idioma == 'pt'
    cargo = 'Consultor de Transformação Empresarial' if pt else 'Business Transformation Consultant'
    servico = 'Consultoria de processos e operação' if pt else 'Business process and operations consulting'
    sobre = (
        'Entro na empresa para entender como ela funciona hoje. Analiso operação, atendimento, '
        'processos e gestão. A partir disso desenho soluções que organizam o negócio e eliminam gargalos.'
    ) if pt else (
        'I go into the company to understand how it works today. I look at operations, customer service, '
        'processes and management. From there I design solutions that organize the business and remove bottlenecks.'
    )
    temas_pt = ["gestão de clínica de estética","processos operacionais","diagnóstico empresarial",
                "arquitetura de operação","sistema de gestão sob medida","atendimento automatizado no WhatsApp",
                "atendimento multilíngue","plataforma de cursos","transformação digital de pequenas e médias empresas"]
    temas_en = ["aesthetic clinic operations","business process improvement","operations management",
                "workflow design","custom software development","conversational AI","appointment scheduling",
                "multilingual operations","e-learning platform"]
    temas = temas_pt if pt else temas_en

    faq = FAQ_PT if pt else FAQ_EN
    perguntas = ',\n      '.join(
        '{"@type":"Question","name":%s,"acceptedAnswer":{"@type":"Answer","text":%s}}'
        % (js(p), js(r)) for p, r in faq
    )

    return '''<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "%(dom)s/#pessoa",
      "name": "André Tomaz",
      "jobTitle": %(cargo)s,
      "description": %(sobre)s,
      "url": "%(url)s",
      "knowsLanguage": ["pt-BR", "en"],
      "knowsAbout": %(temas)s,
      "sameAs": ["https://www.instagram.com/andretomazsd/"]
    },
    {
      "@type": "ProfessionalService",
      "@id": "%(dom)s/#servico",
      "name": %(servico)s,
      "provider": { "@id": "%(dom)s/#pessoa" },
      "serviceType": %(servico)s,
      "areaServed": [
        { "@type": "Country", "name": "Brazil" },
        { "@type": "Place", "name": "Europe" }
      ],
      "availableLanguage": ["pt-BR", "en"],
      "url": "%(url)s"
    },
    {
      "@type": "FAQPage",
      "@id": "%(url)s#faq",
      "mainEntity": [
      %(perguntas)s
      ]
    },
    {
      "@type": "WebSite",
      "@id": "%(dom)s/#site",
      "url": "%(dom)s/",
      "name": "André Tomaz",
      "inLanguage": "%(lang)s",
      "publisher": { "@id": "%(dom)s/#pessoa" }
    }
  ]
}
</script>''' % {
        'dom': DOMINIO, 'url': m['url'], 'lang': m['lang'],
        'cargo': js(cargo), 'sobre': js(sobre), 'servico': js(servico),
        'temas': '[' + ','.join(js(t) for t in temas) + ']',
        'perguntas': perguntas,
    }


def js(s):
    """string JSON segura"""
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ') + '"'


FAQ_PT = [
 ("Quanto tempo leva?",
  "Depende do tamanho do gargalo. O diagnóstico é rápido. A construção é definida na etapa de priorização, com prazo fechado antes de começar."),
 ("Eu vou ficar dependente de você?",
  "Para operar, não: tudo que eu construo vem com um painel onde você mesmo muda preço, texto, horário e regra de atendimento, com a sua equipe treinada. Para existir, sim, e isso é normal: existe servidor, atualização e segurança, o que é uma mensalidade clara combinada antes de começar. Você não fica refém de mim para trabalhar."),
 ("Já tenho um sistema. Serve?",
  "Muitas vezes o problema não é o sistema, é a forma como o trabalho em volta dele está organizado. O diagnóstico mostra se vale integrar, corrigir ou trocar."),
 ("Minha empresa é pequena demais?",
  "Se você é o gargalo, o tamanho não importa. O que importa é se o trabalho já se repete o suficiente para ser organizado."),
 ("E os meus dados?",
  "Quem acessa o quê, a separação dos ambientes e as regras do seu setor entram no desenho desde a primeira etapa, não como remendo no fim."),
]

FAQ_EN = [
 ("How long does it take?",
  "It depends on the size of the bottleneck. The diagnosis is quick. The building phase is defined during prioritization, with a fixed deadline agreed before we start."),
 ("Will I depend on you?",
  "To operate it, no: everything I build comes with a panel where you change price, text, opening hours and service rules yourself, with your team trained. To keep it running, yes, and that is normal: there is a server, updates and security, which is a clear monthly fee agreed before we start. You are not held hostage by me to get your work done."),
 ("I already have a system. Does it work?",
  "Often the problem is not the system, it is how the work around it is organized. The diagnosis shows whether to integrate, fix or replace it."),
 ("Is my company too small?",
  "If you are the bottleneck, size does not matter. What matters is whether the work already repeats enough to be organized."),
 ("What about my data?",
  "Access control, separate environments and the rules of your sector are part of the design from step one, not a patch at the end."),
]


# ------------------------------------------------------------------ montagem
def cabecalho(idioma):
    m = META[idioma]
    outro = 'pt' if idioma == 'en' else 'en'
    return '''<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<meta name="theme-color" content="#0B0B0C">
<link rel="canonical" href="%(url)s">
<link rel="alternate" hreflang="en" href="%(dom)s/">
<link rel="alternate" hreflang="pt-BR" href="%(dom)s/pt/">
<link rel="alternate" hreflang="x-default" href="%(dom)s/">
<meta property="og:type" content="website">
<meta property="og:url" content="%(url)s">
<meta property="og:locale" content="%(locale)s">
<meta property="og:title" content="%(ogt)s">
<meta property="og:description" content="%(ogd)s">
<meta property="og:image" content="%(dom)s/img/hero.webp">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(ogt)s">
<meta name="twitter:description" content="%(ogd)s">
<meta name="twitter:image" content="%(dom)s/img/hero.webp">''' % {
        'title': html.escape(m['title']), 'desc': html.escape(m['desc']),
        'url': m['url'], 'dom': DOMINIO, 'locale': m['locale'],
        'ogt': html.escape(m['og_title']), 'ogd': html.escape(m['og_desc']),
    }


def gerar(idioma):
    h = io.open(FONTE, encoding='utf-8').read()
    m = META[idioma]
    pt = idioma == 'pt'

    # 1. conteúdo do idioma
    if pt:
        padrao = re.compile(r'<(\w+)([^>]*?)\sdata-pt="([^"]*)"([^>]*)>(.*?)</\1>', re.S)
        h = padrao.sub(lambda x: '<%s%s%s>%s</%s>' % (
            x.group(1), x.group(2), x.group(4), html.unescape(x.group(3)), x.group(1)), h)
    else:
        h = re.sub(r'\sdata-pt="[^"]*"', '', h)

    # 2. cabeçalho e idioma do documento
    h = h.replace('<html lang="en">', '<html lang="%s">' % m['lang'])
    ini = h.find('<title>')
    fim = h.find('<link rel="preconnect"')
    h = h[:ini] + cabecalho(idioma) + '\n\n' + h[fim:]

    # 3. dados estruturados antes do </head>
    h = h.replace('</head>', jsonld(idioma) + '\n</head>')

    # 4. seletor de idioma vira LINK de verdade (o Google segue link, não clique em JS)
    #    O ?lang=en avisa o nginx que a escolha foi explícita: sem ele, quem tem o
    #    navegador em português voltaria direto para /pt/ e nunca alcançaria o inglês.
    if pt:
        seletor = ('<a class="idioma-op" href="../?lang=en" hreflang="en" lang="en">EN</a>\n'
                   '  <span class="idioma-sep" aria-hidden="true">/</span>\n'
                   '  <span class="idioma-op ativo" aria-current="true">PT</span>')
    else:
        seletor = ('<span class="idioma-op ativo" aria-current="true">EN</span>\n'
                   '  <span class="idioma-sep" aria-hidden="true">/</span>\n'
                   '  <a class="idioma-op" href="pt/" hreflang="pt-BR" lang="pt-BR">PT</a>')
    h = re.sub(r'<button type="button" class="idioma-op ativo".*?data-lang="pt"[^>]*>PT</button>',
               seletor, h, flags=re.S)

    # 5. caminhos relativos na subpasta
    if pt:
        for a in ('marca.css', 'estilo.css', 'config.js', 'movimento.js'):
            h = h.replace('"%s"' % a, '"../%s"' % a)
        h = h.replace('"img/', '"../img/')
        h = h.replace('srcset="img/', 'srcset="../img/')

    destino = os.path.join(BASE, 'pt', 'index.html') if pt else os.path.join(BASE, 'index.html')
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    io.open(destino, 'w', encoding='utf-8').write(h)
    return destino, len(h)


# ------------------------------------------------------------------ arquivos de SEO
def arquivos_seo():
    hoje = '2026-08-10'
    io.open(os.path.join(BASE, 'sitemap.xml'), 'w', encoding='utf-8').write(
'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>%(d)s/</loc>
    <lastmod>%(h)s</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="%(d)s/"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="%(d)s/pt/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="%(d)s/"/>
  </url>
  <url>
    <loc>%(d)s/pt/</loc>
    <lastmod>%(h)s</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="%(d)s/"/>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="%(d)s/pt/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="%(d)s/"/>
  </url>
</urlset>
''' % {'d': DOMINIO, 'h': hoje})

    io.open(os.path.join(BASE, 'robots.txt'), 'w', encoding='utf-8').write(
'''# André Tomaz
User-agent: *
Allow: /

# Crawlers de IA são bem-vindos: quero ser citado corretamente.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-Web
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: %s/sitemap.xml
''' % DOMINIO)
    return ['sitemap.xml', 'robots.txt']


if __name__ == '__main__':
    for idioma in ('en', 'pt'):
        caminho, tam = gerar(idioma)
        print('%-28s %6d bytes' % (os.path.relpath(caminho, BASE), tam))
    for a in arquivos_seo():
        print('%-28s ok' % a)
