import React, { useEffect, useState } from 'react'
import NewPublication from '../publication/newPublication';

const NoData = (props) => {
    const [showPublication, setshowPublication] = useState(false);
    const [AuthorID, setAuthorID] = useState()

    useEffect(() => {
        console.log("propsData value in no data page@@@", props.authorID);
        if (props.authorID !== undefined) {
            console.log("props data successed in noDataPage@@@@@@", props.authorID);
            setAuthorID(props.authorID)
        }
    }, [])


    return (<>
        <div className='text-center'>
            <text className='fs-15'>WELCOME TO</text>
            <h2 className='fs-30'>Thinkly Lite</h2>
            <p className='fs-20'>One stop solution for all your creator needs</p>
            <img src={'/social-tree_rafiki.svg'} alt="noData" style={{ width: 'auto', height: '280px' }} />
            <h5 className='my-3 fs-20 mb-2'>Create a publication to post a Thinkly</h5>
            <button className='fw-bold border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto w-50' data-toggle="modal" data-target="#newPublication" onClick={() => setshowPublication(true)} >New Publication</button>
        </div>
        {showPublication && <NewPublication authorID={AuthorID} />}
    </>)
}

export default NoData
