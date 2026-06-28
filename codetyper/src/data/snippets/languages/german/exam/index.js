// src/data/snippets/languages/german/exam/index.js

const examSnippets = [
  {
    id: "de-exam-01",
    title: "Vollständige E-Mail — Microservices-Migration",
    difficulty: "exam",
    description: "Vollständige professionelle E-Mail mit allen Strukturen",
    code: `Betreff: Vorschlag zur Microservices-Migration — Phase Eins

Liebes Team,

ich hoffe, es geht euch allen gut.
Ich schreibe euch, um meinen Vorschlag zur Migration unseres Monolithen zu Microservices zu teilen.

Nach der Analyse der aktuellen Architektur habe ich drei Hauptengpässe identifiziert.
Erstens ist das Authentifizierungsmodul eng mit dem Zahlungsdienst gekoppelt.
Zweitens erfordern Deployments einen gleichzeitigen Neustart der gesamten Anwendung.
Drittens ist eine unabhängige Skalierung einzelner Features derzeit nicht möglich.

Mein Vorschlag gliedert sich in drei Phasen über sechs Monate.
In Phase eins würden wir den Authentifizierungsdienst extrahieren und unabhängig deployen.
Dadurch könnten wir ihn separat skalieren und das Deployment-Risiko insgesamt reduzieren.
Bei Erfolg von Phase eins würden wir mit den Zahlungs- und Benachrichtigungsdiensten fortfahren.

Ich habe ein detailliertes technisches Dokument mit Diagrammen und Kostenschätzungen beigefügt.
Ich wäre für euer Feedback dankbar, bevor wir dies den Stakeholdern präsentieren.
Meldet euch gerne, wenn ihr diese Woche eine Review-Session abhalten möchtet.

Mit freundlichen Grüßen,
Alex`,
  },
];

export default examSnippets;
