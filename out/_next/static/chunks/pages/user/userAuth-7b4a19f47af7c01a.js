(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[285],{9533:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/userAuth",function(){return n(9408)}])},3157:function(e,t,n){"use strict";n.d(t,{F:function(){return r},R:function(){return o}});var a=n(7294),r=(0,a.createContext)("https://thinklyapi.azurewebsites.net/api/"),o=(0,a.createContext)("https://thinkly.me/thinklyapi/api/")},9408:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var a=n(5893),r=n(7294),o=n(6388),s=n.n(o),i=n(5477),c=n(3157),u=n(1163),l=function(e){var t=(0,u.useRouter)(),n=(0,r.useContext)(c.R);return(0,r.useEffect)((function(){if(!(void 0!==localStorage.getItem("accessToken")?JSON.parse(localStorage.getItem("accessToken")):localStorage.clear()))return t.push("/login");var e=void 0!==localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):localStorage.clear();void 0!==e&&null!==e&&""!==e?function(e){console.log("inside checkEmail api email_id and signIn_status",e.email);var a={method:"POST",data:{EmailID:e.email,MobileNo:""}};s()("".concat(n,"User/CheckUser"),a).then((function(n){console.log("CheckUser response",n.data),t.push({pathname:"/user/checkUser",query:{response:JSON.stringify(n.data),userData:JSON.stringify(e)}})})).catch((function(e){console.log(e)}))}(e):t.push("/login")}),[]),(0,a.jsx)("div",{className:"grid place-items-center h-screen",children:(0,a.jsx)(i.Z,{"aria-label":"Loading..."})})}}},function(e){e.O(0,[649,67,774,888,179],(function(){return t=9533,e(e.s=t);var t}));var t=e.O();_N_E=t}]);