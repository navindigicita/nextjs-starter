(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{5845:function(e,s,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/checkUser",function(){return o(6286)}])},6286:function(e,s,o){"use strict";o.r(s);var r=o(5893),n=o(7294),a=o(1163);s.default=(0,a.withRouter)((function(){var e=(0,a.useRouter)(),s=(0,n.useState)(),o=(s[0],s[1]);return(0,n.useEffect)((function(){console.log("check user",e.query.response,e.query.userData),void 0!==e.query.response&&void 0!==e.query.userData&&function(s,r){var n=JSON.parse(s);console.log("inside check email",n);var a=JSON.parse(n.responseData);if(console.log("user data from checkUser api from auth@@@@@@",a),"00"===n.responseCode){console.log("single user data########",a);var t=a.UserDetails[0].UserID;""!==a.UserDetails[0].PenName&&a.UserDetails[0].PenName.length>0?(localStorage.setItem("UserID",t),e.push("/")):e.push({pathname:"/complete-your-profile",query:{googleData:r,updateCall:t}})}else"01"===n.responseCode?(console.log("inside multiple type account@@@@@"),o("multiple")):"02"===n.responseCode&&(console.log("inside no user found by this mail, 02"),e.push({pathname:"/complete-your-profile",query:{googleData:r}}))}(e.query.response,e.query.userData)}),[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"container"})})}))},1163:function(e,s,o){e.exports=o(387)}},function(e){e.O(0,[774,888,179],(function(){return s=5845,e(e.s=s);var s}));var s=e.O();_N_E=s}]);