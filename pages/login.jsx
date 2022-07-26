import React from 'react'
import firebaseApp from '../firebase-config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import Image from 'next/image';
import Header from '../components/common/header'
import Footer from '../components/common/footer';

const Login = () => {
    const router = useRouter()
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    const handleGmailSignIn = async () => {
        isSupported().then((result) => {
            if (result) {
                const analytics = getAnalytics(firebaseApp);
                logEvent(analytics, 'GOOGLE_MEDIUM');
            }
        })
        const { user } = await signInWithPopup(firebaseAuth, provider)
        const { refreshToken, providerData } = user;
        const providerUserData = providerData.find(obj => obj.providerId === "google.com")
        localStorage.setItem('user', JSON.stringify(providerUserData))
        localStorage.setItem('accessToken', JSON.stringify(refreshToken))
        router.push('/user/userAuth')
    }

    return (<>
        <Header />
        <div className='container' style={{ marginTop: '8rem' }}>
            <div className='text-center' style={isMobile ? { marginTop: '100px', marginBottom: '135px' } : {}}>
                <p className='fs-16 ff-roboto'> Welcome back to </p>
                <h2 className='ff-roboto fs-30 fw-bold'> THINKLY </h2> <br />
                <p className='font-weight-bold fs-20 ff-roboto'>Existing User Login</p>
                <button type='button' className='button-social-link mt-2 height-button fs-18 bg-white fc-black ff-roboto border-radius-4' onClick={() => handleGmailSignIn()}>
                    <Image src={'/gmail-logo.svg'} alt="google" height={15} width={50} />Continue with Gmail</button>
            </div>
        </div>
        <Footer />
    </>)
}

export default Login;