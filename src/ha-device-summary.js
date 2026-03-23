import { LitElement, html, css, nothing } from "lit";

const VERSION = "3.1.0";

function sortedFloors(hass) {
  const list = Object.values(hass?.floors || {});
  list.sort((a, b) => {
    const la = a.level;
    const lb = b.level;
    if (la != null && lb != null && la !== lb) return la - lb;
    return (a.name || "").localeCompare(b.name || "", undefined, { sensitivity: "base" });
  });
  return list;
}

function resolveFloorIds(hass, config) {
  const floorIds = Array.isArray(config?.floor_ids)
    ? config.floor_ids.map((x) => String(x).trim()).filter(Boolean)
    : [];
  if (floorIds.length) return floorIds;
  return sortedFloors(hass).map((f) => f.floor_id);
}

function collectEntitiesFromFloors(hass, config) {
  const floorIds = new Set(resolveFloorIds(hass, config));
  const onlyDomain = config.entity_domain ? String(config.entity_domain).trim() : "";
  const classes = Array.isArray(config.device_classes)
    ? config.device_classes.map((x) => String(x))
    : [];
  const activeStates = Array.isArray(config.active_states)
    ? config.active_states.map((x) => String(x))
    : ["on"];

  const rows = [];
  for (const registryEntry of Object.values(hass?.entities || {})) {
    const entityId = registryEntry.entity_id;
    const stateObj = hass?.states?.[entityId];
    if (!stateObj) continue;
    if (registryEntry.hidden_by) continue;

    const areaId = registryEntry.area_id;
    const area = areaId ? hass?.areas?.[areaId] : null;
    const floorId = area?.floor_id;
    if (!floorId || !floorIds.has(floorId)) continue;

    const domain = entityId.split(".")[0];
    if (onlyDomain && domain !== onlyDomain) continue;
    if (classes.length) {
      const dc = stateObj.attributes?.device_class;
      if (!classes.includes(dc)) continue;
    }

    rows.push({
      entityId,
      name: stateObj.attributes?.friendly_name || entityId,
      state: stateObj.state,
      active: activeStates.includes(stateObj.state),
      floorId,
      floorName: hass?.floors?.[floorId]?.name || floorId,
      areaName: area?.name || "",
    });
  }
  rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  return rows;
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
      title: "Gruppe",
      subtitle: "",
      entities: [],
      floor_ids: [],
      entity_domain: "binary_sensor",
      device_classes: ["window"],
      use_native_rows: true,
      active_states: ["on"],
    };
  }

  setConfig(config) {
    const hasEntities = Array.isArray(config?.entities) && config.entities.length > 0;
    const hasFloors = Array.isArray(config?.floor_ids) && config.floor_ids.length > 0;
    if (!hasEntities && !hasFloors) {
      throw new Error("Setze `entities` oder `floor_ids`.");
    }
    this._config = {
      title: "Gruppe",
      subtitle: "",
      entities: [],
      floor_ids: [],
      entity_domain: "binary_sensor",
      device_classes: ["window"],
      use_native_rows: true,
      active_states: ["on"],
      ...config,
    };
  }

  getCardSize() {
    const fromEntities = Array.isArray(this._config?.entities) ? this._config.entities.length : 0;
    const fromFloors = this.hass ? collectEntitiesFromFloors(this.hass, this._config).length : 0;
    const count = Math.max(fromEntities, fromFloors, 1);
    return Math.min(24, Math.max(2, count + 1));
  }

  getGridOptions() {
    return {
      columns: "full",
      rows: this.getCardSize(),
      min_rows: 2,
    };
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "title", selector: { text: {} } },
        { name: "subtitle", selector: { text: {} } },
        { name: "floor_ids", selector: { object: {} } },
        { name: "entity_domain", selector: { text: {} } },
        { name: "device_classes", selector: { object: {} } },
        { name: "use_native_rows", selector: { boolean: {} } },
        { name: "active_states", selector: { object: {} } },
        { name: "entities", selector: { object: {} } },
      ],
      computeLabel: (schema) => {
        const labels = {
          title: "Titel",
          subtitle: "Untertitel",
          floor_ids: "Stockwerk-IDs (native HA Floors, YAML-Liste)",
          entity_domain: "Entity Domain Filter (z. B. binary_sensor)",
          device_classes: "Device-Classes (YAML-Liste, z. B. [window])",
          use_native_rows: "Native HA Entity Rows nutzen",
          active_states: "Aktive Zustände (YAML-Liste, z. B. [\"on\"])",
          entities: "Entitäten (optional, YAML-Liste; übersteuert Floor-Fetch)",
        };
        return labels[schema.name];
      },
      assertConfig: (config) => {
        const hasEntities = Array.isArray(config?.entities) && config.entities.length > 0;
        const hasFloors = Array.isArray(config?.floor_ids) && config.floor_ids.length > 0;
        if (!hasEntities && !hasFloors) {
          throw new Error("Setze `entities` oder `floor_ids`.");
        }
      },
    };
  }

  static getStubConfig() {
    return {
      title: "EG + Zwischenbau",
      subtitle: "",
      floor_ids: ["erdgeschoss"],
      entity_domain: "binary_sensor",
      device_classes: ["window"],
      use_native_rows: true,
      active_states: ["on"],
      entities: [],
    };
  }

  _entityName(entityId) {
    return this.hass?.states?.[entityId]?.attributes?.friendly_name || entityId;
  }

  _isActive(entityId) {
    const st = this.hass?.states?.[entityId]?.state;
    const activeStates = Array.isArray(this._config.active_states)
      ? this._config.active_states
      : ["on"];
    return activeStates.includes(st);
  }

  render() {
    if (!this.hass) {
      return html`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;
    }

    const fromFloors = collectEntitiesFromFloors(this.hass, this._config);
    const entitiesFromConfig = Array.isArray(this._config.entities)
      ? this._config.entities.filter((e) => this.hass.states?.[e]).map((e) => ({
          entityId: e,
          name: this._entityName(e),
          state: this.hass.states[e].state,
          active: this._isActive(e),
          floorName: "",
          areaName: "",
        }))
      : [];
    const rows = entitiesFromConfig.length ? entitiesFromConfig : fromFloors;
    const activeCount = rows.filter((r) => r.active).length;
    const subtitle = this._config.subtitle || `${activeCount}/${rows.length} offen`;

    return html`
      <ha-card>
        <h1 class="card-header">
          <div class="name">${this._config.title || "Gruppe"}</div>
          ${subtitle
            ? html`<div class="meta">${subtitle}</div>`
            : nothing}
        </h1>
        <div id="states" class="card-content">
          ${this._config.use_native_rows
            ? rows.map(
                (r) => html`
                  <div class="row-wrap ${r.active ? "row-wrap--active" : ""}">
                    <hui-simple-entity-row
                      class="type-entity"
                      .hass=${this.hass}
                      .config=${{ entity: r.entityId, name: r.name }}
                    ></hui-simple-entity-row>
                  </div>
                `,
              )
            : html`<div class="badge-list">
                ${rows.map(
                  (r) => html`
                    <button
                      type="button"
                      class="badge ${r.active ? "badge--active" : ""}"
                      @click=${() =>
                        this.dispatchEvent(
                          new CustomEvent("hass-more-info", {
                            bubbles: true,
                            composed: true,
                            detail: { entityId: r.entityId },
                          }),
                        )}
                    >
                      <span class="badge-dot"></span>
                      <span>${r.name}</span>
                    </button>
                  `,
                )}
              </div>`}
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
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .card-content {
      padding-top: 0;
      padding-bottom: 12px;
      box-sizing: border-box;
    }

    .meta {
      margin-left: auto;
      font-size: 12px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }

    .row-wrap {
      margin: 6px 10px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--card-background-color) 85%, var(--primary-text-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent);
      overflow: hidden;
    }

    .row-wrap--active {
      background: color-mix(in srgb, var(--error-color) 10%, var(--card-background-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--error-color) 30%, transparent);
    }

    .type-entity {
      display: block;
      --paper-item-icon-color: var(--secondary-text-color);
    }

    .badge-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      padding: 6px 10px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      border: none;
      border-radius: 999px;
      padding: 6px 10px;
      background: color-mix(in srgb, var(--card-background-color) 85%, var(--primary-text-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent);
      color: var(--primary-text-color);
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    .badge--active {
      background: color-mix(in srgb, var(--error-color) 10%, var(--card-background-color));
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--error-color) 30%, transparent);
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--secondary-text-color) 45%, transparent);
      flex-shrink: 0;
    }
    .badge--active .badge-dot {
      background: var(--error-color);
    }

    .muted {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 12px;
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
    description: "Inner Group Card für frei kombinierbare Layouts",
    preview: true,
  });
  console.info(
    `%c HA DEVICE SUMMARY %c v${VERSION} `,
    "color:#fff;font-weight:bold;background:#6d4c41",
    "color:#fff;background:#8d6e63",
  );
}
