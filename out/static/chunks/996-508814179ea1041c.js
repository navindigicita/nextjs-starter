(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[996],{1210:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getDomainLocale=function(e,t,n,r){return!1};("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8418:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;n(5753).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o,u=(o=n(7294))&&o.__esModule?o:{default:o},a=n(6273),l=n(2725),f=n(3462),c=n(1018),i=n(7190),s=n(1210),d=n(8684);var p="undefined"!==typeof u.default.useTransition,v={};function y(e,t,n,r){if(e&&a.isLocalURL(t)){e.prefetch(t,n,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;v[t+"%"+n+(o?"%"+o:"")]=!0}}var b=u.default.forwardRef((function(e,t){var n,o=e.href,b=e.as,_=e.children,h=e.prefetch,g=e.passHref,C=e.replace,M=e.soft,x=e.shallow,j=e.scroll,m=e.locale,O=e.onClick,R=e.onMouseEnter,E=e.legacyBehavior,k=void 0===E?!0!==Boolean(!1):E,L=function(e,t){if(null==e)return{};var n,r,o={},u=Object.keys(e);for(r=0;r<u.length;r++)n=u[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["href","as","children","prefetch","passHref","replace","soft","shallow","scroll","locale","onClick","onMouseEnter","legacyBehavior"]);n=_,!k||"string"!==typeof n&&"number"!==typeof n||(n=u.default.createElement("a",null,n));var P=!1!==h,w=r(p?u.default.useTransition():[],2)[1],A=u.default.useContext(f.RouterContext),I=u.default.useContext(c.AppRouterContext);I&&(A=I);var T,U=u.default.useMemo((function(){var e=r(a.resolveHref(A,o,!0),2),t=e[0],n=e[1];return{href:t,as:b?a.resolveHref(A,b):n||t}}),[A,o,b]),B=U.href,D=U.as,H=u.default.useRef(B),K=u.default.useRef(D);k&&(T=u.default.Children.only(n));var N=k?T&&"object"===typeof T&&T.ref:t,F=r(i.useIntersection({rootMargin:"200px"}),3),S=F[0],Z=F[1],q=F[2],z=u.default.useCallback((function(e){K.current===D&&H.current===B||(q(),K.current=D,H.current=B),S(e),N&&("function"===typeof N?N(e):"object"===typeof N&&(N.current=e))}),[D,N,B,q,S]);u.default.useEffect((function(){var e=Z&&P&&a.isLocalURL(B),t="undefined"!==typeof m?m:A&&A.locale,n=v[B+"%"+D+(t?"%"+t:"")];e&&!n&&y(A,B,D,{locale:t})}),[D,B,Z,m,P,A]);var G={ref:z,onClick:function(e){k||"function"!==typeof O||O(e),k&&T.props&&"function"===typeof T.props.onClick&&T.props.onClick(e),e.defaultPrevented||function(e,t,n,r,o,u,l,f,c,i){if("A"!==e.currentTarget.nodeName.toUpperCase()||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&a.isLocalURL(n)){e.preventDefault();var s=function(){"softPush"in t&&"softReplace"in t?t[u?o?"softReplace":"softPush":o?"replace":"push"](n):t[o?"replace":"push"](n,r,{shallow:l,locale:c,scroll:f})};i?i(s):s()}}(e,A,B,D,C,M,x,j,m,I?w:void 0)},onMouseEnter:function(e){k||"function"!==typeof R||R(e),k&&T.props&&"function"===typeof T.props.onMouseEnter&&T.props.onMouseEnter(e),a.isLocalURL(B)&&y(A,B,D,{priority:!0})}};if(!k||g||"a"===T.type&&!("href"in T.props)){var J="undefined"!==typeof m?m:A&&A.locale,Q=A&&A.isLocaleDomain&&s.getDomainLocale(D,J,A.locales,A.domainLocales);G.href=Q||d.addBasePath(l.addLocale(D,J,A&&A.defaultLocale))}return k?u.default.cloneElement(T,G):u.default.createElement("a",Object.assign({},L,G),n)}));t.default=b,("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},7190:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4941).Z;Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootRef,n=e.rootMargin,c=e.disabled||!a,i=o.useRef(),s=r(o.useState(!1),2),d=s[0],p=s[1],v=r(o.useState(null),2),y=v[0],b=v[1];o.useEffect((function(){if(a){if(i.current&&(i.current(),i.current=void 0),c||d)return;return y&&y.tagName&&(i.current=function(e,t,n){var r=function(e){var t,n={root:e.root||null,margin:e.rootMargin||""},r=f.find((function(e){return e.root===n.root&&e.margin===n.margin}));if(r&&(t=l.get(r)))return t;var o=new Map,u=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return t={id:n,observer:u,elements:o},f.push(n),l.set(n,t),t}(n),o=r.id,u=r.observer,a=r.elements;return a.set(e,t),u.observe(e),function(){if(a.delete(e),u.unobserve(e),0===a.size){u.disconnect(),l.delete(o);var t=f.findIndex((function(e){return e.root===o.root&&e.margin===o.margin}));t>-1&&f.splice(t,1)}}}(y,(function(e){return e&&p(e)}),{root:null==t?void 0:t.current,rootMargin:n})),function(){null==i.current||i.current(),i.current=void 0}}if(!d){var e=u.requestIdleCallback((function(){return p(!0)}));return function(){return u.cancelIdleCallback(e)}}}),[y,c,n,t,d]);var _=o.useCallback((function(){p(!1)}),[]);return[b,d,_]};var o=n(7294),u=n(9311),a="function"===typeof IntersectionObserver;var l=new Map,f=[];("function"===typeof t.default||"object"===typeof t.default&&null!==t.default)&&"undefined"===typeof t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1018:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FullAppTreeContext=t.AppTreeContext=t.AppRouterContext=void 0;var r,o=(r=n(7294))&&r.__esModule?r:{default:r};var u=o.default.createContext(null);t.AppRouterContext=u;var a=o.default.createContext(null);t.AppTreeContext=a;var l=o.default.createContext(null);t.FullAppTreeContext=l},9008:function(e,t,n){e.exports=n(5443)},1664:function(e,t,n){e.exports=n(8418)}}]);