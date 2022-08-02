import React, { useEffect, useState, useContext } from 'react'
import Axios from "axios";
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
                "DeviceID": "123456",
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
            {PublicationByAuthorData !== undefined && PublicationByAuthorData.length > 0 ? <>
                <h3>My Publications</h3> <hr />
                {PublicationByAuthorData.map((obj, index) => {
                    const name = obj.penName.charAt(0) === '@' ? obj.penName.substring(1) : obj.penName
                    return (<Card className='mt-4' key={index}>
                        <div className='row cursor' onClick={() => handlePubicationClick(name)}>
                            <div className='col-1'>
                                {obj.publicationImage !== undefined ?
                                    <img alt="publication Image" style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        src={obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage} />
                                    : <Avatar style={{ width: '120px', height: '120px' }} src={<AssignmentIndOutlined />} />
                                }
                            </div>
                            <div className='col-8 ml-3'>
                                <ListItemText
                                    primary={<span className='ff-lora fs-18'>{obj.publicationName}</span>}
                                    secondary={<text className='ff-roboto fs-15'>{obj.about}</text>}
                                />
                            </div>
                            {/* <div className='col-1 d-flex flex-column justify-content-center align-items-center'>
                            <ArrowForwardIosRounded style={{ color: 'gray', fontSize: '50px', fontStyle: 'normal' }} />
                        </div> */}
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

