// src/data/snippets/languages/french/b1/conversations.es.js

const conversationsEs = {
  "fr-b1-conv-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar esta pull request.",
      "La estructura general es clara y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podría añadir gestión de errores para la llamada a la API?",
      "Además, los nombres de variables podrían ser más explícitos.",
      "Creo que habría que dividir esto en dos funciones más pequeñas.",
      "Por favor actualice los tests para cubrir los nuevos casos límite.",
      "Avíseme si tiene preguntas sobre mis comentarios.",
    ],
  },
  "fr-b1-conv-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "La razón principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB podría ser más adecuado para las sesiones de usuario.",
      "¿Qué le parece usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para los datos principales y Mongo para la caché.",
      "Este enfoque es habitual en aplicaciones a gran escala.",
      "Examinemos las ventajas e inconvenientes antes de decidir.",
    ],
  },
  "fr-b1-conv-03": {
    title: "Informe de error",
    lines: [
      "He encontrado un error en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la aplicación falla completamente.",
      "He reproducido el error tres veces en diferentes navegadores.",
      "El error solo aparece en la segunda vez que se envía el formulario.",
      "He revisado los logs y encontré una promesa rechazada sin gestionar.",
      "La corrección debería ser sencilla una vez identificada la causa.",
      "Voy a crear un ticket con todos los detalles y los pasos para reproducirlo.",
    ],
  },
};

export default conversationsEs;
