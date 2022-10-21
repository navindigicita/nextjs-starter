import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import $ from "jquery";
import { CircularProgress } from '@material-ui/core';
import { baseUrlThinkly } from "../../pages/api/api.jsx";
import { DeleteForever, Edit } from '@material-ui/icons';

const Draft = (props) => {
    const BASE_URL_THINKLY = useContext(baseUrlThinkly)
    const [AuthorID, setAuthorID] = useState()
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
        Axios.get(`${BASE_URL_THINKLY}Draft/GetDraftsForUser/${authorID}`, config)
            .then((res) => {
                console.log(res.data);
                if (res.data.responseCode === '00') {
                    setDraftList(res.data.responseData.Drafts)
                } else if (res.data.responseCode === '03') {
                    setDraftList([])
                }
            })
            .catch((err) => {
                console.log("GetDraftsForUser error in catch", err);
            });
    }

    const deleteDraft = (ID) => {
        setDraftId(ID)
        $('#deleteDraft').modal('show')
    }

    const fetchDeleteDraft = () => {
        setDraftDeleteLoader(true)
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.REACT_APP_DEVICE_ID,
                "UserID": AuthorID
            },
            data: {
                DraftID: DraftId,
            }
        };
        Axios(`${BASE_URL_THINKLY}draft/DeleteDraft`, config)
            .then((res) => {
                console.log(res.data);
                if (res.data.responseCode === '00') {
                    $('#deleteDraft').modal('hide')
                    setDraftDeleteLoader(false)
                    fetchDraftsByUserID(AuthorID)  // api call to update list
                }
            })
            .catch((err) => { });
    }

    const editDraft = (id) => {
        setDraftId(id)
        setEditDraft(true)
    }

    return (<div className='row'>
        {DraftList !== undefined && DraftList !== null && DraftList.length > 0 ? <div className="container py-4">
            {DraftList.map((obj, index) => {
                let Images = obj.ImageNames !== undefined && (obj.ImageNames).length > 0 && obj.ImageNames[0].charAt(0) === '@' ? obj.ImageNames[0].substring(1) : obj.ImageNames[0]
                return (<div className="row my-3" key={index}>
                    <div className='col-2'>
                        {obj.ImageNames !== undefined && (obj.ImageNames).length > 0 ? <img src={Images} alt="publication Image" style={{ width: '50px', height: '50px', objectFit: 'cover', objectPosition: 'center', borderRadius: '4px', }} />
                            : <div style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', backgroundColor: 'lightgrey' }}></div>}
                    </div>
                    <div class="col-8"> <p className="fs-22 pt-1">{obj.Title}</p> </div>
                    <div className="col-1 pt-1" onClick={() => deleteDraft(obj.DraftID)}> <DeleteForever /> </div>
                    <div className="col-1 pt-1" onClick={() => editDraft(obj.DraftID)}> <Edit /> </div>
                </div>)
            })}
        </div> : DraftList !== undefined && DraftList !== null && DraftList.length === 0 ? <div className='row'>
            <p className='col-12 p-4 text-center fs-18'>No Record Found</p>
        </div> : <div className='grid place-items-center h-screen'>
            <CircularProgress aria-label="Loading..." />
        </div>}

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

        {/* {EditDraft && <NewThinkly draftID={DraftId} authorID={AuthorID} thinklyConfigJSON={props.thinklyConfigJSON} onChangeCallback={() => setEditDraft(false)} />} */}

    </div>)
}

export default Draft