# HA Device Summary

Lovelace-Karte für Home Assistant: **kompakte Geräteübersicht nach Stockwerk und Bereich** (Floors & Areas), optisch an Mushroom angelehnt (Icon + Primary/Secondary).

## Installation mit HACS

1. [HACS](https://hacs.xyz/) ist eingerichtet.
2. **HACS** öffnen → **⋮** (oben rechts) → **Benutzerdefinierte Repositories**.
3. Repository-URL dieses Git-Projekts eintragen, Kategorie **Dashboard** (ehemals „Plugin“) wählen → **Hinzufügen**.
4. Unter **HACS → Frontend** das neue Repository **„HA Device Summary“** öffnen → **Herunterladen**.
5. Browser-Cache leeren oder **Strg+F5**; ggf. Home Assistant neu starten.

Die Ressource zeigt typischerweise auf  
`/hacsfiles/ha-device-summary/dist/ha-device-summary.js` (Typ **JavaScript-Modul**).

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

Ausgabe: `dist/ha-device-summary.js` (für HACS; bitte nach Änderungen committen oder Release bauen).

## Alternative: Mushroom Template Card

Wenn du **Mushroom** (separat über HACS) nutzt, gibt es weiterhin die YAML-Vorlage unter  
`lovelace/mushroom-fenster-status-nach-stockwerk.yaml` (`custom:mushroom-template-card`).
