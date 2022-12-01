import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Check } from '@material-ui/icons';
import { isMobile } from 'react-device-detect';
import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

const PublicationPaymentSuccess = () => {
    const router = useRouter()
    const [getpenName, setpenName] = useState()

    useEffect(() => {
        const data = ParaByNameFromUrl('penname', router.asPath)
        setpenName(data)
    }, [])

    return (<>
        <Header />
        <div class="container" style={{ marginTop: '5rem' }}>
            <div className='fs-30 fw-bold mb-5 text-center'>Congratulations on your subscription purchase!</div>
            <div className='fs-18'>You have successfully purchased a voucher for <b>{getpenName}</b>. <br /> Great choice there! <br /><br /> We have sent you a voucher code on your email.</div>
            <div className='fs-18 mt-5'> Here's how you can access your subscription.
                <ol>
                    <li>Download Thinkly App</li>
                    <li>Create your account</li>
                    <li>Click your profile image/dp on the top left corner</li>
                    <li>Go to My Vouchers</li>
                    <li>Enter voucher code and Redeem</li>
                    <img src='https://thinklymedia.blob.core.windows.net/catalogueimages/RedeemVoucher.png' alt='steps' className='my-4' style={!isMobile ? { height: '35rem', width: '65rem' } : { height: '10rem', width: '20rem' }} /> <br />
                    …and done <Check style={{ color: 'green' }} />
                </ol> <br />
                <p>If you need any help, email us at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=help@thinkly.me&su=SUBJECT&body=BODY&bcc=">help@thinkly.me</a>.</p>
                <div className='row mt-4 mb-5'>
                    <a href={process.env.NEXT_PUBLIC_DYNAMIC_LINK_HOME_FOR_APP} className='mx-auto'>
                        <button className='mt-4 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 primary-bg-color px-4'>Redeem Voucher on App</button>
                    </a>
                </div>
            </div>
        </div>
        <Footer />
    </>
    )
}

export default PublicationPaymentSuccess