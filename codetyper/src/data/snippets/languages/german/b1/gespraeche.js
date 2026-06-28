// src/data/snippets/languages/german/b1/gespraeche.js

const gespraeche = [
  {
    id: "de-b1-ges-01",
    title: "Code-Review",
    difficulty: "b1",
    description: "Feedback zu Code geben und empfangen",
    code: `Danke für das Einreichen dieses Pull Requests.
Die Gesamtstruktur sieht sauber und lesbar aus.
Ich habe einige Vorschläge für die Hauptfunktion.
Könnten Sie eine Fehlerbehandlung für den API-Aufruf hinzufügen?
Außerdem könnten die Variablennamen aussagekräftiger sein.
Ich denke, wir sollten das in zwei kleinere Funktionen aufteilen.
Bitte aktualisieren Sie die Tests für die neuen Grenzfälle.
Lassen Sie mich wissen, wenn Sie Fragen zu meinen Kommentaren haben.`,
  },
  {
    id: "de-b1-ges-02",
    title: "Technisches Meeting",
    difficulty: "b1",
    description: "Technische Entscheidungen im Team besprechen",
    code: `Wir müssen heute über die Datenbankarchitektur entscheiden.
Ich denke, wir sollten PostgreSQL für dieses Projekt verwenden.
Der Hauptgrund ist, dass wir relationale Daten benötigen.
MongoDB könnte jedoch besser für die Benutzersitzungen geeignet sein.
Was denken Sie darüber, beide im selben Projekt zu verwenden?
Wir könnten Postgres für Kerndaten und Mongo für den Cache nutzen.
Dieser Ansatz ist bei großen Anwendungen üblich.
Lassen Sie uns die Vor- und Nachteile prüfen, bevor wir entscheiden.`,
  },
  {
    id: "de-b1-ges-03",
    title: "Fehlerbericht",
    difficulty: "b1",
    description: "Einen Bug klar beschreiben und melden",
    code: `Ich habe einen Fehler im Benutzerregistrierungsablauf gefunden.
Das Problem tritt auf, wenn die E-Mail bereits in der Datenbank existiert.
Anstatt eine Fehlermeldung anzuzeigen, stürzt die App komplett ab.
Ich habe den Fehler dreimal in verschiedenen Browsern reproduziert.
Der Fehler tritt nur beim zweiten Absenden des Formulars auf.
Ich habe die Logs überprüft und eine unbehandelte Promise-Ablehnung gefunden.
Die Korrektur sollte einfach sein, sobald wir die Ursache gefunden haben.
Ich werde ein Ticket mit allen Details und Reproduktionsschritten erstellen.`,
  },
];

export default gespraeche;
