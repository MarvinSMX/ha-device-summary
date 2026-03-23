var R=globalThis,H=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,L=Symbol(),Q=new WeakMap,x=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==L)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(H&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Q.set(e,t))}return t}toString(){return this.cssText}},X=r=>new x(typeof r=="string"?r:r+"",void 0,L),I=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new x(e,r,L)},tt=(r,t)=>{if(H)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=R.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},D=H?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return X(e)})(r):r;var{is:$t,defineProperty:gt,getOwnPropertyDescriptor:yt,getOwnPropertyNames:vt,getOwnPropertySymbols:At,getPrototypeOf:bt}=Object,k=globalThis,et=k.trustedTypes,Et=et?et.emptyScript:"",wt=k.reactiveElementPolyfillSupport,C=(r,t)=>r,z={toAttribute(r,t){switch(t){case Boolean:r=r?Et:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!$t(r,t),st={attribute:!0,type:String,converter:z,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;var m=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=st){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&gt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=yt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let l=i?.call(this);n?.call(this,o),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??st}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...vt(e),...At(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(D(i))}else t!==void 0&&e.push(D(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:z).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:z;this._$Em=i;let l=o.fromAttribute(e,n.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??it)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:o}=n,l=this[i];o!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,n,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};m.elementStyles=[],m.shadowRootOptions={mode:"open"},m[C("elementProperties")]=new Map,m[C("finalized")]=new Map,wt?.({ReactiveElement:m}),(k.reactiveElementVersions??=[]).push("2.1.2");var q=globalThis,rt=r=>r,T=q.trustedTypes,ot=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,dt="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+f,St=`<${pt}>`,v=document,M=()=>v.createComment(""),U=r=>r===null||typeof r!="object"&&typeof r!="function",Y=Array.isArray,xt=r=>Y(r)||typeof r?.[Symbol.iterator]=="function",j=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,at=/>/g,g=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,ct=/"/g,ut=/^(?:script|style|textarea|title)$/i,K=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),b=K(1),Lt=K(2),It=K(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),ht=new WeakMap,y=v.createTreeWalker(v,129);function _t(r,t){if(!Y(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}var Ct=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",o=P;for(let l=0;l<e;l++){let a=r[l],h,p,c=-1,u=0;for(;u<a.length&&(o.lastIndex=u,p=o.exec(a),p!==null);)u=o.lastIndex,o===P?p[1]==="!--"?o=nt:p[1]!==void 0?o=at:p[2]!==void 0?(ut.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=g):p[3]!==void 0&&(o=g):o===g?p[0]===">"?(o=i??P,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?g:p[3]==='"'?ct:lt):o===ct||o===lt?o=g:o===nt||o===at?o=P:(o=g,i=void 0);let _=o===g&&r[l+1].startsWith("/>")?" ":"";n+=o===P?a+St:c>=0?(s.push(h),a.slice(0,c)+dt+a.slice(c)+f+_):a+f+(c===-2?l:_)}return[_t(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},N=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,l=t.length-1,a=this.parts,[h,p]=Ct(t,e);if(this.el=r.createElement(h,s),y.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=y.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(dt)){let u=p[o++],_=i.getAttribute(c).split(f),E=/([.?@])?(.*)/.exec(u);a.push({type:1,index:n,name:E[2],strings:_,ctor:E[1]==="."?F:E[1]==="?"?V:E[1]==="@"?W:S}),i.removeAttribute(c)}else c.startsWith(f)&&(a.push({type:6,index:n}),i.removeAttribute(c));if(ut.test(i.tagName)){let c=i.textContent.split(f),u=c.length-1;if(u>0){i.textContent=T?T.emptyScript:"";for(let _=0;_<u;_++)i.append(c[_],M()),y.nextNode(),a.push({type:2,index:++n});i.append(c[u],M())}}}else if(i.nodeType===8)if(i.data===pt)a.push({type:2,index:n});else{let c=-1;for(;(c=i.data.indexOf(f,c+1))!==-1;)a.push({type:7,index:n}),c+=f.length-1}n++}}static createElement(t,e){let s=v.createElement("template");return s.innerHTML=t,s}};function w(r,t,e=r,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=U(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}var B=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??v).importNode(e,!0);y.currentNode=i;let n=y.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let h;a.type===2?h=new O(n,n.nextSibling,this,t):a.type===1?h=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(h=new G(n,this,t)),this._$AV.push(h),a=s[++l]}o!==a?.index&&(n=y.nextNode(),o++)}return y.currentNode=v,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),U(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):xt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(v.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(_t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new B(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new N(t)),e}k(t){Y(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new r(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=rt(t).nextSibling;rt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=w(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==A,o&&(this._$AH=t);else{let l=t,a,h;for(t=n[0],a=0;a<n.length-1;a++)h=w(this,l[s+a],e,a),h===A&&(h=this._$AH[a]),o||=!U(h)||h!==this._$AH[a],h===d?t=d:t!==d&&(t+=(h??"")+n[a+1]),this._$AH[a]=h}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},V=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},W=class extends S{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??d)===A)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},G=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Pt=q.litHtmlPolyfillSupport;Pt?.(N,O),(q.litHtmlVersions??=[]).push("3.3.2");var mt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(M(),n),n,void 0,e??{})}return i._$AI(r),i};var Z=globalThis,$=class extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};$._$litElement$=!0,$.finalized=!0,Z.litElementHydrateSupport?.({LitElement:$});var Mt=Z.litElementPolyfillSupport;Mt?.({LitElement:$});(Z.litElementVersions??=[]).push("4.2.2");var Ut="3.1.0";function Nt(r){let t=Object.values(r?.floors||{});return t.sort((e,s)=>{let i=e.level,n=s.level;return i!=null&&n!=null&&i!==n?i-n:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function Ot(r,t){let e=Array.isArray(t?.floor_ids)?t.floor_ids.map(s=>String(s).trim()).filter(Boolean):[];return e.length?e:Nt(r).map(s=>s.floor_id)}function ft(r,t){let e=new Set(Ot(r,t)),s=t.entity_domain?String(t.entity_domain).trim():"",i=Array.isArray(t.device_classes)?t.device_classes.map(l=>String(l)):[],n=Array.isArray(t.active_states)?t.active_states.map(l=>String(l)):["on"],o=[];for(let l of Object.values(r?.entities||{})){let a=l.entity_id,h=r?.states?.[a];if(!h||l.hidden_by)continue;let p=l.area_id,c=p?r?.areas?.[p]:null,u=c?.floor_id;if(!u||!e.has(u))continue;let _=a.split(".")[0];if(!(s&&_!==s)){if(i.length){let E=h.attributes?.device_class;if(!i.includes(E))continue}o.push({entityId:a,name:h.attributes?.friendly_name||a,state:h.state,active:n.includes(h.state),floorId:u,floorName:r?.floors?.[u]?.name||u,areaName:c?.name||""})}}return o.sort((l,a)=>l.name.localeCompare(a.name,void 0,{sensitivity:"base"})),o}var J=class extends ${static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Gruppe",subtitle:"",entities:[],floor_ids:[],entity_domain:"binary_sensor",device_classes:["window"],use_native_rows:!0,active_states:["on"]}}setConfig(t){let e=Array.isArray(t?.entities)&&t.entities.length>0,s=Array.isArray(t?.floor_ids)&&t.floor_ids.length>0;if(!e&&!s)throw new Error("Setze `entities` oder `floor_ids`.");this._config={title:"Gruppe",subtitle:"",entities:[],floor_ids:[],entity_domain:"binary_sensor",device_classes:["window"],use_native_rows:!0,active_states:["on"],...t}}getCardSize(){let t=Array.isArray(this._config?.entities)?this._config.entities.length:0,e=this.hass?ft(this.hass,this._config).length:0,s=Math.max(t,e,1);return Math.min(24,Math.max(2,s+1))}getGridOptions(){return{columns:"full",rows:this.getCardSize(),min_rows:2}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"subtitle",selector:{text:{}}},{name:"floor_ids",selector:{object:{}}},{name:"entity_domain",selector:{text:{}}},{name:"device_classes",selector:{object:{}}},{name:"use_native_rows",selector:{boolean:{}}},{name:"active_states",selector:{object:{}}},{name:"entities",selector:{object:{}}}],computeLabel:t=>({title:"Titel",subtitle:"Untertitel",floor_ids:"Stockwerk-IDs (native HA Floors, YAML-Liste)",entity_domain:"Entity Domain Filter (z. B. binary_sensor)",device_classes:"Device-Classes (YAML-Liste, z. B. [window])",use_native_rows:"Native HA Entity Rows nutzen",active_states:'Aktive Zust\xE4nde (YAML-Liste, z. B. ["on"])',entities:"Entit\xE4ten (optional, YAML-Liste; \xFCbersteuert Floor-Fetch)"})[t.name],assertConfig:t=>{let e=Array.isArray(t?.entities)&&t.entities.length>0,s=Array.isArray(t?.floor_ids)&&t.floor_ids.length>0;if(!e&&!s)throw new Error("Setze `entities` oder `floor_ids`.")}}}static getStubConfig(){return{title:"EG + Zwischenbau",subtitle:"",floor_ids:["erdgeschoss"],entity_domain:"binary_sensor",device_classes:["window"],use_native_rows:!0,active_states:["on"],entities:[]}}_entityName(t){return this.hass?.states?.[t]?.attributes?.friendly_name||t}_isActive(t){let e=this.hass?.states?.[t]?.state;return(Array.isArray(this._config.active_states)?this._config.active_states:["on"]).includes(e)}render(){if(!this.hass)return b`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;let t=ft(this.hass,this._config),e=Array.isArray(this._config.entities)?this._config.entities.filter(o=>this.hass.states?.[o]).map(o=>({entityId:o,name:this._entityName(o),state:this.hass.states[o].state,active:this._isActive(o),floorName:"",areaName:""})):[],s=e.length?e:t,i=s.filter(o=>o.active).length,n=this._config.subtitle||`${i}/${s.length} offen`;return b`
      <ha-card>
        <h1 class="card-header">
          <div class="name">${this._config.title||"Gruppe"}</div>
          ${n?b`<div class="meta">${n}</div>`:d}
        </h1>
        <div id="states" class="card-content">
          ${this._config.use_native_rows?s.map(o=>b`
                  <div class="row-wrap ${o.active?"row-wrap--active":""}">
                    <hui-simple-entity-row
                      class="type-entity"
                      .hass=${this.hass}
                      .config=${{entity:o.entityId,name:o.name}}
                    ></hui-simple-entity-row>
                  </div>
                `):b`<div class="badge-list">
                ${s.map(o=>b`
                    <button
                      type="button"
                      class="badge ${o.active?"badge--active":""}"
                      @click=${()=>this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:o.entityId}}))}
                    >
                      <span class="badge-dot"></span>
                      <span>${o.name}</span>
                    </button>
                  `)}
              </div>`}
        </div>
      </ha-card>
    `}static styles=I`
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
  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",J);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Inner Group Card f\xFCr frei kombinierbare Layouts",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Ut} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
