(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(551)}])},551:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return L}});var o=s(7568),a=s(4051),n=s.n(a),r=s(5893),i=(s(9008),s(7294)),l=s(5477),c=s(5518),d=s(6388),u=s.n(d),p=s(1163),h=s(3157),f=s(4728),m=s(3158),x=function(){var e=(0,o.Z)(n().mark((function e(){var t,s,o;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=(0,f.sN)(m.H),e.next=3,(0,f.xS)(t);case 3:if(s=e.sent,console.log("ThinklyConfiguration remote config from firebase@@@@@",s),s){e.next=10;break}return o=(0,f.NA)(t,"ThinklyConfiguration"),e.abrupt("return",o._value);case 10:console.log("remoteConfig not found in firebase");case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=s(2410),y=s(7265),j=s(2456),v=s(1980),b=s(1637),w=s(5675),N=s.n(w),D=function(e){var t=(0,i.useState)(),s=t[0],o=t[1],a=(0,i.useState)(),n=(a[0],a[1],(0,i.useState)()),c=n[0],d=n[1],u=(0,i.useState)(0),p=u[0],h=u[1],f=(0,i.useState)(!1),m=f[0],x=f[1],g=(0,i.useState)(!1),w=(g[0],g[1]),D=(0,i.useState)(),k=D[0],I=D[1],S=(0,i.useState)(),T=S[0],C=S[1];(0,i.useEffect)((function(){console.log("props data successed",e.profileJson),void 0!==e.profileJson&&void 0!==e.supporterData&&(console.log("props data successed",e.profileJson),o(e.profileJson),C(e.supporterData))}),[]),(0,i.useEffect)((function(){if(void 0!==s&&null!==s){var e=s.profileDetails.aboutMe,t=e.slice(0,20)+(e.length>20?"...":"");d(t),w(s.profileDetails.isPartialProfile);var o=s.profileDetails.penName,a="@"===o.charAt(0)?o.substring(1):o;I("https://uat.stars.thinkly.me/"+a)}}),[s]);return(0,r.jsx)(r.Fragment,{children:void 0!==s&&null!==s?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"row",onClick:function(){return function(){var e=s.profileDetails.penName,t="@"===e.charAt(0)?e.substring(1):e;window.open("/".concat(t),"_blank").penName=t}()},style:{cursor:"pointer"},children:[void 0!==s.profileDetails.profileImage&&null!==s.profileDetails.profileImage?(0,r.jsx)(N(),{src:"@"===s.profileDetails.profileImage.charAt(0)?s.profileDetails.profileImage.substring(1):s.profileDetails.profileImage,alt:"user profile",height:50,width:50,style:{borderRadius:"50%"}}):(0,r.jsx)(y.Z,{style:{width:"50px",height:"50px"},src:(0,r.jsx)(b.Z,{})}),(0,r.jsx)(j.Z,{style:{marginTop:"7px",marginLeft:"15px"},primary:(0,r.jsxs)("div",{style:{lineHeight:"1",fontSize:"18px"},children:[(0,r.jsxs)("span",{className:"header-font",children:[" ",(0,r.jsx)("b",{children:s.profileDetails.firstName+" "+s.profileDetails.lastName})," "]})," "]}),secondary:(0,r.jsx)("span",{style:{fontSize:"14px"},children:c})})]}),(0,r.jsxs)("div",{className:"row mt-4",children:[(0,r.jsx)("div",{className:"col-1 p-0",children:(0,r.jsx)(N(),{src:"/bio-link.svg",alt:"Bio_link",height:25,width:25})}),(0,r.jsxs)("div",{className:"col-11",style:{lineHeight:"0.9"},children:[(0,r.jsx)("a",{style:{fontSize:"12px",color:"#3c7493",overflowWrap:"break-word"},id:"userShareUrl",children:k})," ",(0,r.jsx)("br",{}),(0,r.jsx)("a",{style:{fontSize:"12px",color:"#e98c37",fontWeight:"500",cursor:"pointer"},onClick:function(){navigator.clipboard.writeText(k).then((function(){console.log("Copied!",k),x(!0),setTimeout((function(){x(!1)}),2e3)}),(function(){console.log("Copy error")}))},children:m?"Copied":"Copy Link"})]})]}),(0,r.jsx)("div",{className:"row mt-4",children:(0,r.jsx)("div",{className:"col-12",style:{width:"auto",paddingLeft:"0px",paddingRight:"0px"},children:(0,r.jsxs)(v.Z,{className:"p-2 mt-2",style:{fontSize:"16px",fontWeight:"500",cursor:"pointer",background:"#ffe7cc"},id:"dashboard",selected:0===p,onClick:function(t){return s=0,o="Dashboard",console.log("thinkly type item index",s),h(s),e.profileDetail(o),void(0===s?(document.getElementById("publication").style.background="#fff",document.getElementById("thinkly").style.background="#fff",document.getElementById("dashboard").style.background="#ffe7cc"):1===s?(document.getElementById("dashboard").style.background="#fff",document.getElementById("thinkly").style.background="#fff",document.getElementById("publication").style.background="#ffe7cc"):2===s&&(document.getElementById("dashboard").style.background="#fff",document.getElementById("publication").style.background="#fff",document.getElementById("thinkly").style.background="#ffe7cc"));var s,o},children:[(0,r.jsx)("text",{children:"My True-fans"}),(0,r.jsx)("text",{className:"float-right",children:void 0!==T&&T.TotalSupporters})]})})})]}):(0,r.jsx)(l.Z,{"aria-label":"Loading..."})})},k=s(797),I=s(9755),S=s.n(I),T=s(1328),C=s(8227),E=function(e){var t=(0,i.useState)(!1),s=t[0],o=t[1],a=(0,i.useState)(e.authorID),n=a[0];a[1];return(0,i.useEffect)((function(){console.log("propsData value in no data page@@@",n)}),[n]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)("text",{className:"fs-15",children:"WELCOME TO"}),(0,r.jsx)("h2",{className:"fs-30",children:"Thinkly Lite"}),(0,r.jsx)("p",{className:"fs-20",children:"One stop solution for all your creator needs"}),(0,r.jsx)(N(),{src:"/social-tree_rafiki.svg",alt:"noData",style:{width:"auto",height:"280px"}}),(0,r.jsx)("h5",{className:"my-3 fs-20 mb-2",children:"Create a publication to post a Thinkly"}),(0,r.jsx)("button",{className:"fw-bold border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto w-50","data-toggle":"modal","data-target":"#newPublication",onClick:function(){return o(!0)},children:"New Publication"})]}),s&&(0,r.jsx)(C.Z,{authorID:n})]})},Z=function(e){var t=function(e){var t={method:"POST",headers:{"Content-Type":"application/json",DeviceID:"123456",UserID:e},data:{UserID:e,ThinklyID:"",StartIndex:w,EndIndex:C}};u()("".concat(s,"Thinkly/GetUserThinklies"),t).then((function(e){console.log("user thinkly list",e.data),"00"===e.data.responseCode?(L(e.data.responseData),v(!1)):"03"===e.data.responseCode&&(A(!0),v(!1))})).catch((function(e){console.log("GetUserThinklies error in catch",e)}))},s=(0,i.useContext)(h.F),o=(0,i.useState)([]),a=o[0],n=o[1],c=(0,i.useState)(),d=c[0],p=c[1],f=(0,i.useState)(),m=f[0],x=f[1],g=(0,i.useState)(!1),y=g[0],v=g[1],b=(0,i.useState)(0),w=b[0],D=b[1],I=(0,i.useState)(10),C=I[0],Z=I[1],U=(0,i.useState)(!1),P=U[0],A=U[1],F=(0,i.useState)(!1),q=F[0],_=F[1],J=(0,i.useState)(0),B=J[0],R=J[1];(0,i.useEffect)((function(){void 0!==e.authorID&&(console.log("props author ID inside feed page@@@",e.authorID,e.thinklyConfigJSON),p(e.authorID),x(e.thinklyConfigJSON),t(e.authorID))}),[]),(0,i.useEffect)((function(){console.log("startIndexValue",w,"endIndexValue",C),void 0!==d&&t(d)}),[w,C]);var L=function(e){n((function(t){return(0,k.Z)(t).concat((0,k.Z)(e))})),null!==e&&(v(!0),D(C),Z(C+10))};return(0,r.jsxs)(r.Fragment,{children:[void 0!==a&&null!==a&&a.length>0?(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("h3",{children:"My Posts"})," ",(0,r.jsx)("hr",{}),a.map((function(e,t){var s=e.postData.postImages[0],o="",a=new Date(e.postData.postUpdatedDateTime),n=(new Date).getTime()-a.getTime(),i=parseFloat(n/864e5).toFixed(2);if(Math.floor(i)<1){var l=n/36e5,c=Math.abs(Math.round(l));o=c>1?c+" hours ago":c+" hour ago"}else{o=Math.floor(i)+" days ago"}return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"row",children:[(0,r.jsx)("div",{className:"col-md-10",children:(0,r.jsx)(j.Z,{primary:(0,r.jsx)("span",{className:"ff-lora fs-18 fw-bold",children:e.postData.postTitle}),secondary:(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"fs-12 fc-link",children:e.postData.subcategoryname.replaceAll(","," | ")})," ",(0,r.jsx)("br",{}),(0,r.jsx)("p",{className:"fs-10",children:o})]})})}),(0,r.jsxs)("div",{className:"col-md-2",children:[(0,r.jsx)("span",{style:{fontSize:"30px",marginLeft:"69px"},onClick:function(){return function(e){_(!1),console.log("inside post action",e),S()(".".concat(e)).addClass("dropdown-post"),"none"===S()(".dropdown-post").css("display")?S()(".dropdown-post").css("display","block"):(console.log("inside else to remove call"),S()(".dropdown-post").css("display","none"),S()(".".concat(e)).removeClass("dropdown-post"))}(t)},children:"..."}),(0,r.jsx)("div",{className:"".concat(t),style:{display:"none"},children:(0,r.jsx)("a",{onClick:function(){return t=e.postData.postID,console.log("post id",t),S()(".dropdown-post").css("display","none"),S()(".".concat(t)).removeClass("dropdown-post"),R(t),void _(!0);var t},children:"Edit"})}),void 0!==e.postData.postImages&&e.postData.postImages.length>0&&(0,r.jsx)(N(),{alt:"thinkly Image",src:"@"===s.charAt(0)?s.substring(1):s,style:{width:"80px",height:"80px",objectFit:"cover",objectPosition:"center",borderRadius:"4px",float:"right"}})]}),(0,r.jsx)("div",{className:"col-md-12",children:(0,r.jsx)("p",{className:"fs-15 pointer",id:"thinkly-content",onClick:function(){return e.postData.postTitle,e.postData.postID,t=e.postData.postURL,void window.open(t);var t},dangerouslySetInnerHTML:{__html:e.postData.postDescription.slice(0,370)+(e.postData.postDescription.length>370?"<b> ...read more</b>":"")}})})]},t),(0,r.jsx)("hr",{})]})}))]}):!0===P?(0,r.jsx)(E,{}):(0,r.jsx)("div",{style:{padding:"150px 0px",textAlign:"center"},children:(0,r.jsx)(l.Z,{"aria-label":"Loading..."})}),y&&(0,r.jsx)("div",{style:{padding:"150px 0px",textAlign:"center"},children:(0,r.jsx)(l.Z,{"aria-label":"Loading..."})}),q?(0,r.jsx)(T.Z,{authorID:d,thinklyRemoteConfigData:m,thinklyID:B}):""]})},U=s(8439),P=function(e){var t=function(e){var t={method:"POST",headers:{"Content-Type":"application/json",DeviceID:"123456",UserID:e},data:{UserID:e,StartIndex:I,EndIndex:C}};u()("".concat(s,"User/GetUserPublications/"),t).then((function(e){console.log("setPublicationByAuthorData @@@@@@@@",e),"00"===e.data.responseCode?(P(e.data.responseData),w(!1)):"03"===e.data.responseCode&&(console.log("inside no record"),x(!0),w(!1))})).catch((function(e){console.log("setPublicationByAuthorData error in catch",e)}))},s=(0,i.useContext)(h.F),o=(0,i.useState)(),a=o[0],n=o[1],c=(0,i.useState)([]),d=c[0],p=c[1],f=(0,i.useState)(!1),m=f[0],x=f[1],g=(0,i.useState)(!1),v=g[0],w=g[1],D=(0,i.useState)(0),I=D[0],S=D[1],T=(0,i.useState)(10),C=T[0],Z=T[1];(0,i.useEffect)((function(){void 0!==e.authorID&&null!==e.authorID&&(console.log("inside publication page props data of author ID@@@",e.authorID),n(e.authorID),t(e.authorID))}),[]),(0,i.useEffect)((function(){console.log("startIndexValue",I,"endIndexValue",C),void 0!==a&&t(a)}),[I,C]);var P=function(e){p((function(t){return(0,k.Z)(t).concat((0,k.Z)(e))})),null!==e&&(w(!0),S(C),Z(C+10))};(0,i.useEffect)((function(){console.log(d)}),[d]);return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"container",children:[void 0!==d&&d.length>0?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h3",{children:"My Publications"})," ",(0,r.jsx)("hr",{}),d.map((function(e,t){var s="@"===e.penName.charAt(0)?e.penName.substring(1):e.penName;return(0,r.jsx)(U.Z,{className:"mt-4",children:(0,r.jsxs)("div",{className:"row cursor",onClick:function(){return e=s,console.log(e),void window.open("/publication/".concat(e),"_blank");var e},children:[(0,r.jsx)("div",{className:"col-1",children:void 0!==e.publicationImage?(0,r.jsx)(N(),{alt:"publication Image",style:{width:"50px",height:"50px",objectFit:"cover"},src:"@"===e.publicationImage.charAt(0)?e.publicationImage.substring(1):e.publicationImage}):(0,r.jsx)(y.Z,{style:{width:"120px",height:"120px"},src:(0,r.jsx)(b.Z,{})})}),(0,r.jsx)("div",{className:"col-8 ml-3",children:(0,r.jsx)(j.Z,{primary:(0,r.jsx)("span",{className:"ff-lora fs-18",children:e.publicationName}),secondary:(0,r.jsx)("text",{className:"ff-roboto fs-15",children:e.about})})})]})},t)}))]}):!0===m?(0,r.jsx)(E,{authorID:a}):(0,r.jsx)("div",{style:{padding:"150px 0px",textAlign:"center"},children:(0,r.jsx)(l.Z,{"aria-label":"Loading..."})}),v&&(0,r.jsxs)("div",{style:{padding:"10px 0px",textAlign:"center"},children:[" ",(0,r.jsx)(l.Z,{"aria-label":"Loading..."})," "]})]})})},A=s(7752),F=s(7838),q=s(2143),_=s(3966),J=[{question:"Who is a True-fan?",ans:"A True-fan is a true believer in the creator's work. A True-fan wants to invest in the creator and would often want to share endorsement and financial support in the form of Thinkly stars."},{question:"How does monetization with Thinkly work?",ans:"Thinkly allows True-fans to support creators by thanking them with Thinkly stars. Stars can be bought easily using the Thinkly payment gateway and gets credited to the creator's reward store instantly."},{question:"How much money can True-fans support with, monthly?",ans:"While, we dont have any limit - a good idea will be to begin with whatever you are comfortable with. Most of our True-fans would typically support their favorite creators with INR 200-1000 from time to time."},{question:"What are the options to pay?",ans:"The Thinkly payment options are flexible, You can do a bank transfer, use your credit or debit card - or easiest of all, just simply use UPI with google pay, phonepay etc"},{question:"Can I support multiple creators?",ans:"Of course you can. The world of tomorrow gets better with independent creators rising and flourishing. The creator economy needs you."},{question:"What is the proof that the money reached the content-creator?",ans:"You will get a personalized thank you from the creator(s) , each time you thank them with Thinkly Stars."},{question:"Where do I reach out for support?",ans:"We are available 24/7 and across 365 days with our friendly email support. Write to us at stars@thinkly.me and one of us would reach out to you asap."}],B=function(){var e=(0,i.useState)(J),t=e[0];e[1];return(0,r.jsx)("div",{className:"row",children:(0,r.jsxs)("div",{className:"col-12",children:[(0,r.jsx)("p",{className:"font-weight-bold fs-30",children:" FAQs"}),t.map((function(e,t){return(0,r.jsxs)(v.Z,{className:"mb-4",style:{boxShadow:"none"},children:[(0,r.jsx)("p",{className:"fw-bold fs-20",children:e.question}),(0,r.jsx)("p",{className:"fs-18",children:e.ans})]},t)}))]})})},R=function(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,s=(0,i.useContext)(h.R),o=(0,i.useState)(),a=o[0],n=o[1],d=(0,i.useState)(),p=d[0],f=d[1],m=(0,i.useState)(!1),x=m[0],g=m[1],y=(0,i.useState)(),b=y[0],w=y[1],D=(0,i.useState)(""),k=D[0],I=D[1],S=(0,i.useState)(null),T=S[0],C=S[1];(0,i.useEffect)((function(){if(console.log("@@@@@@@@@@@",e.profileJson),void 0!==e.profileJson&&null!==e.profileJson&&void 0!==e.supporterData){console.log(e.profileJson.profileDetails.penName);var t=e.profileJson.profileDetails.penName,s=t.charAt("@")?t.substring(1):t;n(s),f(e.supporterData)}}),[]),(0,i.useEffect)((function(){void 0!==a&&(console.log("penName @@",a),C("https://app.thinkly.me/?&apn=com.me.digicita.thinkly.dev&ibi=com.Thinkly.Thinkly&imv=10.0&isi=1329943323&link=https://test.thinkly.me/thinkly/@"+a))}),[a]);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("text",{className:c.tq?"fs-18 fw-mid":"fs-20 fw-mid",children:"My True-fans"})," ",(0,r.jsx)("hr",{}),(0,r.jsxs)("div",{className:"row mt-5",children:[(0,r.jsx)("div",{className:"col-6 mb-3",children:(0,r.jsxs)(v.Z,{className:"py-2",style:{border:"lightgray 1px solid",borderRadius:"10px"},children:[(0,r.jsx)("div",{className:c.tq?"fw-mid text-center fs-18":"fw-mid text-center fs-20",children:"True-fans"}),(0,r.jsx)("div",{className:c.tq?"fw-bold text-center fs-20":"fw-bold text-center fs-24",children:void 0!==p&&p.TotalSupporters})]})}),(0,r.jsx)("div",{className:"col-6",children:(0,r.jsxs)(v.Z,{className:"py-2",style:{border:"lightgray 1px solid",borderRadius:"10px"},children:[(0,r.jsxs)("div",{className:c.tq?"fw-mid text-center fs-18":"fw-mid text-center fs-20",children:[c.tq?"Earnings":"Gross Income"," ",(0,r.jsx)("span",{className:"fs-15 fc-link pointer","data-toggle":"modal","data-target":"#redeemModal",children:"Redeem"})]}),(0,r.jsxs)("div",{className:c.tq?"fw-bold text-center fs-20":"fw-bold text-center fs-24",children:[" ",(0,r.jsx)(A.Z,{style:{marginTop:"-6px"}}),void 0!==p&&p.UserBalance," "]})]})})]}),void 0!==e.profileJson&&void 0!==a?(0,r.jsx)("div",{className:"row mt-4 mb-4",children:(0,r.jsx)("div",{className:"col-12",children:(0,r.jsxs)(v.Z,{className:"text-center py-3",style:{border:"lightgray 1px solid",borderRadius:"10px"},children:[(0,r.jsx)(F.Z,{style:{color:"#ff8383",fontSize:"2rem"}}),c.tq?(0,r.jsx)(j.Z,{primary:(0,r.jsxs)("span",{className:"fw-bold fs-20",children:[" ",void 0!==p&&p.TotalSupporters>0?"Get more True-fan!":"No True-fans yet!"," "]}),secondary:(0,r.jsx)("p",{className:"fs-18",children:"Share your page with the world"})}):(0,r.jsx)(j.Z,{primary:(0,r.jsx)("span",{className:"fw-bold fs-20",children:void 0!==p&&p.TotalSupporters>0?"Get your fans to support you!":"You don't have any True-fans yet!"}),secondary:(0,r.jsx)("p",{className:"fs-18",children:"Share your page with the world"})}),(0,r.jsx)(_.Z,{linkUrl:a})]})})}):(0,r.jsx)("div",{style:{padding:"150px 0px",textAlign:"center"},children:(0,r.jsx)(l.Z,{"aria-label":"Loading..."})}),(0,r.jsx)(B,{})]}),(0,r.jsx)("div",{id:"redeemModal",className:"modal fade in",tabIndex:"-1",role:"dialog","data-backdrop":"static",children:(0,r.jsx)("div",{className:"modal-dialog modal-dialog-centered",children:(0,r.jsxs)("div",{className:"modal-content modal-background",children:[(0,r.jsx)("button",{type:"button",className:"close text-right pr-2","data-dismiss":"modal",onClick:function(){return g(!1)},children:"\xd7"}),(0,r.jsx)("div",{className:"modal-body px-4 py-2",children:(0,r.jsx)("div",{className:"row",children:x?(0,r.jsxs)("div",{className:"col-12 text-center",children:[(0,r.jsx)(q.Z,{style:{color:"green",width:"80px",height:"80px"}})," ",(0,r.jsx)("br",{}),(0,r.jsx)("h3",{children:"Download link sent"})," ",(0,r.jsx)("br",{}),(0,r.jsx)("p",{style:{marginTop:"-24px"},children:"If you did not get the email, check your spam folder"}),(0,r.jsx)("button",{type:"button",className:"button1 mt-3 mb-4","data-dismiss":"modal",onClick:function(){return g(!1)},children:"OK"})]}):(0,r.jsxs)("div",{className:"col-12 text-center",children:[(0,r.jsx)("p",{className:"font-weight-bold fs-20",children:"Download the App to instantly redeem your income \ud83d\ude0d"}),(0,r.jsx)("p",{className:"fs-15",children:"Redeem Thinkly Stars for exciting rewards and many more features. Download the FREE Thinkly app now."}),c.tq?(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"row text-center mb-3",children:[(0,r.jsx)("div",{className:"col-6 text-right",children:(0,r.jsx)("a",{href:T,children:(0,r.jsx)(N(),{src:"playStore.svg",style:{width:"9rem",borderRadius:"10px"},alt:"Download button for Play store"})})}),(0,r.jsx)("div",{className:"col-6 text-left",children:(0,r.jsx)("a",{href:T,children:(0,r.jsx)(N(),{src:"appstore.svg",style:{width:"8rem"},alt:"Download button for App store"})})})]})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("input",{id:"email",className:"email-link mt-3 fs-18 text-center ff-roboto",placeholder:"Enter your Email ID",onChange:function(e){return w(e.target.value)},required:!0})," ",(0,r.jsx)("br",{}),(0,r.jsx)("label",{style:{fontSize:"12px",color:"red"},children:void 0!==k&&null!==k&&k})," ",(0,r.jsx)("br",{}),(0,r.jsx)("button",{type:"button",className:"fw-mid border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto",style:{width:"60%"},onClick:function(){return function(){console.log("inside sign up email function",b);var e={method:"POST",headers:{"Content-Type":"application/json"},data:{EventType:"SignUp",NotificationType:"Email",ReceiverHandle:b}};b.match(t)?(I(),u()("".concat(s,"Notification/SendEmailNotification"),e).then((function(e){"00"===e.data.responseCode?(console.log("success Send Email Notification"),g(!0)):console.log("inside .then other than 00 responseCode",e.data)})).catch((function(e){console.log("inside catch",e)}))):I("Please provide a valid email ID")}()},children:"Send Download Link"})," ",(0,r.jsx)("br",{}),(0,r.jsx)("p",{className:"fs-15 mt-1",style:{color:"gray"},children:"You will receive an email to download the app"})]})]})})})]})})})]})},L=(s(4298),(0,p.withRouter)((function(e){var t=function(e){console.log("inside fetch user profile data@@@@@@",e);var t={headers:{"Content-Type":"application/json",DeviceID:"123456",UserID:e}};u().get("".concat(d,"User/GetUserProfileByID/").concat(e),t).then((function(e){console.log("inside fetchUserProfileData function",e),"00"===e.data.responseCode?(console.log("GetUserProfileByID response in Index@@@@",e.data.responseData),localStorage.setItem("PublicationCount",e.data.responseData.otherDetails.totalPublicationsCount),U(e.data.responseData)):"03"===e.data.responseCode?(console.log("GetUserProfileByID response@@@@",e),U(e.data.responseData)):console.log("GetUserProfileByID else part",e)})).catch((function(e){console.log("GetUserProfileByID error in catch",e)}))},s=function(e){var t={headers:{DeviceID:"123456",UserID:e}};u().get("".concat(d,"User/GetMySupportDashboard"),t).then((function(e){console.log("support data@@@@@@@@@",e.data.responseData),q(e.data.responseData)}))},a=(0,p.useRouter)(),d=(0,i.useContext)(h.F),f=(0,i.useState)(),m=f[0],y=f[1],j=(0,i.useState)(),v=j[0],b=j[1],w=(0,i.useState)(null),N=w[0],k=w[1],I=(0,i.useState)(!1),S=I[0],T=I[1],C=(0,i.useState)(),E=C[0],U=C[1],A=(0,i.useState)(),F=A[0],q=A[1],_=(0,i.useState)(null);_[0],_[1];(0,i.useEffect)((function(){function e(){return(e=(0,o.Z)(n().mark((function e(){var o,r,i;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x();case 2:void 0!==(o=e.sent)&&(r=JSON.parse(o),b(r)),void 0!==localStorage.getItem("UserID")&&null!==localStorage.getItem("UserID")?(i=localStorage.getItem("UserID"),y(i),t(i),s(i)):a.push("/login");case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]);var J=function(e){T(!0),console.log("index",e),k(e)};return(0,r.jsx)(r.Fragment,{children:void 0!==E&&null!==E?(0,r.jsxs)("div",{className:c.tq?"container":"container pr-5",children:[(0,r.jsx)(g.Z,{user_profile:E,thinklyConfigJSON:v}),(0,r.jsxs)("div",{className:"row",style:{marginTop:"5rem"},children:[(0,r.jsx)("div",{className:c.tq?"col-12 py-4":"col-8 pr-5 card-fixed",children:S?(0,r.jsx)(r.Fragment,{children:"Publication"===N?(0,r.jsx)(P,{authorID:m,profileJson:E}):"Thinkly"===N?(0,r.jsx)(Z,{authorID:m,profileJson:E}):"Dashboard"===N?(0,r.jsx)(R,{profileJson:E,supporterData:F}):""}):(0,r.jsx)(R,{profileJson:E,supporterData:F})}),(0,r.jsx)("div",{style:{background:"lightgray",height:"auto",width:"1px",marginRight:"-40px",marginLeft:"38px"}}),!c.tq&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"col-1"}),(0,r.jsx)("div",{className:"col-3 card-fixed",children:(0,r.jsx)(D,{profileDetail:function(e){return J(e)},profileJson:E,supporterData:F})})]})]})]}):(0,r.jsx)("div",{className:"grid place-items-center h-screen",children:(0,r.jsx)(l.Z,{"aria-label":"Loading..."})})})})))}},function(e){e.O(0,[16,649,125,67,490,23,885,774,888,179],(function(){return t=5557,e(e.s=t);var t}));var t=e.O();_N_E=t}]);