import React, { useContext, useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { NextSeo } from 'next-seo';
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { isMobile } from 'react-device-detect';
import { Avatar, Card, CardMedia, Tabs, Tab, withStyles, CircularProgress } from '@material-ui/core';
import { Star } from '@material-ui/icons';
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import StarIcon from '../public/star.svg'
import Durgajasraj from '../public/durgajashraj.png'
import Audio_Icon from '../public/audio-icon.svg'
import Video_Icon from '../public/video-icon.svg'
import { baseUrl, baseUrlThinkly } from '../pages/api/api'
import Header from '../components/common/header'
import Footer from '../components/common/footer';
import Faq from '../components/common/faq';
import UserProfileMob from '../components/userProfileMob';
import { UserProfileEvent, UserSupportStarEvent } from '../config/facebookPixelEvent';
// import { getAnalytics, logEvent } from "firebase/analytics";
import PublicationProfile from '../components/publication/pubDetailPage';
import { async } from '@firebase/util';

export async function getServerSideProps(context) {
    const userName = context.params.username
    var response;
    var config = {
        headers: {
            "Content-Type": "application/json",
            "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
            "UserID": 0 //if fetching detail by then set user id as 0
        },
    };
    await Axios.get(`${baseUrl._currentValue}User/GetDetailsByPenName/${userName}`, config)
        .then((res) => {
            response = res.data
        })

    console.log("data@@@@@", response);

    return {
        props: { userData: response }, // will be passed to the page component as props
    }
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const StyledTabs = withStyles({
    indicator: {
        indicator: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            position: 'sticky',
            "& > span": {
                maxWidth: 40,
                width: "100%",
                //   backgroundColor: "#fffcef",
            },
        },
    },
})((props) => (<Tabs {...props} variant="fullWidth" TabIndicatorProps={{ children: <span /> }} />));

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "#000000",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(16),
        // marginRight: theme.spacing(0),
        "&:focus": {
            opacity: 1,
            outline: 'none',
            backgroundColor: 'none'
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const UserProfile = (props) => {
    const emailValidate = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    // const analytics = getAnalytics();
    const router = useRouter()
    const BASE_URL = useContext(baseUrl);
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const { handleSubmit, formState } = useForm(); //for form submit
    const [getProfileDetail, setprofileDetail] = useState()
    const [getpenName, setpenName] = useState()
    const [getProfileImage, setProfileImage] = useState()
    const [value, setValue] = React.useState(0)
    const [getThinkliesByAuthorData, setThinkliesByAuthorData] = useState()
    const [getPublicationByAuthorData, setPublicationByAuthorData] = useState()
    const [showModal, setShowModal] = useState(false);
    const [viewFullProfile, setviewFullProfile] = useState(false)
    const [starCount, setstarCount] = useState(0)
    const [Remarks, setRemarks] = useState()
    const [currency, setcurrency] = useState()
    const [finalAmount, setfinalAmount] = useState()
    const [showDataOnHeader, setshowDataOnHeader] = useState(false)
    const [aboutUser, setaboutUser] = useState()
    const [UserDetail, setUserDetail] = useState()
    const [emailID, setemailID] = useState()
    const [numberInfo, setnumberInfo] = useState()
    const [SupportButton, setSupportButton] = useState(true)
    const [showPublication, setshowPublication] = useState(false)   //show pulication detail page if type not user

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (props.userData !== undefined) {
            const res = props.userData
            if (res.responseCode === '00') {
                console.log("response@@@@@@@@@", res.responseData);
                setprofileDetail(res.responseData.Details)
                if (res.responseData.Type === 'Publication') {
                    setshowPublication(true)
                } else { //for user
                    if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
                        UserProfileEvent()
                    }
                    const response = res.responseData.Details.profileDetails
                    const storedUserID = localStorage.getItem('UserID')
                    if (parseInt(storedUserID) === response.userID) {
                        setshowDataOnHeader(true)  //for content on header for user profile detail page
                    } else {
                        setshowDataOnHeader(false)  //don't show content on header for user profile detail page
                    }
                    const penNameShorted = response.penName.charAt(0) === '@' ? response.penName.substring(1) : response.penName
                    setpenName(penNameShorted)
                    const image = response.profileImage.charAt(0) === '@' ? response.profileImage.substring(1) : response.profileImage
                    setProfileImage(image)
                    setaboutUser(response.aboutMe.trim()); //to remove unnessery space used trim
                    // for now commented(not in use) - don't remove
                    // getThinkliesByAuthor(response.userID)  //api call params passed
                    // getPublicationByAuthor(response.userID)  //api call params passed
                }
            } else if (res.responseCode === '03') {

            }
        }
        // if (window.penName !== undefined) {
        //     // logEvent(analytics, 'USER_DETAIL_PAGE', { penname: window.penName })  //google analytic log
        //     getUserProfileDateils(window.penName)
        // } else {
        //     var thePath = window.location.href
        //     var path = thePath.match(/([^\/]*)\/*$/)[1]
        //     console.log("user name", path);
        //     // logEvent(analytics, 'USER_DETAIL_PAGE', { penname: path })  //google analytic log
        //     getUserProfileDateils(path)
        // }
    }, [])

    function getUserProfileDateils(data) {
        console.log(data);
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": 0 //if fetching detail by then set user id as 0
            },
        };
        Axios.get(`${BASE_URL}User/GetDetailsByPenName/${data}`, config)
            .then((res) => {
                console.log(res);
                if (res.data.responseCode === '00') {
                    setprofileDetail(res.data.responseData.Details)
                    if (res.data.responseData.Type === 'Publication') {
                        setshowPublication(true)
                    } else { //for user
                        if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
                            UserProfileEvent()
                        }
                        const response = res.data.responseData.Details.profileDetails
                        const storedUserID = localStorage.getItem('UserID')
                        if (parseInt(storedUserID) === response.userID) {
                            setshowDataOnHeader(true)  //for content on header for user profile detail page
                        } else {
                            setshowDataOnHeader(false)  //don't show content on header for user profile detail page
                        }
                        const penNameShorted = response.penName.charAt(0) === '@' ? response.penName.substring(1) : response.penName
                        setpenName(penNameShorted)
                        const image = response.profileImage.charAt(0) === '@' ? response.profileImage.substring(1) : response.profileImage
                        setProfileImage(image)
                        setaboutUser(response.aboutMe.trim()); //to remove unnessery space used trim
                        // for now commented(not in use) - don't remove
                        // getThinkliesByAuthor(response.userID)  //api call params passed
                        // getPublicationByAuthor(response.userID)  //api call params passed
                    }
                } else if (res.data.responseCode === '03') {
                    router.push('/login')
                }
            })
            .catch((err) => {
                console.log("getUserProfileDateils error in catch", err);
            });
    }

    function getThinkliesByAuthor(user_id) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": user_id
            },
            data: {
                "UserID": user_id,
                "StartIndex": 0,
                "EndIndex": 10
            }
        };
        Axios(`${BASE_URL}Thinkly/GetUserThinklies/`, config)
            .then((res) => {
                console.log(res);
                if (res.data.responseCode === '00') {
                    setThinkliesByAuthorData(res.data.responseData)
                } else if (res.data.responseCode === '03') {
                    setThinkliesByAuthorData(res.data.responseData)
                }
            })
            .catch((err) => {
                console.log("getThinkliesByAuthor error in catch", err);
            });
    }

    function getPublicationByAuthor(user_id) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": user_id
            },
            data: {
                "UserID": user_id,
                "StartIndex": 0,
                "EndIndex": 10
            }
        };
        Axios(`${BASE_URL}User/GetUserPublications/`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setPublicationByAuthorData(res.data.responseData)
                } else if (res.data.responseCode === '03') {
                    setPublicationByAuthorData(res.data.responseData)
                }
            })
            .catch((err) => {
                console.log("setPublicationByAuthorData error in catch", err);
            });
    }

    function fetchAmountForStar(star_count) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": localStorage.getItem('UserID')
            },
        };
        Axios.get(`${BASE_URL_THINKLY}Star/GetStarPriceDetails`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    var fixAmount = res.data.responseData.starPriceData
                    setcurrency(fixAmount.currencySymbol) //store currency symbol
                    var amount = star_count * parseInt(fixAmount.perStarPrice)
                    setfinalAmount(amount)  //store amount
                }
            })
            .catch((err) => {
                console.log("getAmountForStar error in catch", err);
            });
    }

    const handleStar = (star) => {
        setstarCount(star)  //set star in state
        fetchAmountForStar(star) //function for amout fetch
        setSupportButton(false)  //support button disable/enable
        if (star === 1) {
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("oneStar").className = "numberCircleBorder"
        } else if (star === 3) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircleBorder"
        } else if (star === 5) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircleBorder"
        } else if (star === 10) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircleBorder"
        }
    }

    function onSubmit() {
        if (UserDetail === 'star') {
            var quantity = $('#qty').val();
            if (quantity !== undefined && quantity !== null && quantity > 0 && finalAmount !== undefined && finalAmount !== null) {
                $('#userContactInfo').modal('show')
            } else {
                document.getElementById('starCountError').innerHTML = 'Select how many Stars you wish to gift?'
            }
        } else if (UserDetail === 'userInfo') {
            if (emailID !== undefined && numberInfo !== undefined) {
                if (emailID.match(emailValidate) && numberInfo.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                    return new Promise(resolve => {
                        const form = document.createElement('form');
                        form.method = 'post'
                        form.action = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_CASHFREE
                        const data = [
                            { name: 'qty', value: starCount },
                            { name: 'receiver', value: getpenName },
                            { name: 'sender', value: "" },
                            { name: 'channel', value: "giftStars" },
                            { name: 'amount', value: finalAmount },
                            { name: 'remarks', value: Remarks },
                            { name: 'emailid', value: emailID },
                            { name: 'phone', value: numberInfo }
                        ]
                        for (let x = 0; x < data.length; x++) {
                            const hiddenField = document.createElement('input');
                            hiddenField.type = 'text';
                            hiddenField.name = data[x].name;
                            hiddenField.value = data[x].value;
                            hiddenField.style.display = 'none'
                            form.appendChild(hiddenField);
                        }
                        document.body.appendChild(form);
                        form.submit();
                        $('#userContactInfo').modal('hide');
                        if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
                            UserSupportStarEvent()  //google pixel event
                        }
                        resolve();
                    });
                } else {
                    document.getElementById('infoPlease').innerHTML = 'Please Enter valid EmailID and Contact number'
                }
            } else {
                document.getElementById('infoPlease').innerHTML = 'Please Enter Email ID and Contact number to continue'
            }
        }

    }

    return (<>
        <NextSeo
            title={props.userData.responseData.Details.profileDetails.firstName + ' ' + props.userData.responseData.Details.profileDetails.lastName}
            description={props.userData.responseData.Details.profileDetails.aboutMe.trim()}
            canonical="https://nextjs-starter-thinkly-five.vercel.app/"
            openGraph={{
                url: `https://nextjs-starter-thinkly-five.vercel.app/${props.userData.responseData.Details.profileDetails.penName.charAt(0) === '@' ? props.userData.responseData.Details.profileDetails.penName.substring(1) : props.userData.responseData.Details.profileDetails.penName}`,
                title: props.userData.responseData.Details.profileDetails.firstName + ' ' + props.userData.responseData.Details.profileDetails.lastName,
                description: props.userData.responseData.Details.profileDetails.aboutMe.trim() ,
                images: [{
                    url: props.userData.responseData.Details.profileDetails.profileImage.charAt(0) === '@' ? props.userData.responseData.Details.profileDetails.profileImage.substring(1) : props.userData.responseData.Details.profileDetails.profileImage,
                    width: 800,
                    height: 600,
                    alt: 'userImage',
                    type: 'image/jpeg',
                }],
                siteName: 'Thinkly weblite',
            }}
        />
        {getProfileDetail !== undefined ? <>
            {showPublication ? <PublicationProfile publicationDetail={getProfileDetail} /> : <>
                <Header userProfile={getProfileDetail} showContentForUserProfile={showDataOnHeader} />
                {/* <Head>
                    <title>{getpenName}</title>
                    <meta property="og:title" content={getpenName} key="og-title" />
                    <meta property="og:description" content={aboutUser} key="og-desc" />
                    <meta property="og:image" content={getProfileImage} key="og-image" />
                </Head> */}
                {isMobile ? <UserProfileMob userProfileJson={getProfileDetail} />
                    : <div className='container' style={{ marginTop: '5rem' }}>
                        <div className='row mb-5'>
                            <div className='col-4 right-content'>
                                {getProfileImage !== undefined ? <Image src={getProfileImage} alt="profile image" layout='fill' /> : <Avatar src={<AssignmentIndOutlinedIcon />} />}
                            </div>
                            <div className='col-8 mt-2'>
                                <div className="card left-content" style={{ height: '500px' }}>
                                    <div className='mb-1 fs-30 fw-bold'> {getpenName} </div>
                                    <div className='fs-20 fw-mid mb-3'>{getProfileDetail.profileDetails.firstName} {getProfileDetail.profileDetails.lastName !== undefined && getProfileDetail.profileDetails.lastName}</div>
                                    <p className='fs-18'>{aboutUser}</p>
                                    <h6 className='fs-15 fc-link fw-mid pointer' data-toggle="modal" data-target="#myModal">View Full Profile</h6>

                                    {getpenName === 'Durgajasraj' && <Image src={Durgajasraj} alt="durgajasraj" className='mb-4' width={100} height={50} style={{ objectFit: 'cover', objectPosition: 'center' }} />}

                                    {getProfileDetail.profileDetails.isSupportEnabled === true && <Card className='mt-4' style={{ padding: '10px 20px 20px 20px', background: '#fff', width: '50%', height: 'auto', overflow: 'initial' }}>
                                        <form name="paymentGateway" onSubmit={handleSubmit(onSubmit)}>
                                            <div className='text-center'>
                                                <p className='fw-mid mb-3'>Support <Star className='star-color' /> to {getpenName}</p>
                                                <div className='row ml-1'>
                                                    <div className='col-1' style={{ marginLeft: '10px', marginRight: '10px' }}>
                                                        <Image src={'/star.svg'} alt="icon" height={60} width={60} />
                                                    </div>
                                                    <div className='col-1' style={{ fontSize: '22px' }}> x </div>
                                                    <div className='col-2 mt-1'>
                                                        <span className="numberCircle pointer" name="starCount" id="oneStar" onClick={() => handleStar(1)}> 1 </span>
                                                    </div>
                                                    <div className='col-2 mt-1'>
                                                        <span className="numberCircle pointer" name="starCount" id="threeStar" onClick={() => handleStar(3)}> 3 </span>
                                                    </div>
                                                    <div className='col-2 mt-1'>
                                                        <span className="numberCircle pointer" name="starCount" id="fiveStar" onClick={() => handleStar(5)}> 5 </span>
                                                    </div>
                                                    <div className='col-3 mt-1'>
                                                        <span className="numberCircle pointer" name="starCount" id="Stars" style={{ padding: '10px 10px' }} onClick={() => handleStar(10)}> 10 </span>
                                                    </div>
                                                </div>
                                                <input type='text' name='qty' id='qty' value={starCount} style={{ display: 'none' }} />
                                                <textarea className='mt-3 w-96' name='remarks' id='remarks' rows={3} cols={40} type="text" maxLength={1000} value={Remarks} onChange={(e) => setRemarks(e.target.value)} style={{ outline: 'none', border: '1px solid lightgray' }} placeholder="Say something nice... (Optional)"></textarea>
                                                {starCount > 0 ? '' : <div id="starCountError" className='error-msg'></div>}
                                                <button onClick={() => setUserDetail('star')} className={`mt-3 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 w-96 ${SupportButton ? 'bg-gray' : 'primary-bg-color'}`} id='getStarValue' disabled={SupportButton}>
                                                    Support {!SupportButton && starCount}<Star style={{ color: 'antiquewhite', marginTop: '-3px' }} /> to {getpenName} {currency}{finalAmount}
                                                </button>
                                            </div>
                                            {/* modalpopup for user info */}
                                            <div id="userContactInfo" className="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <button type="button" className="close text-right pr-2" data-dismiss="modal" >&times;</button>
                                                        <div className="modal-body px-5 pb-4 pt-1">
                                                            <h5 className='text-center mb-4'>We need some details to send you a receipt</h5>
                                                            <input type='text' placeholder='Your email ID' value={emailID} onChange={(e) => setemailID(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                                            <br /><br />
                                                            <input type='text' placeholder='Your mobile number' value={numberInfo} onChange={(e) => setnumberInfo(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                                            <br /><br />
                                                            {<div id="infoPlease" className='error-msg'></div>}
                                                            <div className='text-center'>
                                                                <button type='submit' className='mt-3 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 w-50 primary-bg-color' onClick={() => setUserDetail('userInfo')} >Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </Card>}


                                    {/* if viewFullProfile is true then show thinkly and publication list below for now not in use */}
                                    {/* {viewFullProfile && <> <div className='mt-5'>
                                        <p className='font-weight-bold' style={{ fontSize: '18px' }}>Publications by this Author</p>
                                        infinite={true} autoPlay={truse} autoPlaySpeed={2000} arrows={false}  //comment this
                                        <Carousel responsive={responsive}>
                                            {getPublicationByAuthorData !== null && getPublicationByAuthorData.length > 0 ? getPublicationByAuthorData.map((obj) => {
                                                var img_extension = '.' + (obj.publicationImage.split(/[#?]/)[0].split('.').pop())
                                                return (<Card className="mb-4" style={{ width: '140px', boxShadow: 'none', background: 'rgba(247, 247, 247, 0.49)' }}>
                                                    {(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(img_extension) ?
                                                        <CardMedia component="img" height="160" image={obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} alt="publication profile" />
                                                        : <div style={{ background: '#ea7f00', height: '160px' }}></div>
                                                    }
                                                    <div className='px-2'>
                                                        <text style={{ fontSize: '14px', fontWeight: 'bold' }}>{obj.publicationName}</text> <br />
                                                        <a href='#morepublication' data-toggle="modal" data-target="#myModal" onClick={() => setShowModal(true)} style={{ color: '#2baadf', fontSize: '12px', fontFamily: 'sans-serif' }}>View the Publication</a>
                                                    </div>
                                                </Card>)
                                            }) : <div className='text-center'> No Data Available </div>}
                                        </Carousel>
                                    </div>
                                        <div className='mt-5'>
                                            <p className='font-weight-bold' style={{ fontSize: '18px' }}>Thinklies by this Author</p>
                                            <StyledTabs value={value} onchange={handleChangeTabs} aria-label="styled tabs" >
                                                <StyledTab label="All" />
                                                <StyledTab label="Audio" />
                                                <StyledTab label="Video" />
                                            </StyledTabs>
                                        </div>
                                        <div className='mt-4'>
                                            {getThinkliesByAuthorData !== null && getThinkliesByAuthorData.length > 0 ? <>
                                                {(value === 0 ? <div className='row'>
                                                    {getThinkliesByAuthorData.map((obj) => {
                                                        var image1 = obj.postData.postImages[0];
                                                        var isAudio = obj.postData.audioURL;
                                                        var isVideo = obj.postData.videoURL;
                                                        return (<div className='col-4 mb-4'>
                                                            <Card className="card-view-publication">
                                                                <div className='row d-flex' style={{ padding: '5px 5px 5px 20px' }}>
                                                                    {image1 !== undefined ? <div className='col-4' style={isAudio !== "" || isVideo !== "" ? { marginBottom: '-24px' } : {}}>
                                                                        <img className='img-fluid Upublilcation-image' src={image1.charAt(0) === '@' ? image1.substring(1) : image1} alt="" />
                                                                        {isAudio !== undefined && isAudio !== "" ? <img src={Audio_Icon} className='thinkly-type-icon1' /> :
                                                                            isVideo !== undefined && isVideo !== "" ? <img src={Video_Icon} className='thinkly-type-icon1' /> : ''}
                                                                    </div> : <div className='col-4 Upublilcation-no-image'>
                                                                        {isAudio !== undefined && isAudio !== "" ? <img src={Audio_Icon} className='thinkly-type-icon2' /> :
                                                                            isVideo !== undefined && isVideo !== "" ? <img src={Video_Icon} className='thinkly-type-icon2' /> : ''}
                                                                    </div>}
                                                                    <div className='col-8 my-auto'>
                                                                        <p className='' style={{ fontSize: '14px', lineHeight: '1', marginBottom: '0px' }}> {obj.postData.postTitle} </p>
                                                                    </div>
                                                                </div>
                                                            </Card>
                                                        </div>)
                                                    })}
                                                </div> : value === 1 ? <div className='row'>
                                                    {getThinkliesByAuthorData.map((obj) => {
                                                        var image1 = obj.postData.postImages[0];
                                                        var isAudio = obj.postData.audioURL;
                                                        return (<>
                                                            {isAudio !== undefined && isAudio !== "" && <div className='col-4 mb-4' >
                                                                <Card className="card-view-publication">
                                                                    <div className='row d-flex' style={{ padding: '5px 5px 5px 20px' }}>
                                                                        {image1 !== undefined ? <div className='col-4' style={{ marginBottom: '-24px' }}>
                                                                            <img className='img-fluid Upublilcation-image' src={image1.charAt(0) === '@' ? image1.substring(1) : image1} alt="" />
                                                                            <img src={Audio_Icon} className='thinkly-type-icon1' />
                                                                        </div> : <div className='col-4 Upublilcation-no-image'>
                                                                            <img src={Audio_Icon} className='thinkly-type-icon2' />
                                                                        </div>}
                                                                        <div className='col-8 my-auto'>
                                                                            <p className='' style={{ fontSize: '14px', lineHeight: '1', marginBottom: '0px' }}> {obj.postData.postTitle} </p>
                                                                        </div>
                                                                    </div>
                                                                </Card>
                                                            </div>}
                                                        </>)
                                                    })}
                                                </div> : <div className='row'>
                                                    {getThinkliesByAuthorData.map((obj) => {
                                                        var image1 = obj.postData.postImages[0];
                                                        var isVideo = obj.postData.videoURL;
                                                        return (<>
                                                            {isVideo !== undefined && isVideo !== "" && <div className='col-4 mb-4' >
                                                                <Card className="card-view-publication">
                                                                    <div className='row d-flex' style={{ padding: '5px 5px 5px 20px' }}>
                                                                        {image1 !== undefined ? <div className='col-4' style={{ marginBottom: '-24px' }}>
                                                                            <img className='img-fluid Upublilcation-image' src={image1.charAt(0) === '@' ? image1.substring(1) : image1} alt="" />
                                                                            <img src={Video_Icon} style={{ marginTop: '-90px', marginLeft: '6px' }} />
                                                                        </div> : <div className='col-4 Upublilcation-no-image'>
                                                                            <img src={Video_Icon} style={{ marginTop: '15px', marginLeft: '6px' }} />
                                                                        </div>}
                                                                        <div className='col-8 my-auto'>
                                                                            <p className='' style={{ fontSize: '14px', lineHeight: '1', marginBottom: '0px' }}> {obj.postData.postTitle} </p>
                                                                        </div>
                                                                    </div>
                                                                </Card>
                                                            </div>}
                                                        </>)
                                                    })}
                                                </div>)}
                                            </> : <div className='text-center'> No Data Available </div>}
                                        </div>
                                    </>} */}
                                </div>
                            </div>
                        </div>
                        <Faq />
                    </div>
                }
                <Footer />
            </>} {/* closing of publication detail page condition */}
        </> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
    </>)
}

export default UserProfile;

