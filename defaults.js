/* Euria Everywhere — valeurs par défaut partagées.
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

var EURIA_DEFAULTS = {
  apiUrl: "https://api.infomaniak.com/2/ai/YOUR_PRODUCT_ID/openai/v1/chat/completions",
  apiToken: "",
  model: "Qwen/Qwen3.5-122B-A10B-FP8",
  maxPageChars: 24000,
  lastLang: "fr"
};

/* Seul domaine autorisé pour l'API : le jeton ne doit jamais partir ailleurs. */
var EURIA_API_ORIGIN = "https://api.infomaniak.com/";
