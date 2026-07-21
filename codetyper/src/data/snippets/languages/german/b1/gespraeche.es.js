// src/data/snippets/languages/german/b1/gespraeche.es.js

const gespraecheEs = {
  "de-b1-ges-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar esta pull request.",
      "La estructura general se ve limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podría añadir gestión de errores para la llamada a la API?",
      "Además, los nombres de variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Por favor actualice los tests para los nuevos casos límite.",
      "Avíseme si tiene preguntas sobre mis comentarios.",
    ],
  },
  "de-b1-ges-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "La razón principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB podría ser más adecuado para las sesiones de usuario.",
      "¿Qué opina sobre usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para datos principales y Mongo para la caché.",
      "Este enfoque es habitual en aplicaciones a gran escala.",
      "Revisemos los pros y contras antes de decidir.",
    ],
  },
  "de-b1-ges-03": {
    title: "Informe de error",
    lines: [
      "He encontrado un error en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la app se bloquea completamente.",
      "He reproducido el error tres veces en diferentes navegadores.",
      "El error solo ocurre al enviar el formulario por segunda vez.",
      "He revisado los logs y encontré un promise rejection sin gestionar.",
      "La corrección debería ser sencilla una vez encontremos la causa.",
      "Crearé un ticket con todos los detalles y pasos para reproducirlo.",
    ],
  },
};

export default gespraecheEs;
