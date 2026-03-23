import { LitElement, html, css, nothing } from "lit";

const VERSION = "1.1.0";

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
  if (!str) return "";
  if (str.length <= max) return str;
  return `${str.slice(0, Math.max(0, max - 1))}…`;
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

function areasOnFloor(hass, floorId) {
  return Object.values(hass?.areas || {}).filter((a) => a.floor_id === floorId);
}

function byFriendly(a, b) {
  return (a.friendly || "").localeCompare(b.friendly || "", undefined, {
    sensitivity: "base",
  });
}

/**
 * Alle passenden Entitäten mit Floor/Area-Metadaten.
 */
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

/**
 * @returns {{ sections: object[], sumActive: number, sumTotal: number, openAny: boolean }}
 */
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
  const maxName = config.truncate_entity ?? 22;

  const all = collectEntities(hass, deviceClasses);
  const sumTotal = all.length;
  const sumActive = all.filter((e) => isActiveState(e.state, activeStates)).length;
  const openAny = sumActive > 0;

  /** @type {object[]} */
  const sections = [];

  if (groupBy === "floor") {
    for (const floor of sortedFloors(hass)) {
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
    if (noFloor.length) {
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
      const title =
        areaId === "__none__"
          ? noAreaLabel
          : hass?.areas?.[areaId]?.name || areaId;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      sections.push({
        kind: "area",
        title,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    sections.sort((a, b) =>
      (a.title || "").localeCompare(b.title || "", undefined, {
        sensitivity: "base",
      }),
    );
    return { sections, sumActive, sumTotal, openAny, showDevices, activeStates };
  }

  // group_by === "both": Stockwerk → Räume
  for (const floor of sortedFloors(hass)) {
    const floorEntities = all.filter((e) => e.floor_id === floor.floor_id);
    if (!floorEntities.length) continue;
    const areas = areasOnFloor(hass, floor.floor_id);
    areas.sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", undefined, {
        sensitivity: "base",
      }),
    );
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
  if (flatOrphan.length) {
    const byKey = new Map();
    for (const e of flatOrphan) {
      const key = e.area_id || "__none__";
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(e);
    }
    const orphanChildren = [];
    for (const [areaId, list] of byKey) {
      const title =
        areaId === "__none__"
          ? noAreaLabel
          : hass?.areas?.[areaId]?.name || areaId;
      const act = list.filter((e) => isActiveState(e.state, activeStates)).length;
      orphanChildren.push({
        title,
        subtitle: countLabel(act, list.length, labelWord),
        entities: [...list].sort(byFriendly),
        maxName,
      });
    }
    orphanChildren.sort((a, b) =>
      (a.title || "").localeCompare(b.title || "", undefined, {
        sensitivity: "base",
      }),
    );
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
      show_devices: true,
      active_states: ["on"],
      count_label: "offen",
      truncate_areas: 14,
      truncate_entity: 22,
      unassigned_label: "Ohne Stockwerk",
      no_area_label: "Ohne Bereich",
    };
  }

  setConfig(config) {
    this._config = {
      title: "Fenster",
      device_classes: ["window"],
      group_by: "both",
      show_devices: true,
      active_states: ["on"],
      count_label: "offen",
      truncate_areas: 14,
      truncate_entity: 22,
      unassigned_label: "Ohne Stockwerk",
      no_area_label: "Ohne Bereich",
      ...config,
    };
    if (this._config.truncate_entity == null && this._config.truncate_areas != null) {
      this._config.truncate_entity = this._config.truncate_areas;
    }
  }

  getCardSize() {
    const m = buildModel(this.hass || {}, this._config);
    let rows = 2;
    for (const s of m.sections) {
      rows += 1;
      if (s.children) rows += s.children.length;
      if (m.show_devices) {
        const ent = (sec) => Math.ceil((sec.entities?.length || 0) / 4);
        if (s.children) {
          for (const c of s.children) rows += ent(c);
        } else {
          rows += ent(s);
        }
      }
    }
    return Math.min(24, Math.max(2, rows));
  }

  static getStubConfig() {
    return {
      title: "Fenster",
      device_classes: ["window"],
      group_by: "both",
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
    const name = truncate(e.friendly, maxName);
    return html`
      <button
        type="button"
        class="badge ${active ? "badge--active" : ""}"
        @click=${() => this._moreInfo(e.entity_id)}
      >
        ${name}
      </button>
    `;
  }

  _badgesRow(entities, activeStates, maxName) {
    if (!entities?.length) return nothing;
    return html`
      <div class="badges">${entities.map((e) => this._badge(e, activeStates, maxName))}</div>
    `;
  }

  _block(sec, activeStates, showDevices) {
    const maxName = sec.maxName ?? 22;
    return html`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${sec.title}</span>
          <span class="block-sub">${sec.subtitle}</span>
        </div>
        ${showDevices ? this._badgesRow(sec.entities, activeStates, maxName) : ""}
      </div>
    `;
  }

  render() {
    if (!this.hass) {
      return html`<ha-card><div class="pad muted">Warte auf Home Assistant…</div></ha-card>`;
    }

    const cfg = this._config;
    const model = buildModel(this.hass, cfg);
    const {
      sections,
      sumActive,
      sumTotal,
      openAny,
      showDevices,
      activeStates,
    } = model;

    const summaryLine = `${sumActive}/${sumTotal} ${cfg.count_label || "offen"}`;
    const icon = openAny ? "mdi:window-open" : "mdi:window-closed";
    const iconColor = openAny
      ? "var(--error-color, #db4437)"
      : "var(--success-color, #43a047)";

    return html`
      <ha-card>
        <div class="card-inner">
          <div class="row">
            <div class="icon-wrap" style="color: ${iconColor}">
              <ha-icon icon=${icon}></ha-icon>
            </div>
            <div class="text">
              <div class="primary">${cfg.title ?? "Fenster"}</div>
              <div class="summary-line">${summaryLine}</div>
            </div>
          </div>
          <div class="sections">
            ${sumTotal === 0
              ? html`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`
              : nothing}
            ${sections.map((s) => {
              if (s.kind === "both" && s.children) {
                return html`
                  <div class="section-floor">
                    <div class="floor-head">
                      <span class="floor-title">${s.title}</span>
                      <span class="floor-sub">${s.subtitle}</span>
                    </div>
                    ${s.children.map((c) =>
                      this._block(
                        { ...c, maxName: s.maxName },
                        activeStates,
                        showDevices,
                      ),
                    )}
                  </div>
                `;
              }
              return html`
                <div class="section-floor">
                  ${this._block(s, activeStates, showDevices)}
                </div>
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      --padding: 12px;
    }
    .card-inner {
      padding: var(--padding);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .pad {
      padding: var(--padding);
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .empty {
      font-size: 13px;
      color: var(--secondary-text-color);
      padding: 4px 0;
    }
    .row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 12px;
    }
    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--card-background-color) 86%, var(--primary-text-color));
      flex-shrink: 0;
    }
    ha-icon {
      width: 24px;
      height: 24px;
      --mdc-icon-size: 24px;
    }
    .text {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .primary {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--primary-text-color);
    }
    .summary-line {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .sections {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section-floor {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 4px;
      border-top: 1px solid var(--divider-color);
    }
    .section-floor:first-of-type {
      border-top: none;
      padding-top: 0;
    }
    .floor-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 10px;
    }
    .floor-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .floor-sub {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-left: 0;
    }
    .section-floor .block {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 2px solid color-mix(in srgb, var(--primary-color) 25%, transparent);
    }
    .block-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 6px 10px;
    }
    .block-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .block-sub {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .badge {
      font-family: inherit;
      font-size: 12px;
      line-height: 1.2;
      padding: 5px 10px;
      margin: 0;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: color-mix(in srgb, var(--disabled-color) 8%, var(--card-background-color));
      color: var(--primary-text-color);
      cursor: pointer;
      max-width: 100%;
      text-align: center;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .badge:hover {
      background: color-mix(in srgb, var(--primary-color) 12%, var(--card-background-color));
      border-color: color-mix(in srgb, var(--primary-color) 35%, var(--divider-color));
    }
    .badge--active {
      background: color-mix(in srgb, var(--error-color) 16%, var(--card-background-color));
      border-color: color-mix(in srgb, var(--error-color) 45%, var(--divider-color));
      font-weight: 500;
    }
    .badge:focus-visible {
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
