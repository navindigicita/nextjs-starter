import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

const Testing = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push('/post/1997')  //push to dynamic route(1997 as pid)
  }

  return (<>
    <h6 className='text-center fs-30 font-bold'>Welcome to Next JS</h6>

    <button onClick={() => handleClick()}>Click here</button>
  </>)
}

export default Testing