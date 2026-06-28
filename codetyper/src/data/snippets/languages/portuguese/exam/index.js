// src/data/snippets/languages/portuguese/exam/index.js

const examSnippets = [
  {
    id: "pt-exam-01",
    title: "Email completo — Migração microserviços",
    difficulty: "exam",
    description: "Email profissional completo com todas as estruturas",
    code: `Assunto: Proposta de migração para microserviços — Fase Um

Caro(a) equipa,

espero que estejam todos bem.
Escrevo para partilhar a minha proposta de migração do nosso monólito para microserviços.

Após analisar a arquitetura atual, identifiquei três principais estrangulamentos.
Em primeiro lugar, o módulo de autenticação está fortemente acoplado ao serviço de pagamento.
Em segundo lugar, os deployments exigem o reinício simultâneo de toda a aplicação.
Em terceiro lugar, o dimensionamento independente de funcionalidades individuais não é atualmente possível.

A minha proposta divide-se em três fases ao longo de seis meses.
Na primeira fase, extrairíamos o serviço de autenticação e implementaríamo-lo de forma independente.
Isto permitir-nos-ia dimensioná-lo separadamente e reduzir o risco global de deployment.
Se a primeira fase for bem-sucedida, avançaríamos para os serviços de pagamento e notificação.

Anexei um documento técnico detalhado com diagramas e estimativas de custos.
Agradecia o vosso feedback antes de apresentarmos isto aos stakeholders.
Digam-me se querem agendar uma sessão de revisão esta semana.

Com os melhores cumprimentos,
Alex`,
  },
];

export default examSnippets;
