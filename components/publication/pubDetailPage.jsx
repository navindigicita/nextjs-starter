import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import Head from 'next/head';
import { CircularProgress } from '@material-ui/core';
import Header from '../common/header';
import Footer from '../common/footer';
import { PublicationProfileEvent } from '../../config/facebookPixelEvent';
import { baseUrl } from '../../pages/api/api';

const PublicationDetailPage = (props) => {
    const history = useRouter()
    const BASE_URL = useContext(baseUrl);
    // const { handleSubmit, formState } = useForm(); //for form submit
    const [PublicationDetail, setPublicationDetail] = useState()
    const [AuthorID, setAuthorID] = useState()
    const [PublictionID, setPublictionID] = useState()
    const [PublicationImage, setPublicationImage] = useState()
    const [PublicationPenName, setPublicationPenName] = useState()
    const [AuthorList, setAuthorList] = useState()
    const [UserStarBalance, setUserStarBalance] = useState()
    const [PubSection, setPubSection] = useState()

    useEffect(() => {
        if (process.env.NEXT_PUBLIC_GOOGLE_PIXEL_EVENT === 'YES') {
            PublicationProfileEvent()
        }
        if (window.pen_name !== undefined && window.userStatus !== undefined) {
            fetchPublicationDetail(window.pen_name)
        } else if (props.publicationDetail !== undefined) {  //cause 1st user go to profile detail page if type publication then pass data here
            commonFunctionForDataSet(props.publicationDetail)
        } else {
            var pName = window.location.href
            const data = pName.endsWith('/') ? pName.substring(0, pName.length - 1) : pName;
            var name = data.substring(data.lastIndexOf("/") + 1, data.length);
            fetchPublicationDetail(name)
        }
    }, [])

    const fetchPublicationDetail = (name) => {
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
                        commonFunctionForDataSet(response)
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

    const commonFunctionForDataSet = (response) => {
        const data = response.publicationDetails
        setPublicationDetail(data)
        setPublictionID(data.publicationID)  //Publication ID
        setAuthorID(data.createdBy) //publication's author Id stored in state
        const imageUrl = data.publicationImage.charAt(0) === '@' ? data.publicationImage.substring(1) : data.publicationImage
        setPublicationImage(imageUrl)  //publication Image
        const publicationPenName = data.penName.charAt(0) === '@' ? data.penName.substring(1) : data.penName
        setPublicationPenName(publicationPenName) //publication pen name
        const arr = data.publicationAuthor  // for main author index switch last to start
        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")  //return index number of authorType AUTHOR
        const element = arr.splice(indexMain, 1)[0]
        arr.splice(0, 0, element);
        setAuthorList(arr)  //main author index switch last to start end here
        setUserStarBalance(response.userDetails.userBalance)  //userBalance stored in state
        fetchSectionDetail(data.publicationID, data.createdBy) //function call
        // fetchPublicationThinklies(data.publicationID, data.createdBy)  //function call
        // fetchMorePubByAuthor(data.publicationID, data.createdBy)   //function call
        // const interestArray = [];
        // data.interestData.filter((obj) => {
        //     interestArray.push(obj.interestID)
        // })
        // fetchYouMayLikePubs(data.createdBy, interestArray)  //function call
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

    return (<>
        <Header />

        {PublicationDetail !== undefined ? <div className='container' style={{ marginTop: '4rem' }}>
            <Head>
                <title>{PublicationDetail.publicationName}</title>
                <meta name="description" content={PublicationDetail.about} />
                <meta property="og:url" content={`https://nextjs-starter-thinkly-five.vercel.app/${PublicationPenName}/`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={PublicationDetail.publicationName} key="og-title" />
                <meta property="og:description" content={PublicationDetail.about} key="og-desc" />
                <meta property="og:image" content={PublicationImage} key="og-image" />
            </Head>
            <div className='d-flex justify-content-center'>
                <Image src={PublicationImage} alt="PublicationImage" className='pubProfile' width='60%' height='25rem' style={{ objectFit: 'contain', objectPosition: 'center' }} />
            </div>
            <div className='row text-center'>
                <div className='col-12'>
                    <h1 className='ff-lora fs-56 fw-bold'>{PublicationDetail.publicationName}</h1>
                    {AuthorList !== undefined && AuthorList.length > 2 ? <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> and {AuthorList.length - 1} others</p>
                        : AuthorList.length === 2 ? <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> and <b>{AuthorList[1].authorName}</b> </p>
                            : <p className='fs-28'> Authored by <b>{AuthorList[0].authorName}</b> </p>}
                </div>
            </div>
            <div className='vertical-line my-4'></div>
            {/* descripltion of publication */}
            {PublicationDetail.description !== undefined && <>
                <div className='row d-flex story-content'>
                    <div className='col-12 mb-3 text-center fs-28 fw-bold'>{PublicationDetail.about}</div>
                    <div className='col-12 text-justify mb-2'>{PublicationDetail.description}</div>
                    <button className='mx-auto mt-4 px-4 subscribe' onClick={() => subscribeHandle(PublicationDetail.publicationPayType)}>
                        {PublicationDetail.publicationPayType === 'Paid' ? <>Subscribe Now </> : <>Subscribe for free</>}
                    </button>
                </div>
                <div className='vertical-line mt-5 mb-4'></div>
            </>}
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
                            <button className='subscribe mx-auto mt-4 px-4' onClick={() => subscribeHandle(PublicationDetail.publicationPayType)}>
                                {PublicationDetail.publicationPayType === 'Paid' ? <>Subscribe Now </> : <>Subscribe for free</>}
                            </button>
                        </div>
                        <div className='vertical-line mt-5 mb-4'></div>
                    </>)
                })}
            </>}
        </div> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
        <Footer />
    </>)
}

export default PublicationDetailPage