var V=globalThis,W=V.ShadowRoot&&(V.ShadyCSS===void 0||V.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),dt=new WeakMap,H=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(W&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&dt.set(e,t))}return t}toString(){return this.cssText}},pt=o=>new H(typeof o=="string"?o:o+"",void 0,Z),J=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((s,i,r)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[r+1],o[0]);return new H(e,o,Z)},ut=(o,t)=>{if(W)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=V.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},Q=W?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return pt(e)})(o):o;var{is:Ot,defineProperty:Nt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Rt,getOwnPropertySymbols:Ht,getPrototypeOf:Tt}=Object,K=globalThis,ft=K.trustedTypes,Lt=ft?ft.emptyScript:"",zt=K.reactiveElementPolyfillSupport,T=(o,t)=>o,X={toAttribute(o,t){switch(t){case Boolean:o=o?Lt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},_t=(o,t)=>!Ot(o,t),mt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:_t};Symbol.metadata??=Symbol("metadata"),K.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=mt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Nt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Ut(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let h=i?.call(this);r?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mt}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...Rt(e),...Ht(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:X).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),n=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:X;this._$Em=i;let h=n.fromAttribute(e,r.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let n=this.constructor;if(i===!1&&(r=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??_t)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),r!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:n}=r,h=this[i];n!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,r,h)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[T("elementProperties")]=new Map,x[T("finalized")]=new Map,zt?.({ReactiveElement:x}),(K.reactiveElementVersions??=[]).push("2.1.2");var nt=globalThis,gt=o=>o,q=nt.trustedTypes,bt=q?q.createPolicy("lit-html",{createHTML:o=>o}):void 0,At="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,St="?"+E,Bt=`<${St}>`,P=document,z=()=>P.createComment(""),B=o=>o===null||typeof o!="object"&&typeof o!="function",at=Array.isArray,Dt=o=>at(o)||typeof o?.[Symbol.iterator]=="function",tt=`[ 	
\f\r]`,L=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,vt=/>/g,k=RegExp(`>|${tt}(?:([^\\s"'>=/]+)(${tt}*=${tt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,xt=/"/g,Et=/^(?:script|style|textarea|title)$/i,lt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),w=lt(1),te=lt(2),ee=lt(3),O=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),wt=new WeakMap,M=P.createTreeWalker(P,129);function Ct(o,t){if(!at(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return bt!==void 0?bt.createHTML(t):t}var jt=(o,t)=>{let e=o.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",n=L;for(let h=0;h<e;h++){let a=o[h],l,d,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,d=n.exec(a),d!==null);)f=n.lastIndex,n===L?d[1]==="!--"?n=$t:d[1]!==void 0?n=vt:d[2]!==void 0?(Et.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=k):d[3]!==void 0&&(n=k):n===k?d[0]===">"?(n=i??L,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,l=d[1],n=d[3]===void 0?k:d[3]==='"'?xt:yt):n===xt||n===yt?n=k:n===$t||n===vt?n=L:(n=k,i=void 0);let $=n===k&&o[h+1].startsWith("/>")?" ":"";r+=n===L?a+Bt:c>=0?(s.push(l),a.slice(0,c)+At+a.slice(c)+E+$):a+E+(c===-2?h:$)}return[Ct(o,r+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},D=class o{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,n=0,h=t.length-1,a=this.parts,[l,d]=jt(t,e);if(this.el=o.createElement(l,s),M.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=M.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(At)){let f=d[n++],$=i.getAttribute(c).split(E),v=/([.?@])?(.*)/.exec(f);a.push({type:1,index:r,name:v[2],strings:$,ctor:v[1]==="."?st:v[1]==="?"?it:v[1]==="@"?ot:R}),i.removeAttribute(c)}else c.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(c));if(Et.test(i.tagName)){let c=i.textContent.split(E),f=c.length-1;if(f>0){i.textContent=q?q.emptyScript:"";for(let $=0;$<f;$++)i.append(c[$],z()),M.nextNode(),a.push({type:2,index:++r});i.append(c[f],z())}}}else if(i.nodeType===8)if(i.data===St)a.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(E,c+1))!==-1;)a.push({type:7,index:r}),c+=E.length-1}r++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function U(o,t,e=o,s){if(t===O)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=B(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=U(o,i._$AS(o,t.values),i,s)),t}var et=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);M.currentNode=i;let r=M.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let l;a.type===2?l=new j(r,r.nextSibling,this,t):a.type===1?l=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(l=new rt(r,this,t)),this._$AV.push(l),a=s[++h]}n!==a?.index&&(r=M.nextNode(),n++)}return M.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},j=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),B(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==O&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Dt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&B(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=D.createElement(Ct(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new et(i,this),n=r.u(this.options);r.p(e),this.T(n),this._$AH=r}}_$AC(t){let e=wt.get(t.strings);return e===void 0&&wt.set(t.strings,e=new D(t)),e}k(t){at(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new o(this.O(z()),this.O(z()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=gt(t).nextSibling;gt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},R=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,e=this,s,i){let r=this.strings,n=!1;if(r===void 0)t=U(this,t,e,0),n=!B(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{let h=t,a,l;for(t=r[0],a=0;a<r.length-1;a++)l=U(this,h[s+a],e,a),l===O&&(l=this._$AH[a]),n||=!B(l)||l!==this._$AH[a],l===_?t=_:t!==_&&(t+=(l??"")+r[a+1]),this._$AH[a]=l}n&&!i&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},st=class extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}},it=class extends R{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}},ot=class extends R{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=U(this,t,e,0)??_)===O)return;let s=this._$AH,i=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==_&&(s===_||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},rt=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}};var It=nt.litHtmlPolyfillSupport;It?.(D,j),(nt.litHtmlVersions??=[]).push("3.3.2");var kt=(o,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new j(t.insertBefore(z(),r),r,void 0,e??{})}return i._$AI(o),i};var ct=globalThis,C=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};C._$litElement$=!0,C.finalized=!0,ct.litElementHydrateSupport?.({LitElement:C});var Ft=ct.litElementPolyfillSupport;Ft?.({LitElement:C});(ct.litElementVersions??=[]).push("4.2.2");var Vt="1.6.0";function Wt(o,t){let e=o?.entities?.[t];return e?!!e.hidden_by:!1}function Kt(o,t,e){let s=o?.states?.[t];if(!s||t.split(".")[0]!=="binary_sensor")return!1;let r=s.attributes?.device_class;return e.includes(r)}function qt(o,t){return o?o.length<=t?o:`${o.slice(0,Math.max(0,t-1))}\u2026`:""}function Mt(o){let t=Object.values(o?.floors||{});return t.sort((e,s)=>{let i=e.level,r=s.level;return i!=null&&r!=null&&i!==r?i-r:(e.name||"").localeCompare(s.name||"",void 0,{sensitivity:"base"})}),t}function Gt(o,t){return Object.values(o?.areas||{}).filter(e=>e.floor_id===t)}function I(o,t){return(o.friendly||"").localeCompare(t.friendly||"",void 0,{sensitivity:"base"})}function Yt(o,t){let e=[];for(let s of Object.values(o?.entities||{})){let i=s.entity_id;if(Wt(o,i)||!Kt(o,i,t))continue;let r=o?.states?.[i],n=s.area_id||null,h=n?o?.areas?.[n]:null,a=h?.floor_id||null,l=a?o?.floors?.[a]:null;e.push({entity_id:i,state:r?.state??"unknown",friendly:r?.attributes?.friendly_name||i,area_id:n,area_name:h?.name||null,floor_id:a,floor_name:l?.name||null})}return e}function A(o,t){return t.includes(o)}function N(o,t,e){return`${o}/${t} ${e}`}function Pt(o,t){let e=Array.isArray(t.device_classes)?t.device_classes:["window"],s=Array.isArray(t.active_states)?t.active_states:["on"],i=t.group_by||"both",r=!!t.show_devices,n=t.count_label||"offen",h=t.unassigned_label||"Ohne Stockwerk",a=t.no_area_label||"Ohne Bereich",l=t.truncate_entity==null||t.truncate_entity===""?0:Number(t.truncate_entity)||0,d=Yt(o,e),c=d.length,f=d.filter(u=>A(u.state,s)).length,$=f>0,v=[];if(i==="floor"){for(let p of Mt(o)){let m=d.filter(b=>b.floor_id===p.floor_id);if(!m.length)continue;let g=m.filter(b=>A(b.state,s)).length;v.push({kind:"floor",title:p.name||p.floor_id,subtitle:N(g,m.length,n),entities:[...m].sort(I),maxName:l})}let u=d.filter(p=>!p.floor_id);if(u.length){let p=u.filter(m=>A(m.state,s)).length;v.push({kind:"floor",title:h,subtitle:N(p,u.length,n),entities:[...u].sort(I),maxName:l})}return{sections:v,sumActive:f,sumTotal:c,openAny:$,showDevices:r,activeStates:s}}if(i==="area"){let u=new Map;for(let p of d){let m=p.area_id||"__none__";u.has(m)||u.set(m,[]),u.get(m).push(p)}for(let[p,m]of u){let g=p==="__none__"?a:o?.areas?.[p]?.name||p,b=m.filter(y=>A(y.state,s)).length;v.push({kind:"area",title:g,subtitle:N(b,m.length,n),entities:[...m].sort(I),maxName:l})}return v.sort((p,m)=>(p.title||"").localeCompare(m.title||"",void 0,{sensitivity:"base"})),{sections:v,sumActive:f,sumTotal:c,openAny:$,showDevices:r,activeStates:s}}for(let u of Mt(o)){let p=d.filter(y=>y.floor_id===u.floor_id);if(!p.length)continue;let m=Gt(o,u.floor_id);m.sort((y,S)=>(y.name||"").localeCompare(S.name||"",void 0,{sensitivity:"base"}));let g=[];for(let y of m){let S=d.filter(Y=>Y.area_id===y.area_id);if(!S.length)continue;let G=S.filter(Y=>A(Y.state,s)).length;g.push({title:y.name||y.area_id,subtitle:N(G,S.length,n),entities:[...S].sort(I),maxName:l})}let b=p.filter(y=>A(y.state,s)).length;v.push({kind:"both",title:u.name||u.floor_id,subtitle:N(b,p.length,n),children:g,maxName:l})}let F=d.filter(u=>!u.floor_id);if(F.length){let u=new Map;for(let g of F){let b=g.area_id||"__none__";u.has(b)||u.set(b,[]),u.get(b).push(g)}let p=[];for(let[g,b]of u){let y=g==="__none__"?a:o?.areas?.[g]?.name||g,S=b.filter(G=>A(G.state,s)).length;p.push({title:y,subtitle:N(S,b.length,n),entities:[...b].sort(I),maxName:l})}p.sort((g,b)=>(g.title||"").localeCompare(b.title||"",void 0,{sensitivity:"base"}));let m=F.filter(g=>A(g.state,s)).length;v.push({kind:"both",title:h,subtitle:N(m,F.length,n),children:p,maxName:l})}return{sections:v,sumActive:f,sumTotal:c,openAny:$,showDevices:r,activeStates:s}}var ht=class extends C{static properties={hass:{attribute:!1},_config:{state:!0}};constructor(){super(),this.hass=void 0,this._config={title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,card_columns:1,card_rows:4,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"}}setConfig(t){let s={...{title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,active_states:["on"],count_label:"offen",truncate_entity:0,card_columns:1,card_rows:4,unassigned_label:"Ohne Stockwerk",no_area_label:"Ohne Bereich"},...t};t.truncate_entity===void 0&&t.truncate_areas!=null&&(s.truncate_entity=t.truncate_areas);let i=Math.max(1,Number(s.card_columns)||1);this.style.gridColumn=`span ${i}`,this._config=s}getCardSize(){let t=Pt(this.hass||{},this._config),e=2;for(let s of t.sections)if(e+=1,s.children&&(e+=s.children.length),t.show_devices){let i=()=>2;if(s.children)for(let r of s.children)e+=i(r);else e+=i(s)}return Math.min(24,Math.max(2,e))}getGridOptions(){let t=Math.max(1,Number(this._config?.card_columns)||1),e=Math.min(12,t*3),s=Math.max(2,Number(this._config?.card_rows)||this.getCardSize());return{columns:e,min_columns:3,rows:s,min_rows:2}}static getConfigForm(){return{schema:[{name:"title",selector:{text:{}}},{name:"group_by",selector:{select:{mode:"dropdown",options:[{value:"floor",label:"Nach Stockwerk"},{value:"area",label:"Nach Bereich"},{value:"both",label:"Stockwerk + Bereich"}]}}},{name:"show_devices",selector:{boolean:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"card_columns",selector:{number:{min:1,max:4,step:1}}},{name:"card_rows",selector:{number:{min:2,max:24,step:1}}}]},{name:"count_label",selector:{text:{}}},{name:"active_states",selector:{object:{}}},{name:"device_classes",selector:{object:{}}},{type:"grid",name:"",flatten:!0,schema:[{name:"truncate_entity",selector:{number:{min:0,max:120,step:1}}},{name:"unassigned_label",selector:{text:{}}},{name:"no_area_label",selector:{text:{}}}]}],computeLabel:t=>({title:"Titel",group_by:"Gruppierung",show_devices:"Ger\xE4te-Badges anzeigen",card_columns:"Kartenbreite (Spalten)",card_rows:"Kartenh\xF6he (Rows)",count_label:"Z\xE4hl-Label",active_states:'Aktive Zust\xE4nde (YAML-Liste, z. B. ["on"])',device_classes:"Device-Classes (YAML-Liste, z. B. [window, door])",truncate_entity:"Text k\xFCrzen ab N Zeichen (0 = aus)",unassigned_label:"Label ohne Stockwerk",no_area_label:"Label ohne Bereich"})[t.name],assertConfig:t=>{if(t.card_columns!=null&&Number(t.card_columns)<1)throw new Error("card_columns muss >= 1 sein.");if(t.card_rows!=null&&Number(t.card_rows)<2)throw new Error("card_rows muss >= 2 sein.")}}}static getStubConfig(){return{title:"Fenster",device_classes:["window"],group_by:"both",show_devices:!0,card_columns:2,card_rows:4}}_moreInfo(t){this.dispatchEvent(new CustomEvent("hass-more-info",{bubbles:!0,composed:!0,detail:{entityId:t}}))}_badge(t,e,s){let i=A(t.state,e),r=s>0?qt(t.friendly,s):t.friendly;return w`
      <button
        type="button"
        class="badge ${i?"badge--active":""}"
        @click=${()=>this._moreInfo(t.entity_id)}
        title="${t.friendly} (${t.state})"
      >
        <span class="badge-dot" aria-hidden="true"></span>
        <span class="badge-label">${r}</span>
      </button>
    `}_badgesRow(t,e,s){return t?.length?w`
      <div class="badges">${t.map(i=>this._badge(i,e,s))}</div>
    `:_}_block(t,e,s){let i=t.maxName??0;return w`
      <div class="block">
        <div class="block-head">
          <span class="block-title">${t.title}</span>
          <span class="meta-chip">${t.subtitle}</span>
        </div>
        ${s?this._badgesRow(t.entities,e,i):""}
      </div>
    `}render(){if(!this.hass)return w`<ha-card><div class="pad muted">Warte auf Home Assistant…</div></ha-card>`;let t=this._config,e=Pt(this.hass,t),{sections:s,sumActive:i,sumTotal:r,openAny:n,showDevices:h,activeStates:a}=e,l=`${i}/${r} ${t.count_label||"offen"}`;return w`
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
            ${r===0?w`<div class="empty">Keine passenden Geräte (Filter prüfen).</div>`:_}
            ${s.map(f=>f.kind==="both"&&f.children?w`
                  <div class="section-floor">
                    <div class="floor-head">
                      <span class="floor-title">${f.title}</span>
                      <span class="meta-chip">${f.subtitle}</span>
                    </div>
                    ${f.children.map($=>this._block({...$,maxName:f.maxName},a,h))}
                  </div>
                `:w`
                <div class="section-floor">
                  ${this._block(f,a,h)}
                </div>
              `)}
          </div>
        </div>
      </ha-card>
    `}static styles=J`
    :host {
      display: block;
      height: auto;
      --ha-ds-pad: 10px;
      --ha-ds-gap: 8px;
      --ha-ds-chip-radius: 18px;
      --ha-ds-badge-rows: 2;
      --ha-ds-group-rows: 2;
      grid-column: span 1;
      min-width: 0;
    }

    ha-card {
      height: auto;
      box-sizing: border-box;
      width: 100%;
    }

    .card-inner {
      box-sizing: border-box;
      padding: var(--ha-ds-pad);
      display: flex;
      flex-direction: column;
      gap: var(--ha-ds-gap);
      width: 100%;
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
      width: 100%;
      min-width: 0;
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

  `};customElements.get("ha-device-summary")||customElements.define("ha-device-summary",ht);window.__HA_DEVICE_SUMMARY_REGISTERED||(window.__HA_DEVICE_SUMMARY_REGISTERED=!0,window.customCards=window.customCards||[],window.customCards.push({type:"ha-device-summary",name:"HA Device Summary",description:"Status nach Stockwerk & Bereich (Floors/Areas)",preview:!0}),console.info(`%c HA DEVICE SUMMARY %c v${Vt} `,"color:#fff;font-weight:bold;background:#6d4c41","color:#fff;background:#8d6e63"));
