# HA Device Summary

Eine Gruppen-Card, die Entitäten direkt aus **Home Assistant Stockwerken (Floors)** laden kann.

## Installation mit HACS

1. HACS → Frontend → Repository `https://github.com/MarvinSMX/ha-device-summary`
2. Installieren, HA neu laden, Browser Hard-Reload (`Strg+Shift+R`)

## Konfiguration

### A) Automatisch aus HA-Stockwerken (empfohlen)

```yaml
type: custom:ha-device-summary
title: EG + Zwischenbau
floor_ids: [erdgeschoss, zwischenbau]
entity_domain: binary_sensor
device_classes: [window]
active_states: ["on"]
use_native_rows: true
```

### B) Manuelle Entitätenliste (übersteuert floor_ids)

```yaml
type: custom:ha-device-summary
title: EG + Zwischenbau
entities:
  - binary_sensor.fenster_wohnzimmer
  - binary_sensor.fenster_kueche
active_states: ["on"]
use_native_rows: false
```

## Optionen

- `floor_ids`: Liste nativer HA-Floor-IDs
- `entity_domain`: Domain-Filter (z. B. `binary_sensor`)
- `device_classes`: Device-Class-Filter (z. B. `[window]`)
- `entities`: optionale manuelle Liste (hat Vorrang)
- `active_states`: Zustände für aktive Markierung (default `['on']`)
- `use_native_rows`: `true` = `hui-simple-entity-row`, `false` = Badge-Liste
- `subtitle`: optional; wenn leer, wird automatisch `aktiv/gesamt offen` angezeigt
