// src/data/snippets/languages/russian/b1/razgovory.es.js

const razgovoryEs = {
  "ru-b1-raz-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar este pull request.",
      "La estructura general se ve limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podrías añadir manejo de errores para la llamada API?",
      "Además, los nombres de variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Por favor actualiza los tests para cubrir los nuevos casos límite.",
      "Avísame si tienes preguntas sobre mis comentarios.",
    ],
  },
  "ru-b1-raz-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "La razón principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario.",
      "¿Qué piensan de usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para datos principales y Mongo para caché.",
      "Este enfoque es común en aplicaciones a gran escala.",
      "Revisemos los pros y contras antes de decidir.",
    ],
  },
  "ru-b1-raz-03": {
    title: "Informe de bug",
    lines: [
      "Encontré un bug en el flujo de registro de usuarios.",
      "El problema ocurre cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la app se bloquea completamente.",
      "Reproduje el bug tres veces en diferentes navegadores.",
      "El error solo aparece al segundo envío del formulario.",
      "Revisé los logs y encontré un promise rejection no manejado.",
      "La corrección debería ser sencilla una vez encontremos la causa raíz.",
      "Crearé un ticket con todos los detalles y pasos para reproducir.",
    ],
  },
};

export default razgovoryEs;
