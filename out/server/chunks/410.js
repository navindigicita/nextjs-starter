"use strict";
exports.id = 410;
exports.ids = [410];
exports.modules = {

/***/ 2410:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ header)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2167);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(2947);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-device-detect"
var external_react_device_detect_ = __webpack_require__(3599);
// EXTERNAL MODULE: external "@material-ui/core"
var core_ = __webpack_require__(8130);
// EXTERNAL MODULE: external "@material-ui/icons"
var icons_ = __webpack_require__(2105);
// EXTERNAL MODULE: ./pages/api/api.jsx
var api = __webpack_require__(3157);
// EXTERNAL MODULE: ./components/common/shareLink.jsx
var shareLink = __webpack_require__(3966);
;// CONCATENATED MODULE: ./components/common/sharePage.jsx






const SharePage = (props)=>{
    const { 0: userPenName , 1: setuserPenName  } = (0,external_react_.useState)();
    const { 0: userProfileImage , 1: setuserProfileImage  } = (0,external_react_.useState)();
    (0,external_react_.useEffect)(()=>{
        console.log("inside share page@@@@", props.penName, props.profile);
        if (props.profile !== undefined && props.penName !== undefined) {
            console.log("inside share page@@@@@@@@@@", props.penName);
            setuserPenName(props.penName);
            const data = props.profile.charAt(0) === "@" ? props.profile.substring(1) : props.profile;
            setuserProfileImage(data);
        }
    }, []);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "modal fade",
        id: "ShareProfile",
        role: "dialog",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "modal-dialog modal-dialog-centered",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "modal-content",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "button",
                        className: "close text-right pr-2",
                        "data-dismiss": "modal",
                        children: "\xd7"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "modal-body text-center p-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                style: {
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                },
                                children: "Share your page with the world."
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "row d-flex",
                                children: userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== "" ? /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    className: "my-3 mx-auto",
                                    src: userProfileImage,
                                    alt: "profile",
                                    style: {
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                    className: "mx-auto",
                                    style: {
                                        width: "100px",
                                        height: "100px"
                                    },
                                    src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                                style: {
                                    fontSize: "20px",
                                    fontWeight: "bold"
                                },
                                children: userPenName !== undefined && userPenName
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(shareLink/* default */.Z, {
                                linkUrl: props.penName,
                                image: userProfileImage
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const sharePage = (SharePage);

// EXTERNAL MODULE: ./components/posts/newThinkly.jsx
var newThinkly = __webpack_require__(9320);
// EXTERNAL MODULE: ./components/publication/newPublication.jsx
var newPublication = __webpack_require__(8227);
;// CONCATENATED MODULE: ./components/common/header.jsx













const Header = (props, { parentCallback  })=>{
    const router = (0,router_.useRouter)();
    const BASE_URL = (0,external_react_.useContext)(api/* baseUrlThinkly */.R);
    const emailValidate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { 0: getEmail , 1: setEmail  } = (0,external_react_.useState)(false);
    const { 0: EmailInput , 1: setEmailInput  } = (0,external_react_.useState)();
    const { 0: ErrorMsg , 1: setErrorMsg  } = (0,external_react_.useState)("");
    const { 0: userID , 1: setuserID  } = (0,external_react_.useState)(false) //stored props data of user ID
    ;
    const { 0: userProfileImage , 1: setuserProfileImage  } = (0,external_react_.useState)() //stored props data of user profile image
    ;
    const { 0: userPenName , 1: setuserPenName  } = (0,external_react_.useState)() //stored props data of user penName
    ;
    const { 0: user_status , 1: setuser_status  } = (0,external_react_.useState)() //stored props data of user loggedIn status
    ;
    const { 0: pub_count , 1: setpub_count  } = (0,external_react_.useState)(0) //stored props data of user publication count
    ;
    const { 0: thinklyRemoteConfigData , 1: setthinklyRemoteConfigData  } = (0,external_react_.useState)() //stored props data of thinkly remote config json
    ;
    const { 0: showThinkly , 1: setshowThinkly  } = (0,external_react_.useState)(false) //hide and show modal box of new thinkly
    ;
    const { 0: showPublication , 1: setshowPublication  } = (0,external_react_.useState)(false) //hide and show modal box of new publication
    ;
    const { 0: getPath , 1: setPath  } = (0,external_react_.useState)("") //stored url fetch path
    ;
    const { 0: showShareUrlPopup , 1: setshowShareUrlPopup  } = (0,external_react_.useState)(false) //hide and show modal popup of share url 
    ;
    const { 0: showForUserProfile , 1: setshowForUserProfile  } = (0,external_react_.useState)(false);
    const { 0: isPartialUser , 1: setisPartialUser  } = (0,external_react_.useState)(false) //if user not registered in app then don't show create button
    ;
    const { 0: openInAppUrl , 1: setopenInAppUrl  } = (0,external_react_.useState)(null) //dynamic link for mob
    ;
    const { 0: customDashboard , 1: setcustomDashboard  } = (0,external_react_.useState)(false);
    (0,external_react_.useEffect)(()=>{
        if (props.userStatus !== undefined && props.publicationCount !== undefined && props.authorID !== undefined) {
            console.log("userStatus = ", props.userStatus, "&& publicationCount = ", props.publicationCount, "&& authorID = ", props.authorID);
            setuserID(props.authorID);
            setuser_status(props.userStatus);
            setpub_count(props.publicationCount);
        }
        if (props.user_profile !== undefined && props.user_profile !== null) {
            console.log("props.user_profile", props.user_profile.profileDetails);
            var data = props.user_profile.profileDetails;
            var name = data.penName.charAt(0) === "@" ? data.penName.substring(1) : data.penName;
            setuserPenName(name);
            setuserProfileImage(data.profileImage);
            setisPartialUser(data.isPartialProfile);
        }
        if (props.showContentForUserProfile !== undefined && props.userProfile !== undefined) {
            console.log("show Content For User Profile@@@@", props.showContentForUserProfile, props.userProfile, props.loginStatus);
            var data = props.userProfile.profileDetails;
            var name = data.penName.charAt(0) === "@" ? data.penName.substring(1) : data.penName;
            setuserPenName(name);
            setuser_status(props.loginStatus);
            setuserProfileImage(data.profileImage);
            setisPartialUser(data.isPartialProfile);
            setshowForUserProfile(props.showContentForUserProfile);
        }
        if (props.thinklyConfigJSON !== undefined && props.thinklyConfigJSON !== null) {
            console.log("remote config props.thinklyConfigJSON@@@@@@@@@", props.thinklyConfigJSON);
            setthinklyRemoteConfigData(props.thinklyConfigJSON);
        }
    // else if (thinklyJsonData !== undefined && thinklyJsonData !== null) {
    //     console.log("header thinklyJsonData hardcoded@@@@@@@@@", thinklyJsonData);
    //     setthinklyRemoteConfigData(thinklyJsonData)
    // }
    }, []);
    (0,external_react_.useEffect)(()=>{
        if (userPenName !== undefined) {
            const link = "https://app.thinkly.me/?&apn=com.me.digicita.thinkly.dev&ibi=com.Thinkly.Thinkly&imv=10.0&isi=1329943323&link=https://test.thinkly.me/thinkly/@" + userPenName;
            setopenInAppUrl(link) //for mobile view open in app dynamic link
            ;
        }
        var path = router.asPath;
        // var path = thePath.substring(thePath.lastIndexOf('/') + 1)
        if (path === "dashboard") {
            setcustomDashboard(true);
        }
        if (path.includes("/signup")) {
            setPath("signup");
        } else if (path.includes("/login")) {
            setPath("login");
        } else if (path.includes("complete-your-profile")) {
            setPath("complete-your-profile");
        } else if (path.includes("checkUser")) {
            setPath("checkUser");
        } else if (user_status === "Success") {
            setPath("LoggedIn");
        } else {
            setPath("");
        }
    }, [
        user_status,
        userID,
        pub_count,
        thinklyRemoteConfigData,
        userProfileImage,
        userPenName,
        getPath
    ]);
    const handleSignUpClick = ()=>{
        router.push("/signup");
        setPath("signup");
    };
    const handleLoginClick = ()=>{
        router.push("/login");
        setPath("login") //when update or replace state then on first click it store update data value in state as a queue data and after 2nd click replace the data that's why used another click event to recall state update
        ;
        document.addEventListener("click", function() {
            setPath("login");
        });
    };
    const sendSignUpEmail = ()=>{
        console.log("inside sign up email function", EmailInput);
        var config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                EventType: "SignUp",
                NotificationType: "Email",
                ReceiverHandle: EmailInput
            }
        };
        if (EmailInput.match(emailValidate)) {
            setErrorMsg();
            external_axios_default()(`${BASE_URL}Notification/SendEmailNotification`, config).then((res)=>{
                if (res.data.responseCode === "00") {
                    console.log("success Send Email Notification");
                    setEmail(true);
                } else {
                    console.log("inside .then other than 00 responseCode", res.data);
                }
            }).catch((err)=>{
                console.log("inside catch", err);
            });
        } else {
            setErrorMsg("Please provide a valid email ID");
        }
    };
    const handleUserProfle = ()=>{
        if (external_jquery_default()(".dropdown-user").css("display") === "none") {
            external_jquery_default()(".dropdown-user").css("display", "block");
        } else {
            external_jquery_default()(".dropdown-user").css("display", "none");
        }
    };
    const handleLogout = ()=>{
        localStorage.clear();
        sessionStorage.clear();
        router.push("/login");
    };
    const handleViewProfile = ()=>{
        console.log(userPenName);
        var newWindow = window.open(`${userPenName}`, "_blank");
        newWindow.penName = userPenName;
        newWindow.userStauts = user_status;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("section", {
                className: "topsection fixed-top",
                children: /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                    className: "navbrpadding",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "container",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "row d-flex",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "col-md-6",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                            src: "/thinkly-logo-.png",
                                            height: 40,
                                            width: 130,
                                            alt: "Header Logo"
                                        }),
                                        !external_react_device_detect_.isMobile && !customDashboard ? /*#__PURE__*/ jsx_runtime_.jsx("h6", {
                                            className: "mobheader",
                                            style: {
                                                marginTop: "-44px",
                                                marginLeft: "140px",
                                                marginRight: "-110px"
                                            },
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "sideline",
                                                children: "Where the world comes to think"
                                            })
                                        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                            children: [
                                                getPath === "signup" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "float-right mt-1",
                                                    children: [
                                                        "Existing User?",
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "fc-link pointer",
                                                            onClick: ()=>handleLoginClick(),
                                                            children: " Login "
                                                        })
                                                    ]
                                                }) : getPath === "login" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                                    className: "float-right mt-1",
                                                    children: [
                                                        "New User?",
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "fc-link pointer",
                                                            onClick: ()=>handleSignUpClick(),
                                                            children: " Sign Up "
                                                        })
                                                    ]
                                                }) : getPath === "LoggedIn" ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "float-right",
                                                    style: {
                                                        marginTop: "0px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                            className: "float-right p-1",
                                                            style: {
                                                                borderRadius: "50%",
                                                                marginLeft: "-40px",
                                                                position: "absolute",
                                                                zIndex: "9"
                                                            },
                                                            "data-toggle": "modal",
                                                            "data-target": "#ShareProfile",
                                                            onClick: ()=>setshowShareUrlPopup(true),
                                                            children: [
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.ShareRounded, {}),
                                                                " "
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                            style: {
                                                                borderRadius: "40px",
                                                                paddingTop: "4px",
                                                                paddingBottom: "4px",
                                                                paddingLeft: "10px",
                                                                paddingRight: "4px"
                                                            },
                                                            children: [
                                                                userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== "" ? /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    src: userProfileImage.charAt(0) === "@" ? userProfileImage.substring(1) : userProfileImage,
                                                                    alt: "user profile",
                                                                    style: {
                                                                        width: "22px",
                                                                        height: "22px",
                                                                        borderRadius: "50%"
                                                                    }
                                                                }) : /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                                                    style: {
                                                                        width: "22px",
                                                                        height: "22px"
                                                                    },
                                                                    src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.ArrowDropDown, {
                                                                    onClick: ()=>handleUserProfle()
                                                                }),
                                                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                                    className: "dropdown-user",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            onClick: ()=>handleViewProfile(),
                                                                            children: "View My Page"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                            onClick: ()=>handleLogout(),
                                                                            children: "Sign out"
                                                                        })
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }) : "",
                                                showForUserProfile && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "float-right",
                                                    style: {
                                                        marginTop: "0px"
                                                    },
                                                    children: [
                                                        !isPartialUser && /*#__PURE__*/ jsx_runtime_.jsx(core_.Card, {
                                                            className: "float-right",
                                                            style: {
                                                                borderRadius: "40px",
                                                                padding: "4px 1px",
                                                                marginLeft: "-110px",
                                                                position: "absolute",
                                                                zIndex: "99"
                                                            },
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                                className: "pointer bg-white border-radius-100 border-none fc-black",
                                                                "data-toggle": "modal",
                                                                "data-target": "#myModal",
                                                                children: "Follow"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                            className: "float-right p-1",
                                                            style: {
                                                                borderRadius: "50%",
                                                                marginLeft: "-40px",
                                                                position: "absolute",
                                                                zIndex: "9"
                                                            },
                                                            "data-toggle": "modal",
                                                            "data-target": "#ShareProfile",
                                                            onClick: ()=>setshowShareUrlPopup(true),
                                                            children: [
                                                                " ",
                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.ShareRounded, {}),
                                                                " "
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                            style: {
                                                                borderRadius: "40px",
                                                                paddingTop: "4px",
                                                                paddingBottom: "4px",
                                                                paddingLeft: "10px",
                                                                paddingRight: "4px",
                                                                height: "34px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                                                    style: {
                                                                        width: "22px",
                                                                        height: "22px",
                                                                        marginTop: "3px"
                                                                    },
                                                                    src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx(icons_.ArrowDropDown, {
                                                                    onClick: ()=>handleUserProfle(),
                                                                    style: {
                                                                        marginTop: "-50px",
                                                                        marginLeft: "20px"
                                                                    }
                                                                }),
                                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                    className: "dropdown-user",
                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                        onClick: ()=>handleLogout(),
                                                                        children: "Sign In"
                                                                    })
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                !external_react_device_detect_.isMobile && /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                    children: getPath === "signup" ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-md-6 py-1",
                                        style: {
                                            marginLeft: "-10px"
                                        },
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            className: "float-right",
                                            children: [
                                                "Existing User?",
                                                /*#__PURE__*/ jsx_runtime_.jsx("text", {
                                                    className: "fc-link pointer",
                                                    onClick: ()=>handleLoginClick(),
                                                    children: " Login"
                                                })
                                            ]
                                        })
                                    }) : getPath === "login" ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "col-md-6 py-1",
                                        style: {
                                            marginLeft: "-10px"
                                        },
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                            className: "float-right",
                                            children: [
                                                "New User?",
                                                /*#__PURE__*/ jsx_runtime_.jsx("text", {
                                                    className: "fc-link pointer",
                                                    onClick: ()=>handleSignUpClick(),
                                                    children: " Sign Up "
                                                })
                                            ]
                                        })
                                    }) : ""
                                }),
                                !external_react_device_detect_.isMobile && getPath === "LoggedIn" && !showForUserProfile && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-4"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-1",
                                            style: {
                                                marginTop: "12px"
                                            },
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(core_.Card, {
                                                className: "float-right p-1 pointer",
                                                style: {
                                                    borderRadius: "50%"
                                                },
                                                "data-toggle": "modal",
                                                "data-target": "#ShareProfile",
                                                onClick: ()=>setshowShareUrlPopup(true),
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ShareRounded, {})
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-1",
                                            style: {
                                                marginTop: "12px"
                                            },
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                className: "pointer",
                                                onClick: ()=>handleUserProfle(),
                                                style: {
                                                    borderRadius: "40px",
                                                    paddingTop: "4px",
                                                    paddingBottom: "4px",
                                                    paddingLeft: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(icons_.Menu, {}),
                                                    userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== "" ? /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                        src: userProfileImage.charAt(0) === "@" ? userProfileImage.substring(1) : userProfileImage,
                                                        alt: "user profile",
                                                        style: {
                                                            width: "25px",
                                                            height: "25px",
                                                            borderRadius: "50%"
                                                        }
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                                        style: {
                                                            width: "25px",
                                                            height: "25px",
                                                            marginTop: "-24px",
                                                            marginLeft: "25px"
                                                        },
                                                        src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        className: "dropdown-user",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                onClick: ()=>handleViewProfile(),
                                                                children: "View My Page"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                onClick: ()=>handleLogout(),
                                                                children: "Sign out"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                !external_react_device_detect_.isMobile && showForUserProfile && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-3"
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "col-2",
                                            style: {
                                                marginTop: "12px"
                                            },
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(core_.Card, {
                                                    className: "float-right p-1 pointer ml-4",
                                                    style: {
                                                        borderRadius: "50%"
                                                    },
                                                    "data-toggle": "modal",
                                                    "data-target": "#ShareProfile",
                                                    onClick: ()=>setshowShareUrlPopup(true),
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.ShareRounded, {})
                                                }),
                                                !isPartialUser && /*#__PURE__*/ jsx_runtime_.jsx(core_.Card, {
                                                    className: "float-right",
                                                    style: {
                                                        borderRadius: "40px",
                                                        paddingTop: "4px",
                                                        paddingBottom: "4px",
                                                        paddingLeft: "10px",
                                                        paddingRight: "10px"
                                                    },
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        className: "pointer bg-white border-radius-100 border-none",
                                                        "data-toggle": "modal",
                                                        "data-target": "#myModal",
                                                        children: "Follow"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "col-1",
                                            style: {
                                                marginTop: "12px"
                                            },
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(core_.Card, {
                                                className: "pointer",
                                                onClick: ()=>handleUserProfle(),
                                                style: {
                                                    borderRadius: "40px",
                                                    paddingTop: "4px",
                                                    paddingBottom: "4px",
                                                    paddingLeft: "10px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx(icons_.Menu, {}),
                                                    user_status === "Success" ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                        children: userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== "" ? /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                            src: userProfileImage.charAt(0) === "@" ? userProfileImage.substring(1) : userProfileImage,
                                                            alt: "user profile",
                                                            style: {
                                                                width: "25px",
                                                                height: "25px",
                                                                borderRadius: "50%"
                                                            }
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                                            style: {
                                                                width: "25px",
                                                                height: "25px",
                                                                marginTop: "-24px",
                                                                marginLeft: "25px"
                                                            },
                                                            src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                                        })
                                                    }) : /*#__PURE__*/ jsx_runtime_.jsx(core_.Avatar, {
                                                        style: {
                                                            width: "25px",
                                                            height: "25px",
                                                            marginTop: "-24px",
                                                            marginLeft: "25px"
                                                        },
                                                        src: /*#__PURE__*/ jsx_runtime_.jsx(icons_.AssignmentIndOutlined, {})
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "dropdown-user",
                                                        children: user_status === "Success" ? /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            onClick: ()=>handleLogout(),
                                                            children: "Sign Out"
                                                        }) : /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            onClick: ()=>handleLogout(),
                                                            children: "Sign In"
                                                        })
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                })
            }),
            showThinkly && /*#__PURE__*/ jsx_runtime_.jsx(newThinkly/* default */.Z, {
                authorID: userID,
                thinklyRemoteConfigData: thinklyRemoteConfigData
            }),
            showPublication && /*#__PURE__*/ jsx_runtime_.jsx(newPublication/* default */.Z, {
                authorID: userID
            }),
            showShareUrlPopup && /*#__PURE__*/ jsx_runtime_.jsx(sharePage, {
                profile: userProfileImage,
                penName: userPenName
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                id: "myModal",
                className: "modal fade in",
                tabIndex: "-1",
                role: "dialog",
                "data-backdrop": "static",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "modal-dialog modal-dialog-centered",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "modal-content modal-background",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                className: "close text-right pr-2",
                                "data-dismiss": "modal",
                                onClick: ()=>setEmail(false),
                                children: "\xd7"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "modal-body px-4 py-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "row",
                                    children: !getEmail ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "col-12 text-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: "font-weight-bold fs-20",
                                                children: "Download the App for a richer experience!"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                className: "fs-15",
                                                children: "Follow your favourite publications, engage in meaningful conversations, earn & redeem Thinkly Stars for exciting rewards and many more features."
                                            }),
                                            external_react_device_detect_.isMobile ? /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                    className: "row text-center mb-3",
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-6 text-right",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: openInAppUrl,
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    src: "/playStore.svg",
                                                                    style: {
                                                                        width: "9rem",
                                                                        borderRadius: "10px"
                                                                    },
                                                                    alt: "Download button for Play store"
                                                                })
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "col-6 text-left",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                href: openInAppUrl,
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                                                    src: "/appstore.svg",
                                                                    style: {
                                                                        width: "8rem"
                                                                    },
                                                                    alt: "Download button for App store"
                                                                })
                                                            })
                                                        })
                                                    ]
                                                })
                                            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        id: "email",
                                                        className: "email-link mt-3 fs-18 text-center ff-roboto",
                                                        placeholder: "Enter your Email ID",
                                                        onChange: (e)=>setEmailInput(e.target.value),
                                                        required: true
                                                    }),
                                                    " ",
                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                                        style: {
                                                            fontSize: "12px",
                                                            color: "red"
                                                        },
                                                        children: ErrorMsg !== undefined && ErrorMsg !== null && ErrorMsg
                                                    }),
                                                    " ",
                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                        type: "button",
                                                        className: "fw-mid border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto",
                                                        style: {
                                                            width: "60%"
                                                        },
                                                        onClick: ()=>sendSignUpEmail(),
                                                        children: "Send Download Link"
                                                    }),
                                                    " ",
                                                    /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                        className: "fs-15 mt-1",
                                                        style: {
                                                            color: "gray"
                                                        },
                                                        children: "You will receive an email to download the app"
                                                    })
                                                ]
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "col-12 text-center",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(icons_.CheckCircleOutline, {
                                                style: {
                                                    color: "green",
                                                    width: "80px",
                                                    height: "80px"
                                                }
                                            }),
                                            " ",
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                                children: "Download link sent"
                                            }),
                                            " ",
                                            /*#__PURE__*/ jsx_runtime_.jsx("br", {}),
                                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                                style: {
                                                    marginTop: "-24px"
                                                },
                                                children: "If you did not get the email, check your spam folder"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                type: "button",
                                                className: "button1 mt-3 mb-4",
                                                "data-dismiss": "modal",
                                                onClick: ()=>setEmail(false),
                                                children: "OK"
                                            })
                                        ]
                                    })
                                })
                            })
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const header = (Header); //const downloadApp = () => {   //app store link for andriod and IOS
 //     var userAgent = navigator.userAgent || navigator.vendor;
 //     if (/android/i.test(userAgent)) {
 //         return (
 //             window.location = "https://play.google.com/store/apps/details?id=com.me.digicita.thinkly"
 //         )
 //     }
 //     // /iPad|iPhone|iPod/.test(userAgent)
 //     if (/iPhone/i.test(userAgent)) {
 //         return (
 //             window.location = "https://apps.apple.com/in/app/thinkly/id1329943323"
 //         )
 //     }
 // }


/***/ }),

/***/ 3966:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3599);
/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_device_detect__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_3__);




const ShareLink = (props)=>{
    const { 0: penName , 1: setpenName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.linkUrl);
    const { 0: CopyUrl , 1: setCopyUrl  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: Path , 1: setPath  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log("inside share link component props data", penName);
    // if (props.linkUrl != undefined) {
    //     console.log("inside share link component props data", props.linkUrl);
    //     setpenName(props.linkUrl)
    // }
    }, [
        penName
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log("penName", penName);
        var windowURL = window.location.href;
        if (windowURL.indexOf("uat.stars.thinkly.me") > 0) {
            setPath("https://uat.stars.thinkly.me/" + penName);
        } else if (windowURL.indexOf("stars.thinkly.me") > 0) {
            setPath("https://uat.stars.thinkly.me/" + penName);
        } else if (windowURL.indexOf("localhost") > 0) {
            setPath("https://uat.stars.thinkly.me/" + penName);
        }
    }, [
        penName
    ]);
    const shareFacebook = ()=>{
        console.log("share the facebook link", Path);
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + Path, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700");
        return false;
    };
    const shareTwitter = ()=>{
        console.log("share the twitter link", Path);
        window.open("http://twitter.com/share?text=&url=" + Path, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700");
        return false;
    };
    const shareLinkedin = ()=>{
        console.log("share the linkedin link", Path);
        window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + Path, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700");
        return false;
    };
    const shareWhatsapp = ()=>{
        console.log("share the whatsapp link", Path);
        window.open("https://api.whatsapp.com/send?text=" + Path, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700");
        return false;
    };
    const shareLink = ()=>{
        var url = document.getElementById("userShareUrl").innerHTML;
        navigator.clipboard.writeText(url).then(function() {
            console.log("Copied!", url);
            setCopyUrl(true);
            setTimeout(()=>{
                setCopyUrl(false);
            }, 2000);
        }, function() {
            console.log("Copy error");
        });
    };
    const handleUrlClick = ()=>{
        var data1 = penName;
        // var data1 = data.charAt(0) === '@' ? data.substring(1) : data
        var newWindow = window.open(`/${data1}`, "_blank");
        newWindow.penName = data1 //this line is to pass penName to userProfile page
        ;
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                className: "fs-18 mb-3 fc-link mb-4 pointer",
                id: "userShareUrl",
                onClick: ()=>handleUrlClick(),
                children: [
                    " ",
                    Path
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                src: "facebook.svg",
                alt: "facebook",
                className: "px-3 pointer",
                onClick: ()=>shareFacebook()
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                src: "twitter.svg",
                alt: "twitter",
                className: "px-3 pointer",
                onClick: ()=>shareTwitter()
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                src: "linkend.svg",
                alt: "linkend",
                className: "px-3 pointer",
                onClick: ()=>shareLinkedin()
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_3___default()), {
                src: "whatsapp.svg",
                alt: "whatsapp",
                className: "px-3 pointer",
                onClick: ()=>shareWhatsapp()
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row d-flex",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                    type: "button",
                    onClick: ()=>shareLink(),
                    className: "button-sign-in mt-4 mx-auto fw-bold border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto",
                    style: react_device_detect__WEBPACK_IMPORTED_MODULE_2__.isMobile ? {
                        width: "78%"
                    } : {
                        width: "50%"
                    },
                    children: [
                        " ",
                        CopyUrl ? "Copied" : "Copy Link",
                        " "
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShareLink);


/***/ }),

/***/ 9320:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2947);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8130);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2105);
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _pages_api_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3157);






const ReactQuill = next_dynamic__WEBPACK_IMPORTED_MODULE_5___default()(null, {
    loadableGenerated: {
        modules: [
            "..\\components\\posts\\newThinkly.jsx -> " + "react-quill"
        ]
    },
    ssr: false
});
// import "quill-paste-smart";




const NewThinkly = (props)=>{
    const BASE_URL = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_pages_api_api__WEBPACK_IMPORTED_MODULE_9__/* .baseUrl */ .F);
    const BASE_URL_THINKLY = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_pages_api_api__WEBPACK_IMPORTED_MODULE_9__/* .baseUrlThinkly */ .R);
    const modules = {
        toolbar: [
            [
                "bold",
                "italic"
            ],
            [
                {
                    list: "ordered"
                },
                {
                    list: "bullet"
                }
            ]
        ]
    }; //text editing tools for editor
    const { 0: LoggedInID , 1: setLoggedInID  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //store props data of user ID
    ;
    const { 0: selectTypeSlide , 1: setselectTypeSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //thinkly type slide hide and show
    ;
    const { 0: selectedIndex , 1: setSelectedIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("") //set index of thinkly type
    ;
    const { 0: selectPublication , 1: setselectPublication  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //publication selection slide hide and show
    ;
    const { 0: publicationList , 1: setpublicationList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //store user publication list from api response
    ;
    const { 0: getPublicationID , 1: setPublicationID  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("") //store selected publication ID
    ;
    const { 0: publicationPayType , 1: setpublicationPayType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //store publication pay type
    ;
    const { 0: tContentSlide , 1: setTContentSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //thinkly content slide hide and show
    ;
    const { 0: thinklyImage , 1: setthinklyImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("") //store thinkly image
    ;
    const { 0: thinklyName , 1: setthinklyName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("") //store thinkly name
    ;
    const { 0: blogContent , 1: setblogContent  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("") //store thinkly long content
    ;
    const { 0: commentView , 1: setcommentView  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //store comment view data true or false
    ;
    const { 0: thinklyPayType , 1: setthinklyPayType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //thinkly pay type set Free when false and Paid when true
    ;
    const { 0: settingSlide , 1: setsettingSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //setting slide hide and show based on contest availibility
    ;
    const { 0: contest , 1: setcontest  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //contest interest not interest toggle 
    ;
    const { 0: contestDataArray , 1: setcontestDataArray  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]) //contest selected #tag store in array
    ;
    const { 0: InterestSlide , 1: setInterestSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //Interest slide show and hide
    ;
    const { 0: color , 1: setcolor  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        "#f3a56c",
        "#c37d8d",
        "#3c7493",
        "#7ec2bf"
    ]); //random color selection for interest
    const { 0: Interest , 1: setInterest  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //storing interest data from api
    ;
    const { 0: arrayList , 1: setarrayList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); //storing selected interest
    const { 0: publishLoader , 1: setpublishLoader  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //loader hide and show
    ;
    const { 0: successSlide , 1: setSuccessSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //success slide hide and show
    ;
    const { 0: thinklyURL , 1: setthinklyURL  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //storing thinkly url from create thinkly api response
    ;
    const { 0: copyLinkMsg , 1: setcopyLinkMsg  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false) //text copy statement hide and show
    ;
    const { 0: thinklyRemoteConfigJson , 1: setthinklyRemoteConfigJson  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)() //sotre props data of remote config
    ;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.authorID !== undefined && props.thinklyRemoteConfigData !== undefined) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#createThinkly").modal("show");
            setLoggedInID(props.authorID);
            setselectTypeSlide(true);
            fetchPublicationListByUser(props.authorID);
            setthinklyRemoteConfigJson(props.thinklyRemoteConfigData);
        }
    }, []);
    const closeFunction = ()=>{
        localStorage.clear();
        setselectTypeSlide(true);
    };
    const handleListItemClick = (event, index)=>{
        console.log("thinkly type item index", index);
        setSelectedIndex(index);
    };
    const hideTypeAndShowPubList = ()=>{
        if (selectedIndex !== "") {
            if (selectedIndex === 0) {
                const data = "C";
                window.localStorage.setItem("content_type", data);
                if (publicationList === "No Record Found!") {
                    setselectTypeSlide(false);
                    setTContentSlide(true);
                } else {
                    setselectTypeSlide(false);
                    setselectPublication(true);
                }
            }
        } else {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#thinklyTypeError").innerHTML = "Please select an option to proceed!";
        }
    };
    const fetchPublicationListByUser = (author_id)=>{
        var config = {
            method: "POST",
            headers: {
                DeviceID: "123456",
                UserID: author_id
            },
            data: {
                UserID: author_id,
                PublicationID: "",
                StartIndex: 0,
                EndIndex: 10
            }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default()(`${BASE_URL}User/GetUserPublications`, config).then((res)=>{
            console.log("response of user publication -> publication list", res);
            if (res.data.responseCode === "00") {
                setpublicationList(res.data.responseData);
            } else if (res.data.responseCode === "03") {
                setpublicationList(res.data.responseMessage);
            }
        }).catch((err)=>{
            console.log("error response of user publication", err);
        });
    };
    const handlePublicationSelection = (event, index, publicationID)=>{
        console.log("publication as index and publicationIDF", index, publicationID);
        const pubPayType = publicationList[index].publicationPayType;
        console.log("publication pay type @@@@@@@", pubPayType);
        setpublicationPayType(pubPayType);
        setPublicationID(publicationID);
    };
    const hidePublicationAndShowthinkly = ()=>{
        console.log(getPublicationID);
        if (getPublicationID === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#selectPublicationError").innerHTML = "Please select a publication for the thinkly";
        } else {
            // const data = publicationList.filter(obj => {
            //     if (obj.publicationID === getPublicationID) {
            //         return obj
            //     }
            // })
            window.localStorage.setItem("PublicationID", getPublicationID);
            setselectPublication(false);
            setTContentSlide(true);
        }
    };
    const uploadImage = (event)=>{
        const chooseFile = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#choose-file");
        const imgPreview = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#img-preview");
        const files = chooseFile.files[0]; //in case multiple image got selected then pick 1st one only
        const str = files.type;
        console.log(str);
        const image_extension = str.substring(str.indexOf("/") + 1);
        const myRenamedFile = new File([
            files
        ], `${LoggedInID}_${files.lastModified}.${image_extension}`) //hardcoded userID
        ;
        if (myRenamedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(myRenamedFile);
            fileReader.addEventListener("load", function() {
                imgPreview.innerHTML = '<Image src="' + this.result + '" alt="image" />';
            });
        }
        setthinklyImage(myRenamedFile);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const editor = document.querySelector("div");
        editor.addEventListener("paste", (e)=>{
            console.log("inside add event listener", e);
            e.preventDefault();
            const text = e.clipboardData.getData("text");
            console.log("react quill@@@@@@@@", text);
            document.execCommand("insertHTML", true, text);
        });
    }, []);
    const handleReactQuillData = (event)=>{
        console.log("react quill inside function@@@@@@@@", event);
        setblogContent(event);
    };
    const hidethinklyAndShowSettingOrInterest = ()=>{
        if (thinklyName === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#thinklyNameError").innerHTML = "Plz enter the thinkly name";
        } else if (blogContent === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#blogError").innerHTML = "Plz enter the content for this thinkly";
        } else {
            localStorage.setItem("ThinklyName", thinklyName);
            localStorage.setItem("Blog", blogContent);
            if (thinklyImage !== "") {
                localStorage.setItem("ThinklyImage", thinklyImage.name);
                var data = new FormData(); // api call for upload Image in azure
                data.append("FileName", thinklyImage);
                const config = {
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                };
                axios__WEBPACK_IMPORTED_MODULE_3___default().post(`${BASE_URL_THINKLY}Image/PostUploadFile/${thinklyImage.name}`, data, config).then((res)=>{
                    console.log("PostUploadFile@@@@@@@@", res);
                    if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                        console.log("thinkly remote config json data@@@@", thinklyRemoteConfigJson.contest);
                        setTContentSlide(false);
                        setsettingSlide(true);
                    } else {
                        setTContentSlide(false);
                        setInterestSlide(true);
                    }
                }).catch((err)=>{
                    console.log("PostUploadFile error in catch", err);
                    jquery__WEBPACK_IMPORTED_MODULE_2___default()("#ImageUploadError").innerHTML = "Oops! Something went wrong. Try again";
                });
            } else {
                if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                    console.log("thinkly remote config json data@@@@", thinklyRemoteConfigJson.contest);
                    setTContentSlide(false);
                    setsettingSlide(true);
                } else {
                    setTContentSlide(false);
                    setInterestSlide(true);
                }
            }
        }
    };
    const handleTermsConditions = (index)=>{
        if (thinklyRemoteConfigJson !== undefined) {
            const termsURL = thinklyRemoteConfigJson.contest[index].contestTermsURL;
            window.open(termsURL, "_blank");
        }
    };
    const handleContest = (index)=>{
        console.log("index of contest", index);
    };
    const hideSettingAndShowInterest = ()=>{
        setsettingSlide(false);
        setInterestSlide(true);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetch(process.env.REACT_APP_INTEREST_JSON).then((response)=>response.json()).then((data)=>{
            console.log("interest list from api call", data);
            function SortArray(x, y) {
                if (x.CategoryDescription < y.CategoryDescription) {
                    return -1;
                }
                if (x.CategoryDescription > y.CategoryDescription) {
                    return 1;
                }
                return 0;
            }
            const sortedData = data.sort(SortArray);
            console.log("sorted interest data", sortedData);
            setInterest(sortedData);
        });
    }, []);
    const handleInterest = (index)=>{
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            `#${index}`.style.background = random_color;
            setarrayList((oldData)=>[
                    ...oldData,
                    index
                ]);
        } else if (arrayList.length > 0 && arrayList.find((element)=>element === index)) {
            `#${index}`.style.background = "none";
            setarrayList(arrayList.filter((item)=>item !== index));
        } else {
            `#${index}`.style.background = random_color;
            setarrayList((oldData)=>[
                    ...oldData,
                    index
                ]);
        }
    };
    const hideInterestAndShowSuccess = ()=>{
        console.log("comment status", commentView);
        console.log("thinklyPayType status", thinklyPayType);
        if (arrayList.length > 3) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#InterestError").innerHTML = "Interest should be less than or equal to 3";
        } else {
            console.log("array of interest", arrayList);
            setpublishLoader(true);
            createThinkly();
        }
    };
    const createThinkly = ()=>{
        var config = {
            method: "POST",
            headers: {
                DeviceID: "123456",
                UserID: LoggedInID,
                contentType: "application/json"
            },
            data: {
                ThinklyID: 0,
                DraftID: 0,
                PublicationID: getPublicationID,
                Title: window.localStorage.getItem("ThinklyName"),
                Description: blogContent,
                UserType: "Customer",
                AuthorID: LoggedInID,
                IsPublic: !commentView ? true : false,
                HashTags: [],
                ResponseID: 0,
                ResponseURL: "",
                Reason: "",
                CategoryIDs: arrayList,
                ThinklyType: !thinklyPayType ? "Free" : "Paid",
                ThinklyContentType: window.localStorage.getItem("content_type"),
                VideoID: "",
                VideoUrl: "",
                AudioUrl: "",
                ImageNames: thinklyImage !== "" ? [
                    thinklyImage.name
                ] : [],
                ImageLabels: [],
                OembedUrl: "",
                ThinklyUrl: ""
            }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default()(`${BASE_URL_THINKLY}Thinkly/InsertUpdateThinkly`, config).then((res)=>{
            console.log("create thinkly api triggered", res);
            if (res.data.responseCode === "00") {
                const thinkly_url = res.data.responseData.postData.postURL;
                setthinklyURL(thinkly_url);
                setInterestSlide(false);
                setSuccessSlide(true);
            }
        }).catch((err)=>{
            console.log("create thinkly error in catch", err);
        });
    };
    const handleCopyLink = ()=>{
        var text_to_copy = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#textcopy").innerHTML;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text_to_copy).then(setcopyLinkMsg(true) // success 
            ).catch((err)=>{
                console.log("error of copy link", err);
            });
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            id: "createThinkly",
            className: "modal fade in",
            tabIndex: "-1",
            role: "dialog",
            "data-backdrop": "static",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: !tContentSlide ? "modal-dialog modal-dialog-centered" : "modal-dialog modal-xl modal-dialog-centered",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "modal-content modal-background",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "button",
                            className: "close text-right pr-2",
                            "data-dismiss": "modal",
                            onClick: ()=>closeFunction(),
                            children: "\xd7"
                        }),
                        selectTypeSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body py-3 px-5",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "text-center",
                                    style: {
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    },
                                    children: " What are you creating today? "
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    children: " Choose your Thinkly type"
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.List, {
                                    style: {
                                        display: "grid",
                                        justifyContent: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItem, {
                                            alignItems: "flex-start",
                                            style: {
                                                cursor: "pointer"
                                            },
                                            selected: selectedIndex === 0,
                                            onClick: (event)=>handleListItemClick(event, 0),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemAvatar, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                        src: "/text.svg",
                                                        alt: "text"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                    className: "mt-3",
                                                    primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                        children: "Blog"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItem, {
                                            alignItems: "flex-start",
                                            style: {
                                                cursor: "not-allowed"
                                            },
                                            selected: selectedIndex === 1,
                                            disabled: true,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemAvatar, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                        src: "/audio.svg",
                                                        alt: "audio"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                    className: "mt-3",
                                                    primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                        children: "Audio"
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItem, {
                                            alignItems: "flex-start",
                                            style: {
                                                cursor: "not-allowed"
                                            },
                                            selected: selectedIndex === 2,
                                            disabled: true,
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemAvatar, {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                        src: "/vedio.svg",
                                                        alt: "video"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                    className: "mt-3",
                                                    primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                        children: "Video"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                selectedIndex === "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    id: "thinklyTypeError",
                                    className: "error-msg text-center"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center my-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "button-new-publication",
                                        style: {
                                            width: "40%"
                                        },
                                        onClick: ()=>hideTypeAndShowPubList(),
                                        children: "NEXT"
                                    })
                                })
                            ]
                        }) : selectPublication ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body px-5",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "text-center",
                                    style: {
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    },
                                    children: " New Thinkly "
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    children: "Under which publication do you wish to publish this Thinkly?"
                                }),
                                publicationList !== undefined && publicationList.length > 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        publicationList.map((obj, index)=>{
                                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "row d-flex",
                                                selected: getPublicationID === obj.publicationID,
                                                onClick: (event)=>handlePublicationSelection(event, index, obj.publicationID),
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "col-12 mx-auto",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "radio",
                                                            id: obj.publicationID,
                                                            name: "publication"
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                            style: {
                                                                marginTop: "-22px",
                                                                marginLeft: "22px"
                                                            },
                                                            primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                style: {
                                                                    fontSize: "14px",
                                                                    fontWeight: "bold"
                                                                },
                                                                children: obj.publicationName
                                                            }),
                                                            secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    children: obj.about
                                                                })
                                                            })
                                                        })
                                                    ]
                                                })
                                            }, index);
                                        }),
                                        getPublicationID === "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                            id: "selectPublicationError",
                                            className: "error-msg"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "text-center my-4",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                className: "button-new-publication",
                                                style: {
                                                    width: "40%"
                                                },
                                                onClick: ()=>hidePublicationAndShowthinkly(),
                                                children: "NEXT"
                                            })
                                        })
                                    ]
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        padding: "150px 0px",
                                        textAlign: "center"
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.CircularProgress, {
                                        "aria-label": "Loading..."
                                    })
                                })
                            ]
                        }) : tContentSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body scroll px-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    style: {
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    },
                                    children: "New Thinkly"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "row d-flex",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "mx-auto",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__.Card, {
                                            id: "img-preview",
                                            style: {
                                                height: "auto",
                                                width: "200px",
                                                border: "none",
                                                display: "inline-flex"
                                            },
                                            children: " "
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "row d-flex",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col-1 mx-auto",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__.Card, {
                                                    style: {
                                                        border: "none"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "file",
                                                            name: "choose-file",
                                                            accept: "image/*",
                                                            id: "choose-file",
                                                            style: {
                                                                display: "none"
                                                            },
                                                            onChange: (e)=>uploadImage(e.target.value)
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            htmlFor: "choose-file",
                                                            className: "text-center my-auto",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.AddPhotoAlternate, {
                                                                style: {
                                                                    color: "#e98c37"
                                                                }
                                                            })
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                    style: {
                                                        fontSize: "12px"
                                                    },
                                                    children: "Add image"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-11",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "text",
                                                placeholder: "Title",
                                                value: thinklyName,
                                                onChange: (e)=>setthinklyName(e.target.value),
                                                style: {
                                                    fontSize: "20px",
                                                    border: "none",
                                                    outline: "none",
                                                    width: "100%"
                                                }
                                            })
                                        })
                                    ]
                                }),
                                thinklyName === "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    id: "thinklyNameError",
                                    className: "error-msg"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    id: "ImageUploadError",
                                    className: "error-msg"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(ReactQuill, {
                                    className: "mb-4",
                                    type: "textarea",
                                    modules: modules,
                                    theme: "snow",
                                    id: "blogFromQuill",
                                    placeholder: "type here...",
                                    value: blogContent,
                                    onChange: (e)=>handleReactQuillData(e)
                                }),
                                blogContent === "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                    id: "blogError",
                                    className: "error-msg"
                                }),
                                publicationPayType === "Paid" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "row",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-3",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                    primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                        style: {
                                                            fontSize: "14px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Is this a Free or a Paid Thinkly?"
                                                    })
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "row",
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-3",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        className: "mr-2",
                                                        style: !thinklyPayType ? {
                                                            fontWeight: "bold"
                                                        } : {
                                                            color: "gray"
                                                        },
                                                        children: "Free"
                                                    }),
                                                    !thinklyPayType ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                            title: "Free",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOff, {
                                                                tooltip: "Free",
                                                                onClick: ()=>setthinklyPayType(true),
                                                                style: {
                                                                    marginTop: "0px",
                                                                    marginRight: "0px",
                                                                    fontSize: "40px"
                                                                }
                                                            })
                                                        })
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                            title: "Paid",
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOn, {
                                                                tooltip: "Paid",
                                                                onClick: ()=>setthinklyPayType(false),
                                                                style: {
                                                                    marginTop: "0px",
                                                                    marginRight: "0px",
                                                                    fontSize: "40px"
                                                                }
                                                            })
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        className: "ml-2",
                                                        style: thinklyPayType ? {
                                                            fontWeight: "bold"
                                                        } : {
                                                            color: "gray"
                                                        },
                                                        children: "Paid"
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "row",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-6",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                            primary: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                        style: {
                                                            fontSize: "14px",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Enable Privilic View Of Comments"
                                                    }),
                                                    !commentView ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                        title: "Public",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOff, {
                                                            tooltip: "Public",
                                                            onClick: ()=>setcommentView(true),
                                                            style: {
                                                                marginTop: "0px",
                                                                marginLeft: "28px",
                                                                fontSize: "40px"
                                                            }
                                                        })
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                        title: "Private",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOn, {
                                                            tooltip: "Private",
                                                            onClick: ()=>setcommentView(false),
                                                            style: {
                                                                marginTop: "0px",
                                                                marginLeft: "28px",
                                                                fontSize: "40px"
                                                            }
                                                        })
                                                    })
                                                ]
                                            }),
                                            secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                style: {
                                                    fontSize: "12px"
                                                },
                                                children: "Prevent others from reading comments on your Thinkly"
                                            })
                                        })
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center mt-4 my-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "button-new-publication",
                                        style: {
                                            width: "20%"
                                        },
                                        onClick: ()=>hidethinklyAndShowSettingOrInterest(),
                                        children: "NEXT"
                                    })
                                })
                            ]
                        }) : settingSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body px-4",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    style: {
                                        fontSize: "18px",
                                        fontWeight: "bold"
                                    },
                                    children: "New Thinkly"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "row",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-10",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                    style: {
                                                        fontSize: "14px",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Participating in a contest?"
                                                }),
                                                secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("text", {
                                                    style: {
                                                        fontSize: "12px"
                                                    },
                                                    children: " Select the contest you are participating in "
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-1",
                                            children: !contest ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                    title: "Not Intrested",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOff, {
                                                        tooltip: "Not Intrested",
                                                        onClick: ()=>setcontest(true),
                                                        style: {
                                                            marginTop: "0px",
                                                            marginRight: "0px",
                                                            fontSize: "40px"
                                                        }
                                                    })
                                                })
                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.Tooltip, {
                                                    title: "Intrested",
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.ToggleOn, {
                                                        tooltip: "Intrested",
                                                        onClick: ()=>setcontest(false),
                                                        style: {
                                                            marginTop: "0px",
                                                            marginRight: "0px",
                                                            fontSize: "40px"
                                                        }
                                                    })
                                                })
                                            })
                                        })
                                    ]
                                }),
                                contest && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "row mt-4",
                                    children: thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.map((obj, index)=>{
                                        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "col-6 mb-2",
                                            onClick: ()=>handleContest(index),
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__.Card, {
                                                className: "px-2 py-2",
                                                style: {
                                                    background: "#ffe7cc",
                                                    border: "none",
                                                    width: "100%",
                                                    height: "70px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                                                        src: obj.contestImageURL,
                                                        alt: "contest",
                                                        style: {
                                                            width: "60px",
                                                            height: "60px"
                                                        }
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.ListItemText, {
                                                        className: "line-height-align",
                                                        style: {
                                                            marginTop: "-60px",
                                                            marginLeft: "70px"
                                                        },
                                                        primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            style: {
                                                                fontSize: "14px"
                                                            },
                                                            children: obj.contestTitle
                                                        }),
                                                        secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                            style: {
                                                                color: "#3c7493",
                                                                fontSize: "12px",
                                                                fontWeight: "bold",
                                                                lineHeight: "0"
                                                            },
                                                            children: obj.contestID
                                                        })
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        style: {
                                                            fontSize: "8px",
                                                            marginLeft: "70px",
                                                            lineHeight: "0"
                                                        },
                                                        children: [
                                                            "I agree to the",
                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                                                                href: "#contestTerms&Conditions",
                                                                style: {
                                                                    color: "#3c7493"
                                                                },
                                                                onClick: ()=>handleTermsConditions(index),
                                                                children: [
                                                                    " ",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("u", {
                                                                        children: "Terms & Conditions"
                                                                    }),
                                                                    " "
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        }, index);
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center my-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "button-new-publication",
                                        style: {
                                            width: "20%"
                                        },
                                        onClick: ()=>hideSettingAndShowInterest(),
                                        children: "NEXT"
                                    })
                                })
                            ]
                        }) : InterestSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body px-3",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                    className: "text-center",
                                    style: {
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    },
                                    children: "New Thinkly"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    children: "People with these interests* will be able to discover this Thinkly"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "interest-card",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: Interest !== undefined && Interest.map((obj, index)=>{
                                            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-4 mb-3",
                                                onClick: ()=>handleInterest(obj.CategoryID),
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__.Card, {
                                                    id: `${obj.CategoryID}`,
                                                    className: "sub-interest-card mx-auto my-auto",
                                                    children: obj.CategoryDescription
                                                }, index)
                                            }, index);
                                        })
                                    })
                                }),
                                arrayList.length > 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    id: "InterestError",
                                    className: "error-msg"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center my-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "button-new-publication",
                                        style: {
                                            width: "40%"
                                        },
                                        onClick: ()=>hideInterestAndShowSuccess(),
                                        children: publishLoader ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__.CircularProgress, {
                                            style: {
                                                width: "20px",
                                                height: "20px",
                                                color: "#fff"
                                            }
                                        }) : "Publish"
                                    })
                                })
                            ]
                        }) : successSlide && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "modal-body px-5 text-center",
                            style: {
                                marginTop: "100px",
                                marginBottom: "100px"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_8__.CheckCircleOutline, {
                                    style: {
                                        color: "#ea7f00",
                                        width: "80px",
                                        height: "80px"
                                    }
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: "mt-4",
                                    style: {
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    },
                                    children: "Congratulations!"
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    style: {
                                        marginTop: "-25px",
                                        fontSize: "20px"
                                    },
                                    children: "Your Thinkly has been successfully posted"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    id: "textcopy",
                                    style: {
                                        display: "none"
                                    },
                                    children: thinklyURL
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "text-center my-4",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                        className: "button-new-publication",
                                        style: {
                                            width: "40%"
                                        },
                                        onClick: ()=>handleCopyLink(),
                                        children: "Share Link"
                                    })
                                }),
                                copyLinkMsg && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "text-center",
                                    children: "Link Copied to your clipboard. Share it in your social networks."
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewThinkly);


/***/ }),

/***/ 8227:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2947);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8130);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2105);
/* harmony import */ var _material_ui_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _pages_api_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3157);
/* harmony import */ var _posts_newThinkly__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9320);










// import Collabrate from './addCoAuthor.jsx';
// import Publication from './publication.jsx';
const NewPublication = (props)=>{
    const BASE_URL_THINKLY = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_pages_api_api__WEBPACK_IMPORTED_MODULE_8__/* .baseUrlThinkly */ .R);
    const { 0: AuthorID , 1: setAuthorID  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: welcomeSlide , 1: setwelcomeSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: aboutSlide , 1: setaboutSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: descriptionSlide , 1: setDescriptionSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: subscriptionSlide , 1: setsubscriptionSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: InterestSlide , 1: setInterestSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: Interest , 1: setInterest  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: successSlide , 1: setSuccessSlide  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: OpenCollabrate , 1: setOpenCollabrate  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: OpenCreateThinkly , 1: setOpenCreateThinkly  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: OpenShare , 1: setOpenShare  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: OpenPublicationPage , 1: setOpenPublicationPage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: planIndex , 1: setplanIndex  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: arrayList , 1: setarrayList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { 0: pubName , 1: setpubName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(""); // store input data and pass in api
    const { 0: showImage , 1: setshowImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: pubImage , 1: setpubImage  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: webUrl , 1: setwebUrl  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: penNameResponse , 1: setpenNameResponse  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: pen_name_pub , 1: setpen_name_pub  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: shortDescription , 1: setshortDescription  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: description , 1: setdescription  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: price , 1: setprice  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: PlanDetailData , 1: setPlanDetailData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const { 0: color , 1: setcolor  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([
        "#f3a56c",
        "#c37d8d",
        "#3c7493",
        "#7ec2bf"
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (props.authorID !== undefined) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#newPublication").modal("show");
            setAuthorID(props.authorID);
            setwelcomeSlide(true);
            setshowImage(false);
        }
    }, []);
    const closeFunction = ()=>{
        localStorage.clear();
        setwelcomeSlide(true);
        setshowImage(false);
    };
    const hideWelcomeAndShowAbout = ()=>{
        setwelcomeSlide(false);
        setaboutSlide(true);
    };
    const uploadImage = (event)=>{
        const chooseFile = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#choose-file");
        const imgPreview = jquery__WEBPACK_IMPORTED_MODULE_2___default()("#img-preview");
        const files = chooseFile.files[0]; //in case multiple image got selected then pick 1st one only
        const str = files.type;
        const image_extension = str.substring(str.indexOf("/") + 1);
        const myRenamedFile = new File([
            files
        ], `${AuthorID}_${files.lastModified}.${image_extension}`);
        if (myRenamedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(myRenamedFile);
            fileReader.addEventListener("load", function() {
                imgPreview.innerHTML = '<Image src="' + this.result + '" alt="pImage" />';
            });
        }
        setshowImage(true);
        setpubImage(myRenamedFile);
    };
    const hideAboutandShowDescription = ()=>{
        if (pubName === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#pubNameError").innerHTML = "Please Enter the publication Name";
        } else if (pubImage === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#pubImageError").innerHTML = "Please select an Image for publication Profile";
        } else {
            window.localStorage.setItem("Publication Name", pubName);
            window.localStorage.setItem("Publication Image", pubImage.name);
            var data = new FormData(); // api call for upload Image in azure
            data.append("FileName", pubImage);
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            };
            axios__WEBPACK_IMPORTED_MODULE_3___default().post(`${BASE_URL_THINKLY}Image/PostUploadFile/${pubImage.name}`, data, config).then((res)=>{
                console.log("PostUploadFile@@@@@@@@", res);
                setaboutSlide(false) //hide about page
                ;
                setDescriptionSlide(true) //show description page
                ;
            }).catch((err)=>{
                console.log("PostUploadFile error in catch", err);
                jquery__WEBPACK_IMPORTED_MODULE_2___default()("#pubImageUploadError").innerHTML = "Oops! Something went wrong. Try again";
            });
        }
    };
    const fetchPenName = (e)=>{
        var pen_name = e.target.value;
        setwebUrl(pen_name);
        if (pen_name.length >= 5 || pen_name.length === 15) {
            var config = {
                headers: {
                    DeviceID: "123456",
                    UserID: AuthorID
                }
            };
            axios__WEBPACK_IMPORTED_MODULE_3___default().get(`${BASE_URL_THINKLY}Publication/IsPennameAvailable/@${pen_name}`, config).then((res)=>{
                if (res.data.responseCode === "00") {
                    const response = res.data.responseData.available;
                    setpenNameResponse(response);
                    if (response === false) {
                        jquery__WEBPACK_IMPORTED_MODULE_2___default()("#penNameError").innerHTML = "This Pen name is already taken";
                    }
                }
            }).catch((err)=>{
                console.log("IsPennameAvailable error in catch", err);
            });
        }
    };
    const hideDescriptionAndShowPlan = ()=>{
        if (webUrl === "" || webUrl.length === 0) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#UrlError").innerHTML = "please Enter the publication pen name";
        } else if (shortDescription === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#shortDescriptionError").innerHTML = "please Enter about the publication";
        } else if (description === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#descriptionError").innerHTML = "please Enter the publication description";
        } else if (webUrl.length > 1 && webUrl.length < 5) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#penNameError").innerHTML = "Please match the requested format(Should include minimum 5 characters, maximum 15 characters, no space, no special characters except _). ";
        } else {
            window.localStorage.setItem("Web URL", webUrl);
            window.localStorage.setItem("Short Description", shortDescription);
            window.localStorage.setItem("Description", description);
            setDescriptionSlide(false);
            setsubscriptionSlide(true);
            planDetail();
        }
    };
    const handleSubscription = (event, index)=>{
        console.log("index", index);
        var planType = "";
        if (index === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#planError").innerHTML = "Please select subscription plan for this publication";
        } else if (index !== "" && index === 0) {
            planType = "Free";
            window.localStorage.setItem("Plan", planType);
        } else if (index !== "" && index === 1) {
            setprice("");
            planType = "Monthly";
            window.localStorage.setItem("Plan", planType);
        } else if (index !== "" && index === 2) {
            setprice("");
            planType = "OneTime";
            window.localStorage.setItem("Plan", planType);
        }
        setplanIndex(index);
    };
    const hidePlanAndShowInterest = ()=>{
        if (planIndex === "") {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#planError").innerHTML = "Please select subscription plan for this publication";
        } else if (planIndex === 0) {
            setsubscriptionSlide(false);
            setInterestSlide(true);
        } else if (planIndex === 1) {
            if (price !== undefined && price !== null && price !== "" && price % 10 === 0) {
                window.localStorage.setItem("Monthly cost", price);
                setsubscriptionSlide(false);
                setInterestSlide(true);
            } else {
                jquery__WEBPACK_IMPORTED_MODULE_2___default()("#mPriceError").innerHTML = "Enter valid amount";
            }
        } else if (planIndex === 2) {
            if (price !== undefined && price !== null && price !== "" && price % 10 === 0) {
                window.localStorage.setItem("oneTime cost", price);
                setsubscriptionSlide(false);
                setInterestSlide(true);
            } else {
                jquery__WEBPACK_IMPORTED_MODULE_2___default()("#otPriceError").innerHTML = "Enter valid amount";
            }
        }
    };
    const planDetail = ()=>{
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": "123456",
                "UserID": "21723"
            }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default().get(`${BASE_URL_THINKLY}Publication/GetPublicationPlanForDeviceType/AND`, config).then((res)=>{
            if (res.data.responseCode === "00") {
                console.log("GetPublicationPlanForDeviceType ", res.data.responseData);
                setPlanDetailData(res.data.responseData);
            }
        }).catch((err)=>{
            console.log("GetPublicationPlanForDeviceType error in catch", err);
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        console.log("PlanDetailData@@@@", PlanDetailData);
    }, [
        PlanDetailData
    ]);
    // json called for all interest list
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        fetch(process.env.REACT_APP_INTEREST_JSON).then((response)=>response.json()).then((data)=>{
            console.log("interest list", data);
            setInterest(data);
        });
    }, []);
    const handleInterest = (index)=>{
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(`#${index}`).style.background = random_color;
            setarrayList((oldData)=>[
                    ...oldData,
                    index
                ]);
        } else if (arrayList.length > 0 && arrayList.find((element)=>element === index)) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(`#${index}`).style.background = "none";
            setarrayList(arrayList.filter((item)=>item !== index));
        } else {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()(`#${index}`).style.background = random_color;
            setarrayList((oldData)=>[
                    ...oldData,
                    index
                ]);
        }
    };
    const hideInterestAndShowSuccess = ()=>{
        if (arrayList.length < 3) {
            jquery__WEBPACK_IMPORTED_MODULE_2___default()("#InterestError").innerHTML = "Please select at least 3 interest";
        } else {
            console.log("array of interest", arrayList);
            createPublication();
        }
    };
    const createPublication = ()=>{
        var publication_name = window.localStorage.getItem("Publication Name");
        var publication_image = window.localStorage.getItem("Publication Image");
        var publication_description = window.localStorage.getItem("Description");
        var publication_Shortdescription = window.localStorage.getItem("Short Description");
        var publication_penName = window.localStorage.getItem("Web URL");
        setpen_name_pub(publication_penName);
        var publication_plan = window.localStorage.getItem("Plan");
        var publication_payType = "";
        if (publication_plan === "Free") {
            publication_payType = "Free";
        } else {
            publication_payType = "Paid";
        }
        if (PlanDetailData !== undefined) {
            var plan_free = PlanDetailData.findIndex(function(obj) {
                return obj.name == "Free";
            });
            var plan_monthly = PlanDetailData.findIndex(function(obj) {
                return obj.name == "Monthly Subscription";
            });
            var plan_oneTime = PlanDetailData.findIndex(function(obj) {
                return obj.name == "OneTimePayment";
            });
        }
        var monthly_plan = 0;
        var oneTime_plan = 0;
        var free_plan = 0;
        var publication_planID = "";
        var starPrice = "";
        var finalPrice = 0;
        if (publication_plan === "Monthly") {
            monthly_plan = window.localStorage.getItem("Monthly cost");
            publication_planID = PlanDetailData[plan_monthly].publicationPlanID;
            starPrice = parseInt(monthly_plan) / PlanDetailData[plan_monthly].perStarPrice;
            finalPrice = monthly_plan;
        } else if (publication_plan === "OneTime") {
            oneTime_plan = window.localStorage.getItem("oneTime cost");
            publication_planID = PlanDetailData[plan_oneTime].publicationPlanID;
            starPrice = parseInt(oneTime_plan) / PlanDetailData[plan_oneTime].perStarPrice;
            finalPrice = oneTime_plan;
        } else if (publication_plan === "Free") {
            publication_planID = PlanDetailData[plan_free].publicationPlanID;
            starPrice = parseInt(free_plan) / PlanDetailData[plan_free].perStarPrice;
            finalPrice = finalPrice;
        }
        var data = new FormData();
        data.append("channelID", "3");
        data.append("name", publication_name);
        data.append("about", publication_description);
        data.append("image", publication_image);
        data.append("createdBy", AuthorID);
        data.append("shortDes", publication_Shortdescription);
        data.append("category", arrayList.toString());
        data.append("authorsID", "");
        data.append("payType", publication_payType);
        data.append("oTCharge", oneTime_plan);
        data.append("moCharge", monthly_plan);
        data.append("penName", "@" + publication_penName);
        data.append("aboutUs", "");
        data.append("publicationPlanID", publication_planID);
        data.append("noOfStars", starPrice);
        data.append("publicationPrice", finalPrice);
        var config = {
            headers: {
                DeviceID: "123456",
                UserID: AuthorID
            }
        };
        axios__WEBPACK_IMPORTED_MODULE_3___default().post(`${BASE_URL_THINKLY}Publication/CreatePublication`, data, config).then((res)=>{
            console.log("createPublication", res);
            setInterestSlide(false);
            setSuccessSlide(true);
        }).catch((err)=>{
            console.log("createPublication error in catch", err);
        });
    };
    const handleCollabrate = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()("#newPublication").modal("hide");
        setOpenCollabrate(true);
    };
    const handleNewThinkly = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()("#newPublication").modal("hide");
        setOpenCreateThinkly(true);
    };
    const handleShare = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()("#newPublication").modal("hide");
        setOpenShare(true);
    };
    const fetchOpenPublication = ()=>{
        jquery__WEBPACK_IMPORTED_MODULE_2___default()("#newPublication").modal("hide");
        setOpenPublicationPage(true);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                id: "newPublication",
                className: "modal fade in",
                tabIndex: "-1",
                role: "dialog",
                "data-backdrop": "static",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "modal-dialog modal-dialog-centered",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "modal-content modal-background",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "button",
                                className: "close text-right pr-2",
                                "data-dismiss": "modal",
                                onClick: ()=>closeFunction(),
                                children: "\xd7"
                            }),
                            welcomeSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                        className: "text-center",
                                        style: {
                                            fontSize: "18px",
                                            fontWeight: "bold"
                                        },
                                        children: " Create Your Publication "
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-center",
                                        children: " Thinkly provides a one stop solution for all your publication needs."
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.List, {
                                        style: {
                                            display: "grid",
                                            justifyContent: "center"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItem, {
                                                alignItems: "flex-start",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemAvatar, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.Edit, {
                                                            style: {
                                                                color: "#3c7493",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                        primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                            children: "Customize"
                                                        }),
                                                        secondary: "Add cover image, title, subline"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItem, {
                                                alignItems: "flex-start",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemAvatar, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.EventAvailableOutlined, {
                                                            style: {
                                                                color: "#c37d8d",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                        primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                            children: "Editorial freedom"
                                                        }),
                                                        secondary: "Play your own publication time"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItem, {
                                                alignItems: "flex-start",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemAvatar, {
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.EventAvailableOutlined, {
                                                            style: {
                                                                color: "#c37d8d",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        })
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fa-solid fa-indian-rupee-sign"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                        primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                            children: "Get Paid"
                                                        }),
                                                        secondary: "Earn through your content"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication",
                                            style: {
                                                width: "40%"
                                            },
                                            onClick: ()=>hideWelcomeAndShowAbout(),
                                            children: "START"
                                        })
                                    })
                                ]
                            }) : aboutSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mx-auto",
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "bold"
                                            },
                                            children: " About publication "
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col-10 mx-auto",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                    type: "text",
                                                    minLength: "2",
                                                    maxLength: "30",
                                                    className: "bottomline-textbox",
                                                    id: "publication_title",
                                                    placeholder: "Choose a catchy title (max 30 characters)",
                                                    value: pubName,
                                                    onChange: (e)=>setpubName(e.target.value)
                                                }),
                                                pubName === "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    id: "pubNameError",
                                                    className: "error-msg"
                                                }) : ""
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "col-10 mx-auto text-center mt-2",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.Card, {
                                                    className: "mx-auto",
                                                    id: "img-preview",
                                                    value: pubImage,
                                                    style: {
                                                        height: "auto",
                                                        width: "200px",
                                                        border: "none",
                                                        display: "inline-flex"
                                                    },
                                                    children: " "
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "type-file-hide",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                            type: "file",
                                                            name: "choose-file",
                                                            accept: "image/*",
                                                            id: "choose-file",
                                                            onChange: (e)=>uploadImage(e.target.value)
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                            htmlFor: "choose-file",
                                                            style: {
                                                                fontSize: "16px",
                                                                fontFamily: "Lora",
                                                                color: "#3c7493"
                                                            },
                                                            children: !showImage ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                children: " Add Publication Picture*"
                                                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                                children: " Update Publication Picture"
                                                            })
                                                        }),
                                                        pubImage === "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            id: "pubImageError",
                                                            className: "error-msg"
                                                        }) : "",
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            id: "pubImageUploadError",
                                                            className: "error-msg"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication",
                                            style: {
                                                width: "40%"
                                            },
                                            onClick: ()=>hideAboutandShowDescription(),
                                            children: "NEXT"
                                        })
                                    })
                                ]
                            }) : descriptionSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            className: "mx-auto",
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "bold"
                                            },
                                            children: " Publication Description "
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-12 mb-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        style: {
                                                            fontSize: "12px",
                                                            fontFamily: "Lora",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Web URL*"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        style: {
                                                            fontSize: "12px"
                                                        },
                                                        children: "Unique url for your publication. Choose wisely! This cannot be changed after the Publication is created."
                                                    }),
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                        className: "row",
                                                        children: [
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "col-4",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("b", {
                                                                    children: "www.thinkly.me/"
                                                                })
                                                            }),
                                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "col-8",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                                    type: "text",
                                                                    id: "web-url",
                                                                    className: "interest-textbox",
                                                                    minLength: "2",
                                                                    maxLength: "20",
                                                                    value: webUrl,
                                                                    onChange: (e)=>fetchPenName(e)
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    webUrl === "" || webUrl.length === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        id: "UrlError",
                                                        className: "error-msg"
                                                    }) : "",
                                                    penNameResponse === false || webUrl.length > 1 && webUrl.length < 5 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        id: "penNameError",
                                                        className: "error-msg"
                                                    }) : ""
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-12 mb-2",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        style: {
                                                            fontSize: "12px",
                                                            fontFamily: "Lora",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "What is it about?*"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                        type: "text",
                                                        id: "pub-about",
                                                        className: "interest-textbox",
                                                        minLength: "2",
                                                        maxLength: "50",
                                                        placeholder: 'E.g. "Fitness is forever" (max 50 characters)',
                                                        value: shortDescription,
                                                        onChange: (e)=>setshortDescription(e.target.value)
                                                    }),
                                                    shortDescription === "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        id: "shortDescriptionError",
                                                        className: "error-msg"
                                                    }) : ""
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "col-12",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                        style: {
                                                            fontSize: "12px",
                                                            fontFamily: "Lora",
                                                            fontWeight: "bold"
                                                        },
                                                        children: "Description*"
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                                        id: "description",
                                                        className: "interest-textbox",
                                                        minLength: "2",
                                                        maxLength: "1000",
                                                        rows: 5,
                                                        value: description,
                                                        onChange: (e)=>setdescription(e.target.value),
                                                        placeholder: "Tell people why their lives will be letter by reading your publication. Explain the value, rather then the content!"
                                                    }),
                                                    description === "" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        id: "descriptionError",
                                                        className: "error-msg"
                                                    }) : ""
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication",
                                            style: {
                                                width: "40%"
                                            },
                                            onClick: ()=>hideDescriptionAndShowPlan(),
                                            children: "NEXT"
                                        })
                                    })
                                ]
                            }) : subscriptionSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row d-flex",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                                className: "mx-auto",
                                                style: {
                                                    fontSize: "22px",
                                                    fontWeight: "bold"
                                                },
                                                children: "Subscription Plan"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                children: 'For paid plans, you will get paid in Starts which can be redeemed from the "My Stars" page.'
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row mt-4 px-3",
                                        selected: planIndex === 0,
                                        onClick: (event)=>handleSubscription(event, 0),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "radio",
                                                name: "plan",
                                                value: "Free",
                                                style: {
                                                    width: "20px",
                                                    height: "20px"
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                style: {
                                                    marginTop: "-32px",
                                                    marginLeft: "36px",
                                                    marginBottom: "-10px"
                                                },
                                                primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    style: {
                                                        fontFamily: "Lora",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Free"
                                                }),
                                                secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        children: " Subscribers can read all Thinkles in this publication for free"
                                                    })
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row mt-4 px-3",
                                        selected: planIndex === 1,
                                        onClick: (event)=>handleSubscription(event, 1),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "radio",
                                                name: "plan",
                                                value: "Monthily Subscription",
                                                style: {
                                                    width: "20px",
                                                    height: "20px"
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                style: {
                                                    marginTop: "-32px",
                                                    marginLeft: "36px",
                                                    marginBottom: "-10px"
                                                },
                                                primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    style: {
                                                        fontFamily: "Lora",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "Monthly Subscription"
                                                }),
                                                secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        children: " Subscribers will apy a fixed monthly amount to read all Thinklies in this publication"
                                                    })
                                                })
                                            })
                                        ]
                                    }),
                                    planIndex === 1 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "number",
                                                id: "planPrice",
                                                className: "interest-textbox",
                                                minLength: 1,
                                                maxLength: 3,
                                                value: price,
                                                placeholder: "Amount should be multiple of 10",
                                                onChange: (e)=>setprice(e.target.value)
                                            }),
                                            price !== "" && price !== undefined && price % 10 === 0 ? "" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                id: "mPriceError",
                                                className: "error-msg text-center"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("hr", {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row mt-4 px-3",
                                        selected: planIndex === 2,
                                        onClick: (event)=>handleSubscription(event, 2),
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "radio",
                                                name: "plan",
                                                value: "OneTime Payment",
                                                style: {
                                                    width: "20px",
                                                    height: "20px"
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                style: {
                                                    marginTop: "-32px",
                                                    marginLeft: "36px",
                                                    marginBottom: "-10px"
                                                },
                                                primary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    style: {
                                                        fontFamily: "Lora",
                                                        fontWeight: "bold"
                                                    },
                                                    children: "OneTime Payment"
                                                }),
                                                secondary: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        children: " Subscribers will pay a fixed amount one time to read all Thinklies in this publication"
                                                    })
                                                })
                                            })
                                        ]
                                    }),
                                    planIndex === 2 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                                        children: [
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                                type: "number",
                                                id: "planPrice",
                                                className: "interest-textbox",
                                                minLength: 1,
                                                maxLength: 3,
                                                value: price,
                                                placeholder: "Amount should be multiple of 10",
                                                onChange: (e)=>setprice(e.target.value)
                                            }),
                                            planIndex === 2 && price !== "" && price !== undefined && price % 10 === 0 ? "" : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                                id: "otPriceError",
                                                className: "error-msg text-center"
                                            })
                                        ]
                                    }),
                                    planIndex === "" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                                        id: "planError",
                                        className: "error-msg text-center"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication",
                                            style: {
                                                width: "40%"
                                            },
                                            onClick: ()=>hidePlanAndShowInterest(),
                                            children: "NEXT"
                                        })
                                    })
                                ]
                            }) : InterestSlide ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h6", {
                                        className: "text-center",
                                        style: {
                                            fontSize: "20px",
                                            fontWeight: "bold"
                                        },
                                        children: "Tag Interests*"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-center",
                                        children: "People with these interests will be able to discover this Publication"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "interest-card",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "row d-flex",
                                            children: Interest !== undefined && Interest.map((obj, index)=>{
                                                return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    className: "col-4 mb-3",
                                                    onClick: ()=>handleInterest(obj.CategoryID),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.Card, {
                                                        id: `${obj.CategoryID}`,
                                                        className: "sub-interest-card mx-auto my-auto",
                                                        children: obj.CategoryDescription
                                                    }, index)
                                                }, index);
                                            })
                                        })
                                    }),
                                    arrayList.length < 3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        id: "InterestError",
                                        className: "error-msg"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication",
                                            style: {
                                                width: "40%"
                                            },
                                            onClick: ()=>hideInterestAndShowSuccess(),
                                            children: "NEXT"
                                        })
                                    })
                                ]
                            }) : successSlide && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "modal-body py-3 px-5",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-center",
                                        style: {
                                            fontSize: "22px",
                                            fontWeight: "bold"
                                        },
                                        children: "Congratulations, your Publication is ready!"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "row d-flex",
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                                            className: "mx-auto text-center",
                                            style: {
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                background: "#ffe7cc",
                                                width: "80%"
                                            },
                                            children: [
                                                "www.thinkly.me/",
                                                pen_name_pub
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "row d-flex mt-4",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-12",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.Card, {
                                                    className: "mx-auto pl-2 py-2 mb-3",
                                                    style: {
                                                        width: "280px",
                                                        border: "none"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.PeopleAltOutlined, {
                                                            style: {
                                                                color: "#7ec2bf",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                            style: {
                                                                marginTop: "-34px",
                                                                marginLeft: "40px"
                                                            },
                                                            primary: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                                                children: [
                                                                    "Collaborate",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        href: "#AddcoAuthor",
                                                                        onClick: ()=>handleCollabrate(),
                                                                        style: {
                                                                            fontSize: "12px",
                                                                            color: "#e98c37"
                                                                        },
                                                                        children: "...Add co-author"
                                                                    })
                                                                ]
                                                            }),
                                                            secondary: "Invite other Thinkliers to co-author your publication"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-12",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.Card, {
                                                    className: "mx-auto pl-2 py-2 mb-3",
                                                    style: {
                                                        width: "280px",
                                                        border: "none"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.Edit, {
                                                            style: {
                                                                color: "#c37d8d",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                            style: {
                                                                marginTop: "-34px",
                                                                marginLeft: "40px"
                                                            },
                                                            primary: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                                                children: [
                                                                    "Create",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        href: "#AddThinkly",
                                                                        onClick: ()=>handleNewThinkly(),
                                                                        style: {
                                                                            fontSize: "12px",
                                                                            color: "#e98c37"
                                                                        },
                                                                        children: "...Create Thinkly"
                                                                    })
                                                                ]
                                                            }),
                                                            secondary: "Write your first Thinkly"
                                                        })
                                                    ]
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "col-12",
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__.Card, {
                                                    className: "mx-auto pl-2 py-2 mb-3",
                                                    style: {
                                                        width: "280px",
                                                        border: "none"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_icons__WEBPACK_IMPORTED_MODULE_7__.EmailOutlined, {
                                                            style: {
                                                                color: "#3c7493",
                                                                width: "28px",
                                                                height: "28px"
                                                            }
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__.ListItemText, {
                                                            style: {
                                                                marginTop: "-34px",
                                                                marginLeft: "40px"
                                                            },
                                                            primary: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("b", {
                                                                children: [
                                                                    "Share",
                                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                                        href: "#shareLink",
                                                                        onClick: ()=>handleShare(),
                                                                        style: {
                                                                            fontSize: "12px",
                                                                            color: "#e98c37"
                                                                        },
                                                                        children: "...Share Link"
                                                                    })
                                                                ]
                                                            }),
                                                            secondary: "Start spreading the word"
                                                        })
                                                    ]
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "text-center my-4",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "button-new-publication mr-4",
                                            style: {
                                                width: "60%",
                                                fontWeight: "500"
                                            },
                                            onClick: ()=>fetchOpenPublication(),
                                            children: "Open Publication"
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                })
            }),
            OpenCreateThinkly && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_posts_newThinkly__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                show: OpenCreateThinkly,
                listInterest: Interest,
                author: AuthorID
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewPublication);


/***/ }),

/***/ 3157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ baseUrl),
/* harmony export */   "R": () => (/* binding */ baseUrlThinkly)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const baseUrl = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( false ? 0 : "https://thinklyapi.azurewebsites.net/api/");
const baseUrlThinkly = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)( false ? 0 : "https://thinkly.me/thinklyapi/api/");


/***/ })

};
;