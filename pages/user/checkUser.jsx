import React, { useState, useEffect } from 'react';
import { CircularProgress } from "@material-ui/core";
import { useRouter, withRouter } from 'next/router';
// import MultiAccount from './multiAccount';

const UserCheck = (props) => {
    const router = useRouter();
    const userData = props.router.query.data //JSON.parse(props.router.query.data);
    const loginStatus = props.router.query.status;
    const GplusData = props.router.query.state //JSON.parse(props.router.query.state);
    const [userType, setUserType] = useState()

    useEffect(() => {
        if (userData !== undefined && loginStatus !== undefined && GplusData !== undefined) {
            console.log("checkUser data passed from userAuth##########", GplusData);
            checkEmail()
        }
    }, [])

    function checkEmail() {
        const data = JSON.parse(userData)
        const userResponse = JSON.parse(data.responseData)
        console.log("user data from checkUser api from auth@@@@@@", userResponse);
        if (userData.responseCode === '00') {  //user exist with 1 account type
            console.log("single user data########", userResponse);
            const author_id = userResponse.UserDetails[0].UserID
            // user exist but registered with email only then checkF penName availability and act accordingly
            if (userResponse.UserDetails[0].PenName !== "" && userResponse.UserDetails[0].PenName.length > 0) {
                localStorage.setItem('UserID', author_id);
                router.push({
                    pathname: '/',
                    query: { userID: author_id, userStatus: loginStatus }
                })
            } else {
                router.push({
                    pathname: '/complete-your-profile',
                    query: { googleData: GplusData, updateCall: author_id }
                })
            }
        } else if (userData.responseCode === '01') { //user exist with multiple account type
            console.log("inside multiple type account@@@@@");
            setUserType('multiple')
        } else if (userData.responseCode === '02') { // user not exist
            console.log("inside no user found by this mail, 02");
            router.push({
                pathname: '/complete-your-profile',
                query: GplusData
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