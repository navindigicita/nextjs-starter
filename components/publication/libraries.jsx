import React, { useEffect, useState } from 'react'
import Bookmark from '../bookmark';
import SubscribedPublication from '../subscribedPub';

const Libraries = (props) => {
    const [AuthorID, setAuthorID] = useState()

    useEffect(() => {
        document.getElementById("defaultOpen").click();
        if (props.authorID !== undefined && props.profileJson !== undefined) {
            setAuthorID(props.authorID)
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

    return (<div className='row'>
        <div className='col-12'>
            <p className='fs-28 fw-mid'>My Library</p> <hr />
            <div className="tab mt-4">
                <button className='col-6 tablinks fw-bold fc-gray active' onClick={(event) => openTab(event, 'Subscribed')} id="defaultOpen" >Subscriptions</button>
                <button className='col-6 tablinks fw-bold fc-gray' onClick={(event) => openTab(event, 'bookmarks')} >Bookmarks</button>
            </div>
            <div id="Subscribed" className="tabContent">
                <SubscribedPublication authorID={AuthorID} />
            </div>
            <div id="bookmarks" className="tabContent">
                <Bookmark authorID={AuthorID} />
            </div>
        </div>
    </div>)
}

export default Libraries