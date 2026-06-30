// src/data/snippets/languages/japanese/c2/bungaku.js

const bungaku = [
  {
    id: "ja-c2-bun-01",
    title: "Sistemas distribuidos",
    difficulty: "c2",
    description: "ぶんさんシステム・Bunsan shisutemu — Discusión técnica de alto nivel",
    translation: "El desafío fundamental de los sistemas distribuidos no es construirlos, sino razonar sobre sus modos de fallo. Cuando diseñamos para la resiliencia, debemos asumir que cada componente eventualmente fallará, que cada partición de red eventualmente ocurrirá, y que cada suposición sobre la consistencia del estado eventualmente será violada. Los circuit breakers, bulkheads y patrones de degradación graciosa no son optimizaciones opcionales en sistemas de producción. Son la diferencia entre un breve incidente y una interrupción catastrófica.",
    code: `Bunsan shisutemu no konpon teki na kadai wa,
sore wo kouchiku suru koto de wa naku,
sono shippai moodo ni tsuite suiron suru koto desu.

Rejiriensu no tame ni sekkei suru toki,
subete no konpoonento ga saishuu teki ni shippai shi,
subete no nettowa aku bunkatsu ga saishuu teki ni hassei shi,
joukyou no icchii sei ni kansuru subete no kasetsu ga saishuu teki ni ihan sareru
to iu koto wo zentei to shinakereba narimasen.

Saakitto bureekaa, barukuheddo, oyobi gureesu furu digu reedeeshon no pataaN wa,
hon ban shisutemu ni okeru opushonaru na saikou ka de wa arimasen.
Karera wa, tanki na jiko to daigekiteki na saabisu teishi no sa wo umidasu mono desu.`,
  },
  {
    id: "ja-c2-bun-02",
    title: "Carta a tu yo futuro",
    difficulty: "c2",
    description: "みらいの自分へ・Mirai no jibun e — Reflexión profunda en japonés literario",
    translation: "Querido yo del futuro: Hoy no fue fácil. Hubo momentos de duda, líneas de código que no funcionaban, conceptos que tardaban en asentarse. Pero no me rendí. Trabajé cuando faltaban las ganas. Estudié cuando podría haberme descansado. Hice preguntas sin vergüenza cuando no entendía. Y aquí estoy, avanzando día a día, construyendo la versión de mí mismo que siempre supe que podía ser. El camino no termina. Sigue aprendiendo.",
    code: `Mirai no jibun e:

Kyou wa kantan de wa arimasen deshita.
Utagawashii shunkan ga ari,
ugokanakata koodo no gyou ga ari,
naka naka mi ni tsukanakata gainen ga arimashita.

Shikashi, watashi wa akiramemasendeshita.

Yaru ki ga naitte mo, shigoto wo shimashita.
Yasumeru toki demo, benkyou shimashita.
Rikai dekinai toki wa, haji zukazu shitsumon shimashita.

Soshite ima, hi ni hi ni zenshin shi,
itsumo nare ru to shitte ita jibun no sugatao
kizuki tsuzukete imasu.

Michi wa owaranai. Manabi tsuzukete kudasai.`,
  },
];

export default bungaku;
