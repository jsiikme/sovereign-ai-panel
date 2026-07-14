# Store listing — Sovereign AI Panel

Copy-paste material for addons.mozilla.org (AMO) and the Chrome Web Store (CWS).
Screenshots: `store/screenshots/*.png` (1280×800, ready for CWS/AMO).
Privacy policy URL: https://github.com/jsiikme/sovereign-ai-panel/blob/main/PRIVACY.md

---

## Name
Sovereign AI Panel

## Category
Productivity

## Short summary (≤ 132 chars, for CWS)

**EN:** Summarize, translate and explain any web page with Infomaniak's EU-hosted AI — your own key, your data stays in Europe.

**FR:** Résumez, traduisez et expliquez n'importe quelle page avec l'IA d'Infomaniak — votre clé, vos données restent en Europe.

## Single-purpose description (CWS requires one)

Provide an on-page AI assistant panel to summarize, translate, extract key points
and explain the content of the page you are viewing, using your own Infomaniak AI
Services account.

---

## Detailed description — English

Sovereign AI Panel adds a floating assistant to any web page, powered by
**your own Infomaniak AI Services account**. Unlike most AI assistants, your
page content is processed in **Europe (Switzerland)** and **never reaches the
developer** — requests go straight from your browser to Infomaniak, with your
own API token.

**What it does, on any page (toolbar button, right-click, or Alt+Shift+E):**
• Summarize the page or a selection
• Extract the key points
• Look up / explain a term in context
• Translate the page or a selection
• Ask a free-form question, with per-page conversation memory

**Privacy by design:**
• Your API token and product ID stay in your browser; nothing is sent to the developer.
• The API endpoint is built in code and locked to api.infomaniak.com — the token
  can't reach any other domain.
• No analytics, no telemetry, no third-party server.
• The content script is injected only when you use the extension, not on every site.

**You need:** an Infomaniak AI Services account (1 million free tokens on sign-up).
Enter your product ID and API token once in the preferences.

Unofficial project, not affiliated with Infomaniak. "Euria" is Infomaniak's own AI
assistant; this extension simply works with the Infomaniak AI Services API.

---

## Detailed description — Français

Sovereign AI Panel ajoute un assistant flottant à n'importe quelle page web,
propulsé par **votre propre compte Infomaniak AI Services**. Contrairement à la
plupart des assistants IA, le contenu de vos pages est traité en **Europe
(Suisse)** et **n'atteint jamais le développeur** — les requêtes vont directement
de votre navigateur à Infomaniak, avec votre propre jeton.

**Sur n'importe quelle page (bouton, clic droit, ou Alt+Maj+E) :**
• Résumer la page ou une sélection
• Extraire les points clés
• Rechercher / expliquer un terme en contexte
• Traduire la page ou une sélection
• Poser une question libre, avec mémoire de conversation par page

**Confidentialité par conception :**
• Votre jeton et votre identifiant de produit restent dans votre navigateur ; rien n'est envoyé au développeur.
• L'URL de l'API est construite par le code et verrouillée sur api.infomaniak.com — le jeton ne peut atteindre aucun autre domaine.
• Aucun analytics, aucune télémétrie, aucun serveur tiers.
• Le script n'est injecté que lorsque vous utilisez l'extension, pas sur tous les sites.

**Nécessite :** un compte Infomaniak AI Services (1 million de tokens offerts à
l'inscription). Renseignez votre identifiant de produit et votre jeton une fois
dans les préférences.

Projet non officiel, non affilié à Infomaniak. « Euria » est l'assistant IA
d'Infomaniak ; cette extension utilise simplement l'API Infomaniak AI Services.

---

## Permission justifications (for the CWS "Privacy practices" tab)

| Permission | Why it is needed |
|---|---|
| `storage` | Save your settings (product ID, token, model, page-size limit) and the per-page conversation cache locally in your browser. |
| `contextMenus` | Add the right-click actions (summarize / key points / translate / look up a term). |
| `activeTab` + `scripting` | Inject the assistant panel into the current tab **only when you invoke the extension** — not preloaded on every site. |
| `host_permissions: https://api.infomaniak.com/*` | Send your requests to the Infomaniak AI Services API. This is the only host the extension contacts. |

## Data usage disclosure (CWS / AMO)

- The extension transmits **website content** (the visible text, title and URL of
  the current page) and your typed prompts **to the Infomaniak AI Services API**,
  and **only** when you explicitly trigger an action.
- It does **not** collect, receive or transmit any data to the developer or any
  third party. No analytics, no tracking.
- Data is authenticated and processed under the user's own Infomaniak account.
- Full details: PRIVACY.md.
