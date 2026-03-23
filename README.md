# HA Device Summary

Lovelace-Karte für Home Assistant: **kompakte Geräteübersicht nach Stockwerk und Bereich** (Floors & Areas), optisch an Mushroom angelehnt (Icon + Primary/Secondary).

## Installation mit HACS

Gleiches Muster wie z. B. [hikvision-access-card](https://github.com/MarvinSMX/hikvision-access-card): **nur** `hacs.json` + **`ha-device-summary.js` im Repository-Root** (kein `dist/`-Ordner im Git — HACS sucht sonst zuerst `dist/` und kann danebenliegende Root-Dateien ignorieren).

1. [HACS](https://hacs.xyz/) ist eingerichtet.
2. **HACS** → **Frontend** → **Eigene Repositories** / **⋮** → benutzerdefiniertes Repository hinzufügen.
3. URL: `https://github.com/MarvinSMX/ha-device-summary`  
   Kategorie: **Lovelace** (ältere HACS-Oberfläche) **oder** **Dashboard** / **Frontend** (neuere Bezeichnung) — **nicht** „Integration“ oder „Template“.
4. Unter **Frontend** das Repository **„HA Device Summary“** öffnen → **Herunterladen** / **Installieren**.
5. **Home Assistant neu laden** (Entwicklerwerkzeuge → YAML → Neustart oder kompletter HA-Neustart), danach Browser **Strg+Shift+R**.

Die Lovelace-Ressource zeigt typischerweise auf  
`/hacsfiles/ha-device-summary/ha-device-summary.js` (Typ **JavaScript-Modul**).

### Wenn es weiterhin scheitert

- Repository in HACS **entfernen** und mit derselben URL + Kategorie **Lovelace/Frontend** erneut hinzufügen.
- In HACS auf **Neu laden / Aktualisieren** gehen, damit das Manifest neu gezogen wird.
- Prüfen, ob die Datei im GitHub-Repo im **main**-Branch sichtbar ist: `ha-device-summary.js` und `hacs.json` im **Root**.

## Konfiguration

Minimal:

```yaml
type: custom:ha-device-summary
```

Optional:

```yaml
type: custom:ha-device-summary
title: Fenster & Türen
device_classes:
  - window
  - door
truncate_areas: 12
unassigned_label: Ohne Stockwerk
```

- **device_classes**: `binary_sensor`-`device_class`-Werte (Standard: nur `window`).
- **truncate_areas**: max. Zeichen pro Bereichsname in der zweiten Zeile.
- **unassigned_label**: Überschrift für Bereiche **ohne** zugewiesenes Stockwerk.

## Voraussetzungen

- Home Assistant **2024.7+** (empfohlen; nutzt Floor-/Area-Registry im Frontend).
- Bereiche den Stockwerken zuordnen; Geräte den Bereichen zuweisen.

## Entwicklung

```bash
npm install
npm run build
```

Ausgabe: **`ha-device-summary.js` im Projektroot** (für HACS committen; `dist/` ist nur lokal und steht in `.gitignore`).

## Alternative: Mushroom Template Card

Wenn du **Mushroom** (separat über HACS) nutzt, gibt es weiterhin die YAML-Vorlage unter  
`lovelace/mushroom-fenster-status-nach-stockwerk.yaml` (`custom:mushroom-template-card`).
