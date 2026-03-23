# Tasks – ha-device-summary

## Erledigt

- [x] Anforderung geklärt: HA-Card, Statuszusammenfassung mehrerer Geräte (Fenster), Bezug zu **Floors** und **Areas**, kompakt, **Mushroom UI**.
- [x] Offizielle Template-API geprüft: `floors()`, `floor_name()`, `floor_areas()`, `area_entities()`, `floor_entities()`, `areas()`, `area_name()`, `reject('is_hidden_entity')` (siehe [Home Assistant Templating – Floors](https://www.home-assistant.io/docs/configuration/templating/)).
- [x] Lovelace-YAML erstellt: `lovelace/mushroom-fenster-status-nach-stockwerk.yaml` (Mushroom-Variante).
- [x] **HACS-Repository:** Lovelace-Frontend wie Hikvision-Beispiele: `hacs.json` mit **`content_in_root: true`**, nur **`ha-device-summary.js` im Repo-Root** (kein `dist/` im Git — HACS priorisiert `dist/` und ignoriert sonst die Root-Datei).
- [x] Implementierung: `src/ha-device-summary.js` (Lit 3), Build via `esbuild` → `npm run build`.
- [x] Beispiel-YAML: `lovelace/ha-device-summary-example.yaml` (`type: custom:ha-device-summary`).
- [x] Darstellung: `group_by` floor | area | both; `show_devices` mit **Badges** (aktiver Zustand hervorgehoben, Klick → more-info); `active_states`, `count_label`, `truncate_entity` / Alias `truncate_areas`.
- [x] UI: kompakter **Mushroom-Stil**; Badges **breite = Text**; **Zeilen-Umbruch in die Breite** (`flex-direction: row` + `wrap`); Karte `height: auto` (kein Stretch in extrem hohe Zellen).
- [x] Keine **Gruppierungs-Container** mehr (kein extra Rahmen/Hintergrund pro Stockwerk — nur Abstand zwischen Gruppen).
- [x] Badge-Layout: **Grid max. 2 Reihen × Y Spalten** (`grid-template-rows` + `grid-auto-flow: column`), horizontal scrollbar; optional `--ha-ds-badge-rows`.
- [x] Gruppen-Layout: ebenfalls **Grid max. 2 Reihen × Y Spalten** (`--ha-ds-group-rows: 2`), Card wächst in Breite (`width: max-content`) statt zusätzliche Gruppen untereinander.
- [x] HA-Doku-konform: `getGridOptions()` implementiert; `card_columns` steuert echte Sections-Breite (`columns = card_columns * 3`).
- [x] Visueller Editor: `static getConfigForm()` ergänzt (HA built-in form), inkl. `card_columns` und `card_rows`; `card_rows` steuert jetzt `getGridOptions().rows`.
- [x] **Komplett-Redesign** auf HA-default-kompatibles Card-Layout: keine benutzerdefinierten Breiten-/Grid-Overrides mehr (`card_columns`, `card_rows` entfernt), `getGridOptions()` auf HA-Defaults (columns=6, rows aus `getCardSize`), `ha-card`/`card-content`-Struktur vereinfacht.
- [x] Default-Breite dynamisch gemacht: `getGridOptions().columns` wird anhand Inhalt automatisch auf 3/6/9/12 gesetzt (mehr Gruppen/Badges => breiter).
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

- [x] Layout-Fix: Card strikt auf HA-Zellbreite begrenzt (max-width: 100%, overflow: hidden, min-width: 0 in allen Ebenen), damit Inhalt nicht aus dem Dashboard-Layout herausragt.

- [x] Height-Fix: konservativere getCardSize()-Schätzung (Badges /3 statt /5) + interne Vertical-Scrollfläche bei fixen Sections-Rows (.sections { overflow: auto; }), damit nichts abgeschnitten wird.

- [x] Gebäudefilter ergänzt: uilding (Text-Match) und uilding_floor_ids (explizite Floor-ID-Liste, empfohlen). Filter wirkt auf Floors/Areas/Entities konsistent.

- [x] Stockwerk-Filter auf native HA-Floors umgestellt: loor_ids (Floor-ID-Liste) ersetzt Building-Heuristik.
