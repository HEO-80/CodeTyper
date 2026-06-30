// src/data/snippets/languages/japanese/b1/kaiwa.js

const kaiwa = [
  {
    id: "ja-b1-kai-01",
    title: "Revisión de código",
    difficulty: "b1",
    description: "コードレビュー・Koodo rebyuu — Dar y recibir feedback sobre código",
    translation: "Gracias por enviar este pull request. La estructura general se ve limpia y legible. Tengo algunas sugerencias para la función principal. ¿Podrías añadir manejo de errores para la llamada API? Además, los nombres de variables podrían ser más descriptivos. Creo que deberíamos dividir esto en dos funciones más pequeñas. Por favor actualiza los tests para cubrir los nuevos casos límite. Avísame si tienes preguntas sobre mis comentarios.",
    code: `Puruu rikuesuto wo okutte kurete arigatou.
Zentai no kouzou wa kirei de yomiyasui desu.
Mein kansuu ni ikutsuka no teian ga arimasu.
API kooru no eraa shori wo tsuika shite moraemasu ka?
Mata, hensuu no namae wo motto wakariyasuku dekimasu.
Kore wo futatsu no chiisana kansuu ni wakeru beki dato omoimasu.
Atarashii edji keesu wo kabaa suru tame ni tesuto wo koushin shite kudasai.
Komento ni tsuite shitsumon ga attara shirasete kudasai.`,
  },
  {
    id: "ja-b1-kai-02",
    title: "Reunión técnica",
    difficulty: "b1",
    description: "ぎじゅつかいぎ・Gijutsu kaigi — Discutir decisiones técnicas",
    translation: "Hoy tenemos que decidir la arquitectura de la base de datos. Creo que deberíamos usar PostgreSQL para este proyecto. La razón principal es que necesitamos datos relacionales. Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario. ¿Qué piensan de usar ambos en el mismo proyecto? Podríamos usar Postgres para datos principales y Mongo para caché. Este enfoque es común en aplicaciones a gran escala. Revisemos los pros y contras antes de decidir.",
    code: `Kyou wa deetabeesu no aakitekuchaa wo kimeru hitsuyou ga arimasu.
Kono purojekuto ni wa PostgreSQL wo tsukau beki dato omoimasu.
Omona riyuu wa kankei deta ga hitsuyou dakara desu.
Shikashi, MongoDB wa yuuzaa sesshon ni wa yori tekisite iru kamoshiremasen.
Onaji purojekuto de ryouhou wo tsukau koto ni tsuite dou omoimasu ka?
Mein deeta ni wa Postgres, kyasshu ni wa Mongo wo tsukaeru kamoshiremasen.
Kono apuroochi wa daiki bou apuri de wa mezurashiku arimasen.
Kimeru mae ni meritto to demerito wo kentou shimashou.`,
  },
  {
    id: "ja-b1-kai-03",
    title: "Informe de bug",
    difficulty: "b1",
    description: "バグほうこく・Bagu houkoku — Reportar un error claramente",
    translation: "Encontré un bug en el flujo de registro de usuarios. El problema ocurre cuando el email ya existe en la base de datos. En lugar de mostrar un mensaje de error, la app se bloquea completamente. Reproduje el bug tres veces en diferentes navegadores. El error solo aparece al segundo envío del formulario. Revisé los logs y encontré un promise rejection no manejado. La corrección debería ser sencilla una vez encontremos la causa raíz. Crearé un ticket con todos los detalles y pasos para reproducir.",
    code: `Yuuzaa touroku no nagare ni bagu wo mitsukemashita.
Mondai wa meeru ga deetabeesu ni sudeni sonzai suru toki ni hassei shimasu.
Eraa meesseeji wo hyouji suru kawari ni, apuri ga kanzen ni kurashhu shimasu.
Ichi nana burauzaa de bagu wo sanjuu kai saigen shimashita.
Eraa wa foumu no nikai me no sousin jini dake okimasu.
Roogu wo kakunin shite, mishori no promise rejection wo mitsukemashita.
Konpon gen'in wo mitsukere ba, shuusei wa kantan na hazu desu.
Saigen teijun to tomo ni, subete no shousai wo tiketeto ni tsukurimasu.`,
  },
];

export default kaiwa;
