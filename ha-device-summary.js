var q=globalThis,G=q.ShadowRoot&&(q.ShadyCSS===void 0||q.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),_t=new WeakMap,T=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(G&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=_t.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&_t.set(e,t))}return t}toString(){return this.cssText}},mt=o=>new T(typeof o=="string"?o:o+"",void 0,tt),et=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[n+1],o[0]);return new T(e,o,tt)},gt=(o,t)=>{if(G)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=q.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},st=G?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return mt(e)})(o):o;var{is:Rt,defineProperty:Ht,getOwnPropertyDescriptor:Tt,getOwnPropertyNames:Lt,getOwnPropertySymbols:Bt,getPrototypeOf:Dt}=Object,K=globalThis,bt=K.trustedTypes,zt=bt?bt.emptyScript:"",It=K.reactiveElementPolyfillSupport,L=(o,t)=>o,it={toAttribute(o,t){switch(t){case Boolean:o=o?zt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},vt=(o,t)=>!Rt(o,t),$t={attribute:!0,type:String,converter:it,reflect:!1,useDefault:!1,hasChanged:vt};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ht(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:n}=Tt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let c=i?.call(this);n?.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$t}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;let t=Dt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){let e=this.properties,s=[...Lt(e),...Bt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(st(i))}else t!==void 0&&e.push(st(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let n=(s.converter?.toAttribute!==void 0?s.converter:it).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let n=s.getPropertyOptions(i),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:it;this._$Em=i;let c=r.fromAttribute(e,n.type);this[i]=c??this._$Ej?.get(i)??c,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){let r=this.constructor;if(i===!1&&(n=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??vt)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,n]of s){let{wrapped:r}=n,c=this[i];r!==!0||this._$AL.has(i)||c===void 0||this.C(i,void 0,n,c)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[L("elementProperties")]=new Map,w[L("finalized")]=new Map,It?.({ReactiveElement:w}),(K.reactiveElementVersions??=[]).push("2.1.2");var ht=globalThis,yt=o=>o,Y=ht.trustedTypes,At=Y?Y.createPolicy("lit-html",{createHTML:o=>o}):void 0,kt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Mt="?"+C,jt=`<${Mt}>`,O=document,D=()=>O.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",dt=Array.isArray,Ft=o=>dt(o)||typeof o?.[Symbol.iterator]=="function",ot=`[ 	
\f\r]`,B=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wt=/-->/g,xt=/>/g,M=RegExp(`>|${ot}(?:([^\\s"'>=/]+)(${ot}*=${ot}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),St=/'/g,Et=/"/g,Pt=/^(?:script|style|textarea|title)$/i,pt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),x=pt(1),ne=pt(2),re=pt(3),U=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),Ct=new WeakMap,P=O.createTreeWalker(O,129);function Ot(o,t){if(!dt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}var Vt=(o,t)=>{let e=o.length-1,s=[],i,n=t===2?"<svg>":t===3?"<math>":"",r=B;for(let c=0;c<e;c++){let a=o[c],l,u,d=-1,f=0;for(;f<a.length&&(r.lastIndex=f,u=r.exec(a),u!==null);)f=r.lastIndex,r===B?u[1]==="!--"?r=wt:u[1]!==void 0?r=xt:u[2]!==void 0?(Pt.test(u[2])&&(i=RegExp("</"+u[2],"g")),r=M):u[3]!==void 0&&(r=M):r===M?u[0]===">"?(r=i??B,d=-1):u[1]===void 0?d=-2:(d=r.lastIndex-u[2].length,l=u[1],r=u[3]===void 0?M:u[3]==='"'?Et:St):r===Et||r===St?r=M:r===wt||r===xt?r=B:(r=M,i=void 0);let $=r===M&&o[c+1].startsWith("/>")?" ":"";n+=r===B?a+jt:d>=0?(s.push(l),a.slice(0,d)+kt+a.slice(d)+C+$):a+C+(d===-2?c:$)}return[Ot(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},I=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0,c=t.length-1,a=this.parts,[l,u]=Vt(t,e);if(this.el=o.createElement(l,s),P.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(i=P.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(let d of i.getAttributeNames())if(d.endsWith(kt)){let f=u[r++],$=i.getAttribute(d).split(C),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:v[2],strings:$,ctor:v[1]==="."?rt:v[1]==="?"?at:v[1]==="@"?lt:H}),i.removeAttribute(d)}else d.startsWith(C)&&(a.push({type:6,index:n}),i.removeAttribute(d));if(Pt.test(i.tagName)){let d=i.textContent.split(C),f=d.length-1;if(f>0){i.textContent=Y?Y.emptyScript:"";for(let $=0;$<f;$++)i.append(d[$],D()),P.nextNode(),a.push({type:2,index:++n});i.append(d[f],D())}}}else if(i.nodeType===8)if(i.data===Mt)a.push({type:2,index:n});else{let d=-1;for(;(d=i.data.indexOf(C,d+1))!==-1;)a.push({type:7,index:n}),d+=C.length-1}n++}}static createElement(t,e){let s=O.createElement("template");return s.innerHTML=t,s}};function R(o,t,e=o,s){if(t===U)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,n=z(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=R(o,i._$AS(o,t.values),i,s)),t}var nt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);P.currentNode=i;let n=P.nextNode(),r=0,c=0,a=s[0];for(;a!==void 0;){if(r===a.index){let l;a.type===2?l=new j(n,n.nextSibling,this,t):a.type===1?l=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(l=new ct(n,this,t)),this._$AV.push(l),a=s[++c]}r!==a?.index&&(n=P.nextNode(),r++)}return P.currentNode=O,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==U&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(Ot(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let n=new nt(i,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Ct.get(t.strings);return e===void 0&&Ct.set(t.strings,e=new I(t)),e}k(t){dt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new o(this.O(D()),this.O(D()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=yt(t).nextSibling;yt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let n=this.strings,r=!1;if(n===void 0)t=R(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==U,r&&(this._$AH=t);else{let c=t,a,l;for(t=n[0],a=0;a<n.length-1;a++)l=R(this,c[s+a],e,a),l===U&&(l=this._$AH[a]),r||=!z(l)||l!==this._$AH[a],l===m?t=m:t!==m&&(t+=(l??"")+n[a+1]),this._$AH[a]=l}r&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},rt=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},at=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},lt=class extends H{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===U)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ct=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var Wt=ht.litHtmlPolyfillSupport;Wt?.(I,j),(ht.litHtmlVersions??=[]).push("3.3.2");var Ut=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let n=e?.renderBefore??null;s._$litPart$=i=new j(t.insertBefore(D(),n),n,void 0,e??{})}return i._$AI(o),i};var ut=globalThis,k=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return U}};k._$litElement$=!0,k.finalized=!0,ut.litElementHydrateSupport?.({LitElement:k});var qt=ut.litElementPolyfillSupport;qt?.({LitElement:k});(ut.litElementVersions??=[]).push("4.2.2");var Gt="2.5.0";function Kt(o,t){let e=o?.entities?.[t];return e?!!e.hidden_by:!1}function Yt(o,t,e){let s=o?.states?.[t];if(!s||t.split(".")[0]!=="binary_sensor")return!1;let n=s.attributes?.device_class;return e.includes(n)}function Zt(o,t){return!o||t<=0?o||"":o.length<=t?o:`${o.slice(0,Math.max(0,t-1))}...`}function Jt(o){let t=Object.values(o?.floors||{});return t.sort((e,s)=>{let i=e.level,n=s.level;return i!=null&&n!=null&&i!==n?i-n:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function Qt(o,t){let e=Jt(o),s=new Map(e.map(n=>[n.floor_id,n])),i=Array.isArray(t.floor_ids)?t.floor_ids.map(n=>String(n).trim()).filter(Boolean):[];return i.length?i.map(n=>s.get(n)).filter(Boolean):e}function Xt(o,t){return Object.values(o?.areas||{}).filter(e=>e.floor_id===t)}function F(o,t){return(o.friendly||"").localeCompare(t.friendly||"",void 0,{sensitivity:"base"})}function te(o,t){let e=[];for(let s of Object.values(o?.entities||{})){let i=s.entity_id;if(Kt(o,i)||!Yt(o,i,t))continue;let n=o?.states?.[i],r=s.area_id||null,c=r?o?.areas?.[r]:null,a=c?.floor_id||null,l=a?o?.floors?.[a]:null;e.push({entity_id:i,state:n?.state??"unknown",friendly:n?.attributes?.friendly_name||i,area_id:r,area_name:c?.name||null,floor_id:a,floor_name:l?.name||null})}return e}function S(o,t){return t.includes(o)}function N(o,t,e){return`${o}/${t} ${e}`}function Nt(o,t){let e=Array.isArray(t.device_classes)?t.device_classes:["window"],s=Array.isArray(t.active_states)?t.active_states:["on"],i=t.group_by||"both",n=!!t.show_devices,r=t.count_label||"offen",c=t.unassigned_label||"Ohne Stockwerk",a=t.no_area_label||"Ohne Bereich",l=Number(t.truncate_entity)||0,u=Qt(o,t),d=new Set(u.map(h=>h.floor_id)),f=Array.isArray(t.floor_ids)&&t.floor_ids.length>0,$=te(o,e),v=f?$.filter(h=>h.floor_id&&d.has(h.floor_id)):$,Z=v.length,V=v.filter(h=>S(h.state,s)).length,J=V>0,A=[];if(i==="floor"){for(let p of u){let _=v.filter(b=>b.floor_id===p.floor_id);if(!_.length)continue;let g=_.filter(b=>S(b.state,s)).length;A.push({kind:"floor",title:p.name||p.floor_id,subtitle:N(g,_.length,r),entities:[..._].sort(F),maxName:l})}let h=v.filter(p=>!p.floor_id);if(h.length&&!f){let p=h.filter(_=>S(_.state,s)).length;A.push({kind:"floor",title:c,subtitle:N(p,h.length,r),entities:[...h].sort(F),maxName:l})}return{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:n,activeStates:s}}if(i==="area"){let h=new Map;for(let p of v){let _=p.area_id||"__none__";h.has(_)||h.set(_,[]),h.get(_).push(p)}for(let[p,_]of h){let g=p==="__none__"?a:o?.areas?.[p]?.name||p,b=_.filter(y=>S(y.state,s)).length;A.push({kind:"area",title:g,subtitle:N(b,_.length,r),entities:[..._].sort(F),maxName:l})}return A.sort((p,_)=>(p.title||"").localeCompare(_.title||"",void 0,{sensitivity:"base"})),{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:n,activeStates:s}}for(let h of u){let p=v.filter(y=>y.floor_id===h.floor_id);if(!p.length)continue;let _=Xt(o,h.floor_id);_.sort((y,E)=>(y.name||"").localeCompare(E.name||"",void 0,{sensitivity:"base"}));let g=[];for(let y of _){let E=v.filter(X=>X.area_id===y.area_id);if(!E.length)continue;let Q=E.filter(X=>S(X.state,s)).length;g.push({title:y.name||y.area_id,subtitle:N(Q,E.length,r),entities:[...E].sort(F),maxName:l})}let b=p.filter(y=>S(y.state,s)).length;A.push({kind:"both",title:h.name||h.floor_id,subtitle:N(b,p.length,r),children:g,maxName:l})}let W=v.filter(h=>!h.floor_id);if(W.length&&!f){let h=new Map;for(let g of W){let b=g.area_id||"__none__";h.has(b)||h.set(b,[]),h.get(b).push(g)}let p=[];for(let[g,b]of h){let y=g==="__none__"?a:o?.areas?.[g]?.name||g,E=b.filter(Q=>S(Q.state,s)).length;p.push({title:y,subtitle:N(E,b.length,r),entities:[...b].sort(F),maxName:l})}p.sort((g,b)=>(g.title||"").localeCompare(b.title||"",void 0,{sensitivity:"base"}));let _=W.filter(g=>S(g.state,s)).length;A.push({kind:"both",title:c,subtitle:N(_,W.length,r),children:p,maxName:l})}return{sections:A,sumActive:V,sumTotal:Z,openAny:J,showDevices:n,activeStates:s}}var ft=class extends k{static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Fenster",device_classes:["window"],group_by:"both",floor_ids:[],show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"}}setConfig(t){let s={...{title:"Fenster",device_classes:["window"],group_by:"both",floor_ids:[],show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"},...t};t.truncate_entity===void 0&&t.truncate_areas!=null&&(s.truncate_entity=t.truncate_areas),this.style.removeProperty("grid-column"),this._config=s}getCardSize(){let t=Nt(this.hass||{},this._config),e=2;for(let s of t.sections)if(e+=1,s.children&&(e+=s.children.length),t.show_devices){let i=n=>Math.ceil((n.entities?.length||0)/3);if(s.children)for(let n of s.children)e+=i(n);else e+=i(s)}return Math.min(24,Math.max(2,e))}getGridOptions(){return{columns:"full",rows:Math.max(2,this.getCardSize()),min_rows:2}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"group_by",selector:{select:{mode:"dropdown",options:[{value:"floor",label:"Nach Stockwerk"},{value:"area",label:"Nach Bereich"},{value:"both",label:"Stockwerk + Bereich"}]}}},{name:"floor_ids",selector:{object:{}}},{name:"show_devices",selector:{boolean:{}}},{name:"count_label",selector:{text:{}}},{name:"active_states",selector:{object:{}}},{name:"device_classes",selector:{object:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"truncate_entity",selector:{number:{min:0,max:120,step:1}}},{name:"unassigned_label",selector:{text:{}}},{name:"no_area_label",selector:{text:{}}}]}],computeLabel:t=>({title:"Titel",group_by:"Gruppierung",floor_ids:"Stockwerke filtern (native Floor-IDs aus HA, YAML-Liste)",show_devices:"Ger\xE4te-Badges anzeigen",count_label:"Z\xE4hl-Label",active_states:'Aktive Zust\xE4nde (YAML-Liste, z. B. ["on"])',device_classes:"Device-Classes (YAML-Liste, z. B. [window, door])",truncate_entity:"Text k\xFCrzen ab N Zeichen (0 = aus)",unassigned_label:"Label ohne Stockwerk",no_area_label:"Label ohne Bereich"})[t.name],assertConfig:t=>{if(t.truncate_entity!=null&&Number(t.truncate_entity)<0)throw new Error("truncate_entity muss >= 0 sein.")}}}static getStubConfig(){return{title:"Fenster",device_classes:["window"],group_by:"both",floor_ids:[],show_devices:!0}}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_badge(t,e,s){let i=S(t.state,e),n=s>0?Zt(t.friendly,s):t.friendly;return x`
      <button type="button" class="badge ${i?"badge--active":""}" @click=${()=>this._moreInfo(t.entity_id)} title="${t.friendly} (${t.state})">
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${n}</span>
      </button>
    `}_badgesRow(t,e,s){return t?.length?x`<div class="badges">${t.map(i=>this._badge(i,e,s))}</div>`:m}_block(t,e,s){let i=t.maxName??0;return x`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${t.title}</span>
          <span class="meta-chip">${t.subtitle}</span>
        </div>
        ${s?this._badgesRow(t.entities,e,i):""}
      </div>
    `}render(){if(!this.hass)return x`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;let t=this._config,e=Nt(this.hass,t),{sections:s,sumActive:i,sumTotal:n,openAny:r,showDevices:c,activeStates:a}=e,l=`${i}/${n} ${t.count_label||"offen"}`;return x`
      <ha-card>
        <div class="card-content">
          <div class="header-row">
            <div class="icon-wrap" style="color: ${r?"var(--error-color, #db4437)":"var(--success-color, #43a047)"}"><ha-icon icon=${r?"mdi:window-open":"mdi:window-closed"}></ha-icon></div>
            <div class="header-text">
              <div class="title">${t.title??"Fenster"}</div>
              <div class="subtitle">${l}</div>
            </div>
          </div>

          ${n===0?x`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`:m}

          <div class="sections">
            ${s.map(f=>f.kind==="both"&&f.children?x`
                  <section class="section">
                    <div class="section-head">
                      <span class="section-title">${f.title}</span>
                      <span class="meta-chip">${f.subtitle}</span>
                    </div>
                    ${f.children.map($=>this._block({...$,maxName:f.maxName},a,c))}
                  </section>
                `:x`<section class="section">${this._block(f,a,c)}</section>`)}
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
  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",ft);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Status nach Stockwerk & Bereich (Floors/Areas)",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Gt} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
