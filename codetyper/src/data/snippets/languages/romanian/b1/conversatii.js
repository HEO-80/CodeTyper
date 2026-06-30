// src/data/snippets/languages/romanian/b1/conversatii.js

const conversatii = [
  {
    id: "ro-b1-conv-01",
    title: "Revizuirea codului",
    difficulty: "b1",
    description: "A da și a primi feedback despre cod",
    code: `Mulțumesc că ai trimis acest pull request.
Structura generală arată curată și ușor de citit.
Am câteva sugestii pentru funcția principală.
Ai putea adăuga tratarea erorilor pentru apelul API?
De asemenea, numele variabilelor ar putea fi mai descriptive.
Cred că ar trebui să împărțim aceasta în două funcții mai mici.
Vă rugăm să actualizați testele pentru a acoperi noile cazuri limită.
Anunțați-mă dacă aveți întrebări despre comentariile mele.`,
  },
  {
    id: "ro-b1-conv-02",
    title: "Ședință tehnică",
    difficulty: "b1",
    description: "Discutarea deciziilor tehnice cu echipa",
    code: `Trebuie să decidem arhitectura bazei de date astăzi.
Cred că ar trebui să folosim PostgreSQL pentru acest proiect.
Motivul principal este că avem nevoie de date relaționale.
Cu toate acestea, MongoDB ar putea funcționa mai bine pentru sesiunile utilizatorilor.
Ce credeți despre utilizarea ambelor în același proiect?
Am putea folosi Postgres pentru datele principale și Mongo pentru cache.
Această abordare este comună în aplicațiile la scară mare.
Să analizăm avantajele și dezavantajele înainte de a decide.`,
  },
  {
    id: "ro-b1-conv-03",
    title: "Raport de eroare",
    difficulty: "b1",
    description: "Raportarea și descrierea clară a unui bug",
    code: `Am găsit o eroare în fluxul de înregistrare al utilizatorilor.
Problema apare când emailul există deja în baza de date.
În loc să afișeze un mesaj de eroare, aplicația se blochează complet.
Am reprodus eroarea de trei ori în browsere diferite.
Eroarea apare doar la a doua trimitere a formularului.
Am verificat jurnalele și am găsit un promise rejection netratat.
Remedierea ar trebui să fie simplă odată ce găsim cauza principală.
Voi crea un tichet cu toate detaliile și pașii pentru reproducere.`,
  },
];

export default conversatii;
