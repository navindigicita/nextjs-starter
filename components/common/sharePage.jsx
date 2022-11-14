import { Avatar } from '@material-ui/core'
import { AssignmentIndOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import ShareLink from './shareLink'

const SharePage = (props) => {
    const [userPenName, setuserPenName] = useState()
    const [userProfileImage, setuserProfileImage] = useState()

    useEffect(() => {
        if (props.profile !== undefined && props.penName !== undefined) {
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
                        <h2 className='fs-26 fw-bold'>Share your page with the world.</h2>
                        <div className='row d-flex'>
                            {(userProfileImage !== undefined && userProfileImage !== null && userProfileImage !== '') ?
                                <img className='my-3 mx-auto' src={userProfileImage} alt='profile' style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
                                : <Avatar className='mx-auto' style={{ width: '100px', height: '100px' }} src={<AssignmentIndOutlined />} />}
                        </div>
                        <h2 className='fs-20 fw-bold mt-2'>{userPenName !== undefined && userPenName}</h2>
                        <ShareLink linkUrl={props.penName} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharePage