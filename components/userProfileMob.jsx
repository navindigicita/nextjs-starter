import React, { useState, useEffect, useContext } from 'react'
import Axios from "axios"
import $ from 'jquery'
import Link from 'next/link';
import { AssignmentIndOutlined, Star } from '@material-ui/icons'
import { Avatar, Tab, Tabs, withStyles, CardMedia, CircularProgress, ListItemText } from '@material-ui/core'
import Audio_Icon from '../public/audio-icon.svg'
import Video_Icon from '../public/video-icon.svg'
import { Card } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { baseUrl, baseUrlThinkly } from '../pages/api/api'
import Faq from './common/faq'
import { isMobile } from 'react-device-detect'

const StyledTabs = withStyles({
    indicator: {
        indicator: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            position: 'sticky',
            "& > span": {
                maxWidth: 40,
                width: "100%",
                //   backgroundColor: "#fffcef",
            },
        },
    },
})((props) => (<Tabs {...props} variant="fullWidth" TabIndicatorProps={{ children: <span /> }} />));

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        color: "#000000",
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(16),
        // marginRight: theme.spacing(0),
        "&:focus": {
            opacity: 1,
            outline: 'none'
        },
    },
}))((props) => <Tab disableRipple {...props} />);

const UserProfileMob = (props) => {
    const emailValidate = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const BASE_URL = useContext(baseUrl);
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const { handleSubmit, formState } = useForm(); //for form submit
    const [value, setValue] = useState(0);
    const [getProfileDetail, setProfileDetail] = useState()
    const [getThinkliesByAuthorData, setThinkliesByAuthorData] = useState()
    const [getPublicationByAuthorData, setPublicationByAuthorData] = useState()
    const [showModal, setShowModal] = useState(false);
    const [viewFullProfile, setviewFullProfile] = useState(false)
    const [starCount, setstarCount] = useState(0)
    const [finalAmount, setfinalAmount] = useState(0)
    const [getpenName, setpenName] = useState()
    const [getProfileImage, setProfileImage] = useState()
    const [starPrice, setstarPrice] = useState(0)
    const [currency, setcurrency] = useState()
    const [Remarks, setRemarks] = useState()
    const [isReadMore, setIsReadMore] = useState(true);
    const [UserDetail, setUserDetail] = useState()
    const [emailID, setemailID] = useState()
    const [numberInfo, setnumberInfo] = useState()
    const [SupportButton, setSupportButton] = useState(true)

    useEffect(() => {
        setProfileDetail(props.userProfileJson)
        // setThinkliesByAuthorData(props.userThinklyJson)
        // setPublicationByAuthorData(props.userPublilcationJson)
    }, [])

    useEffect(() => {
        if (getProfileDetail !== undefined && getProfileDetail !== null) {
            console.log("get profile detail json", getProfileDetail);
            const penName = getProfileDetail.profileDetails.penName.charAt(0) === '@' ? getProfileDetail.profileDetails.penName.substring(1) : getProfileDetail.profileDetails.penName
            setpenName(penName)
            const image = getProfileDetail.profileDetails.profileImage.charAt(0) === '@' ? getProfileDetail.profileDetails.profileImage.substring(1) : getProfileDetail.profileDetails.profileImage
            setProfileImage(image)
        }
    }, [getProfileDetail])

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };

    function getAmountForStar(star_count) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": "123456",
                "UserID": "3223"
            },
        };
        Axios.get(`${BASE_URL_THINKLY}Star/GetStarPriceDetails`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    var fixAmount = res.data.responseData.starPriceData
                    var amount = star_count * parseInt(fixAmount.perStarPrice)
                    setcurrency(fixAmount.currencySymbol)
                    setfinalAmount(amount)
                }
            })
            .catch((err) => {
                console.log("getAmountForStar error in catch", err);
            });
    }

    const handleStar = (star) => {
        setstarCount(star)  //set starCount in state
        setSupportButton(false)
        getAmountForStar(star)
        if (star === 1) {
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("oneStar").className = "numberCircleBorder"
        } else if (star === 3) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircleBorder"
        } else if (star === 5) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircleBorder"
        } else if (star === 10) {
            document.getElementById("oneStar").className = "numberCircle"
            document.getElementById("threeStar").className = "numberCircle"
            document.getElementById("fiveStar").className = "numberCircle"
            document.getElementById("Stars").className = "numberCircleBorder"
        }
    }

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    function onSubmit() {
        if (UserDetail === 'star') {
            var quantity = $('#qty').val();
            if (quantity !== undefined && quantity !== null && quantity > 0 && finalAmount !== undefined && finalAmount !== null) {
                $('#userContactInfo').modal('show')
            } else {
                document.getElementById('starCountError').innerHTML = 'Select how many Stars you wish to gift?'
            }
        } else if (UserDetail === 'userInfo') {
            if (emailID !== undefined && numberInfo !== undefined) {
                if (emailID.match(emailValidate) && numberInfo.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                    return new Promise(resolve => {
                        const form = document.createElement('form');
                        form.method = 'post'
                        form.action = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY
                        const data = [
                            { name: 'qty', value: starCount },
                            { name: 'receiver', value: getpenName },
                            { name: 'sender', value: "" },
                            { name: 'channel', value: "giftStars" },
                            { name: 'amount', value: finalAmount },
                            { name: 'remarks', value: Remarks },
                            { name: 'emailid', value: emailID },
                            { name: 'phone', value: numberInfo }
                        ]
                        for (let x = 0; x < data.length; x++) {
                            const hiddenField = document.createElement('input');
                            hiddenField.type = 'text';
                            hiddenField.name = data[x].name;
                            hiddenField.value = data[x].value;
                            hiddenField.style.display = 'none'
                            form.appendChild(hiddenField);
                        }
                        document.body.appendChild(form);
                        form.submit();
                        $('#userContactInfo').modal('hide');
                        resolve();
                    });
                } else {
                    document.getElementById('infoPlease').innerHTML = 'Please Enter valid EmailID and Contact number'
                }
            } else {
                document.getElementById('infoPlease').innerHTML = 'Please Enter Email ID and Contact number to continue'
            }
        }
    }

    return (<>
        {getProfileDetail !== undefined && getProfileDetail !== null ? <>
            <div className='row text-center header-gap'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <Avatar src={getProfileImage !== undefined ? getProfileImage : <AssignmentIndOutlined />} alt="user profile" style={{ width: '180px', height: '180px' }} />
                </div>
            </div>
            <div className='row text-center mt-2 mb-4'>
                <div className='col-12'>
                    <h6 className='fs-20 fw-bold'> {getpenName} </h6>
                    <div className='fs-18 fw-mid'>{getProfileDetail.profileDetails.firstName}  {getProfileDetail.profileDetails.lastName}</div>
                    <p className='fs-12 px-3' id='aboutMe'>
                        {getProfileDetail.profileDetails.aboutMe.length > 200 ? <>
                            {isReadMore ? getProfileDetail.profileDetails.aboutMe.slice(0, 200) : getProfileDetail.profileDetails.aboutMe}
                            <span onClick={toggleReadMore} className="read-or-hide">
                                {isReadMore ? "...read more" : " show less"}
                            </span>
                        </> : getProfileDetail.profileDetails.aboutMe}
                    </p>
                    <span data-toggle="modal" data-target="#myModal" className='fs-14 fc-link fw-mid-bold'>View Full Profile</span>
                </div>
            </div>

            {getpenName !== undefined && getpenName.toUpperCase() === 'DURGAJASRAJ' && <img src={'/durgajashraj.png'} alt="durgajasraj" className='mb-4' style={{ objectFit: 'cover', objectPosition: 'center', width: '100%' }} />}

            {getProfileDetail.profileDetails.isSupportEnabled === true && <>
                <Card className='mt-1' style={{ padding: '10px 20px 30px 20px', marginBottom: '30px', marginLeft: '8px', marginRight: '8px', marginTop: '8px', background: '#fff', width: '96%' }}>
                    <form name="paymentGateway" onSubmit={handleSubmit(onSubmit)}>
                        <div className='text-center'>
                            <p className='fw-mid mb-4'>Gift <Star className='star-color' style={{ marginTop: '-4px' }} /> to {getpenName}. Become a True-fan!</p>
                            <div className='row ml-1'>
                                <div className='col-1' style={{ marginLeft: '0px', marginRight: '22px', marginTop: '-3px' }}>
                                    <img src={'/star.svg'} style={{ width: '36px', height: '36px' }} />
                                </div>
                                <div className='col-1' style={{ fontSize: '22px' }}> x </div>
                                <div className='col-2 mt-1'>
                                    <span class="numberCircle" id="oneStar" onClick={() => handleStar(1)}> 1 </span>
                                </div>
                                <div className='col-2 mt-1'>
                                    <span class="numberCircle" id="threeStar" onClick={() => handleStar(3)}> 3 </span>
                                </div>
                                <div className='col-2 mt-1'>
                                    <span class="numberCircle" id="fiveStar" onClick={() => handleStar(5)}> 5 </span>
                                </div>
                                <div className='col- mt-1'>
                                    <span class="numberCircle" id="Stars" style={{ padding: '10px', marginLeft: '13px' }} onClick={() => handleStar(10)}> 10 </span>
                                </div>
                            </div>
                            <input type='text' name='qty' id='qty' value={starCount} style={{ display: 'none' }} />
                            <textarea className='mt-3 w-96' name='remarks' id='remarks' rows={4} cols={40} type="text" maxLength={1000} value={Remarks} onChange={(e) => setRemarks(e.target.value)} style={{ outline: 'none', border: '1px solid lightgray' }} placeholder="Say something nice... (Optional)"></textarea>
                            {starCount > 0 ? '' : <div id="starCountError" className='error-msg'></div>}
                            <button onClick={() => setUserDetail('star')} className={`mt-3 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 w-96 ${finalAmount <= 0 ? 'bg-gray' : 'primary-bg-color'}`} id='getStarValue' disabled={SupportButton}>
                                Support {!SupportButton && starCount}<Star style={{ color: 'antiquewhite', marginTop: '-5px' }} /> to {getpenName} {currency}{finalAmount}
                            </button>
                        </div>
                        {/* popup modal box for user information to pass on payment gateway page */}
                        <div id="userContactInfo" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <button type="button" class="close text-right pr-2" data-dismiss="modal" >&times;</button>
                                    <div class="modal-body px-5 pb-4 pt-1">
                                        <h5 className='text-center mb-4'>We need some details to send you a receipt</h5>
                                        <input type='text' placeholder='Your email ID' value={emailID} onChange={(e) => setemailID(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                        <br /><br />
                                        <input type='text' placeholder='Your mobile number' value={numberInfo} onChange={(e) => setnumberInfo(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                                        <br /><br />
                                        {<div id="infoPlease" className='error-msg'></div>}
                                        <div className='text-center'>
                                            <button type='submit' className='mt-3 pointer fw-mid border-radius-4 fc-white border-none height-button fs-18 w-50 primary-bg-color' onClick={() => setUserDetail('userInfo')} >Continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>
            </>}

            <div className="mx-4 mt-2">
                <Faq />
            </div>
            {/* not in use for now */}
            {viewFullProfile && <>
                <div>
                    <StyledTabs value={value} onChange={handleChangeTabs} aria-label="styled tabs" >
                        <StyledTab label="Publications" />
                        <StyledTab label="Thinklies" />
                    </StyledTabs>
                </div>
                <div className='p-3'>
                    {(value === 0 ? <div className='row d-flex mb-5'>
                        {getPublicationByAuthorData !== undefined && getPublicationByAuthorData !== null && getPublicationByAuthorData.length > 0 && getPublicationByAuthorData.map((obj) => {
                            var img_extension = '.' + (obj.publicationImage.split(/[#?]/)[0].split('.').pop())
                            return (<div className='col-6'>
                                <Card className="mx-auto mb-4" style={{ width: '125px', boxShadow: 'none', background: 'rgba(247, 247, 247, 0.49)' }}>
                                    {(/.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(img_extension) ?
                                        <CardMedia component="img" height="140" image={obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} alt="publication profile" />
                                        : <div style={{ background: '#ea7f00', height: '140px' }}></div>
                                    }
                                    <div className='px-2 pt-1'>
                                        <text style={{ fontSize: '12px', fontWeight: 'bold' }}>{obj.publicationName}</text> <br />
                                        <a href='#morepublication' data-toggle="modal" data-target="#myModal" onClick={() => setShowModal(true)} style={{ color: '#2baadf', fontSize: '12px', fontFamily: 'sans-serif' }}>View the Publication</a>
                                    </div>
                                </Card>
                            </div>)
                        })}
                    </div> : <div className='row mb-5'>
                        {getThinkliesByAuthorData !== undefined && getThinkliesByAuthorData !== null && getThinkliesByAuthorData.length > 0 && <>
                            {getThinkliesByAuthorData.map((obj) => {
                                var image1 = obj.postData.postImages[0];
                                var isAudio = obj.postData.audioURL;
                                var isVideo = obj.postData.videoURL;
                                return (<Card className="col-12 card-view-publication">
                                    <div className='row d-flex'>
                                        {image1 !== undefined ? <div className='col-3'>
                                            <img className='Upublilcation-image-mob' src={image1.charAt(0) === '@' ? image1.substring(1) : image1} alt="user profile" />
                                            {isAudio !== undefined && isAudio !== "" ? <img src={Audio_Icon} className='thinkly-type-icon1-mob' /> :
                                                isVideo !== undefined && isVideo !== "" ? <img src={Video_Icon} className='thinkly-type-icon1-mob' /> : ''}
                                        </div> : <div className='col-3 Upublilcation-no-image-mob mx-3'>
                                            {isAudio !== undefined && isAudio !== "" ? <img src={Audio_Icon} className='thinkly-type-icon2-mob' /> :
                                                isVideo !== undefined && isVideo !== "" ? <img src={Video_Icon} className='thinkly-type-icon2-mob' /> : ''}
                                        </div>}
                                        <div className='col-8 my-auto'>
                                            <p className='' style={{ fontSize: '16px', lineHeight: '1.3' }}> {obj.postData.postTitle} </p>
                                        </div>
                                    </div>
                                </Card>)
                            })}
                        </>}
                    </div>)}
                </div>
            </>}
            {/* open in app section */}
            {isMobile && <div className="row">
                <section className="bottom-section-mob">
                    <div className="top-hr-colored"></div>
                    <div className="col-12 py-2">
                        <ListItemText primary={<span className='fs-15 fw-bold'>Get The Thinkly App</span>}
                            secondary={<span className='fs-12'>Read all Publications and more on the App</span>} />
                        <button className='float-right downloadLink-button' style={{ marginTop: '-45px' }}>
                            <Link href={process.env.NEXT_PUBLIC_DYNAMIC_OPEN_IN_APP + `https://thinkly.me/${getpenName}`}> OPEN IN APP </Link>
                        </button>
                    </div>
                </section>
            </div>}
        </> : <div style={{ padding: '100px', textAlign: 'center' }}>
            <CircularProgress aria-label="Loading..." />
        </div>
        }
    </>)
}

export default UserProfileMob
