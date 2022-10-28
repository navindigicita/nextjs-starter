// /pages/_document.js
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        {/* <Head>
          <meta property="og:url" content="https://nextjs-starter-thinkly-five.vercel.app" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Thinkly document.js" key="og-title" />
          <meta property="og:description" content="Platform for thinklers document.js" key="og-desc" />
        </Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
