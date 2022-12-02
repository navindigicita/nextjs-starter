import React, { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import { NextSeo } from 'next-seo';
import Axios from "axios";
import $ from 'jquery'
import { useRouter } from 'next/router'
import { ListItemText, CircularProgress, Avatar } from "@material-ui/core";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import { Carousel } from 'react-bootstrap';
import { baseUrl } from "./api/api";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import PostTimeAgo from "../components/common/postTime";
import ParaByNameFromUrl from '../components/common/paraByNameFromUrl'

const PostDetail = (props) => {
    const router = useRouter()
    const { handleSubmit, formState } = useForm(); //for form submit
    const [PostData, setPostData] = useState()
    const [getVedio, setVedio] = useState(false);
    const [getDateTime, setDateTime] = useState(0)
    const [submitLoader, setSubmitLoader] = useState(false) //loader hide and show on payment btn

    useEffect(() => {
        if (props.response !== undefined && props.response.postData !== null) {
            const data = props.response
            setPostData(data)
            console.log(data);
            //for disable scroll and background blurred on paid thinkly
            if (data.publicationData !== undefined && data.publicationData !== null && data.publicationData.publicationPayType === "Paid" && data.postData.postPayType === "Paid") {
                // document.getElementById('fadeIT').classList.add("blur-body");
                document.body.classList.add("stop-scrolling");
            }
            var final_time = PostTimeAgo(data.postData.postDateTime)
            setDateTime(final_time)
        } else {
            router.push('/login')
        }
    }, [])

    const onSubmit = () => {  //razor pay use for paid pub subscription
        setSubmitLoader(true)
        return new Promise(resolve => {
            if (PostData !== undefined && PostData !== null) {
                const price = parseFloat(PostData.publicationData.publicationPrice).toFixed(2); //if free then 0 price 
                const PublicationPenName = PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName
                const refName = ParaByNameFromUrl('referrer')
                const form = document.createElement('form');
                form.method = 'post'
                form.action = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_RAZORPAY
                const data = [
                    { name: 'qty', value: "1" }, //pass hardcoded 1 only
                    { name: 'receiver', value: PostData.authorData.authorID },
                    { name: 'subscribedby', value: '0' },  //pass 0 cause not matter if logged in or not
                    { name: 'remarks', value: "subscribe to publication" },
                    { name: 'channel', value: "WEBAPP" },
                    { name: 'amount', value: price },
                    { name: 'producttype', value: "PUBLICATIONSUBSCRIPTION" },
                    { name: 'publicationid', value: PostData.publicationData.publicationID },
                    { name: 'subscriptiontype', value: "PAID" }, //free or paid
                    { name: 'publicationpenname', value: PublicationPenName },
                    { name: 'emailid', value: '' }, //for free only
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
                document.body.appendChild(form);
                form.submit();
                resolve();
            }
        });
    }

    return (<>
        <NextSeo
            title={props.titleName}
            description={props.description}
            canonical="https://nextjs-starter-thinkly-five.vercel.app/"
            openGraph={{
                url: `https://nextjs-starter-thinkly-five.vercel.app/`,
                title: props.titleName,
                description: props.description,
                images: [{
                    url: props.postImage,
                    width: 800,
                    height: 600,
                    alt: 'userImage',
                    type: 'image/jpeg',
                }],
                siteName: 'Thinkly weblite',
            }}
        />
        <Header />
        <div id="fadeIT" className="container" style={{ marginTop: '4rem' }}>
            {PostData !== undefined && PostData !== null ? <div className="row d-flex">
                <div className={isMobile ? 'col-12' : 'col-md-7 mx-auto'}>
                    <div className="row body-img">
                        {getVedio === false ? <>
                            {/* if 1 image available then show on based of video url availibility */}
                            {PostData.postData.postImages !== undefined && PostData.postData.postImages.length === 1 && <>
                                {isMobile && PostData.postData.videoURL !== undefined && PostData.postData.videoURL !== null && PostData.postData.videoURL !== '' ? ''
                                    : <img src={PostData.postData.postImages[0].charAt(0) === '@' ? PostData.postData.postImages[0].substring(1) : PostData.postData.postImages[0]} alt="detailed poster1" />}
                            </>}
                            {/* mulitple image slide show */}
                            {PostData.postData.postImages !== undefined && PostData.postData.postImages.length > 1 && <Carousel controls={false} interval={null}>
                                {PostData.postData.postImages.map((obj) => (
                                    <Carousel.Item className="mb-2">
                                        <img src={obj.charAt(0) === '@' ? obj.substring(1) : obj} alt="slider" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>}
                            {/* if mobile then auto play on page load else show play button on  */}
                            {PostData.postData.videoURL !== undefined && PostData.postData.videoURL !== null && PostData.postData.videoURL !== "" && <>
                                {isMobile ? <div className='row'>
                                    <iframe width="400" height="250" src={PostData.postData.videoURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/') + '?autoplay=1&mute=1'} ></iframe>
                                </div> : <div className="video-icon-align" onClick={() => setVedio(true)}>
                                    <img src={'/play-video.svg'} className="video-icon" style={{ width: '60px', height: '60px' }} />
                                </div>}
                            </>}
                        </> : <iframe width="640" height="350" src={PostData.postData.videoURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/') + '?autoplay=1&mute=1'}></iframe>}
                    </div>
                    {/* audio/spotify frame(image will be visible) */}
                    {PostData.postData.audioURL !== undefined && PostData.postData.audioURL !== null && PostData.postData.audioURL !== "" && <div className="row mt-4 spotify-resize" style={isMobile ? { marginLeft: '0px' } : {}} >
                        <iframe src={PostData.postData.postOembedUrl} style={{ marginBottom: '-50px' }} width="100%" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>}
                    {/* data from here */}
                    <div className='{isMobile ? `row ml-1` : `row`}'>
                        <span className='fw-bold ff-lora fs-30 mt-4' style={{ lineHeight: '1' }}> {PostData.postData.postTitle} </span>
                    </div>
                    <div className={isMobile ? "row d-flex mt-4 cursor-pointer ml-1" : "row d-flex mt-3 cursor-pointer"} onClick={() => router.push(`/${PostData.authorData.authorPenName.charAt(0) === '@' ? PostData.authorData.authorPenName.substring(1) : PostData.authorData.authorPenName}`)}>
                        <div className="my-auto">
                            {PostData.authorData.authorProfileImage !== undefined ?
                                <Avatar src={PostData.authorData.authorProfileImage.charAt(0) === '@' ? PostData.authorData.authorProfileImage.substring(1) : PostData.authorData.authorProfileImage} alt="profile" style={{ width: '40px', height: '40px' }} />
                                : <Avatar src={<AssignmentIndOutlinedIcon />} />}
                        </div>
                        <ListItemText className="col-8" primary={<span className='fs-18 fw-mid-bold'>
                            {PostData.authorData.authorPenName.charAt(0) === '@' ? PostData.authorData.authorPenName.substring(1) : PostData.authorData.authorPenName}
                        </span>} secondary={<span className='fs-15'>{getDateTime}</span>} />
                    </div>
                    <div className={isMobile ? `row fs-18 mt-4 ml-1 mr-1 text-justify` : `row mt-4 fs-18 text-justify`} dangerouslySetInnerHTML={{ __html: PostData.postData.postDescription }} />
                    <div className={isMobile ? `row fw-mid fc-link fs-15 ml-1 my-4` : `row fw-mid fc-link fs-15 my-4`}> {PostData.postData.subcategoryname.replaceAll(',', ' | ')} </div>
                    <hr />
                    {/* publication information */}
                    {PostData.publicationData !== null && <>
                        <div className={isMobile ? `row fs-28 ff-lora fw-bold mt-4 ml-1` : `row fs-24 mt-4 fw-bold ff-lora`}>Published In</div>
                        <div className={isMobile ? 'row mx-2 mt-4' : 'row mt-4'}>
                            {PostData.publicationData.publicationImage !== undefined && PostData.publicationData.publicationImage !== null &&
                                <img className="my-auto cursor-pointer" onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)}
                                    src={PostData.publicationData.publicationImage.charAt(0) === '@' ? PostData.publicationData.publicationImage.substring(1) : PostData.publicationData.publicationImage}
                                    alt="profile" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />}
                            <ListItemText className="ml-3 my-auto" primary={<div style={{ lineHeight: '1' }}>
                                <span className="fw-bold fs-18" onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)}>
                                    {PostData.publicationData.publicationName} </span> &nbsp;
                                <a className="fs-15" href="#" data-toggle="modal" data-target="#myModal"> Subscribe</a>
                            </div>}
                                secondary={<div className="row" style={{ marginLeft: '0px', lineHeight: '22px', cursor: 'pointer' }}>
                                    <span className="fs-15" onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)}>Author</span>
                                </div>}
                            />
                        </div>
                        <div className={isMobile ? `row fs-18 mt-4 mx-1 text-justify` : `row mt-4 fs-18 text-justify`}> {PostData.publicationData.description} </div>
                    </>}
                </div>
                {/* call to action bottom pannel for mobile view and free thinkly only, using modal popup for desktop view(header) */}
                {isMobile && PostData.postData.postPayType !== 'Paid' && <div className="row">
                    <section className="bottom-section-mob">
                        <div className="top-hr-colored"></div>
                        <div className="col-12 py-2">
                            <ListItemText primary={<span className='fs-15 fw-bold'>Get The Thinkly App</span>}
                                secondary={<span className='fs-12'>Read this and more on the App</span>} />
                            <button className='float-right downloadLink-button' style={{ marginTop: '-45px' }}>
                                <a className="fc-white" href={process.env.NEXT_PUBLIC_DYNAMIC_OPEN_IN_APP + `https://thinkly.me/Thinkly/Post/Index/${PostData.postData.postID}`}>Open In App</a>
                            </button>
                        </div>
                    </section>
                </div>}

            </div> : <div className='grid place-items-center h-screen'>
                <CircularProgress aria-label="Loading..." />
            </div>}
        </div>
        {/* paid thinkly bottomsheet */}
        {PostData !== undefined && PostData !== null && PostData.publicationData !== null && PostData.postData.postPayType === "Paid" ? <div className="shell-container show">
            <form name="paymentGatewayrazorpay" onSubmit={handleSubmit(onSubmit)}>
                {isMobile ? <div className="row d-flex pt-3 px-7">
                    <img src={'/paidthinkly.png'} alt="paid thinkly" style={{ width: '40px', height: '40px' }} />
                    <p className="fs-24 fw-bold fc-white ml-2"> This is a premium post </p>
                    <div className="row d-flex pt-3">
                        <div className="col-3">
                            <img src={PostData.publicationData.publicationImage.charAt(0) === '@' ? PostData.publicationData.publicationImage.substring(1) : PostData.publicationData.publicationImage}
                                alt="profile" style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '5px' }} />
                        </div>
                        <div className="col-9">
                            <ListItemText style={{ marginTop: '-5px' }} primary={<span className="fc-white fs-12">PUBLISHED IN </span>}
                                secondary={<div>
                                    <p className="fc-white fw-mid-bold fs-20">{PostData.publicationData.publicationName}</p>
                                    <p className="fc-white fs-15">{PostData.publicationData.about}</p>
                                </div>} />
                        </div>
                    </div>
                    <button className="subscribe-button mx-auto mt-3 px-2 fs-15" style={{ width: '100%' }} type='submit'>
                        {submitLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#ffa51d' }} /> : <>Subscribe @ &#x20b9;{PostData.publicationData.publicationPrice} {PostData.publicationData.publicationPlan[0].planName}</>}
                    </button>
                </div> : <div className="row d-flex pt-3 px-20">
                    <div className="col-12">
                        <div className="row">
                            <img src={'/paidthinkly.png'} alt="paid thinkly" style={{ width: '40px', height: '40px' }} />
                            <p className="fs-30 fw-bold fc-white ml-2"> This is a premium post </p>
                        </div>
                        <div className="row d-flex pt-3">
                            <img src={PostData.publicationData.publicationImage.charAt(0) === '@' ? PostData.publicationData.publicationImage.substring(1) : PostData.publicationData.publicationImage}
                                alt="profile" style={{ width: '130px', height: '130px', objectFit: 'cover', borderRadius: '5px' }} />
                            <ListItemText className="my-auto ml-3" primary={<span className="fc-white fs-12">PUBLISHED IN </span>}
                                secondary={<div>
                                    <p className="fc-white fw-mid-bold fs-18">{PostData.publicationData.publicationName}</p>
                                    <p className="fc-white fs-15">{PostData.publicationData.about}</p>
                                    <button className="subscribe-button mt-2 px-2" style={{ width: '30%' }} type='submit'>
                                        {submitLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#ffa51d' }} /> : <>Subscribe @ &#x20b9;{PostData.publicationData.publicationPrice} {PostData.publicationData.publicationPlan[0].planName}</>}
                                    </button>
                                </div>}
                            />
                        </div>
                    </div>
                </div>}
            </form>
        </div> : <Footer />}
    </>)
}

export default PostDetail

export async function getServerSideProps(context) {
    const thinklyID = context.params.post[1]
    var response, title, postImage, postDes;
    var config = {
        headers: {
            "Content-Type": "application/json",
            "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
            "UserID": 0
        },
    };
    await Axios.get(`${baseUrl._currentValue}Thinkly/v2/GetThinklyDetailsByID/${thinklyID}`, config)
        .then((res) => {
            if (res.data.responseCode === '00') {
                response = res.data.responseData.ThinklyDetails
                title = response.postData.postTitle
                postDes = response.postData.postDescription
                if (response.postData.postImages !== undefined && response.postData.postImages.length > 0) {
                    postImage = response.postData.postImages[0].charAt(0) === '@' ? response.postData.postImages[0].substring(1) : response.postData.postImages[0]
                } else {
                    postImage = response.postData.postDefaultImage
                }
            }
        })
    if (response.postData === null) {
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            props: {
                response: response
            }
        }
    } else {
        return {
            props: {
                response: response,
                postID: thinklyID,
                titleName: title,
                description: postDes,
                postImage: postImage
            }
        }
    }
}