// src/data/snippets/languages/italian/exam/index.es.js

const examEs = {
  "it-exam-01": {
    title: "Email completo — Migración a microservicios",
    lines: [
      "Asunto: Propuesta de migración a microservicios — Fase Uno",
      "",
      "Estimado equipo,",
      "",
      "Espero que estéis todos bien.",
      "Os escribo para compartir mi propuesta de migración de nuestro monolito a microservicios.",
      "",
      "Tras analizar la arquitectura actual, he identificado tres principales cuellos de botella.",
      "En primer lugar, el módulo de autenticación está estrechamente acoplado al servicio de pago.",
      "En segundo lugar, los despliegues requieren el reinicio simultáneo de toda la aplicación.",
      "En tercer lugar, la escalabilidad independiente de funcionalidades individuales no es posible actualmente.",
      "",
      "Mi propuesta se articula en tres fases a lo largo de seis meses.",
      "En la primera fase, extraeríamos el servicio de autenticación y lo desplegaríamos de forma independiente.",
      "Esto nos permitiría escalarlo por separado y reducir el riesgo global de despliegue.",
      "Si la primera fase tiene éxito, procederíamos con los servicios de pago y notificación.",
      "",
      "He adjuntado un documento técnico detallado con diagramas y estimaciones de costes.",
      "Agradecería vuestros comentarios antes de presentar esto a los stakeholders.",
      "Avisadme si queréis organizar una sesión de revisión esta semana.",
      "",
      "Atentamente,",
      "Alex",
    ],
  },
};

export default examEs;
