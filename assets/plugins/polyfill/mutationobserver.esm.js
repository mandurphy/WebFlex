/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/mutation-observer@1.0.3/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,t=window.WeakMap;if(void 0===t){var r=Object.defineProperty,i=Date.now()%1e9;(t=function(){this.name="__st"+(1e9*Math.random()>>>0)+i+++"__"}).prototype={set:function(e,t){var i=e[this.name];return i&&i[0]===e?i[1]=t:r(e,this.name,{value:[e,t],writable:!0}),this},get:function(e){var t;return(t=e[this.name])&&t[0]===e?t[1]:void 0},delete:function(e){var t=e[this.name];if(!t)return!1;var r=t[0]===e;return t[0]=t[1]=void 0,r},has:function(e){var t=e[this.name];return!!t&&t[0]===e}}}var a=new t,n=window.msSetImmediate;if(!n){var s=[],o=String(Math.random());window.addEventListener("message",(function(e){if(e.data===o){var t=s;s=[],t.forEach((function(e){e()}))}})),n=function(e){s.push(e),window.postMessage(o,"*")}}var d=!1,u=[];function h(){d=!1;var e=u;u=[],e.sort((function(e,t){return e.uid_-t.uid_}));var t=!1;e.forEach((function(e){var r=e.takeRecords();!function(e){e.nodes_.forEach((function(t){var r=a.get(t);r&&r.forEach((function(t){t.observer===e&&t.removeTransientObservers()}))}))}(e),r.length&&(e.callback_(r,e),t=!0)})),t&&h()}function v(e,t){for(var r=e;r;r=r.parentNode){var i=a.get(r);if(i)for(var n=0;n<i.length;n++){var s=i[n],o=s.options;if(r===e||o.subtree){var d=t(o);d&&s.enqueue(d)}}}}var c,l,f=0;function b(e){this.callback_=e,this.nodes_=[],this.records_=[],this.uid_=++f}function p(e,t){this.type=e,this.target=t,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function m(e,t){return c=new p(e,t)}function g(e){return l||((r=new p((t=c).type,t.target)).addedNodes=t.addedNodes.slice(),r.removedNodes=t.removedNodes.slice(),r.previousSibling=t.previousSibling,r.nextSibling=t.nextSibling,r.attributeName=t.attributeName,r.attributeNamespace=t.attributeNamespace,r.oldValue=t.oldValue,(l=r).oldValue=e,l);var t,r}function O(e,t){return e===t?e:l&&((r=e)===l||r===c)?l:null;var r}function N(e,t,r){this.observer=e,this.target=t,this.options=r,this.transientObservedNodes=[]}b.prototype={observe:function(e,t){var r;if(r=e,e=window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(r)||r,!t.childList&&!t.attributes&&!t.characterData||t.attributeOldValue&&!t.attributes||t.attributeFilter&&t.attributeFilter.length&&!t.attributes||t.characterDataOldValue&&!t.characterData)throw new SyntaxError;var i,n=a.get(e);n||a.set(e,n=[]);for(var s=0;s<n.length;s++)if(n[s].observer===this){(i=n[s]).removeListeners(),i.options=t;break}i||(i=new N(this,e,t),n.push(i),this.nodes_.push(e)),i.addListeners()},disconnect:function(){this.nodes_.forEach((function(e){for(var t=a.get(e),r=0;r<t.length;r++){var i=t[r];if(i.observer===this){i.removeListeners(),t.splice(r,1);break}}}),this),this.records_=[]},takeRecords:function(){var e=this.records_;return this.records_=[],e}},N.prototype={enqueue:function(e){var t,r=this.observer.records_,i=r.length;if(r.length>0){var a=O(r[i-1],e);if(a)return void(r[i-1]=a)}else t=this.observer,u.push(t),d||(d=!0,n(h));r[i]=e},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(e){var t=this.options;t.attributes&&e.addEventListener("DOMAttrModified",this,!0),t.characterData&&e.addEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.addEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(e){var t=this.options;t.attributes&&e.removeEventListener("DOMAttrModified",this,!0),t.characterData&&e.removeEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.removeEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(e){if(e!==this.target){this.addListeners_(e),this.transientObservedNodes.push(e);var t=a.get(e);t||a.set(e,t=[]),t.push(this)}},removeTransientObservers:function(){var e=this.transientObservedNodes;this.transientObservedNodes=[],e.forEach((function(e){this.removeListeners_(e);for(var t=a.get(e),r=0;r<t.length;r++)if(t[r]===this){t.splice(r,1);break}}),this)},handleEvent:function(e){switch(e.stopImmediatePropagation(),e.type){case"DOMAttrModified":var t=e.attrName,r=e.relatedNode.namespaceURI,i=e.target;(n=new m("attributes",i)).attributeName=t,n.attributeNamespace=r;var a=null;"undefined"!=typeof MutationEvent&&e.attrChange===MutationEvent.ADDITION||(a=e.prevValue),v(i,(function(e){if(e.attributes&&(!e.attributeFilter||!e.attributeFilter.length||-1!==e.attributeFilter.indexOf(t)||-1!==e.attributeFilter.indexOf(r)))return e.attributeOldValue?g(a):n}));break;case"DOMCharacterDataModified":var n=m("characterData",i=e.target);a=e.prevValue;v(i,(function(e){if(e.characterData)return e.characterDataOldValue?g(a):n}));break;case"DOMNodeRemoved":this.addTransientObserver(e.target);case"DOMNodeInserted":i=e.relatedNode;var s,o,d=e.target;"DOMNodeInserted"===e.type?(s=[d],o=[]):(s=[],o=[d]);var u=d.previousSibling,h=d.nextSibling;(n=m("childList",i)).addedNodes=s,n.removedNodes=o,n.previousSibling=u,n.nextSibling=h,v(i,(function(e){if(e.childList)return n}))}c=l=void 0}},e||(e=b);var w=e;export{w as default};
//# sourceMappingURL=/sm/23c36de05fef71668fa60363232050766978696334430c3d7911cb80ff425f22.map
