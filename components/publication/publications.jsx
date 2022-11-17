import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import Image from 'next/image';
import { ListItemText, CircularProgress, Box } from "@material-ui/core"
import { Edit } from "@material-ui/icons"
import { Card } from 'react-bootstrap'
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from '../../pages/api/api.jsx';
import NoData from '../common/noData.jsx';
import NewPublication from './newPublication.jsx';

const Publication = (props) => {
    const BASE_URL = useContext(baseUrl);
    const [Author_ID, setAuthor_ID] = useState()
    const [publicationID, setPublicationID] = useState()
    const [showEdit, setshowEdit] = useState(false)
    const [PublicationByAuthorData, setPublicationByAuthorData] = useState([])  //store publication list inside array
    const [NoRecord, setNoRecord] = useState(false)  //if no record found then show create publication pannel
    const [isFetching, setIsFetching] = useState(false) // scroll more publication show loader
    const [startIndexValue, setstartIndexValue] = useState(0)
    const [endIndexValue, setendIndexValue] = useState(10)

    useEffect(() => {
        if (props.authorID !== undefined && props.authorID !== null) {
            setAuthor_ID(props.authorID)
            getPublicationByAuthor(props.authorID)
        }
    }, [])

    function getPublicationByAuthor(authorID) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
            data: {
                FilterType: "AUTHOR",
                StartIndex: startIndexValue,
                EndIndex: endIndexValue
            }
        };
        Axios(`${BASE_URL}User/V2/GetMyPublications`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData.publications
                    setPublicationByAuthorData(publicationData => [...publicationData, ...newData])
                    setstartIndexValue(endIndexValue)
                    setendIndexValue(endIndexValue + 10)
                    setIsFetching(true)

                } else if (res.data.responseCode === '03') {
                    setNoRecord(true)
                    setIsFetching(false)
                }
            })
            .catch((err) => { console.log(err); });
    }

    const handlePubicationClick = (pen_name) => {
        window.open(`/${pen_name}`, '_blank')
    }

    const editButton = (publicationID) => {
        console.log("inside editButton", publicationID);
        setPublicationID(publicationID)
        setshowEdit(true)
    }

    return (<>
        <div className='container'>
            <p className='fs-28 fw-mid'>My Publications</p> <hr />
            {PublicationByAuthorData !== undefined && PublicationByAuthorData.length > 0 ?
                <InfiniteScroll dataLength={PublicationByAuthorData.length}
                    next={getPublicationByAuthor(Author_ID)}
                    hasMore={isFetching}
                    loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>}
                    endMessage={<p className='fs-20 fw-bold text-center mt-4'> Yay! You have seen it all </p>}
                >
                    {PublicationByAuthorData.map((obj, index) => {
                        const name = obj.penName.charAt(0) === '@' ? obj.penName.substring(1) : obj.penName
                        const imageUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                        const authorData = obj.publicationAuthor.find(({ authorID }) => authorID == Author_ID)
                        return (<Card className='mt-4' key={index}>
                            <div className='row cursor'>
                                <div className='col-1'>
                                    {obj.publicationImage !== undefined && <img src={imageUrl} alt="publication Image" style={{ height: '60px', width: '60px', objectFit: 'cover', objectPosition: 'center' }} />}
                                </div>
                                <div className='col-8 ml-4' onClick={() => handlePubicationClick(name)}>
                                    <ListItemText className='my-auto' primary={<div>
                                        <span className='ff-lora fs-18 mr-2'>{obj.publicationName}</span>
                                        <Box component="span" className='py-1 fc-primary border-radius-4 fw-mid-bold fs-10 px-2 bg-lightgray'>{authorData !== undefined && authorData.authorType}</Box>
                                    </div>}
                                        secondary={<text className='fs-15'>{obj.description}</text>} />
                                </div>
                                {authorData !== undefined && authorData.authorType === 'AUTHOR' && <div className="col-2 mt-1" onClick={() => editButton(obj.publicationID)}> <Edit /> </div>}
                            </div>
                        </Card>)
                    })}
                </InfiniteScroll> : NoRecord === true ? <NoData authorID={Author_ID} /> : <div className='grid place-items-center h-screen'>
                    <CircularProgress aria-label="Loading..." />
                </div>}
            {showEdit ? <NewPublication authorID={Author_ID} publicationID={publicationID} thinklyRemoteConfigData={props.thinklyConfigJSON} onChangeCallback={() => setshowEdit(false)} /> : ""}
        </div>

    </>)
}

export default Publication

