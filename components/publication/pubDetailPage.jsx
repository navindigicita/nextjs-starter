import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import Axios from "axios";
import { useRouter } from 'next/router'
import Image from 'next/image';
import { CircularProgress } from '@material-ui/core';
import Header from '../common/header';
import Footer from '../common/footer';

const PublicationDetailPage = (props) => {
    const [PublicationDetail, setPublicationDetail] = useState()
    const [PublicationImage, setPublicationImage] = useState()
    const [AuthorList, setAuthorList] = useState()

    useEffect(() => {
        if (props.publicationDetail !== undefined) {
            console.log(props.publicationDetail.publicationDetails);
            const data = props.publicationDetail.publicationDetails
            setPublicationDetail(data)
            const imageUrl = data.publicationImage.charAt(0) === '@' ? data.publicationImage.substring(1) : data.publicationImage
            setPublicationImage(imageUrl)  //publication Image
            // for main author index switch last to start
            const arr = data.publicationAuthor
            const indexMain = arr.findIndex(({ authorType }) => authorType === "AUTHOR")  //return index number of authorType AUTHOR
            const element = arr.splice(indexMain, 1)[0]
            arr.splice(0, 0, element);
            setAuthorList(arr)
            //end here
        }
    }, [])


    return (<>
        <Header />
        {PublicationDetail !== undefined ? <div className='container' style={{ marginTop: '5rem' }}>
            <div className='row d-flex'>
                <Image src={PublicationImage} alt="PublicationImage" className='mx-auto' height={100} width={100} />
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

        </div> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
        <Footer />
    </>)
}

export default PublicationDetailPage