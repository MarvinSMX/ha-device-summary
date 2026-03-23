# Tasks – ha-device-summary

## Erledigt

- [x] Anforderung geklärt: HA-Card, Statuszusammenfassung mehrerer Geräte (Fenster), Bezug zu **Floors** und **Areas**, kompakt, **Mushroom UI**.
- [x] Offizielle Template-API geprüft: `floors()`, `floor_name()`, `floor_areas()`, `area_entities()`, `floor_entities()`, `areas()`, `area_name()`, `reject('is_hidden_entity')` (siehe [Home Assistant Templating – Floors](https://www.home-assistant.io/docs/configuration/templating/)).
- [x] Lovelace-YAML erstellt: `lovelace/mushroom-fenster-status-nach-stockwerk.yaml` (Mushroom-Variante).
- [x] **HACS-Repository:** Lovelace-Frontend wie Hikvision-Beispiele: `hacs.json` mit **`content_in_root: true`**, nur **`ha-device-summary.js` im Repo-Root** (kein `dist/` im Git — HACS priorisiert `dist/` und ignoriert sonst die Root-Datei).
- [x] Implementierung: `src/ha-device-summary.js` (Lit 3), Build via `esbuild` → `npm run build`.
- [x] Beispiel-YAML: `lovelace/ha-device-summary-example.yaml` (`type: custom:ha-device-summary`).
- [x] Darstellung: `group_by` floor | area | both; `show_devices` mit **Badges** (aktiver Zustand hervorgehoben, Klick → more-info); `active_states`, `count_label`, `truncate_entity` / Alias `truncate_areas`.
- [x] UI: kompakter **Mushroom-Stil** (Chips, weiche Flächen); Badges **breite = Text** (`width: max-content`, Zeilenumbruch im Label); **Spalten-Umbruch** (`flex-flow: column wrap`) + `--ha-ds-badge-max-h`; bei einer Sektion volle Resthöhe der Karte.
- [x] Installations-Fix für HACS: `hacs.json` ohne harte `homeassistant`-Mindestversion; Anleitung an `card-repo` / `card-overview-repo` angeglichen (`content_in_root`, Kategorie **Lovelace/Frontend**); Bundle ohne `export` (reines Modul-Side-Effect wie die Beispiele).

## Offen / optional (nächste Schritte)

- [ ] Repo auf **GitHub** anlegen und in HACS als **benutzerdefiniertes Repository** (Kategorie **Dashboard**) hinzufügen; ggf. **Release**-Tags nutzen (HACS bevorzugt sonst Default-Branch).
- [ ] Optional: **Visueller Editor** (`getConfigElement`) für die Card.
- [ ] Optional: GitHub Action baut `ha-device-summary.js` bei jedem Push.
- [ ] Mushroom-Variante weiter pflegen oder dokumentieren als Alternative ohne eigenes Plugin.

## Hinweise

- **HACS** erwartet ein **JavaScript-Modul**; reine YAML-Karten sind kein HACS-Plugin – daher die eigene Card `custom:ha-device-summary`.
- GitHub-**Repository-Name** sollte **`ha-device-summary`** heißen (oder `lovelace-ha-device-summary` mit Datei `ha-device-summary.js`, siehe HACS-Doku).
- DasyUI/Coss betrifft React-Apps; hier nicht verwendet.

## Installation für Nutzer (HACS)

1. HACS → **Benutzerdefinierte Repositories** → URL dieses GitHub-Repos, Typ **Dashboard**.
2. Unter **Frontend** „HA Device Summary“ installieren.
3. Im Dashboard: `type: custom:ha-device-summary` (siehe `README.md` und `lovelace/ha-device-summary-example.yaml`).
4. Bei Problemen: HACS neu laden / HA neu starten und prüfen, dass Ressource `/hacsfiles/ha-device-summary/ha-device-summary.js` als Modul vorhanden ist.

## Entwicklung

```bash
npm install
npm run build
```

Geänderte `src/` → `npm run build` → `ha-device-summary.js` im Root committen.

## Alternative: nur Mushroom (ohne diese JS-Card)

1. Mushroom über HACS installieren.
2. YAML aus `lovelace/mushroom-fenster-status-nach-stockwerk.yaml` verwenden (`custom:mushroom-template-card`).
