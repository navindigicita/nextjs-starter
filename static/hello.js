import Head from 'next/head';

export default function Hello() {
    return (
        <div>
            <Head>
                <script
                    type='text/javascript'
                    dangerouslySetInnerHTML={{
                        __html: ` !function(e,t,n,o,a,c)
                      {
                      ((window.WebConnect = {}),
                      ((a = t.createElement(n)).src =
                          'https://webchat.goboomtown.com/assets/webConnectChatBox.js'),
                      (c = t.getElementsByTagName(n)[0]).parentNode.insertBefore(a, c))
                      }
                      (window,document,"script"),window.onload=function()
                      {WebConnect.configOptions({
                      apiHost: 'https://api.goboomtown.com',
                      frameSource: 'https://webchat.goboomtown.com',
                      })}
                      ;
                      `,
                    }}
                />
            </Head>
            <h1>A page of my website.</h1>
        </div>
    )
}