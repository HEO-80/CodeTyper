// src/data/snippets/languages/italian/b1/conversazioni.es.js

const conversazioniEs = {
  "it-b1-conv-01": {
    title: "Revisión de código",
    lines: [
      "Gracias por enviar esta pull request.",
      "La estructura general parece limpia y legible.",
      "Tengo algunas sugerencias para la función principal.",
      "¿Podrían añadir la gestión de errores para la llamada a la API?",
      "Además, los nombres de las variables podrían ser más descriptivos.",
      "Creo que deberíamos dividir esto en dos funciones más pequeñas.",
      "Actualicen los tests para cubrir los nuevos casos límite.",
      "Avísenme si tienen preguntas sobre mis comentarios.",
    ],
  },
  "it-b1-conv-02": {
    title: "Reunión técnica",
    lines: [
      "Hoy tenemos que decidir la arquitectura de la base de datos.",
      "Creo que deberíamos usar PostgreSQL para este proyecto.",
      "El motivo principal es que necesitamos datos relacionales.",
      "Sin embargo, MongoDB podría funcionar mejor para las sesiones de usuario.",
      "¿Qué opinan sobre usar ambos en el mismo proyecto?",
      "Podríamos usar Postgres para los datos principales y Mongo para la caché.",
      "Este enfoque es habitual en aplicaciones a gran escala.",
      "Examinemos los pros y los contras antes de decidir.",
    ],
  },
  "it-b1-conv-03": {
    title: "Informe de error",
    lines: [
      "He encontrado un error en el flujo de registro de usuarios.",
      "El problema se produce cuando el email ya existe en la base de datos.",
      "En lugar de mostrar un mensaje de error, la app se bloquea.",
      "He reproducido el error tres veces en diferentes navegadores.",
      "El error solo se produce en el segundo envío del formulario.",
      "He revisado los logs y encontré un promise rejection sin gestionar.",
      "La corrección debería ser sencilla una vez encontremos la causa.",
      "Crearé un ticket con todos los detalles y los pasos para reproducirlo.",
    ],
  },
};

export default conversazioniEs;
