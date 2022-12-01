import React, { useEffect, useState } from 'react'
import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl';
import { useRouter } from 'next/router'
import Header from '../../components/common/header';
import Footer from '../../components/common/footer';

const PublicationPaymentFailed = () => {
    const router = useRouter();
    const [getpenName, setpenName] = useState()

    useEffect(() => {
        const data = ParaByNameFromUrl('penname')
        setpenName(data)
    }, [])

    const okWindowClose = () => {
        router.push(`/${getpenName}`)
    }

    return (<>
        <Header />
        <div class="container text-center" style={{ marginTop: '5rem' }}>
            <p className='fs-28 fw-bold py-3 '>Payment Cancelled or Failed !!!</p>
            <button className='mx-auto mt-4 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 primary-bg-color px-4' onClick={() => okWindowClose()}>OK</button>
        </div>
        <Footer />
    </>)
}

export default PublicationPaymentFailed  