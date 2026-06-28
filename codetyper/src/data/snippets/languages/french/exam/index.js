// src/data/snippets/languages/french/exam/index.js

const examSnippets = [
  {
    id: "fr-exam-01",
    title: "Email complet — Migration microservices",
    difficulty: "exam",
    description: "Email professionnel complet avec toutes les structures",
    code: `Objet : Proposition de migration vers les microservices — Phase Un

Chers membres de l'équipe,

J'espère que vous allez tous bien.
Je vous écris pour partager ma proposition de migration de notre monolithe vers les microservices.

Après avoir analysé l'architecture actuelle, j'ai identifié trois goulots d'étranglement principaux.
Premièrement, le module d'authentification est étroitement couplé au service de paiement.
Deuxièmement, les déploiements nécessitent le redémarrage simultané de toute l'application.
Troisièmement, la mise à l'échelle indépendante des fonctionnalités est actuellement impossible.

Ma proposition se décompose en trois phases sur six mois.
Dans la première phase, nous extrairions le service d'authentification pour le déployer indépendamment.
Cela nous permettrait de le faire évoluer séparément et de réduire le risque global de déploiement.
Si la première phase réussit, nous passerions aux services de paiement et de notification.

J'ai joint un document technique détaillé avec des diagrammes et des estimations de coûts.
Je vous serais reconnaissant de vos retours avant de présenter cela aux parties prenantes.
N'hésitez pas à me faire savoir si vous souhaitez organiser une session de révision cette semaine.

Cordialement,
Alex`,
  },
];

export default examSnippets;
