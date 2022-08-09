import React, { useContext, useEffect, useState } from 'react'
import Axios from "axios";
import { CircularProgress } from '@material-ui/core';
import { baseUrlThinkly } from '../api/api'
import { withRouter, useRouter } from 'next/router'
// import AuthenticateIsUser from './authenticateIsUser';
// import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl';


const UserAuth = (props) => {
    const router = useRouter();
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const [propsDataFromSignUp, setpropsDataFromSignUp] = useState(props.router.query)

    useEffect(() => {
        console.log("inside user auth@@@", props.router.query);
        if (propsDataFromSignUp !== undefined && propsDataFromSignUp.providerId === "google.com") {
            console.log("propsDataFromSignUp@@@ ", propsDataFromSignUp);
            checkEmail(propsDataFromSignUp.email, "Success")
        } else {
            console.log("inside");
            // fetchData()
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

    function checkEmail(email_id, signIn_status) {
        console.log("inside checkEmail api email_id and signIn_status", email_id, signIn_status);
        var config = {
            method: 'POST',
            data: { EmailID: email_id, MobileNo: "" }
        }
        Axios(`${BASE_URL_THINKLY}User/CheckUser`, config)
            .then((res) => {
                console.log("CheckUser response", res.data);
                router.push({
                    pathname: '/user/checkUser',
                    query: { data: JSON.stringify(res.data), status: signIn_status, state: JSON.stringify(propsDataFromSignUp) }
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (<div style={{ padding: '150px 0px', textAlign: 'center' }}>
        <CircularProgress aria-label="Loading..." />
    </div>)
}

export default withRouter(UserAuth)

