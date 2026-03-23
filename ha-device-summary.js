var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),pt=new WeakMap,H=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=pt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&pt.set(e,t))}return t}toString(){return this.cssText}},ut=n=>new H(typeof n=="string"?n:n+"",void 0,Z),J=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new H(e,n,Z)},ft=(n,t)=>{if(W)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Q=W?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ut(e)})(n):n;var{is:Ot,defineProperty:Ut,getOwnPropertyDescriptor:Nt,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ht,getPrototypeOf:Tt}=Object,G=globalThis,_t=G.trustedTypes,Lt=_t?_t.emptyScript:"",Dt=G.reactiveElementPolyfillSupport,T=(n,t)=>n,X={toAttribute(n,t){switch(t){case Boolean:n=n?Lt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},gt=(n,t)=>!Ot(n,t),mt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:gt};Symbol.metadata??=Symbol("metadata"),G.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=mt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ut(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Nt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){let l=i?.call(this);o?.call(this,r),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Rt(e),...Ht(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ft(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:X).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:X;this._$Em=i;let l=r.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let r=this.constructor;if(i===!1&&(o=this[t]),s??=r.getPropertyOptions(t),!((s.hasChanged??gt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},r){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),o!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:r}=o,l=this[i];r!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[T("elementProperties")]=new Map,A[T("finalized")]=new Map,Dt?.({ReactiveElement:A}),(G.reactiveElementVersions??=[]).push("2.1.2");var rt=globalThis,$t=n=>n,q=rt.trustedTypes,bt=q?q.createPolicy("lit-html",{createHTML:n=>n}):void 0,St="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,Et="?"+E,zt=`<${Et}>`,P=document,D=()=>P.createComment(""),z=n=>n===null||typeof n!="object"&&typeof n!="function",at=Array.isArray,Bt=n=>at(n)||typeof n?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vt=/-->/g,yt=/>/g,k=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),At=/'/g,wt=/"/g,Ct=/^(?:script|style|textarea|title)$/i,lt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),w=lt(1),te=lt(2),ee=lt(3),O=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),xt=new WeakMap,M=P.createTreeWalker(P,129);function kt(n,t){if(!at(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var It=(n,t)=>{let e=n.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",r=L;for(let l=0;l<e;l++){let a=n[l],c,d,h=-1,f=0;for(;f<a.length&&(r.lastIndex=f,d=r.exec(a),d!==null);)f=r.lastIndex,r===L?d[1]==="!--"?r=vt:d[1]!==void 0?r=yt:d[2]!==void 0?(Ct.test(d[2])&&(i=RegExp("</"+d[2],"g")),r=k):d[3]!==void 0&&(r=k):r===k?d[0]===">"?(r=i??L,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?k:d[3]==='"'?wt:At):r===wt||r===At?r=k:r===vt||r===yt?r=L:(r=k,i=void 0);let b=r===k&&n[l+1].startsWith("/>")?" ":"";o+=r===L?a+zt:h>=0?(s.push(c),a.slice(0,h)+St+a.slice(h)+E+b):a+E+(h===-2?l:b)}return[kt(n,o+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},B=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0,l=t.length-1,a=this.parts,[c,d]=It(t,e);if(this.el=n.createElement(c,s),M.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=M.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(St)){let f=d[r++],b=i.getAttribute(h).split(E),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:v[2],strings:b,ctor:v[1]==="."?st:v[1]==="?"?it:v[1]==="@"?nt:R}),i.removeAttribute(h)}else h.startsWith(E)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(Ct.test(i.tagName)){let h=i.textContent.split(E),f=h.length-1;if(f>0){i.textContent=q?q.emptyScript:"";for(let b=0;b<f;b++)i.append(h[b],D()),M.nextNode(),a.push({type:2,index:++o});i.append(h[f],D())}}}else if(i.nodeType===8)if(i.data===Et)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(E,h+1))!==-1;)a.push({type:7,index:o}),h+=E.length-1}o++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function N(n,t,e=n,s){if(t===O)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=z(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=N(n,i._$AS(n,t.values),i,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);M.currentNode=i;let o=M.nextNode(),r=0,l=0,a=s[0];for(;a!==void 0;){if(r===a.index){let c;a.type===2?c=new I(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new ot(o,this,t)),this._$AV.push(c),a=s[++l]}r!==a?.index&&(o=M.nextNode(),r++)}return M.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},I=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=N(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=B.createElement(kt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new et(i,this),r=o.u(this.options);o.p(e),this.T(r),this._$AH=o}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new B(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new n(this.O(D()),this.O(D()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=$t(t).nextSibling;$t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let o=this.strings,r=!1;if(o===void 0)t=N(this,t,e,0),r=!z(t)||t!==this._$AH&&t!==O,r&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=N(this,l[s+a],e,a),c===O&&(c=this._$AH[a]),r||=!z(c)||c!==this._$AH[a],c===m?t=m:t!==m&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}r&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},it=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},nt=class extends R{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=N(this,t,e,0)??m)===O)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ot=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){N(this,t)}};var jt=rt.litHtmlPolyfillSupport;jt?.(B,I),(rt.litHtmlVersions??=[]).push("3.3.2");var Mt=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new I(t.insertBefore(D(),o),o,void 0,e??{})}return i._$AI(n),i};var ct=globalThis,C=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};C._$litElement$=!0,C.finalized=!0,ct.litElementHydrateSupport?.({LitElement:C});var Ft=ct.litElementPolyfillSupport;Ft?.({LitElement:C});(ct.litElementVersions??=[]).push("4.2.2");var Vt="2.2.0";function Wt(n,t){let e=n?.entities?.[t];return e?!!e.hidden_by:!1}function Gt(n,t,e){let s=n?.states?.[t];if(!s||t.split(".")[0]!=="binary_sensor")return!1;let o=s.attributes?.device_class;return e.includes(o)}function qt(n,t){return!n||t<=0?n||"":n.length<=t?n:`${n.slice(0,Math.max(0,t-1))}...`}function Pt(n){let t=Object.values(n?.floors||{});return t.sort((e,s)=>{let i=e.level,o=s.level;return i!=null&&o!=null&&i!==o?i-o:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function Kt(n,t){return Object.values(n?.areas||{}).filter(e=>e.floor_id===t)}function j(n,t){return(n.friendly||"").localeCompare(t.friendly||"",void 0,{sensitivity:"base"})}function Yt(n,t){let e=[];for(let s of Object.values(n?.entities||{})){let i=s.entity_id;if(Wt(n,i)||!Gt(n,i,t))continue;let o=n?.states?.[i],r=s.area_id||null,l=r?n?.areas?.[r]:null,a=l?.floor_id||null,c=a?n?.floors?.[a]:null;e.push({entity_id:i,state:o?.state??"unknown",friendly:o?.attributes?.friendly_name||i,area_id:r,area_name:l?.name||null,floor_id:a,floor_name:c?.name||null})}return e}function x(n,t){return t.includes(n)}function U(n,t,e){return`${n}/${t} ${e}`}function ht(n,t){let e=Array.isArray(t.device_classes)?t.device_classes:["window"],s=Array.isArray(t.active_states)?t.active_states:["on"],i=t.group_by||"both",o=!!t.show_devices,r=t.count_label||"offen",l=t.unassigned_label||"Ohne Stockwerk",a=t.no_area_label||"Ohne Bereich",c=Number(t.truncate_entity)||0,d=Yt(n,e),h=d.length,f=d.filter(u=>x(u.state,s)).length,b=f>0,v=[];if(i==="floor"){for(let p of Pt(n)){let _=d.filter($=>$.floor_id===p.floor_id);if(!_.length)continue;let g=_.filter($=>x($.state,s)).length;v.push({kind:"floor",title:p.name||p.floor_id,subtitle:U(g,_.length,r),entities:[..._].sort(j),maxName:c})}let u=d.filter(p=>!p.floor_id);if(u.length){let p=u.filter(_=>x(_.state,s)).length;v.push({kind:"floor",title:l,subtitle:U(p,u.length,r),entities:[...u].sort(j),maxName:c})}return{sections:v,sumActive:f,sumTotal:h,openAny:b,showDevices:o,activeStates:s}}if(i==="area"){let u=new Map;for(let p of d){let _=p.area_id||"__none__";u.has(_)||u.set(_,[]),u.get(_).push(p)}for(let[p,_]of u){let g=p==="__none__"?a:n?.areas?.[p]?.name||p,$=_.filter(y=>x(y.state,s)).length;v.push({kind:"area",title:g,subtitle:U($,_.length,r),entities:[..._].sort(j),maxName:c})}return v.sort((p,_)=>(p.title||"").localeCompare(_.title||"",void 0,{sensitivity:"base"})),{sections:v,sumActive:f,sumTotal:h,openAny:b,showDevices:o,activeStates:s}}for(let u of Pt(n)){let p=d.filter(y=>y.floor_id===u.floor_id);if(!p.length)continue;let _=Kt(n,u.floor_id);_.sort((y,S)=>(y.name||"").localeCompare(S.name||"",void 0,{sensitivity:"base"}));let g=[];for(let y of _){let S=d.filter(Y=>Y.area_id===y.area_id);if(!S.length)continue;let K=S.filter(Y=>x(Y.state,s)).length;g.push({title:y.name||y.area_id,subtitle:U(K,S.length,r),entities:[...S].sort(j),maxName:c})}let $=p.filter(y=>x(y.state,s)).length;v.push({kind:"both",title:u.name||u.floor_id,subtitle:U($,p.length,r),children:g,maxName:c})}let F=d.filter(u=>!u.floor_id);if(F.length){let u=new Map;for(let g of F){let $=g.area_id||"__none__";u.has($)||u.set($,[]),u.get($).push(g)}let p=[];for(let[g,$]of u){let y=g==="__none__"?a:n?.areas?.[g]?.name||g,S=$.filter(K=>x(K.state,s)).length;p.push({title:y,subtitle:U(S,$.length,r),entities:[...$].sort(j),maxName:c})}p.sort((g,$)=>(g.title||"").localeCompare($.title||"",void 0,{sensitivity:"base"}));let _=F.filter(g=>x(g.state,s)).length;v.push({kind:"both",title:l,subtitle:U(_,F.length,r),children:p,maxName:c})}return{sections:v,sumActive:f,sumTotal:h,openAny:b,showDevices:o,activeStates:s}}var dt=class extends C{static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"}}setConfig(t){let s={...{title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"},...t};t.truncate_entity===void 0&&t.truncate_areas!=null&&(s.truncate_entity=t.truncate_areas),this.style.removeProperty("grid-column"),this._config=s}getCardSize(){let t=ht(this.hass||{},this._config),e=2;for(let s of t.sections)if(e+=1,s.children&&(e+=s.children.length),t.show_devices){let i=o=>Math.ceil((o.entities?.length||0)/3);if(s.children)for(let o of s.children)e+=i(o);else e+=i(s)}return Math.min(24,Math.max(2,e))}_estimateContentColumns(t){let e=t?.sections||[];if(!e.length)return 6;let s=0,i=0;for(let r of e)if(r.children?.length){s+=Math.max(1,r.children.length);for(let l of r.children)i=Math.max(i,l.entities?.length||0)}else s+=1,i=Math.max(i,r.entities?.length||0);let o=3;return s>=2&&(o=6),s>=5&&(o=9),s>=8&&(o=12),i>=8&&(o=Math.max(o,6)),i>=14&&(o=Math.max(o,9)),i>=24&&(o=12),o}getGridOptions(){let t=ht(this.hass||{},this._config),e=this._estimateContentColumns(t),s=Math.max(2,this.getCardSize());return{columns:e,min_columns:3,max_columns:12,rows:s,min_rows:2}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"group_by",selector:{select:{mode:"dropdown",options:[{value:"floor",label:"Nach Stockwerk"},{value:"area",label:"Nach Bereich"},{value:"both",label:"Stockwerk + Bereich"}]}}},{name:"show_devices",selector:{boolean:{}}},{name:"count_label",selector:{text:{}}},{name:"active_states",selector:{object:{}}},{name:"device_classes",selector:{object:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"truncate_entity",selector:{number:{min:0,max:120,step:1}}},{name:"unassigned_label",selector:{text:{}}},{name:"no_area_label",selector:{text:{}}}]}],computeLabel:t=>({title:"Titel",group_by:"Gruppierung",show_devices:"Ger\xE4te-Badges anzeigen",count_label:"Z\xE4hl-Label",active_states:'Aktive Zust\xE4nde (YAML-Liste, z. B. ["on"])',device_classes:"Device-Classes (YAML-Liste, z. B. [window, door])",truncate_entity:"Text k\xFCrzen ab N Zeichen (0 = aus)",unassigned_label:"Label ohne Stockwerk",no_area_label:"Label ohne Bereich"})[t.name],assertConfig:t=>{if(t.truncate_entity!=null&&Number(t.truncate_entity)<0)throw new Error("truncate_entity muss >= 0 sein.")}}}static getStubConfig(){return{title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0}}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_badge(t,e,s){let i=x(t.state,e),o=s>0?qt(t.friendly,s):t.friendly;return w`
      <button type="button" class="badge ${i?"badge--active":""}" @click=${()=>this._moreInfo(t.entity_id)} title="${t.friendly} (${t.state})">
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${o}</span>
      </button>
    `}_badgesRow(t,e,s){return t?.length?w`<div class="badges">${t.map(i=>this._badge(i,e,s))}</div>`:m}_block(t,e,s){let i=t.maxName??0;return w`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${t.title}</span>
          <span class="meta-chip">${t.subtitle}</span>
        </div>
        ${s?this._badgesRow(t.entities,e,i):""}
      </div>
    `}render(){if(!this.hass)return w`<ha-card><div class="card-content muted">Warte auf Home Assistant...</div></ha-card>`;let t=this._config,e=ht(this.hass,t),{sections:s,sumActive:i,sumTotal:o,openAny:r,showDevices:l,activeStates:a}=e,c=`${i}/${o} ${t.count_label||"offen"}`;return w`
      <ha-card>
        <div class="card-content">
          <div class="header-row">
            <div class="icon-wrap" style="color: ${r?"var(--error-color, #db4437)":"var(--success-color, #43a047)"}"><ha-icon icon=${r?"mdi:window-open":"mdi:window-closed"}></ha-icon></div>
            <div class="header-text">
              <div class="title">${t.title??"Fenster"}</div>
              <div class="subtitle">${c}</div>
            </div>
          </div>

          ${o===0?w`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`:m}

          <div class="sections">
            ${s.map(f=>f.kind==="both"&&f.children?w`
                  <section class="section">
                    <div class="section-head">
                      <span class="section-title">${f.title}</span>
                      <span class="meta-chip">${f.subtitle}</span>
                    </div>
                    ${f.children.map(b=>this._block({...b,maxName:f.maxName},a,l))}
                  </section>
                `:w`<section class="section">${this._block(f,a,l)}</section>`)}
          </div>
        </div>
      </ha-card>
    `}static styles=J`
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
  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",dt);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Status nach Stockwerk & Bereich (Floors/Areas)",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Vt} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
