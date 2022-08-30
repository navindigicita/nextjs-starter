import { Avatar } from '@material-ui/core'
import { AssignmentIndOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import ShareLink from './shareLink'
import Image from 'next/image';

const SharePage = (props) => {
    const [userPenName, setuserPenName] = useState()
    const [userProfileImage, setuserProfileImage] = useState()

    useEffect(() => {
        console.log("inside share page@@@@", props.penName, props.profile);
        if (props.profile !== undefined && props.penName !== undefined) {
            console.log("inside share page@@@@@@@@@@", props.penName);
            setuserPenName(props.penName)
            const data = props.profile.charAt(0) === '@' ? props.profile.substring(1) : props.profile
            setuserProfileImage(data)
        }
    }, [])

    return (
        <div className="modal fade" id="ShareProfile" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal">&times;</button>
                    <div className="modal-body text-center p-4">
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Share your page with the world.</h2>
                        {/* <div className='row d-flex'> */}
                        {(userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== '') ?
                            <Image className='flex justify-between my-3' src={userProfileImage} alt='profile' height={120} width={120} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                            : <Avatar className='flex justify-between my-3' style={{ width: '100px', height: '100px' }} src={<AssignmentIndOutlined />} />}
                        {/* </div> */}
                        <h2 className='fs-20 fw-bold mt-2'>{userPenName !== undefined && userPenName}</h2>
                        <ShareLink linkUrl={props.penName} image={userProfileImage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePage