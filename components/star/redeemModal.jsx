import React, { useState, useEffect, useContext } from 'react'
import { CircularProgress, ListItemText } from '@material-ui/core'
import { Star } from '@material-ui/icons'
import $ from 'jquery'
import { baseUrlThinklyApi2 } from '../../pages/api/api'
import Axios from 'axios'

const RedeemModal = (props) => {
    const [UserBalance, setUserBalance] = useState(props.UserBalance)
    const [authorID, setAuthorID] = useState(props.authorID)
    const [myAllRewardsData, setMyAllRewardsData] = useState() //for StarAwards/Allrewards api
    const [redeemVoucherData, setRedeemVoucherData] = useState() //for StarAwards/RedeemVoucher api
    const BASE_URL_THINKLY_API2 = useContext(baseUrlThinklyApi2)
    const [StartIndex, setStartIndex] = useState(0)
    const [EndIndex, setEndIndex] = useState(10)
    const [couponStarCount, setCouponStarCount] = useState() //store Stars
    const [couponCatID, setCouponCatID] = useState() // store CatalogueID
    const [couponIndex, setCouponIndex] = useState() // store coupon index
    const [couponCatalogueName, setCouponCatalogueName] = useState() // store coupon CatalogueName
    const [redemption, setRedemption] = useState(false); //for redemption msg show
    const [loading, setLoading] = useState(false);
    const [redeemSuccessMsg, setRedeemSuccessMsg] = useState(false) //for redeem successful msg

    useEffect(() => {
        if (props.showModal !== undefined && props.UserBalance !== undefined && props.authorID !== undefined) {
            setAuthorID(props.authorID)
            setUserBalance(props.UserBalance)  //state
            if (props.showModal === true) {
                $('#redeemModal').modal('show')
            } else {
                $('#redeemModal').modal('hide')
            }
        }
        MyAllrewards() //function
    }, [])

    function scrollThinklies() {
        setStartIndex(EndIndex)
        setEndIndex(EndIndex + 10)
    }

    const MyAllrewards = () => {
        var config = {
            method: 'POST',
            data: {
                "touserID": authorID,
                "startIndex": StartIndex,
                "endIndex": EndIndex,
                "ChannelID": process.env.REACT_APP_CHANNEL_ID
            }
        }
        Axios(`${BASE_URL_THINKLY_API2}StarAwards/Allrewards`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const data = JSON.parse(res.data.responseData)
                    const rewardData = data.Table
                    if (myAllRewardsData !== undefined && myAllRewardsData.length > 0) {
                        setMyAllRewardsData(myAllRewardsData => [...myAllRewardsData, ...rewardData])
                        scrollThinklies()
                    } else {
                        setMyAllRewardsData(rewardData)
                    }

                }
            })
            .catch((err) => {
                // console.log("error of MyAllrewards", err);
            });

    }

    const RedeemVoucher = () => {
        $("#cancelbtn").attr('disabled', true);
        $("#modalcancelbtn").attr('disabled', true);
        setLoading(true) //to show loader on redeem now button
        var config = {
            method: 'POST',
            data: {
                "UserID": authorID,
                "CatID": couponCatID,
                "NoStars": couponStarCount,
                "ChannelID": process.env.REACT_APP_CHANNEL_ID
            }
        }
        Axios(`${BASE_URL_THINKLY_API2}StarAwards/RedeemVoucher`, config)

            .then((res) => {
                if (res.data.responseCode === '00') {
                    setRedemption(true)
                    setRedeemVoucherData(res.data.responseData)
                    setTimeout(() => {
                        setRedemption(false);
                        setLoading(false)
                    }, 3000);
                    setRedeemSuccessMsg(true)// true the redeem success state
                }
            })
            .catch((err) => {
                console.log("error of RedeemVoucher", err);
            });
    }

    const handleRedeemNowModal = (Stars, CatalogueID, index, CatalogueName) => {
        setCouponStarCount(Stars)
        setCouponCatID(CatalogueID)
        setCouponIndex(index)
        setCouponCatalogueName(CatalogueName)
    }

    const RedeemSuccessMsgOk = () => {
        $('#redeemNowModal').modal('hide')
        props.onChangeCallback(authorID)//recall for bal reflection
        props.onChangeCallback1(authorID)
    }


    return (<>
        <div className="modal fade" id="redeemModal" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" aria-hidden="true">×</button>
                    <div className="container">
                        <div className="modal-body" style={{ overflow: "scroll", height: "90vh" }}>
                            <div className={`fw-bold text-center fs-18`}>My Stars Balance</div>
                            <div className={'fw-bold text-center fs-30'}>
                                {UserBalance !== undefined ? UserBalance : '0'} <Star className='fc-primary' style={{ height: '40px', width: '40px', marginTop: '-10px' }} />
                            </div>
                            {myAllRewardsData !== undefined && myAllRewardsData.length > 0 ? myAllRewardsData.map((obj, index) => {
                                const imageUrl = obj.CatalogueImage !== undefined && obj.CatalogueImage.charAt(0) === '@' ? obj.CatalogueImage.substring(1) : obj.CatalogueImage //img url format
                                return (<div className='row' >
                                    <div className='col-12 px-3' style={{ backgroundImage: `url(${"/Rewards.svg"})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: "420px", width: "100%", padding: "55px" }}>
                                        <div className='row d-flex' key={index}>
                                            <div className='col-6 mx-auto'>
                                                <div className='row mb-4' >
                                                    <ListItemText className='col-8' style={{ height: "100px", textAlign: "left" }} primary={<h2 className='fs-18'>{obj.CatalogueName}</h2>} secondary={<p className='fs-12'>{obj.Description}</p>} />
                                                    <div className='col-4'>
                                                        <img src={imageUrl} style={{ height: "80px", width: "80px" }} alt='image' />
                                                    </div>
                                                </div>
                                                <hr style={{ borderTop: "1px dashed #8f8f8f", width: "100%" }} />
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                    <button data-toggle="modal" data-target="#redeemNowModal" className='text-center w-96 border-none height-button' onClick={() => handleRedeemNowModal(obj.Stars, obj.CatalogueID, index, obj.CatalogueName)} style={UserBalance < obj.Stars ? { background: "#8f8f8f" } : { background: "#ffefd0" }} >
                                                        {UserBalance < obj.Stars ? <>
                                                            <Star className='fc-primary' style={{ height: '35px', width: '35px' }} />
                                                            <span className='fw-mid-bold'>{obj.Stars} Stars </span>
                                                            <span className='fw-mid'>TO UNLOCK</span>
                                                        </> : <>
                                                            {redemption && couponIndex !== undefined && couponIndex === index ? <span>Voucher Redeem Done!!</span> : <>
                                                                <Star className='fc-primary' style={{ height: '35px', width: '35px' }} />
                                                                <span className='fw-mid-bold'>TAP TO </span>
                                                                <span className='fw-mid'>UNLOCK</span></>}
                                                        </>}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }) : <> {myAllRewardsData !== undefined && myAllRewardsData.length === 0 ? '' : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                                <CircularProgress aria-label="Loading..." />
                            </div>}
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {couponStarCount !== undefined && couponCatID !== undefined ? <div className="modal fade" id="redeemNowModal" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ backgroundImage: `url(${"/PopupBg"})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: "500px 310px", width: "100%" }}>
                <div className="modal-content" style={{ marginLeft: "25px", marginBottom: "55px", display: "block", width: "90%", maxWidth: "700px", border: "none" }}>
                    {redeemSuccessMsg ? <>
                        <div className="container-fluid"><div className='fs-16 fw-mid mb-2' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Congratulations! Your reward is redeemed successfully.</div>
                            <button className='mt-4 fw-normal fc-white border-none primary-bg-color fs-18 text-center height-button w-50' style={{ marginRight: "25%", marginLeft: "25%" }} onClick={() => RedeemSuccessMsgOk()}>Ok</button></div></> :
                        <div className="container" style={{ height: "230px" }}>
                            {couponStarCount <= UserBalance ? <>
                                <div className="modal-body" >
                                    <button id='modalcancelbtn' type="button" className="close text-right pr-1" data-dismiss="modal" aria-hidden="true">×</button>
                                    <div className='container'>
                                        <div className='fw-bold fs-26 mt-5' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Redeem {couponStarCount} stars </div>
                                        <div className='fw-mid fs-14 mt-2' style={{ textAlign: "center" }}>You're redeeming {couponStarCount} Stars for <span style={{ textDecoration: "underline" }}>{couponCatalogueName}</span> reward</div>
                                    </div>
                                    <button className='mt-4 fw-normal fc-white border-none primary-bg-color fs-18 text-center height-button w-50' style={{ marginRight: "25%", marginLeft: "25%" }} onClick={() => RedeemVoucher()}>
                                        {loading ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : <>Redeem Now</>}
                                    </button>
                                </div></> : <>
                                <div className="modal-body">
                                    <div className="container-fluid">
                                        <div className='fs-18 fw-mid mt-5' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>You need {couponStarCount} stars to unlock this coupon!</div>
                                        <button className='bg-verylightgray fc-primary border-color-primary height-button fs-18 w-50 fw-mid mt-5' style={{ marginRight: "25%", marginLeft: "25%" }} data-dismiss="modal">Ok</button>
                                    </div>
                                </div>
                            </>}
                        </div>}
                </div>
            </div>
        </div> : <div style={{ padding: '150px 0px', textAlign: 'center' }}><CircularProgress aria-label="Loading..." /></div>}
    </>)
}

export default RedeemModal