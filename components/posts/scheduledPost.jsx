import React, { useContext, useState, useEffect } from 'react'
import Axios from "axios";
import $ from 'jquery'
import { CircularProgress } from '@material-ui/core';
import { DeleteForever, LocalGasStationSharp } from '@material-ui/icons'
import { baseUrlThinkly } from '../../pages/api/api';
import InfiniteScroll from 'react-infinite-scroll-component';

const ScheduledPost = (props) => {
    const BASE_URL_THINKLY = useContext(baseUrlThinkly)
    const [AuthorID, setAuthorID] = useState()
    const [ScheduledData, setScheduledData] = useState()
    const [scheduleID, setscheduleID] = useState()
    const [scheduleTime, setscheduleTime] = useState()
    const [startIndex, setstartIndex] = useState(0)
    const [endIndex, setendIndex] = useState(10)
    const [NoRecord, setNoRecord] = useState(false)
    const [isFetching, setIsFetching] = useState(false) // scroll more draft show loader
    const [Loader, setLoader] = useState(false)  //delete permanantly loader show on button
    const [draftLoader, setdraftLoader] = useState(false)  //move to draft loader show on button
    const [disableBtn, setdisableBtn] = useState(true) // disable move to draft button
    const [disableDelBtn, setdisableDelBtn] = useState(true) // disable Delete Permanatly button

    useEffect(() => {
        if (props.authorID !== undefined) {
            setAuthorID(props.authorID) // author Id save in state
            fetchScheduledList(props.authorID)
        }
    }, [fetchScheduledList])

    const fetchScheduledList = (id) => {
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": id
            },
        };
        Axios.get(`${BASE_URL_THINKLY}thinkly/GetSchedulePosts/${id}?startIndex=${startIndex}&endIndex=${endIndex}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    console.log("GetSchedulePosts ",res.data.responseData);
                    const newData = res.data.responseData
                    console.log(newData);
                    if (ScheduledData !== undefined && ScheduledData.length > 0) {
                        setScheduledData(ScheduledData => [...ScheduledData, ...newData])
                    } else {
                        setScheduledData(newData)
                    }
                    setstartIndex(endIndex)
                    setendIndex(endIndex + 10)
                    setIsFetching(true)
                } else if (res.data.responseCode === '03') {
                    setNoRecord(true)
                    setIsFetching(false)
                }
            })
            .catch((err) => {
                console.log("GetDraftsForUser error in catch", err);
            });
    }

    const deleteSchedule = (id, time) => {
        setscheduleID(id)
        setscheduleTime(time)
        $('#deleteSchedule').modal('show')
    }

    const deleteScheculedPost = () => {
        setdisableBtn(false)
        setLoader(true)
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
            data: {
                ScheduleID: scheduleID,
                ScheduleTime: scheduleTime
            }
        };
        Axios(`${BASE_URL_THINKLY}thinkly/DeleteSchedulePost`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    fetchScheduledList(AuthorID)
                    $('#deleteSchedule').modal('hide')
                    setLoader(false)
                    setdraftLoader(false)
                    setdisableBtn(true)
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log("DeleteSchedulePost error in catch", err);
            });
    }

    const moveToDraft = () => {
        setdisableDelBtn(false)
        setdraftLoader(true)
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
        };
        Axios.get(`${BASE_URL_THINKLY}thinkly/GetSchedulePostDetails/${scheduleID}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    console.log("thinkly/GetSchedulePostDetails",res.data.responseData);
                    const response = res.data.responseData.ThinklyDetails
                    fetchPublicationDetailByID(response)
                    setdisableDelBtn(true)
                }
            })
            .catch((err) => {
                console.log("GetSchedulePostDetails error in catch", err);
            });
    }

    const fetchPublicationDetailByID = (response) => {
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
        };
        Axios.get(`${BASE_URL_THINKLY}Publication/GetPublicationDetailsByID/${response.PublicationID}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    console.log("Publication/GetPublicationDetailsByID",res.data);
                    const pubDetail = res.data.responseData
                    insertUpdateDraft(response, pubDetail)
                }
            })
            .catch((err) => {
                console.log("GetSchedulePostDetails error in catch", err);
            });
    }

    const insertUpdateDraft = (response, pubDetail) => {
        const pImage = pubDetail.publicationImage.substring(pubDetail.publicationImage.lastIndexOf('/') + 1)
        var config = {
            method: 'POST',
            headers: {
                DeviceID: process.env.NEXT_PUBLIC_DEVICE_ID,
                UserID: AuthorID,
                contentType: 'application/json'
            },
            data: {
                DraftID: 0,
                ThinklyID: 0,
                ThinklyType: response.ThinklyContentType,
                ThinklyPayType: response.ThinklyType,
                Title: response.Title,
                Description: response.Description,
                ImageNames: response.ImageNames,
                ImageLabels: response.ImageLabels,
                AudioUrl: response.AudioUrl,
                VideoUrl: response.VideoUrl,
                OembedUrl: response.OembedUrl,
                UserType: response.UserType,
                AuthorID: response.AuthorID,
                CategoryIDs: response.CategoryIDs,
                IsPublic: response.IsPublic,
                PublicationID: response.PublicationID,
                PublicationPlanID: pubDetail.publicationPlan[0].planID,
                PublicationName: pubDetail.publicationName,
                publicationImage: pImage,
                PublicationPayType: pubDetail.publicationPayType,
                ResponseId: 0,
                ResponseURL: ''
            }
        };
        Axios(`${BASE_URL_THINKLY}Draft/InsertUpdateDraft`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    $('#deleteSchedule').modal('hide')
                    deleteScheculedPost()
                }
            })
            .catch((err) => {
                console.log("draft thinkly error in catch", err);
            });
    }

    return (<>
        <div className="container py-4">
            {ScheduledData !== undefined && ScheduledData.length > 0 ? <InfiniteScroll dataLength={ScheduledData.length}
                next={fetchScheduledList(AuthorID)}
                hasMore={isFetching}
                loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
                endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>}
            >
                {ScheduledData.map((obj, index) => {
                    return (<div className='row my-3' key={index}>
                        <div className='col-11 fs-20'>{obj.schedulepostTitle}</div>
                        <div className='col-1 pt-1' onClick={() => deleteSchedule(obj.scheduleID, obj.scheduleTime)}> <DeleteForever /> </div>
                    </div>)
                })}
            </InfiniteScroll> : NoRecord ? <div className='row'>
                <p className='col-12 p-4 text-center fs-18'>No Record Found</p>
            </div> : <div className='grid place-items-center h-screen'>
                <CircularProgress aria-label="Loading..." />
            </div>}
        </div>

        <div id="deleteSchedule" className="modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal">&times;</button>
                    <div className="modal-body">
                        <p className='text-center fs-22 fw-bold'>Are you sure you want to delete this Scheduled Post</p>
                        <p className='text-center fs-15 mb-5'>If you choose to Delete, you will lose all changes</p>
                        <div className="text-center d-flex justify-content-center">
                            {/* <button className='primary-border-button mr-4' onClick={() => deleteScheculedPost()}>{Loader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#faa422' }} /> : 'Delete Permanatly'}</button> */}
                            {/* <button className='primary-bg-button' onClick={() => moveToDraft()}>{draftLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Move to Draft'}</button> */}

                            {!disableDelBtn ? <button style={{ cursor: 'not-allowed' }} className='fw-mid fc-white border-radius-4 border-none bg-gray fs-20 text-center w-40 height-button mr-4 '>Delete Permanatly</button> :
                                <button className='primary-border-button mr-4' onClick={() => deleteScheculedPost()}>{Loader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#faa422' }} /> : 'Delete Permanatly'}</button>}
                            {!disableBtn ? <button style={{ cursor: 'not-allowed' }} className='fw-mid fc-white border-radius-4 border-none bg-gray fs-20 text-center w-40 height-button '>Move to Draft</button> :
                                <button className='primary-bg-button' onClick={() => moveToDraft()}>{draftLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Move to Draft'}</button>}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ScheduledPost