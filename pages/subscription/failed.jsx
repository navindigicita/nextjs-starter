import React, { useEffect, useState } from 'react'
import ParaByNameFromUrl from '../../components/common/paraByNameFromUrl';
import { useRouter } from 'next/router'

const PaymentFailed = () => {
    const router = useRouter();
    const [getpenName, setpenName] = useState()

    useEffect(() => {
        const data = ParaByNameFromUrl('penname')
        setpenName(data)
    }, [])

    const handleWindowClose = () => {
        router.push(`/${getpenName}`)
    }

    return (<>
        <p className='text-center fs-20 fw-mid'>Payment Cancelled or Failed</p>
        <div className='row d-flex'>
            <input className='mx-auto mt-4 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 primary-bg-color px-4' type='button' value='OK' onClick={() => handleWindowClose()} />
        </div>
    </>)
}

export default PaymentFailed