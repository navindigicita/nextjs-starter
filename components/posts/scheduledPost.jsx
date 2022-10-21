import React, { useContext, useState, useEffect } from 'react'
import Axios from "axios";
import $ from 'jquery'
import { CircularProgress } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons'



const ScheduledPost = () => {

    useEffect(() => {
        if (props.authorID !== undefined) {
            // setAuthorID(props.authorID)
            // fetchScheduledList(props.authorID)
        }
    }, [])

    return (
        <div>ScheduledPost</div>
    )
}

export default ScheduledPost