# One Page — Estrutura para discussão

> Documento de trabalho (10/08/2026). A versão formatada para leitura está em `estrutura-onepage.docx`. Todo texto aqui é **proposta**, não final.

---

## A arquitetura em 9 blocos

Cada bloco responde a uma pergunta do leitor, nesta ordem exata:

| Bloco | A pergunta | O que entrega |
|---|---|---|
| 1. Abertura | "Isso é para mim?" | Reconhecimento em 5 segundos |
| 2. O espelho | "Ele entende meu problema?" | Nomear a dor melhor que o leitor |
| 3. Como eu trabalho | "O que ele faz exatamente?" | Clareza sem jargão |
| 4. O método | "Como funciona na prática?" | Previsibilidade |
| 5. O que se constrói | "O que eu recebo?" | Concretude |
| 6. O caso real | "Já funcionou com alguém?" | Prova |
| 7. Para quem é | "Sirvo para isso?" | Qualificação |
| 8. A porta | "E agora?" | Um único próximo passo |
| 9. Perguntas | "Mas e se…?" | Derrubar objeção |

**Ordem inegociável:** o problema antes da solução, a prova antes da porta.

## Os textos propostos

*(Ver `estrutura-onepage.docx` para o documento completo formatado com todos os blocos.)*

**Bloco 1 (hero):** "Sua empresa não precisa de mais funcionários. Precisa de um ecossistema digital inteligente." + descritor + botão do diagnóstico.

**Bloco 3 (contraste):** "Consultor tradicional entrega diagnóstico. Software house entrega sistema. Eu entrego a operação rodando."

**Bloco 6 (case):** versão sem nomear a cliente, só com entregas (nenhum número de resultado até as métricas do painel serem extraídas).

**Bloco 8 (porta):** o Protocolo de Marca como oferta de entrada, com formulário curto.

## Decisões pendentes do André

1. Domínio e hospedagem (VPS EasyPanel?)
2. Idioma: só PT ou PT + EN?
3. O diagnóstico é gratuito ou pago? Nome fica "Protocolo de Marca"?
4. Contato: formulário de 4 campos, WhatsApp ou agenda?
5. Vídeo de 30 segundos no topo?
6. Pode nomear Maison Ipanema / Neiva Cimini? (exige autorização)
7. Fotos atuais servem ou sessão nova?

## Decisões travadas em 10/08 (2ª rodada com o André)

1. **Hero com vídeo de fundo:** depoimento da Neiva rodando mudo em loop, com véu escuro por cima. Estrutura pronta no HTML; specs do vídeo em [video/leia-me.md](video/leia-me.md). Botão discreto abre o depoimento completo com som.
2. **A frase do hero mudou:** "Sua empresa não precisa de mais funcionários…" foi reprovada. Padrão atual: "Primeiro eu entendo como a empresa funciona. Depois eu construo o que ela precisa." Outras 3 opções testáveis no painel de teste da página.
3. **Diagnóstico capta o lead E encaminha ao WhatsApp** (5511975956901). Fluxo: preenche 4 campos → lead é registrado → abre a conversa com o contexto já escrito. Registrar antes de encaminhar é o que garante o lead mesmo se a pessoa não completar a conversa.
4. **FAQ da dependência reescrita com honestidade:** separa "para operar, não" (painel editável, equipe treinada) de "para existir, sim" (mensalidade clara de servidor, atualização, segurança e evolução; dados são do cliente).

## O protótipo

`onepage-teste.html` — versão navegável dos 9 blocos, com a identidade aplicada (obsidiana e âmbar, Space Grotesk e Inter). Abrir com duplo clique. É protótipo visual: o formulário só mostra um aviso, e a config de identidade está no topo do CSS (na produção vira arquivo separado).

## Como será construída (após aprovação)

HTML único · config separado de conteúdo e cor (multi-cliente ready) · dados estruturados para IA · responsiva (maioria virá do Instagram no celular) · medição desde o dia 1.
