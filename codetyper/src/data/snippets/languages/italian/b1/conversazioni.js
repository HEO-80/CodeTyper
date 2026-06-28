// src/data/snippets/languages/italian/b1/conversazioni.js

const conversazioni = [
  {
    id: "it-b1-conv-01",
    title: "Revisione del codice",
    difficulty: "b1",
    description: "Dare e ricevere feedback sul codice",
    code: `Grazie per aver inviato questa pull request.
La struttura generale sembra pulita e leggibile.
Ho alcuni suggerimenti per la funzione principale.
Potreste aggiungere la gestione degli errori per la chiamata API?
Inoltre, i nomi delle variabili potrebbero essere più descrittivi.
Penso che dovremmo dividere questo in due funzioni più piccole.
Aggiornate i test per coprire i nuovi casi limite.
Fatemi sapere se avete domande sui miei commenti.`,
  },
  {
    id: "it-b1-conv-02",
    title: "Riunione tecnica",
    difficulty: "b1",
    description: "Discutere decisioni tecniche con il team",
    code: `Dobbiamo decidere l'architettura del database oggi.
Penso che dovremmo usare PostgreSQL per questo progetto.
Il motivo principale è che abbiamo bisogno di dati relazionali.
Tuttavia, MongoDB potrebbe funzionare meglio per le sessioni utente.
Cosa ne pensate di usare entrambi nello stesso progetto?
Potremmo usare Postgres per i dati principali e Mongo per la cache.
Questo approccio è comune nelle applicazioni su larga scala.
Esaminiamo i pro e i contro prima di decidere.`,
  },
  {
    id: "it-b1-conv-03",
    title: "Segnalazione di bug",
    difficulty: "b1",
    description: "Segnalare e descrivere un bug chiaramente",
    code: `Ho trovato un bug nel flusso di registrazione degli utenti.
Il problema si verifica quando l'email esiste già nel database.
Invece di mostrare un messaggio di errore, l'app va in crash.
Ho riprodotto il bug tre volte su browser diversi.
L'errore si verifica solo al secondo invio del modulo.
Ho controllato i log e trovato una promise rejection non gestita.
La correzione dovrebbe essere semplice una volta trovata la causa.
Creerò un ticket con tutti i dettagli e i passi per riprodurlo.`,
  },
];

export default conversazioni;
