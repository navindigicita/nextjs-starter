import { Avatar } from '@material-ui/core'
import { AssignmentIndOutlined } from '@material-ui/icons'
import React, { useContext, useEffect, useState } from 'react'
import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl'
import { useRouter } from 'next/router'
import Axios from "axios";
import { baseUrl } from '../api/api'
import ShareLink from '../../components/common/shareLink'

const PaymentSuccess = () => {
    const BASE_URL = useContext(baseUrl)
    const router = useRouter();
    const [getProfileDetail, setprofileDetail] = useState()
    const [getpenName, setpenName] = useState()
    const [starCount, setstarCount] = useState(0)

    useEffect(() => {
        const data = ParaByNameFromUrl('penname')
        const star = ParaByNameFromUrl('stars')
        console.log(data, star);
        setpenName(data)
        setstarCount(star)
        if (data !== undefined && data !== null) {
            UserData(data)
        } else {
            router.push('/error')
        }
    }, [])

    const UserData = (penName) => {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": 0
            },
        };
        Axios.get(`${BASE_URL}User/GetDetailsByPenName/${penName}`, config)
            .then((res) => {
                console.log("Get user Details By PenName@@@@@", res.data);
                if (res.data.responseCode === '00') {
                    console.log("inside Get User Profile details@@@@@@@@", res.data.responseData.Details);
                    setprofileDetail(res.data.responseData.Details)
                }
            })
            .catch((err) => {
                console.log("getUserProfileDateils error in catch", err);
            });
    }

    const handleBackToProfile = () => {
        router.push(`/${getpenName}`)
    }

    return (<>
        {getProfileDetail !== undefined && <div class="container text-center">
            <p className='fs-20 fw-bold'>Thank you! <br /> You've made {getpenName}'s day.</p>
            <p className='px-3 fs-15'>We  will let {getpenName} know that you have gifted them <b>{starCount} {starCount > 1 ? 'stars' : 'star'}.</b></p>
            <p className='fs-15'>Share this with the world.</p>
            <div className='row d-flex'>
                {getProfileDetail.profileDetails.profileImage !== undefined ?
                    <img className='mx-auto mt-2 mb-3' src={getProfileDetail.profileDetails.profileImage.charAt(0) === '@' ? getProfileDetail.profileDetails.profileImage.substring(1) : getProfileDetail.profileDetails.profileImage}
                        alt='profile' style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'none' }} />
                    : <Avatar src={<AssignmentIndOutlined />} className="mx-auto mt-2 mb-4" style={{ width: '120px', height: '120px' }} />
                }
            </div>
            <ShareLink linkUrl={getpenName} />
            <a className='fs-16 fc-link pointer fw-mid' onClick={() => handleBackToProfile()}>Back to {getpenName}'s profile</a>
        </div>}
    </>)
}

export default PaymentSuccess