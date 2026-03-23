# HA Device Summary

Lovelace-Karte für Home Assistant: Übersicht nach **Stockwerk**, **Raum** oder **beidem**, mit Zählung für einen konfigurierbaren Zustand (z. B. Fenster **offen**) und optional **Geräte als Badges** (Klick → *Mehr Infos*).

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

### Gruppierung & Darstellung

| Option | Werte | Bedeutung |
|--------|--------|-----------|
| **group_by** | `floor`, `area`, `both` | Nur Stockwerk · nur Raum (flach) · Stockwerk mit Räumen darunter (Standard: `both`) |
| **show_devices** | boolean | `true`: Geräte als **Badges** unter jeder Gruppe; `false`: nur **Zahlen** `aktiv/gesamt` (Standard: `true`) |
| **active_states** | Liste | Zustände, die als „mitgezählt“ gelten (Standard: `on`, z. B. offenes Fenster) |
| **count_label** | Text | Beschriftung in der Zählung (Standard: `offen`) → z. B. `2/5 offen` |
| **device_classes** | Liste | `binary_sensor.device_class` (Standard: `window`) |
| **truncate_entity** | Zahl | Text kürzen ab N Zeichen; **`0` oder weglassen = kein Abschneiden** (Standard). Alias: **truncate_areas** (nur wenn `truncate_entity` fehlt) |
| **unassigned_label** | Text | Block für Bereiche/Geräte **ohne** Stockwerk |
| **no_area_label** | Text | Gruppe für Entitäten **ohne** Bereich |

Beispiele:

```yaml
# Nur pro Stockwerk: eine Zeile + Badges aller Geräte auf diesem Stockwerk
type: custom:ha-device-summary
group_by: floor
show_devices: true

# Nur nach Raum (alle Räume, alphabetisch)
type: custom:ha-device-summary
group_by: area
show_devices: true

# Kompakt ohne Badges
type: custom:ha-device-summary
group_by: both
show_devices: false

# Türen: geschlossen zählen (binary_sensor: „off“ = zu)
type: custom:ha-device-summary
title: Türen
device_classes: [door]
active_states: ["off"]
count_label: geschlossen
```

Für die neue Badge-Darstellung (deutlich sichtbar) nutze mindestens:

```yaml
type: custom:ha-device-summary
group_by: both
show_devices: true
active_states: ["on"]
```

## Styling (Mushroom-nah, kompakt)

Auf der Karte kannst du per Theme / `card_mod` (falls installiert) anpassen:

| CSS-Variable (auf `ha-device-summary`) | Wirkung |
|----------------------------------------|---------|
| `--ha-ds-pad` | Innenabstand der Karte |
| `--ha-ds-gap` | Abstand zwischen Blöcken |
| `--ha-ds-radius` | Ecken der Bereichs-Kacheln |
| `--ha-ds-chip-radius` | Pillen-Radius (Badges, Zähler-Chips) |
| `--ha-ds-badge-max-h` | max. Höhe der Badge-Spalte bei **mehreren** Stockwerks-Blöcken (Spalten-Umbruch nach rechts); Standard `min(42vh, 360px)` |

Bei **nur einem** Stockwerks-Block füllen die Badges die verfügbare Kartenhöhe (`height: 100%` am Host) und brechen bei Platzmangel in weitere Spalten um.

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
