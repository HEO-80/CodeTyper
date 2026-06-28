// src/data/snippets/languages/italian/exam/index.js

const examSnippets = [
  {
    id: "it-exam-01",
    title: "Email completa — Migrazione microservizi",
    difficulty: "exam",
    description: "Email professionale completa con tutte le strutture",
    code: `Oggetto: Proposta di migrazione ai microservizi — Fase Uno

Caro team,

spero che stiate tutti bene.
Vi scrivo per condividere la mia proposta di migrazione del nostro monolite ai microservizi.

Dopo aver analizzato l'architettura attuale, ho identificato tre principali colli di bottiglia.
In primo luogo, il modulo di autenticazione è strettamente accoppiato al servizio di pagamento.
In secondo luogo, i deployment richiedono il riavvio simultaneo dell'intera applicazione.
In terzo luogo, la scalabilità indipendente delle singole funzionalità non è attualmente possibile.

La mia proposta si articola in tre fasi nell'arco di sei mesi.
Nella prima fase, estrarremmo il servizio di autenticazione e lo distribuiremmo in modo indipendente.
Questo ci permetterebbe di scalarlo separatamente e ridurre il rischio complessivo di deployment.
Se la prima fase ha successo, procederemmo con i servizi di pagamento e notifica.

Ho allegato un documento tecnico dettagliato con diagrammi e stime dei costi.
Apprezzerei il vostro feedback prima di presentare questo agli stakeholder.
Fatemi sapere se volete organizzare una sessione di revisione questa settimana.

Cordiali saluti,
Alex`,
  },
];

export default examSnippets;
