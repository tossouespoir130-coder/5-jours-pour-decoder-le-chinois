# Règle Permanente : Responsivité Absolue & Mobile-First Obligatoire

À chaque modification, création ou mise à jour de code (HTML, CSS, JS, composants) :
1. **Priorité Mobile-First absolue** : La majorité du trafic provient de smartphones (Facebook Ads, TikTok, Instagram). Toute interface doit être irréprochable sur mobile (écrans 320px, 375px, 390px, 414px) avant le desktop.
2. **Zéro débordement horizontal (`overflow-x`)** : Aucun élément ne doit dépasser la largeur du viewport. Utiliser `max-w-full`, `overflow-hidden` et des largeurs fluides.
3. **Typographie adaptative fluide** : Adapter les grandes tailles de police aux petits écrans (ex. `text-4xl sm:text-6xl md:text-8xl`), avec des hauteurs de ligne (`leading-[1.05]`) évitant les coupures disgracieuses.
4. **Grilles et flexbox responsives** : Toutes les grilles doivent commencer en 1 colonne sur mobile (`grid-cols-1`) avant d'évoluer vers `sm:grid-cols-2`, `lg:grid-cols-3` ou `lg:grid-cols-4`.
5. **Composants interactifs & Touch Targets** : Boutons et onglets d'au moins 44px de hauteur pour faciliter le toucher au doigt, avec espacements adaptés (`p-4` à `p-8` selon l'écran).
6. **Vérification systématique** : Avant de valider une tâche, tester systématiquement le rendu sur toutes les résolutions.
