import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import { useForm } from "react-hook-form";
import Image from 'next/image';
import Head from 'next/head';
import Axios from "axios";
import $ from 'jquery'
import { Avatar, Card, CardMedia, CardHeader, CardContent, CircularProgress } from '@material-ui/core'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { baseUrl } from '../../pages/api/api';
// import { getAnalytics, logEvent } from "firebase/analytics";
import ParaByNameFromUrl from "../common/paraByNameFromUrl";
import { KeyboardArrowDown } from '@material-ui/icons';
import { PublicationProfileEvent, PublicationSubscribeEvent } from '../../config/facebookPixelEvent';
import PublicationDetailMob from './pubMobDetail';
import Header from '../common/header';
import Footer from '../common/footer';

const responsive1 = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const responsive2 = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 2,
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

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 3,
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

const meetAuthorResponsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 768 },
        items: 3,
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

const PublicationProfile = (props) => {
    // const analytics = getAnalytics();
    const history = useRouter()
    const BASE_URL = useContext(baseUrl);
    const { handleSubmit, formState } = useForm(); //for form submit
    const [getPublicationDetail, setPublicationDetail] = useState()  //publication detail by publication penName
    const [getPublicationID, setPublicationID] = useState() //publication ID
    const [getAuthorID, setAuthorID] = useState() //publication's author ID
    const [publicationPenName, setpublicationPenName] = useState() // store publication penname
    const [publicationImage, setpublicationImage] = useState()  //sotre publication profile image
    const [getPublicationAuthors, setPublicationAuthors] = useState()  //store publication name(after re-arranged)
    const [userStarBalance, setUserStarBalance] = useState() //store userBalance

    // const [getMainAuthor, setMainAuthor] = useState()  //Main author of this publication
    const [getPublicationThinkly, setPublicationThinkly] = useState()  //thinklies list in this publication
    const [startIndexValue, setstartIndexValue] = useState(0)  //star index of load ore thinkies in this publication
    const [endIndexValue, setendIndexValue] = useState(9)  //end index of load ore thinkies in this publication
    const [NoMoreData, setNoMoreData] = useState(false)  //if no more thinklies then hide MORE link 
    const [getUserPublication, setUserPublication] = useState() // more publication by the author who has written this publilcation
    const [getMorePubByInterest, setMorePubByInterest] = useState()  //more publication list by this publication's interest
    const [publicationPrice, setPublicationPrice] = useState() // store publication price
    const [submitLoader, setSubmitLoader] = useState(false) //loader hide and show on payment btn
    const [PubSection, setPubSection] = useState()
    const [emailID, setemailID] = useState()
    const [CoAuthorList, setCoAuthorList] = useState()

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
            PublicationProfileEvent()
        }
        if (window.pen_name !== undefined && window.userStatus !== undefined) {
            // logEvent(analytics, 'PUB_DETAIL_PAGE', { penname: window.pen_name })
            fetchPublicationDetail(window.pen_name)
        } else if (props.publicationDetail !== undefined) {  //cause 1st user go to profile detail page if type publication then pass data here
            const response = props.publicationDetail;
            commonFunctionForDataSet(response)
        } else {
            var pName = window.location.href
            const data = pName.endsWith('/') ? pName.substring(0, pName.length - 1) : pName;
            var name = data.substring(data.lastIndexOf("/") + 1, data.length);
            // logEvent(analytics, 'PUB_DETAIL_PAGE', { penname: window.pen_name })
            fetchPublicationDetail(name)
        }
    }, [])

    const commonFunctionForDataSet = (data) => {
        console.log("publication response from props user to pub ", data);
        setPublicationID(data.publicationDetails.publicationID)
        setAuthorID(data.publicationDetails.createdBy) //publication's author Id stored in state
        setPublicationDetail(data.publicationDetails) //publication detail stored in state
        const penname = data.publicationDetails.penName.charAt(0) === '@' ? data.publicationDetails.penName.substring(1) : data.publicationDetails.penName  //publicationPenName stored in state
        setpublicationPenName(penname)
        const image = data.publicationDetails.publicationImage.charAt(0) === '@' ? data.publicationDetails.publicationImage.substring(1) : data.publicationDetails.publicationImage
        setpublicationImage(image)
        const arr = data.publicationDetails.publicationAuthor //for set main author on 0 index
        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")
        const element = arr.splice(indexMain, 1)[0]
        arr.splice(0, 0, element);
        setPublicationAuthors(arr) //author list after re-arranged
        setUserStarBalance(data.userDetails.userBalance)  //userBalance stored in state
        fetchSectionDetail(data.publicationDetails.publicationID, data.publicationDetails.createdBy) //function call
        // fetchPublicationThinklies(data.publicationDetails.publicationID, data.publicationDetails.createdBy)  //function call
        // fetchMorePubByAuthor(data.publicationDetails.publicationID, data.publicationDetails.createdBy)   //function call
        // const interestArray = [];
        // data.publicationDetails.interestData.filter((obj) => {
        //     interestArray.push(obj.interestID)
        // })
        // fetchYouMayLikePubs(data.publicationDetails.createdBy, interestArray)  //function call
    }

    function fetchPublicationDetail(name) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": 0
            }
        };
        Axios.get(`${BASE_URL}User/GetDetailsByPenName/${name}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    if (res.data.responseData.Type === "Publication") {
                        const response = res.data.responseData.Details;
                        setPublicationID(response.publicationDetails.publicationID)
                        setAuthorID(response.publicationDetails.createdBy) //publication's author Id stored in state
                        setPublicationDetail(response.publicationDetails) //publication detail stored in state
                        const penname = response.publicationDetails.penName.charAt(0) === '@' ? response.publicationDetails.penName.substring(1) : response.publicationDetails.penName  //publicationPenName stored in state
                        setpublicationPenName(penname)
                        const image = response.publicationDetails.publicationImage.charAt(0) === '@' ? response.publicationDetails.publicationImage.substring(1) : response.publicationDetails.publicationImage
                        setpublicationImage(image)
                        const arr = response.publicationDetails.publicationAuthor //for set main author on 0 index
                        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")
                        const element = arr.splice(indexMain, 1)[0]
                        arr.splice(0, 0, element);
                        setPublicationAuthors(arr) //author list after re-arranged
                        setUserStarBalance(response.userDetails.userBalance)  //userBalance stored in state
                        fetchSectionDetail(response.publicationDetails.publicationID, response.publicationDetails.createdBy) //function call
                        // fetchPublicationThinklies(response.publicationDetails.publicationID, response.publicationDetails.createdBy)  //function call
                        // fetchMorePubByAuthor(response.publicationDetails.publicationID, response.publicationDetails.createdBy)   //function call
                        // const interestArray = [];
                        // response.publicationDetails.interestData.filter((obj) => {
                        //     interestArray.push(obj.interestID)
                        // })
                        // fetchYouMayLikePubs(response.publicationDetails.createdBy, interestArray)  //function call
                    } else {
                        history.push('/')
                    }
                } else if (res.data.responseCode === '03') {
                    history.push('/')
                }
            })
            .catch((err) => {
                console.log("publication detail api error in catch", err);
            });
    }



    const fetchSectionDetail = (PID, UID) => {
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": UID
            }
        };
        Axios.get(`${BASE_URL}Publication/V2/GetPublicationDetailsByID/${PID}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const response = res.data.responseData.publicationDetails.publicationSections
                    setPubSection(response)
                }
            })
    }
    // fetch more thinkly by publication start
    const fetchMoreThinklyByPublication = () => {
        scrollThinklies()
    }

    function scrollThinklies() {
        setstartIndexValue(endIndexValue)
        setendIndexValue(endIndexValue + 9)
    }

    // useEffect(() => { //don't delete uncomment when use fetchPublicationThinklies api
    //     if (getPublicationID !== undefined && getAuthorID !== undefined) {
    //         fetchPublicationThinklies(getPublicationID, getAuthorID)
    //     }
    // }, [startIndexValue, endIndexValue])

    function fetchPublicationThinklies(p_id, authorId) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorId
            },
            data: {
                "PublicationID": p_id,
                "UserID": authorId,
                "ThinklyID": 0,
                "StartIndex": startIndexValue,
                "EndIndex": endIndexValue
            }
        };
        Axios(`${BASE_URL}Thinkly/GetPublicationThinklies`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData;
                    if (getPublicationThinkly !== undefined) {
                        setPublicationThinkly(getPublicationThinkly => [...getPublicationThinkly, ...newData])
                    } else {
                        setPublicationThinkly(newData)
                    }
                    if (newData.length < 9) {
                        setNoMoreData(true)
                    }
                } else if (res.data.responseCode === '03') {
                    setNoMoreData(true)
                }
            })
            .catch((err) => {
                console.log("GetPublicationThinklies error in catch", err);
            });
    }
    // fetch more thinkly by publication end

    const fetchMorePubByAuthor = (p_id, authorId) => {
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorId
            },
            data: {
                "UserID": authorId,
                "PublicationID": p_id,
                "StartIndex": 0,
                "EndIndex": 10
            }
        };
        Axios(`${BASE_URL}User/GetUserPublications`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setUserPublication(res.data.responseData)
                }
            })
            .catch((err) => {
                console.log("fetch more publication by author @@@@@@@@", err);
            });
    }

    const fetchYouMayLikePubs = (authorId, interestArray) => {
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorId
            },
            data: {
                "UserID": authorId,
                "StartIndex": 0,
                "EndIndex": 10,
                "PublicationID": 0,
                "Interest": interestArray
            }
        };
        Axios(`${BASE_URL}Publication/GetOtherPublicationsYouMayLike`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setMorePubByInterest(res.data.responseData)
                }
            })
            .catch((err) => {
                console.log("fetch more publication you may like@@@@@@@@", err);
            });
    }

    const singleAuthor = (obj) => {
        const imageUrl = obj.authorProfileImage.charAt(0) === '@' ? obj.authorProfileImage.substring(1) : obj.authorProfileImage
        // onClick={() => handleUserProfile(obj.authorID)}
        return (<Card className="t-in-p">
            <div className='mb-3'>
                <Avatar className='mx-auto ma-profile' src={imageUrl} alt="author profile" />
            </div>
            <div className='text-center mb-2'>
                <p className='fs-26 fw-bold'>
                    {obj.authorName.slice(0, 18) + (obj.authorName.length > 18 ? "..." : "")}
                </p>
            </div>
            <p className='fs-18 text-center'>
                {obj.authorProfileText.length > 200 ? <> {obj.authorProfileText.slice(0, 200)} <span className='fw-mid-bold pointer' onClick={() => handleUserProfile(obj.authorID)} >...read more</span> </> : obj.authorProfileText}
            </p>
        </Card>)
    }

    const handleUserProfile = (authorID) => {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
        };
        Axios.get(`${BASE_URL}User/GetUserProfileByID/${authorID}`, config)
            .then((res) => {
                // logEvent(analytics, 'PUB_ATHOUR_CLICK', { authorID: authorID })
                if (res.data.responseCode === '00') {
                    const response = res.data.responseData.profileDetails
                    const url = response.profileUrl.charAt(0) === '@' ? response.profileUrl.substring(1) : response.profileUrl
                    window.open(url, '_blank')
                }
            })
            .catch((err) => {
                console.log("GetUserProfileByID error in catch", err);
            });
    }

    const onSubmit = (freePub) => {  //razor pay use for paid pub subscription
        setSubmitLoader(true)
        return new Promise(resolve => {
            const price = freePub === 'Free' ? 0 : parseFloat(publicationPrice).toFixed(2); //if free then 0 price 
            const refName = ParaByNameFromUrl('referrer')
            const form = document.createElement('form');
            form.method = 'post'
            form.action = freePub === 'Free' ? process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_RAZORPAY_FREE : process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_RAZORPAY
            const data = [
                { name: 'qty', value: "1" }, //pass hardcoded 1 only
                { name: 'receiver', value: getAuthorID },
                { name: 'subscribedby', value: '0' },  //pass 0 cause not matter if logged in or not
                { name: 'remarks', value: "subscribe to publication" },
                { name: 'channel', value: "WEBAPP" },
                { name: 'amount', value: price },
                { name: 'producttype', value: "PUBLICATIONSUBSCRIPTION" },
                { name: 'publicationid', value: getPublicationID },
                { name: 'subscriptiontype', value: freePub === 'Free' ? "FREE" : "PAID" }, //free or paid
                { name: 'publicationpenname', value: publicationPenName },
                { name: 'emailid', value: freePub === 'Free' ? emailID : '' }, //for free only
                { name: 'referrer', value: refName !== undefined ? refName : '' }
            ]
            for (let x = 0; x < data.length; x++) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'text';
                hiddenField.name = data[x].name;
                hiddenField.value = data[x].value;
                hiddenField.style.display = 'none'
                form.appendChild(hiddenField);
            }
            // logEvent(analytics, 'PUB_PAYMENT_GATEWAY', { payToPub: freePub === 'Free' ? '' : getPublicationID }) //google analytic log
            document.body.appendChild(form);
            if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
                PublicationSubscribeEvent()  //google pixel event
            }
            form.submit();
            resolve();
        });
    }

    const subscribeHandle = (publicationPayType) => {
        // logEvent(analytics, 'PUB_SUBSCIRBE_CLICK', { 'payType': publicationPayType })
        if (publicationPayType === 'Free') {
            $('#userContactInfo').modal('show')
        } else {
            document.getElementById("paidpublicationdiv").scrollIntoView({ behavior: 'smooth' });
        }
    }

    const viewpub = (penName) => {
        const name = penName.charAt(0) === '@' ? penName.substring(1) : penName;
        // logEvent(analytics, 'PUB_AUTHOR_PUBLICATION_CLICK', { pubPenName: penName })  //google analytic log
        var newWindow = window.open(`${name}`, '_blank')
        newWindow.penName = name
    }

    const handlePostView = (oldUrl, postID) => {
        // logEvent(analytics, 'PUB_POST_CLICK', { thinklyID: postID }) //google analytic log
        window.open(oldUrl, '_blank')
    }

    return (<>
        <Header />
        {getPublicationDetail !== undefined ? <>
            {isMobile ? <PublicationDetailMob publicationDetail={getPublicationDetail} userBalance={userStarBalance} />
                : <div className='container' style={{ marginTop: '5rem' }}>
                    <Head>
                        <title>{getPublicationDetail.publicationName}</title>
                        <meta name="description" content={getPublicationDetail.about} />
                        <meta property="og:url" content={`https://nextjs-starter-thinkly-five.vercel.app/${publicationPenName}/`} />
                        <meta property="og:type" content="website" />
                        <meta property="og:title" content={getPublicationDetail.publicationName} key="og-title" />
                        <meta property="og:description" content={getPublicationDetail.about} key="og-desc" />
                        <meta property="og:image" content={publicationImage} key="og-image" />
                    </Head>
                    {/* title, profile and about */}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Image src={publicationImage} className='pubProfile' width='60%' height='25rem' style={{ objectFit: 'contain', objectPosition: 'center' }} />
                    </div>
                    <div className='row text-center'>
                        <div className='col-12'>
                            <span className='ff-lora fs-56 fw-bold'>{getPublicationDetail.publicationName}</span>
                            {getPublicationAuthors.length > 2 ?
                                <p className='fs-28'> Authored by <b>{getPublicationAuthors[0].authorName}</b> and {getPublicationAuthors.length - 1} others</p>
                                : getPublicationAuthors.length === 2 ? <p className='fs-28'> Authored by <b>{getPublicationAuthors[0].authorName}</b> and <b>{getPublicationAuthors[1].authorName}</b> </p>
                                    : <p className='fs-28'> Authored by <b>{getPublicationAuthors[0].authorName}</b> </p>}
                        </div>
                    </div>
                    <div className='vertical-line my-4'></div>
                    {/* descripltion of publication */}
                    {getPublicationDetail.description !== undefined && <>
                        <div className='row d-flex story-content'>
                            <div className='col-12 mb-3 text-center fs-28 fw-bold'>{getPublicationDetail.about}</div>
                            <div className='col-12 text-justify mb-2'>{getPublicationDetail.description}</div>
                            <button className='mx-auto mt-4 px-4 subscribe' onClick={() => subscribeHandle(getPublicationDetail.publicationPayType)}>
                                {getPublicationDetail.publicationPayType === 'Paid' ? <>Subscribe Now </> : <>Subscribe for free</>}
                            </button>
                        </div>
                        <div className='vertical-line mt-5 mb-4'></div>
                    </>}
                    {/* for free publication get user mail ID MODAL */}
                    <div id="userContactInfo" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <button type="button" class="close text-right pr-2" data-dismiss="modal" >&times;</button>
                                <div class="modal-body px-5 pb-4 pt-1">
                                    <h5 className='text-center mb-4'>We need your emailID to send you a voucher code</h5>
                                    <input type='text' placeholder='Your email ID' value={emailID} onChange={(e) => setemailID(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                    {<div id="infoPlease" className='error-msg'></div>}
                                    <div className='text-center'>
                                        <button type='submit' className='mt-3 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 w-50 primary-bg-color' onClick={() => onSubmit('Free')} >Continue</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* sections */}
                    {PubSection !== undefined && PubSection.length > 0 && <>
                        {PubSection.map((obj, index) => {
                            return (<>
                                <div className='row' key={index}>
                                    <div className='col-12'>
                                        <p className='text-center fs-28 fw-bold mb-4 mt-3'>{obj.sectionTitle}</p>
                                        {obj.sectionContents !== undefined && obj.sectionContents.length <= 1 ? obj.sectionContents.map((data) => {
                                            return (<div className='row'>
                                                {(data.sectionImage !== null && data.sectionImage !== undefined && data.sectionImage !== '') && (data.sectionDescription !== undefined && data.sectionDescription !== null && data.sectionDescription !== '') ? <>
                                                    <div className='col-6'>
                                                        <img src={data.sectionImage} alt='sectionImage' className='section-image-center' />
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className="row ml-4 body-content-align content-font" dangerouslySetInnerHTML={{ __html: data.sectionDescription }} />
                                                    </div>
                                                </> : <>
                                                    {data.sectionImage !== null && data.sectionImage !== undefined && data.sectionImage !== '' && <img src={data.sectionImage} alt='sectionImage' className='section-image-center' />}
                                                    {data.sectionDescription !== undefined && data.sectionDescription !== null && data.sectionDescription !== '' && <div className="row ml-4 body-content-align content-font" dangerouslySetInnerHTML={{ __html: data.sectionDescription }} />}
                                                </>}
                                            </div>)
                                        }) : <div className='row'>
                                            {obj.sectionContents.map((data) => {
                                                return (<div className='col-6'>
                                                    <img src={data.sectionImage} alt='sectionImage' className='section-image-center' />
                                                    <div className='mx-4' dangerouslySetInnerHTML={{ __html: data.sectionDescription }} />
                                                </div>)
                                            })}
                                        </div>}
                                    </div>
                                    <button className='subscribe mx-auto mt-4 px-4' onClick={() => subscribeHandle(getPublicationDetail.publicationPayType)}>
                                        {getPublicationDetail.publicationPayType === 'Paid' ? <>Subscribe Now </> : <>Subscribe for free</>}
                                    </button>
                                </div>
                                <div className='vertical-line mt-5 mb-4'></div>
                            </>)
                        })}
                    </>}
                    {/* thinklies in this publication */}
                    {getPublicationThinkly !== undefined && getPublicationThinkly.length > 0 && <>
                        <div className='row'>
                            <div className='col-12 text-center fs-28 fw-bold mb-4'> Posts in this Publication </div>
                            {getPublicationThinkly.map((obj, index) => {
                                const image_url = obj.postData.postImages.length > 0 && obj.postData.postImages[0].charAt(0) === '@' ? obj.postData.postImages[0].substring(1) : obj.postData.postImages[0]
                                return (<div className='col-4' key={index}>
                                    <Card className='t-in-p' onClick={() => handlePostView(obj.postData.postURL, obj.postData.postID)}>
                                        <div className='row d-flex'>
                                            <div className='col-2 image-container'>
                                                {obj.postData.postImages.length > 0 ? <Image src={image_url} className='image' layout="fill" />
                                                    : <Card className='publilcation-image' style={{ background: '#faa422' }}></Card>}
                                            </div>
                                            <div className='col-8 my-auto ml-3 fs-18'> {obj.postData.postTitle.slice(0, 44) + (obj.postData.postTitle.length > 44 ? "..." : "")} </div>
                                        </div>
                                    </Card>
                                </div>)
                            })}
                        </div>
                        {!NoMoreData && <div>
                            <p className='mt-4 pointer fs-18 fw-bold' onClick={() => fetchMoreThinklyByPublication()}> <KeyboardArrowDown /> show more</p>
                        </div>}
                        <div className='vertical-line mt-5 mb-5'></div>
                    </>}
                    {/* meet the authors */}
                    <div className=''>
                        <p className='text-center fs-28 fw-bold mb-4'>Authored by</p>
                        {getPublicationDetail.publicationAuthor.length <= 1 ? <div className="container-fluid">
                            <div className="d-flex flex-row flex-nowrap">
                                {getPublicationDetail.publicationAuthor.map((obj, index) => {
                                    return (<div className='col-12' key={index}>{singleAuthor(obj)}</div>)
                                })}
                            </div>
                        </div> : getPublicationDetail.publicationAuthor.length <= 2 ? <div className="container-fluid">
                            <div className="d-flex flex-row flex-nowrap">
                                {getPublicationDetail.publicationAuthor.map((obj, index) => {
                                    return (<div className='col-6' key={index}>{singleAuthor(obj)}</div>)
                                })}
                            </div>
                        </div> : <Carousel responsive={meetAuthorResponsive}>
                            {getPublicationDetail.publicationAuthor.map((obj, index) => {
                                return (<div key={index}> {singleAuthor(obj)} </div>)
                            })}
                        </Carousel>}
                    </div>
                    {/* more publication from abc */}
                    {getUserPublication !== undefined && getUserPublication.length > 0 && <div responsive={responsive} >
                        <div className='vertical-line my-4'></div>
                        <div className='row d-flex mb-3'>
                            <p className='mx-auto p-heading'>More Publications by {getPublicationAuthors[0].authorName}</p>
                        </div>
                        <Carousel responsive={getUserPublication.length === 1 ? responsive1 : getUserPublication.length === 2 ? responsive2 : responsive} >
                            {getUserPublication.map((obj, index) => {
                                const imageUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                                return (<Card className="mb-4 morePub-card" key={index} onClick={() => viewpub(obj.penName)}>
                                    <CardMedia component="img" height="250" image={imageUrl} alt="publication profile" className='morePub-cardmedia' />
                                    <div className='px-2 pb-2'>
                                        <h6 className='fs-24 fw-bold'>{obj.publicationName.slice(0, 18) + (obj.publicationName.length > 18 ? "..." : "")}</h6>
                                        <p className='fs-14'> {obj.description.slice(0, 50) + (obj.description.length > 50 ? "..." : "")} </p>
                                    </div>
                                </Card>)
                            })}
                        </Carousel>
                    </div>}
                    {/* publication pay section  */}
                    {getPublicationDetail.publicationPayType === 'Paid' && <>
                        <div className='vertical-line mb-5 mt-4'></div>
                        {getPublicationDetail !== undefined && getPublicationDetail.publicationImage !== undefined && <div id='paidpublicationdiv'>
                            <form name="paymentGatewayrazorpay" onSubmit={handleSubmit(onSubmit)}>
                                <div className='col-12 mx-auto' >
                                    <Card className="t-in-p">
                                        <div className='row mb-3'>
                                            <img className='mx-auto pay-pub-profile' src={getPublicationDetail.publicationImage.charAt(0) === '@' ? getPublicationDetail.publicationImage.substring(1) : getPublicationDetail.publicationImage} alt="author profile" />
                                        </div>
                                        <div className='text-center mb-4'>
                                            <span className='ff-lora fs-30 fw-bold'>{getPublicationDetail.publicationName}</span>
                                            <p className='fs-20 fw-mid'>{getPublicationDetail.about}</p>
                                            <p className='fs-32 fw-bold mt-4'>{getPublicationDetail.publicationPlan[0].planName}</p>
                                            <p className='fs-28 fw-bold mx-auto'>&#x20b9; {getPublicationDetail.publicationPrice}</p>
                                        </div>
                                        <p className='text-center fs-18 fw-normal mb-4'> {getPublicationDetail.publicationPlan[0].description} </p>
                                        <button type='submit' className='subscribe mx-auto px-4 d-flex' style={{ paddingTop: '0.4rem' }}>
                                            {submitLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : <>Subscribe @ &#x20b9;{getPublicationDetail.publicationPrice} {getPublicationDetail.publicationPlan[0].planName}</>}
                                        </button>
                                    </Card>
                                </div>
                            </form>
                        </div>}
                    </>}
                    {/* you may also like */}
                    {getMorePubByInterest !== undefined && getMorePubByInterest.length > 0 && <div>
                        <div className='vertical-line my-4'></div>
                        <div className='row d-flex mb-3'>
                            <p className='mx-auto p-heading'>You may also like</p>
                        </div>
                        <Carousel responsive={responsive} >
                            {getMorePubByInterest.map((obj, index) => {
                                const imageUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                                return (<Card className="mb-4 morePub-card" key={index}>
                                    <CardMedia component="img" height="250" image={imageUrl} alt="publication profile" className='morePub-cardmedia' />
                                    <div className='px-2 pb-2'>
                                        <p className='fs-24 fw-bold'>{obj.publicationName.slice(0, 15) + (obj.publicationName.length > 15 ? "..." : "")}</p>
                                        <p className='fs-14'> {obj.description.slice(0, 30) + (obj.description.length > 30 ? "..." : "")} </p>
                                        <p className='fs-14 fc-link' >View the Publication</p>
                                    </div>
                                </Card>)
                            })}
                        </Carousel>
                    </div>}
                </div>}
        </> : <div style={{ padding: '150px 0px', textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
            <CircularProgress aria-label="Loading..." />
        </div>
        }
        <Footer />

    </>)
}

export default PublicationProfile