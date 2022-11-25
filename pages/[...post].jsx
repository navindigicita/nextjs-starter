import React, { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useForm } from "react-hook-form";
import { NextSeo } from 'next-seo';
import Axios from "axios";
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

    useEffect(() => {
        if (props.response !== undefined && props.response.postData !== null) {
            const data = props.response
            setPostData(data)
            console.log(data);
            if (data.publicationData !== null && data.publicationData.publicationPayType === "Paid") {  //for disable scroll and background blurred on paid thinkly
                document.getElementById('fadeIT').classList.add("blur-body");
                document.body.classList.add("stop-scrolling");
            }
            var final_time = PostTimeAgo(data.postData.postDateTime)
            setDateTime(final_time)
        } else {
            router.push('/login')
        }
    }, [])

    const onSubmit = () => {  //razor pay use for paid pub subscription
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
        <div id="fadeIT" className="container" style={{ marginTop: '5rem' }}>
            {PostData !== undefined && PostData !== null ? <div className="row d-flex">
                <div className={isMobile ? 'col-12' : 'col-md-7 mx-auto'}>
                    <div className="row body-img">
                        {getVedio === false ? <>
                            {PostData.postData.postImages !== undefined && PostData.postData.postImages.length === 1 ?
                                <img src={PostData.postData.postImages[0].charAt(0) === '@' ? PostData.postData.postImages[0].substring(1) : PostData.postData.postImages[0]} alt="detailed poster" />
                                : PostData.postData.postImages !== undefined && PostData.postData.postImages.length > 1 &&
                                <Carousel controls={false}>
                                    {PostData.postData.postImages.map((obj) => (
                                        <Carousel.Item>
                                            <img src={obj.charAt(0) === '@' ? obj.substring(1) : obj} alt="slider" />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            }
                            {/* if mobile then auto play on page load else show play button on  */}
                            {PostData.postData.videoURL !== undefined && PostData.postData.videoURL !== null && PostData.postData.videoURL !== "" && <>
                                {isMobile ? <div className='row'>
                                    <iframe width="640" height="350" src={PostData.postData.videoURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/') + '?autoplay=1&mute=1'} ></iframe>
                                </div> : <div className="video-icon-align" onClick={() => setVedio(true)}>
                                    <img src={'/play-video.svg'} className="video-icon" style={{ width: '60px', height: '60px' }} />
                                </div>}
                            </>}
                        </> : <iframe width="640" height="350" src={PostData.postData.videoURL.replace('https://youtu.be/', 'https://www.youtube.com/embed/') + '?autoplay=1&mute=1'}></iframe>}
                    </div>

                    {PostData.postData.audioURL !== undefined && PostData.postData.audioURL !== null && PostData.postData.audioURL !== "" &&
                        <div className="row mt-4 spotify-resize" style={isMobile ? { marginLeft: '0px' } : {}} >
                            <iframe src={PostData.postData.postOembedUrl} style={{ marginBottom: '-50px' }} width="100%" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        </div>
                    }

                    <div className={PostData.postData.postImages.length > 0 ? `row body-content-align mt-5` : `row body-content-align`}>
                        <span className="fw-bold fs-30 ff-lora"> {PostData.postData.postTitle} </span>
                    </div>
                    <div className="row body-content-align" style={{ marginTop: '-2px' }}>
                        <span className="fw-mid fc-link fs-12"> {PostData.postData.subcategoryname.replaceAll(',', ' | ')} </span>
                    </div>
                    <div className="row body-content-align mt-4" style={{ cursor: 'pointer' }} onClick={() => router.push(`/${PostData.authorData.authorPenName.charAt(0) === '@' ? PostData.authorData.authorPenName.substring(1) : PostData.authorData.authorPenName}`)}>
                        {PostData.authorData.authorProfileImage !== undefined ?
                            <img src={PostData.authorData.authorProfileImage.charAt(0) === '@' ? PostData.authorData.authorProfileImage.substring(1) : PostData.authorData.authorProfileImage} alt="profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                            : <Avatar src={<AssignmentIndOutlinedIcon />} />
                        }
                        <ListItemText style={{ marginTop: '6px', marginLeft: '10px' }}
                            primary={<div className="header-font" style={{ lineHeight: '15px' }} >
                                <span className='fs-15 fw-mid-bold'>
                                    {PostData.authorData.authorPenName.charAt(0) === '@' ? PostData.authorData.authorPenName.substring(1) : PostData.authorData.authorPenName}
                                </span>
                            </div>}
                            secondary={<div className="row" style={{ marginLeft: '0px' }}>
                                <span className="fs-12">{getDateTime}</span>
                            </div>}
                        />
                    </div>
                    <div className="row my-4 body-content-align fs-15" dangerouslySetInnerHTML={{ __html: PostData.postData.postDescription }} />
                    <hr />
                    {PostData.publicationData !== null && <>
                        <div className="row body-content-align font-weight-bold header-font fs-22 mt-4">Published In</div>
                        <div className="row mt-4 body-content-align" >
                            {PostData.publicationData.publicationImage !== undefined && PostData.publicationData.publicationImage !== null &&
                                <img onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)} src={PostData.publicationData.publicationImage.charAt(0) === '@' ? PostData.publicationData.publicationImage.substring(1) : PostData.publicationData.publicationImage}
                                    alt="profile" style={{ width: '40px', height: '40px', cursor: 'pointer', objectFit: 'cover' }} />}
                            <ListItemText style={{ marginTop: '6px', marginLeft: '10px' }}
                                primary={<div style={{ lineHeight: '10px' }} >
                                    <span className="header-font" onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)} style={{ cursor: 'pointer' }}>
                                        <b> {PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}. </b>
                                    </span> &nbsp;
                                    <a className="connect header-font" href="#Subscribe" data-toggle="modal" data-target="#myModal"> Subscribe</a>
                                </div>}
                                secondary={<div className="row" style={{ marginLeft: '0px', lineHeight: '22px', cursor: 'pointer' }}>
                                    <span className="subheader-font" onClick={() => router.push(`${PostData.publicationData.penName.charAt(0) === '@' ? PostData.publicationData.penName.substring(1) : PostData.publicationData.penName}`)}>Author</span>
                                </div>}
                            />
                        </div>
                        <div className="row mt-4 body-content-align right-content-font"> {PostData.publicationData.description} </div>
                    </>}
                </div>
                {/* call to action bottom pannel for mobile view and free thinkly only, using modal popup for desktop view(header) */}
                {isMobile && PostData.postData.postPayType !== 'Paid' && <div className="row">
                    <section className="bottom-section-mob">
                        <div className="top-hr-colored"></div>
                        <div className="col-12 py-2">
                            <ListItemText primary={<span className='fs-15 fw-bold'>Get The Thinkly App</span>}
                                secondary={<span className='fs-12'>Read all Thinklies and more on the App</span>} />
                            <button className='float-right downloadLink-button' style={{ marginTop: '-45px' }}>
                                <a className="fc-white" href={process.env.NEXT_PUBLIC_DYNAMIC_OPEN_IN_APP + `https://thinkly.me/Thinkly/Post/Index/${PostData.postData.postID}`}>OPEN IN APP</a>
                            </button>
                        </div>
                    </section>
                </div>}

            </div> : <div className='grid place-items-center h-screen'>
                <CircularProgress aria-label="Loading..." />
            </div>}
        </div>
        {/* paid thinkly bottomsheet */}
        {PostData !== undefined && PostData !== null && PostData.postData.postPayType === "Paid" ? <div className="shell-container show">
            <form name="paymentGatewayrazorpay" onSubmit={handleSubmit(onSubmit)}>
                {isMobile ? <div className="row">
                    <div className="col-2 pt-4 px-4">
                        <img src={'/paidthinkly.png'} alt="paid thinkly" style={{ width: '60px', height: '60px' }} />
                    </div>
                    <div className="col-10 px-4">
                        <ListItemText primary={<p className="fs-20 fw-bold fc-white"> This is a premium post </p>}
                            secondary={<p className="fs-15 fc-white">
                                This post is published in {PostData.publicationData.publicationName}. Subscribe to {PostData.publicationData.publicationName} for unlimited access.
                            </p>}
                        />
                        <button className="subscribe-button" type='submit'> Subscribe </button>
                    </div>
                </div> : <div className="row d-flex pt-2 pb-4 px-3">
                    <div className="col-1 my-auto">
                        <img src={'/paidthinkly.png'} alt="paid thinkly" style={{ width: '80px', height: '80px' }} />
                    </div>
                    <div className="col-11">
                        <ListItemText primary={<p className="header-font fs-28 fw-bold fc-white"> This is a premium post </p>}
                            secondary={<p className="fs-20 fc-white"> This post is published in {PostData.publicationData.publicationName}. Subscribe to {PostData.publicationData.publicationName} for unlimited access. </p>} />
                        <button className="subscribe-button" type='submit'> Subscribe </button>
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