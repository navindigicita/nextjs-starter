import { NextSeo } from 'next-seo';

const Post = (props) => {

    return (<>
        <NextSeo
            title="Using More of Config"
            description="This example uses more of the available config options."
            canonical="https://nextjs-starter-thinkly-five.vercel.app/"
            openGraph={{
                url: 'https://nextjs-starter-thinkly-five.vercel.app/post/19967/',
                title: 'Open Graph Title',
                description: 'Open Graph Description',
                images: [{
                    url: 'https://thinklymedia.blob.core.windows.net/devimages/01_1638797315802_.jpg',
                    width: 800,
                    height: 600,
                    alt: 'Og Image Alt',
                    type: 'image/jpeg',
                }],
                siteName: 'SiteName',
            }}
        />

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
