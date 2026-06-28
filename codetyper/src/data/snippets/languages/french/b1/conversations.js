// src/data/snippets/languages/french/b1/conversations.js

const conversationsSnippets = [
  {
    id: "fr-b1-conv-01",
    title: "Revue de code",
    difficulty: "b1",
    description: "Donner et recevoir des retours sur le code",
    code: `Merci d'avoir soumis cette pull request.
La structure générale est claire et lisible.
J'ai quelques suggestions pour la fonction principale.
Pourriez-vous ajouter une gestion des erreurs pour l'appel API ?
De plus, les noms de variables pourraient être plus explicites.
Je pense qu'il faudrait diviser ceci en deux fonctions plus petites.
Veuillez mettre à jour les tests pour couvrir les nouveaux cas limites.
Faites-moi savoir si vous avez des questions sur mes commentaires.`,
  },
  {
    id: "fr-b1-conv-02",
    title: "Réunion technique",
    difficulty: "b1",
    description: "Discuter de décisions techniques en équipe",
    code: `Nous devons décider de l'architecture de la base de données aujourd'hui.
Je pense que nous devrions utiliser PostgreSQL pour ce projet.
La raison principale est que nous avons besoin de données relationnelles.
Cependant, MongoDB pourrait mieux convenir pour les sessions utilisateurs.
Que pensez-vous d'utiliser les deux dans le même projet ?
Nous pourrions utiliser Postgres pour les données principales et Mongo pour le cache.
Cette approche est courante dans les applications à grande échelle.
Examinons les avantages et inconvénients avant de décider.`,
  },
  {
    id: "fr-b1-conv-03",
    title: "Rapport de bug",
    difficulty: "b1",
    description: "Signaler et décrire un bug clairement",
    code: `J'ai trouvé un bug dans le flux d'inscription des utilisateurs.
Le problème survient quand l'email existe déjà dans la base de données.
Au lieu d'afficher un message d'erreur, l'application plante complètement.
J'ai reproduit le bug trois fois sur différents navigateurs.
L'erreur n'apparaît que lors de la deuxième soumission du formulaire.
J'ai vérifié les logs et trouvé une promesse rejetée non gérée.
La correction devrait être simple une fois la cause identifiée.
Je vais créer un ticket avec tous les détails et les étapes à reproduire.`,
  },
];

export default conversationsSnippets;
