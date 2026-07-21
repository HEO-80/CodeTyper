// src/data/snippets/languages/chinese/b1/duihua.es.js

const duihuaEs = {
  "zh-b1-dui-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar este pull request.",
      "La estructura general se ve limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podrías añadir manejo de errores para la llamada API?",
      "Además, los nombres de variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Por favor actualiza los tests.",
      "Avísame si tienes preguntas.",
    ],
  },
  "zh-b1-dui-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "La razón principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario.",
      "¿Qué piensan de usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para datos principales y Mongo para caché.",
      "Revisemos los pros y contras antes de decidir.",
    ],
  },
  "zh-b1-dui-03": {
    title: "Informe de bug",
    lines: [
      "Encontré un bug en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la app se bloquea completamente.",
      "Reproduje el bug tres veces en diferentes navegadores.",
      "El error solo aparece al segundo envío del formulario.",
      "La corrección debería ser sencilla una vez encontremos la causa raíz.",
    ],
  },
};

export default duihuaEs;
