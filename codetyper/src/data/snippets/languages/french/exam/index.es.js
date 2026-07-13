// src/data/snippets/languages/french/exam/index.es.js

const examEs = {
  "fr-exam-01": {
    title: "Email completo — Migración a microservicios",
    lines: [
      "Asunto: Propuesta de migración a microservicios — Fase Uno",
      "",
      "Estimados miembros del equipo,",
      "",
      "Espero que estéis todos bien.",
      "Os escribo para compartir mi propuesta de migración de nuestro monolito a microservicios.",
      "",
      "Tras analizar la arquitectura actual, he identificado tres cuellos de botella principales.",
      "En primer lugar, el módulo de autenticación está estrechamente acoplado al servicio de pago.",
      "En segundo lugar, los despliegues requieren el reinicio simultáneo de toda la aplicación.",
      "En tercer lugar, el escalado independiente de funcionalidades es actualmente imposible.",
      "",
      "Mi propuesta se divide en tres fases a lo largo de seis meses.",
      "En la primera fase, extraeríamos el servicio de autenticación para desplegarlo de forma independiente.",
      "Esto nos permitiría escalarlo por separado y reducir el riesgo global de despliegue.",
      "Si la primera fase tiene éxito, pasaríamos a los servicios de pago y notificación.",
      "",
      "He adjuntado un documento técnico detallado con diagramas y estimaciones de costes.",
      "Os agradecería vuestros comentarios antes de presentar esto a las partes interesadas.",
      "No dudéis en hacerme saber si deseáis organizar una sesión de revisión esta semana.",
      "",
      "Atentamente,",
      "Alex",
    ],
  },
};

export default examEs;
