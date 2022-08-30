import React, { useEffect, useState } from 'react';
import PlayStore from "../../public/playStore.svg";
import AppStore from "../../public/appstore.svg";
import { isMobile } from 'react-device-detect';

const Footer = () => {
    const [getPath, setPath] = useState();

    useEffect(() => {
        var windowURL = window.location.href
        if (windowURL.indexOf('uat.stars.thinkly.me') > 0) {
            setPath('stars')
        } else if (windowURL.indexOf('uat.create.thinkly.me') > 0) {
            setPath('create')
        }
    }, [])


    return (<>
        <section className="footer">
            <hr />
            {isMobile ? <div className='container'>
                <div className="row text-center">
                    {/* <div className="col-12 text-white align-a"> */}
                    <div className="col-12 align-a">
                        <a style={{ color: 'black' }} href="https://mail.google.com/mail/?view=cm&fs=1&to=info@thinkly.me&su=SUBJECT&body=BODY&bcc=">info@thinkly.me</a>
                        <span className="mx-2">|</span>
                        <a style={{ color: 'black' }} href="https://www.thinkly.me/privacy.html">Privacy Policy</a>
                        <span className="mx-2">|</span>
                        <a style={{ color: 'black' }} href="https://www.thinkly.me/terms-and-conditions.html">Terms & Conditions</a>
                    </div>
                </div>
                <div className='row text-center'>
                    <div className="col-12 mt-2">
                        <h4>2022 @ Thinkly</h4>
                    </div>
                </div>
            </div> : <div className="container my-2">
                <div className="row">
                    <div className="col-lg-6">
                        <h3 className="">come to thinkly</h3>
                        <p className="mt-3"> The best of social media and technology to help you find a tribe that shares your passion. You are, after all, your passion. </p>
                    </div>
                    {(getPath === 'create') && <div className="col-lg-6">
                        <div className="row text-center mt-5" style={{ position: 'relative', zIndex: '1' }}>
                            <div className="col-6 text-right">
                                <a href="https://play.google.com/store/apps/details?id=com.me.digicita.thinkly">
                                    <img src={PlayStore} className="downloadImgSize" alt="Download button for Play store" />
                                </a>
                            </div>
                            <div className="col-6 text-left">
                                <a href="https://apps.apple.com/in/app/thinkly/id1329943323">
                                    <img src={AppStore} className="downloadImgSize" alt="Download button for App store" />
                                </a>
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="row mt-5">
                    <div className="col-lg-6">
                        <h4>2022 @ Thinkly</h4>
                    </div>
                    <div className="col-lg-6 text-center">
                        <a className="d-block d-lg-inline mt-3" style={{ color: 'black' }} href="https://mail.google.com/mail/?view=cm&fs=1&to=info@thinkly.me&su=SUBJECT&body=BODY&bcc=">info@thinkly.me</a>
                        <span className="d-none d-lg-inline mx-3">|</span>
                        <a className="d-block d-lg-inline mt-3" style={{ color: 'black' }} href="https://www.thinkly.me/privacy.html">Privacy Policy</a>
                        <span className="d-none d-lg-inline mx-3">|</span>
                        <a className="d-block d-lg-inline mt-3" style={{ color: 'black' }} href="https://www.thinkly.me/terms-and-conditions.html">Terms and Conditions</a>
                    </div>
                </div>
            </div>}
        </section>
    </>)
}

export default Footer;


{/* <section className="footer">
    <div className="container ">
        <div className="row">
            <div className="col-lg-6">
                <h3 className="">come to thinkly</h3>
                <p className="mt-3"> The best of social media and technology to help you find a tribe that shares your passion. You are, after all, your passion. </p>
            </div>
            <div className="col-lg-6">
                <div className="row text-center mt-5" style={{ position: 'relative', zIndex: '2' }}>
                    <div className="col-6 text-right">
                        <a href="https://play.google.com/store/apps/details?id=com.me.digicita.thinkly">
                            <img src={PlayStore} className="downloadImgSize" alt="Download button for Play store" />
                        </a>
                    </div>
                    <div className="col-6 text-left">
                        <a href="https://apps.apple.com/in/app/thinkly/id1329943323">
                            <img src={AppStore} className="downloadImgSize" alt="Download button for App store" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-lg-6 order-2 order-lg-1 mt-5 mt-lg-0">
                <h4>2021 @ Thinkly</h4>
            </div>
            <div className="col-lg-6 text-center text-white order-1 align-a order-lg-1">
                <a className="d-block d-lg-inline mt-3" href="https://mail.google.com/mail/?view=cm&fs=1&to=info@thinkly.me&su=SUBJECT&body=BODY&bcc=">info@thinkly.me</a>
                <span className="d-none d-lg-inline mx-3">|</span>
                <a className="d-block d-lg-inline mt-3" href="https://www.thinkly.me/privacy.html">Privacy Policy</a>
                <span className="d-none d-lg-inline mx-3">|</span>
                <a className="d-block d-lg-inline mt-3" href="https://www.thinkly.me/terms-and-conditions.html">Terms and Conditions</a>
            </div>
        </div>
    </div>
</section> */}