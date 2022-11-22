import React, { useState, useEffect } from "react";
import Thinklies from '../posts/thinklies'
import Draft from "./drafts";
import ScheduledPost from "./scheduledPost";

const PostCollection = (props) => {
    const [Author_ID, setAuthor_ID] = useState()
    const [configJson, setconfigJson] = useState()

    useEffect(() => {
        document.getElementById("defaultOpen").click();
        if (props.authorID !== undefined && props.thinklyConfigJSON !== undefined) {
            setAuthor_ID(props.authorID)
            setconfigJson(props.thinklyConfigJSON)
        }
    }, []);

    const openTab = (event, tabName) => {
        var i, tabContent, tablinks;
        tabContent = document.getElementById("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tablinks = document.getElementById("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
    }

    return (<div className='row'>
        <div className='col-12'>
            <p className='fs-28 fw-mid'>My Post Collection</p> <hr />
            <div className="tab mt-4">
                <button className='col-4 tablinks fc-gray active' onClick={(event) => openTab(event, 'Posts')} id="defaultOpen tablinks" ><b>Published</b></button>
                <button className='col-4 tablinks fc-gray' onClick={(event) => openTab(event, 'Drafts')} id="tablinks" ><b>Drafts</b></button>
                <button className='col-4 tablinks fc-gray' onClick={(event) => openTab(event, 'ScheduledPosts')} id="tablinks" ><b>Scheduled</b></button>
            </div>
            <div id="Posts tabContent" className="tabContent">
                {Author_ID !== undefined && configJson !== undefined && <Thinklies authorID={Author_ID} thinklyConfigJSON={configJson} />}
            </div>
            <div id="Drafts tabContent" className="tabContent">
                {Author_ID !== undefined && configJson !== undefined && <Draft authorID={Author_ID} thinklyConfigJSON={configJson} />}
            </div>
            <div id="ScheduledPosts tabContent" className="tabContent">
                {Author_ID !== undefined && configJson !== undefined && <ScheduledPost authorID={Author_ID} thinklyConfigJSON={configJson} />}
            </div>
        </div>
    </div>);
}

export default PostCollection;