import { LitElement, html, css, nothing } from "lit";

const VERSION = "2.6.0";

function isHidden(hass, entityId) {
  const row = hass?.entities?.[entityId];
  if (!row) return false;
  return Boolean(row.hidden_by);
}

function matchesDevice(hass, entityId, deviceClasses) {
  const st = hass?.states?.[entityId];
  if (!st) return false;
  const domain = entityId.split(".")[0];
  if (domain !== "binary_sensor") return false;
  const dc = st.attributes?.device_class;
  return deviceClasses.includes(dc);
}

function truncate(str, max) {
  if (!str || max <= 0) return str || "";
  if (str.length <= max) return str;
  return `${str.slice(0, Math.max(0, max - 1))}...`;
}

function sortedFloors(hass) {
  const list = Object.values(hass?.floors || {});
  list.sort((a, b) => {
    const la = a.level;
    const lb = b.level;
    if (la != null && lb != null && la !== lb) return la - lb;
    return (a.name || "").localeCompare(b.name || "", undefined, {
      sensitivity: "base",
    });
  });
  return list;
}

function resolveFloorsForFilter(hass, config) {
  const allFloors = sortedFloors(hass);
  const byId = new Map(allFloors.map((f) => [f.floor_id, f]));
  const floorIds = Array.isArray(config.floor_ids)
    ? config.floor_ids.map((x) => String(x).trim()).filter(Boolean)
    : [];
  if (!floorIds.length) return allFloors;
  return floorIds.map((id) => byId.get(id)).filter(Boolean);
}

function areasOnFloor(hass, floorId) {
  return Object.values(hass?.areas || {}).filter((a) => a.floor_id === floorId);
}

function byFriendly(a, b) {
  return (a.friendly || "").localeCompare(b.friendly || "", undefined, {
    sensitivity: "base",
  });
}

function collectEntities(hass, deviceClasses) {
  const out = [];
  for (const entry of Object.values(hass?.entities || {})) {
    const eid = entry.entity_id;
    if (isHidden(hass, eid)) continue;
    if (!matchesDevice(hass, eid, deviceClasses)) continue;
    const st = hass?.states?.[eid];
    const areaId = entry.area_id || null;
    const area = areaId ? hass?.areas?.[areaId] : null;
    const floorId = area?.floor_id || null;
    const floor = floorId ? hass?.floors?.[floorId] : null;
    out.push({
      entity_id: eid,
      state: st?.state ?? "unknown",
      friendly: st?.attributes?.friendly_name || eid,
      area_id: areaId,
      area_name: area?.name || null,
      floor_id: floorId,
      floor_name: floor?.name || null,
    });
  }
  return out;
}

function isActiveState(state, activeStates) {
  return activeStates.includes(state);
}

function countLabel(active, total, labelWord) {
  return `${active}/${total} ${labelWord}`;
}

function buildModel(hass, config) {
  const deviceClasses = Array.isArray(config.device_classes)
    ? config.device_classes
    : ["window"];
  const activeStates = Array.isArray(config.active_states)
    ? config.active_states
    : ["on"];
  const groupBy = config.group_by || "both";
  const showDevices = Boolean(config.show_devices);
  const labelWord = config.count_label || "offen";
  const unassignedFloor = config.unassigned_label || "Ohne Stockwerk";
  const noAreaLabel = config.no_area_label || "Ohne Bereich";
  const maxName = Number(config.truncate_entity) || 0;

  const floors = resolveFloorsForFilter(hass, config);
  const allowedFloorIds = new Set(floors.map((f) => f.floor_id));
  const hasFloorFilter = Array.isArray(config.floor_ids) && config.floor_ids.length > 0;

  const allRaw = collectEntities(hass, deviceClasses);
  const all = hasFloorFilter
    ? allRaw.filter((e) => e.floor_id && allowedFloorIds.has(e.floor_id))
    : allRaw;
  const sumTotal = all.length;
  const sumActive = all.filter((e) => isActiveState(e.state, activeStates)).length;
  const openAny = sumActive > 0;

  const sections = [];

  if (groupBy === "floor") {
    for (const floor of floors) {
      const list = all.filter((e) => e.floor_id === floor.floor_id);
      if (!list.length) continue;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      sections.push({
        kind: "floor",
        title: floor.name || floor.floor_id,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    const noFloor = all.filter((e) => !e.floor_id);
    if (noFloor.length && !hasFloorFilter) {
      const act = noFloor.filter((e) => isActiveState(e.state, activeStates)).length;
      sections.push({
        kind: "floor",
        title: unassignedFloor,
        subtitle: countLabel(act, noFloor.length, labelWord),
        entities: [...noFloor].sort(byFriendly),
        maxName,
      });
    }
    return { sections, sumActive, sumTotal, openAny, showDevices, activeStates };
  }

  if (groupBy === "area") {
    const byArea = new Map();
    for (const e of all) {
      const key = e.area_id || "__none__";
      if (!byArea.has(key)) byArea.set(key, []);
      byArea.get(key).push(e);
    }
    for (const [areaId, list] of byArea) {
      const title = areaId === "__none__" ? noAreaLabel : hass?.areas?.[areaId]?.name || areaId;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      sections.push({
        kind: "area",
        title,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    sections.sort((a, b) => (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" }));
    return { sections, sumActive, sumTotal, openAny, showDevices, activeStates };
  }

  for (const floor of floors) {
    const floorEntities = all.filter((e) => e.floor_id === floor.floor_id);
    if (!floorEntities.length) continue;
    const areas = areasOnFloor(hass, floor.floor_id);
    areas.sort((a, b) => (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" }));
    const children = [];
    for (const area of areas) {
      const list = all.filter((e) => e.area_id === area.area_id);
      if (!list.length) continue;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      children.push({
        title: area.name || area.area_id,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    const fact = floorEntities.filter((e) => isActiveState(e.state, activeStates)).length;
    sections.push({
      kind: "both",
      title: floor.name || floor.floor_id,
      subtitle: countLabel(fact, floorEntities.length, labelWord),
      children,
      maxName,
    });
  }

  const flatOrphan = all.filter((e) => !e.floor_id);
  if (flatOrphan.length && !hasFloorFilter) {
    const byKey = new Map();
    for (const e of flatOrphan) {
      const key = e.area_id || "__none__";
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(e);
    }
    const orphanChildren = [];
    for (const [areaId, list] of byKey) {
      const title = areaId === "__none__" ? noAreaLabel : hass?.areas?.[areaId]?.name || areaId;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      orphanChildren.push({
        title,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    orphanChildren.sort((a, b) => (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" }));
    const oAct = flatOrphan.filter((e) => isActiveState(e.state, activeStates)).length;
    sections.push({
      kind: "both",
      title: unassignedFloor,
      subtitle: countLabel(oAct, flatOrphan.length, labelWord),
      children: orphanChildren,
      maxName,
    });
  }

  return { sections, sumActive, sumTotal, openAny, showDevices, activeStates };
}

class HaDeviceSummary extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  constructor() {
    super();
    this.hass = undefined;
    this._config = {
      title: "Fenster",
      device_classes: ["window"],
      group_by: "both",
      floor_ids: [],
      show_devices: true,
      active_states: ["on"],
      count_label: "offen",
      truncate_entity: 0,
      unassigned_label: "Ohne Stockwerk",
      no_area_label: "Ohne Bereich",
    };
  }

  setConfig(config) {
    const defaults = {
      title: "Fenster",
      device_classes: ["window"],
      group_by: "both",
      floor_ids: [],
      show_devices: true,
      active_states: ["on"],
      count_label: "offen",
      truncate_entity: 0,
      unassigned_label: "Ohne Stockwerk",
      no_area_label: "Ohne Bereich",
    };
    const merged = { ...defaults, ...config };
    if (config.truncate_entity === undefined && config.truncate_areas != null) {
      merged.truncate_entity = config.truncate_areas;
    }
    this.style.removeProperty("grid-column");
    this._config = merged;
  }

  getCardSize() {
    const m = buildModel(this.hass || {}, this._config);
    let rows = 2;
    for (const s of m.sections) {
      rows += 1;
      if (s.children) rows += s.children.length;
      if (m.show_devices) {
        // Conservative estimate: badges wrap earlier on narrow sections.
        const ent = (sec) => Math.ceil((sec.entities?.length || 0) / 3);
        if (s.children) {
          for (const c of s.children) rows += ent(c);
        } else {
          rows += ent(s);
        }
      }
    }
    return Math.min(24, Math.max(2, rows));
  }

  getGridOptions() {
    const rows = Math.max(2, this.getCardSize());
    return {
      columns: "full",
      rows,
      min_rows: 2,
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        {
          name: "group_by",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "floor", label: "Nach Stockwerk" },
                { value: "area", label: "Nach Bereich" },
                { value: "both", label: "Stockwerk + Bereich" },
              ],
            },
          },
        },
        { name: "floor_ids", selector: { object: {} } },
        { name: "show_devices", selector: { boolean: {} } },
        { name: "count_label", selector: { text: {} } },
        { name: "active_states", selector: { object: {} } },
        { name: "device_classes", selector: { object: {} } },
        {
          type: "grid",
          name: "",
          flatten: true,
          schema: [
            { name: "truncate_entity", selector: { number: { min: 0, max: 120, step: 1 } } },
            { name: "unassigned_label", selector: { text: {} } },
            { name: "no_area_label", selector: { text: {} } },
          ],
        },
      ],
      computeLabel: (schema) => {
        const labels = {
          title: "Titel",
          group_by: "Gruppierung",
          floor_ids: "Stockwerke filtern (native Floor-IDs aus HA, YAML-Liste)",
          show_devices: "Geräte-Badges anzeigen",
          count_label: "Zähl-Label",
          active_states: "Aktive Zustände (YAML-Liste, z. B. [\"on\"])",
          device_classes: "Device-Classes (YAML-Liste, z. B. [window, door])",
          truncate_entity: "Text kürzen ab N Zeichen (0 = aus)",
          unassigned_label: "Label ohne Stockwerk",
          no_area_label: "Label ohne Bereich",
        };
        return labels[schema.name];
      },
      assertConfig: (config) => {
        if (config.truncate_entity != null && Number(config.truncate_entity) < 0) {
          throw new Error("truncate_entity muss >= 0 sein.");
        }
      },
    };
  }

  static getStubConfig() {
    return {
      title: "Fenster",
      device_classes: ["window"],
      group_by: "both",
      floor_ids: [],
      show_devices: true,
    };
  }

  _moreInfo(entityId) {
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      }),
    );
  }

  _badge(e, activeStates, maxName) {
    const active = isActiveState(e.state, activeStates);
    const name = maxName > 0 ? truncate(e.friendly, maxName) : e.friendly;
    return html`
      <button type="button" class="badge ${active ? "badge--active" : ""}" @click=${() => this._moreInfo(e.entity_id)} title="${e.friendly} (${e.state})">
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${name}</span>
      </button>
    `;
  }

  _row(e, activeStates, maxName) {
    const active = isActiveState(e.state, activeStates);
    const name = maxName > 0 ? truncate(e.friendly, maxName) : e.friendly;
    return html`
      <button
        type="button"
        class="state-row ${active ? "state-row--active" : ""}"
        @click=${() => this._moreInfo(e.entity_id)}
        title="${e.friendly} (${e.state})"
      >
        <span class="state-row__dot" aria-hidden="true"></span>
        <span class="state-row__name">${name}</span>
      </button>
    `;
  }

  _sectionCard(sec, activeStates, showDevices) {
    const maxName = sec.maxName ?? 0;
    return html`
      <section class="section-card">
        <div class="section-card__head">
          <span class="section-card__title">${sec.title}</span>
          <span class="meta-chip">${sec.subtitle}</span>
        </div>
        ${showDevices && sec.entities?.length
          ? html`<div class="section-card__rows">
              ${sec.entities.map((e) => this._row(e, activeStates, maxName))}
            </div>`
          : nothing}
      </section>
    `;
  }

  render() {
    if (!this.hass) {
      return html`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;
    }

    const cfg = this._config;
    const model = buildModel(this.hass, cfg);
    const { sections, sumActive, sumTotal, openAny, showDevices, activeStates } = model;

    const summaryLine = `${sumActive}/${sumTotal} ${cfg.count_label || "offen"}`;
    const icon = openAny ? "mdi:window-open" : "mdi:window-closed";
    const iconColor = openAny ? "var(--error-color, #db4437)" : "var(--success-color, #43a047)";

    return html`
      <ha-card>
        <h1 class="card-header">
          <div class="name">${cfg.title ?? "Fenster"}</div>
          <div class="header-meta">
            <ha-icon icon=${icon} style="color:${iconColor}"></ha-icon>
            <span>${summaryLine}</span>
          </div>
        </h1>
        <div id="states" class="card-content">
          ${sumTotal === 0 ? html`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>` : nothing}
          <div class="states-lane">
            ${sections.map((s) => {
              if (s.kind === "both" && s.children) {
                return html`
                  <section class="group-column">
                    <div class="group-column__head">
                      <span class="group-column__title">${s.title}</span>
                      <span class="meta-chip">${s.subtitle}</span>
                    </div>
                    ${s.children.map((c) =>
                      this._sectionCard({ ...c, maxName: s.maxName }, activeStates, showDevices),
                    )}
                  </section>
                `;
              }
              return html`${this._sectionCard(s, activeStates, showDevices)}`;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-width: 0;
      max-width: 100%;
    }

    ha-card {
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
    }

    .card-content {
      padding-top: 0;
      padding-bottom: 12px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .header-meta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-left: auto;
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .header-meta ha-icon {
      --mdc-icon-size: 16px;
    }

    .empty,
    .muted {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      border: 1px solid color-mix(in srgb, var(--divider-color) 55%, transparent);
      color: var(--secondary-text-color);
      white-space: nowrap;
    }

    .states-lane {
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto;
      overflow-y: hidden;
      padding-top: 8px;
      padding-bottom: 2px;
      scrollbar-gutter: stable;
    }

    .group-column,
    .section-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 280px;
      max-width: min(380px, 92vw);
      flex: 0 0 auto;
      padding: 10px;
      border-radius: 14px;
      background: color-mix(in srgb, var(--primary-text-color) 4%, var(--card-background-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 60%, transparent);
    }

    .group-column__head,
    .section-card__head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 8px;
    }

    .group-column__title,
    .section-card__title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.2;
    }

    .section-card__rows {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .state-row {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border: none;
      border-radius: 10px;
      padding: 8px 10px;
      margin: 0;
      font: inherit;
      font-size: 13px;
      line-height: 1.3;
      text-align: left;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--card-background-color) 85%, var(--primary-text-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent);
      cursor: pointer;
      min-width: 0;
      width: 100%;
    }

    .state-row__name {
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: break-word;
      min-width: 0;
    }

    .state-row:hover {
      background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 24%, transparent);
    }

    .state-row--active {
      background: color-mix(in srgb, var(--error-color) 10%, var(--card-background-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--error-color) 30%, transparent);
    }

    .state-row__dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
    }

    .state-row--active .state-row__dot {
      background: var(--error-color);
    }

    .state-row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `;
}

if (!customElements.get("ha-device-summary")) {
  customElements.define("ha-device-summary", HaDeviceSummary);
}

if (!window.__HA_DEVICE_SUMMARY_REGISTERED) {
  window.__HA_DEVICE_SUMMARY_REGISTERED = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "ha-device-summary",
    name: "HA Device Summary",
    description: "Status nach Stockwerk & Bereich (Floors/Areas)",
    preview: true,
  });
  console.info(
    `%c HA DEVICE SUMMARY %c v${VERSION} `,
    "color:#fff;font-weight:bold;background:#6d4c41",
    "color:#fff;background:#8d6e63",
  );
}
