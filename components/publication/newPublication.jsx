import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import Axios from "axios";
import Image from 'next/image';
import { Card } from 'react-bootstrap';
import { List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { PeopleAltOutlined, Edit, EventAvailableOutlined, EmailOutlined } from '@material-ui/icons';
import { baseUrlThinkly } from '../../pages/api/api';
import NewThinkly from '../posts/newThinkly';
// import Collabrate from './addCoAuthor.jsx';
// import Publication from './publication.jsx';

const NewPublication = (props) => {
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const [AuthorID, setAuthorID] = useState()
    const [welcomeSlide, setwelcomeSlide] = useState(false);
    const [aboutSlide, setaboutSlide] = useState(false);
    const [descriptionSlide, setDescriptionSlide] = useState(false);
    const [subscriptionSlide, setsubscriptionSlide] = useState(false);
    const [InterestSlide, setInterestSlide] = useState(false);
    const [Interest, setInterest] = useState()
    const [successSlide, setSuccessSlide] = useState(false)
    const [OpenCollabrate, setOpenCollabrate] = useState(false)
    const [OpenCreateThinkly, setOpenCreateThinkly] = useState(false)
    const [OpenShare, setOpenShare] = useState(false)
    const [OpenPublicationPage, setOpenPublicationPage] = useState(false)
    const [planIndex, setplanIndex] = useState('');
    const [arrayList, setarrayList] = useState([]);
    const [pubName, setpubName] = useState('');   // store input data and pass in api
    const [showImage, setshowImage] = useState(false);
    const [pubImage, setpubImage] = useState('');
    const [webUrl, setwebUrl] = useState('');
    const [penNameResponse, setpenNameResponse] = useState();
    const [pen_name_pub, setpen_name_pub] = useState('')
    const [shortDescription, setshortDescription] = useState('');
    const [description, setdescription] = useState('');
    const [price, setprice] = useState('');
    const [PlanDetailData, setPlanDetailData] = useState();
    const [color, setcolor] = useState(['#f3a56c', '#c37d8d', '#3c7493', '#7ec2bf']);

    useEffect(() => {
        if (props.authorID !== undefined) {
            $('#newPublication').modal('show')
            setAuthorID(props.authorID)
            setwelcomeSlide(true)
            setshowImage(false)
        }
    }, [])

    const closeFunction = () => {
        localStorage.clear()
        setwelcomeSlide(true)
        setshowImage(false)
    }

    const hideWelcomeAndShowAbout = () => {
        setwelcomeSlide(false)
        setaboutSlide(true)
    }

    const uploadImage = (event) => {
        const chooseFile = $("#choose-file");
        const imgPreview = $("#img-preview");
        const files = chooseFile.files[0];  //in case multiple image got selected then pick 1st one only
        const str = files.type;
        const image_extension = str.substring(str.indexOf('/') + 1)
        const myRenamedFile = new File([files], `${AuthorID}_${files.lastModified}.${image_extension}`)
        if (myRenamedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(myRenamedFile);
            fileReader.addEventListener("load", function () {
                imgPreview.innerHTML = '<Image src="' + this.result + '" alt="pImage" />';
            });
        }
        setshowImage(true)
        setpubImage(myRenamedFile)
    }

    const hideAboutandShowDescription = () => {
        if (pubName === '') {
            $('#pubNameError').innerHTML = 'Please Enter the publication Name'
        } else if (pubImage === '') {
            $('#pubImageError').innerHTML = 'Please select an Image for publication Profile'
        } else {
            window.localStorage.setItem('Publication Name', pubName)
            window.localStorage.setItem('Publication Image', pubImage.name)
            var data = new FormData(); // api call for upload Image in azure
            data.append("FileName", pubImage);
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
            Axios.post(`${BASE_URL_THINKLY}Image/PostUploadFile/${pubImage.name}`, data, config)
                .then((res) => {
                    console.log("PostUploadFile@@@@@@@@", res);
                    setaboutSlide(false)  //hide about page
                    setDescriptionSlide(true)   //show description page
                })
                .catch((err) => {
                    console.log("PostUploadFile error in catch", err);
                    $('#pubImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
                });
        }
    }

    const fetchPenName = (e) => {
        var pen_name = e.target.value
        setwebUrl(pen_name)
        if (pen_name.length >= 5 || pen_name.length === 15) {
            var config = {
                headers: {
                    DeviceID: '123456',
                    UserID: AuthorID
                }
            }
            Axios.get(`${BASE_URL_THINKLY}Publication/IsPennameAvailable/@${pen_name}`, config)
                .then((res) => {
                    if (res.data.responseCode === '00') {
                        const response = res.data.responseData.available;
                        setpenNameResponse(response)
                        if (response === false) {
                            $('#penNameError').innerHTML = 'This Pen name is already taken'
                        }
                    }
                })
                .catch((err) => {
                    console.log("IsPennameAvailable error in catch", err);
                });
        }
    }

    const hideDescriptionAndShowPlan = () => {
        if (webUrl === '' || webUrl.length === 0) {
            $('#UrlError').innerHTML = 'please Enter the publication pen name'
        } else if (shortDescription === '') {
            $('#shortDescriptionError').innerHTML = 'please Enter about the publication'
        } else if (description === '') {
            $('#descriptionError').innerHTML = 'please Enter the publication description'
        } else if (webUrl.length > 1 && webUrl.length < 5) {
            $('#penNameError').innerHTML = 'Please match the requested format(Should include minimum 5 characters, maximum 15 characters, no space, no special characters except _). '
        } else {
            window.localStorage.setItem('Web URL', webUrl)
            window.localStorage.setItem('Short Description', shortDescription)
            window.localStorage.setItem('Description', description)
            setDescriptionSlide(false)
            setsubscriptionSlide(true)
            planDetail()
        }
    }

    const handleSubscription = (event, index) => {
        console.log("index", index);
        var planType = '';
        if (index === '') {
            $('#planError').innerHTML = 'Please select subscription plan for this publication'
        } else if (index !== '' && index === 0) {
            planType = 'Free'
            window.localStorage.setItem('Plan', planType)
        } else if (index !== '' && index === 1) {
            setprice('')
            planType = 'Monthly'
            window.localStorage.setItem('Plan', planType)
        } else if (index !== '' && index === 2) {
            setprice('')
            planType = 'OneTime'
            window.localStorage.setItem('Plan', planType)
        }
        setplanIndex(index);
    };

    const hidePlanAndShowInterest = () => {
        if (planIndex === '') {
            $('#planError').innerHTML = 'Please select subscription plan for this publication'
        } else if (planIndex === 0) {
            setsubscriptionSlide(false)
            setInterestSlide(true)
        } else if (planIndex === 1) {
            if (price !== undefined && price !== null && price !== '' && price % 10 === 0) {
                window.localStorage.setItem('Monthly cost', price)
                setsubscriptionSlide(false)
                setInterestSlide(true)
            } else {
                $('#mPriceError').innerHTML = 'Enter valid amount'
            }
        } else if (planIndex === 2) {
            if (price !== undefined && price !== null && price !== '' && price % 10 === 0) {
                window.localStorage.setItem('oneTime cost', price)
                setsubscriptionSlide(false)
                setInterestSlide(true)
            } else {
                $('#otPriceError').innerHTML = 'Enter valid amount'
            }
        }
    }

    const planDetail = () => {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": "21723"
            }
        };
        Axios.get(`${BASE_URL_THINKLY}Publication/GetPublicationPlanForDeviceType/AND`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    console.log("GetPublicationPlanForDeviceType ", res.data.responseData);
                    setPlanDetailData(res.data.responseData)
                }
            })
            .catch((err) => {
                console.log("GetPublicationPlanForDeviceType error in catch", err);
            });
    }

    useEffect(() => {
        console.log("PlanDetailData@@@@", PlanDetailData);
    }, [PlanDetailData]);

    // json called for all interest list
    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_INTEREST_JSON)
            .then(response => response.json())
            .then((data) => {
                console.log('interest list', data)
                setInterest(data)
            });
    }, []);

    const handleInterest = (index) => {
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            $(`#${index}`).style.background = random_color;
            setarrayList(oldData => [...oldData, index])
        } else
            if (arrayList.length > 0 && arrayList.find(element => element === index)) {
                $(`#${index}`).style.background = 'none';
                setarrayList(arrayList.filter(item => item !== index));
            } else {
                $(`#${index}`).style.background = random_color;
                setarrayList(oldData => [...oldData, index])
            }
    }

    const hideInterestAndShowSuccess = () => {
        if (arrayList.length < 3) {
            $('#InterestError').innerHTML = 'Please select at least 3 interest'
        } else {
            console.log("array of interest", arrayList);
            createPublication()
        }
    }

    const createPublication = () => {
        var publication_name = window.localStorage.getItem('Publication Name')
        var publication_image = window.localStorage.getItem('Publication Image')
        var publication_description = window.localStorage.getItem('Description')
        var publication_Shortdescription = window.localStorage.getItem('Short Description')
        var publication_penName = window.localStorage.getItem('Web URL')
        setpen_name_pub(publication_penName)
        var publication_plan = window.localStorage.getItem('Plan')
        var publication_payType = ''
        if (publication_plan === 'Free') {
            publication_payType = 'Free'
        } else {
            publication_payType = 'Paid'
        }
        if (PlanDetailData !== undefined) {
            var plan_free = PlanDetailData.findIndex(function (obj) {
                return obj.name == "Free"
            })
            var plan_monthly = PlanDetailData.findIndex(function (obj) {
                return obj.name == 'Monthly Subscription'
            })
            var plan_oneTime = PlanDetailData.findIndex(function (obj) {
                return obj.name == 'OneTimePayment'
            })
        }
        var monthly_plan = 0
        var oneTime_plan = 0
        var free_plan = 0
        var publication_planID = ''
        var starPrice = ''
        var finalPrice = 0
        if (publication_plan === 'Monthly') {
            monthly_plan = window.localStorage.getItem('Monthly cost')
            publication_planID = PlanDetailData[plan_monthly].publicationPlanID
            starPrice = parseInt(monthly_plan) / PlanDetailData[plan_monthly].perStarPrice
            finalPrice = monthly_plan
        } else if (publication_plan === 'OneTime') {
            oneTime_plan = window.localStorage.getItem('oneTime cost')
            publication_planID = PlanDetailData[plan_oneTime].publicationPlanID
            starPrice = parseInt(oneTime_plan) / PlanDetailData[plan_oneTime].perStarPrice
            finalPrice = oneTime_plan
        } else if (publication_plan === 'Free') {
            publication_planID = PlanDetailData[plan_free].publicationPlanID
            starPrice = parseInt(free_plan) / PlanDetailData[plan_free].perStarPrice
            finalPrice = finalPrice
        }

        var data = new FormData();
        data.append("channelID", "3");
        data.append("name", publication_name);
        data.append("about", publication_description);
        data.append("image", publication_image);
        data.append("createdBy", AuthorID);
        data.append("shortDes", publication_Shortdescription);
        data.append("category", arrayList.toString());
        data.append("authorsID", "");
        data.append("payType", publication_payType);
        data.append("oTCharge", oneTime_plan);
        data.append("moCharge", monthly_plan);
        data.append("penName", "@" + publication_penName);
        data.append("aboutUs", "");
        data.append("publicationPlanID", publication_planID);
        data.append("noOfStars", starPrice);
        data.append("publicationPrice", finalPrice);

        var config = {
            headers: {
                DeviceID: "123456",
                UserID: AuthorID
            }
        };
        Axios.post(`${BASE_URL_THINKLY}Publication/CreatePublication`, data, config)
            .then((res) => {
                console.log("createPublication", res);
                setInterestSlide(false)
                setSuccessSlide(true)
            })
            .catch((err) => {
                console.log("createPublication error in catch", err);
            });
    }

    const handleCollabrate = () => {
        $('#newPublication').modal('hide')
        setOpenCollabrate(true)
    }

    const handleNewThinkly = () => {
        $('#newPublication').modal('hide')
        setOpenCreateThinkly(true)
    }

    const handleShare = () => {
        $('#newPublication').modal('hide')
        setOpenShare(true)
    }

    const fetchOpenPublication = () => {
        $('#newPublication').modal('hide')
        setOpenPublicationPage(true)
    }

    return (<>
        <div id="newPublication" className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-background">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" onClick={() => closeFunction()} >&times;</button>
                    {welcomeSlide ? <div className="modal-body py-3 px-5">
                        <h6 className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}> Create Your Publication </h6>
                        <p className='text-center'> Thinkly provides a one stop solution for all your publication needs.</p>
                        <List style={{ display: 'grid', justifyContent: 'center' }}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Edit style={{ color: '#3c7493', width: '28px', height: '28px' }} />
                                </ListItemAvatar>
                                <ListItemText primary={<b>Customize</b>} secondary="Add cover image, title, subline" />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <EventAvailableOutlined style={{ color: '#c37d8d', width: '28px', height: '28px' }} />
                                </ListItemAvatar>
                                <ListItemText primary={<b>Editorial freedom</b>} secondary="Play your own publication time" />
                            </ListItem>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <EventAvailableOutlined style={{ color: '#c37d8d', width: '28px', height: '28px' }} />
                                </ListItemAvatar>
                                <i className="fa-solid fa-indian-rupee-sign"></i>
                                <ListItemText primary={<b>Get Paid</b>} secondary="Earn through your content" />
                            </ListItem>
                        </List>
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideWelcomeAndShowAbout()}>START</button>
                        </div>
                    </div> : aboutSlide ? <div className="modal-body py-3 px-5">
                        <div className='row d-flex'>
                            <p className='mx-auto' style={{ fontSize: '18px', fontWeight: 'bold' }}> About publication </p>
                        </div>
                        <div className='row d-flex'>
                            <div className='col-10 mx-auto'>
                                <input type="text" minLength='2' maxLength='30' className='bottomline-textbox' id='publication_title'
                                    placeholder='Choose a catchy title (max 30 characters)' value={pubName} onChange={(e) => setpubName(e.target.value)} />
                                {pubName === '' ? <div id="pubNameError" className='error-msg'></div> : ''}
                            </div>
                        </div>
                        <div className='row d-flex'>
                            <div className='col-10 mx-auto text-center mt-2'>
                                <Card className='mx-auto' id="img-preview" value={pubImage} style={{ height: 'auto', width: '200px', border: 'none', display: 'inline-flex' }}> </Card>
                                <div className='type-file-hide'>
                                    <input type='file' name='choose-file' accept="image/*" id='choose-file' onChange={(e) => uploadImage(e.target.value)} />
                                    <label htmlFor='choose-file' style={{ fontSize: '16px', fontFamily: 'Lora', color: '#3c7493' }}>
                                        {!showImage ? <span> Add Publication Picture*</span> : <span> Update Publication Picture</span>}
                                    </label>
                                    {pubImage === '' ? <div id="pubImageError" className='error-msg'></div> : ''}
                                    <div id="pubImageUploadError" className='error-msg'></div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideAboutandShowDescription()}>NEXT</button>
                        </div>
                    </div> : descriptionSlide ? <div className="modal-body py-3 px-5">
                        <div className='row d-flex'>
                            <p className='mx-auto' style={{ fontSize: '18px', fontWeight: 'bold' }}> Publication Description </p>
                        </div>
                        <div className='row'>
                            <div className='col-12 mb-2'>
                                <label style={{ fontSize: '12px', fontFamily: 'Lora', fontWeight: 'bold' }}>Web URL*</label>
                                <label style={{ fontSize: '12px' }}>Unique url for your publication. Choose wisely! This cannot be changed after the Publication is created.</label>
                                <div className='row'>
                                    <div className='col-4'>
                                        <b>www.thinkly.me/</b>
                                    </div>
                                    <div className='col-8'>
                                        <input type="text" id='web-url' className='interest-textbox' minLength='2' maxLength='20'
                                            value={webUrl} onChange={(e) => fetchPenName(e)} />
                                    </div>
                                </div>
                                {webUrl === '' || webUrl.length === 0 ? <div id="UrlError" className='error-msg'></div> : ''}
                                {penNameResponse === false || (webUrl.length > 1 && webUrl.length < 5) ? <div id="penNameError" className='error-msg'></div> : ''}
                            </div>
                            <div className='col-12 mb-2'>
                                <label style={{ fontSize: '12px', fontFamily: 'Lora', fontWeight: 'bold' }}>What is it about?*</label>
                                <input type="text" id='pub-about' className='interest-textbox' minLength='2' maxLength='50' placeholder='E.g. "Fitness is forever" (max 50 characters)'
                                    value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} />
                                {shortDescription === '' ? <div id="shortDescriptionError" className='error-msg'></div> : ''}
                            </div>
                            <div className='col-12'>
                                <label style={{ fontSize: '12px', fontFamily: 'Lora', fontWeight: 'bold' }}>Description*</label>
                                <textarea id='description' className='interest-textbox' minLength='2' maxLength='1000' rows={5}
                                    value={description} onChange={(e) => setdescription(e.target.value)}
                                    placeholder='Tell people why their lives will be letter by reading your publication. Explain the value, rather then the content!'>
                                </textarea>
                                {description === '' ? <div id="descriptionError" className='error-msg'></div> : ''}
                            </div>
                        </div>
                        <div className='text-center my-4'>
                            {/* <button className='button-new-publication mr-4' style={{ width: '40%', background: '#fff', color: '#e98c37', border: 'solid 2px #e98c37' }} onClick={() => hideWelcomeAndShowAbout()}>BACK</button> */}
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideDescriptionAndShowPlan()}>NEXT</button>
                        </div>
                    </div> : subscriptionSlide ? <div className="modal-body py-3 px-5">
                        <div className='row d-flex'>
                            <h6 className='mx-auto' style={{ fontSize: '22px', fontWeight: 'bold' }}>Subscription Plan</h6>
                            <p>For paid plans, you will get paid in Starts which can be redeemed from the &quot;My Stars&quot; page.</p>
                        </div>
                        {/* free */}
                        <div className='row mt-4 px-3' selected={planIndex === 0} onClick={(event) => handleSubscription(event, 0)}>
                            <input type='radio' name='plan' value='Free' style={{ width: '20px', height: '20px' }} />
                            <ListItemText style={{ marginTop: '-32px', marginLeft: '36px', marginBottom: '-10px' }}
                                primary={<div style={{ fontFamily: 'Lora', fontWeight: 'bold' }}>Free</div>}
                                secondary={<div>
                                    <p> Subscribers can read all Thinkles in this publication for free</p>
                                </div>} />
                        </div>
                        <hr />
                        {/* monthly */}
                        <div className='row mt-4 px-3' selected={planIndex === 1} onClick={(event) => handleSubscription(event, 1)}>
                            <input type='radio' name='plan' value='Monthily Subscription' style={{ width: '20px', height: '20px' }} />
                            <ListItemText style={{ marginTop: '-32px', marginLeft: '36px', marginBottom: '-10px' }}
                                primary={<div style={{ fontFamily: 'Lora', fontWeight: 'bold' }}>Monthly Subscription</div>}
                                secondary={<div>
                                    <p> Subscribers will apy a fixed monthly amount to read all Thinklies in this publication</p>
                                </div>} />
                        </div>
                        {planIndex === 1 && <> <input type='number' id='planPrice' className='interest-textbox' minLength={1} maxLength={3} value={price}
                            placeholder="Amount should be multiple of 10" onChange={(e) => setprice(e.target.value)} />
                            {price !== '' && price !== undefined && price % 10 === 0 ? '' : <label id='mPriceError' className='error-msg text-center' />}
                        </>}
                        <hr />
                        {/* one time */}
                        <div className='row mt-4 px-3' selected={planIndex === 2} onClick={(event) => handleSubscription(event, 2)}>
                            <input type='radio' name='plan' value='OneTime Payment' style={{ width: '20px', height: '20px' }} />
                            <ListItemText style={{ marginTop: '-32px', marginLeft: '36px', marginBottom: '-10px' }}
                                primary={<div style={{ fontFamily: 'Lora', fontWeight: 'bold' }}>OneTime Payment</div>}
                                secondary={<div>
                                    <p> Subscribers will pay a fixed amount one time to read all Thinklies in this publication</p>
                                </div>} />
                        </div>
                        {planIndex === 2 && <> <input type='number' id='planPrice' className='interest-textbox' minLength={1} maxLength={3} value={price}
                            placeholder="Amount should be multiple of 10" onChange={(e) => setprice(e.target.value)} />
                            {planIndex === 2 && price !== '' && price !== undefined && price % 10 === 0 ? '' : <label id='otPriceError' className='error-msg text-center' />}
                        </>}
                        {planIndex === '' && <label id='planError' className='error-msg text-center' />}
                        <div className='text-center my-4'>
                            {/* <button className='button-new-publication mr-4' style={{ width: '40%' }} onClick={() => hideAboutandShowDescription()}>BACK</button> */}
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hidePlanAndShowInterest()}>NEXT</button>
                        </div>
                    </div> : InterestSlide ? <div className="modal-body py-3 px-5">
                        <h6 className='text-center' style={{ fontSize: '20px', fontWeight: 'bold' }}>Tag Interests*</h6>
                        <p className='text-center'>People with these interests will be able to discover this Publication</p>
                        <div className='interest-card'>
                            <div className='row d-flex'>
                                {Interest !== undefined && Interest.map((obj, index) => {
                                    return (<div key={index} className='col-4 mb-3' onClick={() => handleInterest(obj.CategoryID)}>
                                        <Card key={index} id={`${obj.CategoryID}`} className='sub-interest-card mx-auto my-auto' >
                                            {obj.CategoryDescription}
                                        </Card>
                                    </div>)
                                })}
                            </div>
                        </div>
                        {arrayList.length < 3 && <div id="InterestError" className='error-msg'></div>}
                        <div className='text-center my-4'>
                            {/* <button className='button-new-publication mr-4' style={{ width: '40%' }} onClick={() => hideDescriptionAndShowPlan()}>BACK</button> */}
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideInterestAndShowSuccess()}>NEXT</button>
                        </div>
                    </div> : successSlide && <div className="modal-body py-3 px-5">
                        <p className='text-center' style={{ fontSize: '22px', fontWeight: 'bold' }}>Congratulations, your Publication is ready!</p>
                        <div className='row d-flex'>
                            <label className='mx-auto text-center' style={{ fontSize: '18px', fontWeight: 'bold', background: '#ffe7cc', width: '80%' }}>www.thinkly.me/{pen_name_pub}</label>
                        </div>
                        <div className='row d-flex mt-4'>
                            <div className='col-12'>
                                <Card className='mx-auto pl-2 py-2 mb-3' style={{ width: '280px', border: 'none' }}>
                                    <PeopleAltOutlined style={{ color: '#7ec2bf', width: '28px', height: '28px' }} />
                                    <ListItemText style={{ marginTop: '-34px', marginLeft: '40px' }}
                                        primary={<b>Collaborate
                                            <a href='#AddcoAuthor' onClick={() => handleCollabrate()} style={{ fontSize: '12px', color: '#e98c37' }}>...Add co-author</a>
                                        </b>}
                                        secondary="Invite other Thinkliers to co-author your publication" />
                                </Card>
                            </div>

                            <div className='col-12'>
                                <Card className='mx-auto pl-2 py-2 mb-3' style={{ width: '280px', border: 'none' }} >
                                    <Edit style={{ color: '#c37d8d', width: '28px', height: '28px' }} />
                                    <ListItemText style={{ marginTop: '-34px', marginLeft: '40px' }}
                                        primary={<b>Create
                                            <a href='#AddThinkly' onClick={() => handleNewThinkly()} style={{ fontSize: '12px', color: '#e98c37' }}>...Create Thinkly</a>
                                        </b>}
                                        secondary="Write your first Thinkly" />
                                </Card>
                            </div>
                            <div className='col-12'>
                                <Card className='mx-auto pl-2 py-2 mb-3' style={{ width: '280px', border: 'none' }} >
                                    <EmailOutlined style={{ color: '#3c7493', width: '28px', height: '28px' }} />
                                    <ListItemText style={{ marginTop: '-34px', marginLeft: '40px' }}
                                        primary={<b>Share
                                            <a href='#shareLink' onClick={() => handleShare()} style={{ fontSize: '12px', color: '#e98c37' }}>...Share Link</a>
                                        </b>}
                                        secondary="Start spreading the word" />
                                </Card>
                            </div>
                        </div>
                        <div className='text-center my-4'>
                            <button className='button-new-publication mr-4' style={{ width: '60%', fontWeight: '500' }} onClick={() => fetchOpenPublication()}>Open Publication</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>

        {/* {OpenCollabrate && <Collabrate show={OpenCollabrate} author={AuthorID} />} */}
        {OpenCreateThinkly && <NewThinkly show={OpenCreateThinkly} listInterest={Interest} author={AuthorID} />}
        {/* {OpenShare && ''} */}
        {/* {OpenPublicationPage && <Publication author={AuthorID} />} */}
    </>)
}

export default NewPublication

