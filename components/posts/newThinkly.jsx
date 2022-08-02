import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import Axios from "axios";
import Image from 'next/image';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import "quill-paste-smart";
import { Card } from 'react-bootstrap';
import { CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core'
import { ToggleOff, ToggleOn, CheckCircleOutline, AddPhotoAlternate } from '@material-ui/icons';
import { baseUrl, baseUrlThinkly } from '../../pages/api/api';

const NewThinkly = (props) => {
    const BASE_URL = useContext(baseUrl);
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const modules = {
        toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }]
        ],
    }; //text editing tools for editor
    const [LoggedInID, setLoggedInID] = useState()  //store props data of user ID
    const [selectTypeSlide, setselectTypeSlide] = useState(false) //thinkly type slide hide and show
    const [selectedIndex, setSelectedIndex] = useState('') //set index of thinkly type

    const [selectPublication, setselectPublication] = useState(false) //publication selection slide hide and show
    const [publicationList, setpublicationList] = useState()  //store user publication list from api response
    const [getPublicationID, setPublicationID] = useState('') //store selected publication ID
    const [publicationPayType, setpublicationPayType] = useState() //store publication pay type

    const [tContentSlide, setTContentSlide] = useState(false) //thinkly content slide hide and show
    const [thinklyImage, setthinklyImage] = useState('') //store thinkly image
    const [thinklyName, setthinklyName] = useState('') //store thinkly name
    const [blogContent, setblogContent] = useState('') //store thinkly long content
    const [commentView, setcommentView] = useState(false) //store comment view data true or false
    const [thinklyPayType, setthinklyPayType] = useState(false) //thinkly pay type set Free when false and Paid when true

    const [settingSlide, setsettingSlide] = useState(false) //setting slide hide and show based on contest availibility
    const [contest, setcontest] = useState(false) //contest interest not interest toggle 
    const [contestDataArray, setcontestDataArray] = useState([]) //contest selected #tag store in array

    const [InterestSlide, setInterestSlide] = useState(false)  //Interest slide show and hide
    const [color, setcolor] = useState(['#f3a56c', '#c37d8d', '#3c7493', '#7ec2bf']); //random color selection for interest
    const [Interest, setInterest] = useState() //storing interest data from api
    const [arrayList, setarrayList] = useState([]); //storing selected interest
    const [publishLoader, setpublishLoader] = useState(false) //loader hide and show

    const [successSlide, setSuccessSlide] = useState(false)  //success slide hide and show
    const [thinklyURL, setthinklyURL] = useState()  //storing thinkly url from create thinkly api response
    const [copyLinkMsg, setcopyLinkMsg] = useState(false) //text copy statement hide and show
    const [thinklyRemoteConfigJson, setthinklyRemoteConfigJson] = useState() //sotre props data of remote config

    useEffect(() => {
        if (props.authorID !== undefined && props.thinklyRemoteConfigData !== undefined) {
            $('#createThinkly').modal('show')
            setLoggedInID(props.authorID)
            setselectTypeSlide(true)
            fetchPublicationListByUser(props.authorID)
            setthinklyRemoteConfigJson(props.thinklyRemoteConfigData)
        }
    }, [])

    const closeFunction = () => {
        localStorage.clear()
        setselectTypeSlide(true)
    }

    const handleListItemClick = (event, index) => {
        console.log("thinkly type item index", index);
        setSelectedIndex(index);
    };

    const hideTypeAndShowPubList = () => {
        if (selectedIndex !== '') {
            if (selectedIndex === 0) {
                const data = 'C'
                window.localStorage.setItem("content_type", data)
                if (publicationList === "No Record Found!") {
                    setselectTypeSlide(false)
                    setTContentSlide(true)
                } else {
                    setselectTypeSlide(false)
                    setselectPublication(true)
                }
            }
        } else {
            $('#thinklyTypeError').innerHTML = 'Please select an option to proceed!'
        }
    }

    const fetchPublicationListByUser = (author_id) => {
        var config = {
            method: 'POST',
            headers: {
                DeviceID: '123456',
                UserID: author_id
            },
            data: {
                UserID: author_id,
                PublicationID: "",
                StartIndex: 0,
                EndIndex: 10
            }
        }
        Axios(`${BASE_URL}User/GetUserPublications`, config)
            .then((res) => {
                console.log("response of user publication -> publication list", res);
                if (res.data.responseCode === '00') {
                    setpublicationList(res.data.responseData)
                } else if (res.data.responseCode === '03') {
                    setpublicationList(res.data.responseMessage)
                }
            })
            .catch((err) => {
                console.log("error response of user publication", err);
            });
    }

    const handlePublicationSelection = (event, index, publicationID) => {
        console.log("publication as index and publicationIDF", index, publicationID);
        const pubPayType = publicationList[index].publicationPayType
        console.log("publication pay type @@@@@@@", pubPayType);
        setpublicationPayType(pubPayType)
        setPublicationID(publicationID)
    }

    const hidePublicationAndShowthinkly = () => {
        console.log(getPublicationID);
        if (getPublicationID === '') {
            $('#selectPublicationError').innerHTML = 'Please select a publication for the thinkly'
        } else {
            // const data = publicationList.filter(obj => {
            //     if (obj.publicationID === getPublicationID) {
            //         return obj
            //     }
            // })
            window.localStorage.setItem("PublicationID", getPublicationID)
            setselectPublication(false)
            setTContentSlide(true)
        }
    }

    const uploadImage = (event) => {
        const chooseFile = $('#choose-file');
        const imgPreview = $("#img-preview");
        const files = chooseFile.files[0];  //in case multiple image got selected then pick 1st one only
        const str = files.type;
        console.log(str);
        const image_extension = str.substring(str.indexOf('/') + 1)
        const myRenamedFile = new File([files], `${LoggedInID}_${files.lastModified}.${image_extension}`) //hardcoded userID
        if (myRenamedFile) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(myRenamedFile);
            fileReader.addEventListener("load", function () {
                imgPreview.innerHTML = '<Image src="' + this.result + '" alt="image" />';
            });
        }
        setthinklyImage(myRenamedFile)
    }

    useEffect(() => {  //for reactquill copy  detection 
        const editor = document.querySelector('div')
        editor.addEventListener("paste", (e) => {
            console.log("inside add event listener", e);
            e.preventDefault();
            const text = e.clipboardData.getData('text');
            console.log("react quill@@@@@@@@", text);
            document.execCommand("insertHTML", true, text);
        });
    }, [])

    const handleReactQuillData = (event) => {
        console.log("react quill inside function@@@@@@@@", event);
        setblogContent(event)
    }

    const hidethinklyAndShowSettingOrInterest = () => {
        if (thinklyName === '') {
            $('#thinklyNameError').innerHTML = "Plz enter the thinkly name"
        } else if (blogContent === '') {
            $('#blogError').innerHTML = "Plz enter the content for this thinkly"
        } else {
            localStorage.setItem("ThinklyName", thinklyName)
            localStorage.setItem('Blog', blogContent)
            if (thinklyImage !== '') {
                localStorage.setItem('ThinklyImage', thinklyImage.name)
                var data = new FormData(); // api call for upload Image in azure
                data.append("FileName", thinklyImage);
                const config = {
                    headers: {
                        "Content-type": "multipart/form-data"
                    }
                }
                Axios.post(`${BASE_URL_THINKLY}Image/PostUploadFile/${thinklyImage.name}`, data, config)
                    .then((res) => {
                        console.log("PostUploadFile@@@@@@@@", res);
                        if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                            console.log("thinkly remote config json data@@@@", thinklyRemoteConfigJson.contest);
                            setTContentSlide(false)
                            setsettingSlide(true)
                        } else {
                            setTContentSlide(false)
                            setInterestSlide(true)
                        }
                    })
                    .catch((err) => {
                        console.log("PostUploadFile error in catch", err);
                        $('#ImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
                    });
            } else {
                if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                    console.log("thinkly remote config json data@@@@", thinklyRemoteConfigJson.contest);
                    setTContentSlide(false)
                    setsettingSlide(true)
                } else {
                    setTContentSlide(false)
                    setInterestSlide(true)
                }
            }
        }

    }

    const handleTermsConditions = (index) => {
        if (thinklyRemoteConfigJson !== undefined) {
            const termsURL = thinklyRemoteConfigJson.contest[index].contestTermsURL;
            window.open(termsURL, "_blank")
        }
    }

    const handleContest = (index) => {
        console.log("index of contest", index);
    }

    const hideSettingAndShowInterest = () => {
        setsettingSlide(false)
        setInterestSlide(true)
    }

    useEffect(() => { //interest api called here
        fetch(process.env.REACT_APP_INTEREST_JSON)
            .then(response => response.json())
            .then((data) => {
                console.log('interest list from api call', data)
                function SortArray(x, y) {
                    if (x.CategoryDescription < y.CategoryDescription) { return -1; }
                    if (x.CategoryDescription > y.CategoryDescription) { return 1; }
                    return 0;
                }
                const sortedData = data.sort(SortArray)
                console.log("sorted interest data", sortedData);
                setInterest(sortedData)
            });
    }, []);

    const handleInterest = (index) => { //selection of interest push and pull in array logic is here
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            (`#${index}`).style.background = random_color;
            setarrayList(oldData => [...oldData, index])
        } else
            if (arrayList.length > 0 && arrayList.find(element => element === index)) {
                (`#${index}`).style.background = 'none';
                setarrayList(arrayList.filter(item => item !== index));
            } else {
                (`#${index}`).style.background = random_color;
                setarrayList(oldData => [...oldData, index])
            }
    }

    const hideInterestAndShowSuccess = () => {
        console.log("comment status", commentView);
        console.log("thinklyPayType status", thinklyPayType);
        if (arrayList.length > 3) {
            $('#InterestError').innerHTML = 'Interest should be less than or equal to 3'
        } else {
            console.log("array of interest", arrayList);
            setpublishLoader(true)
            createThinkly()
        }
    }

    const createThinkly = () => {
        var config = {
            method: 'POST',
            headers: {
                DeviceID: "123456",
                UserID: LoggedInID,
                contentType: 'application/json'
            },
            data: {
                ThinklyID: 0,
                DraftID: 0,
                PublicationID: getPublicationID,
                Title: window.localStorage.getItem('ThinklyName'),
                Description: blogContent,
                UserType: 'Customer',
                AuthorID: LoggedInID,
                IsPublic: !commentView ? true : false,
                HashTags: [],
                ResponseID: 0,
                ResponseURL: '',
                Reason: '',
                CategoryIDs: arrayList,
                ThinklyType: !thinklyPayType ? 'Free' : 'Paid',
                ThinklyContentType: window.localStorage.getItem("content_type"),
                VideoID: '',
                VideoUrl: '',
                AudioUrl: '',
                ImageNames: thinklyImage !== '' ? [thinklyImage.name] : [],
                ImageLabels: [],  //name for image in array
                OembedUrl: '',
                ThinklyUrl: ''
            }
        };
        Axios(`${BASE_URL_THINKLY}Thinkly/InsertUpdateThinkly`, config)
            .then((res) => {
                console.log("create thinkly api triggered", res);
                if (res.data.responseCode === '00') {
                    const thinkly_url = res.data.responseData.postData.postURL
                    setthinklyURL(thinkly_url)
                    setInterestSlide(false)
                    setSuccessSlide(true)
                }
            })
            .catch((err) => {
                console.log("create thinkly error in catch", err);
            });
    }

    const handleCopyLink = () => {
        var text_to_copy = $("#textcopy").innerHTML;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text_to_copy).then(
                setcopyLinkMsg(true) // success 
            ).catch((err) => {
                console.log("error of copy link", err);
            })
        }
    }

    return (<>
        <div id="createThinkly" className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static" >
            <div className={!tContentSlide ? "modal-dialog modal-dialog-centered" : "modal-dialog modal-xl modal-dialog-centered"}>
                <div className="modal-content modal-background">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" onClick={() => closeFunction()} >&times;</button>
                    {selectTypeSlide ? <div className="modal-body py-3 px-5">
                        <h6 className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}> What are you creating today? </h6>
                        <p className='text-center'> Choose your Thinkly type</p> <br />
                        <List style={{ display: 'grid', justifyContent: 'center' }}>
                            <ListItem alignItems="flex-start" style={{ cursor: 'pointer' }} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemAvatar>
                                    <Image src={'/text.svg'} alt="text" />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Blog</b>} />
                            </ListItem>
                            {/* <ListItem alignItems="flex-start" selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}> */}
                            <ListItem alignItems="flex-start" style={{ cursor: 'not-allowed' }} selected={selectedIndex === 1} disabled>
                                <ListItemAvatar>
                                    <Image src={'/audio.svg'} alt="audio" />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Audio</b>} />
                            </ListItem>
                            {/* <ListItem alignItems="flex-start" selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}> */}
                            <ListItem alignItems="flex-start" style={{ cursor: 'not-allowed' }} selected={selectedIndex === 2} disabled>
                                <ListItemAvatar>
                                    <Image src={'/vedio.svg'} alt="video" />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Video</b>} />
                            </ListItem>
                        </List>
                        {selectedIndex === '' && <div id="thinklyTypeError" className='error-msg text-center'></div>}
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideTypeAndShowPubList()}>NEXT</button>
                        </div>
                    </div> : selectPublication ? <div className="modal-body px-5">
                        <h6 className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}> New Thinkly </h6>
                        <p className='text-center'>Under which publication do you wish to publish this Thinkly?</p>
                        {publicationList !== undefined && publicationList.length > 0 ? <>
                            {publicationList.map((obj, index) => {
                                return (<div key={index} className='row d-flex' selected={getPublicationID === obj.publicationID} onClick={(event) => handlePublicationSelection(event, index, obj.publicationID)}>
                                    <div className='col-12 mx-auto'>
                                        <input type='radio' id={obj.publicationID} name="publication" />
                                        <ListItemText style={{ marginTop: '-22px', marginLeft: '22px' }}
                                            primary={<div style={{ fontSize: '14px', fontWeight: 'bold' }}>{obj.publicationName}</div>}
                                            secondary={<div>
                                                <p>{obj.about}</p>
                                            </div>} />
                                    </div>
                                </div>)
                            })}
                            {getPublicationID === '' && <label id='selectPublicationError' className='error-msg' />}
                            <div className='text-center my-4'>
                                <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hidePublicationAndShowthinkly()}>NEXT</button>
                            </div>
                        </> : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                            <CircularProgress aria-label="Loading..." />
                        </div>}
                    </div> : tContentSlide ? <div className="modal-body scroll px-3">
                        <p className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}>New Thinkly</p>
                        <div className='row d-flex'>
                            <div className='mx-auto'>
                                <Card id="img-preview" style={{ height: 'auto', width: '200px', border: 'none', display: 'inline-flex' }}> </Card>
                            </div>
                        </div>
                        <div className='row d-flex'>
                            <div className='col-1 mx-auto'>
                                <Card style={{ border: 'none' }}>
                                    <input type='file' name='choose-file' accept="image/*" id='choose-file' style={{ display: 'none' }} onChange={(e) => uploadImage(e.target.value)} />
                                    <label htmlFor='choose-file' className="text-center my-auto">
                                        <AddPhotoAlternate style={{ color: '#e98c37' }} />
                                    </label>
                                </Card>
                                <p style={{ fontSize: '12px' }}>Add image</p>
                            </div>
                            <div className='col-11'>
                                <input type='text' placeholder='Title' value={thinklyName} onChange={(e) => setthinklyName(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                            </div>
                        </div>
                        {thinklyName === '' && <label id='thinklyNameError' className='error-msg'></label>}
                        <div id="ImageUploadError" className='error-msg'></div>
                        <hr />
                        {/* <div contentEditable style={{ display: 'none' }}>Thinkly Content</div> */}
                        <ReactQuill className='mb-4' type="textarea" modules={modules} theme="snow" id="blogFromQuill"
                            placeholder="type here..." value={blogContent} onChange={(e) => handleReactQuillData(e)} />
                        {blogContent === '' && <label id='blogError' className='error-msg'></label>}
                        {publicationPayType === 'Paid' && <>
                            <div className='row'>
                                <div className='col-3'>
                                    <ListItemText primary={<text style={{ fontSize: '14px', fontWeight: 'bold' }}>Is this a Free or a Paid Thinkly?</text>} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-3'>
                                    <label className='mr-2' style={!thinklyPayType ? { fontWeight: 'bold' } : { color: 'gray' }}>Free</label>
                                    {!thinklyPayType ? <>
                                        <Tooltip title="Free">
                                            <ToggleOff tooltip="Free" onClick={() => setthinklyPayType(true)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px' }} />
                                        </Tooltip>
                                    </> : <>
                                        <Tooltip title="Paid">
                                            <ToggleOn tooltip="Paid" onClick={() => setthinklyPayType(false)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px' }} />
                                        </Tooltip>
                                    </>}
                                    <label className='ml-2' style={thinklyPayType ? { fontWeight: 'bold' } : { color: 'gray' }}>Paid</label>
                                </div>
                            </div>
                        </>}
                        <div className='row'>
                            <div className='col-6'>
                                <ListItemText
                                    primary={<>
                                        <text style={{ fontSize: '14px', fontWeight: 'bold' }}>Enable Privilic View Of Comments</text>
                                        {!commentView ? <Tooltip title="Public">
                                            <ToggleOff tooltip="Public" onClick={() => setcommentView(true)} style={{ marginTop: '0px', marginLeft: '28px', fontSize: '40px' }} />
                                        </Tooltip> : <Tooltip title="Private">
                                            <ToggleOn tooltip="Private" onClick={() => setcommentView(false)} style={{ marginTop: '0px', marginLeft: '28px', fontSize: '40px' }} />
                                        </Tooltip>}
                                    </>}
                                    secondary={<text style={{ fontSize: '12px' }}>Prevent others from reading comments on your Thinkly</text>}
                                />
                            </div>
                        </div>
                        <div className='text-center mt-4 my-4'>
                            <button className='button-new-publication' style={{ width: '20%' }} onClick={() => hidethinklyAndShowSettingOrInterest()}>NEXT</button>
                        </div>
                    </div> : settingSlide ? <div className="modal-body px-4">
                        <p className='text-center' style={{ fontSize: '18px', fontWeight: 'bold' }}>New Thinkly</p>
                        <div className='row'>
                            <div className='col-10'>
                                <ListItemText
                                    primary={<text style={{ fontSize: '14px', fontWeight: 'bold' }}>Participating in a contest?</text>}
                                    secondary={<text style={{ fontSize: '12px' }}> Select the contest you are participating in </text>}
                                />
                            </div>
                            <div className='col-1'>
                                {!contest ? <>
                                    <Tooltip title="Not Intrested">
                                        <ToggleOff tooltip="Not Intrested" onClick={() => setcontest(true)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px' }} />
                                    </Tooltip>
                                </> : <>
                                    <Tooltip title="Intrested">
                                        <ToggleOn tooltip="Intrested" onClick={() => setcontest(false)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px' }} />
                                    </Tooltip>
                                </>}
                            </div>
                        </div>
                        {contest && <div className='row mt-4'>
                            {thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.map((obj, index) => {
                                return (<div key={index} className='col-6 mb-2' onClick={() => handleContest(index)}>
                                    <Card className='px-2 py-2' style={{ background: '#ffe7cc', border: 'none', width: '100%', height: '70px' }}>
                                        <Image src={obj.contestImageURL} alt='contest' style={{ width: '60px', height: '60px' }} />
                                        <ListItemText className="line-height-align" style={{ marginTop: '-60px', marginLeft: '70px' }}
                                            primary={<span style={{ fontSize: '14px' }}>{obj.contestTitle}</span>}
                                            secondary={<span style={{ color: '#3c7493', fontSize: '12px', fontWeight: 'bold', lineHeight: '0' }}>{obj.contestID}</span>} />
                                        <span style={{ fontSize: '8px', marginLeft: '70px', lineHeight: '0' }}>I agree to the
                                            <a href='#contestTerms&Conditions' style={{ color: '#3c7493' }} onClick={() => handleTermsConditions(index)}> <u>Terms & Conditions</u> </a>
                                        </span>
                                    </Card>
                                </div>)
                            })}
                        </div>}
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '20%' }} onClick={() => hideSettingAndShowInterest()}>NEXT</button>
                        </div>
                    </div> : InterestSlide ? <div className="modal-body px-3">
                        <h6 className='text-center' style={{ fontSize: '20px', fontWeight: 'bold' }}>New Thinkly</h6>
                        <p className='text-center'>People with these interests* will be able to discover this Thinkly</p>
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
                        {arrayList.length > 3 && <div id="InterestError" className='error-msg'></div>}
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => hideInterestAndShowSuccess()}>
                                {publishLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Publish'}
                            </button>
                        </div>
                    </div> : successSlide && <div className="modal-body px-5 text-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
                        <CheckCircleOutline style={{ color: '#ea7f00', width: '80px', height: '80px' }} /> <br />
                        <h3 className='mt-4' style={{ fontSize: '20px', fontWeight: 'bold' }}>Congratulations!</h3> <br />
                        <p style={{ marginTop: '-25px', fontSize: '20px' }}>Your Thinkly has been successfully posted</p>
                        <p id='textcopy' style={{ display: 'none' }} >{thinklyURL}</p>
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={() => handleCopyLink()}>Share Link</button>
                        </div>
                        {copyLinkMsg && <p className='text-center'>Link Copied to your clipboard. Share it in your social networks.</p>}
                    </div>}
                </div>
            </div>
        </div>
    </>)
}

export default NewThinkly