// src/data/snippets/languages/portuguese/b1/conversas.es.js

const conversasEs = {
  "pt-b1-conv-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar esta pull request.",
      "La estructura general parece limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podría añadir tratamiento de errores para la llamada a la API?",
      "Además, los nombres de las variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Por favor actualice los tests para cubrir los nuevos casos límite.",
      "Avíseme si tiene dudas sobre mis comentarios.",
    ],
  },
  "pt-b1-conv-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "El motivo principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB puede funcionar mejor para las sesiones de usuario.",
      "¿Qué les parece usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para datos principales y Mongo para caché.",
      "Este enfoque es habitual en aplicaciones a gran escala.",
      "Analicemos los pros y contras antes de decidir.",
    ],
  },
  "pt-b1-conv-03": {
    title: "Informe de error",
    lines: [
      "Encontré un error en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la app se bloquea completamente.",
      "Reproduje el error tres veces en diferentes navegadores.",
      "El error solo aparece en la segunda vez que se envía el formulario.",
      "Revisé los logs y encontré un promise rejection sin tratar.",
      "La corrección debería ser sencilla una vez encontremos la causa raíz.",
      "Crearé un ticket con todos los detalles y pasos para reproducirlo.",
    ],
  },
};

export default conversasEs;
