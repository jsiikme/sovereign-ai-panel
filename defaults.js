/* Sovereign AI Panel — valeurs par défaut partagées.
 * Chargé avant background.js (manifest), content.js (executeScript) et
 * options.js (options.html) : une seule source de vérité pour les défauts.
 * Les défauts ne sont JAMAIS écrits dans storage.local : ils ne s'appliquent
 * qu'en lecture (storage.local.get(defaults)), pour que les mises à jour de
 * l'extension puissent les faire évoluer.
 */

/* Chromium (Brave, Chrome…) expose chrome.* ; on aligne sur l'API promise
 * browser.* utilisée partout (chrome.* renvoie des promesses en MV3). */
if (typeof browser === "undefined") {
  globalThis.browser = chrome;
}

/* L'utilisateur ne saisit que l'identifiant de SON produit AI Services (un
 * nombre, ex. 12345) ; l'URL complète est construite à partir d'un gabarit
 * figé. Aucune ID de compte réelle n'est embarquée dans le code. */
var EURIA_DEFAULTS = {
  productId: "",
  apiToken: "",
  model: "Qwen/Qwen3.5-122B-A10B-FP8",
  maxPageChars: 24000,
  lastLang: "fr",
  uiLang: "auto"   // "auto" (langue du navigateur), "fr" ou "en"
};

/* Seul domaine autorisé (le jeton ne peut partir qu'ici) + construction de
 * l'URL. encodeURIComponent empêche toute évasion de chemin via l'identifiant. */
var EURIA_API_ORIGIN = "https://api.infomaniak.com/";
function EURIA_API_URL(productId) {
  return "https://api.infomaniak.com/2/ai/" + encodeURIComponent(productId) + "/openai/v1/chat/completions";
}

/* ---------- i18n ----------
 * Langue = préférence utilisateur (uiLang) si "fr"/"en", sinon bascule
 * automatique sur la langue du navigateur. Partagé par les 3 contextes.
 * EURIA_UI_LANG est un cache synchrone alimenté depuis storage au démarrage
 * (voir EURIA_SET_UI_LANG) — EURIA_LANG() doit rester synchrone. */
var EURIA_UI_LANG = "";  // "" = auto ; "fr" / "en" = forcé
function EURIA_SET_UI_LANG(v) {
  EURIA_UI_LANG = (v === "fr" || v === "en") ? v : "";
}
function EURIA_LANG() {
  if (EURIA_UI_LANG === "fr" || EURIA_UI_LANG === "en") return EURIA_UI_LANG;
  var l = "en";
  try {
    l = (browser.i18n && browser.i18n.getUILanguage && browser.i18n.getUILanguage())
      || (typeof navigator !== "undefined" && navigator.language) || "en";
  } catch (e) { /* contexte sans i18n */ }
  return String(l).toLowerCase().indexOf("fr") === 0 ? "fr" : "en";
}

var EURIA_STRINGS = {
  fr: {
    // Menus contextuels + bouton barre d'outils
    menuRoot: "Sovereign AI",
    menuSummarizePage: "Résumer la page",
    menuKeypoints: "Extraire les points clés",
    menuTranslatePage: "Traduire la page",
    menuSummarizeSel: "Résumer la sélection",
    menuTermSel: "Rechercher « %s »",
    menuTranslateSel: "Traduire la sélection",
    actionTitle: "Sovereign AI — assistant IA",
    // Erreurs (arrière-plan)
    errNoToken: "Aucun jeton API configuré. La page de préférences vient de s'ouvrir : collez-y votre jeton Infomaniak AI Tools.",
    errNoProductId: "Configurez l'identifiant de votre produit AI Services dans les préférences.",
    errNoPermission: "Permission manquante pour api.infomaniak.com. Ouvrez about:addons → Sovereign AI Panel → Permissions et autorisez l'accès à api.infomaniak.com.",
    // Panneau
    hello: "Bonjour,",
    help: "Comment puis-je vous aider ?",
    suggSummarize: "Résumer",
    suggKeypoints: "Extraire les points clés",
    suggTerm: "Rechercher un terme",
    suggTranslate: "Traduire",
    placeholder: "Posez votre question ici",
    placeholderTerm: "Entrez le terme à rechercher…",
    disclaimer: "L'IA peut se tromper. Vérifiez en cas de doute.",
    poweredBy: "Propulsé par",
    headerHint: "Glisser pour déplacer · double-clic pour réinitialiser la position",
    thinking: "L'assistant réfléchit",
    reasoning: "Raisonnement",
    copy: "Copier",
    copied: "Copié ✓",
    retry: "Réessayer",
    emptyResp: "(réponse vide)",
    stoppedResp: "(interrompu)",
    interrupted: "interrompu",
    busy: "Une réponse est déjà en cours…",
    aExpand: "Agrandir",
    aReset: "Nouvelle conversation",
    aResetShort: "Nouveau",
    aClose: "Fermer",
    aInput: "Votre question",
    aSend: "Envoyer",
    aStop: "Arrêter",
    dialogLabel: "Sovereign AI — assistant IA",
    tokens: "tokens",
    selectionSuffix: " (sélection)",
    translateIn: " en %s",
    labelSep: " : ",
    // Étiquettes d'action (bulle utilisateur)
    actSummarize: "Résumer",
    actKeypoints: "Extraire les points clés",
    actTranslate: "Traduire",
    actTerm: "Rechercher un terme",
    // Messages transitoires
    retrying: "Serveur occupé (HTTP %s), nouvelle tentative %a/2…",
    errDisconnect: "Connexion au processus d'arrière-plan perdue (extension rechargée ?). Réessayez.",
    // Préférences
    optTitle: "Sovereign AI Panel — Préférences",
    optProductId: "Identifiant du produit AI Services",
    optApiToken: "Jeton API (Bearer)",
    optHint: "Jeton Infomaniak AI Tools. Ne partagez jamais ce jeton.",
    optModel: "Modèle",
    optMaxChars: "Taille max. du contenu de page envoyé (caractères)",
    optSave: "Enregistrer",
    optSaved: "Enregistré ✓",
    optProductHint: "Le numéro de votre produit AI Services, visible dans le Manager Infomaniak (ex. 12345).",
    optProductInvalid: "Identifiant invalide : uniquement des chiffres (ex. 12345).",
    optLanguage: "Langue de l'interface",
    optLangAuto: "Automatique (langue du navigateur)"
  },
  en: {
    menuRoot: "Sovereign AI",
    menuSummarizePage: "Summarize page",
    menuKeypoints: "Extract key points",
    menuTranslatePage: "Translate page",
    menuSummarizeSel: "Summarize selection",
    menuTermSel: "Look up “%s”",
    menuTranslateSel: "Translate selection",
    actionTitle: "Sovereign AI — AI assistant",
    errNoToken: "No API token configured. The preferences page just opened: paste your Infomaniak AI Tools token there.",
    errNoProductId: "Configure your AI Services product ID in the preferences.",
    errNoPermission: "Missing permission for api.infomaniak.com. Open about:addons → Sovereign AI Panel → Permissions and allow access to api.infomaniak.com.",
    hello: "Hello,",
    help: "How can I help you?",
    suggSummarize: "Summarize",
    suggKeypoints: "Extract key points",
    suggTerm: "Look up a term",
    suggTranslate: "Translate",
    placeholder: "Ask your question here",
    placeholderTerm: "Enter the term to look up…",
    disclaimer: "AI can make mistakes. Double-check when in doubt.",
    poweredBy: "Powered by",
    headerHint: "Drag to move · double-click to reset position",
    thinking: "The assistant is thinking",
    reasoning: "Reasoning",
    copy: "Copy",
    copied: "Copied ✓",
    retry: "Retry",
    emptyResp: "(empty response)",
    stoppedResp: "(stopped)",
    interrupted: "stopped",
    busy: "A response is already in progress…",
    aExpand: "Expand",
    aReset: "New conversation",
    aResetShort: "New",
    aClose: "Close",
    aInput: "Your question",
    aSend: "Send",
    aStop: "Stop",
    dialogLabel: "Sovereign AI — AI assistant",
    tokens: "tokens",
    selectionSuffix: " (selection)",
    translateIn: " to %s",
    labelSep: ": ",
    actSummarize: "Summarize",
    actKeypoints: "Extract key points",
    actTranslate: "Translate",
    actTerm: "Look up a term",
    retrying: "Server busy (HTTP %s), retrying %a/2…",
    errDisconnect: "Lost connection to the background process (extension reloaded?). Please retry.",
    optTitle: "Sovereign AI Panel — Preferences",
    optProductId: "AI Services product ID",
    optApiToken: "API token (Bearer)",
    optHint: "Infomaniak AI Tools token. Never share this token.",
    optModel: "Model",
    optMaxChars: "Max size of page content sent (characters)",
    optSave: "Save",
    optSaved: "Saved ✓",
    optProductHint: "Your AI Services product number, shown in the Infomaniak Manager (e.g. 12345).",
    optProductInvalid: "Invalid ID: digits only (e.g. 12345).",
    optLanguage: "Interface language",
    optLangAuto: "Automatic (browser language)"
  }
};

function EURIA_T(key) {
  var lang = EURIA_LANG();
  return (EURIA_STRINGS[lang] && EURIA_STRINGS[lang][key]) || EURIA_STRINGS.en[key] || key;
}
