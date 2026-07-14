/* Préférences — defaults.js est chargé avant ce fichier (options.html).
 * L'utilisateur saisit son identifiant de produit AI Services (un nombre) ;
 * l'URL complète est construite par le code. Un champ vidé revient à sa valeur
 * par défaut (rien n'est stocké en vide, pour ne pas masquer les défauts).
 */

const FIELDS = ["productId", "apiToken", "model", "maxPageChars"];

// Localise l'interface selon la langue du navigateur (voir defaults.js).
function localize() {
  document.documentElement.lang = EURIA_LANG();
  document.title = EURIA_T("optTitle");
  const map = {
    "t-title": "optTitle", "t-language": "optLanguage", "t-langAuto": "optLangAuto",
    "t-productId": "optProductId", "t-apiToken": "optApiToken",
    "t-hint": "optHint", "t-productHint": "optProductHint", "t-model": "optModel", "t-maxPageChars": "optMaxChars", "save": "optSave"
  };
  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (el) el.textContent = EURIA_T(key);
  }
}

function setStatus(text, isError) {
  const status = document.getElementById("status");
  status.textContent = text;
  status.className = isError ? "error" : "";
  if (!isError) setTimeout(() => (status.textContent = ""), 2000);
}

async function load() {
  const values = await browser.storage.local.get(EURIA_DEFAULTS);
  for (const key of FIELDS) {
    document.getElementById(key).value = values[key];
  }
  document.getElementById("uiLang").value = values.uiLang || "auto";
  EURIA_SET_UI_LANG(values.uiLang);   // applique la langue choisie…
  localize();                          // …et (re)localise la page d'options
}

async function save() {
  const values = {};
  for (const key of FIELDS) {
    const el = document.getElementById(key);
    values[key] = el.type === "number" ? Number(el.value) : el.value.trim();
  }

  // Champ vide → retour au défaut (sauf jeton et identifiant, qui peuvent être
  // vides ; le runtime invite alors à les renseigner).
  if (!values.model) values.model = EURIA_DEFAULTS.model;
  if (!(values.maxPageChars > 0)) values.maxPageChars = EURIA_DEFAULTS.maxPageChars;

  // L'identifiant de produit est un nombre (ex. 12345).
  if (values.productId && !/^\d+$/.test(values.productId)) {
    setStatus(EURIA_T("optProductInvalid"), true);
    return;
  }

  const sel = document.getElementById("uiLang").value;
  values.uiLang = (sel === "fr" || sel === "en") ? sel : "auto";

  await browser.storage.local.set(values);
  await load(); // réaffiche + re-localise dans la nouvelle langue
  setStatus(EURIA_T("optSaved"), false);
}

document.getElementById("save").addEventListener("click", save);
load(); // load() applique la langue puis localise
