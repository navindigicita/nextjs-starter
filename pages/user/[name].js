import React from 'react'
import { useRouter } from 'next/router'

const User = () => {
    const router = useRouter()
    const { name } = router.query
    return (
        <div>{name}</div>
    )
}

export default User
