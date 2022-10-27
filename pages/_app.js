import { useEffect } from 'react';
import Head from 'next/head';
import "bootstrap/dist/css/bootstrap.css";

import '../styles/global.css';
import '../styles/reset.css';
import '../styles/main.css';
import '../styles/detailedPage.css'
import '../styles/font.css'
import '../styles/footer.css'
import '../styles/header.css'
import '../styles/homePage.css'
import '../styles/login.css'
import '../styles/newUser.css'
import '../styles/padding-margin.css'
import '../styles/publicationProfile.css'
import '../styles/style.css'
import '../styles/userProfile.css'
import '../styles/userProfileMob.css'
import "react-multi-carousel/lib/styles.css"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, [])

  return (
    <div>
      <Head>
        <title>Thinkly</title>
        <meta name="description" content="Platform for thinklers" />
        <meta property="og:url" content="https://nextjs-starter-thinkly-five.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thinkly" key="og-title" />
        <meta property="og:description" content="Platform for thinklers ogTag" key="og-desc" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

// export async function getServerSideProps({ req, res }) {
//   debugger;
//   if (req.headers.accept === "application/json") {
//     res.setHeader('Content-Type', 'application/json')
//     res.write(JSON.stringify({ "dummy": "data" }))
//     res.end()
//   }
//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }