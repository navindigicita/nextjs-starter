import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import "bootstrap/dist/css/bootstrap.css";

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
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // import("bootstrap/dist/js/bootstrap");
    // on initial load - run auth check 
    authCheck(router.asPath);
  }, [])


  function authCheck(url) {
    console.log("_app authcheck@@@",url);
    // redirect to login page if accessing a private page and not logged in 
    // setUser(userService.userValue);
    // const publicPaths = ['/account/login', '/account/register'];
    // const path = url.split('?')[0];
    // if (!userService.userValue && !publicPaths.includes(path)) {
    //   setAuthorized(false);
    //   router.push({
    //     pathname: '/account/login',
    //     query: { returnUrl: router.asPath }
    //   });
    // } else {
    //   setAuthorized(true);
    // }
  }

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}
