import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import HandleGmailSignIn from './user/authenticate'
import Header from '../components/common/header'
import Image from 'next/image';

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
        <Header />
        <div className='container' style={{ marginTop: '8rem' }}>
            <div className='text-center' style={isMobile ? { marginTop: '100px', marginBottom: '135px' } : {}}>
                <p className='fs-16 ff-roboto'> Welcome to</p>
                <h2 className='ff-roboto fs-30 fw-bold'>{getPath === "create" ? "THINKLY" : getPath === "stars" && "GET STARS"}</h2> <br />
                <p className='font-weight-bold fs-20 ff-roboto'>Create New Account</p>
                <button type='button' className='button-social-link mt-2 height-button fs-18 bg-white fc-black ff-roboto border-radius-4' onClick={() => handleGmailSignIn()}>
                    <Image src={'/gmail-logo.svg'} alt="google" height={15} width={50} />Continue with Gmail</button>
            </div>
        </div>
    </>)
}

export default SignUp;
