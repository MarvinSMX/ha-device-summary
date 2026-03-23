var W=globalThis,q=W.ShadowRoot&&(W.ShadyCSS===void 0||W.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),gt=new WeakMap,H=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(q&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&gt.set(e,t))}return t}toString(){return this.cssText}},bt=n=>new H(typeof n=="string"?n:n+"",void 0,tt),et=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new H(e,n,tt)},$t=(n,t)=>{if(q)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=W.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},st=q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return bt(e)})(n):n;var{is:Tt,defineProperty:Ht,getOwnPropertyDescriptor:Lt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Dt,getPrototypeOf:zt}=Object,K=globalThis,vt=K.trustedTypes,It=vt?vt.emptyScript:"",jt=K.reactiveElementPolyfillSupport,L=(n,t)=>n,it={toAttribute(n,t){switch(t){case Boolean:n=n?It:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},At=(n,t)=>!Tt(n,t),yt={attribute:!0,type:String,converter:it,reflect:!1,useDefault:!1,hasChanged:At};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=yt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ht(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Lt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let a=i?.call(this);o?.call(this,r),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??yt}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let t=zt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let e=this.properties,s=[...Bt(e),...Dt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(st(i))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:it).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:it;this._$Em=i;let a=r.fromAttribute(e,o.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??At)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,o,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[L("elementProperties")]=new Map,w[L("finalized")]=new Map,jt?.({ReactiveElement:w}),(K.reactiveElementVersions??=[]).push("2.1.2");var ht=globalThis,wt=n=>n,Y=ht.trustedTypes,xt=Y?Y.createPolicy("lit-html",{createHTML:n=>n}):void 0,Pt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Ot="?"+C,Ft=`<${Ot}>`,O=document,D=()=>O.createComment(""),z=n=>n===null||typeof n!="object"&&typeof n!="function",dt=Array.isArray,Vt=n=>dt(n)||typeof n?.[Symbol.iterator]=="function",nt=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Et=/>/g,M=RegExp(`>|${nt}(?:([^\\s"'>=/]+)(${nt}*=${nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,kt=/"/g,Ut=/^(?:script|style|textarea|title)$/i,ut=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),x=ut(1),re=ut(2),ae=ut(3),U=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Mt=new WeakMap,P=O.createTreeWalker(O,129);function Nt(n,t){if(!dt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return xt!==void 0?xt.createHTML(t):t}var Gt=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=B;for(let a=0;a<e;a++){let l=n[a],c,p,d=-1,f=0;for(;f<l.length&&(r.lastIndex=f,p=r.exec(l),p!==null);)f=r.lastIndex,r===B?p[1]==="!--"?r=St:p[1]!==void 0?r=Et:p[2]!==void 0?(Ut.test(p[2])&&(i=RegExp("</"+p[2],"g")),r=M):p[3]!==void 0&&(r=M):r===M?p[0]===">"?(r=i??B,d=-1):p[1]===void 0?d=-2:(d=r.lastIndex-p[2].length,c=p[1],r=p[3]===void 0?M:p[3]==='"'?kt:Ct):r===kt||r===Ct?r=M:r===St||r===Et?r=B:(r=M,i=void 0);let $=r===M&&n[a+1].startsWith("/>")?" ":"";o+=r===B?l+Ft:d>=0?(s.push(c),l.slice(0,d)+Pt+l.slice(d)+C+$):l+C+(d===-2?a:$)}return[Nt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},I=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,a=t.length-1,l=this.parts,[c,p]=Gt(t,e);if(this.el=n.createElement(c,s),P.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=P.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(Pt)){let f=p[r++],$=i.getAttribute(d).split(C),v=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?rt:v[1]==="?"?at:v[1]==="@"?lt:T}),i.removeAttribute(d)}else d.startsWith(C)&&(l.push({type:6,index:o}),i.removeAttribute(d));if(Ut.test(i.tagName)){let d=i.textContent.split(C),f=d.length-1;if(f>0){i.textContent=Y?Y.emptyScript:"";for(let $=0;$<f;$++)i.append(d[$],D()),P.nextNode(),l.push({type:2,index:++o});i.append(d[f],D())}}}else if(i.nodeType===8)if(i.data===Ot)l.push({type:2,index:o});else{let d=-1;for(;(d=i.data.indexOf(C,d+1))!==-1;)l.push({type:7,index:o}),d+=C.length-1}o++}}static createElement(t,e){let s=O.createElement("template");return s.innerHTML=t,s}};function R(n,t,e=n,s){if(t===U)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=z(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=R(n,i._$AS(n,t.values),i,s)),t}var ot=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);P.currentNode=i;let o=P.nextNode(),r=0,a=0,l=s[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new j(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new ct(o,this,t)),this._$AV.push(c),l=s[++a]}r!==l?.index&&(o=P.nextNode(),r++)}return P.currentNode=O,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==U&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Vt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(Nt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new ot(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=Mt.get(t.strings);return e===void 0&&Mt.set(t.strings,e=new I(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(D()),this.O(D()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=wt(t).nextSibling;wt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},T=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=R(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==U,r&&(this._$AH=t);else{let a=t,l,c;for(t=o[0],l=0;l<o.length-1;l++)c=R(this,a[s+l],e,l),c===U&&(c=this._$AH[l]),r||=!z(c)||c!==this._$AH[l],c===m?t=m:t!==m&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rt=class extends T{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},at=class extends T{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},lt=class extends T{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===U)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Wt=ht.litHtmlPolyfillSupport;Wt?.(I,j),(ht.litHtmlVersions??=[]).push("3.3.2");var Rt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new j(t.insertBefore(D(),o),o,void 0,e??{})}return i._$AI(n),i};var pt=globalThis,k=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};k._$litElement$=!0,k.finalized=!0,pt.litElementHydrateSupport?.({LitElement:k});var qt=pt.litElementPolyfillSupport;qt?.({LitElement:k});(pt.litElementVersions??=[]).push("4.2.2");var Kt="2.3.0";function Yt(n,t){let e=n?.entities?.[t];return e?!!e.hidden_by:!1}function Zt(n,t,e){let s=n?.states?.[t];if(!s||t.split(".")[0]!=="binary_sensor")return!1;let o=s.attributes?.device_class;return e.includes(o)}function Jt(n,t){return!n||t<=0?n||"":n.length<=t?n:`${n.slice(0,Math.max(0,t-1))}...`}function Qt(n){let t=Object.values(n?.floors||{});return t.sort((e,s)=>{let i=e.level,o=s.level;return i!=null&&o!=null&&i!==o?i-o:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function _t(n){return String(n??"").trim().toLowerCase()}function Xt(n,t){let e=Qt(n),s=new Map(e.map(a=>[a.floor_id,a])),i=Array.isArray(t.building_floor_ids)?t.building_floor_ids.map(a=>String(a).trim()).filter(Boolean):[];if(i.length)return i.map(a=>s.get(a)).filter(Boolean);let o=_t(t.building);if(!o)return e;let r=t.buildings&&typeof t.buildings=="object"&&!Array.isArray(t.buildings)?t.buildings:null;if(r){let a=r[t.building]??r[o];if(Array.isArray(a)&&a.length)return a.map(l=>s.get(String(l))).filter(Boolean)}return e.filter(a=>[a.floor_id,a.name,a.building,a.building_id,a.building_name,...Array.isArray(a.aliases)?a.aliases:[]].map(_t).includes(o))}function te(n,t){return Object.values(n?.areas||{}).filter(e=>e.floor_id===t)}function F(n,t){return(n.friendly||"").localeCompare(t.friendly||"",void 0,{sensitivity:"base"})}function ee(n,t){let e=[];for(let s of Object.values(n?.entities||{})){let i=s.entity_id;if(Yt(n,i)||!Zt(n,i,t))continue;let o=n?.states?.[i],r=s.area_id||null,a=r?n?.areas?.[r]:null,l=a?.floor_id||null,c=l?n?.floors?.[l]:null;e.push({entity_id:i,state:o?.state??"unknown",friendly:o?.attributes?.friendly_name||i,area_id:r,area_name:a?.name||null,floor_id:l,floor_name:c?.name||null})}return e}function S(n,t){return t.includes(n)}function N(n,t,e){return`${n}/${t} ${e}`}function ft(n,t){let e=Array.isArray(t.device_classes)?t.device_classes:["window"],s=Array.isArray(t.active_states)?t.active_states:["on"],i=t.group_by||"both",o=!!t.show_devices,r=t.count_label||"offen",a=t.unassigned_label||"Ohne Stockwerk",l=t.no_area_label||"Ohne Bereich",c=Number(t.truncate_entity)||0,p=Xt(n,t),d=new Set(p.map(h=>h.floor_id)),f=Array.isArray(t.building_floor_ids)&&t.building_floor_ids.length>0?!0:!!_t(t.building),$=ee(n,e),v=f?$.filter(h=>h.floor_id&&d.has(h.floor_id)):$,Z=v.length,V=v.filter(h=>S(h.state,s)).length,J=V>0,A=[];if(i==="floor"){for(let u of p){let _=v.filter(b=>b.floor_id===u.floor_id);if(!_.length)continue;let g=_.filter(b=>S(b.state,s)).length;A.push({kind:"floor",title:u.name||u.floor_id,subtitle:N(g,_.length,r),entities:[..._].sort(F),maxName:c})}let h=v.filter(u=>!u.floor_id);if(h.length&&!f){let u=h.filter(_=>S(_.state,s)).length;A.push({kind:"floor",title:a,subtitle:N(u,h.length,r),entities:[...h].sort(F),maxName:c})}return{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:o,activeStates:s}}if(i==="area"){let h=new Map;for(let u of v){let _=u.area_id||"__none__";h.has(_)||h.set(_,[]),h.get(_).push(u)}for(let[u,_]of h){let g=u==="__none__"?l:n?.areas?.[u]?.name||u,b=_.filter(y=>S(y.state,s)).length;A.push({kind:"area",title:g,subtitle:N(b,_.length,r),entities:[..._].sort(F),maxName:c})}return A.sort((u,_)=>(u.title||"").localeCompare(_.title||"",void 0,{sensitivity:"base"})),{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:o,activeStates:s}}for(let h of p){let u=v.filter(y=>y.floor_id===h.floor_id);if(!u.length)continue;let _=te(n,h.floor_id);_.sort((y,E)=>(y.name||"").localeCompare(E.name||"",void 0,{sensitivity:"base"}));let g=[];for(let y of _){let E=v.filter(X=>X.area_id===y.area_id);if(!E.length)continue;let Q=E.filter(X=>S(X.state,s)).length;g.push({title:y.name||y.area_id,subtitle:N(Q,E.length,r),entities:[...E].sort(F),maxName:c})}let b=u.filter(y=>S(y.state,s)).length;A.push({kind:"both",title:h.name||h.floor_id,subtitle:N(b,u.length,r),children:g,maxName:c})}let G=v.filter(h=>!h.floor_id);if(G.length&&!f){let h=new Map;for(let g of G){let b=g.area_id||"__none__";h.has(b)||h.set(b,[]),h.get(b).push(g)}let u=[];for(let[g,b]of h){let y=g==="__none__"?l:n?.areas?.[g]?.name||g,E=b.filter(Q=>S(Q.state,s)).length;u.push({title:y,subtitle:N(E,b.length,r),entities:[...b].sort(F),maxName:c})}u.sort((g,b)=>(g.title||"").localeCompare(b.title||"",void 0,{sensitivity:"base"}));let _=G.filter(g=>S(g.state,s)).length;A.push({kind:"both",title:a,subtitle:N(_,G.length,r),children:u,maxName:c})}return{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:o,activeStates:s}}var mt=class extends k{static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Fenster",device_classes:["window"],group_by:"both",building:"",building_floor_ids:[],show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"}}setConfig(t){let s={...{title:"Fenster",device_classes:["window"],group_by:"both",building:"",building_floor_ids:[],show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"},...t};t.truncate_entity===void 0&&t.truncate_areas!=null&&(s.truncate_entity=t.truncate_areas),this.style.removeProperty("grid-column"),this._config=s}getCardSize(){let t=ft(this.hass||{},this._config),e=2;for(let s of t.sections)if(e+=1,s.children&&(e+=s.children.length),t.show_devices){let i=o=>Math.ceil((o.entities?.length||0)/3);if(s.children)for(let o of s.children)e+=i(o);else e+=i(s)}return Math.min(24,Math.max(2,e))}_estimateContentColumns(t){let e=t?.sections||[];if(!e.length)return 6;let s=0,i=0;for(let r of e)if(r.children?.length){s+=Math.max(1,r.children.length);for(let a of r.children)i=Math.max(i,a.entities?.length||0)}else s+=1,i=Math.max(i,r.entities?.length||0);let o=3;return s>=2&&(o=6),s>=5&&(o=9),s>=8&&(o=12),i>=8&&(o=Math.max(o,6)),i>=14&&(o=Math.max(o,9)),i>=24&&(o=12),o}getGridOptions(){let t=ft(this.hass||{},this._config),e=this._estimateContentColumns(t),s=Math.max(2,this.getCardSize());return{columns:e,min_columns:3,max_columns:12,rows:s,min_rows:2}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"group_by",selector:{select:{mode:"dropdown",options:[{value:"floor",label:"Nach Stockwerk"},{value:"area",label:"Nach Bereich"},{value:"both",label:"Stockwerk + Bereich"}]}}},{name:"building",selector:{text:{}}},{name:"building_floor_ids",selector:{object:{}}},{name:"show_devices",selector:{boolean:{}}},{name:"count_label",selector:{text:{}}},{name:"active_states",selector:{object:{}}},{name:"device_classes",selector:{object:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"truncate_entity",selector:{number:{min:0,max:120,step:1}}},{name:"unassigned_label",selector:{text:{}}},{name:"no_area_label",selector:{text:{}}}]}],computeLabel:t=>({title:"Titel",group_by:"Gruppierung",building:"Geb\xE4ude (Text/ID/Alias)",building_floor_ids:"Floor-IDs f\xFCr Geb\xE4ude (YAML-Liste, z. B. [eg, og])",show_devices:"Ger\xE4te-Badges anzeigen",count_label:"Z\xE4hl-Label",active_states:'Aktive Zust\xE4nde (YAML-Liste, z. B. ["on"])',device_classes:"Device-Classes (YAML-Liste, z. B. [window, door])",truncate_entity:"Text k\xFCrzen ab N Zeichen (0 = aus)",unassigned_label:"Label ohne Stockwerk",no_area_label:"Label ohne Bereich"})[t.name],assertConfig:t=>{if(t.truncate_entity!=null&&Number(t.truncate_entity)<0)throw new Error("truncate_entity muss >= 0 sein.")}}}static getStubConfig(){return{title:"Fenster",device_classes:["window"],group_by:"both",building:"",building_floor_ids:[],show_devices:!0}}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_badge(t,e,s){let i=S(t.state,e),o=s>0?Jt(t.friendly,s):t.friendly;return x`
      <button type="button" class="badge ${i?"badge--active":""}" @click=${()=>this._moreInfo(t.entity_id)} title="${t.friendly} (${t.state})">
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${o}</span>
      </button>
    `}_badgesRow(t,e,s){return t?.length?x`<div class="badges">${t.map(i=>this._badge(i,e,s))}</div>`:m}_block(t,e,s){let i=t.maxName??0;return x`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${t.title}</span>
          <span class="meta-chip">${t.subtitle}</span>
        </div>
        ${s?this._badgesRow(t.entities,e,i):""}
      </div>
    `}render(){if(!this.hass)return x`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;let t=this._config,e=ft(this.hass,t),{sections:s,sumActive:i,sumTotal:o,openAny:r,showDevices:a,activeStates:l}=e,c=`${i}/${o} ${t.count_label||"offen"}`;return x`
      <ha-card>
        <div class="card-content">
          <div class="header-row">
            <div class="icon-wrap" style="color: ${r?"var(--error-color, #db4437)":"var(--success-color, #43a047)"}"><ha-icon icon=${r?"mdi:window-open":"mdi:window-closed"}></ha-icon></div>
            <div class="header-text">
              <div class="title">${t.title??"Fenster"}</div>
              <div class="subtitle">${c}</div>
            </div>
          </div>

          ${o===0?x`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`:m}

          <div class="sections">
            ${s.map(f=>f.kind==="both"&&f.children?x`
                  <section class="section">
                    <div class="section-head">
                      <span class="section-title">${f.title}</span>
                      <span class="meta-chip">${f.subtitle}</span>
                    </div>
                    ${f.children.map($=>this._block({...$,maxName:f.maxName},l,a))}
                  </section>
                `:x`<section class="section">${this._block(f,l,a)}</section>`)}
          </div>
        </div>
      </ha-card>
    `}static styles=et`
    :host {
      display: block;
      min-width: 0;
      max-width: 100%;
      height: 100%;
    }

    ha-card {
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      overflow: hidden;
      height: 100%;
    }

    .card-content {
      padding: 12px;
      box-sizing: border-box;
      width: 100%;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .icon-wrap {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
      flex-shrink: 0;
    }

    ha-icon {
      --mdc-icon-size: 20px;
    }

    .header-text {
      min-width: 0;
      flex: 1;
    }

    .title {
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
    }

    .subtitle,
    .empty,
    .muted {
      font-size: 12px;
      color: var(--secondary-text-color);
    }

    .sections {
      display: flex;
      flex-direction: column;
      gap: 10px;
      min-width: 0;
      min-height: 0;
      overflow: auto;
      flex: 1 1 auto;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .section-head,
    .block-head {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 8px;
    }

    .section-title,
    .block-title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.2;
      min-width: 0;
      max-width: 100%;
      overflow-wrap: anywhere;
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
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .block {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 8px;
      width: 100%;
      min-width: 0;
    }

    .badge {
      display: inline-flex;
      align-items: flex-start;
      gap: 6px;
      border: none;
      border-radius: 999px;
      padding: 5px 10px;
      margin: 0;
      font: inherit;
      font-size: 12px;
      line-height: 1.3;
      text-align: left;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent);
      cursor: pointer;
      min-width: 0;
      max-width: 100%;
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
  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",mt);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Status nach Stockwerk & Bereich (Floors/Areas)",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Kt} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
