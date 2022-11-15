import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { ListItemText, CircularProgress } from "@material-ui/core"
import { Card } from 'react-bootstrap'
import { baseUrl } from '../../pages/api/api';
import PostTimeAgo from '../common/postTime';


const Libraries = (props) => {
    const BASE_URL = useContext(baseUrl);
    const [AuthorID, setAuthorID] = useState()

    const [SubscriptionCount, setSubscriptionCount] = useState(0)  //store subscribed publication count
    const [SubscribedList, setSubscribedList] = useState([])  //store subscribed publication list
    const [NoRecord, setNoRecord] = useState(false)  //if no record found then show create publication pannel
    const [IsSubscribedFetching, setIsSubscribedFetching] = useState(false) //scroll more subscribed publication show loader
    const [SubscriptionStartIndex, setSubscriptionStartIndex] = useState(0)  //start index of subscribe publication api
    const [SubscriptionEndIndex, setSubscriptionEndIndex] = useState(10)  //end index of subscribe publication api

    const [BookMarkList, setBookMarkList] = useState([])  //store bookmarks list
    const [NoBookMarkRecord, setNoBookMarkRecord] = useState(false)  //if no record found then show msg
    const [IsBookmarkFetching, setIsBookmarkFetching] = useState(false)  //scroll more bookmark, show loader
    const [BookmarkStartIndex, setBookmarkStartIndex] = useState(0)  //start index of bookmark api
    const [BookMarkEndIndex, setBookMarkEndIndex] = useState(10)  //end index of bookmark api

    useEffect(() => {
        document.getElementById("defaultOpen").click();
        if (props.authorID !== undefined) {
            setAuthorID(props.authorID)
            fetchSubscribedPublication(props.authorID)
            fetchBookmarks(props.authorID)
        }
    }, [])

    const openTab = (event, tabName) => {
        var i, tabContent, tablinks;
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
    }

    function fetchSubscribedPublication(authorID) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
            data: {
                FilterType: "SUBSCRIPTION",
                StartIndex: SubscriptionStartIndex,
                EndIndex: SubscriptionEndIndex
            }
        };
        Axios(`${BASE_URL}User/V2/GetMyPublications`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData.publications
                    setSubscribedList(publicationData => [...publicationData, ...newData])
                    setSubscriptionCount(res.data.responseData.otherDetails.totalSubscriptionCount)
                    setSubscriptionStartIndex(SubscriptionEndIndex)
                    setSubscriptionEndIndex(SubscriptionEndIndex + 10)
                    setIsSubscribedFetching(true)
                } else if (res.data.responseCode === '03') {
                    setNoRecord(true)
                    setIsSubscribedFetching(false)
                }
            })
            .catch((err) => { console.log(err); });
    }

    function fetchBookmarks(authorID) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
            data: {
                UserID: authorID,
                StartIndex: BookmarkStartIndex,
                EndIndex: BookMarkEndIndex
            }
        };
        Axios(`${BASE_URL}Thinkly/GetUserBookmarks`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData
                    setBookMarkList(Data => [...Data, ...newData])
                    setBookmarkStartIndex(BookMarkEndIndex)
                    setBookMarkEndIndex(BookMarkEndIndex + 10)
                    setIsBookmarkFetching(true)
                } else if (res.data.responseCode === '03') {
                    setNoBookMarkRecord(true)
                    setIsBookmarkFetching(false)
                }
            })
            .catch((err) => { console.log(err); });
    }

    return (<div className='row'>
        <div className='col-12'>
            <p className='fs-28 fw-mid'>My Library</p> <hr />
            <div className="tab mt-4">
                <button className='col-6 tablinks fw-bold fc-gray active' onClick={(event) => openTab(event, 'Subscribed')} id="defaultOpen" >Subscriptions ({SubscriptionCount})</button>
                <button className='col-6 tablinks fw-bold fc-gray' onClick={(event) => openTab(event, 'bookmarks')} >Bookmarks ({BookMarkList.length})</button>
            </div>
            <div id="Subscribed" className="tabContent">
                {SubscribedList.length > 0 ? <InfiniteScroll dataLength={SubscribedList.length}
                    next={fetchSubscribedPublication(AuthorID)}
                    hasMore={IsSubscribedFetching}
                    loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
                    endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>}
                >
                    {SubscribedList.map((obj, index) => {
                        const imgUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                        return (<Card className='mt-4' key={index}>
                            <div className='row cursor'>
                                <div className='col-2'>
                                    {obj.publicationImage !== undefined && <img src={imgUrl} alt="publication Image" style={{ objectFit: 'contain', height: '36px', width: '36px' }} />}
                                </div>
                                <div className='col-8'>
                                    <ListItemText className='my-auto' primary={<span className='ff-lora fs-18'>{obj.publicationName}</span>}
                                        secondary={<text className='fs-15'>{obj.about}</text>} />
                                </div>
                            </div>
                        </Card>)
                    })}
                </InfiniteScroll> : NoRecord === true ? <div className='grid place-items-center'>
                    <p className='fs-22 fw-mid-bold mt-5'>No Subscribed Publication Found</p>
                </div> : <div className='grid place-items-center h-screen'>
                    <CircularProgress aria-label="Loading..." />
                </div>}
            </div>
            <div id="bookmarks" className="tabContent">
                {BookMarkList.length > 0 ? <InfiniteScroll dataLength={BookMarkList.length}
                    next={fetchBookmarks(AuthorID)}
                    hasMore={IsBookmarkFetching}
                    loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
                    endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>}
                >
                    {BookMarkList.map((obj, index) => {
                        if (obj.postData.postImages.length > 0) {
                            var image_url = obj.postData.postImages[0].charAt(0) === '@' ? obj.postData.postImages[0].substring(1) : obj.postData.postImages[0]  //show once image only
                        }
                        var final_time = PostTimeAgo(obj.postData.postUpdatedDateTime)
                        return (<Card className='p-2'>
                            <div className="row my-3" key={index}>
                                <div class="col-md-10">
                                    <ListItemText primary={<span className="ff-lora fs-18 fw-bold">{obj.postData.postTitle}</span>}
                                        secondary={<div>
                                            <span className="fs-12 fc-link">{obj.postData.subcategoryname.replaceAll(',', ' | ')}</span> <br />
                                            <p className="fs-10">{final_time}</p>
                                        </div>} />
                                </div>
                                <div className="col-md-2">
                                    {obj.postData.postImages !== undefined && obj.postData.postImages.length > 0 &&
                                        <img alt="thinkly Image" src={image_url}
                                            style={{ objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', float: 'right', height: '60px', width: '60px' }} />
                                    }
                                </div>
                                <div className="col-md-12">
                                    <p className="fs-15 cursor-pointer mt-3" id="thinkly-content" dangerouslySetInnerHTML={{ __html: obj.postData.postDescription.slice(0, 370) + (obj.postData.postDescription.length > 370 ? '<b> ...read more</b>' : "") }} />
                                </div>
                            </div>
                            <hr />
                        </Card>)
                    })}
                </InfiniteScroll> : NoBookMarkRecord === true ? <div className='grid place-items-center'>
                    <p className='fs-22 fw-mid-bold mt-5'>No Bookmarks Found</p>
                </div> : <div className='grid place-items-center h-screen'>
                    <CircularProgress aria-label="Loading..." />
                </div>}
            </div>
        </div>
    </div>)
}

export default Libraries