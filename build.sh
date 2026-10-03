#!/bin/sh
# Construit les paquets dans dist/ (contenu identique, un seul manifest hybride) :
#   dist/firefox — à charger dans Firefox (about:debugging → manifest.json)
#   dist/brave   — à charger dans Brave/Chromium (chrome://extensions)
# Le manifest est hybride : Chromium utilise background.service_worker, Firefox
# background.scripts ; icônes PNG dans les deux (SVG non supporté par Chromium).
set -e
cd "$(dirname "$0")"

rm -rf dist
SHARED="defaults.js background.js content.js options.html options.js manifest.json"

mkdir -p dist/firefox/icons dist/brave/icons
cp $SHARED dist/firefox/
cp $SHARED dist/brave/
cp icons/icon-48.png icons/icon-128.png dist/firefox/icons/
cp icons/icon-48.png icons/icon-128.png dist/brave/icons/

echo "OK :"
echo "  dist/firefox — about:debugging → Charger un module temporaire → manifest.json"
echo "  dist/brave   — brave://extensions → Mode développeur → Charger l'extension non empaquetée"
