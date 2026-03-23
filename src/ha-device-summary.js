import { LitElement, html, css, nothing } from "lit";

const VERSION = "1.4.0";

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
  const maxName =
    config.truncate_entity == null || config.truncate_entity === ""
      ? 0
      : Number(config.truncate_entity) || 0;

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
    this._config = merged;
  }

  getCardSize() {
    const m = buildModel(this.hass || {}, this._config);
    let rows = 2;
    for (const s of m.sections) {
      rows += 1;
      if (s.children) rows += s.children.length;
      if (m.show_devices) {
        const ent = () => 2;
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
    const name =
      maxName > 0 ? truncate(e.friendly, maxName) : e.friendly;
    return html`
      <button
        type="button"
        class="badge ${active ? "badge--active" : ""}"
        @click=${() => this._moreInfo(e.entity_id)}
        title="${e.friendly} (${e.state})"
      >
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${name}</span>
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
    const maxName = sec.maxName ?? 0;
    return html`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${sec.title}</span>
          <span class="meta-chip">${sec.subtitle}</span>
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
                      <span class="meta-chip">${s.subtitle}</span>
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
    :host {
      display: block;
      height: auto;
      --ha-ds-pad: 10px;
      --ha-ds-gap: 8px;
      --ha-ds-chip-radius: 18px;
      --ha-ds-badge-rows: 2;
      --ha-ds-group-rows: 2;
    }

    ha-card {
      height: auto;
      box-sizing: border-box;
      width: max-content;
      min-width: 100%;
    }

    .card-inner {
      box-sizing: border-box;
      padding: var(--ha-ds-pad);
      display: flex;
      flex-direction: column;
      gap: var(--ha-ds-gap);
      width: max-content;
      min-width: 100%;
    }

    .pad {
      padding: var(--ha-ds-pad);
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .empty {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 2px 0;
    }

    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      color: inherit;
      flex-shrink: 0;
    }

    ha-icon {
      width: 20px;
      height: 20px;
      --mdc-icon-size: 20px;
    }

    .text {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .primary {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
      letter-spacing: 0.01em;
      color: var(--primary-text-color);
    }

    .summary-line {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
    }

    .meta-chip {
      display: inline-flex;
      align-items: center;
      font-size: 11px;
      font-weight: 500;
      line-height: 1;
      padding: 4px 9px;
      border-radius: var(--ha-ds-chip-radius);
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
      border: 1px solid color-mix(in srgb, var(--divider-color) 55%, transparent);
      white-space: nowrap;
      flex: 0 0 auto;
    }

    .sections {
      display: grid;
      grid-template-rows: repeat(var(--ha-ds-group-rows, 2), auto);
      grid-auto-flow: column;
      grid-auto-columns: minmax(280px, max-content);
      gap: var(--ha-ds-gap) 12px;
      align-items: start;
      justify-items: stretch;
      width: max-content;
      min-width: 100%;
    }

    .section-floor {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 0;
      margin: 0;
      min-width: 280px;
    }

    .floor-head,
    .block-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px 8px;
    }

    .floor-title,
    .block-title {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
      line-height: 1.2;
      flex: 0 1 auto;
      min-width: 0;
    }

    .block {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .badges {
      display: grid;
      grid-template-rows: repeat(var(--ha-ds-badge-rows, 2), auto);
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      gap: 6px 8px;
      width: 100%;
      max-width: 100%;
      align-items: start;
      justify-items: start;
      overflow: visible;
      padding-bottom: 0;
    }

    .badge {
      display: inline-flex;
      align-items: flex-start;
      gap: 6px;
      box-sizing: border-box;
      width: max-content;
      min-width: 0;
      margin: 0;
      padding: 5px 11px 5px 9px;
      border: none;
      border-radius: var(--ha-ds-chip-radius);
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.3;
      text-align: left;
      cursor: pointer;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent);
      transition: background 0.12s ease, box-shadow 0.12s ease;
    }

    .badge-label {
      white-space: normal;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .badge:hover {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 28%, transparent);
    }

    .badge--active {
      background: color-mix(in srgb, var(--error-color) 14%, transparent);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--error-color) 35%, transparent);
    }

    .badge-dot {
      width: 7px;
      height: 7px;
      margin-top: 4px;
      border-radius: 999px;
      flex-shrink: 0;
      background: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
    }

    .badge--active .badge-dot {
      background: var(--error-color);
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
