// src/data/snippets/languages/russian/b1/razgovory.js

const razgovory = [
  {
    id: "ru-b1-raz-01",
    title: "Revisión de código",
    difficulty: "b1",
    description: "Проверка кода・Proverka koda — Dar y recibir feedback sobre código",
    translation: "Gracias por enviar este pull request. La estructura general se ve limpia y legible. Tengo algunas sugerencias para la función principal. ¿Podrías añadir manejo de errores para la llamada API? Además, los nombres de variables podrían ser más descriptivos. Creo que deberíamos dividir esto en dos funciones más pequeñas. Por favor actualiza los tests para cubrir los nuevos casos límite. Avísame si tienes preguntas sobre mis comentarios.",
    code: `Spasibo za otpravku etogo pull request.
Obshchaya struktura vyglyadit chistoy i chitaemoy.
U menya est neskolko predlozheniy dlya osnovnoy funktsii.
Mogli by vy dobavit obrabotku oshibok dlya vyzova API?
Krome togo, nazvaniya peremennykh mogli by byt bolee opisatelnymi.
Ya dumayu, nam sleduet razdelit eto na dve menshie funktsii.
Pozhaluysta, obnovite testy, chtoby okhvatit novye krayevye sluchai.
Soobshchite mne, esli u vas est voprosy po moim kommentariyam.`,
  },
  {
    id: "ru-b1-raz-02",
    title: "Reunión técnica",
    difficulty: "b1",
    description: "Техническое совещание・Tekhnicheskoe soveshchanie — Decisiones técnicas en equipo",
    translation: "Hoy tenemos que decidir la arquitectura de la base de datos. Creo que deberíamos usar PostgreSQL para este proyecto. La razón principal es que necesitamos datos relacionales. Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario. ¿Qué piensan de usar ambos en el mismo proyecto? Podríamos usar Postgres para datos principales y Mongo para caché. Este enfoque es común en aplicaciones a gran escala. Revisemos los pros y contras antes de decidir.",
    code: `Segodnya nam nuzhno reshit arkhitekturu bazy dannykh.
Ya dumayu, nam sleduet ispolzovat PostgreSQL dlya etogo proyekta.
Osnovnaya prichina v tom, chto nam nuzhny relyatsionnye dannye.
Odnako MongoDB mozhet luchshe podoyti dlya polzovatelskikh sessiy.
Chto vy dumayete ob ispolzovanii oboikh v odnom proyekte?
My mogli by ispolzovat Postgres dlya osnovnykh dannykh i Mongo dlya kesha.
Etot podkhod rasprostranyon v krupnomasshtabnykh prilozheniyakh.
Davayte rassmotrим plyusy i minusy pered prinyatiem resheniya.`,
  },
  {
    id: "ru-b1-raz-03",
    title: "Informe de bug",
    difficulty: "b1",
    description: "Отчет об ошибке・Otchet ob oshibke — Reportar un error claramente",
    translation: "Encontré un bug en el flujo de registro de usuarios. El problema ocurre cuando el email ya existe en la base de datos. En lugar de mostrar un mensaje de error, la app se bloquea completamente. Reproduje el bug tres veces en diferentes navegadores. El error solo aparece al segundo envío del formulario. Revisé los logs y encontré un promise rejection no manejado. La corrección debería ser sencilla una vez encontremos la causa raíz. Crearé un ticket con todos los detalles y pasos para reproducir.",
    code: `Ya obnaruzhil oshibku v protsesse registratsii polzovateley.
Problema voznikaet, kogda email uzhe sushchestvuet v baze dannykh.
Vmesto togo chtoby pokazat soobshchenie ob oshibke, prilozhenie polnostyu zavisaet.
Ya vosproizvel oshibku tri raza v raznykh brauzerakh.
Oshibka poyavlyaetsya tolko pri vtoroy otpravke formy.
Ya proveril zhurnaly i obnaruzhil neobrabotannyy otkaz promise.
Ispravlenie dolzhno byt prostym, kak tolko my naydyom kornevuyu prichinu.
Ya sozdam tiket so vsemi podrobnostyami i shagami dlya vosproizvedeniya.`,
  },
];

export default razgovory;
