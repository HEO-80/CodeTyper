// src/data/snippets/languages/chinese/b1/duihua.js

const duihua = [
  {
    id: "zh-b1-dui-01",
    title: "Revisión de código",
    difficulty: "b1",
    description: "HSK 3 · 代码审查 · Dàimǎ shěnchá — Dar y recibir feedback sobre código",
    translation: "Gracias por enviar este pull request. La estructura general se ve limpia y legible. Tengo algunas sugerencias para la función principal. ¿Podrías añadir manejo de errores para la llamada API? Además, los nombres de variables podrían ser más descriptivos. Creo que deberíamos dividir esto en dos funciones más pequeñas. Por favor actualiza los tests. Avísame si tienes preguntas.",
    code: `Xièxiè nǐ tíjiāo zhège pull request.
Zhěngtǐ jiégòu kàn qǐlái gānjìng qiě yìdú.
Wǒ duì zhǔyào hánshù yǒu yīxiē jiànyì.
Nǐ néng wèi API diàoyòng tiānjiā cuòwù chǔlǐ ma?
Lìngwài, biànliàng míng kěyǐ gèng jùtǐ.
Wǒ rènwéi wǒmen yīnggāi bǎ tā fēnchéng liǎng gè gèng xiǎo de hánshù.
Qǐng gēngxīn cèshì yǐ tǒnggài xīn de biānjìng qíngkuàng.
Rúguǒ nǐ duì wǒ de pínglùn yǒu rènhé wèntí, qǐng gàosù wǒ.`,
  },
  {
    id: "zh-b1-dui-02",
    title: "Reunión técnica",
    difficulty: "b1",
    description: "HSK 3 · 技术会议 · Jìshù huìyì — Decisiones técnicas en equipo",
    translation: "Hoy tenemos que decidir la arquitectura de la base de datos. Creo que deberíamos usar PostgreSQL para este proyecto. La razón principal es que necesitamos datos relacionales. Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario. ¿Qué piensan de usar ambos en el mismo proyecto? Podríamos usar Postgres para datos principales y Mongo para caché. Revisemos los pros y contras antes de decidir.",
    code: `Jīntiān wǒmen xūyào juédìng shùjùkù jiàgòu.
Wǒ rènwéi wǒmen yīnggāi wèi cǐ xiàngmù shǐyòng PostgreSQL.
Zhǔyào yuányīn shì wǒmen xūyào guānxì xíng shùjù.
Rán ér, MongoDB kěnéng gèng shìhé yònghù huìhuà.
Nǐmen juéde zài tóng yīgè xiàngmù zhōng tóngshí shǐyòng liǎngzhě zěnme yàng?
Wǒmen kěyǐ yòng Postgres chǔlǐ héxīn shùjù, yòng Mongo zuò huǎncún.
Juédìng zhīqián ràng wǒmen fēnxī yōuquē diǎn.`,
  },
  {
    id: "zh-b1-dui-03",
    title: "Informe de bug",
    difficulty: "b1",
    description: "HSK 3 · 错误报告 · Cuòwù bàogào — Reportar un error claramente",
    translation: "Encontré un bug en el flujo de registro de usuarios. El problema ocurre cuando el email ya existe en la base de datos. En lugar de mostrar un mensaje de error, la app se bloquea completamente. Reproduje el bug tres veces en diferentes navegadores. El error solo aparece al segundo envío del formulario. La corrección debería ser sencilla una vez encontremos la causa raíz.",
    code: `Wǒ zài yònghù zhùcè liúchéng zhōng fāxiàn le yīgè cuòwù.
Dāng diànzǐ yóujiàn yǐ cúnzài yú shùjùkù zhōng shí, wèntí jiù huì chūxiàn.
Yìnggāi xiǎnshì cuòwù xiāoxi, dànshì yìngyòng chéngxù wánquán bēngkuì le.
Wǒ zài bùtóng de liúlǎnqì zhōng fùxiàn le sāncì cuòwù.
Cuòwù zhǐ zài dì èr cì tíjiāo biǎodān shí chūxiàn.
Yīdān wǒmen zhǎodào gēnyuán, xiūfù yīnggāi hěn jiǎndān.`,
  },
];

export default duihua;
