import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { useRouter } from 'next/router'
import ShareLink from '../../components/common/shareLink';
import Image from 'next/image';
import { Avatar } from '@material-ui/core';

const CreateProfileShare = (props) => {
    const router = useRouter();
    const [profileImage, setprofileImage] = useState(router.query.profile)
    const [userName, setuserName] = useState(router.query.penName)

    useEffect(() => {
        $('#urlSharePopUp').modal('show')
        localStorage.setItem('UserID', router.query.userID)
    }, [userName, profileImage])


    const openDashboard = () => {
        $('#urlSharePopUp').modal('hide')
        router.push('/')
    }

    return (<>
        <div className='container' style={{ paddingTop: '500px' }}> </div>
        <div className="modal fade" id="urlSharePopUp" role="dialog" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="close text-right pr-2" onClick={() => openDashboard()}>&times;</button>
                    <div className="modal-body text-center">
                        <h2 className='fs-30 fw-bold'>Your page is live!</h2>
                        <h3 className='fs-20'>Share it with the world.</h3>
                        <Avatar className='mt-3 mb-5' src={profileImage} alt='profile' style={{ height: '100px', width: '100px' }} />
                        {/* <Image className='mt-3 mb-5' src={profileImage} alt='profile' height={100} width={100} style={{ borderRadius: '50%' }} /> */}
                        <h2 className='fs-20 fw-bold'>{userName}</h2>
                        <ShareLink linkUrl={userName} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CreateProfileShare