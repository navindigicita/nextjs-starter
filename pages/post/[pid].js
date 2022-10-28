import { useEffect, useState } from 'react'
import Head from 'next/head'

const Post = (props) => {

    useEffect(() => {
        console.log(props);
    }, [])


    return (<>
        <Head>
            <title>{props.data}</title>
            <meta name="description" content="Post Description" />
            <meta property="og:url" content={props.url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.data} key="og-title" />
            <meta property="og:description" content={props.shortUrl} key="og-desc" />
        </Head>
        <p>Post: {props.data}</p>
    </>)
}

export default Post

export async function getServerSideProps(content) {
    const value = content.params.pid
    const webUrl = content.req.headers.referer
    const resolved = content.resolvedUrl
    return {
        props: {
            data: value,
            url: webUrl,
            shortUrl: resolved
        },
    };
}
