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
    const [getPublicationID, setPublicationID] = useState() //publication ID
    const [getAuthorID, setAuthorID] = useState() //publication's authr ID
    const [userStarBalance, setUserStarBalance] = useState() //store userBalance
    const [getPublicationDetail, setPublicationDetail] = useState()  //publication detail by publication penName
    const [getMainAuthor, setMainAuthor] = useState()  //Main author of this publication
    const [getPublicationThinkly, setPublicationThinkly] = useState()  //thinklies list in this publication
    const [startIndexValue, setstartIndexValue] = useState(0)  //star index of load ore thinkies in this publication
    const [endIndexValue, setendIndexValue] = useState(9)  //end index of load ore thinkies in this publication
    const [NoMoreData, setNoMoreData] = useState(false)  //if no more thinklies then hide MORE link 
    const [getUserPublication, setUserPublication] = useState() // more publication by the author who has written this publilcation
    const [getMorePubByInterest, setMorePubByInterest] = useState()  //more publication list by this publication's interest
    const [publicationPrice, setPublicationPrice] = useState() // store publication price
    const [publicationPenName, setpublicationPenName] = useState() // store publication penname
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
            // fetchPublicationDetail(window.pen_name)
        } else if (props.publicationDetail !== undefined) {
            const response = props.publicationDetail;
            commonFunctionForDataSet(response)
        } else {
            var pName = window.location.href
            const data = pName.endsWith('/') ? pName.substring(0, pName.length - 1) : pName;
            var name = data.substring(data.lastIndexOf("/") + 1, data.length);
            // logEvent(analytics, 'PUB_DETAIL_PAGE', { penname: window.pen_name })
            // fetchPublicationDetail(name)
        }
    }, [])

    const commonFunctionForDataSet = (data) => {
        console.log("publication response from props user to pub ", data);

        // const response = res.data.responseData.Details.publicationDetails;
        // setPublicationDetail(response) //publication detail stored in state
        // setUserStarBalance(res.data.responseData.Details.userDetails.userBalance)  //userBalance stored in state
        // setPublicationPrice(res.data.responseData.Details.publicationDetails.publicationPrice) // publicationPrice stored in state
        // setpublicationPenName(response.penName.charAt(0) === '@' ? response.penName.substring(1) : response.penName) //publicationPenName stored in state
        // for main author index switch last to start(in case in decending order)
        const arr = data.publicationDetails.publicationAuthor
        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")
        const element = arr.splice(indexMain, 1)[0]
        arr.splice(0, 0, element);
        const mainAuthorName = arr.find(({ authorType }) => authorType === "AUTHOR")
        setMainAuthor(mainAuthorName)
        // 
        // const OtherAuthorName = response.publicationAuthor.find(({ authorType }) => authorType !== "AUTHOR")
        // setCoAuthorList(OtherAuthorName)
        // setPublicationID(response.publicationID)
        // console.log("@@@@@@@@@@@@@", response.createdBy);
        // setAuthorID(response.createdBy) //publication's author Id stored in state
        // fetchSectionDetail(response.publicationID, response.createdBy) //function call

        // fetchPublicationThinklies(response.publicationID, response.createdBy)  //function call
        // fetchMoreP`ubByAuthor(response.publicationID, response.createdBy)   //function call
        // const interestArray = [];
        // response.interestData.filter((obj) => {
        //     interestArray.push(obj.interestID)
        // })
        // fetchYouMayLikePubs(response.createdBy, interestArray)  //function call
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
                        const response = res.data.responseData.Details.publicationDetails;
                        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$", response);
                        setPublicationDetail(response) //publication detail stored in state
                        setUserStarBalance(res.data.responseData.Details.userDetails.userBalance)  //userBalance stored in state
                        setPublicationPrice(res.data.responseData.Details.publicationDetails.publicationPrice) // publicationPrice stored in state
                        setpublicationPenName(response.penName.charAt(0) === '@' ? response.penName.substring(1) : response.penName) //publicationPenName stored in state
                        const mainAuthorName = response.publicationAuthor.find(({ authorType }) => authorType === "AUTHOR")
                        // for main author index switch last to start
                        const arr = response.publicationAuthor
                        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")
                        const element = arr.splice(indexMain, 1)[0]
                        arr.splice(0, 0, element);
                        // 
                        setMainAuthor(mainAuthorName)
                        const OtherAuthorName = response.publicationAuthor.find(({ authorType }) => authorType !== "AUTHOR")
                        setCoAuthorList(OtherAuthorName)
                        setPublicationID(response.publicationID)
                        console.log("@@@@@@@@@@@@@", response.createdBy);
                        setAuthorID(response.createdBy) //publication's author Id stored in state
                        fetchSectionDetail(response.publicationID, response.createdBy) //function call
                        // fetchPublicationThinklies(response.publicationID, response.createdBy)  //function call
                        // fetchMoreP`ubByAuthor(response.publicationID, response.createdBy)   //function call
                        // const interestArray = [];
                        // response.interestData.filter((obj) => {
                        //     interestArray.push(obj.interestID)
                        // })
                        // fetchYouMayLikePubs(response.createdBy, interestArray)  //function call
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

    function scrollThinklies() {
        setstartIndexValue(endIndexValue)
        setendIndexValue(endIndexValue + 9)
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

    const fetchMoreThinklyByPublication = () => {
        scrollThinklies()
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
        {getPublicationDetail !== undefined && getPublicationID !== undefined && getAuthorID !== undefined ? <>
            {isMobile ? <PublicationDetailMob authorID={getAuthorID} publicationID={getPublicationID} publicationDetails={getPublicationDetail} publicationPrice={publicationPrice} /> : <div className='container' style={{ marginTop: '5rem' }}>
                <Head>
                    {/* <title>{getpenName}</title>
                    <meta name="description" content={aboutUser} />
                    <meta property="og:url" content={`https://nextjs-starter-thinkly-five.vercel.app/${getpenName}/`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={getpenName} key="og-title" />
                    <meta property="og:description" content={aboutUser} key="og-desc" />
                    <meta property="og:image" content={getProfileImage} key="og-image" /> */}
                </Head>

            </div>}
        </> : <div style={{ padding: '150px 0px', textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
            <CircularProgress aria-label="Loading..." />
        </div>
        }
        <Footer />

    </>)
}

export default PublicationProfile