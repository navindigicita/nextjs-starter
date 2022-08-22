import Head from 'next/head';
import 'next/script';
export default function Hello() {
    return (
        <div>
            <Head>
              
                {/* <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/malihu-custom-scrollbar-plugin@3.1.5/jquery.mCustomScrollbar.concat.min.js"></script> */}
                {/* <script type="text/javascript" src="static/libs/owl.carousel.min.js"></script>
                <script type="text/javascript" src="static/scripts/chatHead.js"></script>
                <script type="text/javascript" src="static/libs/jquery.magnific-popup.js"></script> */}
                <script type='text/javascript'>
                    alert('test');
                </script>
            </Head>
            <h1>A page of my website.</h1>
        </div>
    )
}