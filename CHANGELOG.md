# Journal des modifications

Toutes les évolutions notables de **Sovereign AI Panel** sont consignées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) ;
versionnage [SemVer](https://semver.org/lang/fr/).

La page GitHub *Releases* ne présente que la **dernière** version (installeurs `.zip`
Firefox + Brave) ; ce fichier conserve l'historique complet.

## [1.6.1] — 2026-07-16

### Corrigé
- **Récupération du `product_id`** : la réponse de `GET /1/ai` expose le champ
  **`product_id`** (dans le tableau `data`), et non `id`. README et aide du champ
  dans les préférences corrigés, avec un lien vers la documentation de l'endpoint.

### Modifié
- **README allégé** : recentré sur l'essentiel (installation, prérequis d'accès,
  configuration, confidentialité).

## [1.6.0] — 2026-07-16

### Ajouté
- **Guide de mise en route** dans le README : souscrire à AI Services (**1 million de
  crédits gratuits**, sans engagement pendant un mois, carte de crédit requise),
  **créer un jeton API** (Manager → gestion des tokens) et **récupérer le
  `product_id`** (`curl -H "Authorization: Bearer …" https://api.infomaniak.com/1/ai`,
  champ `product_id`).
- **Liens d'accès dans la page de préférences** (localisés FR/EN) : « Commander
  AI Services » et « Créer un jeton API » — affichés là où l'on saisit ces valeurs,
  donc dès le premier lancement.
- L'aide du champ « Identifiant du produit » indique désormais la commande exacte
  pour obtenir le `product_id`.

## [1.5.3] — 2026-07-15

### Modifié
- **« Extraire les points clés »** : réflexion **désactivée** et plafond de sortie
  ramené à **1000 tokens** (entièrement dédiés à la réponse visible). Toujours
  exactement 3 points clés.

## [1.5.2] — 2026-07-15

### Modifié
- **« Extraire les points clés »** : plafond de sortie porté à **1500 tokens**
  (réflexion activée ; réflexion + réponse partagent ce budget). Toujours exactement
  3 points clés.

## [1.5.1] — 2026-07-15

### Modifié
- **« Extraire les points clés »** : la phase de réflexion (raisonnement) est
  désormais **activée** pour cette action, et le nombre de points est **fixé à
  exactement 3** (du plus important au moins important). Plafond de sortie inchangé
  (1000 tokens, partagés entre réflexion et réponse côté API).

## [1.5.0] — 2026-07-15

### Modifié
- **« Extraire les points clés »** : sortie plafonnée à **1000 tokens**
  (`max_completion_tokens`, spécifique à cette action) et **5 points clés maximum**.
  Le modèle choisit le nombre optimal (idéalement **3 à 5**), du plus important au
  moins important, chaque point en une phrase concise. Les autres actions (résumé,
  traduction, recherche de terme) restent sans limite de longueur.

## [1.4.2] — 2026-07-15

### Corrigé
- **Formatage incohérent des réponses (surtout traductions)** : plus de puce
  dupliquée quand le modèle préfixe un item de liste d'un symbole (« ● » après le
  point de liste) — la puce décorative est retirée, et les caractères de puce nus
  (●, •, ▪…) sont reconnus comme des listes. Tailles de titres homogénéisées
  (moins de sauts de taille). Le prompt de traduction demande un Markdown simple et
  cohérent, sans symboles de puces.

## [1.4.1] — 2026-07-15

### Modifié
- **Économie de tokens via le cache de prompt** (au lieu de la troncature) : la page
  est de nouveau envoyée **en entier à chaque tour**, mais le cache de prompt de
  l'API Infomaniak est activé (`prompt_cache_key` stable par page). Le préfixe
  identique (système + contenu de page) est réutilisé côté serveur d'un message à
  l'autre — économie de coût **sans aucune perte de contexte ni de précision**.
  (Vérifié : l'API Infomaniak documente `prompt_cache_key` sur l'endpoint chat
  completions.)

## [1.4.0] — 2026-07-15

### Ajouté / Amélioré
- **Robustesse réseau** : abandon automatique d'une requête figée après 60 s sans
  réponse (fini les chargements infinis), et respect de l'en-tête `Retry-After` du
  serveur pour espacer les nouvelles tentatives (429/503).
- **Économie de tokens** : le contenu de la page n'est envoyé en entier qu'au premier
  message ; les messages suivants n'en renvoient qu'un extrait (~66 % de tokens de
  page en moins par tour de conversation).
- **Performance** : le sondage d'URL (fallback SPA, toutes les 1 s) n'est plus armé
  qu'à la première ouverture du panneau, au lieu de tourner en permanence.
- **Accessibilité** : région de réponse annoncée aux lecteurs d'écran
  (`role="log"` + `aria-live`), piège de focus clavier dans le panneau (Tab), et
  restauration du focus à la fermeture.

## [1.3.3] — 2026-07-15

### Retiré
- **Prompt système d'exactitude factuelle** (ajouté en 1.3.0) : retour au prompt
  système simple (rôle, réponse concise en Markdown, contenu de page traité comme
  des données).

## [1.3.2] — 2026-07-15

### Corrigé
- **Positionnement du panneau (cause racine)** : un simple clic sur l'en-tête
  enregistrait la position (le gestionnaire de déplacement sauvegardait même sans
  mouvement). La position n'est désormais mémorisée que si le panneau a réellement
  bougé (seuil de 3 px) ou été redimensionné. Toute position parasite déjà mémorisée
  est purgée au chargement. Le panneau reste en bas à droite tant qu'on ne le déplace
  pas soi-même.

## [1.3.1] — 2026-07-14

### Corrigé
- **Positionnement du panneau (suite)** : la position n'est plus enregistrée sur un
  simple clic (bouton, champ de saisie). Un régression de la 1.2.2 sauvegardait la
  position absolue à chaque clic, ce qui, dans une fenêtre étroite, faisait
  réapparaître le panneau en haut à gauche. Elle n'est désormais persistée que sur un
  vrai geste : déplacement de l'en-tête ou redimensionnement via la poignée. Toute
  position parasite mémorisée avant est purgée automatiquement.

## [1.3.0] — 2026-07-14

### Ajouté
- **Prompt système d'exactitude factuelle** (anti-hallucination), envoyé dans chaque
  appel API : ne répondre aux questions factuelles qu'à partir d'informations
  vérifiées, privilégier une recherche web pour toute information réelle / externe /
  variable, signaler clairement l'incertitude, ne jamais inventer ni citer de source
  non vérifiée. Le contenu de la page reste la source fiable pour les questions sur la
  page (résumé, points clés, traduction inchangés).

### Sécurité
- **Content-Security-Policy explicite** dans les deux manifestes
  (`script-src 'self'; object-src 'none'`) — défense en profondeur contre le XSS sur
  la page de préférences et le panneau. _(portée depuis une revue sécurité de
  @reneluria)_

### Corrigé
- **Positionnement du panneau** : plus de mémorisation parasite de la position lors
  d'un redimensionnement de la fenêtre ; le panneau reste en bas à droite tant qu'il
  n'est pas déplacé manuellement (double-clic sur l'en-tête pour réinitialiser).
- **Bouton de fermeture** toujours atteignable (le panneau ne peut plus déborder de
  l'écran ; largeur bornée à 680 px).
- **Lien « Propulsé par Infomaniak AI Services »** localisé : page FR en interface
  française, page EN en anglais.

## Socle fonctionnel

- Assistant IA sur n'importe quelle page web (Firefox & Brave/Chromium) via
  l'API **Infomaniak AI Services** — les données restent en Europe.
- Actions : **résumer**, **extraire les points clés**, **rechercher un terme**,
  **traduire**, plus questions libres avec mémoire de conversation par page.
- Réponses en **streaming**, rendu Markdown, mode clair/sombre.
- Panneau flottant **déplaçable / redimensionnable** (Shadow DOM isolé).
- Interface **bilingue FR/EN** (automatique ou choix manuel dans les préférences).
- Identifiant de produit et jeton API stockés uniquement dans les préférences
  locales du navigateur — jamais dans le code.
- Injection **à la demande** (`activeTab`), aucun accès permanent aux pages.
