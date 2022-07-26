import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import Axios from "axios";
import { Card } from 'react-bootstrap';
import { CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core'
import { Edit, EventAvailableOutlined, ToggleOff, ToggleOn, Check } from '@material-ui/icons';
import { baseUrl, baseUrlThinkly } from '../../pages/api/api'
import NewThinkly from '../posts/newThinkly';

const NewPublication = (props) => {
    const BASE_URL = useContext(baseUrl)
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const [thinklyRemoteConfigData, setthinklyRemoteConfigData] = useState()  //for new thinkly model use only
    const [Loader, setLoader] = useState(false)  //loader to show on button till data get process

    const [welcomeSlide, setwelcomeSlide] = useState(false);
    const [AuthorID, setAuthorID] = useState()  //storing props data for author id
    const [pageType, setPageType] = useState()  //course or publication(from header)
    const [publicationID, setPublicationID] = useState(0) //store publication id if coming for edit

    const [aboutSlide, setaboutSlide] = useState(false);
    const [pubName, setpubName] = useState('');   // store publication name for publication name input
    const [pubImage, setpubImage] = useState([]);
    const [ImageNames, setImageNames] = useState()

    const [descriptionSlide, setDescriptionSlide] = useState(false);
    const [shortDescription, setshortDescription] = useState('');
    const [description, setdescription] = useState('');
    const [webUrl, setwebUrl] = useState('');  //store publication pen  name
    const [privateView, setPrivateView] = useState(false) //store private view data true or false (as setcommentView in thinkly)

    const [subscriptionSlide, setsubscriptionSlide] = useState(false);
    const [PlanDetailData, setPlanDetailData] = useState();  //store plan list data after api called 
    const [PlanID, setPlanID] = useState()  //store plan ID
    const [PlanPrice, setPlanPrice] = useState();  //store plan price

    const [InterestSlide, setInterestSlide] = useState(false);
    const [Interest, setInterest] = useState() //store interest api returned array
    const [color, setcolor] = useState(['#f3a56c', '#c37d8d', '#3c7493', '#7ec2bf']); //random color genrator
    const [editInterest, seteditInterest] = useState([])  //store interest id if coming from edit
    const [arrayList, setarrayList] = useState([]); //storing selected interest
    const [randomColor, setRandomColor] = useState([]) //storing color for selected interest generated by color state

    const [successSlide, setSuccessSlide] = useState(false)
    const [failureSlide, setfailureSlide] = useState(false)
    const [OpenCreateThinkly, setOpenCreateThinkly] = useState(false)

    useEffect(() => {
        if (props.authorID !== undefined && props.publicationID !== undefined) {
            setAuthorID(props.authorID)
            fetchPubCourseDetails(props.publicationID, props.authorID) //api call to fetch pub/course details
            $('#newPublication').modal('show')  //open modal box
            setwelcomeSlide(false)
            setaboutSlide(true) //call about data slide beacuse it's edit call
            setthinklyRemoteConfigData(props.thinklyRemoteConfigData)
        } else if (props.authorID !== undefined && props.label !== undefined) {
            setPageType(props.label)
            setAuthorID(props.authorID)
            $('#newPublication').modal('show')
            setwelcomeSlide(true)
            setthinklyRemoteConfigData(props.thinklyRemoteConfigData)
        }
    }, [])

    const fetchPubCourseDetails = (publicationID, AuthorID) => {
        var config = {
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            }
        };
        Axios.get(`${BASE_URL}Publication/V2/GetPublicationDetailsByID/${publicationID}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const response = res.data.responseData.publicationDetails
                    console.log("response of fetch data", response);
                    setPageType(response.publicationType)  //store page type(publication / course)
                    setPublicationID(response.publicationID)  // set publication ID in state
                    setpubName(response.publicationName)  //publication name
                    var image = response.publicationImage.charAt(0) === '@' ? response.publicationImage.substring(1) : response.publicationImage
                    setpubImage(image)//image of publication    H*
                    const image_name = image.substring(image.lastIndexOf('/') + 1)
                    console.log(image_name);
                    setImageNames(image_name)
                    setshortDescription(response.about)  //short description of publication
                    setdescription(response.description)  //long description of publication
                    const penName_pub = response.publicationProfileUrl.substring(response.publicationProfileUrl.lastIndexOf('/') + 1)
                    setwebUrl(penName_pub)  //pename of publication
                    setPrivateView(response.isPrivate)  //store fetched boolean value for course's view
                    setPlanPrice(response.publicationPrice)  //plan price
                    handleSubscription(response.publicationPlan[0].planID)  //function call
                    const CategoryHandle = response.interestData.map((obj) => { return obj.interestID })
                    seteditInterest(CategoryHandle)
                }
            })
    }

    const closeFunction = () => {
        if (publicationID !== 0) {
            props.onChangeCallback(false)
        } else if (descriptionSlide || subscriptionSlide || InterestSlide) {
            $('#closeConfirmation').modal('show')
        }
        else {
            clearAllState() //function call for clear all state
            // if (!descriptionSlide) {
            $('#newPublication').modal('hide')
            window.location.reload();
            // }
            setwelcomeSlide(true)
        }
    }

    const clearAllState = () => {
        setPageType()
        setPublicationID(0)
        setpubName('')
        setpubImage([])
        setImageNames()
        setshortDescription('')
        setdescription('')
        setwebUrl('')
        setPrivateView(false)
        setPlanDetailData()
        setPlanID()
        setPlanPrice()
        setInterest()
        seteditInterest([])
        setarrayList([])
        setRandomColor([])
    }

    const handleOkClose = () => {
        clearAllState()
        $('#closeConfirmation').modal('hide')
        window.location.reload(false);

    }

    const hideWelcomeAndShowAbout = () => {
        setwelcomeSlide(false)
        setaboutSlide(true)
    }

    const uploadImage = (event) => {
        let ImagesArray = Object.entries(event.target.files).map((e) => URL.createObjectURL(e[1]));
        setpubImage(ImagesArray[0])
        const files = event.target.files;
        const element = files[0]
        const extension = element.name.split(".").pop();
        const name = `${AuthorID}_${element.lastModified}.${extension}`
        setImageNames(name)
        const myRenamedFile = new File([element], name)
        var data = new FormData(); // api call for upload Image in azure
        data.append("FileName", myRenamedFile);
        const config = {
            headers: { "Content-type": "multipart/form-data" }
        }
        Axios.post(`${BASE_URL_THINKLY}Image/PostUploadFile/${myRenamedFile.name}`, data, config)
            .then((res) => { }).catch((err) => {
                document.getElementById('pubImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
            });
    }

    const hideAboutandShowDescription = () => {
        console.log(ImageNames);
        if (pubName === '') {
            document.getElementById('pubNameError').innerHTML = `Please Enter the ${pageType} Name`
        } else if (pubImage === undefined || pubImage.length === 0) {
            document.getElementById('pubImageError').innerHTML = `Please select an Image for ${pageType} Profile`
        } else {
            setLoader(true)
            setaboutSlide(false)  //hide about page
            setDescriptionSlide(true)   //show description page
        }
    }

    const fetchPenName = (event) => {
        var name = event.target.value
        let result = name.trim()
        if (result.match(/[^$&+,:;=?[\]@#|{}'<>.^*()%!-/]/g)) {
            const data = result.replace(/[$&+,:;=?[\]@#|{}'<>.^*()%!-/]/g, "")
            console.log(data, data.length);
            setwebUrl(data)
            if (data.length > 5) {
                var config = {
                    headers: {
                        DeviceID: process.env.NEXT_PUBLIC_DEVICE_ID,
                        UserID: AuthorID
                    }
                }
                Axios.get(`${BASE_URL_THINKLY}Publication/IsPennameAvailable/@${data}`, config)
                    .then((res) => {
                        if (res.data.responseCode === '00') {
                            if (res.data.responseData.available === false) {
                                document.getElementById('penNameTakenError').innerHTML = 'This Pen name is already taken'
                            } else {
                                document.getElementById('penNameTakenError').innerHTML = ''
                            }
                        }
                    })
                    .catch((err) => { });
            }
        }
    }

    const hideDescriptionAndShowPlan = () => {
        console.log(ImageNames);
        setLoader(false)
        if (shortDescription === '') {
            document.getElementById('shortDescriptionError').innerHTML = `please Enter about the ${pageType}`
        } else if (description === '') {
            document.getElementById('descriptionError').innerHTML = `please Enter the ${pageType} description`
        } else if (webUrl === '' || webUrl.length === 0) {
            document.getElementById('UrlError').innerHTML = `please Enter the ${pageType} pen name`
        } else if (webUrl.length > 1 && webUrl.length < 5) {
            document.getElementById('penNameError').innerHTML = `Please match the requested format(Should include minimum 5 characters, maximum 15 characters, no space, no special characters except _).`
        } else {
            setDescriptionSlide(false)
            setsubscriptionSlide(true)
            fetchPlanDetail()
        }
    }

    const fetchPlanDetail = () => {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": 0
            }
        };
        Axios.get(`${BASE_URL_THINKLY}Publication/GetPublicationPlanForDeviceType/AND`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setPlanDetailData(res.data.responseData)
                }
            })
            .catch((err) => { });
    }

    const handleSubscription = (planID) => {
        if (planID === '') {
            document.getElementById('planError').innerHTML = `Please select subscription plan for this ${pageType}`
        } else {
            setPlanID(planID)
        }
    };

    const hidePlanAndShowInterest = () => {
        if (PlanID !== undefined && PlanID !== null && PlanID !== '') {
            if (PlanID == 22) {
                setsubscriptionSlide(false)
                interestJsonCall()  //api call for interest list
                setInterestSlide(true)
            } else {
                if (PlanPrice !== undefined && PlanPrice !== null && PlanPrice !== '' && PlanPrice % 10 === 0) {
                    setsubscriptionSlide(false)
                    interestJsonCall()  //api call for interest list
                    setInterestSlide(true)
                } else {
                    document.getElementById('PriceError').innerHTML = 'Enter valid amount (Should be multiple of 10)'
                }
            }
        } else {
            document.getElementById('planError').innerHTML = `Please select subscription plan for this ${pageType}`
        }
    }

    function interestJsonCall() {    // json called for all interest list
        fetch(process.env.NEXT_PUBLIC_INTEREST_JSON)
            .then(response => response.json())
            .then((data) => {
                function SortArray(x, y) { //put interest array in ascending order by category description
                    if (x.CategoryDescription < y.CategoryDescription) { return -1; }
                    if (x.CategoryDescription > y.CategoryDescription) { return 1; }
                    return 0;
                }
                const sortedData = data.sort(SortArray)
                setInterest(sortedData)
            });
    }

    useEffect(() => { //if interest mapped then only get call handleInterest function(for edit purpose)
        if (Interest !== undefined && editInterest.length > 0) {
            for (let i = 0; i < editInterest.length; i++) {
                const element = editInterest[i];
                handleInterest(element)
            }
        }
    }, [Interest, editInterest])

    const handleInterest = (index) => {   //selection of interest
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            if (index.length > 0) {  //if user coming from edit
                for (let i = 0; i < index.length; i++) {
                    const element = index[i];
                    document.getElementById(element).style.background = random_color;
                }
                setarrayList(index)
                setRandomColor(random_color)
            } else {  //for manual selection of intrest
                document.getElementById(`${index}`).style.background = random_color;
                setarrayList(oldData => [...oldData, index])  //add index in array state with old data
                setRandomColor(oldcolor => [...oldcolor, random_color])
            }
        } else if (arrayList.length > 0 && arrayList.find(element => element === index)) {
            document.getElementById(`${index}`).style.background = 'none';
            setarrayList(arrayList.filter(item => item !== index));
            setRandomColor(randomColor.filter(item => item !== random_color))
        } else {
            document.getElementById(`${index}`).style.background = random_color;
            setarrayList(oldData => [...oldData, index])
            setRandomColor(oldcolor => [...oldcolor, random_color])
        }
    }

    const hideInterestAndShowSuccess = () => {
        console.log(ImageNames);
        if (arrayList.length < 3) {
            document.getElementById('InterestError').innerHTML = 'Please select at least 3 interest'
        } else {
            setLoader(true)
            { publicationID > 0 ? editPublicationCourse() : createPublicationCourse() }
        }
    }

    const createPublicationCourse = () => {
        var starPrice = 0
        if (PlanDetailData !== undefined) {
            var planIndex = PlanDetailData.findIndex(function (obj) {
                console.log(obj.publicationPlanID);
                return obj.publicationPlanID == PlanID
            })
            starPrice = parseInt(PlanPrice) / PlanDetailData[planIndex].perStarPrice
        }
        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
            data: {
                Name: pubName,
                About: description,
                Image: ImageNames,
                CreatedBy: AuthorID,
                ShortDes: shortDescription,
                Category: arrayList.toString(),
                AuthorsID: "",
                PayType: PlanID == 22 ? 'Free' : 'Paid',
                PenName: "@" + webUrl,
                PublicationPlanID: PlanID,
                NoOfStars: PlanID == 22 ? 0 : starPrice,
                PublicationPrice: PlanPrice,
                PublicationType: pageType === 'course' ? 'COURSE' : "",
                IsLiveStream: false,
                IsDiscussions: false,
                IsPrivate: privateView
            }
        };
        Axios(`${BASE_URL_THINKLY}Publication/V2/CreatePublication`, config)
            .then((res) => {
                setLoader(false)
                if (res.data.responseCode === '00') {
                    setInterestSlide(false)
                    setSuccessSlide(true)
                }
                else if (res.data.responseCode === "02") {
                    setInterestSlide(false)
                    setfailureSlide(true)
                }
            })
            .catch((err) => { });
    }

    const editPublicationCourse = () => {
        const CategoryList = editInterest.toString() //interest array to string
        var starPrice = 0
        if (PlanDetailData !== undefined) {
            var planIndex = PlanDetailData.findIndex(function (obj) {
                console.log(obj.name, PlanID);
                return obj.publicationPlanID == PlanID //PlanType H
            })
            starPrice = parseInt(PlanPrice) / PlanDetailData[planIndex].perStarPrice
        }

        var config = {
            method: 'POST',
            headers: {
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": AuthorID
            },
            data: {
                UserID: parseInt(AuthorID),
                PublicationID: publicationID,
                Name: pubName,
                About: description,
                Image: ImageNames,
                CreatedBy: parseInt(AuthorID),
                ShortDes: shortDescription,
                Category: CategoryList,
                AuthorsID: "",
                PayType: PlanID == 22 ? 'Free' : 'Paid',
                PublicationPlanID: PlanID,
                NoOfStars: PlanID == 22 ? 0 : starPrice,
                PublicationPrice: parseFloat(PlanPrice),
                PublicationType: "",
                IsLiveStream: false,
                IsDiscussions: false,
                IsPrivate: privateView
            }
        };
        Axios(`${BASE_URL_THINKLY}Publication/V2/UpdatePublication`, config)
            .then((res) => {
                setLoader(false)
                if (res.data.responseCode === '00') {
                    setInterestSlide(false)
                    setSuccessSlide(true)
                }
                else if (res.data.responseCode === "02") {
                    setInterestSlide(false)
                    setfailureSlide(true)
                }
            })
            .catch((err) => { });
    }

    const handlefailureSlide = () => {
        closeFunction()
        $('#newPublication').modal('hide')
    }

    const fetchThinklyModel = () => {
        clearAllState()
        setwelcomeSlide(true)
        $('#newPublication').modal('hide')
        setOpenCreateThinkly(true)
    }

    return (<>
        <div id="newPublication" class="modal fade in" tabIndex={-1} role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-background">
                    <button type="button" class="close text-right pr-2" onClick={() => closeFunction()} >&times;</button>
                    {welcomeSlide ? <div class="modal-body px-5">
                        <h6 className='text-center fs-18 fw-bold'>Create Your {pageType !== undefined && pageType.charAt(0).toUpperCase() + pageType.slice(1)}</h6>
                        <p className='text-center fs-15 mb-2'> Thinkly provides a one stop solution for all your {pageType} needs.</p>
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
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                <ListItemText primary={<b>Get Paid</b>} secondary="Earn through your content" />
                            </ListItem>
                        </List>
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => hideWelcomeAndShowAbout()}>START</button>
                        </div>
                    </div> : aboutSlide ? <div class="modal-body px-5">
                        <div className='text-center fs-18 fw-bold mb-3'> About {pageType !== undefined && pageType.charAt(0).toUpperCase() + pageType.slice(1)}  </div>
                        <div className='row d-flex mb-4'>
                            <div className='col-12 mx-auto'>
                                <input type="text" maxLength='30' className='bottomline-textbox' id='publication_title'
                                    placeholder={pageType === 'course' ? 'E.g. "Yoga at home"' : 'Choose a catchy title (max 30 characters)'}
                                    value={pubName} onChange={(e) => setpubName(e.target.value)} />
                                {pubName === '' && <div id="pubNameError" className='error-msg'></div>}
                            </div>
                        </div>
                        <div className='row d-flex'>   {/* publication image upload */}
                            <div className='col-12 mx-auto text-center'>
                                {pubImage !== undefined && pubImage.length > 0 &&
                                    <Card style={{ display: 'inline-flex' }}>
                                        <img src={pubImage} style={{ height: 'auto', width: '100px', objectFit: 'cover', objectPosition: 'center' }} />
                                    </Card>}
                                <div className='type-file-hide'>
                                    <input type='file' name='choose-file' accept="image/*" id='choose-file' style={{ display: 'none' }} onChange={(e) => uploadImage(e)} />
                                    <label htmlFor='choose-file' className='fs-18 ff-lora fc-link'>
                                        {pubImage !== undefined && pubImage.length > 0 ? <span> Update {pageType} Picture</span> : <span> Add {pageType} Picture*</span>}
                                    </label>
                                    {pubImage.length === 0 && <div id="pubImageError" className='error-msg'></div>}
                                    <div id="pubImageUploadError" className='error-msg'></div>
                                </div>
                            </div>
                        </div>
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => hideAboutandShowDescription()}>
                                {Loader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'NEXT'}
                            </button>
                        </div>
                    </div> : descriptionSlide ? <div class="modal-body px-5">
                        <div className='text-center fs-18 fw-bold mb-3'> {pageType !== undefined && pageType.charAt(0).toUpperCase() + pageType.slice(1)} Description </div>
                        <div className='row mt-2'>
                            <h6 className='fs-15 fw-mid-bold mb-1'>What's it about?*</h6>
                            <input type="text" id='pub-about' className='interest-textbox' maxLength='50' placeholder={pageType === 'course' ? 'E.g. "Flexibility,Fitness,Strenght,Weight-loss" (max 50 characters)' : 'E.g. "Fitness is forever" (max 50 characters)'}
                                value={shortDescription} onChange={(e) => setshortDescription(e.target.value)} />
                            {shortDescription === '' && <div id="shortDescriptionError" className='error-msg'></div>}
                        </div>

                        <div className='row mt-4'>
                            <h6 className='fs-15 fw-mid-bold mb-1'>Description*</h6>
                            <textarea id='description' className='interest-textbox' minLength='2' maxLength='1000' rows={5} value={description} onChange={(e) => setdescription(e.target.value)}
                                placeholder={pageType === 'course' ? 'Tell people why their lives will be letter by reading your course. Explain the value, rather then the content!' : 'Tell people why their lives will be letter by reading your publication. Explain the value, rather then the content!'}>
                            </textarea>
                            {description === '' ? <div id="descriptionError" className='error-msg'></div> : ''}
                        </div>

                        <div className='row mt-4 input-box'>
                            <ListItemText primary={<h6 className='fs-15 fw-bold'>{pageType === 'course' ? 'Unique Web Link*' : 'Web Link*'}</h6>}
                                secondary={<h6 className='fs-12'>Unique url for your {pageType}. Choose wisely! This cannot be changed after the {pageType} is created.</h6>} />

                            <input type="text" className='interest-textbox' maxLength={15} value={webUrl} onChange={(e) => fetchPenName(e)} style={{ paddingLeft: '124px' }} disabled={publicationID > 0 ? true : false} />
                            <span className='fixed-text-input'>www.thinkly.me/</span>

                            {(webUrl === '' || webUrl.length === 0) && <div id="UrlError" className='error-msg'></div>}
                            {(webUrl.length > 1 && webUrl.length < 5) && <div id="penNameError" className='error-msg'></div>}
                            <div id="penNameTakenError" className='error-msg'></div>
                        </div>
                        {pageType === 'course' && <div className='row mt-4'>
                            <ListItemText primary={<h6 className='fs-15 fw-bold'>Make Private</h6>}
                                secondary={<h6 className='fs-12'>Private courses can only be joined from your link</h6>} />
                            {!privateView ? <Tooltip title="Public">
                                <ToggleOff tooltip="Public" onClick={() => setPrivateView(true)} style={{ marginTop: '5px', marginLeft: '28px', fontSize: '40px', color: 'gray' }} />
                            </Tooltip> : <Tooltip title="Private">
                                <ToggleOn tooltip="Private" onClick={() => setPrivateView(false)} style={{ marginTop: '5px', marginLeft: '28px', fontSize: '40px', color: '#faa422' }} />
                            </Tooltip>}
                        </div>}
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => hideDescriptionAndShowPlan()}>NEXT</button>
                        </div>
                    </div> : subscriptionSlide ? <div class="modal-body px-5">
                        <div className='row d-flex mb-3'>
                            <h6 className='mx-auto fs-18 fw-bold'>Subscription Plan</h6>
                            <p className='fs-15'>For paid plans, you will get paid in Starts which can be redeemed from the "My Stars" page.</p>
                        </div>
                        <Card style={{ height: '45vh', overflow: 'auto', boxShadow: 'none' }} >
                            {PlanDetailData !== undefined && PlanDetailData.length > 0 ? PlanDetailData.map((obj, index) => {
                                return (<>
                                    <div className='row pt-3' key={index} selected={PlanID === obj.publicationPlanID} onClick={() => handleSubscription(obj.publicationPlanID)}>
                                        <div className='col-1'>
                                            <input type='radio' name='plan' value={obj.name} style={{ width: '20px', height: '20px' }} disabled={publicationID > 0 && obj.name === 'Free' ? true : false} />
                                        </div>
                                        <div className='col-11'>
                                            <ListItemText style={{ marginTop: '-8px' }} primary={<h6 className='fs-15 fw-bold ff-lora'>{obj.name}</h6>}
                                                secondary={<h6>{obj.description}</h6>} />
                                        </div>
                                    </div>
                                    {obj.name !== 'Free' && PlanID === obj.publicationPlanID && <> {/* for input box to enter price */}
                                        <input type='number' id='planPrice' className='interest-textbox' minLength={1} maxLength={3} value={PlanPrice} placeholder="Amount should be multiple of 10" onChange={(e) => setPlanPrice(e.target.value)} />
                                        {PlanPrice !== '' && PlanPrice !== undefined && PlanPrice % 10 === 0 ? '' : <label id='PriceError' className='error-msg text-center' />}
                                    </>}
                                    <hr />
                                </>)
                            }) : <div className='grid place-items-center h-screen'>
                                <CircularProgress aria-label="Loading..." />
                            </div>}
                        </Card>
                        {(PlanID === '' || PlanID === undefined) && <div id='planError' className='error-msg text-center'> </div>}
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => hidePlanAndShowInterest()}>NEXT</button>
                        </div>
                    </div> : InterestSlide ? <div class="modal-body px-5">
                        <div className='row d-flex mb-3'>
                            <h6 className='mx-auto fs-18 fw-bold'>Tag Interests*</h6>
                            <p className='fs-15'>People with these interests will be able to discover this {pageType}</p>
                        </div>
                        <div className='interest-card'>
                            <div className='row d-flex'>
                                {Interest !== undefined && Interest.length > 0 ? Interest.map((obj, index) => {
                                    return (<div className='col-4 mb-3' key={index} onClick={() => handleInterest(obj.CategoryID)}>
                                        <Card id={obj.CategoryID} className='sub-interest-card mx-auto my-auto' >
                                            {obj.CategoryDescription}
                                        </Card>
                                    </div>)
                                }) : <div className='grid place-items-center h-screen'>
                                    <CircularProgress aria-label="Loading..." />
                                </div>}
                            </div>
                        </div>
                        {arrayList.length < 3 && <div id="InterestError" className='error-msg text-center'></div>}

                        <div className='text-center my-4'>
                            <button className='primary-bg-button' disabled={Loader} onClick={() => hideInterestAndShowSuccess()}>
                                {Loader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Done'}
                            </button>
                        </div>
                    </div> : successSlide ? <div className="modal-body py-3 px-5">
                        <div className='row d-flex'>
                            <p className='col-12 text-center fs-18 fw-bold'>Congratulations!</p>
                            <p className='col-12 fs-15'> Your {pageType !== undefined && pageType.charAt(0).toUpperCase() + pageType.slice(1)} is created. Check your mail for tips on getting started.</p>
                        </div>
                        <Card className='sub-interest-card my-4'>
                            <div className='row'>
                                <div className='col-2'>
                                    <img src={pubImage} alt="img" style={{ width: '50px', height: '50px', objectFit: 'contain', objectPosition: 'center' }} />
                                </div>
                                <div className='col-10'>
                                    <ListItemText className='my-auto text-left' primary={<h6 className='fs-18'>{pubName}</h6>}
                                        secondary={<> <h6 className='fs-12'>{shortDescription}</h6> <h6 className='fw-mid-bold fs-15'>www.thinkly.me/{webUrl}</h6> </>} />
                                </div>
                            </div>
                        </Card>
                        <div className='text-center mb-4 fs-18 fw-mid-bold'>Hold on, your job is not fully done!</div>
                        <div className="row">
                            <div className='col-2 mx-auto'>
                                <ul className="StepProgress">
                                    <li className="StepProgress-item active"></li>
                                    <li className="StepProgress-item active"></li>
                                    <li className="StepProgress-item" ></li>
                                </ul>
                            </div>
                            <div className='col-8 mx-auto'>
                                <p className='fs-15 fw-mid'>Create a publication <Check style={{ color: "green" }} /></p>
                                <p className='mt-5 fs-15 fw-mid'>Publish your first {pageType === 'course' ? 'lesson' : 'post'}</p>
                                <p className='mt-5 fs-15 fw-mid'>Share it with the world</p>
                            </div>
                        </div>
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' style={{ width: '60%' }} onClick={() => fetchThinklyModel()}>{pageType === 'course' ? 'Write My First Lesson' : 'Write My First Post'}</button>
                        </div>
                    </div> : failureSlide && <div class="modal-body py-3 px-5">
                        <h5 className='text-center fs-24 fw-bold mb-3'>Oops!</h5>
                        <p className='text-center fs-20'>Something went wrong. Please try again.</p>
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => handlefailureSlide()}>OK</button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>

        {/* Close Modal Confirmation H*/}
        <div id="closeConfirmation" className="modal fade" role="dialog" data-backdrop="static" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal">&times;</button>
                    <div className="modal-body">
                        <p className='text-center fs-22 fw-bold'>Are you sure you want to close this modal?</p>
                        <p className='text-center mb-5'>If you select OK then you will lose all data</p>
                        <div className="text-center d-flex justify-content-center">
                            <button className='primary-border-button mr-4' data-dismiss="modal" onClick={() => setDescriptionSlide(true)}>Cancel</button>
                            <button className='primary-bg-button' onClick={() => handleOkClose()}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {OpenCreateThinkly && <NewThinkly authorID={AuthorID} thinklyRemoteConfigData={thinklyRemoteConfigData} />}
    </>)
}

export default NewPublication