(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[973],{4298:function(t,e,i){i(699)},4728:function(t,e,i){"use strict";i.d(e,{xS:function(){return vt},sN:function(){return rt},NA:function(){return ct}});var a=i(2238),s=i(4444),n=i(8463),r=i(3333),o=i(6531);const c="@firebase/installations",u="0.5.12",l=1e4,g="w:0.5.12",h="FIS_v2",f=36e5,d={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},p=new s.LL("installations","Installations",d);function m(t){return t instanceof s.ZR&&t.code.includes("request-failed")}function w({projectId:t}){return`https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`}function v(t){return{token:t.token,requestStatus:2,expiresIn:(e=t.expiresIn,Number(e.replace("s","000"))),creationTime:Date.now()};var e}async function C(t,e){const i=(await e.json()).error;return p.create("request-failed",{requestName:t,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})}function y({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function S(t,{refreshToken:e}){const i=y(t);return i.append("Authorization",function(t){return`FIS_v2 ${t}`}(e)),i}async function _(t){const e=await t();return e.status>=500&&e.status<600?t():e}function T(t){return new Promise((e=>{setTimeout(e,t)}))}const b=/^[cdef][\w-]{21}$/;function I(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const e=function(t){return(e=t,btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var e}(t);return b.test(e)?e:""}catch(t){return""}}function E(t){return`${t.appName}!${t.appId}`}const M=new Map;function k(t,e){const i=E(t);F(i,e),function(t,e){const i=j();i&&i.postMessage({key:t,fid:e});A()}(i,e)}function F(t,e){const i=M.get(t);if(i)for(const a of i)a(e)}let P=null;function j(){return!P&&"BroadcastChannel"in self&&(P=new BroadcastChannel("[Firebase] FID Change"),P.onmessage=t=>{F(t.data.key,t.data.fid)}),P}function A(){0===M.size&&P&&(P.close(),P=null)}const L="firebase-installations-store";let N=null;function D(){return N||(N=(0,o.X3)("firebase-installations-database",1,{upgrade:(t,e)=>{if(0===e)t.createObjectStore(L)}})),N}async function O(t,e){const i=E(t),a=(await D()).transaction(L,"readwrite"),s=a.objectStore(L),n=await s.get(i);return await s.put(e,i),await a.done,n&&n.fid===e.fid||k(t,e.fid),e}async function $(t){const e=E(t),i=(await D()).transaction(L,"readwrite");await i.objectStore(L).delete(e),await i.done}async function q(t,e){const i=E(t),a=(await D()).transaction(L,"readwrite"),s=a.objectStore(L),n=await s.get(i),r=e(n);return void 0===r?await s.delete(i):await s.put(r,i),await a.done,!r||n&&n.fid===r.fid||k(t,r.fid),r}async function K(t){let e;const i=await q(t.appConfig,(i=>{const a=function(t){return z(t||{fid:I(),registrationStatus:0})}(i),s=function(t,e){if(0===e.registrationStatus){if(!navigator.onLine){return{installationEntry:e,registrationPromise:Promise.reject(p.create("app-offline"))}}const i={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},a=async function(t,e){try{const i=await async function({appConfig:t,heartbeatServiceProvider:e},{fid:i}){const a=w(t),s=y(t),n=e.getImmediate({optional:!0});if(n){const t=await n.getHeartbeatsHeader();t&&s.append("x-firebase-client",t)}const r={fid:i,authVersion:h,appId:t.appId,sdkVersion:g},o={method:"POST",headers:s,body:JSON.stringify(r)},c=await _((()=>fetch(a,o)));if(c.ok){const t=await c.json();return{fid:t.fid||i,registrationStatus:2,refreshToken:t.refreshToken,authToken:v(t.authToken)}}throw await C("Create Installation",c)}(t,e);return O(t.appConfig,i)}catch(i){throw m(i)&&409===i.customData.serverCode?await $(t.appConfig):await O(t.appConfig,{fid:e.fid,registrationStatus:0}),i}}(t,i);return{installationEntry:i,registrationPromise:a}}return 1===e.registrationStatus?{installationEntry:e,registrationPromise:x(t)}:{installationEntry:e}}(t,a);return e=s.registrationPromise,s.installationEntry}));return""===i.fid?{installationEntry:await e}:{installationEntry:i,registrationPromise:e}}async function x(t){let e=await R(t.appConfig);for(;1===e.registrationStatus;)await T(100),e=await R(t.appConfig);if(0===e.registrationStatus){const{installationEntry:e,registrationPromise:i}=await K(t);return i||e}return e}function R(t){return q(t,(t=>{if(!t)throw p.create("installation-not-found");return z(t)}))}function z(t){return 1===(e=t).registrationStatus&&e.registrationTime+l<Date.now()?{fid:t.fid,registrationStatus:0}:t;var e}async function U({appConfig:t,heartbeatServiceProvider:e},i){const a=function(t,{fid:e}){return`${w(t)}/${e}/authTokens:generate`}(t,i),s=S(t,i),n=e.getImmediate({optional:!0});if(n){const t=await n.getHeartbeatsHeader();t&&s.append("x-firebase-client",t)}const r={installation:{sdkVersion:g,appId:t.appId}},o={method:"POST",headers:s,body:JSON.stringify(r)},c=await _((()=>fetch(a,o)));if(c.ok){return v(await c.json())}throw await C("Generate Auth Token",c)}async function B(t,e=!1){let i;const a=await q(t.appConfig,(a=>{if(!V(a))throw p.create("not-registered");const s=a.authToken;if(!e&&function(t){return 2===t.requestStatus&&!function(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+f}(t)}(s))return a;if(1===s.requestStatus)return i=async function(t,e){let i=await H(t.appConfig);for(;1===i.authToken.requestStatus;)await T(100),i=await H(t.appConfig);const a=i.authToken;return 0===a.requestStatus?B(t,e):a}(t,e),a;{if(!navigator.onLine)throw p.create("app-offline");const e=function(t){const e={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},t),{authToken:e})}(a);return i=async function(t,e){try{const i=await U(t,e),a=Object.assign(Object.assign({},e),{authToken:i});return await O(t.appConfig,a),i}catch(i){if(!m(i)||401!==i.customData.serverCode&&404!==i.customData.serverCode){const i=Object.assign(Object.assign({},e),{authToken:{requestStatus:0}});await O(t.appConfig,i)}else await $(t.appConfig);throw i}}(t,e),e}}));return i?await i:a.authToken}function H(t){return q(t,(t=>{if(!V(t))throw p.create("not-registered");const e=t.authToken;return 1===(i=e).requestStatus&&i.requestTime+l<Date.now()?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t;var i}))}function V(t){return void 0!==t&&2===t.registrationStatus}async function X(t,e=!1){const i=t;await async function(t){const{registrationPromise:e}=await K(t);e&&await e}(i);return(await B(i,e)).token}function G(t){return p.create("missing-app-config-values",{valueName:t})}const J="installations",Z=t=>{const e=t.getProvider("app").getImmediate(),i=function(t){if(!t||!t.options)throw G("App Configuration");if(!t.name)throw G("App Name");const e=["projectId","apiKey","appId"];for(const i of e)if(!t.options[i])throw G(i);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}(e);return{app:e,appConfig:i,heartbeatServiceProvider:(0,a.qX)(e,"heartbeat"),_delete:()=>Promise.resolve()}},Y=t=>{const e=t.getProvider("app").getImmediate(),i=(0,a.qX)(e,J).getImmediate();return{getId:()=>async function(t){const e=t,{installationEntry:i,registrationPromise:a}=await K(e);return a?a.catch(console.error):B(e).catch(console.error),i.fid}(i),getToken:t=>X(i,t)}};(0,a.Xd)(new n.wA(J,Z,"PUBLIC")),(0,a.Xd)(new n.wA("installations-internal",Y,"PRIVATE")),(0,a.KN)(c,u),(0,a.KN)(c,u,"esm2017");const Q="@firebase/remote-config",W="0.3.11";class tt{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach((t=>t()))}}const et="remote-config",it={"registration-window":"Undefined window object. This SDK only supports usage in a browser environment.","registration-project-id":"Undefined project identifier. Check Firebase app initialization.","registration-api-key":"Undefined API key. Check Firebase app initialization.","registration-app-id":"Undefined app identifier. Check Firebase app initialization.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}.","fetch-client-network":"Fetch client failed to connect to a network. Check Internet connection. Original error: {$originalErrorMessage}.","fetch-timeout":'The config fetch request timed out.  Configure timeout using "fetchTimeoutMillis" SDK setting.',"fetch-throttle":'The config fetch request timed out while in an exponential backoff state. Configure timeout using "fetchTimeoutMillis" SDK setting. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.',"fetch-client-parse":"Fetch client could not parse response. Original error: {$originalErrorMessage}.","fetch-status":"Fetch server returned an HTTP error status. HTTP status: {$httpStatus}.","indexed-db-unavailable":"Indexed DB is not supported by current browser"},at=new s.LL("remoteconfig","Remote Config",it);const st=["1","true","t","yes","y","on"];class nt{constructor(t,e=""){this._source=t,this._value=e}asString(){return this._value}asBoolean(){return"static"!==this._source&&st.indexOf(this._value.toLowerCase())>=0}asNumber(){if("static"===this._source)return 0;let t=Number(this._value);return isNaN(t)&&(t=0),t}getSource(){return this._source}}function rt(t=(0,a.Mq)()){t=(0,s.m9)(t);return(0,a.qX)(t,et).getImmediate()}async function ot(t){const e=(0,s.m9)(t),i=new tt;setTimeout((async()=>{i.abort()}),e.settings.fetchTimeoutMillis);try{await e._client.fetch({cacheMaxAgeMillis:e.settings.minimumFetchIntervalMillis,signal:i}),await e._storageCache.setLastFetchStatus("success")}catch(a){const t=function(t,e){return t instanceof s.ZR&&-1!==t.code.indexOf(e)}(a,"fetch-throttle")?"throttle":"failure";throw await e._storageCache.setLastFetchStatus(t),a}}function ct(t,e){const i=(0,s.m9)(t);i._isInitializationComplete||i._logger.debug(`A value was requested for key "${e}" before SDK initialization completed. Await on ensureInitialized if the intent was to get a previously activated value.`);const a=i._storageCache.getActiveConfig();return a&&void 0!==a[e]?new nt("remote",a[e]):i.defaultConfig&&void 0!==i.defaultConfig[e]?new nt("default",String(i.defaultConfig[e])):(i._logger.debug(`Returning static value for key "${e}". Define a default or remote value if this is unintentional.`),new nt("static"))}class ut{constructor(t,e,i,a){this.client=t,this.storage=e,this.storageCache=i,this.logger=a}isCachedDataFresh(t,e){if(!e)return this.logger.debug("Config fetch cache check. Cache unpopulated."),!1;const i=Date.now()-e,a=i<=t;return this.logger.debug(`Config fetch cache check. Cache age millis: ${i}. Cache max age millis (minimumFetchIntervalMillis setting): ${t}. Is cache hit: ${a}.`),a}async fetch(t){const[e,i]=await Promise.all([this.storage.getLastSuccessfulFetchTimestampMillis(),this.storage.getLastSuccessfulFetchResponse()]);if(i&&this.isCachedDataFresh(t.cacheMaxAgeMillis,e))return i;t.eTag=i&&i.eTag;const a=await this.client.fetch(t),s=[this.storageCache.setLastSuccessfulFetchTimestampMillis(Date.now())];return 200===a.status&&s.push(this.storage.setLastSuccessfulFetchResponse(a)),await Promise.all(s),a}}function lt(t=navigator){return t.languages&&t.languages[0]||t.language}class gt{constructor(t,e,i,a,s,n){this.firebaseInstallations=t,this.sdkVersion=e,this.namespace=i,this.projectId=a,this.apiKey=s,this.appId=n}async fetch(t){var e,i,a;const[s,n]=await Promise.all([this.firebaseInstallations.getId(),this.firebaseInstallations.getToken()]),r=`${window.FIREBASE_REMOTE_CONFIG_URL_BASE||"https://firebaseremoteconfig.googleapis.com"}/v1/projects/${this.projectId}/namespaces/${this.namespace}:fetch?key=${this.apiKey}`,o={"Content-Type":"application/json","Content-Encoding":"gzip","If-None-Match":t.eTag||"*"},c={sdk_version:this.sdkVersion,app_instance_id:s,app_instance_id_token:n,app_id:this.appId,language_code:lt()},u={method:"POST",headers:o,body:JSON.stringify(c)},l=fetch(r,u),g=new Promise(((e,i)=>{t.signal.addEventListener((()=>{const t=new Error("The operation was aborted.");t.name="AbortError",i(t)}))}));let h;try{await Promise.race([l,g]),h=await l}catch(w){let t="fetch-client-network";throw"AbortError"===(null===(e=w)||void 0===e?void 0:e.name)&&(t="fetch-timeout"),at.create(t,{originalErrorMessage:null===(i=w)||void 0===i?void 0:i.message})}let f=h.status;const d=h.headers.get("ETag")||void 0;let p,m;if(200===h.status){let t;try{t=await h.json()}catch(w){throw at.create("fetch-client-parse",{originalErrorMessage:null===(a=w)||void 0===a?void 0:a.message})}p=t.entries,m=t.state}if("INSTANCE_STATE_UNSPECIFIED"===m?f=500:"NO_CHANGE"===m?f=304:"NO_TEMPLATE"!==m&&"EMPTY_CONFIG"!==m||(p={}),304!==f&&200!==f)throw at.create("fetch-status",{httpStatus:f});return{status:f,eTag:d,config:p}}}class ht{constructor(t,e){this.client=t,this.storage=e}async fetch(t){const e=await this.storage.getThrottleMetadata()||{backoffCount:0,throttleEndTimeMillis:Date.now()};return this.attemptFetch(t,e)}async attemptFetch(t,{throttleEndTimeMillis:e,backoffCount:i}){await function(t,e){return new Promise(((i,a)=>{const s=Math.max(e-Date.now(),0),n=setTimeout(i,s);t.addEventListener((()=>{clearTimeout(n),a(at.create("fetch-throttle",{throttleEndTimeMillis:e}))}))}))}(t.signal,e);try{const e=await this.client.fetch(t);return await this.storage.deleteThrottleMetadata(),e}catch(a){if(!function(t){if(!(t instanceof s.ZR)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return 429===e||500===e||503===e||504===e}(a))throw a;const e={throttleEndTimeMillis:Date.now()+(0,s.$s)(i),backoffCount:i+1};return await this.storage.setThrottleMetadata(e),this.attemptFetch(t,e)}}}class ft{constructor(t,e,i,a,s){this.app=t,this._client=e,this._storageCache=i,this._storage=a,this._logger=s,this._isInitializationComplete=!1,this.settings={fetchTimeoutMillis:6e4,minimumFetchIntervalMillis:432e5},this.defaultConfig={}}get fetchTimeMillis(){return this._storageCache.getLastSuccessfulFetchTimestampMillis()||-1}get lastFetchStatus(){return this._storageCache.getLastFetchStatus()||"no-fetch-yet"}}function dt(t,e){var i;const a=t.target.error||void 0;return at.create(e,{originalErrorMessage:a&&(null===(i=a)||void 0===i?void 0:i.message)})}const pt="app_namespace_store";class mt{constructor(t,e,i,a=function(){return new Promise(((t,e)=>{var i;try{const i=indexedDB.open("firebase_remote_config",1);i.onerror=t=>{e(dt(t,"storage-open"))},i.onsuccess=e=>{t(e.target.result)},i.onupgradeneeded=t=>{const e=t.target.result;0===t.oldVersion&&e.createObjectStore(pt,{keyPath:"compositeKey"})}}catch(a){e(at.create("storage-open",{originalErrorMessage:null===(i=a)||void 0===i?void 0:i.message}))}}))}()){this.appId=t,this.appName=e,this.namespace=i,this.openDbPromise=a}getLastFetchStatus(){return this.get("last_fetch_status")}setLastFetchStatus(t){return this.set("last_fetch_status",t)}getLastSuccessfulFetchTimestampMillis(){return this.get("last_successful_fetch_timestamp_millis")}setLastSuccessfulFetchTimestampMillis(t){return this.set("last_successful_fetch_timestamp_millis",t)}getLastSuccessfulFetchResponse(){return this.get("last_successful_fetch_response")}setLastSuccessfulFetchResponse(t){return this.set("last_successful_fetch_response",t)}getActiveConfig(){return this.get("active_config")}setActiveConfig(t){return this.set("active_config",t)}getActiveConfigEtag(){return this.get("active_config_etag")}setActiveConfigEtag(t){return this.set("active_config_etag",t)}getThrottleMetadata(){return this.get("throttle_metadata")}setThrottleMetadata(t){return this.set("throttle_metadata",t)}deleteThrottleMetadata(){return this.delete("throttle_metadata")}async get(t){const e=await this.openDbPromise;return new Promise(((i,a)=>{var s;const n=e.transaction([pt],"readonly").objectStore(pt),r=this.createCompositeKey(t);try{const t=n.get(r);t.onerror=t=>{a(dt(t,"storage-get"))},t.onsuccess=t=>{const e=t.target.result;i(e?e.value:void 0)}}catch(o){a(at.create("storage-get",{originalErrorMessage:null===(s=o)||void 0===s?void 0:s.message}))}}))}async set(t,e){const i=await this.openDbPromise;return new Promise(((a,s)=>{var n;const r=i.transaction([pt],"readwrite").objectStore(pt),o=this.createCompositeKey(t);try{const t=r.put({compositeKey:o,value:e});t.onerror=t=>{s(dt(t,"storage-set"))},t.onsuccess=()=>{a()}}catch(c){s(at.create("storage-set",{originalErrorMessage:null===(n=c)||void 0===n?void 0:n.message}))}}))}async delete(t){const e=await this.openDbPromise;return new Promise(((i,a)=>{var s;const n=e.transaction([pt],"readwrite").objectStore(pt),r=this.createCompositeKey(t);try{const t=n.delete(r);t.onerror=t=>{a(dt(t,"storage-delete"))},t.onsuccess=()=>{i()}}catch(o){a(at.create("storage-delete",{originalErrorMessage:null===(s=o)||void 0===s?void 0:s.message}))}}))}createCompositeKey(t){return[this.appId,this.appName,this.namespace,t].join()}}class wt{constructor(t){this.storage=t}getLastFetchStatus(){return this.lastFetchStatus}getLastSuccessfulFetchTimestampMillis(){return this.lastSuccessfulFetchTimestampMillis}getActiveConfig(){return this.activeConfig}async loadFromStorage(){const t=this.storage.getLastFetchStatus(),e=this.storage.getLastSuccessfulFetchTimestampMillis(),i=this.storage.getActiveConfig(),a=await t;a&&(this.lastFetchStatus=a);const s=await e;s&&(this.lastSuccessfulFetchTimestampMillis=s);const n=await i;n&&(this.activeConfig=n)}setLastFetchStatus(t){return this.lastFetchStatus=t,this.storage.setLastFetchStatus(t)}setLastSuccessfulFetchTimestampMillis(t){return this.lastSuccessfulFetchTimestampMillis=t,this.storage.setLastSuccessfulFetchTimestampMillis(t)}setActiveConfig(t){return this.activeConfig=t,this.storage.setActiveConfig(t)}}async function vt(t){return t=(0,s.m9)(t),await ot(t),async function(t){const e=(0,s.m9)(t),[i,a]=await Promise.all([e._storage.getLastSuccessfulFetchResponse(),e._storage.getActiveConfigEtag()]);return!!(i&&i.config&&i.eTag&&i.eTag!==a)&&(await Promise.all([e._storageCache.setActiveConfig(i.config),e._storage.setActiveConfigEtag(i.eTag)]),!0)}(t)}(0,a.Xd)(new n.wA(et,(function(t,{instanceIdentifier:e}){const i=t.getProvider("app").getImmediate(),n=t.getProvider("installations-internal").getImmediate();if("undefined"===typeof window)throw at.create("registration-window");if(!(0,s.hl)())throw at.create("indexed-db-unavailable");const{projectId:o,apiKey:c,appId:u}=i.options;if(!o)throw at.create("registration-project-id");if(!c)throw at.create("registration-api-key");if(!u)throw at.create("registration-app-id");e=e||"firebase";const l=new mt(u,i.name,e),g=new wt(l),h=new r.Yd(Q);h.logLevel=r.in.ERROR;const f=new gt(n,a.Jn,e,o,c,u),d=new ht(f,l),p=new ut(d,l,g,h),m=new ft(i,p,g,l,h);return function(t){const e=(0,s.m9)(t);e._initializePromise||(e._initializePromise=e._storageCache.loadFromStorage().then((()=>{e._isInitializationComplete=!0}))),e._initializePromise}(m),m}),"PUBLIC").setMultipleInstances(!0)),(0,a.KN)(Q,W),(0,a.KN)(Q,W,"esm2017")}}]);