import React, { useEffect, useState, useContext } from 'react'
import { Card, CircularProgress, ListItemText } from '@material-ui/core'
import { CheckCircleOutline, FavoriteBorder, Star } from '@material-ui/icons'
import Axios from "axios";
import Image from 'next/image';
import { isMobile } from 'react-device-detect'
import { baseUrlThinkly } from '../../pages/api/api';
import ShareLink from '../common/shareLink';
import Faq from '../common/faq';
import RedeemModal from '../star/redeemModal'

const DashboardPage = (props) => {
    const emailValidate = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const BASE_URL = useContext(baseUrlThinkly);
    const [penName, setpenName] = useState()
    const [supporterData, setsupporterData] = useState()
    const [show, setShow] = useState(false); //for reedem modal
    const [getEmail, setEmail] = useState(false)
    const [EmailInput, setEmailInput] = useState()
    const [ErrorMsg, setErrorMsg] = useState('')
    const [openInAppUrl, setopenInAppUrl] = useState(null)  //dynamic link for mob
    const [authorID, setAuthorID] = useState(props.authorID)
    const [UserBalance, setUserBalance] = useState(props.UserBalance)

    useEffect(() => {
        if (props.profileJson !== undefined && props.profileJson !== null && props.supporterData !== undefined) {
            const name = props.profileJson.profileDetails.penName
            const data = name.charAt('@') ? name.substring(1) : name
            setpenName(data)
            setsupporterData(props.supporterData)
        } else if (props.authorID !== undefined && props.UserBalance !== undefined) {
            setAuthorID(props.authorID)
            setUserBalance(props.UserBalance)
        }
    }, [])

    useEffect(() => {
        if (penName !== undefined) {
            console.log("penName @@", penName);
            const link = "https://app.thinkly.me/?&apn=com.me.digicita.thinkly.dev&ibi=com.Thinkly.Thinkly&imv=10.0&isi=1329943323&link=https://test.thinkly.me/thinkly/@" + penName
            setopenInAppUrl(link)  //for mobile view open in app dynamic link
        }
    }, [penName])

    const sendSignUpEmail = () => {  //send email to user for app link
        console.log("inside sign up email function", EmailInput);
        var config = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            data: {
                EventType: "SignUp",
                NotificationType: "Email",
                ReceiverHandle: EmailInput
            }
        }
        if (EmailInput.match(emailValidate)) {
            setErrorMsg()
            Axios(`${BASE_URL}Notification/SendEmailNotification`, config)
                .then((res) => {
                    if (res.data.responseCode === '00') {
                        console.log("success Send Email Notification");
                        setEmail(true)
                    } else {
                        console.log("inside .then other than 00 responseCode", res.data);
                    }
                })
                .catch((err) => {
                    console.log("inside catch", err);
                });
        } else {
            setErrorMsg("Please provide a valid email ID")
        }
    }

    const modalShow = () => {
        console.log("inside show modal");
        setShow(true); //on click show redeem modal
    }

    return (<>
        <div className='container'>
            <span className={isMobile ? 'fs-18 fw-mid' : 'fs-20 fw-mid'}>My True-fans</span> <hr />
            <div className='row mt-5'>
                <div className='col-6 mb-3'>
                    <Card className='py-2' style={{ border: 'lightgray 1px solid', borderRadius: '10px' }}>
                        <div className={isMobile ? 'fw-mid text-center fs-18' : 'fw-mid text-center fs-20'}>True-fans</div>
                        <div className={isMobile ? 'fw-bold text-center fs-20' : 'fw-bold text-center fs-24'}>{supporterData !== undefined && supporterData.TotalSupporters}</div>
                    </Card>
                </div>
                <div className='col-6'>
                    <Card className='py-2' style={{ border: 'lightgray 1px solid', borderRadius: '10px' }}>
                        <div className={isMobile ? 'fw-mid text-center fs-18' : 'fw-mid text-center fs-20'}>
                            {/* {isMobile ? 'Earnings' : 'Gross Income'} <span className='fs-15 fc-link pointer' data-toggle="modal" data-target="#redeemModal">Redeem</span> */}
                            {isMobile ? 'Earnings' : 'Gross Income'}
                            <button data-toggle="modal" data-target="#redeemModal" className='border-none text-center fs-18 fc-link bg-white fw-mid-bold ml-1' onClick={() => modalShow()}>Redeem</button>
                        </div>
                        <div className={isMobile ? 'fw-bold text-center fs-20' : 'fw-bold text-center fs-24'}> <Star style={{ marginTop: '-6px' }} />{supporterData !== undefined && supporterData.UserBalance} </div>
                        {/* <div className={isMobile ? 'fw-bold text-center fs-20' : 'fw-bold text-center fs-24'}> <Star style={{ marginTop: '-6px' }} />0 | <span>&#8377;</span>{supporterData !== undefined && supporterData.UserBalance}</div> */}
                    </Card>
                </div>
            </div>
            {props.profileJson !== undefined && penName !== undefined ? <div className='row mt-4 mb-4'>
                <div className='col-12'>
                    <Card className='text-center py-3' style={{ border: 'lightgray 1px solid', borderRadius: '10px' }}>
                        <FavoriteBorder style={{ color: '#ff8383', fontSize: '2rem' }} />
                        {isMobile ? <ListItemText primary={<span className='fw-bold fs-20'> {supporterData !== undefined && supporterData.TotalSupporters > 0 ? "Get more True-fan!" : "No True-fans yet!"} </span>}
                            secondary={<p className='fs-18'>Share your page with the world</p>} />
                            : <ListItemText primary={<span className='fw-bold fs-20'>
                                {supporterData !== undefined && supporterData.TotalSupporters > 0 ? "Get your fans to support you!" : "You don't have any True-fans yet!"}
                            </span>}
                                secondary={<p className='fs-18'>Share your page with the world</p>} />}
                        <ShareLink linkUrl={penName} />
                    </Card>
                </div>
            </div> : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                <CircularProgress aria-label="Loading..." />
            </div>}
            <Faq />
        </div>

        {/* modal for redeem */}
        <div id="myredeemModal" className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-background">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" onClick={() => setEmail(false)}>&times;</button>
                    <div className="modal-body px-4 py-2">
                        <div className="row">
                            {!getEmail ? <div className='col-12 text-center'>
                                <p className="font-weight-bold fs-20">Download the App to instantly redeem your income 😍</p>
                                <p className='fs-15'>Redeem Thinkly Stars for exciting rewards and many more features. Download the FREE Thinkly app now.</p>
                                {isMobile ? <>
                                    <div className="row text-center mb-3">
                                        <div className="col-6 text-right">
                                            <a href={openInAppUrl}>
                                                <Image src={'playStore.svg'} height={50} width={100} style={{ borderRadius: '10px' }} alt="Download button for Play store" />
                                            </a>
                                        </div>
                                        <div className="col-6 text-left">
                                            <a href={openInAppUrl}>
                                                <Image src={'appstore.svg'} height={50} width={100} alt="Download button for App store" />
                                            </a>
                                        </div>
                                    </div>
                                </> : <>
                                    <input id='email' className='email-link mt-3 fs-18 text-center ff-roboto' placeholder='Enter your Email ID' onChange={(e) => setEmailInput(e.target.value)} required /> <br />
                                    <label style={{ fontSize: '12px', color: 'red' }}>{ErrorMsg !== undefined && ErrorMsg !== null && ErrorMsg}</label> <br />
                                    <button type='button' className='fw-mid border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto' style={{ width: '60%' }} onClick={() => sendSignUpEmail()}>Send Download Link</button> <br />
                                    <p className='fs-15 mt-1' style={{ color: 'gray' }}>You will receive an email to download the app</p>
                                </>}
                            </div> : <div className='col-12 text-center'>
                                <CheckCircleOutline style={{ color: 'green', width: '80px', height: '80px' }} /> <br />
                                <h3>Download link sent</h3> <br />
                                <p style={{ marginTop: '-24px' }}>If you did not get the email, check your spam folder</p>
                                <button type="button" className="button1 mt-3 mb-4" data-dismiss="modal" onClick={() => setEmail(false)}>OK</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {show && <RedeemModal authorID={authorID} UserBalance={UserBalance} showModal={show} onChangeCallback={props.onChangeCallback} onChangeCallback1={props.onChangeCallback1}/>}
    </>)
}

export default DashboardPage