import { LitElement, html, css } from "lit";

const VERSION = "1.0.0";

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

function countForArea(hass, areaId, deviceClasses) {
  let open = 0;
  let total = 0;
  for (const entry of Object.values(hass?.entities || {})) {
    const eid = entry.entity_id;
    if (entry.area_id !== areaId) continue;
    if (isHidden(hass, eid)) continue;
    if (!matchesDevice(hass, eid, deviceClasses)) continue;
    total += 1;
    if (hass.states?.[eid]?.state === "on") open += 1;
  }
  return { open, total };
}

function countOpenOnFloor(hass, floorId, deviceClasses) {
  let n = 0;
  for (const entry of Object.values(hass?.entities || {})) {
    const eid = entry.entity_id;
    const areaId = entry.area_id;
    if (!areaId) continue;
    const area = hass?.areas?.[areaId];
    if (!area || area.floor_id !== floorId) continue;
    if (isHidden(hass, eid)) continue;
    if (!matchesDevice(hass, eid, deviceClasses)) continue;
    if (hass.states?.[eid]?.state === "on") n += 1;
  }
  return n;
}

function countOpenUnassignedAreas(hass, deviceClasses) {
  let n = 0;
  for (const entry of Object.values(hass?.entities || {})) {
    const eid = entry.entity_id;
    const areaId = entry.area_id;
    if (!areaId) continue;
    const area = hass?.areas?.[areaId];
    if (area?.floor_id) continue;
    if (isHidden(hass, eid)) continue;
    if (!matchesDevice(hass, eid, deviceClasses)) continue;
    if (hass.states?.[eid]?.state === "on") n += 1;
  }
  return n;
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

function computeView(hass, config) {
  const deviceClasses = Array.isArray(config.device_classes)
    ? config.device_classes
    : ["window"];

  let sumOpen = 0;
  let sumTotal = 0;
  const lines = [];

  for (const floor of sortedFloors(hass)) {
    const floorLabel = floor.name || floor.floor_id;
    const parts = [];
    const areas = areasOnFloor(hass, floor.floor_id);
    areas.sort((a, b) =>
      (a.name || "").localeCompare(b.name || "", undefined, {
        sensitivity: "base",
      }),
    );
    for (const area of areas) {
      const { open, total } = countForArea(hass, area.area_id, deviceClasses);
      if (total === 0) continue;
      sumOpen += open;
      sumTotal += total;
      const short = truncate(area.name || area.area_id, config.truncate_areas ?? 14);
      parts.push(`${short} ${open}/${total}`);
    }
    if (parts.length) {
      lines.push(`${floorLabel}: ${parts.join(" · ")}`);
    }
  }

  const orphanParts = [];
  const orphanAreas = Object.values(hass?.areas || {}).filter((a) => !a.floor_id);
  orphanAreas.sort((a, b) =>
    (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" }),
  );
  for (const area of orphanAreas) {
    const { open, total } = countForArea(hass, area.area_id, deviceClasses);
    if (total === 0) continue;
    sumOpen += open;
    sumTotal += total;
    const short = truncate(area.name || area.area_id, config.truncate_areas ?? 14);
    orphanParts.push(`${short} ${open}/${total}`);
  }
  if (orphanParts.length) {
    const label = config.unassigned_label ?? "Ohne Stockwerk";
    lines.push(`${label}: ${orphanParts.join(" · ")}`);
  }

  const openAny =
    sortedFloors(hass).some((f) => countOpenOnFloor(hass, f.floor_id, deviceClasses) > 0) ||
    countOpenUnassignedAreas(hass, deviceClasses) > 0;

  return {
    primary: config.title ?? "Fenster",
    summary: `${sumOpen}/${sumTotal} geöffnet`,
    detail: lines.join("\n"),
    icon: openAny ? "mdi:window-open" : "mdi:window-closed",
    iconColor: openAny ? "var(--error-color, #db4437)" : "var(--success-color, #43a047)",
    sumOpen,
    sumTotal,
  };
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
      truncate_areas: 14,
      unassigned_label: "Ohne Stockwerk",
    };
  }

  setConfig(config) {
    this._config = {
      title: "Fenster",
      device_classes: ["window"],
      truncate_areas: 14,
      unassigned_label: "Ohne Stockwerk",
      ...config,
    };
  }

  getCardSize() {
    return 1;
  }

  static getStubConfig() {
    return {
      title: "Fenster",
      device_classes: ["window"],
    };
  }

  render() {
    if (!this.hass) {
      return html`<ha-card><div class="pad muted">Warte auf Home Assistant…</div></ha-card>`;
    }

    const v = computeView(this.hass, this._config);
    const secondary = v.detail ? `${v.summary}\n${v.detail}` : v.summary;

    return html`
      <ha-card>
        <div class="row">
          <div class="icon-wrap" style="color: ${v.iconColor}">
            <ha-icon icon=${v.icon}></ha-icon>
          </div>
          <div class="text">
            <div class="primary">${v.primary}</div>
            <div class="secondary">${secondary}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      --padding: 12px;
    }
    .pad {
      padding: var(--padding);
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .row {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 12px;
      padding: var(--padding);
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
      gap: 4px;
    }
    .primary {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.2;
      color: var(--primary-text-color);
    }
    .secondary {
      font-size: 13px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      white-space: pre-line;
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
