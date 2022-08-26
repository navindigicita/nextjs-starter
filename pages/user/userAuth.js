import React, { useContext, useEffect, useState } from 'react'
import Axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { baseUrlThinkly } from '../api/api'
import { withRouter, useRouter } from 'next/router'
import { fetchUserAccessToken, fetchUserInfo } from '../../utils/fetchUserDetail';
// import AuthenticateIsUser from './authenticateIsUser';
// import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl';


const UserAuth = (props) => {
    const router = useRouter();
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);

    useEffect(() => {
        const accessToken = fetchUserAccessToken();
        if (!accessToken) {
            return router.push("/login")
        }

        const userInfo = fetchUserInfo()
        if (userInfo !== undefined && userInfo !== null && userInfo !== '') {
            checkEmail(userInfo)
        } else {
            router.push('/login')
        }
        // async function fetchData() {
        //     var email = ParaByNameFromUrl('email', router.asPath);
        //     console.log("filtered email from url -> calling authenticate isUser now", email);
        //     await AuthenticateIsUser(email)
        //     const status = localStorage.getItem('signInStatus')
        //     if (status === 'Success') {
        //         console.log("user signInStatus success", email);
        //         checkEmail(email, status)
        //     } else {
        //         console.log("user signInStatus failed");
        //         router.push('/login')
        //     }
        // }
    }, []);

    function checkEmail(userInfo) {
        console.log("inside checkEmail api email_id and signIn_status", userInfo.email);
        var config = {
            method: 'POST',
            data: {
                EmailID: userInfo.email,
                MobileNo: ""
            }
        }
        Axios(`${BASE_URL_THINKLY}User/CheckUser`, config)
            .then((res) => {
                console.log("CheckUser response", res.data);
                router.push({
                    pathname: '/user/checkUser',
                    query: {
                        response: JSON.stringify(res.data),
                        userData: JSON.stringify(userInfo)
                    }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<div className="grid place-items-center h-screen">
        <CircularProgress aria-label="Loading..." />
    </div>)
}

export default UserAuth

