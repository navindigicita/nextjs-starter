import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
import Image from 'next/image';
import { Avatar, ListItemText, CircularProgress } from "@material-ui/core"
import { AssignmentIndOutlined } from "@material-ui/icons"
import { Card } from 'react-bootstrap'
import { baseUrl } from '../../pages/api/api.jsx';
import NoData from '../common/noData.jsx';

const Publication = (props) => {
    const BASE_URL = useContext(baseUrl);
    const [Author_ID, setAuthor_ID] = useState()
    const [PublicationByAuthorData, setPublicationByAuthorData] = useState([])
    const [NoRecord, setNoRecord] = useState(false)
    const [isFetching, setIsFetching] = useState(false) // scroll more publication
    const [startIndexValue, setstartIndexValue] = useState(0)
    const [endIndexValue, setendIndexValue] = useState(10)

    useEffect(() => {
        if (props.authorID !== undefined && props.authorID !== null) {
            console.log("inside publication page props data of author ID@@@", props.authorID);
            setAuthor_ID(props.authorID)
            getPublicationByAuthor(props.authorID)
        }
    }, [])

    function scrollpublications() {
        setstartIndexValue(endIndexValue)
        setendIndexValue(endIndexValue + 10)
    }

    useEffect(() => {
        console.log("startIndexValue", startIndexValue, "endIndexValue", endIndexValue);
        if (Author_ID !== undefined) {
            getPublicationByAuthor(Author_ID)
        }
    }, [startIndexValue, endIndexValue])

    function getPublicationByAuthor(authorID) {
        var config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorID
            },
            data: {
                "UserID": authorID,
                "StartIndex": startIndexValue,
                "EndIndex": endIndexValue
            }
        };
        Axios(`${BASE_URL}User/GetUserPublications/`, config)
            .then((res) => {
                console.log("setPublicationByAuthorData @@@@@@@@", res);
                if (res.data.responseCode === '00') {
                    fetchAppendedData(res.data.responseData)
                    setIsFetching(false)
                } else if (res.data.responseCode === '03') {
                    console.log("inside no record");
                    setNoRecord(true)
                    setIsFetching(false)
                }
            })
            .catch((err) => {
                console.log("setPublicationByAuthorData error in catch", err);
            });
    }

    const fetchAppendedData = (newData) => {
        setPublicationByAuthorData(publicationData => [...publicationData, ...newData])
        if (newData !== null) {
            setIsFetching(true)
            scrollpublications()
        }
    }

    useEffect(() => {
        console.log(PublicationByAuthorData);
    }, [PublicationByAuthorData])

    const handlePubicationClick = (pen_name) => {
        console.log(pen_name);
        window.open(`/publication/${pen_name}`, '_blank')
    }

    return (<>
        <div className='container'>
            <p className='fs-28 fw-mid'>My Publications</p> <hr />
            {PublicationByAuthorData !== undefined && PublicationByAuthorData.length > 0 ? <>
                {PublicationByAuthorData.map((obj, index) => {
                    const name = obj.penName.charAt(0) === '@' ? obj.penName.substring(1) : obj.penName
                    return (<Card className='mt-4' key={index}>
                        <div className='row cursor' onClick={() => handlePubicationClick(name)}>
                            <div className='col-2'>
                                {obj.publicationImage !== undefined && <Image src={obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage} alt="publication Image" height={50} width={50} style={{ objectFit: 'cover' }} />}
                            </div>
                            <div className='col-8'>
                                <ListItemText className='my-auto' primary={<span className='ff-lora fs-18'>{obj.publicationName}</span>}
                                    secondary={<text className='fs-15'>{obj.about}</text>} />
                            </div>
                        </div>
                    </Card>)
                })}
            </> : NoRecord === true ? <NoData authorID={Author_ID} /> : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                <CircularProgress aria-label="Loading..." />
            </div>}
            {isFetching && <div style={{ padding: '10px 0px', textAlign: 'center' }}> <CircularProgress aria-label="Loading..." /> </div>}
        </div>
    </>)
}

export default Publication

