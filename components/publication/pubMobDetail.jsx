import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Head from 'next/head';
import { Avatar, Card, CardMedia, CircularProgress } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons';
import ParaByNameFromUrl from '../common/paraByNameFromUrl'
import { PublicationProfileEvent, PublicationSubscribeEvent } from '../../config/facebookPixelEvent';
import { baseUrl } from '../../pages/api/api';
import { isMobile } from 'react-device-detect';

const PublicationDetailMob = (props) => {
    const BASE_URL = useContext(baseUrl);
    const { handleSubmit, formState } = useForm(); //for form submit
    const [PublicationDetails, setPublicationDetails] = useState()
    const [AuthorID, setAuthorID] = useState()
    const [PublicationID, setPublicationID] = useState()
    const [PublicationImage, setPublicationImage] = useState()
    const [PublicationPenName, setPublicationPenName] = useState()
    const [AuthorList, setAuthorList] = useState()
    const [PubSection, setPubSection] = useState()
    const [getPublicationThinkly, setPublicationThinkly] = useState()  //thinklies list in this publication
    const [startIndexValue, setstartIndexValue] = useState(0)  //star index of load ore thinkies in this publication
    const [endIndexValue, setendIndexValue] = useState(9)  //end index of load ore thinkies in this publication
    const [NoMoreData, setNoMoreData] = useState(false)  //if no more thinklies then hide MORE link 
    const [getUserPublication, setUserPublication] = useState() // more publication by the author who has written this publilcation
    const [getMorePubByInterest, setMorePubByInterest] = useState()  //more publication list by this publication's interest
    const [publicationPrice, setPublicationPrice] = useState() // store publication price
    const [submitLoader, setSubmitLoader] = useState(false) //loader hide and show on payment btn
    const [emailID, setemailID] = useState()  //for modal box(free subscription)

    useEffect(() => {
        if (props.publicationDetail !== undefined) {
            const data = props.publicationDetail
            setPublicationDetails(data)
            setPublicationID(data.publicationID)  //Publication ID
            setAuthorID(data.createdBy) //publication's author Id stored in state
            setPublicationPrice(data.publicationPrice)
            const imageUrl = data.publicationImage.charAt(0) === '@' ? data.publicationImage.substring(1) : data.publicationImage
            setPublicationImage(imageUrl)  //publication Image
            const publicationPenName = data.penName.charAt(0) === '@' ? data.penName.substring(1) : data.penName
            setPublicationPenName(publicationPenName) //publication pen name
            const arr = data.publicationAuthor  // for main author index switch last to start
            const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")  //return index number of authorType AUTHOR
            const element = arr.splice(indexMain, 1)[0]
            arr.splice(0, 0, element);
            setAuthorList(arr)  //main author index switch last to start end here
            // fetchSectionDetail(data.publicationID, data.createdBy) //function call
            // fetchPublicationThinklies(data.publicationID, data.createdBy)  //function call
            // fetchMorePubByAuthor(data.publicationID, data.createdBy)   //function call
            // const interestArray = [];
            // data.interestData.filter((obj) => {
            //     interestArray.push(obj.interestID)
            // })
            // fetchYouMayLikePubs(data.createdBy, interestArray)  //function call
        }
    }, [])

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

    useEffect(() => { //don't delete uncomment when use fetchPublicationThinklies api
        if (PublicationID !== undefined && AuthorID !== undefined) {
            fetchPublicationThinklies(PublicationID, AuthorID)
        }
    }, [startIndexValue, endIndexValue])

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
    } // fetch more thinkly by publication end

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
                { name: 'receiver', value: AuthorID },
                { name: 'subscribedby', value: '0' },  //pass 0 cause not matter if logged in or not
                { name: 'remarks', value: "subscribe to publication" },
                { name: 'channel', value: "WEBAPP" },
                { name: 'amount', value: price },
                { name: 'producttype', value: "PUBLICATIONSUBSCRIPTION" },
                { name: 'publicationid', value: PublicationID },
                { name: 'subscriptiontype', value: freePub === 'Free' ? "FREE" : "PAID" }, //free or paid
                { name: 'publicationpenname', value: PublicationPenName },
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
        <div className='container' style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {PublicationDetails !== undefined ? <div>
                <Head>
                    <title>{PublicationDetails.publicationName}</title>
                    <meta name="description" content={PublicationDetails.about} />
                    <meta property="og:url" content={`https://nextjs-starter-thinkly-five.vercel.app/${PublicationPenName}/`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={PublicationDetails.publicationName} key="og-title" />
                    <meta property="og:description" content={PublicationDetails.about} key="og-desc" />
                    <meta property="og:image" content={PublicationImage} key="og-image" />
                </Head>
                <div className='d-flex justify-content-center'>
                    <Image src={PublicationImage} alt="PublicationImage" className='pubProfile' width='100%' height='20rem' style={{ objectFit: 'contain', objectPosition: 'center' }} />
                </div>
                <div className='row text-center'>
                    <div className='col-12'>
                        <h1 className='ff-lora fs-56 fw-bold'>{PublicationDetails.publicationName}</h1>
                        {AuthorList !== undefined && AuthorList.length > 2 ? <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> and {AuthorList.length - 1} others</p>
                            : AuthorList.length === 2 ? <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> and <b>{AuthorList[1].authorName}</b> </p>
                                : <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> </p>}
                    </div>
                </div>
                <div className='vertical-line my-4'></div>
            </div> : <div className='grid place-items-center h-screen'>
                <CircularProgress aria-label="Loading..." />
            </div>}
        </div>
    </>)
}

export default PublicationDetailMob