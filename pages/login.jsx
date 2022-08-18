import React from 'react'
import { firebaseApp } from '../firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import Image from 'next/image';
import Header from '../components/common/header'
import Head from 'next/head';
// import { signIn } from 'next-auth/react'

const SignUp = (props) => {
    const router = useRouter()
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();


    const handleGmailSignIn = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user;
        const providerUserData = providerData.find(obj => obj.providerId === "google.com")
        localStorage.setItem('user', JSON.stringify(providerUserData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken))
        router.push('/user/userAuth')
    }

    return (<>
        <Header />
        <Head>
            <script type="text/javascript" src="static/libs/jquery.min.js"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/malihu-custom-scrollbar-plugin@3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>
            <script type="text/javascript" src="static/libs/bootstrap.min.js"></script>
            {/* <script type="text/javascript" src="static/libs/owl.carousel.min.js"></script> */}
            <script type="text/javascript" src="static/scripts/chatHead.js"></script>
            <script type="text/javascript" src="static/libs/jquery.magnific-popup.js"></script>
        </Head>
        <div className='container' style={{ marginTop: '8rem' }}>
            <div className='text-center' style={isMobile ? { marginTop: '100px', marginBottom: '135px' } : {}}>
                <p className='fs-16 ff-roboto'> Welcome back to </p>
                <h2 className='ff-roboto fs-30 fw-bold'> THINKLY </h2> <br />
                <p className='font-weight-bold fs-20 ff-roboto'>Create New Account</p>
                <button type='button' className='button-social-link mt-2 height-button fs-18 bg-white fc-black ff-roboto border-radius-4' onClick={() => handleGmailSignIn()}>
                    <Image src={'/gmail-logo.svg'} alt="google" height={15} width={50} />Continue with Gmail</button>
            </div>
        </div>
    </>)
}

export default SignUp;
