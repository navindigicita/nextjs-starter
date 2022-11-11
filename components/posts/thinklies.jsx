import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import $ from "jquery";
import Image from 'next/image';
import { Card, CircularProgress, ListItemText } from '@material-ui/core';
import { baseUrl } from "../../pages/api/api.jsx";
import NewThinkly from "./newThinkly.jsx";
import NoData from "../common/noData.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import PostTimeAgo from "../common/postTime.js";

const Thinklies = (props) => {
    const BASE_URL = useContext(baseUrl)

    const [AuthorID, setAuthorID] = useState()
    const [ThinklyList, setThinklyList] = useState([])
    const [isFetching, setIsFetching] = useState(false) //fetch more data on scroll
    const [startIndexValue, setstartIndexValue] = useState(0)
    const [endIndexValue, setendIndexValue] = useState(10)
    const [NoRecord, setNoRecord] = useState(false)
    const [thinklyID, setthinklyID] = useState()
    const [EditPost, setEditPost] = useState(false)
    const [RemoteConfigJson, setRemoteConfigJson] = useState()

    useEffect(() => {
        if (props.authorID !== undefined && props.thinklyConfigJSON !== undefined) {
            setAuthorID(props.authorID)
            setRemoteConfigJson(props.thinklyConfigJSON)
            fetchThinklies(props.authorID)
        }
    }, [])

    function fetchThinklies(authorID) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
            data: {
                "UserID": authorID,
                "ThinklyID": 0,
                "StartIndex": startIndexValue,
                "EndIndex": endIndexValue
            }
        };
        Axios(`${BASE_URL}Thinkly/GetUserThinklies`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData
                    setThinklyList(data => [...data, ...newData])
                    setstartIndexValue(endIndexValue)
                    setendIndexValue(endIndexValue + 10)
                    setIsFetching(false)
                } else if (res.data.responseCode === '03') {
                    setNoRecord(true)
                    setIsFetching(false)
                }
            })
            .catch((err) => {
                console.log("GetUserThinklies error in catch", err);
            });
    }

    const openThinkly = (data, ID, oldUrl) => {
        const title = data.trimEnd()
        const thinkly_title = title.replaceAll(' ', '-')
        window.open(`/${thinkly_title}/${ID}`, '_blank') // above commented codes are for new UI of thinkly detail page
        // window.open(oldUrl)  //this one for old UI
    }

    const handlePostEdit = (thinklyPostId) => {
        $(".dropdown-post").css('display', 'none') //once click on edit dropdown should hide
        $(`.${thinklyPostId}`).removeClass("dropdown-post") //after on edit click class should get remove for that index
        setthinklyID(thinklyPostId)
        setEditPost(true)
    }

    const handlePostAction = (index) => {
        setEditPost(false)
        $(`.${index}`).addClass("dropdown-post") //add class to particular index only
        if ($(".dropdown-post").css('display') === 'none') {
            $(".dropdown-post").css('display', 'block');  //edit show
        } else {
            $(".dropdown-post").css('display', 'none');
            $(`.${index}`).removeClass("dropdown-post")
        }
        $(`.${index}`).removeClass("dropdown-post")
    }

    return (<>
        {ThinklyList.length > 0 ? <InfiniteScroll dataLength={ThinklyList.length} next={fetchThinklies(AuthorID)} hasMore={isFetching}
            loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
            endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>} >
            <div className="container py-2">
                {ThinklyList.map((obj, index) => {
                    if (obj.postData.postImages.length > 0) {
                        var image_url = obj.postData.postImages[0].charAt(0) === '@' ? obj.postData.postImages[0].substring(1) : obj.postData.postImages[0]  //show once image only
                    }
                    var final_time = PostTimeAgo(obj.postData.postUpdatedDateTime)
                    return (<Card className='my-4 px-3 pb-4 pt-2'>
                        <div className="row" key={index}>
                            <div class="col-md-10">
                                <ListItemText onClick={() => openThinkly(obj.postData.postTitle, obj.postData.postID, obj.postData.postURL)}
                                    primary={<span className="ff-lora fs-18 fw-bold">{obj.postData.postTitle}</span>}
                                    secondary={<div>
                                        <span className="fs-12 fc-link">{obj.postData.subcategoryname.replaceAll(',', ' | ')}</span> <br />
                                        <p className="fs-10">{final_time}</p>
                                    </div>} />
                            </div>
                            <div className="col-md-2" id="editdiv" >
                                <span className="pointer fs-30" style={{ marginLeft: '69px' }} onClick={() => handlePostAction(index)}>...</span>
                                <div className={`${index}`} style={{ display: 'none' }}>
                                    <a className="cursor-pointer font-bold" onClick={() => handlePostEdit(obj.postData.postID)}>Edit</a>
                                    {/* <a onClick={() => handlePostDelete()}>Delete</a> */}
                                </div>
                                {obj.postData.postImages !== undefined && obj.postData.postImages.length > 0 && <img alt="thinkly Image" src={image_url} style={{ width: '80px', height: '80px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', float: 'right' }} />}
                            </div>
                            <div className="col-md-12" onClick={() => openThinkly(obj.postData.postTitle, obj.postData.postID, obj.postData.postURL)}>
                                <p className="fs-15 pointer" id="thinkly-content" dangerouslySetInnerHTML={{ __html: obj.postData.postDescription.slice(0, 370) + (obj.postData.postDescription.length > 370 ? '<b> ...read more</b>' : "") }} />
                            </div>
                        </div>
                    </Card>)
                })}
            </div>
        </InfiniteScroll> : NoRecord === true ? <NoData /> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}

        {EditPost && <NewThinkly authorID={AuthorID} thinklyRemoteConfigData={RemoteConfigJson} thinklyID={thinklyID} onChangeCallback={() => setEditPost(false)} /> }
    </>);
}

export default Thinklies;