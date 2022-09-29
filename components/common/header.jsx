import React, { useState, useEffect, useContext } from 'react'
import Axios from "axios";
import $ from 'jquery'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { isMobile } from "react-device-detect"
import { Avatar, Card } from '@material-ui/core'
import { CheckCircleOutline, AssignmentIndOutlined, ArrowDropDown, Menu, ShareRounded } from '@material-ui/icons'
import { baseUrlThinkly } from '../../pages/api/api';
import SharePage from './sharePage';
import NewThinkly from '../posts/newThinkly';
import NewPublication from '../publication/newPublication';

const Header = (props) => {
    const router = useRouter();
    const BASE_URL = useContext(baseUrlThinkly);
    const emailValidate = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const [getEmail, setEmail] = useState(false)
    const [EmailInput, setEmailInput] = useState()
    const [ErrorMsg, setErrorMsg] = useState('')
    const [userID, setuserID] = useState(false)  //stored props data of user ID
    const [userProfileImage, setuserProfileImage] = useState()  //stored props data of user profile image
    const [userPenName, setuserPenName] = useState()  //stored props data of user penName
    const [user_status, setuser_status] = useState() //stored props data of user loggedIn status

    const [PublicationCount, setPublicationCount] = useState(0)  //stored props data of user publication count
    const [pub_count, setpub_count] = useState(0)  //stored props data of user publication count

    const [thinklyRemoteConfigData, setthinklyRemoteConfigData] = useState()  //stored props data of thinkly remote config json
    const [showThinkly, setshowThinkly] = useState(false)  //hide and show modal box of new thinkly
    const [showPublication, setshowPublication] = useState(false)  //hide and show modal box of new publication
    const [getPath, setPath] = useState('') //stored url fetch path
    const [showShareUrlPopup, setshowShareUrlPopup] = useState(false)  //hide and show modal popup of share url 
    const [showForUserProfile, setshowForUserProfile] = useState()  //to show header other half part according to page
    const [isPartialUser, setisPartialUser] = useState(false)  //if user not registered in app then don't show create button
    const [openInAppUrl, setopenInAppUrl] = useState(null)  //dynamic link for mob
    // const [customDashboard, setcustomDashboard] = useState(false)  //to show text beside logo (where the world comes to think), set true if path (/) inside 2nd useEffect

    useEffect(() => { //all props related data fetched and set in state here
        if (props.user_profile !== undefined && props.thinklyConfigJSON !== undefined) { //coming from main index.js
            setshowForUserProfile('dashboard')
            setPublicationCount(props.user_profile.otherDetails.totalPublicationsCount)
            var data = props.user_profile.profileDetails
            setuserID(data.userID)
            setisPartialUser(data.isPartialProfile)
            var name = data.penName.charAt(0) === '@' ? data.penName.substring(1) : data.penName
            setuserPenName(name)
            var image = data.profileImage.charAt(0) === '@' ? data.profileImage.substring(1) : data.profileImage
            setuserProfileImage(image);
            setthinklyRemoteConfigData(props.thinklyConfigJSON)
        }
        // from user profile detail page
        if (props.userProfile !== undefined && props.showContentForUserProfile !== undefined) {
            setshowForUserProfile(props.showContentForUserProfile === true && 'loggedInUserProfile')
            var data = props.userProfile.profileDetails
            setuserID(data.userID)
            setisPartialUser(data.isPartialProfile)
            var name = data.penName.charAt(0) === '@' ? data.penName.substring(1) : data.penName
            setuserPenName(name)
            var image = data.profileImage.charAt(0) === '@' ? data.profileImage.substring(1) : data.profileImage
            setuserProfileImage(image)
            setisPartialUser(data.isPartialProfile)
        } else if (props.showContentForUserProfile !== undefined) {
            setshowForUserProfile(props.showContentForUserProfile === false && 'otherUserProfile')
        }
    }, [])

    useEffect(() => {  //set path value on base of url handled here
        var path = router.asPath;
        if (path.includes('/signup')) {
            setPath('signup')
        } else if (path.includes('/login')) {
            setPath('login')
        } else if (path.includes('complete-your-profile')) {
            setPath('complete-your-profile')
        } else if (path.includes('checkUser')) {
            setPath('checkUser')
        } else if (localStorage.getItem('accessToken') !== undefined && localStorage.getItem('accessToken') !== null && localStorage.getItem('UserID') !== undefined && localStorage.getItem('UserID') !== null && localStorage.getItem('PublicationCount') !== undefined && localStorage.getItem('PublicationCount') !== null) {
            setPath('LoggedIn')
        } else {
            setPath('')
        }
    }, [])

    const handleSignUpClick = () => {  //to switch path url and page UI, base of either login or signup
        router.push('/signup')
        setPath('signup')
    }

    const handleLoginClick = () => {  //to switch path url and page UI, base of either login or signup
        router.push('/login')
        setPath('login') //when update or replace state then on first click it store update data value in state as a queue data and after 2nd click replace the data that's why used another click event to recall state update
        document.addEventListener('click', function () {
            setPath('login')
        })
    }

    const sendSignUpEmail = () => {  //send email to user for app link
        var config = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            data: {
                EventType: "SignUp",
                NotificationType: "Email",
                ReceiverHandle: EmailInput
            }
        }
        if (EmailInput.match(emailValidate)) {
            setErrorMsg()
            Axios(`${BASE_URL}Notification/SendEmailNotification`, config)
                .then((res) => {
                    if (res.data.responseCode === '00') {
                        setEmail(true)
                    }
                })
                .catch((err) => {
                    console.log("inside sendSignUpEmail catch", err);
                });
        } else {
            setErrorMsg("Please provide a valid email ID")
        }
    }

    const handleUserProfle = () => {  //onClick of user profile button dropdown will hide and show
        if ($('.dropdown-user').css('display') === 'none') {
            $('.dropdown-user').css('display', 'block');
        } else {
            $('.dropdown-user').css('display', 'none');
        }
    }

    const handleLogout = () => {  //onClick of logout it will clear all history and local&Session storage
        localStorage.clear();
        sessionStorage.clear();
        router.push('/login')
    }

    const handleViewProfile = () => {  //onClick of view profile take to new tab for profile detail page
        if (typeof window !== "undefined") {
            var newWindow = window.open(`${userPenName}`, '_blank')
            newWindow.penName = userPenName
            // newWindow.userStauts = user_status
        }
    }

    return (<>
        <section className="topsection fixed-top">
            <nav className="navbrpadding">
                <div className="container">
                    <div className="row d-flex">
                        <div className="col-md-6">
                            <Image src={'/thinkly-logo-.png'} height={40} width={130} alt="Header Logo" />
                            {/* {!isMobile && !customDashboard ? <h6 className="mobheader" style={{ marginTop: '-44px', marginLeft: '140px', marginRight: '-110px' }}>
                                <span className="sideline" >Where the world comes to think</span>
                            </h6> : */}
                            {isMobile && <>
                                {(getPath === 'signup') ? <span className='float-right mt-1'>Existing User?
                                    <span className='fc-link pointer' onClick={() => handleLoginClick()}> Login </span>
                                </span> : (getPath === 'login') ? <span className='float-right mt-1'>New User?
                                    <span className='fc-link pointer' onClick={() => handleSignUpClick()}> Sign Up </span>
                                </span> : (getPath === 'LoggedIn' && showForUserProfile === 'dashboard') && <div className='float-right' style={{ marginTop: '0px' }}>
                                    <Card className='float-right p-1' style={{ borderRadius: '50%', marginLeft: '-40px', position: 'absolute', zIndex: '9' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}> <ShareRounded /> </Card>
                                    <Card style={{ borderRadius: '40px', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '10px', paddingRight: '4px' }}>
                                        {(userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== '') ?
                                            <Image src={userProfileImage} alt="user profile" height={22} width={22} style={{ borderRadius: '50%' }} />
                                            : <Avatar style={{ width: '22px', height: '22px' }} src={<AssignmentIndOutlined />} />}
                                        <ArrowDropDown onClick={() => handleUserProfle()} style={{ marginTop: '-10px' }} />
                                        <div className="dropdown-user" >
                                            <a onClick={() => handleViewProfile()}>View My Page</a>
                                            <a onClick={() => handleLogout()}>Sign out</a>
                                        </div>
                                    </Card>
                                </div>}
                                {/* user detail page for loggedin user */}
                                {showForUserProfile === 'loggedInUserProfile' && <div className='float-right' style={{ marginTop: '0px' }}>
                                    {!isPartialUser && <Card className='float-right' style={{ borderRadius: '40px', padding: '4px 1px', marginLeft: '-110px', position: 'absolute', zIndex: '99' }}>
                                        <button className="pointer bg-white border-radius-100 border-none fc-black mx-2" data-toggle="modal" data-target="#myModal">Follow</button>
                                    </Card>}
                                    <Card className='float-right p-1' style={{ borderRadius: '50%', marginLeft: '-40px', position: 'absolute', zIndex: '9' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}>
                                        <ShareRounded />
                                    </Card>
                                    <Card style={{ borderRadius: '40px', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '10px', paddingRight: '4px', height: '34px' }}>
                                        {getPath === 'LoggedIn' ? <Image src={userProfileImage} alt="user profile" height={22} width={22} style={{ borderRadius: '50%' }} />
                                            : <Avatar style={{ height: '22px', width: '22px' }} src={<AssignmentIndOutlined />} />}
                                        <ArrowDropDown onClick={() => handleUserProfle()} style={{ marginTop: '-14px', marginLeft: '0px' }} />
                                        <div className="dropdown-user">
                                            {/* if logged in then sign out if not loggod in then call same function to redirect on login page with clear localstorage */}
                                            {(getPath === 'LoggedIn') ? <a onClick={() => handleLogout()}>Sign out</a> : <a onClick={() => handleLogout()}>Sign In</a>}
                                        </div>
                                    </Card>
                                </div>}
                                {/* user detail page for none logged in user */}
                                {showForUserProfile === 'otherUserProfile' && <div className='float-right' style={{ marginTop: '0px' }}>
                                    <Card className='float-right p-1' style={{ borderRadius: '50%', marginLeft: '-40px', position: 'absolute', zIndex: '9' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}>
                                        <ShareRounded />
                                    </Card>
                                    <Card style={{ borderRadius: '40px', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '10px', paddingRight: '4px', height: '34px' }}>
                                        <Avatar style={{ height: '22px', width: '22px' }} src={<AssignmentIndOutlined />} />
                                        <ArrowDropDown onClick={() => handleUserProfle()} style={{ marginTop: '-50px', marginLeft: '20px' }} />
                                        <div className="dropdown-user">
                                            <a onClick={() => handleLogout()}>Sign In</a>
                                        </div>
                                    </Card>
                                </div>}
                            </>}
                        </div>

                        {/* desktop view part */}
                        {!isMobile && <>
                            {(getPath === 'signup') ? <div className="col-md-6 py-1" style={{ marginLeft: '-10px' }}>
                                <span className='float-right'>Existing User?
                                    <text className='fc-link pointer' onClick={() => handleLoginClick()}> Login</text>
                                </span>
                            </div> : (getPath === 'login') && <div className="col-md-6 py-1" style={{ marginLeft: '-10px' }}>
                                <span className='float-right'>New User?
                                    <text className='fc-link pointer' onClick={() => handleSignUpClick()}> Sign Up </text>
                                </span>
                            </div>}
                            {/* header logo content end && loggedIn user condition starts */}
                            {getPath === 'LoggedIn' && showForUserProfile === 'dashboard' && <>
                                <div className='col-4'></div>
                                <div className='col-1' style={{ marginTop: '12px' }}>
                                    <Card className='float-right p-1 pointer' style={{ borderRadius: '50%' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}>
                                        <ShareRounded height={25} width={25} />
                                    </Card>
                                </div>
                                <div className='col-1' style={{ marginTop: '12px' }}>
                                    <Card className='pointer' onClick={() => handleUserProfle()} style={{ borderRadius: '40px', paddingLeft: '12px', paddingTop: '4px', paddingBottom: '0px' }}>
                                        <Menu height={25} width={25} style={{ marginTop: '-14px' }} />
                                        {(userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== '') ?
                                            <Image src={userProfileImage} alt="user profile" height={25} width={25} style={{ borderRadius: '50%' }} />
                                            : <Avatar style={{ width: '25px', height: '25px', marginTop: "-24px", marginLeft: '25px' }} src={<AssignmentIndOutlined />} />}
                                        <div className="dropdown-user">
                                            <a onClick={() => handleViewProfile()}>View My Page</a>
                                            <a onClick={() => handleLogout()}>Sign out</a>
                                        </div>
                                    </Card>
                                </div>
                            </>}
                            {/* open other user profile or own profile */}
                            {showForUserProfile === 'otherUserProfile' && <>
                                <div className='col-4'></div>
                                <div className='col-1' style={{ marginTop: '12px' }}>
                                    <Card className='float-right p-1 pointer' style={{ borderRadius: '50%' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}>
                                        <ShareRounded height={25} width={25} />
                                    </Card>
                                </div>
                                <div className='col-1' style={{ marginTop: '12px' }}>
                                    <Card className='pointer' onClick={() => handleUserProfle()} style={{ borderRadius: '40px', paddingLeft: '12px', paddingTop: '4px', paddingBottom: '4px' }}>
                                        <Menu height={25} width={25} style={{ marginTop: '0px' }} />
                                        <Avatar style={{ width: '25px', height: '25px', marginTop: "-24px", marginLeft: '25px' }} src={<AssignmentIndOutlined />} />
                                        <div className="dropdown-user">
                                            <a onClick={() => handleLogout()}>Sign out</a>
                                        </div>
                                    </Card>
                                </div>
                            </>}
                            {/* if user logged in show own profile */}
                            {showForUserProfile === 'loggedInUserProfile' && <>
                                <div className='col-3'></div>
                                <div className='col-2' style={{ marginTop: '12px' }}>
                                    <Card className='float-right p-1 pointer ml-4' style={{ borderRadius: '50%' }} data-toggle="modal" data-target="#ShareProfile" onClick={() => setshowShareUrlPopup(true)}>
                                        <ShareRounded />
                                    </Card>
                                    {!isPartialUser && <Card className='float-right' style={{ borderRadius: '40px', paddingTop: '4px', paddingBottom: '4px', paddingLeft: '10px', paddingRight: '10px' }}>
                                        <button className="pointer bg-white border-radius-100 border-none" data-toggle="modal" data-target="#myModal">Follow</button>
                                    </Card>}
                                </div>
                                <div className='col-1' style={{ marginTop: '12px' }}>
                                    <Card className='pointer' onClick={() => handleUserProfle()} style={{ borderRadius: '40px', paddingLeft: '12px', paddingTop: '4px', paddingBottom: getPath === 'LoggedIn' ? '0px' : '4px' }}>
                                        <Menu height={25} width={25} style={{ marginTop: getPath === 'LoggedIn' ? '-14px' : '0px' }} />
                                        {getPath === 'LoggedIn' ?
                                            <Image src={userProfileImage} alt="user profile" height={25} width={25} style={{ borderRadius: '50%' }} />
                                            : <Avatar style={{ height: '25px', width: '25px', marginTop: "-24px", marginLeft: '25px' }} src={<AssignmentIndOutlined />} />}
                                        <div className="dropdown-user">
                                            {getPath === 'LoggedIn' ? <a onClick={() => handleLogout()}>Sign out</a> : <a onClick={() => handleLogout()}>Sign In</a>}
                                        </div>
                                    </Card>
                                </div>
                            </>}
                        </>}
                    </div>
                </div>
            </nav>
        </section>

        {showThinkly && <NewThinkly authorID={userID} thinklyRemoteConfigData={thinklyRemoteConfigData} />}
        {showPublication && <NewPublication authorID={userID} />}
        {showShareUrlPopup && <SharePage profile={userProfileImage} penName={userPenName} />}

        {/* modal popup for email trigger */}
        <div id="myModal" className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-background">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" onClick={() => setEmail(false)}>&times;</button>
                    <div className="modal-body px-4 py-2">
                        <div className="row">
                            {!getEmail ? <div className='col-12 text-center'>
                                <p className="font-weight-bold fs-20">Download the App for a richer experience!</p>
                                <p className='fs-15'>Follow your favourite publications, engage in meaningful conversations, earn & redeem Thinkly Stars for exciting rewards and many more features.</p>
                                {isMobile ? <>
                                    <div className="row text-center mb-3">
                                        <div className="col-6 text-right">
                                            <a href={openInAppUrl}>
                                                <Image src={'/playStore.svg'} height={40} width={80} style={{ borderRadius: '10px' }} alt="Download button for Play store" />
                                            </a>
                                        </div>
                                        <div className="col-6 text-left">
                                            <a href={openInAppUrl}>
                                                <Image src={'/appstore.svg'} height={40} width={80} alt="Download button for App store" />
                                            </a>
                                        </div>
                                    </div>
                                </> : <>
                                    <input id='email' className='email-link mt-3 fs-18 text-center ff-roboto' placeholder='Enter your Email ID' onChange={(e) => setEmailInput(e.target.value)} required /> <br />
                                    <label style={{ fontSize: '12px', color: 'red' }}>{ErrorMsg !== undefined && ErrorMsg !== null && ErrorMsg}</label> <br />
                                    <button type='button' className='fw-mid border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto' style={{ width: '60%' }} onClick={() => sendSignUpEmail()}>Send Download Link</button> <br />
                                    <p className='fs-15 mt-1' style={{ color: 'gray' }}>You will receive an email to download the app</p>
                                </>}
                            </div> : <div className='col-12 text-center'>
                                <CheckCircleOutline style={{ color: 'green', width: '80px', height: '80px' }} /> <br />
                                <h3>Download link sent</h3> <br />
                                <p style={{ marginTop: '-24px' }}>If you did not get the email, check your spam folder</p>
                                <button type="button" className="button1 mt-3 mb-4" data-dismiss="modal" onClick={() => setEmail(false)}>OK</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Header;