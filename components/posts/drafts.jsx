import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import $ from "jquery";
import { CircularProgress } from '@material-ui/core';
import { baseUrlThinkly } from "../../pages/api/api.jsx";
import { DeleteForever, Edit } from '@material-ui/icons';
import NewThinkly from "./newThinkly.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const Draft = (props) => {
    const BASE_URL_THINKLY = useContext(baseUrlThinkly)
    const [AuthorID, setAuthorID] = useState()
    const [StartIndex, setStartIndex] = useState(0)
    const [EndIndex, setEndIndex] = useState(10)
    const [isFetching, setIsFetching] = useState(false) // scroll more draft show loader
    const [DraftList, setDraftList] = useState()
    const [DraftId, setDraftId] = useState()
    const [EditDraft, setEditDraft] = useState(false)
    const [DraftDeleteLoader, setDraftDeleteLoader] = useState(false)

    useEffect(() => {
        if (props.authorID !== undefined && props.thinklyConfigJSON !== undefined) {
            setAuthorID(props.authorID)
            fetchDraftsByUserID(props.authorID)
        }
    }, [])

    const fetchDraftsByUserID = (authorID) => {
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
        };
        Axios.get(`${BASE_URL_THINKLY}Draft/GetDraftsForUser/${authorID}?StartIndex=${StartIndex}&EndIndex=${EndIndex}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData.Drafts
                    if (DraftList !== undefined && DraftList.length > 0) {
                        setDraftList(DraftList => [...DraftList, ...newData])
                    } else {
                        setDraftList(newData)
                    }
                    setStartIndex(EndIndex)
                    setEndIndex(EndIndex + 10)
                    setIsFetching(true)
                } else if (res.data.responseCode === '03') {
                    setIsFetching(false)
                }
            })
            .catch((err) => { });
    }

    const deleteDraftButton = (ID) => {
        setDraftId(ID)
        $('#deleteDraft').modal('show')
    }

    const fetchDeleteDraft = () => {
        setDraftDeleteLoader(true)
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
            data: {
                DraftID: DraftId,
            }
        };
        Axios(`${BASE_URL_THINKLY}draft/DeleteDraft`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    $('#deleteDraft').modal('hide')
                    setDraftDeleteLoader(false)
                    fetchDraftsByUserID(AuthorID)  // api call to update list
                }
            })
            .catch((err) => { });
    }

    const handleEditButton = (id) => {
        console.log("inside", id);
        setDraftId(id)
        setEditDraft(true)
    }

    return (<>
        <div className="container py-4">
            {DraftList !== undefined && DraftList !== null && DraftList.length > 0 ?
                <InfiniteScroll dataLength={DraftList.length}
                    next={fetchDraftsByUserID(AuthorID)}
                    hasMore={isFetching}
                    loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
                    endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>}
                >
                    {DraftList.map((obj, index) => {
                        let Images = obj.ImageNames !== undefined && (obj.ImageNames).length > 0 && obj.ImageNames[0].charAt(0) === '@' ? obj.ImageNames[0].substring(1) : obj.ImageNames[0]
                        return (<div className="row d-flex py-3" key={index}>
                            <div className='col-1'>
                                {obj.ImageNames !== undefined && (obj.ImageNames).length > 0 ? <img src={Images} alt="publication Image" style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', }} />
                                    : <div style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', backgroundColor: 'lightgrey' }}></div>}
                            </div>
                            <div class="col-9">
                                <p className='fs-22 my-auto ml-4 pt-1'>{obj.Title} </p>
                            </div>
                            <div className="col-1 pt-1" onClick={() => deleteDraftButton(obj.DraftID)}> <DeleteForever /> </div>
                            <div className="col-1 pt-1" onClick={() => handleEditButton(obj.DraftID)}> <Edit /> </div>
                        </div>)
                    })}
                </InfiniteScroll> : DraftList !== undefined && DraftList !== null && DraftList.length === 0 && <div className='row'>
                    <p className='col-12 p-4 text-center fs-18'>No Record Found</p>
                </div>}


            {EditDraft && <NewThinkly draftID={DraftId} authorID={AuthorID} thinklyConfigJSON={props.thinklyConfigJSON} onChangeCallback={() => setEditDraft(false)} />}

            {/* Delete Draft Modal */}
            <div id="deleteDraft" className="modal fade" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <button type="button" className="close text-right pr-2" data-dismiss="modal">&times;</button>
                        <div className="modal-body">
                            <p className='text-center fs-22 fw-bold'>Are you sure you want to delete this post from Draft?</p>
                            <p className='text-center mb-5'>If you choose to Delete, you will lose all content</p>
                            <div className="text-center d-flex justify-content-center">
                                <button className='primary-border-button mr-4' data-dismiss="modal">Cancel</button>
                                <button className='primary-bg-button' onClick={() => fetchDeleteDraft()}>
                                    {DraftDeleteLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Draft