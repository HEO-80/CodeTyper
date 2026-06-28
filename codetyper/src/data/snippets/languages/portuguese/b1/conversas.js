// src/data/snippets/languages/portuguese/b1/conversas.js

const conversas = [
  {
    id: "pt-b1-conv-01",
    title: "Revisão de código",
    difficulty: "b1",
    description: "Dar e receber feedback sobre o código",
    code: `Obrigado por submeter este pull request.
A estrutura geral parece limpa e legível.
Tenho algumas sugestões para a função principal.
Poderia adicionar tratamento de erros para a chamada à API?
Além disso, os nomes das variáveis poderiam ser mais descritivos.
Acho que devíamos dividir isto em duas funções mais pequenas.
Por favor atualize os testes para cobrir os novos casos limite.
Diga-me se tiver dúvidas sobre os meus comentários.`,
  },
  {
    id: "pt-b1-conv-02",
    title: "Reunião técnica",
    difficulty: "b1",
    description: "Discutir decisões técnicas com a equipa",
    code: `Temos de decidir a arquitetura da base de dados hoje.
Acho que devemos usar PostgreSQL para este projeto.
O motivo principal é que precisamos de dados relacionais.
No entanto, o MongoDB pode funcionar melhor para as sessões de utilizador.
O que acham de usar ambos no mesmo projeto?
Poderíamos usar Postgres para dados principais e Mongo para cache.
Esta abordagem é comum em aplicações de grande escala.
Vamos analisar os prós e contras antes de decidir.`,
  },
  {
    id: "pt-b1-conv-03",
    title: "Relatório de erro",
    difficulty: "b1",
    description: "Reportar e descrever um bug claramente",
    code: `Encontrei um erro no fluxo de registo de utilizadores.
O problema ocorre quando o email já existe na base de dados.
Em vez de mostrar uma mensagem de erro, a app bloqueia completamente.
Reproduzi o erro três vezes em diferentes navegadores.
O erro só aparece na segunda submissão do formulário.
Verifiquei os logs e encontrei uma promise rejection não tratada.
A correção deve ser simples assim que encontrarmos a causa raiz.
Vou criar um ticket com todos os detalhes e passos para reproduzir.`,
  },
];

export default conversas;
