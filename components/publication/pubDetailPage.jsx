import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import { CircularProgress } from '@material-ui/core';

const PublicationDetailPage = (props) => {
    const [PublicationDetail, setPublicationDetail] = useState()
    const [PublicationImage, setPublicationImage] = useState()
    const [PublicationPenName, setPublicationPenName] = useState()

    useEffect(() => {
        if (props.publicationDetail !== undefined) {
            console.log(props.publicationDetail);
            setPublicationDetail(props.publicationDetail)
        }
    }, [])

    useEffect(() => {
        if (PublicationDetail !== undefined) {
            const imageUrl = PublicationDetail.publicationDetails.publicationImage.charAt(0) === '@' ? PublicationDetail.publicationDetails.publicationImage.substring(1) : PublicationDetail.publicationDetails.publicationImage
            setPublicationImage(imageUrl)
            const penNameShorted = PublicationDetail.publicationDetails.penName.charAt(0) === '@' ? PublicationDetail.publicationDetails.penName.substring(1) : PublicationDetail.publicationDetails.penName
            setPublicationPenName(penNameShorted)
        }
    }, [])


    return (<>
        {PublicationDetail !== undefined ? <>
            <div className='row d-flex'>
                <Image src={PublicationImage} alt="PublicationImage" className='mx-auto' height={100} width={100} />
            </div>
            <div className='row text-center'>
                <div className='col-12'>
                    <h1 className='ff-lora fs-56 fw-bold'>{PublicationDetail.publicationDetails.publicationName}</h1>
                </div>
            </div>
        </> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
    </>)
}

export default PublicationDetailPage