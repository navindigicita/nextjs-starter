import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import { CircularProgress } from '@material-ui/core';
import Header from '../common/header';
import Footer from '../common/footer';
import { PublicationProfileEvent } from '../../config/facebookPixelEvent';

const PublicationDetailPage = (props) => {
    const [PublicationDetail, setPublicationDetail] = useState()
    const [PublicationImage, setPublicationImage] = useState()
    const [AuthorList, setAuthorList] = useState()

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

    const fetchPublicationDetail = () => { }

    const commonFunctionForDataSet = (response) => {
        const data = response.publicationDetails
        setPublicationDetail(data)
        const imageUrl = data.publicationImage.charAt(0) === '@' ? data.publicationImage.substring(1) : data.publicationImage
        setPublicationImage(imageUrl)  //publication Image
        const arr = data.publicationAuthor  // for main author index switch last to start
        const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")  //return index number of authorType AUTHOR
        const element = arr.splice(indexMain, 1)[0]
        arr.splice(0, 0, element);
        setAuthorList(arr)  //main author index switch last to start end here
    }


    return (<>
        <Header />
        {PublicationDetail !== undefined ? <div className='container' style={{ marginTop: '4rem' }}>
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
        </div> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
        <Footer />
    </>)
}

export default PublicationDetailPage