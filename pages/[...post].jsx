import React, { useContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { NextSeo } from 'next-seo';
import Axios from "axios";
import Image from 'next/image';
import { useRouter } from 'next/router'
import { ListItemText, CircularProgress, Avatar } from "@material-ui/core";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import { Carousel } from 'react-bootstrap';
import { baseUrl } from "./api/api";

const PostDetail = (props) => {
    const router = useRouter()
    const BASE_URL = useContext(baseUrl)
    const [PostData, setPostData] = useState()
    const [getVedio, setVedio] = useState(false);
    const [getDateTime, setDateTime] = useState(0)

    useEffect(() => {
        if (props.response !== undefined && props.response.postData !== null) {
            const data = props.response
            console.log("response of post@@@@@", data);
            setPostData(data)
            if (data.publicationData !== null && data.publicationData.publicationPayType === "Paid") {  //for disable scroll and background blurred on paid thinkly
                document.getElementById('fadeIT').classList.add("blur-body");
                document.body.classList.add("stop-scrolling");
            }
            // update this shit
            var date1 = new Date(data.postData.postDateTime); //post date & time
            var date2 = new Date; //current date & time
            var Difference_In_Time = date2.getTime() - date1.getTime();  //substraction of current date to post date
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of days in long flloat
            const post_Date_Time = parseFloat(Difference_In_Days).toFixed(2);  //fixed decimal to 2
            if (Math.floor(post_Date_Time) < 1) {
                const diff = Difference_In_Time / 1000;
                const difference = diff / (60 * 60);
                const hours = Math.abs(Math.round(difference))
                setDateTime(hours + ' hours ago')
            } else {
                const days = Math.floor(post_Date_Time);
                setDateTime(days + ' days ago')
            }
            // till here
        } else {
            router.push('/login')
        }
    }, [])


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
        {PostData !== undefined && PostData !== null ? <div id="fadeIT" className="container">
            <div className="row d-flex">
                <div className="col-md-7 mx-auto">
                    <div className="row body-img">
                        {getVedio === false ? <>
                            {PostData.postData.postImages !== undefined && PostData.postData.postImages.length === 0 ? ''
                                : PostData.postData.postImages !== undefined && PostData.postData.postImages.length === 1 ?
                                    <img src={PostData.postData.postImages[0].charAt(0) === '@' ? PostData.postData.postImages[0].substring(1) : PostData.postData.postImages[0]} alt="detailed poster" />
                                    : PostData.postData.postImages !== undefined && PostData.postData.postImages.length > 1 &&
                                    <Carousel controls={false} interval={2000}>
                                        {PostData.postData.postImages.map((obj) => (
                                            <Carousel.Item>
                                                <img src={obj.charAt(0) === '@' ? obj.substring(1) : obj} alt="slider" />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                            }
                            {PostData.postData.videoURL !== undefined && PostData.postData.videoURL !== null && PostData.postData.videoURL !== "" &&
                                <div className="video-icon-align" onClick={() => setVedio(true)}>
                                    <img src={Play} className="video-icon" style={{ width: '60px', height: '60px' }} />
                                </div>
                            }
                        </> : <iframe width="640" height="350" src={PostData.postData.videoURL.replace('https://youtu.be/', 'http://www.youtube.com/embed/') + '?autoplay=1&mute=1'}></iframe>}
                    </div>
                </div>
            </div>
        </div> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}
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