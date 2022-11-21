import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Head from 'next/head';
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { Avatar, Card, ListItemText, CircularProgress } from '@material-ui/core'
import { KeyboardArrowDown } from '@material-ui/icons';
import ParaByNameFromUrl from '../common/paraByNameFromUrl'
import { PublicationProfileEvent, PublicationSubscribeEvent } from '../../config/facebookPixelEvent';
import { baseUrl } from '../../pages/api/api';
import { isMobile } from 'react-device-detect';

const meetAuthorResponsive = {
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

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
    const [PublicationThinklies, setPublicationThinklies] = useState()  //thinklies list in this publication
    const [startIndexValue, setstartIndexValue] = useState(0)  //star index of load ore thinkies in this publication
    const [endIndexValue, setendIndexValue] = useState(9)  //end index of load ore thinkies in this publication
    const [NoMoreData, setNoMoreData] = useState(false)  //if no more thinklies then hide MORE link 
    const [UserPublication, setUserPublication] = useState() // more publication by the author who has written this publilcation
    const [NoMorePubByAuthor, setNoMorePubByAuthor] = useState(false)  //no data of publilcation by author
    const [MorePubByInterest, setMorePubByInterest] = useState()  //more publication list by this publication's interest
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
            fetchSectionDetail(data.publicationID, data.createdBy) //function call
            fetchPublicationThinklies(data.publicationID, data.createdBy)  //function call
            fetchMorePubByAuthor(data.publicationID, data.createdBy)   //function call
            const interestArray = [];
            data.interestData.filter((obj) => {
                interestArray.push(obj.interestID)
            })
            fetchYouMayLikePubs(data.createdBy, interestArray)  //function call
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

    // fetch more thinkly by publication (onCLick of more will load more data and append with old data) start
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
                    if (PublicationThinklies !== undefined) {
                        setPublicationThinklies(getPublicationThinkly => [...getPublicationThinkly, ...newData])
                    } else {
                        setPublicationThinklies(newData)
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
                    const newData = res.data.responseData
                    if (UserPublication !== undefined) {
                        setUserPublication(setUserPublication => [...setUserPublication, ...newData])
                    } else {
                        setUserPublication(newData)
                    }
                    if (newData.length < 9) {
                        setNoMorePubByAuthor(true)
                    }
                } else if (res.data.responseCode === '03') {
                    setNoMorePubByAuthor(true)
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
            <div className='text-center mb-2 fs-26 fw-bold'> {obj.authorName.slice(0, 18) + (obj.authorName.length > 18 ? "..." : "")} </div>
            <div className='fs-18 text-center'>
                {obj.authorProfileText.length > 200 ? <> {obj.authorProfileText.slice(0, 200)} <span className='fw-mid-bold pointer' onClick={() => handleUserProfile(obj.authorID)} >...read more</span> </> : obj.authorProfileText}
            </div>
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
            // if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
            //     PublicationSubscribeEvent()  //google pixel event
            // }
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

    const handlePubView = (penName) => {
        const name = penName.charAt(0) === '@' ? penName.substring(1) : penName;
        // logEvent(analytics, 'PUB_AUTHOR_PUBLICATION_CLICK', { pubPenName: penName })  //google analytic log
        var newWindow = window.open(`${name}`, '_blank')
        newWindow.penName = name
    }

    const handlePostView = (oldUrl, postID) => {
        // logEvent(analytics, 'PUB_POST_CLICK', { thinklyID: postID }) //google analytic log
        window.open(oldUrl, '_blank')
    }

    const handleAppButtonCLick = () => {
        window.location()
    }

    return (<>
        <div className='container' style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {PublicationDetails !== undefined ? <>
                <div className='row'>
                    <img src={PublicationImage} alt="PublicationImage" className='mx-auto' style={{ width: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                </div>
                <div className='row mt-2 text-center'>
                    <div className='col-12'>
                        <p className='ff-lora fs-36 fw-bold'>{PublicationDetails.publicationName}</p>
                        {AuthorList !== undefined && AuthorList.length > 2 ? <h6 className='fs-26'> Authored by <span className='fw-bold'>{AuthorList[0].authorName}</span> and {AuthorList.length - 1} others</h6>
                            : AuthorList.length === 2 ? <h6 className='fs-26'> Authored by <span className='fw-bold'>{AuthorList[0].authorName}</span> and <span className='fw-bold'>{AuthorList[1].authorName}</span> </h6>
                                : <h6 className='fs-26'> Authored by <span className='fw-bold'>{AuthorList[0].authorName}</span> </h6>}
                    </div>
                </div>
                <div className='vertical-line my-4'></div>
                {/* description */}
                {PublicationDetails.description !== undefined && <>
                    <div className='row d-flex'>
                        <div className='col-12 mb-3 fs-30 fw-bold'>{PublicationDetails.about}</div>
                        <div className='col-12 text-left fs-18 mb-3'>{PublicationDetails.description}</div>
                        <button className='mx-auto subscribe px-4' onClick={() => subscribeHandle(PublicationDetails.publicationPayType)}>
                            {PublicationDetails.publicationPayType === 'Paid' ? <>Subscribe Now </> : <>Subscribe for free</>}
                        </button>
                    </div>
                    <div className='vertical-line mt-4 mb-3'></div>
                </>}
                {/* for free publication get user mail ID MODAL */}
                <div id="userContactInfo" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <button type="button" class="close text-right pr-2" data-dismiss="modal" >&times;</button>
                            <div class="modal-body px-5 pb-4 pt-1">
                                <h5 className='text-center mb-4'>We need your emailID to send you a voucher code</h5>
                                <input type='text' placeholder='Your email ID' value={emailID} onChange={(e) => setemailID(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                <div id="infoPlease" className='error-msg'></div>
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
                        return (obj.sectionTitle !== '' && obj.sectionDescription !== '' && <>
                            <div className='row d-flex' key={index}>
                                <div className='col-12'>
                                    <h6 className='text-center ff-lora fs-30 fw-bold mb-4'>{obj.sectionTitle}</h6>
                                    {obj.sectionContents !== undefined && obj.sectionContents.length > 0 && obj.sectionContents.map((data) => {
                                        return (<div className='row'>
                                            <div className='col-12'>
                                                {data.sectionImage !== null && data.sectionImage !== undefined && data.sectionImage !== ''
                                                    && <img src={data.sectionImage} alt='sectionImage' className='section-image-center' />}
                                                {data.sectionDescription !== undefined && data.sectionDescription !== null && data.sectionDescription !== ''
                                                    && <div className='' dangerouslySetInnerHTML={{ __html: data.sectionDescription }} />}
                                            </div>
                                        </div>)
                                    })}
                                </div>
                                <button className='mx-auto subscribe px-4 mt-4' onClick={() => subscribeHandle(PublicationDetails.publicationPayType)}>
                                    {PublicationDetails.publicationPayType === 'Paid' ? <>Subscribe Now</> : <>Subscribe for free</>}
                                </button>
                            </div>
                            <div className='vertical-line mt-4 mb-3'></div>
                        </>)
                    })}
                </>}
                {/* thinklies in this publication */}
                {PublicationThinklies !== undefined && PublicationThinklies.length > 0 && <>
                    <h6 className='text-center fs-30 fw-bold ff-lora mb-4'>Posts in this Publication</h6>
                    {PublicationThinklies.map((obj, index) => {
                        const image_url = obj.postData.postImages.length > 0 && obj.postData.postImages[0].charAt(0) === '@' ? obj.postData.postImages[0].substring(1) : obj.postData.postImages[0]
                        return (<Card className='t-in-p' key={index} onClick={() => handlePostView(obj.postData.postURL, obj.postData.postID)}>
                            <div className='row d-flex'>
                                <div className='col-3'>
                                    {obj.postData.postImages.length > 0 ? <img src={image_url} className='publilcation-image' /> : <Card className='publilcation-image' style={{ background: '#faa422' }}></Card>}
                                </div>
                                <div className='col-9 my-auto fs-22'> {obj.postData.postTitle.slice(0, 45) + (obj.postData.postTitle.length > 45 ? "..." : "")} </div>
                            </div>
                        </Card>)
                    })}
                    {!NoMoreData && <h6 className='col-12 fs-22 fw-mid' onClick={() => fetchMoreThinklyByPublication()}> <KeyboardArrowDown /> show more</h6>}
                    <div className='vertical-line mt-4 mb-3'></div>
                </>}
                {/* meet the authors */}
                {PublicationDetails.publicationAuthor !== undefined && PublicationDetails.publicationAuthor.length > 0 && <div>
                    <h6 className='text-center fs-28 fw-bold ff-lora mb-2'>Authored by</h6>
                    <Carousel responsive={meetAuthorResponsive}>
                        {PublicationDetails.publicationAuthor.map((obj, index) => { //onClick={() => handleUserProfile(obj.authorID)}
                            const imageUrl = obj.authorProfileImage.charAt(0) === '@' ? obj.authorProfileImage.substring(1) : obj.authorProfileImage
                            return (<Card className="card-body" key={index}>
                                <div className='row mt-2'>
                                    <Avatar className='mx-auto ma-profile' src={imageUrl} alt="author profile" />
                                </div>
                                <div className='text-center fs-30 fw-bold'>{obj.authorName.slice(0, 16) + (obj.authorName.length > 16 ? "..." : "")}</div>
                                <div className='fs-18 text-center mb-4'> {obj.authorProfileText !== '' && (obj.authorProfileText.slice(0, 200) + (obj.authorProfileText.length > 200 ? "..." : ""))} </div>
                            </Card>)
                        })}
                    </Carousel>
                </div>}
                {/* more publication from abc */}
                {UserPublication !== undefined && UserPublication.length > 0 && <>
                    <div className='vertical-line mt-3 mb-4'></div>
                    <h6 className='text-center ff-lora fs-30 fw-bold mb-4'>More Publications By {AuthorList[0].authorName}</h6>
                    {UserPublication.map((obj, index) => {
                        const imageUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                        return (<div className='row mb-3 ml-1' key={index} onClick={() => handlePubView(obj.penName)}>
                            <div className='col-2'>
                                <img src={imageUrl} alt="Image" className="publilcation-image" />
                            </div>
                            <div className='col-9 ml-2'>
                                <ListItemText className='my-auto' primary={<span className='fs-18 fw-bold'>{obj.publicationName.slice(0, 18) + (obj.publicationName.length > 18 ? "..." : "")}</span>}
                                    secondary={<span className='fs-15'>{obj.description.slice(0, 65) + (obj.description.length > 65 ? "..." : "")}</span>} />
                            </div>
                        </div>)
                    })}
                    {!NoMorePubByAuthor && <h6 className='col-12 text-center fs-18 fw-bold fc-primary' onClick={() => fetchMorePubByAuthor()}>+MORE</h6>}
                </>}
                {/* publication profile  */}
                {PublicationDetails.publicationPayType === 'Paid' && <>
                    <div className='vertical-line my-4'></div>
                    {PublicationDetails !== undefined && PublicationDetails.publicationImage !== undefined && <div id='paidpublicationdiv'>
                        <form name="paymentGatewayrazorpay" onSubmit={handleSubmit(onSubmit)}>
                            <div className='col-12 mx-auto'>
                                <Card className="t-in-p">
                                    <div className='row mb-3'>
                                        <img className='mx-auto pay-pub-profile' src={PublicationDetails.publicationImage.charAt(0) === '@' ? PublicationDetails.publicationImage.substring(1) : PublicationDetails.publicationImage} alt="author profile" />
                                    </div>
                                    <div className='text-center mb-2'>
                                        <h5 className='ff-lora fs-30 fw-bold'>{PublicationDetails.publicationName}</h5>
                                        <h6 className='fs-18'>{PublicationDetails.about}</h6>
                                        <div className='mt-3 fs-20 fw-bold'>{PublicationDetails.publicationPlan[0].planName}</div>
                                        <div className='fs-28 fw-bold mx-auto'>&#x20b9; {PublicationDetails.publicationPrice}</div>
                                        <div className='fs-18 my-3'> {PublicationDetails.publicationPlan[0].description} </div>
                                    </div>
                                    <button type='submit' className='subscribe mx-auto px-4 d-flex' style={{ paddingTop: '0.4rem', height: 'auto', paddingBottom: '0.4rem', }}>
                                        {submitLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : <>Subscribe @ &#x20b9;{PublicationDetails.publicationPrice} {PublicationDetails.publicationPlan[0].planName}</>}
                                    </button>
                                </Card>
                            </div>
                        </form>
                    </div>}
                </>}
                {/* you may also like */}
                {MorePubByInterest !== undefined && MorePubByInterest.length > 0 && <>
                    <div className='vertical-line my-3'></div>
                    <p className='text-center fs-30 fw-bold ff-lora mb-4'>Other Publilcations you may like</p>
                    {MorePubByInterest.map((obj, index) => {
                        const imageUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                        return (<div className='row mb-3 ml-1' key={index}>
                            <div className='col-3'>
                                <img src={imageUrl} alt="Image" height={100} width={100} className="publilcation-image" />
                            </div>
                            <div className='col-9'>
                                <ListItemText primary={<span className='fs-18 fw-bold'>{obj.publicationName.slice(0, 20) + (obj.publicationName.length > 20 ? "..." : "")}</span>}
                                    secondary={<span className='fs-15'>{obj.description.slice(0, 60) + (obj.description.length > 60 ? "..." : "")}</span>} />
                                {/* <h4 className='fs-14 fc-link' onClick={() => handlePubView(obj.penName)}>View the Publication</h4> */}
                            </div>
                        </div>)
                    })}
                    {/* {!NoMorePubByInterest && <p className='col-12 text-center fs-22 fw-bold fc-primary' onClick={() => fetchMorePubByInterest()}>+MORE</p>} */}
                </>}
                {/* open in app section */}
                {isMobile && <div className="row">
                    <section className="bottom-section-mob">
                        <div className="top-hr-colored"></div>
                        <div className="col-12 py-2">
                            <ListItemText primary={<span className='fs-15 fw-bold'>Get The Thinkly App</span>}
                                secondary={<span className='fs-12'>Read all Publications and more on the App</span>} />
                            <button className='float-right downloadLink-button' style={{ marginTop: '-45px' }}>
                                <a href={process.env.NEXT_PUBLIC_DYNAMIC_OPEN_IN_APP + `https://thinkly.me/${PublicationPenName}`}> OPEN IN APP </a>
                            </button>
                        </div>
                    </section>
                </div>}
            </> : <div className='grid place-items-center h-screen'>
                <CircularProgress aria-label="Loading..." />
            </div>}
        </div>
    </>)
}

export default PublicationDetailMob