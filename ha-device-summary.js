var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),dt=new WeakMap,N=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&dt.set(e,t))}return t}toString(){return this.cssText}},pt=o=>new N(typeof o=="string"?o:o+"",void 0,J),Z=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new N(e,o,J)},ut=(o,t)=>{if(W)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},Q=W?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pt(e)})(o):o;var{is:Mt,defineProperty:Ut,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:Ht,getOwnPropertySymbols:Nt,getPrototypeOf:Tt}=Object,q=globalThis,ft=q.trustedTypes,Dt=ft?ft.emptyScript:"",Lt=q.reactiveElementPolyfillSupport,T=(o,t)=>o,X={toAttribute(o,t){switch(t){case Boolean:o=o?Dt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},mt=(o,t)=>!Mt(o,t),_t={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:mt};Symbol.metadata??=Symbol("metadata"),q.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_t){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Ut(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Rt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let h=i?.call(this);r?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_t}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Ht(e),...Nt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:X).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:X;this._$Em=i;let h=n.fromAttribute(e,r.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let n=this.constructor;if(i===!1&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??mt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,h=this[i];n!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[T("elementProperties")]=new Map,A[T("finalized")]=new Map,Lt?.({ReactiveElement:A}),(q.reactiveElementVersions??=[]).push("2.1.2");var nt=globalThis,gt=o=>o,K=nt.trustedTypes,$t=K?K.createPolicy("lit-html",{createHTML:o=>o}):void 0,wt="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Et="?"+S,zt=`<${Et}>`,O=document,L=()=>O.createComment(""),z=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,It=o=>at(o)||typeof o?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vt=/-->/g,yt=/>/g,k=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,At=/"/g,St=/^(?:script|style|textarea|title)$/i,lt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),x=lt(1),te=lt(2),ee=lt(3),M=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),xt=new WeakMap,P=O.createTreeWalker(O,129);function Ct(o,t){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}var Bt=(o,t)=>{let e=o.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",n=D;for(let h=0;h<e;h++){let a=o[h],l,d,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,d=n.exec(a),d!==null);)f=n.lastIndex,n===D?d[1]==="!--"?n=vt:d[1]!==void 0?n=yt:d[2]!==void 0?(St.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=k):d[3]!==void 0&&(n=k):n===k?d[0]===">"?(n=i??D,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?k:d[3]==='"'?At:bt):n===At||n===bt?n=k:n===vt||n===yt?n=D:(n=k,i=void 0);let v=n===k&&o[h+1].startsWith("/>")?" ":"";r+=n===D?a+zt:c>=0?(s.push(l),a.slice(0,c)+wt+a.slice(c)+S+v):a+S+(c===-2?h:v)}return[Ct(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},I=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0,h=t.length-1,a=this.parts,[l,d]=Bt(t,e);if(this.el=o.createElement(l,s),P.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=P.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(wt)){let f=d[n++],v=i.getAttribute(c).split(S),y=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:y[2],strings:v,ctor:y[1]==="."?st:y[1]==="?"?it:y[1]==="@"?ot:H}),i.removeAttribute(c)}else c.startsWith(S)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(St.test(i.tagName)){let c=i.textContent.split(S),f=c.length-1;if(f>0){i.textContent=K?K.emptyScript:"";for(let v=0;v<f;v++)i.append(c[v],L()),P.nextNode(),a.push({type:2,index:++r});i.append(c[f],L())}}}else if(i.nodeType===8)if(i.data===Et)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(S,c+1))!==-1;)a.push({type:7,index:r}),c+=S.length-1}r++}}static createElement(t,e){let s=O.createElement("template");return s.innerHTML=t,s}};function R(o,t,e=o,s){if(t===M)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=z(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=R(o,i._$AS(o,t.values),i,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??O).importNode(e,!0);P.currentNode=i;let r=P.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new B(r,r.nextSibling,this,t):a.type===1?l=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(l=new rt(r,this,t)),this._$AV.push(l),a=s[++h]}n!==a?.index&&(r=P.nextNode(),n++)}return P.currentNode=O,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},B=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=R(this,t,e),z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):It(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&z(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=I.createElement(Ct(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new et(i,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new I(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new o(this.O(L()),this.O(L()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=gt(t).nextSibling;gt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}_$AI(t,e=this,s,i){let r=this.strings,n=!1;if(r===void 0)t=R(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==M,n&&(this._$AH=t);else{let h=t,a,l;for(t=r[0],a=0;a<r.length-1;a++)l=R(this,h[s+a],e,a),l===M&&(l=this._$AH[a]),n||=!z(l)||l!==this._$AH[a],l===m?t=m:t!==m&&(t+=(l??"")+r[a+1]),this._$AH[a]=l}n&&!i&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},it=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},ot=class extends H{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=R(this,t,e,0)??m)===M)return;let s=this._$AH,i=t===m&&s!==m||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==m&&(s===m||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){R(this,t)}};var jt=nt.litHtmlPolyfillSupport;jt?.(I,B),(nt.litHtmlVersions??=[]).push("3.3.2");var kt=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new B(t.insertBefore(L(),r),r,void 0,e??{})}return i._$AI(o),i};var ct=globalThis,C=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};C._$litElement$=!0,C.finalized=!0,ct.litElementHydrateSupport?.({LitElement:C});var Ft=ct.litElementPolyfillSupport;Ft?.({LitElement:C});(ct.litElementVersions??=[]).push("4.2.2");var Vt="1.1.0";function Wt(o,t){let e=o?.entities?.[t];return e?!!e.hidden_by:!1}function qt(o,t,e){let s=o?.states?.[t];if(!s||t.split(".")[0]!=="binary_sensor")return!1;let r=s.attributes?.device_class;return e.includes(r)}function Kt(o,t){return o?o.length<=t?o:`${o.slice(0,Math.max(0,t-1))}\u2026`:""}function Pt(o){let t=Object.values(o?.floors||{});return t.sort((e,s)=>{let i=e.level,r=s.level;return i!=null&&r!=null&&i!==r?i-r:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function Gt(o,t){return Object.values(o?.areas||{}).filter(e=>e.floor_id===t)}function j(o,t){return(o.friendly||"").localeCompare(t.friendly||"",void 0,{sensitivity:"base"})}function Yt(o,t){let e=[];for(let s of Object.values(o?.entities||{})){let i=s.entity_id;if(Wt(o,i)||!qt(o,i,t))continue;let r=o?.states?.[i],n=s.area_id||null,h=n?o?.areas?.[n]:null,a=h?.floor_id||null,l=a?o?.floors?.[a]:null;e.push({entity_id:i,state:r?.state??"unknown",friendly:r?.attributes?.friendly_name||i,area_id:n,area_name:h?.name||null,floor_id:a,floor_name:l?.name||null})}return e}function w(o,t){return t.includes(o)}function U(o,t,e){return`${o}/${t} ${e}`}function Ot(o,t){let e=Array.isArray(t.device_classes)?t.device_classes:["window"],s=Array.isArray(t.active_states)?t.active_states:["on"],i=t.group_by||"both",r=!!t.show_devices,n=t.count_label||"offen",h=t.unassigned_label||"Ohne Stockwerk",a=t.no_area_label||"Ohne Bereich",l=t.truncate_entity??22,d=Yt(o,e),c=d.length,f=d.filter(u=>w(u.state,s)).length,v=f>0,y=[];if(i==="floor"){for(let p of Pt(o)){let _=d.filter($=>$.floor_id===p.floor_id);if(!_.length)continue;let g=_.filter($=>w($.state,s)).length;y.push({kind:"floor",title:p.name||p.floor_id,subtitle:U(g,_.length,n),entities:[..._].sort(j),maxName:l})}let u=d.filter(p=>!p.floor_id);if(u.length){let p=u.filter(_=>w(_.state,s)).length;y.push({kind:"floor",title:h,subtitle:U(p,u.length,n),entities:[...u].sort(j),maxName:l})}return{sections:y,sumActive:f,sumTotal:c,openAny:v,showDevices:r,activeStates:s}}if(i==="area"){let u=new Map;for(let p of d){let _=p.area_id||"__none__";u.has(_)||u.set(_,[]),u.get(_).push(p)}for(let[p,_]of u){let g=p==="__none__"?a:o?.areas?.[p]?.name||p,$=_.filter(b=>w(b.state,s)).length;y.push({kind:"area",title:g,subtitle:U($,_.length,n),entities:[..._].sort(j),maxName:l})}return y.sort((p,_)=>(p.title||"").localeCompare(_.title||"",void 0,{sensitivity:"base"})),{sections:y,sumActive:f,sumTotal:c,openAny:v,showDevices:r,activeStates:s}}for(let u of Pt(o)){let p=d.filter(b=>b.floor_id===u.floor_id);if(!p.length)continue;let _=Gt(o,u.floor_id);_.sort((b,E)=>(b.name||"").localeCompare(E.name||"",void 0,{sensitivity:"base"}));let g=[];for(let b of _){let E=d.filter(Y=>Y.area_id===b.area_id);if(!E.length)continue;let G=E.filter(Y=>w(Y.state,s)).length;g.push({title:b.name||b.area_id,subtitle:U(G,E.length,n),entities:[...E].sort(j),maxName:l})}let $=p.filter(b=>w(b.state,s)).length;y.push({kind:"both",title:u.name||u.floor_id,subtitle:U($,p.length,n),children:g,maxName:l})}let F=d.filter(u=>!u.floor_id);if(F.length){let u=new Map;for(let g of F){let $=g.area_id||"__none__";u.has($)||u.set($,[]),u.get($).push(g)}let p=[];for(let[g,$]of u){let b=g==="__none__"?a:o?.areas?.[g]?.name||g,E=$.filter(G=>w(G.state,s)).length;p.push({title:b,subtitle:U(E,$.length,n),entities:[...$].sort(j),maxName:l})}p.sort((g,$)=>(g.title||"").localeCompare($.title||"",void 0,{sensitivity:"base"}));let _=F.filter(g=>w(g.state,s)).length;y.push({kind:"both",title:h,subtitle:U(_,F.length,n),children:p,maxName:l})}return{sections:y,sumActive:f,sumTotal:c,openAny:v,showDevices:r,activeStates:s}}var ht=class extends C{static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_areas:14,truncate_entity:22,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"}}setConfig(t){this._config={title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_areas:14,truncate_entity:22,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich",...t},this._config.truncate_entity==null&&this._config.truncate_areas!=null&&(this._config.truncate_entity=this._config.truncate_areas)}getCardSize(){let t=Ot(this.hass||{},this._config),e=2;for(let s of t.sections)if(e+=1,s.children&&(e+=s.children.length),t.show_devices){let i=r=>Math.ceil((r.entities?.length||0)/4);if(s.children)for(let r of s.children)e+=i(r);else e+=i(s)}return Math.min(24,Math.max(2,e))}static getStubConfig(){return{title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0}}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_badge(t,e,s){let i=w(t.state,e),r=Kt(t.friendly,s);return x`
      <button
        type="button"
        class="badge ${i?"badge--active":""}"
        @click=${()=>this._moreInfo(t.entity_id)}
      >
        ${r}
      </button>
    `}_badgesRow(t,e,s){return t?.length?x`
      <div class="badges">${t.map(i=>this._badge(i,e,s))}</div>
    `:m}_block(t,e,s){let i=t.maxName??22;return x`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${t.title}</span>
          <span class="block-sub">${t.subtitle}</span>
        </div>
        ${s?this._badgesRow(t.entities,e,i):""}
      </div>
    `}render(){if(!this.hass)return x`<ha-card><div class="pad muted">Warte auf Home Assistant…</div></ha-card>`;let t=this._config,e=Ot(this.hass,t),{sections:s,sumActive:i,sumTotal:r,openAny:n,showDevices:h,activeStates:a}=e,l=`${i}/${r} ${t.count_label||"offen"}`;return x`
      <ha-card>
        <div class="card-inner">
          <div class="row">
            <div class="icon-wrap" style="color: ${n?"var(--error-color, #db4437)":"var(--success-color, #43a047)"}">
              <ha-icon icon=${n?"mdi:window-open":"mdi:window-closed"}></ha-icon>
            </div>
            <div class="text">
              <div class="primary">${t.title??"Fenster"}</div>
              <div class="summary-line">${l}</div>
            </div>
          </div>
          <div class="sections">
            ${r===0?x`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`:m}
            ${s.map(f=>f.kind==="both"&&f.children?x`
                  <div class="section-floor">
                    <div class="floor-head">
                      <span class="floor-title">${f.title}</span>
                      <span class="floor-sub">${f.subtitle}</span>
                    </div>
                    ${f.children.map(v=>this._block({...v,maxName:f.maxName},a,h))}
                  </div>
                `:x`
                <div class="section-floor">
                  ${this._block(f,a,h)}
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}static styles=Z`
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
  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",ht);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Status nach Stockwerk & Bereich (Floors/Areas)",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Vt} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
