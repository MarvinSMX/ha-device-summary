import { LitElement, html, css, nothing } from "lit";

const VERSION = "3.0.0";

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
      active_states: ["on"],
    };
  }

  setConfig(config) {
    if (!Array.isArray(config?.entities) || config.entities.length === 0) {
      throw new Error("`entities` muss eine nicht-leere Liste sein.");
    }
    this._config = {
      title: "Gruppe",
      subtitle: "",
      entities: [],
      active_states: ["on"],
      ...config,
    };
  }

  getCardSize() {
    return Math.min(24, Math.max(2, (this._config?.entities?.length || 0) + 1));
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
        { name: "active_states", selector: { object: {} } },
        { name: "entities", required: true, selector: { object: {} } },
      ],
      computeLabel: (schema) => {
        const labels = {
          title: "Titel",
          subtitle: "Untertitel",
          active_states: "Aktive Zustände (YAML-Liste, z. B. [\"on\"])",
          entities: "Entitäten (YAML-Liste)",
        };
        return labels[schema.name];
      },
      assertConfig: (config) => {
        if (!Array.isArray(config?.entities) || config.entities.length === 0) {
          throw new Error("`entities` muss eine nicht-leere Liste sein.");
        }
      },
    };
  }

  static getStubConfig() {
    return {
      title: "EG + Zwischenbau",
      subtitle: "0/0 offen",
      active_states: ["on"],
      entities: ["binary_sensor.example_window"],
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

    const entities = (this._config.entities || []).filter((e) => this.hass.states?.[e]);

    return html`
      <ha-card>
        <h1 class="card-header">
          <div class="name">${this._config.title || "Gruppe"}</div>
          ${this._config.subtitle
            ? html`<div class="meta">${this._config.subtitle}</div>`
            : nothing}
        </h1>
        <div id="states" class="card-content">
          ${entities.map(
            (entityId) => html`
              <div class="row-wrap ${this._isActive(entityId) ? "row-wrap--active" : ""}">
                <hui-simple-entity-row
                  class="type-entity"
                  .hass=${this.hass}
                  .config=${{ entity: entityId, name: this._entityName(entityId) }}
                ></hui-simple-entity-row>
              </div>
            `,
          )}
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
