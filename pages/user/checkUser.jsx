import React, { useState, useEffect } from 'react';
import { CircularProgress } from "@material-ui/core";
import { useRouter, withRouter } from 'next/router';
// import MultiAccount from './multiAccount';

const UserCheck = () => {
    const router = useRouter();
    const [userType, setUserType] = useState()

    useEffect(() => {
        console.log("check user", router.query.response, router.query.userData);
        if (router.query.response !== undefined && router.query.userData !== undefined) {
            checkEmail(router.query.response, router.query.userData)
        }
    }, [])

    function checkEmail(userData, googleData) {
        const data = JSON.parse(userData)
        console.log("inside check email", data);
        const userResponse = JSON.parse(data.responseData)
        console.log("user data from checkUser api from auth@@@@@@", userResponse);
        if (data.responseCode === '00') {  //user exist with 1 account type
            console.log("single user data########", userResponse);
            const author_id = userResponse.UserDetails[0].UserID
            // user exist but registered with email only then check penName availability and act accordingly
            if (userResponse.UserDetails[0].PenName !== "" && userResponse.UserDetails[0].PenName.length > 0) {
                localStorage.setItem('UserID', author_id);
                router.push('/') //check in main index.js for userID from local storage and then show dashboard
            } else {
                router.push({
                    pathname: '/complete-your-profile',
                    query: { googleData: googleData, updateCall: author_id }
                })
            }
        } else if (data.responseCode === '01') { //user exist with multiple account type
            console.log("inside multiple type account@@@@@");
            setUserType('multiple')
        } else if (data.responseCode === '02') { // user not exist
            console.log("inside no user found by this mail, 02");
            router.push({
                pathname: '/complete-your-profile',
                query: { googleData: googleData }
            })
        }
    }

    return (<>
        <div className='container'>
            {/* {userType !== undefined && userType === 'multiple' ? <MultiAccount acc_list={userData} userStatus={loginStatus} />
                : <div style={{ padding: '150px 0px', textAlign: 'center' }}> <CircularProgress aria-label="Loading..." /> </div>} */}
        </div>
    </>)
}

export default withRouter(UserCheck)