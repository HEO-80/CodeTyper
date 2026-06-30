// src/data/snippets/languages/russian/c2/literaturnyy.js

const literaturnyy = [
  {
    id: "ru-c2-lit-01",
    title: "Sistemas distribuidos",
    difficulty: "c2",
    description: "Распределённые системы・Raspredelyonnye sistemy — Discusión técnica de alto nivel",
    translation: "El desafío fundamental de los sistemas distribuidos no es construirlos, sino razonar sobre sus modos de fallo. Cuando diseñamos para la resiliencia, debemos asumir que cada componente eventualmente fallará, que cada partición de red eventualmente ocurrirá, y que cada suposición sobre la consistencia del estado eventualmente será violada. Los circuit breakers y patrones de degradación graciosa no son optimizaciones opcionales. Son la diferencia entre un breve incidente y una interrupción catastrófica.",
    code: `Fundamentalnaya problema raspredelennykh sistem
— ne stroit ikh, a rassuzhdaт o modeli ikh otkazov.

Kogda my proektiruem dlya ustoychivosti, my dolzhny predpolagat,
chto kazhdyy komponent v kone kontsov vyydет iz stroya,
chto kazhdoe setevoe razdelenie v kone kontsov proizoydет,
i chto kazhdoe predpolozhenie o soglasovannosti sostoyaniya budet narushen.

Avtomaty zaschity tsepey i patterny gracioznoy degradatsii
ne yavlyayutsya opcionalnymi optimizatsiyami v proizvodstvennykh sistemakh.
Oni predstavlyayut raznitsu mezhdu korotkim intsidentom i katastroficheskim sboem.

Komandy, kotorye stroyat nadezhnye sistemy, ne umnee ostalynykh.
Oni prosto prinimayut neopredelennost i namerenno proyektiruyut dlya neyo.`,
  },
  {
    id: "ru-c2-lit-02",
    title: "Carta a tu yo futuro",
    difficulty: "c2",
    description: "Письмо будущему себе・Pismo budushchemu sebe — Reflexión profunda en ruso literario",
    translation: "Querido yo del futuro: Hoy no fue fácil. Hubo momentos de duda, líneas de código que no funcionaban, conceptos que tardaban en asentarse. Pero no me rendí. Trabajé cuando faltaban las ganas. Estudié cuando podría haberme descansado. Hice preguntas sin vergüenza cuando no entendía. Y aquí estoy, avanzando día a día, construyendo la versión de mí mismo que siempre supe que podía ser. El camino no termina. Sigue aprendiendo.",
    code: `Dorogoy ya budushchego,

Segodnya bylo neprosto. Byli momenty somneniya,
strochki koda, kotorye otkazyvalis rabotat,
kontsepty, kotorye medlenno ukladyvalis v golove.

No ya ne sdalsya.

Ya rabotal, kogda ne bylo nastlroeniya.
Ya uchilsya, kogda mog by otdokhnut.
Ya zadaval voprosy bez styda, kogda ne ponimal.

I vot ya zdes, prodvigayas den za dnyom,
stroя versiyu sebya, kotoroy ya vsegda znal, chto mogu stat.

Put ne zakanchivaetsya. Prodolzhay uchitsya.`,
  },
];

export default literaturnyy;
