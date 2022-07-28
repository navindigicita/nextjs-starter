import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
// import GmailLogo from '../Images/gmail-logo.svg'
// import Header from '../../sharedThinkly/common/header';
import HandleGmailSignIn from './user/authenticate'

const SignUp = (props) => {
    const [getPath, setPath] = useState()

    useEffect(() => {
        var windowURL = window.location.href
        console.log("login page", windowURL);
        if (windowURL.indexOf('uat.create.thinkly.me') > 0) {
            setPath('create')
        }
    }, [])

    const handleGmailSignIn = () => {
        HandleGmailSignIn()
    }

    return (<>
        {/* <Header /> */}
        <div className='container mt-5'>
            <div className='text-center' style={isMobile ? { marginTop: '100px', marginBottom: '135px' } : {}}>
                <text className='fs-16 ff-roboto'> Welcome to </text>
                <h2 className='ff-roboto fs-30 fw-bold'>{getPath === "create" ? "THINKLY" : getPath === "stars" && "GET STARS"}</h2> <br />
                <p className='font-weight-bold fs-20 ff-roboto'>Create New Account</p>
                <button type='button' className='button-social-link mt-2 height-button fs-18 bg-white fc-black ff-roboto border-radius-4' onClick={() => handleGmailSignIn()}>
                    {/* <img src={GmailLogo} alt="google" className='mr-2 mb-1' /> */}
                    Continue with Gmail</button>
            </div>
        </div>
    </>)
}

export default SignUp;
