import{P as $,h as F,F as D,i as L,p as k,r as g,e as T,w as O,O as H,b as M,d as U}from"./index.7ffa0279.js";function b(e,t,...n){if(e in t){let o=t[e];return typeof o=="function"?o(...n):o}let r=new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(o=>`"${o}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(r,b),r}var C=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(C||{}),I=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(I||{});function R({visible:e=!0,features:t=0,ourProps:n,theirProps:r,...o}){var l;let u=W(r,n),a=Object.assign(o,{props:u});if(e||t&2&&u.static)return v(a);if(t&1){let s=(l=u.unmount)==null||l?0:1;return b(s,{[0](){return null},[1](){return v({...o,props:{...u,hidden:!0,style:{display:"none"}}})}})}return v(a)}function v({props:e,attrs:t,slots:n,slot:r,name:o}){var l;let{as:u,...a}=_(e,["unmount","static"]),s=(l=n.default)==null?void 0:l.call(n,r),f={};if(r){let i=!1,d=[];for(let[c,p]of Object.entries(r))typeof p=="boolean"&&(i=!0),p===!0&&d.push(c);i&&(f["data-headlessui-state"]=d.join(" "))}if(u==="template"){if(s=E(s!=null?s:[]),Object.keys(a).length>0||Object.keys(t).length>0){let[i,...d]=s!=null?s:[];if(!B(i)||d.length>0)throw new Error(['Passing props on "template"!',"",`The current component <${o} /> is rendering a "template".`,"However we need to passthrough the following props:",Object.keys(a).concat(Object.keys(t)).sort((c,p)=>c.localeCompare(p)).map(c=>`  - ${c}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',"Render a single element as the child so that we can forward the props onto that element."].map(c=>`  - ${c}`).join(`
`)].join(`
`));return $(i,Object.assign({},a,f))}return Array.isArray(s)&&s.length===1?s[0]:s}return F(u,Object.assign({},a,f),s)}function E(e){return e.flatMap(t=>t.type===D?E(t.children):[t])}function W(...e){if(e.length===0)return{};if(e.length===1)return e[0];let t={},n={};for(let r of e)for(let o in r)o.startsWith("on")&&typeof r[o]=="function"?(n[o]!=null||(n[o]=[]),n[o].push(r[o])):t[o]=r[o];if(t.disabled||t["aria-disabled"])return Object.assign(t,Object.fromEntries(Object.keys(n).map(r=>[r,void 0])));for(let r in n)Object.assign(t,{[r](o,...l){let u=n[r];for(let a of u){if(o instanceof Event&&o.defaultPrevented)return;a(o,...l)}}});return t}function le(e){let t=Object.assign({},e);for(let n in t)t[n]===void 0&&delete t[n];return t}function _(e,t=[]){let n=Object.assign({},e);for(let r of t)r in n&&delete n[r];return n}function B(e){return e==null?!1:typeof e.type=="string"||typeof e.type=="object"||typeof e.type=="function"}let G=0;function V(){return++G}function ue(){return V()}var q=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(q||{});function m(e){var t;return e==null||e.value==null?null:(t=e.value.$el)!=null?t:e.value}let P=Symbol("Context");var Y=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Y||{});function ae(){return z()!==null}function z(){return L(P,null)}function ie(e){k(P,e)}function y(e,t){if(e)return e;let n=t!=null?t:"button";if(typeof n=="string"&&n.toLowerCase()==="button")return"button"}function se(e,t){let n=g(y(e.value.type,e.value.as));return T(()=>{n.value=y(e.value.type,e.value.as)}),O(()=>{var r;n.value||!m(t)||m(t)instanceof HTMLButtonElement&&!((r=m(t))!=null&&r.hasAttribute("type"))&&(n.value="button")}),n}const j=typeof window=="undefined"||typeof document=="undefined";function A(e){if(j)return null;if(e instanceof Node)return e.ownerDocument;if(e!=null&&e.hasOwnProperty("value")){let t=m(e);if(t)return t.ownerDocument}return document}let w=["[contentEditable=true]","[tabindex]","a[href]","area[href]","button:not([disabled])","iframe","input:not([disabled])","select:not([disabled])","textarea:not([disabled])"].map(e=>`${e}:not([tabindex='-1'])`).join(",");var J=(e=>(e[e.First=1]="First",e[e.Previous=2]="Previous",e[e.Next=4]="Next",e[e.Last=8]="Last",e[e.WrapAround=16]="WrapAround",e[e.NoScroll=32]="NoScroll",e))(J||{}),K=(e=>(e[e.Error=0]="Error",e[e.Overflow=1]="Overflow",e[e.Success=2]="Success",e[e.Underflow=3]="Underflow",e))(K||{}),Q=(e=>(e[e.Previous=-1]="Previous",e[e.Next=1]="Next",e))(Q||{});function N(e=document.body){return e==null?[]:Array.from(e.querySelectorAll(w))}var x=(e=>(e[e.Strict=0]="Strict",e[e.Loose=1]="Loose",e))(x||{});function S(e,t=0){var n;return e===((n=A(e))==null?void 0:n.body)?!1:b(t,{[0](){return e.matches(w)},[1](){let r=e;for(;r!==null;){if(r.matches(w))return!0;r=r.parentElement}return!1}})}function ce(e){let t=A(e);H(()=>{t&&!S(t.activeElement,0)&&X(e)})}function X(e){e==null||e.focus({preventScroll:!0})}let Z=["textarea","input"].join(",");function ee(e){var t,n;return(n=(t=e==null?void 0:e.matches)==null?void 0:t.call(e,Z))!=null?n:!1}function te(e,t=n=>n){return e.slice().sort((n,r)=>{let o=t(n),l=t(r);if(o===null||l===null)return 0;let u=o.compareDocumentPosition(l);return u&Node.DOCUMENT_POSITION_FOLLOWING?-1:u&Node.DOCUMENT_POSITION_PRECEDING?1:0})}function fe(e,t){return ne(N(),t,!0,e)}function ne(e,t,n=!0,r=null){var o;let l=(o=Array.isArray(e)?e.length>0?e[0].ownerDocument:document:e==null?void 0:e.ownerDocument)!=null?o:document,u=Array.isArray(e)?n?te(e):e:N(e);r=r!=null?r:l.activeElement;let a=(()=>{if(t&5)return 1;if(t&10)return-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),s=(()=>{if(t&1)return 0;if(t&2)return Math.max(0,u.indexOf(r))-1;if(t&4)return Math.max(0,u.indexOf(r))+1;if(t&8)return u.length-1;throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last")})(),f=t&32?{preventScroll:!0}:{},i=0,d=u.length,c;do{if(i>=d||i+d<=0)return 0;let p=s+i;if(t&16)p=(p+d)%d;else{if(p<0)return 3;if(p>=d)return 1}c=u[p],c==null||c.focus(f),i+=a}while(c!==l.activeElement);return t&6&&ee(c)&&c.select(),c.hasAttribute("tabindex")||c.setAttribute("tabindex","0"),2}function h(e,t,n){j||O(r=>{document.addEventListener(e,t,n),r(()=>document.removeEventListener(e,t,n))})}function de(e,t,n=M(()=>!0)){function r(l,u){if(!n.value||l.defaultPrevented)return;let a=u(l);if(a===null||!a.ownerDocument.documentElement.contains(a))return;let s=function f(i){return typeof i=="function"?f(i()):Array.isArray(i)||i instanceof Set?i:[i]}(e);for(let f of s){if(f===null)continue;let i=f instanceof HTMLElement?f:m(f);if(i!=null&&i.contains(a))return}return!S(a,x.Loose)&&a.tabIndex!==-1&&l.preventDefault(),t(l,a)}let o=g(null);h("mousedown",l=>{var u,a;n.value&&(o.value=((a=(u=l.composedPath)==null?void 0:u.call(l))==null?void 0:a[0])||l.target)},!0),h("click",l=>{!o.value||(r(l,()=>o.value),o.value=null)},!0),h("blur",l=>r(l,()=>window.document.activeElement instanceof HTMLIFrameElement?window.document.activeElement:null),!0)}var re=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(re||{});let pe=U({name:"Hidden",props:{as:{type:[Object,String],default:"div"},features:{type:Number,default:1}},setup(e,{slots:t,attrs:n}){return()=>{let{features:r,...o}=e,l={"aria-hidden":(r&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(r&4)===4&&(r&2)!==2&&{display:"none"}}};return R({ourProps:l,theirProps:o,slot:{},attrs:n,slots:t,name:"Hidden"})}}});export{ce as D,x as F,J as M,K as N,I as O,R as P,C as R,le as V,re as a,se as b,q as c,ne as d,j as e,pe as f,X as g,ae as h,ie as i,S as j,te as k,Y as l,A as m,m as o,z as p,ue as t,b as u,fe as v,_ as w,de as y};
