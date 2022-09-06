import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const {
        query: { id },
    } = router
    return <p>Post: {id}</p>
}

export default Post
