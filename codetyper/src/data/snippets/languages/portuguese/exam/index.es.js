// src/data/snippets/languages/portuguese/exam/index.es.js

const examEs = {
  "pt-exam-01": {
    title: "Email completo — Migración a microservicios",
    lines: [
      "Asunto: Propuesta de migración a microservicios — Fase Uno",
      "",
      "Estimado/a equipo,",
      "",
      "Espero que estéis todos bien.",
      "Os escribo para compartir mi propuesta de migración de nuestro monolito a microservicios.",
      "",
      "Tras analizar la arquitectura actual, he identificado tres cuellos de botella principales.",
      "En primer lugar, el módulo de autenticación está estrechamente acoplado al servicio de pago.",
      "En segundo lugar, los despliegues exigen el reinicio simultáneo de toda la aplicación.",
      "En tercer lugar, el escalado independiente de funcionalidades individuales no es posible actualmente.",
      "",
      "Mi propuesta se divide en tres fases a lo largo de seis meses.",
      "En la primera fase, extraeríamos el servicio de autenticación y lo implementaríamos de forma independiente.",
      "Esto nos permitiría escalarlo por separado y reducir el riesgo global de despliegue.",
      "Si la primera fase tiene éxito, avanzaríamos a los servicios de pago y notificación.",
      "",
      "He adjuntado un documento técnico detallado con diagramas y estimaciones de costes.",
      "Os agradecería vuestros comentarios antes de presentar esto a los stakeholders.",
      "Avisadme si queréis programar una sesión de revisión esta semana.",
      "",
      "Con los mejores saludos,",
      "Alex",
    ],
  },
};

export default examEs;
