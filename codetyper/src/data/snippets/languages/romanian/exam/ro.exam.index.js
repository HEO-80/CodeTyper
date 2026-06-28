// src/data/snippets/languages/romanian/exam/index.js

const examSnippets = [
  {
    id: "ro-exam-01",
    title: "Email complet — Migrare microservicii",
    difficulty: "exam",
    description: "Email profesional complet cu toate structurile",
    code: `Subiect: Propunere de migrare la microservicii — Faza Unu

Dragă echipă,

sper că vă merge bine tuturor.
Vă scriu pentru a vă împărtăși propunerea mea de migrare a monolitului nostru la microservicii.

După analizarea arhitecturii actuale, am identificat trei blocaje principale.
În primul rând, modulul de autentificare este strâns cuplat cu serviciul de plăți.
În al doilea rând, deployment-urile necesită repornirea simultană a întregii aplicații.
În al treilea rând, scalarea independentă a funcționalităților individuale nu este în prezent posibilă.

Propunerea mea se împarte în trei faze pe parcursul a șase luni.
În prima fază, am extrage serviciul de autentificare și l-am implementa independent.
Acest lucru ne-ar permite să îl scalăm separat și să reducem riscul global de deployment.
Dacă prima fază reușește, am continua cu serviciile de plăți și notificări.

Am atașat un document tehnic detaliat cu diagrame și estimări de costuri.
Aș aprecia feedback-ul vostru înainte de a prezenta acest lucru părților interesate.
Anunțați-mă dacă doriți să programați o sesiune de revizuire această săptămână.

Cu stimă,
Alex`,
  },
];

export default examSnippets;
