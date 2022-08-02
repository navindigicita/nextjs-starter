import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import $ from "jquery";
import Image from 'next/image';
import { CircularProgress, ListItemText } from '@material-ui/core';
import { baseUrl } from "../../pages/api/api.jsx";
import NewThinkly from "./newThinkly.jsx";
import NoData from "../common/noData.jsx";

const Thinklies = (props) => {
    const BASE_URL = useContext(baseUrl)
    const [thinkliesList, setthinkliesList] = useState([])
    const [Author_ID, setAuthor_ID] = useState()
    const [configJson, setconfigJson] = useState()
    const [isFetching, setIsFetching] = useState(false) //fetch more data on scroll
    const [startIndexValue, setstartIndexValue] = useState(0)
    const [endIndexValue, setendIndexValue] = useState(10)
    const [NoRecord, setNoRecord] = useState(false)
    const [EditPost, setEditPost] = useState(false)
    const [thinklyID, setthinklyID] = useState(0)

    useEffect(() => {
        if (props.authorID !== undefined) {
            console.log("props author ID inside feed page@@@", props.authorID, props.thinklyConfigJSON);
            setAuthor_ID(props.authorID)
            setconfigJson(props.thinklyConfigJSON)
            fetchThinklies(props.authorID);
        }
    }, []);

    function scrollThinklies() {
        setstartIndexValue(endIndexValue)
        setendIndexValue(endIndexValue + 10)
    }

    useEffect(() => {
        console.log("startIndexValue", startIndexValue, "endIndexValue", endIndexValue);
        if (Author_ID !== undefined) {
            fetchThinklies(Author_ID)
        }
    }, [startIndexValue, endIndexValue])

    function fetchThinklies(author_id) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": "123456",
                "UserID": author_id
            },
            data: {
                "UserID": author_id,
                "ThinklyID": "",
                "StartIndex": startIndexValue,
                "EndIndex": endIndexValue
            }
        };
        Axios(`${BASE_URL}Thinkly/GetUserThinklies`, config)
            .then((res) => {
                console.log("user thinkly list", res.data);
                if (res.data.responseCode === '00') {
                    fetchAppendedData(res.data.responseData)
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

    const fetchAppendedData = (newData) => {
        setthinkliesList(thinkliesList => [...thinkliesList, ...newData])
        if (newData !== null) {
            setIsFetching(true)
            scrollThinklies()
        }
    }

    const openThinkly = (data, ID, oldUrl) => {
        // console.log("thinkly title", data, ID);
        // const title = data.trimEnd()
        // const thinkly_title = title.replaceAll(' ', '-')
        // window.open(`/thinkly/${thinkly_title}/${ID}`, '_blank') // above commented codes are for new UI of thinkly detail page
        window.open(oldUrl)
    }

    const handlePostAction = (index) => {
        setEditPost(false)
        console.log("inside post action", index);
        $(`.${index}`).addClass("dropdown-post") //add class to particular index only
        if ($(".dropdown-post").css('display') === 'none') {
            $(".dropdown-post").css('display', 'block');
        } else {
            console.log("inside else to remove call");
            $(".dropdown-post").css('display', 'none');
            $(`.${index}`).removeClass("dropdown-post") //remove class to prevent multiple class application
        }
    }

    const handlePostEdit = (thinklyPostId) => {
        console.log("post id", thinklyPostId);
        $(".dropdown-post").css('display', 'none') //once click on edit dropdown should hide
        $(`.${thinklyPostId}`).removeClass("dropdown-post") //after on edit click class should get remove for that index
        setthinklyID(thinklyPostId)
        setEditPost(true)
    }

    const handlePostDelete = () => {
        $(".dropdown-post").css('display', 'none')
    }

    return (<>
        {thinkliesList !== undefined && thinkliesList !== null && thinkliesList.length > 0 ? <div className="container">
            <h3>My Posts</h3> <hr />
            {thinkliesList.map((obj, index) => {
                {/* console.log("mapped obj", obj) */ }
                var image_url = obj.postData.postImages[0]  //show once image only
                var final_time = ""
                var date1 = new Date(obj.postData.postUpdatedDateTime); //post date & time
                var date2 = new Date; //current date & time
                var Difference_In_Time = date2.getTime() - date1.getTime();  //substraction of current date to post date
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of days in long float
                const post_Date_Time = parseFloat(Difference_In_Days).toFixed(2);  //fixed decimal to 2
                if (Math.floor(post_Date_Time) < 1) {
                    const difference = Difference_In_Time / (1000 * 60 * 60);
                    const hours = Math.abs(Math.round(difference))
                    if (hours > 1) {
                        final_time = hours + " hours ago"
                    } else {
                        final_time = hours + " hour ago"
                    }
                } else {
                    const days = Math.floor(post_Date_Time);
                    final_time = days + " days ago"
                }
                return (<>
                    <div className="row" key={index}>
                        <div className="col-md-10">
                            <ListItemText
                                primary={<span className="ff-lora fs-18 fw-bold">{obj.postData.postTitle}</span>}
                                secondary={<div>
                                    <span className="fs-12 fc-link">{obj.postData.subcategoryname.replaceAll(',', ' | ')}</span> <br />
                                    <p className="fs-10">{final_time}</p>
                                </div>} />
                        </div>
                        <div className="col-md-2">
                            <span style={{ fontSize: '30px', marginLeft: '69px' }} onClick={() => handlePostAction(index)}>...</span>
                            <div className={`${index}`} style={{ display: 'none' }} >
                                <a onClick={() => handlePostEdit(obj.postData.postID)}>Edit</a>
                                {/* <a onClick={() => handlePostDelete()}>Delete</a> */}
                            </div>

                            {obj.postData.postImages !== undefined && obj.postData.postImages.length > 0 &&
                                <Image alt="thinkly Image" src={image_url.charAt(0) === '@' ? image_url.substring(1) : image_url}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', float: 'right' }} />
                            }
                        </div>
                        <div className="col-md-12">
                            <p className="fs-15 pointer" id="thinkly-content" onClick={() => openThinkly(obj.postData.postTitle, obj.postData.postID, obj.postData.postURL)} dangerouslySetInnerHTML={{ __html: obj.postData.postDescription.slice(0, 370) + (obj.postData.postDescription.length > 370 ? '<b> ...read more</b>' : "") }} />
                        </div>
                    </div>
                    <hr />
                </>)
            })}
        </div> : NoRecord === true ? <NoData /> : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
            <CircularProgress aria-label="Loading..." />
        </div>}
        {isFetching && <div style={{ padding: '150px 0px', textAlign: 'center' }}>
            <CircularProgress aria-label="Loading..." />
        </div>}
        {EditPost ? <NewThinkly authorID={Author_ID} thinklyRemoteConfigData={configJson} thinklyID={thinklyID} /> : ''}
    </>);
}

export default Thinklies;