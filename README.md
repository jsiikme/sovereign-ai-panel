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

## Prérequis : votre accès Infomaniak AI Services

L'extension n'inclut aucun accès : elle utilise **le vôtre**. Il faut donc un produit **AI Services**, un **jeton API** et l'**identifiant de votre produit**. Comptez 5 minutes.

### 1. Souscrire à AI Services (1 million de crédits offerts)

**[infomaniak.com/fr/hebergement/ai-services](https://www.infomaniak.com/fr/hebergement/ai-services)**

### 2. Créer votre clé API (token)

1. Ouvrez la **[gestion des tokens](https://manager.infomaniak.com/v3/ng/profile/user/token/list)** dans le Manager Infomaniak.
2. Cliquez sur **« Créer un token »**.
3. Sélectionnez le **produit / application** (AI) et la **durée de validité**.

### 3. Récupérer l'identifiant du produit (`product_id`)

C'est un simple nombre (ex. `12345`). La méthode officielle est un appel à l'API avec le jeton créé à l'étape 2 :

```sh
curl -H "Authorization: Bearer VOTRE_JETON" https://api.infomaniak.com/1/ai
```

Le champ **`product_id`** de la réponse (dans `data`) est la valeur à reporter. ([Documentation `GET /1/ai`](https://developer.infomaniak.com/docs/api/get/1/ai))

### 4. Renseigner l'extension

Ouvrez les **Préférences** de l'extension (voir ci-dessous) et saisissez l'**identifiant du produit** puis le **jeton API**. C'est tout : l'URL de l'API est construite automatiquement.

Ces deux valeurs restent dans `storage.local`, **local à votre profil navigateur** — elles ne transitent que vers `api.infomaniak.com`, pour vos propres requêtes.

## Configuration

Préférences (`about:addons` / `brave://extensions` → Sovereign AI Panel → Préférences) :

- **Langue de l'interface** : Automatique (langue du navigateur), Français ou English
- **Identifiant du produit AI Services** : le numéro de votre produit (Manager Infomaniak, ex. `12345`) ; l'URL de l'API est construite automatiquement à partir de ce numéro
- **Jeton API** : jeton Bearer Infomaniak AI Tools
- **Modèle** : ex. `Qwen/Qwen3.5-122B-A10B-FP8`
- **Taille max.** du contenu de page envoyé (24 000 caractères par défaut)

## Confidentialité

Aucune donnée n'est envoyée au développeur ni à un tiers : vos requêtes vont directement de votre navigateur à Infomaniak, avec votre propre jeton. Détails : [politique de confidentialité](PRIVACY.md).
