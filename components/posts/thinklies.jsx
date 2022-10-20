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

    const [AuthorID, setAuthorID] = useState()
    const [RemoteConfigJson, setRemoteConfigJson] = useState()

    useEffect(() => {
        if (props.authorID !== undefined && props.thinklyConfigJSON !== undefined) {
            setAuthorID(props.authorID)
            setRemoteConfigJson(props.thinklyConfigJSON)
            fetchThinklies(props.authorID)
        }
    }, [])

    // function fetchThinklies(authorID) {
    //     var config = {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "DeviceID": process.env.REACT_APP_DEVICE_ID,
    //             "UserID": authorID
    //         },
    //         data: {
    //             "UserID": authorID,
    //             "ThinklyID": 0,
    //             "StartIndex": startIndexValue,
    //             "EndIndex": endIndexValue
    //         }
    //     };
    //     Axios(`${BASE_URL}Thinkly/GetUserThinklies`, config)
    //         .then((res) => {
    //             if (res.data.responseCode === '00') {
    //                 setIsFetching(false)
    //             } else if (res.data.responseCode === '03') {
    //                 setNoRecord(true)
    //                 setIsFetching(false)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log("GetUserThinklies error in catch", err);
    //         });
    // }

    return (<div className='row'>
        <p>jfsdjfb</p>
    </div>);
}

export default Thinklies;