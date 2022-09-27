import React, { useEffect } from 'react';
import { CircularProgress } from "@material-ui/core";
import { useRouter, withRouter } from 'next/router';

const UserCheck = () => {
    const router = useRouter();

    useEffect(() => {
        console.log("check user", router.query.response, router.query.userData);
        if (router.query.response !== undefined && router.query.userData !== undefined) {
            checkEmail(router.query.response, router.query.userData)
        } else {
            setTimeout(() => {
                router.push('/login')
            }, 10000);
        }
    }, [])

    function checkEmail(userData, googleData) {
        const data = JSON.parse(userData)
        if (data.responseCode === '00') {  //user exist with 1 account type
            const userResponse = JSON.parse(data.responseData)
            const author_id = userResponse.UserDetails[0].UserID
            localStorage.setItem('UserID', author_id);
            // user exist but registered with email only then check penName availability and act accordingly
            if (userResponse.UserDetails[0].PenName !== "" && userResponse.UserDetails[0].PenName.length > 0) {
                router.push('/') //check in main index.js for userID from local storage and then show dashboard
            } else {
                router.push('/complete-your-profile')
            }
        } else if (data.responseCode === '01') { //user exist with multiple account type
            router.push({
                pathname: '/user/multiAccount',
                query: { userData: data.responseData }
            })
        } else if (data.responseCode === '02') { // user not exist
            router.push('/complete-your-profile')
        }
    }

    return (<>
        <div className="grid place-items-center h-screen">
            <CircularProgress aria-label="Loading..." />
        </div>
    </>)
}

export default withRouter(UserCheck)