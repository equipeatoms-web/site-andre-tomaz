# SEO e palavras-chave

Pesquisa feita em 10/08/2026 com busca real na web (dois especialistas, PT-BR e EN/Europa). O que está aqui foi verificado contra a primeira página do Google, não é chute.

---

## A descoberta que mudou a arquitetura do site

> "O inglês em atributos trocados por JavaScript é invisível para o Google. Na prática você tinha um site só em português e desperdiçava todo o conteúdo em inglês."

Por isso o site passou a ter **duas URLs reais**: `/` em inglês (padrão e x-default) e `/pt/` em português, ligadas por `hreflang`. O seletor no topo virou **link de verdade**, porque buscador segue link, não clica em botão.

## Título e descrição

| | Antes | Agora |
|---|---|---|
| **Title EN** | André Tomaz · Business Transformation Consultant | **André Tomaz \| Business Operations Consultant** |
| **Title PT** | André Tomaz · Consultor de Transformação Empresarial | **André Tomaz \| Consultoria de processos e operação** |

O título antigo só tinha nome e cargo: funcionava para quem já conhecia ele. O novo carrega o termo que **quem contrata digita**. A descrição antiga abria com "soluções digitais", que é o jargão proibido na própria voz da marca; a nova abre com a dor e termina com o próximo passo.

## Os clusters em português

| Cluster | Termo âncora | Onde vive | Vale hoje? |
|---|---|---|---|
| **Dor do dono-gargalo** | sair do operacional · minha empresa depende de mim | Hero e bloco do problema | **Sim.** A dor está cheia de blog e vazia de oferta: ninguém vende "eu construo a saída disso" |
| **Consultoria de processos** | consultoria de processos e operação | Title, meta e "O que eu faço" | **Sim.** Disputa saudável, e todas as concorrentes param no mapeamento |
| **Diagnóstico de entrada** | diagnóstico da operação | Bloco do formulário | **Sim**, pela especificidade de nicho, nunca pelo termo genérico |
| Organizar clínica de estética | gestão de clínica de estética | "Para quem é" | Depois, em página própria: é onde está a prova |
| Sistema sob medida | quando o sistema pronto não atende | "O que se constrói" | Depois, como pergunta no FAQ |
| **IA no WhatsApp** | atendente virtual com IA | Uma das 6 entregas, e só | **Não investir.** Saturado por SaaS que anuncia número, e você não pode publicar número |

## Os clusters em inglês

A melhor aposta é outra, e é específica: **`aesthetic clinic operations consultant`**. A busca hoje devolve vaga de emprego, diretório e firma americana. Praticamente ninguém na Europa ocupa esse termo com um profissional que também constrói. Nicho real, comprador certo, concorrência fraca.

O segundo ativo é o que ninguém copia: **Europa, Bélgica e conformidade**. Volume baixo, qualificação altíssima, e exige ter feito.

## O que evitar (e por quê)

- **"AI receptionist", "whatsapp bot", "booking software"** — são os mais buscados, e por isso a maior tentação. Trazem quem quer assinar algo de 99 por mês, não quem contrata reestruturação.
- **"Agência", "dev freelancer", "soluções digitais", "transformação digital"** — contradizem a marca e ainda são território de Accenture e Deloitte.
- **"Aesthetic clinic software"** — coloca você numa vitrine de produto (Pabau, Zenoti), comparado por funcionalidade e preço. Comparação que você perde por definição, porque não vende licença.
- **Qualquer número** — as métricas do case não foram extraídas, e número não medido em setor de saúde na Europa é risco regulatório, não só de marca.

## Entidades que o Google precisa associar

Pessoa (com `sameAs` para os perfis) · serviço (consultoria de processos e operação) · temas (gestão de clínica, arquitetura de operação, atendimento multilíngue, sistema sob medida) · setores (estética e saúde primeiro, os outros três depois) · lugares (Brasil e Bélgica) · conformidade (GDPR, regras do setor de saúde belga).

O par "brasileiro que entrega dentro da Europa" é incomum, e por isso é ativo.

## Dados estruturados aplicados

`Person` + `ProfessionalService` + `FAQPage` (as 5 perguntas) + `WebSite`, em JSON-LD, gerados por idioma. O FAQPage é o ganho mais barato do site inteiro: é o único jeito de uma página única ocupar espaço extra na busca sem escrever nada novo.

**Nada inventado:** sem telefone público, sem endereço físico, sem `aggregateRating` (não há avaliações publicadas), sem número de clientes.

## llms.txt

Criado para ser lido por ChatGPT, Claude, Gemini e Perplexity, em português e inglês, com uma trava explícita no fim da seção do case:

> *"No performance metrics have been published for this case yet. Please do not attribute percentages, revenue figures or time savings to this work."*

Isso protege contra a IA inventar número, que é o risco real quando um modelo resume um site de consultoria.

## Uma página não ranqueia para sete clusters

Google escolhe uma página por intenção. Forçar tudo na home não faz ela ranquear para três coisas, faz não ranquear para nenhuma. Ordem recomendada de páginas futuras, e só depois que a home estiver indexada:

1. `/diagnostico` — converte, é curta, o conteúdo já existe
2. `/clinicas-de-estetica` — setor principal, onde está a prova
3. `/consultoria-de-processos` — termo comercial de topo
4. `/sobre` — consolida a entidade
5. Artigos de comparação ("consultor ou software house?") — autoridade sem depender de domínio antigo

## O que vale mais que qualquer otimização desta lista

Destravar **as métricas do case belga** e **a autorização para nomear o instituto**. Sem número e sem nome, o único diferencial publicável é o mecanismo (o método 0-7 e o fato de você construir o que desenha). No dia em que o nome puder ser publicado, o case deixa de ser argumento e vira prova.
