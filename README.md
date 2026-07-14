# Sovereign AI Panel

Extension non officielle, non affiliée à Infomaniak. « **[Euria](https://euria.infomaniak.com/)** » est le nom de [l'assistant IA d'Infomaniak](https://news.infomaniak.com/euria-assistant-ia-souverain/).
Cette extension reproduit son expérience sur n'importe quelle page web via votre propre accès à [l'API Infomaniak AI Services](https://www.infomaniak.com/fr/hebergement/ai-services).

Fonctionnalités : **Résumer**, **Extraire les points clés**, **Rechercher un terme**, **Traduire**, questions libres avec suivi de conversation — réponses en streaming. Compatible **Firefox** (≥ 127) et **Brave / Chromium** (≥ 116).

![Le panneau Sovereign AI ouvert sur une page web](docs/screenshot-panel.png?v=4)

| Résumé | Points clés |
|:---:|:---:|
| ![Un résumé de page généré en streaming](docs/screenshot-summary.png?v=4) | ![Extraction des points clés](docs/screenshot-keypoints.png?v=4) |
| **Traduction** | **Rechercher un terme** |
| ![Traduction de la page en anglais](docs/screenshot-translate.png?v=4) | ![Explication d'un terme en contexte](docs/screenshot-term.png?v=4) |

> Captures d'illustration ; la page servant de décor et le nom « Euria » appartiennent à Infomaniak.

## Installation

Le plus simple : télécharger le paquet prêt à l'emploi depuis la [dernière release](https://github.com/jsiikme/sovereign-ai-panel/releases/latest) — **aucun build nécessaire**. Décompressez le ZIP correspondant à votre navigateur, puis :

**Firefox** (`…-firefox.zip`)
1. Ouvrir `about:debugging#/runtime/this-firefox`
2. **« Charger un module complémentaire temporaire… »** → sélectionner le `manifest.json` du dossier décompressé

L'extension reste chargée jusqu'au redémarrage de Firefox. Pour du permanent : signature via [addons.mozilla.org](https://addons.mozilla.org) (`web-ext sign`) ou Firefox Developer Edition avec `xpinstall.signatures.required = false`.

**Brave / Chromium** (`…-brave.zip`)
1. Ouvrir `brave://extensions` (ou `chrome://extensions`)
2. Activer le **Mode développeur** (interrupteur en haut à droite)
3. **« Charger l'extension non empaquetée »** → sélectionner le dossier décompressé

L'installation persiste entre les redémarrages. Sous Chromium, la permission `api.infomaniak.com` est accordée automatiquement à l'installation (pas d'étape supplémentaire, contrairement à Firefox < 127).

## Construire depuis les sources

Uniquement si vous partez du clone git (pour développer). Firefox et Chromium exigent des `manifest.json` différents et incompatibles (event page vs service worker, SVG vs PNG) ; `build.sh` assemble un dossier propre par navigateur :

```sh
./build.sh   # produit dist/firefox et dist/brave
```

Chargez ensuite `dist/firefox` ou `dist/brave` comme ci-dessus. (À défaut, `dist/` n'est pas versionné.)

## Utilisation

- **Bouton de la barre d'outils** ou **`Alt+Shift+E`** : ouvre/ferme le panneau sur la page courante.
- **Clic droit** → menu **Sovereign AI** : résumer / points clés / traduire la page ; sur une sélection : résumer, rechercher le terme, traduire.
- Panneau **déplaçable** (glisser l'en-tête) et **redimensionnable** (coin inférieur droit) ; position et taille mémorisées. **Mode sombre** automatique.
- Chaque réponse : bouton **Copier** + consommation de **tokens** affichée.
- Le raisonnement du modèle (Qwen3.5 « réfléchit » avant de répondre) est disponible dans un bloc repliable pour les questions libres ; il est **désactivé pour les actions prédéfinies** (résumé, traduction…) — réponses plus rapides et moins de tokens facturés.

## Configuration

Préférences (`about:addons` / `brave://extensions` → Sovereign AI Panel → Préférences) :

- **Langue de l'interface** : Automatique (langue du navigateur), Français ou English
- **Identifiant du produit AI Services** : le numéro de votre produit (Manager Infomaniak, ex. `12345`) ; l'URL de l'API est construite automatiquement à partir de ce numéro
- **Jeton API** : jeton Bearer Infomaniak AI Tools
- **Modèle** : ex. `Qwen/Qwen3.5-122B-A10B-FP8`
- **Taille max.** du contenu de page envoyé (24 000 caractères par défaut)

## Jeton API et sécurité

- Aucun identifiant n'est embarqué dans le code. Au premier lancement, la page de préférences s'ouvre : saisissez-y **l'identifiant de votre produit AI Services** et **votre jeton**. Ils sont stockés dans `storage.local`, local à votre profil navigateur, et ne servent qu'à vos propres requêtes vers Infomaniak.
- **L'URL de l'API est construite par le code** à partir de votre identifiant de produit et d'un domaine figé (`api.infomaniak.com`, via `encodeURIComponent`) : le jeton ne peut techniquement partir vers aucun autre domaine.
- Le contenu de la page est transmis comme **données délimitées dans un message utilisateur**, pas dans le prompt système, pour limiter la prompt injection par des pages malveillantes.
- Firefox ≥ 127 requis : l'API ne renvoie pas d'en-têtes CORS, l'extension dépend donc de la permission hôte `api.infomaniak.com` (accordée à l'installation depuis Firefox 127 ; si elle est révoquée, l'extension l'explique au lieu d'échouer silencieusement).
- **Contexte de conversation par page** (depuis la v1.5.0) : pour retrouver une conversation en revenant sur une page, vos échanges (vos questions + les réponses de l'IA) sont mis en cache dans `storage.local` — local à votre profil, jamais transmis — pendant **30 min**, sur les 16 dernières pages. Le contenu *brut* de la page et le raisonnement du modèle ne sont pas stockés ; **en revanche, les réponses de l'IA étant des résumés ou traductions de la page, elles peuvent en contenir des informations** : si vous consultez des pages sensibles, gardez-le à l'esprit. Le bouton ↺ efface le cache de la page courante ; pour ne rien conserver, videz le stockage de l'extension (`about:addons` / `brave://extensions`).

## Confidentialité

Aucune donnée n'est envoyée au développeur ni à un tiers : vos requêtes vont directement de votre navigateur à Infomaniak, avec votre propre jeton. Détails : [politique de confidentialité](PRIVACY.md).

## Choix techniques

- **Injection à la demande** : le script de contenu n'est pas déclaré sur `<all_urls>` ; il est injecté (via `activeTab` + `scripting`) seulement quand vous sollicitez l'extension. Empreinte mémoire nulle sur les onglets où le panneau n'est pas utilisé.
- **Extraction de page filtrée** : seuls les blocs de texte utiles et visibles (paragraphes, titres, listes…) sont envoyés — navigation, pieds de page et éléments cachés sont exclus, ce qui réduit le bruit et les tokens.
- **Économie de contexte** : contenu de page limité (réglable) et historique tronqué aux 8 derniers messages à chaque appel.
- **Streaming robuste** : rendu limité à un re-rendu par frame (`requestAnimationFrame`), deltas de raisonnement relayés par paquets, retry automatique avec backoff sur HTTP 429/5xx + bouton « Réessayer ».
- **Panneau en Shadow DOM** (mode `closed`) : styles isolés du site visité, `z-index` maximal.
- **Bilingue** : français ou anglais, sélectionnable dans les préférences (**Langue de l'interface**). Par défaut « Automatique » : suit la langue du navigateur (français pour les locales `fr*`, anglais sinon).
- **Conversation par page** : changer de page réinitialise la conversation ; y revenir dans les 30 min la restaure (détection SPA via `pushState`/`replaceState` + `popstate` + repli par polling). Contribution de [@reneluria](https://github.com/reneluria).

## Structure

| Fichier | Rôle |
|---|---|
| `manifest.json` | Manifest V3 Firefox (≥ 127) : event page, icône SVG |
| `manifest.chromium.json` | Manifest V3 Brave/Chromium (≥ 116) : service worker, icônes PNG |
| `defaults.js` | Valeurs par défaut partagées + polyfill `browser` pour Chromium (jamais persistées) |
| `background.js` | Menus, raccourci, injection à la demande, appels API SSE avec retry |
| `content.js` | Panneau flottant (Shadow DOM), extraction de page, rendu Markdown |
| `options.html/js` | Page de préférences (identifiant produit, jeton, modèle, taille max.) avec validation |
| `build.sh` | Construit `dist/firefox` et `dist/brave` |

Le code applicatif est 100 % partagé : `defaults.js` aliasse `browser = chrome` sous Chromium (les API `chrome.*` renvoient des promesses en MV3), et `background.js` se charge via `background.scripts` (Firefox) ou `importScripts` dans le service worker (Chromium). Nuance service worker : Chromium peut suspendre le worker après ~30 s d'inactivité, mais les messages du port et le fetch en cours le maintiennent éveillé pendant un stream ; en cas de suspension imprévue, le panneau affiche une erreur avec « Réessayer » au lieu d'un spinner infini.
