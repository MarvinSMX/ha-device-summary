# Tasks – ha-device-summary

## Erledigt

- [x] Anforderung geklärt: HA-Card, Statuszusammenfassung mehrerer Geräte (Fenster), Bezug zu **Floors** und **Areas**, kompakt, **Mushroom UI**.
- [x] Offizielle Template-API geprüft: `floors()`, `floor_name()`, `floor_areas()`, `area_entities()`, `floor_entities()`, `areas()`, `area_name()`, `reject('is_hidden_entity')` (siehe [Home Assistant Templating – Floors](https://www.home-assistant.io/docs/configuration/templating/)).
- [x] Lovelace-YAML erstellt: `lovelace/mushroom-fenster-status-nach-stockwerk.yaml` (Mushroom-Variante).
- [x] **HACS-Repository:** Echte Lovelace-**Dashboard**-Erweiterung (JS) gemäß [HACS Plugin-Anforderungen](https://hacs.xyz/docs/publish/plugin): `dist/ha-device-summary.js` (Dateiname = Repo-Name), `hacs.json`, `README.md`.
- [x] Implementierung: `src/ha-device-summary.js` (Lit 3), Build via `esbuild` → `npm run build`.
- [x] Beispiel-YAML: `lovelace/ha-device-summary-example.yaml` (`type: custom:ha-device-summary`).

## Offen / optional (nächste Schritte)

- [ ] Repo auf **GitHub** anlegen und in HACS als **benutzerdefiniertes Repository** (Kategorie **Dashboard**) hinzufügen; ggf. **Release**-Tags nutzen (HACS bevorzugt sonst Default-Branch).
- [ ] Optional: **Visueller Editor** (`getConfigElement`) für die Card.
- [ ] Optional: GitHub Action baut `dist/` bei jedem Push.
- [ ] Mushroom-Variante weiter pflegen oder dokumentieren als Alternative ohne eigenes Plugin.

## Hinweise

- **HACS** erwartet ein **JavaScript-Modul**; reine YAML-Karten sind kein HACS-Plugin – daher die eigene Card `custom:ha-device-summary`.
- GitHub-**Repository-Name** sollte **`ha-device-summary`** heißen (oder `lovelace-ha-device-summary` mit Datei `ha-device-summary.js`, siehe HACS-Doku).
- DasyUI/Coss betrifft React-Apps; hier nicht verwendet.

## Installation für Nutzer (HACS)

1. HACS → **Benutzerdefinierte Repositories** → URL dieses GitHub-Repos, Typ **Dashboard**.
2. Unter **Frontend** „HA Device Summary“ installieren.
3. Im Dashboard: `type: custom:ha-device-summary` (siehe `README.md` und `lovelace/ha-device-summary-example.yaml`).

## Entwicklung

```bash
npm install
npm run build
```

Geänderte `src/` → danach `dist/ha-device-summary.js` neu bauen und committen (oder Release-Asset).

## Alternative: nur Mushroom (ohne diese JS-Card)

1. Mushroom über HACS installieren.
2. YAML aus `lovelace/mushroom-fenster-status-nach-stockwerk.yaml` verwenden (`custom:mushroom-template-card`).
