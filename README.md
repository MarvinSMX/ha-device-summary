# HA Device Summary

Lovelace Custom Card für Home Assistant.

Diese Version enthält **nur eine Component** (`custom:ha-device-summary`),
die als **Inner Group Card** gedacht ist. Du kombinierst mehrere Instanzen
manuell in deinem Dashboard-Grid/Stack.

## Installation mit HACS

1. [HACS](https://hacs.xyz/) ist eingerichtet.
2. HACS → Frontend → benutzerdefiniertes Repository hinzufügen:
   `https://github.com/MarvinSMX/ha-device-summary`
3. Installieren, HA neu laden, Browser mit `Strg+Shift+R` aktualisieren.

## Konfiguration

```yaml
type: custom:ha-device-summary
title: EG + Zwischenbau
subtitle: 3/10 offen
active_states: ["on"]
entities:
  - binary_sensor.fenster_wohnzimmer
  - binary_sensor.fenster_kueche
  - binary_sensor.fenster_bad
```

### Felder

- `title` (optional): Überschrift
- `subtitle` (optional): Zusatztext rechts im Header
- `active_states` (optional): Liste aktiver States, Standard `['on']`
- `entities` (**pflicht**): Liste der Entitäten für die Gruppe

## Hinweise

- Die frühere automatische Sammel-Logik (Floors/Areas) wurde entfernt.
- Du baust dein Layout jetzt komplett selbst über mehrere Karteninstanzen.
