// src/data/snippets/languages/english/b1/conversations.es.js

const conversationsEs = {
  "en-b1-conv-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar esta pull request.",
      "La estructura general se ve limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podrías añadir manejo de errores para la llamada a la API?",
      "Además, los nombres de variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Por favor actualiza los tests para cubrir los nuevos casos límite.",
      "Avísame si tienes preguntas sobre mis comentarios.",
    ],
  },
  "en-b1-conv-02": {
    title: "Revisión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "La razón principal es que necesitamos soporte de datos relacionales.",
      "Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario.",
      "¿Qué opinas sobre usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para datos principales y Mongo para caché.",
      "Este enfoque es común en aplicaciones a gran escala.",
      "Revisemos los pros y contras antes de decidir.",
    ],
  },
  "en-b1-conv-03": {
    title: "Reporte de error",
    lines: [
      "Encontré un error en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En vez de mostrar un mensaje de error, la app se bloquea completamente.",
      "Reproduje el error tres veces en diferentes navegadores.",
      "El error solo ocurre al enviar el formulario por segunda vez.",
      "Revisé los logs y encontré un promise rejection sin manejar.",
      "La solución debería ser sencilla una vez encontremos la causa raíz.",
      "Crearé un ticket con todos los detalles y pasos para reproducirlo.",
    ],
  },
};

export default conversationsEs;
