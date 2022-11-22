import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import Axios from "axios";
import moment from "moment";
import dynamic from 'next/dynamic';
import { Card } from 'react-bootstrap';
import { CircularProgress, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@material-ui/core'
import { ToggleOff, ToggleOn, CheckCircleOutline, AddPhotoAlternate, Add } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers'
import DateMomentUtils from '@date-io/moment'
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl, baseUrlThinkly } from '../../pages/api/api';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// dynamic(() => import('quill-paste-smart'), { ssr: false });

const NewThinkly = (props) => {
    const BASE_URL = useContext(baseUrl);
    const BASE_URL_THINKLY = useContext(baseUrlThinkly);
    const modules = {
        toolbar: [
            ["bold", "italic", 'underline', 'blockquote'],
            [{ list: "ordered" }, { list: "bullet" }],
            ['clean'],
        ],
        clipboard: {
            matchers: [],
            matchVisual: true,  //if false then it will add extra line after paste
        }
    }; //text editing tools for editor
    const [LoggedInID, setLoggedInID] = useState()  //store props data of user ID
    const [selectTypeSlide, setselectTypeSlide] = useState(false) //thinkly type slide hide and show
    const [selectedIndex, setSelectedIndex] = useState('') //set index of thinkly type
    const [PostType, setPostType] = useState() //set post type according to post selection

    const [pubSelectedIndex, setpubSelectedIndex] = useState('') //set index of publication
    const [selectPublication, setselectPublication] = useState(false) //publication selection slide hide and show
    const [publicationList, setpublicationList] = useState([])  //store user publication list from api response
    const [startIndexValue, setstartIndexValue] = useState(0) // start Index of publication(for scroll more)
    const [endIndexValue, setendIndexValue] = useState(10) //end Index of publication(for scroll more)
    const [isFetching, setIsFetching] = useState(false) //fetch more data on scroll
    const [getPublicationID, setPublicationID] = useState('') //store selected publication ID
    const [getSelectedPubDetail, setSelectedPubDetail] = useState()

    const [tContentSlide, setTContentSlide] = useState(false) //thinkly content slide hide and show
    const [thinklyImage, setthinklyImage] = useState([]) //store thinkly image url
    const [ImageNames, setImageNames] = useState([]) //store all images related data
    const [thinklyName, setthinklyName] = useState('') //store thinkly name
    const [draftLoader, setDraftLoader] = useState(false) //loader hide and show on save draft button
    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState() //store youtube url
    const [blogContent, setblogContent] = useState('') //store thinkly long content
    const [blogFinalContent, setblogFinalContent] = useState('') //store final thinkly log content after all unneccessary tag removed
    const [commentView, setcommentView] = useState(false) //store comment view data true or false
    const [thinklyPayType, setthinklyPayType] = useState(false) //thinkly pay type set Free when false and Paid when true
    const [spotifyUrl, setSpotifyUrl] = useState() //store spotify url 
    const [EmbededUrl, setEmbededUrl] = useState() // store embede audio url

    const [settingSlide, setsettingSlide] = useState(false) //setting slide hide and show based on contest availibility
    const [contest, setcontest] = useState(false) //contest interest not interest toggle 
    const [contestDataArray, setcontestDataArray] = useState([]) //contest selected #tag store in array

    const [InterestSlide, setInterestSlide] = useState(false)  //Interest slide show and hide
    const [color, setcolor] = useState(['#f3a56c', '#c37d8d', '#3c7493', '#7ec2bf']); //random color selection for interest
    const [randomColor, setRandomColor] = useState([])
    const [Interest, setInterest] = useState() //storing interest data from api
    const [editInterest, seteditInterest] = useState([])
    const [arrayList, setarrayList] = useState([]); //storing selected interest
    const [publishLoader, setpublishLoader] = useState(false) //loader hide and show on publish btn

    const [successSlide, setSuccessSlide] = useState(false)  //success slide hide and show
    const [newThinklyID, setnewThinklyID] = useState(0)
    const [draftID, setdraftID] = useState(0)
    const [thinklyURL, setthinklyURL] = useState()  //storing thinkly url from create thinkly api response
    const [copyLinkMsg, setcopyLinkMsg] = useState(false) //text copy statement hide and show
    const [thinklyRemoteConfigJson, setthinklyRemoteConfigJson] = useState() //sotre props data of remote config

    const [selectedDate, setSeclectedDate] = useState(moment()); //scheduler
    const [inputValue, setInputValue] = useState(moment().format("DD-MM-YYYY hh:mm A"));  //scheduler
    const [enableScheduleButton, setEnableScheduleButton] = useState(false) //to show/hide schedule ok button
    const [showScheduled, setShowScheduled] = useState(false)  //to hide/show scheduler dateTime on Interest slide(also api call)

    useEffect(() => {
        if (props.thinklyID !== undefined && props.authorID !== undefined && props.thinklyRemoteConfigData !== undefined) {
            setnewThinklyID(props.thinklyID) //set thinklyId in state to update thinkly
            fetchThinklyDetailByID(props.thinklyID) //api call to fetch existing data of post
            setLoggedInID(props.authorID)
            $('#createThinkly').modal('show')  //open modal box
            setTContentSlide(true) //call content slide if edit 
            setthinklyRemoteConfigJson(props.thinklyRemoteConfigData)
        } else if (props.draftID !== undefined && props.authorID !== undefined && props.thinklyConfigJSON !== undefined) {
            console.log("inside draft condition thinkly modal");
            setdraftID(props.draftID)
            fetchDraftDetailByID(props.draftID, props.authorID)  //api call to fetch draft content
            setLoggedInID(props.authorID)
            setTContentSlide(true) //call content slide for edit of publish draft content
            $('#createThinkly').modal('show')  //open modal box
            setthinklyRemoteConfigJson(props.thinklyConfigJSON)
        } else if (props.authorID !== undefined && props.thinklyRemoteConfigData !== undefined) {
            console.log(selectTypeSlide);
            $('#createThinkly').modal('show')
            setLoggedInID(props.authorID)
            setselectTypeSlide(true) //select post type if new post
            fetchPublicationListByUser(props.authorID)
            setthinklyRemoteConfigJson(props.thinklyRemoteConfigData)
        }
    }, [])

    function fetchThinklyDetailByID(thinklyID) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": props.authorID
            },
        };
        Axios.get(`${BASE_URL}Thinkly/v2/GetThinklyDetailsByID/${thinklyID}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const response = res.data.responseData.ThinklyDetails
                    setPublicationID(response.publicationData.publicationID) // set publication ID in state
                    if (response.postData.postPayType === "Free") { //set thinkly pay type in state
                        setthinklyPayType(false)
                    } else {
                        setthinklyPayType(true)
                    }
                    if (response.postData.postImages !== undefined && response.postData.postImages.length > 0) {  //set image list in state
                        const images = []
                        const imageName = []
                        for (let i = 0; i < response.postData.postImages.length; i++) {
                            var element = response.postData.postImages[i];
                            var data = element.charAt(0) === '@' ? element.substring(1) : element
                            images.push(data)
                            const nameImg = element.substring(element.lastIndexOf('/') + 1)
                            imageName.push(nameImg)
                        }
                        setthinklyImage(images)
                        setImageNames(imageName)
                    }
                    if (response.postData.postContentType === "C") { //set post type in state
                        setPostType('Blog')
                    } else if (response.postData.postContentType === "A") {
                        setPostType('Audio')
                    } else if (response.postData.postContentType === "V") {
                        setPostType('Video')
                    }
                    setthinklyName(response.postData.postTitle)
                    setYoutubeVideoUrl(response.postData.videoURL)
                    setSpotifyUrl(response.postData.AudioUrl)
                    handleReactQuillData(response.postData.postDescription) //function call
                    setcommentView(response.postData.isPublic ? false : true)
                    seteditInterest(response.postData.interests)
                    console.log("get interest array from edit post", response.postData.interests);
                    setSpotifyUrl(response.postData.audioURL)
                    setEmbededUrl(response.postData.postOembedUrl)

                    setSelectedPubDetail(response.publicationData)
                    // setpublicationPayType(response.publicationData.publicationPayType)
                }
            })
            .catch((err) => {
                console.log("GetSummaryDetailsByID error in catch", err);
            });
    }

    function fetchDraftDetailByID(draftId, authorId) {
        var config = {
            headers: {
                "Content-Type": "application/json",
                "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
                "UserID": authorId
            },
        };
        Axios.get(`${BASE_URL_THINKLY}Draft/GetDraftsDetails/${draftId}`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    console.log("GetDraftsDetails", res.data.responseData);
                    const response = res.data.responseData
                    setPublicationID(response.PublicationID) // set publication ID in state
                    if (response.PublicationPayType === "Free") { //set thinkly pay type in state
                        setthinklyPayType(false)
                    } else {
                        setthinklyPayType(true)
                    }
                    if (response.ImageNames.length > 0) {  //set image list in state
                        const images = []
                        const imageName = []
                        for (let i = 0; i >= response.ImageNames.length; i++) {
                            var element = response.ImageNames[i];
                            var data = element.charAt(0) === '@' ? element.substring(1) : element
                            images.push(data)
                            const nameImg = response.ImageNames[i].substring(response.ImageNames[i].lastIndexOf('/') + 1)
                            imageName.push(nameImg)
                        }
                        setthinklyImage(images)
                        setImageNames(imageName)
                    }
                    if (response.ThinklyType === "C") { //set post type in state
                        setPostType('Blog')
                    } else if (response.ThinklyType === "A") {
                        setPostType('Audio')
                    } else if (response.ThinklyType === "V") {
                        setPostType('Video')
                    }
                    setthinklyName(response.Title)
                    setYoutubeVideoUrl(response.VideoUrl !== "" ? response.VideoUrl : undefined)
                    handleReactQuillData(response.Description) //function call
                    setcommentView(response.IsPublic ? false : true)
                    seteditInterest(response.CategoryIDs)
                    setSpotifyUrl(response.AudioUrl !== "" ? response.AudioUrl : undefined)
                    setEmbededUrl(response.OembedUrl !== "" ? response.OembedUrl : undefined)
                    const pImage = response.PublicationImage.substring(response.PublicationImage.lastIndexOf('/') + 1) //publication detail
                    const pubData = {
                        publicationImage: pImage,
                        publicationPlan: [{
                            planID: response.PublicationPlanID
                        }],
                        publicationName: response.PublicationName,
                        publicationPayType: response.PublicationPayType
                    }
                    setSelectedPubDetail(pubData)
                }
            })
            .catch((err) => {
                console.log("GetSummaryDetailsByID error in catch", err);
            });
    }

    const closeFunction = (discard) => {
        if (discard === 'discard') {  //fall in this condition only if click on close icon in draft confirmation model
            setselectTypeSlide(true)
            $('#createThinkly').modal('hide')
            clearAllSlideCatch()
            { draftID !== 0 && props.onChangeCallback(false) }
            setShowScheduled(false)
            if (InterestSlide) {
                window.location.reload(false);
            }
        }
        if ((tContentSlide || settingSlide || InterestSlide) && (thinklyName !== '' || blogContent !== '' || (thinklyImage !== undefined && thinklyImage.length > 0))) {
            $('#draftModal').modal('show')// modal call for draft confirmation
        } else {
            clearAllSlideCatch() //catch clear function call(state clearance)
            if (successSlide) {
                window.location.reload(false);
                // router.push('/Thinkly')
            }
            setselectTypeSlide(true)
            $('#createThinkly').modal('hide')
            { newThinklyID !== 0 && props.onChangeCallback(false) }
            // props.onChangeCallback(false)
            { }
        }
    }

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const hideTypeAndShowPubList = () => {
        if (selectedIndex !== '') {
            if (selectedIndex === 0) {
                setPostType('Blog')
                if (publicationList === "No Record Found!" || newThinklyID > 0) {
                    setselectTypeSlide(false)
                    setTContentSlide(true)
                } else {
                    setselectTypeSlide(false)
                    setselectPublication(true)
                }
            } else if (selectedIndex === 1) {
                setPostType('Video')
                if (publicationList === "No Record Found!" || newThinklyID > 0) {
                    setselectTypeSlide(false)
                    setTContentSlide(true)
                } else {
                    setselectTypeSlide(false)
                    setselectPublication(true)
                }
            } else if (selectedIndex === 2) {
                setPostType('Audio')
                if (publicationList === "No Record Found!" || newThinklyID > 0) {
                    setselectTypeSlide(false)
                    setTContentSlide(true)
                } else {
                    setselectTypeSlide(false)
                    setselectPublication(true)
                }
            }
        } else {
            document.getElementById('thinklyTypeError').innerHTML = 'Please select an option to proceed!'
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
                StartIndex: startIndexValue,
                EndIndex: endIndexValue
            }
        }
        Axios(`${BASE_URL}User/GetUserPublications`, config)
            .then((res) => {
                console.log("response of user publication -> publication list", res);
                if (res.data.responseCode === '00') {
                    const newData = res.data.responseData
                    setpublicationList(data => [...data, ...newData])
                    setstartIndexValue(endIndexValue)
                    setendIndexValue(endIndexValue + 10)
                    setIsFetching(false)
                } else if (res.data.responseCode === '03') {
                    setIsFetching(false)
                }
            })
            .catch((err) => {
                console.log("error response of user publication", err);
            });
    }

    const handlePublicationListItemClick = (event, index) => {
        setpubSelectedIndex(index)
    }

    const handlePublicationSelection = (event, index, publicationID) => {
        setPublicationID(publicationID)
        const pubDetail = publicationList[index]
        setSelectedPubDetail(pubDetail)
    }

    const hidePublicationAndShowthinkly = () => {
        if (getPublicationID === '') {
            document.getElementById('selectPublicationError').innerHTML = 'Please select a publication for the thinkly'
        } else {
            setselectPublication(false)
            setTContentSlide(true)
        }
    }

    const uploadImage = (event) => {
        console.log("inside upload image function", event)
        let ImagesArray = Object.entries(event.target.files).map((e) => URL.createObjectURL(e[1]));
        if (thinklyImage !== undefined && thinklyImage.length > 0) {
            setthinklyImage([...thinklyImage, ...ImagesArray]);  //stores old data with new data without overriding
        } else {
            setthinklyImage(ImagesArray)
        }
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const element = files[i]
            const name = `${LoggedInID}_${element.lastModified}`
            const myRenamedFile = new File([element], name)
            setImageNames(oldData => [...oldData, name])
            var data = new FormData(); // api call for upload Image in azure
            data.append("FileName", myRenamedFile);
            const config = {
                headers: { "Content-type": "multipart/form-data" }
            }
            Axios.post(`${BASE_URL_THINKLY}Image/PostUploadFile/${myRenamedFile.name}`, data, config)
                .then((res) => { }).catch((err) => {
                    document.getElementById('ImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
                });
        }
    }

    const deleteFile = (e) => {  //delete image 
        const a = thinklyImage.filter((item, index) => index !== e);
        setthinklyImage(a);
        const s = ImageNames.filter((item, index) => index !== e);
        setImageNames(s)
    }

    const handleYoutubeChange = (e) => {
        const data = e.target.value
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
        if (data != undefined && data != null && youtubeRegex.test(data)) {
            document.getElementById('youtubeVideoError').innerHTML = ''
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            var match = data.match(regExp);
            if (match && match[7].length == 11) {
                const finalLink = "https://youtu.be/" + match[7]
                setYoutubeVideoUrl(finalLink)
                var url = "https://img.youtube.com/vi/" + match[7] + "/0.jpg" //here we get proper img url
                const date = new Date();
                var milliseconds = date.getTime();
                const name = LoggedInID + "_" + milliseconds;
                handleYoutubeCoverImage(url, name) //function call
            } else {
                alert('Could not extract video ID.');
            }
        } else {
            document.getElementById('youtubeVideoError').innerHTML = 'Please enter valid youtube url'
            setYoutubeVideoUrl()
        }
    }

    const handleYoutubeCoverImage = (ImageUrl, name) => {
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "DeviceID": "1234523434654523466",
                "UserID": LoggedInID
            },
            data: {
                "ImageName": name,
                "ImageURL": ImageUrl
            }
        }

        Axios(`${BASE_URL_THINKLY}Image/PostUploadFileFromURL`, config,)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setImageNames([name])
                }
            })
            .catch((err) => {
                document.getElementById('ImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
            });
    }

    const handleSpotify = (e) => {
        const url = e.target.value
        if (url != undefined && url != null && (url.startsWith("https://open.spotify.com")) && url.includes("episode")) {
            setSpotifyUrl(url)
            document.getElementById('spotifyUrlError').innerHTML = ''
            var spotifyFinalUrl = "https://open.spotify.com/oembed?format=json&url=" + url;
            // setSpotifyFinalUrl(spotifyFinalUrl)
            Axios.get(spotifyFinalUrl, { responseType: 'json' })
                .then(response => {
                    var data = response.data.html
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(data, 'text/html');
                    var img = doc.querySelector('iframe').src;
                    setEmbededUrl(img)
                    var audioImg = response.data.thumbnail_url //audio image handled
                    const date = new Date();
                    var milliseconds = date.getTime();
                    const name = LoggedInID + "_" + milliseconds;
                    handleYoutubeCoverImage(audioImg, name) //function call for audio img upload in server
                })
        } else {
            document.getElementById('spotifyUrlError').innerHTML = 'Please enter valid spotify episode url'
        }
    }

    const handlePaste = () => {  //for smart paste into editor
        const editor = document.querySelector('.ql-editor')
        editor.addEventListener("paste", (e) => {
            console.log("inside quill page event");
            e.preventDefault();
            e.clipboardData.getData('text');
        });
    }

    const handleReactQuillData = (event) => {
        const data = event
        setblogContent(data)

        if (PostType === "Video" && PostType === "Audio") {
            var limit = thinklyRemoteConfigJson.thinklyContentTypesConfig[1].maxWords;
            var wordCount = 0
            function countWords(data) {
                const arr = data.split(' ');
                wordCount = arr.filter(word => word !== '').length;
                document.getElementById('wordLimit').innerHTML = wordCount + " / " + limit;
                if (wordCount > limit) {
                    document.getElementById('wordLimit').style.color = 'red'
                }
            }
            countWords(data)
            // setContentCount(wordCount) //for show word count on editor - for future use
        }
    }

    const insertUpdateDraft = () => {
        const p_image = getSelectedPubDetail !== undefined && getSelectedPubDetail.publicationImage.charAt(0) === '@' ? getSelectedPubDetail.publicationImage.substring(1) : getSelectedPubDetail.publicationImage
        var contentDataType = ""
        if (PostType === 'Blog') {
            contentDataType = "C"
        } else if (PostType === 'Video') {
            contentDataType = "V"
        } else if (PostType === 'Audio') {
            contentDataType = "A"
        }
        var config = {
            method: 'POST',
            headers: {
                DeviceID: "123456",
                UserID: LoggedInID,
                contentType: 'application/json'
            },
            data: {
                DraftID: draftID,
                ThinklyID: newThinklyID,
                ThinklyType: contentDataType,
                ThinklyPayType: !thinklyPayType ? 'Free' : 'Paid',
                Title: thinklyName,
                Description: blogFinalContent || blogContent, //to save desc in draft without click on NEXT btn
                ImageNames: ImageNames,
                ImageLabels: [],
                AudioUrl: spotifyUrl !== undefined ? spotifyUrl : '',
                VideoUrl: youtubeVideoUrl !== undefined ? youtubeVideoUrl : '',
                OembedUrl: EmbededUrl !== undefined ? EmbededUrl : '',
                UserType: 'Customer',
                AuthorID: LoggedInID,
                CategoryIDs: arrayList,
                IsPublic: !commentView ? true : false,
                PublicationID: getPublicationID,
                PublicationPlanID: getSelectedPubDetail !== undefined && getSelectedPubDetail.publicationPlan[0].planID,
                PublicationName: getSelectedPubDetail !== undefined && getSelectedPubDetail.publicationName,
                publicationImage: p_image,
                PublicationPayType: getSelectedPubDetail !== undefined && getSelectedPubDetail.publicationPayType,
                ResponseId: 0,
                ResponseURL: ''
            }
        };
        Axios(`${BASE_URL_THINKLY}Draft/InsertUpdateDraft`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    $('#draftModal').modal('hide')
                    $('#createThinkly').modal('hide')
                    clearAllSlideCatch()  //to clear all data from popup
                    //window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log("draft thinkly error in catch", err);
            });
    }

    const hidethinklyAndShowSettingOrInterest = () => {
        if (thinklyName === '') {
            document.getElementById('thinklyNameError').innerHTML = "Please enter the post title"
        } else if (blogContent === '') {
            document.getElementById('blogError').innerHTML = "Please enter the content for this post"
        } else {
            var data1 = blogContent
            var data2 = data1.replaceAll("<p><br></p>", "<br>")
            var data3 = data2.replaceAll("</p>", "<br>")
            var data = data3.replaceAll(/<\/?p[^>]*>/g, "");
            var finalData = document.createElement("p");
            finalData.innerHTML = data
            setblogFinalContent(finalData.outerHTML)
            if (thinklyImage !== '' && thinklyImage !== undefined) {
                if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                    setTContentSlide(false)
                    setsettingSlide(true)
                } else {
                    console.log("inside 11111 condition");
                    setTContentSlide(false)
                    interestJsonCall() //interest json function call
                    setInterestSlide(true)
                }
            } else {
                if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
                    setTContentSlide(false)
                    setsettingSlide(true)
                } else {
                    setTContentSlide(false)
                    interestJsonCall() //interest json function call
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

    const handlContestSelection = (data, index) => {
        if (contestDataArray.length <= 0) {
            document.getElementById(`${index}`).style.background = "#ffe7cc";
            setcontestDataArray(oldData => [...oldData, index])  //add index in array state with old data
        } else if (contestDataArray.length > 0 && contestDataArray.find(element => element === index)) {
            document.getElementById(`${index}`).style.background = 'none';
            setcontestDataArray(contestDataArray.filter(item => item !== index));  //remove only clicked index from array
        } else {
            document.getElementById(`${index}`).style.background = "#ffe7cc";
            setcontestDataArray(oldData => [...oldData, index])
        }
    }

    const hideSettingAndShowInterest = () => {
        setsettingSlide(false)
        interestJsonCall() //interest json function call
        setInterestSlide(true)
    }

    function interestJsonCall() {
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

    useEffect(() => {  //if interest mapped then only call handleInterest function call(for edit and draft purpose)
        if (Interest !== undefined) {
            console.log("edit interest start@@@@@ ", editInterest, Interest);
            for (let i = 0; i < editInterest.length; i++) {
                const element = editInterest[i];
                handleInterest(element)
                console.log("if draft interest", element);
            }
        }
    }, [Interest, editInterest])

    const handleInterest = (index) => { //selection of interest push and pull in array logic is here
        console.log("call handle interest function!!!!! ", index);
        var random_color = color[Math.floor(Math.random() * color.length)];
        if (arrayList.length <= 0) {
            console.log("1st if");
            if (index.length > 0) {
                console.log("1st if and if");
                for (let i = 0; i < index.length; i++) {
                    const element = index[i];
                    document.getElementById(element).style.background = random_color;
                }
                setarrayList(index)
                setRandomColor(random_color)
            } else {
                console.log("1st if and else");
                document.getElementById(`${index}`).style.background = random_color;
                setarrayList(oldData => [...oldData, index])  //add index in array state with old data
                setRandomColor(oldcolor => [...oldcolor, random_color])
            }
        } else if (arrayList.length > 0 && arrayList.find(element => element === index)) {
            // if arrayList state length is greater than 0 and match element as index
            document.getElementById(`${index}`).style.background = 'none';
            setarrayList(arrayList.filter(item => item !== index));  //remove only clicked index from array
            setRandomColor(randomColor.filter(item => item !== random_color))
        } else {
            document.getElementById(`${index}`).style.background = random_color;
            setarrayList(oldData => [...oldData, index])
            setRandomColor(oldcolor => [...oldcolor, random_color])
        }

    }

    const hideInterestAndShowSuccess = (event) => {
        if (arrayList.length === 0 && arrayList.length < 1) {
            document.getElementById('NoInterestError').innerHTML = 'Interest should be greater than 0'
        } else if (arrayList.length > 3) {
            document.getElementById('InterestError').innerHTML = 'Interest should be less than or equal to 3'
        } else {
            setpublishLoader(true)
            var contentDataType = ""
            if (PostType === 'Blog') {
                contentDataType = "C"
            } else if (PostType === 'Video') {
                contentDataType = "V"
            } else if (PostType === 'Audio') {
                contentDataType = "A"
            }
            //if showScheduled true then include schedule data in api else ignore
            { showScheduled ? scheduleThinkly(contentDataType) : createThinkly(contentDataType) }
        }
    }

    const createThinkly = (contentDataType) => {
        var config = {
            method: 'POST',
            headers: {
                DeviceID: "123456",
                UserID: LoggedInID,
                contentType: 'application/json'
            },
            data: {
                ThinklyID: newThinklyID,
                DraftID: draftID,
                PublicationID: getPublicationID,
                Title: thinklyName,
                Description: blogFinalContent,
                UserType: 'Customer',
                AuthorID: LoggedInID,
                IsPublic: !commentView ? true : false,
                HashTags: contestDataArray,
                ResponseID: 0,
                ResponseURL: '',
                Reason: '',
                CategoryIDs: arrayList,
                ThinklyType: !thinklyPayType ? 'Free' : 'Paid',
                ThinklyContentType: contentDataType,
                VideoID: '',
                VideoUrl: youtubeVideoUrl !== undefined ? youtubeVideoUrl : '',
                AudioUrl: spotifyUrl !== undefined ? spotifyUrl : '',
                ImageNames: ImageNames,//thinklyImage !== undefined ? ImageNames : [],
                ImageLabels: [],  //name for image in array
                OembedUrl: EmbededUrl !== undefined ? EmbededUrl : '',
                ThinklyUrl: ''
            }
        };
        Axios(`${BASE_URL_THINKLY}Thinkly/InsertUpdateThinkly`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const thinkly_url = res.data.responseData.postData.postURL
                    setthinklyURL(thinkly_url)
                    setInterestSlide(false)
                    setSuccessSlide(true)
                    clearAllSlideCatch()
                }
            })
            .catch((err) => {
                console.log("create thinkly error in catch", err);
            });
    }

    const scheduleThinkly = (contentDataType) => {
        var formatTime = moment(selectedDate._d).format("HH:mm");
        var formatDate = moment(selectedDate._d).format("YYYY-MM-DD")
        if (formatTime !== undefined && formatDate !== null && formatTime !== undefined && formatTime !== null) {
            var config = {
                method: 'POST',
                headers: {
                    DeviceID: "123456",
                    UserID: LoggedInID,
                    contentType: 'application/json'
                },
                data: {
                    ThinklyDetails: {
                        ThinklyID: newThinklyID,
                        DraftID: draftID,
                        PublicationID: getPublicationID,
                        Title: thinklyName,
                        Description: blogFinalContent,
                        UserType: 'Customer',
                        AuthorID: LoggedInID,
                        IsPublic: !commentView ? true : false,
                        HashTags: contestDataArray,
                        ResponseID: 0,
                        ResponseURL: '',
                        Reason: '',
                        CategoryIDs: arrayList,
                        ThinklyType: !thinklyPayType ? 'Free' : 'Paid',
                        ThinklyContentType: contentDataType,
                        VideoID: '',
                        VideoUrl: youtubeVideoUrl !== undefined ? youtubeVideoUrl : '',
                        AudioUrl: spotifyUrl !== undefined ? spotifyUrl : '',
                        ImageNames: ImageNames,//thinklyImage !== undefined ? ImageNames : [],
                        ImageLabels: [],  //name for image in array
                        OembedUrl: EmbededUrl !== undefined ? EmbededUrl : '',
                        ThinklyUrl: ''
                    },
                    ScheduleTime: formatDate + ' ' + formatTime
                }
            };
            Axios(`${BASE_URL_THINKLY}Thinkly/SchedulePost`, config)
                .then((res) => {
                    if (res.data.responseCode === '00') {
                        $('#createThinkly').modal('hide')
                        setselectTypeSlide(true)
                        clearAllSlideCatch()
                    }
                })
                .catch((err) => {
                    console.log("create schedule thinkly error in catch", err);
                });
        } else {
            alert('Plz select or re-select time and date')
        }
    }

    const clearAllSlideCatch = () => {
        setSelectedIndex('')
        setPostType('')
        setPublicationID('')
        setpubSelectedIndex('')
        setSelectedPubDetail(undefined)
        setthinklyName('')
        setInputValue(moment().format("DD-MM-YYYY hh:mm A"))
        setthinklyImage(undefined)
        setYoutubeVideoUrl(undefined)
        setSpotifyUrl(undefined)
        setblogContent('')
        setcontestDataArray('')
        setarrayList('')
        setpublishLoader(false)
        setDraftLoader(false)
        setcopyLinkMsg(false)
        setEmbededUrl(undefined)
        setShowScheduled(false)
        setSeclectedDate(moment())
    }

    const handleCopyLink = () => {
        var text_to_copy = document.getElementById("textcopy").innerHTML;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text_to_copy).then(
                setcopyLinkMsg(true) // success 
            ).catch((err) => {
                console.log("error of copy link", err);
            })
        }
    }

    // back functions start from here
    const backToPostChoice = () => {
        setselectPublication(false)
        setselectTypeSlide(true)
    }

    const backToPublicationSelection = () => {
        setTContentSlide(false)
        setselectPublication(true)
    }

    const backToContent = () => { //from setting page
        setsettingSlide(false)
        setTContentSlide(true)
    }

    const backToSeettingOrContent = () => {
        if (thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.length > 0) {
            setInterestSlide(false)
            setsettingSlide(true)
        } else {
            setInterestSlide(false)
            setTContentSlide(true)
        }
    }

    const handleScheduleSend = () => {
        $('#scheduleModal').modal('hide')
        setShowScheduled(true)
    }

    const handleDateTime = (date, value) => {
        setSeclectedDate(date); //to show on picker
        setInputValue(value) //selected date and time also show on picker

        var todaysDateTime = new Date()  //current datetime
        // todaysDateTime.setTime(todaysDateTime.getTime() + 1 * 60 * 60 * 1000);  // Now Add 1 hours to todaysDateTime and set estimated time for comparision
        todaysDateTime.setTime(todaysDateTime.getMinutes() + 5)
        todaysDateTime.setTime(todaysDateTime.getTime() * 60 * 60 * 1000);  // Now Add 1 hours to todaysDateTime and set estimated time for comparision
        var selectedDateTime = date._d //selected dateTime
        // If the selectedDateTime is greater than or equal to estimatedDateTime then OK else show an error
        if (selectedDateTime >= todaysDateTime) {
            setEnableScheduleButton(true)  //enable button
        } else {
            alert("Time should be 1 hr greater than current time")
            setEnableScheduleButton(false) //disable button
        }
    }

    const CancelSchedule = () => {
        setShowScheduled(false)
        setInputValue(moment().format("DD-MM-YYYY hh:mm A"))
    }

    return (<>
        <div id="createThinkly" className="modal fade in" tabIndex="-1" role="dialog" data-backdrop="static" >
            <div className={!tContentSlide ? "modal-dialog modal-dialog-centered" : "modal-dialog modal-xl modal-dialog-centered"}>
                <div className="modal-content modal-background">
                    <button type="button" className="close text-right pr-2" data-dismiss="modal" onClick={() => closeFunction()} >&times;</button>
                    {selectTypeSlide ? <div class="modal-body py-3 px-5" id='typeSlide'>
                        <h6 className='text-center fs-22 fw-bold mb-2'> What are you creating today? </h6>
                        <p className='text-center'> Choose your Post type</p>
                        <List className='mb-4' style={{ display: 'grid', justifyContent: 'center' }}>
                            <ListItem alignItems="flex-start" className='cursor-pointer' selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemAvatar >
                                    <img className='mt-1' src={'/text.svg'} />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Blog</b>} secondary={<span>A post with pictures and text</span>} />
                            </ListItem>
                            <ListItem alignItems="flex-start" className='cursor-pointer' selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                                <ListItemAvatar>
                                    <img className='mt-2' src={'/vedio.svg'} />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Video</b>} secondary={<span>A post with a YouTube link</span>} />
                            </ListItem>
                            <ListItem alignItems="flex-start" className='cursor-pointer' selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                                <ListItemAvatar>
                                    <img className='mt-3' src={'/audio.svg'} />
                                </ListItemAvatar>
                                <ListItemText className='mt-3' primary={<b>Audio</b>} secondary={<span>A post with a Spotify link (Podcast only)</span>} />
                            </ListItem>
                            {selectedIndex === '' && <div id="thinklyTypeError" className='error-msg text-center'></div>}
                        </List>
                        <div className='text-center my-4'>
                            <button className='primary-bg-button' onClick={() => hideTypeAndShowPubList()}>START</button>
                        </div>
                    </div> : selectPublication ? <div class="modal-body px-5">
                        <h6 className='text-center fs-22 fw-bold mb-2'> New {PostType} Post </h6>
                        <p className='text-center'>Under which publication do you wish to publish this?</p>
                        <InfiniteScroll dataLength={publicationList.length} next={fetchPublicationListByUser(LoggedInID)} hasMore={isFetching} loader={<div className='grid place-items-center h-screen'> <CircularProgress aria-label="Loading..." /> </div>} >
                            {publicationList !== undefined && publicationList.length > 0 && <>
                                <Card style={{ height: '40vh', overflow: 'auto', boxShadow: 'none', paddingTop: '10px' }} >
                                    {publicationList.map((obj, index) => {
                                        const imgUrl = obj.publicationImage.charAt(0) === '@' ? obj.publicationImage.substring(1) : obj.publicationImage
                                        return (<List key={index} className='row' selected={getPublicationID === obj.publicationID} onClick={(event) => handlePublicationSelection(event, index, obj.publicationID)}>
                                            <ListItem alignItems="flex-start" className='cursor-pointer pt-3' selected={pubSelectedIndex === index} onClick={(event) => handlePublicationListItemClick(event, index)}>
                                                <div className='row d-flex'>
                                                    <div className='col-3 my-auto'>
                                                        <img src={imgUrl} alt='pubProfile' style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                                    </div>
                                                </div>
                                                <div className='col-9'>
                                                    <ListItemText style={{ marginTop: '-3px' }}
                                                        primary={<div className='fs-14 fw-bold'>{obj.publicationName}</div>}
                                                        secondary={<div> {obj.about} </div>} />
                                                </div>
                                            </ListItem>
                                        </List>)
                                    })}
                                </Card>
                                {getPublicationID === '' && <label id='selectPublicationError' className='error-msg' />}
                                <div className='text-center my-4'>
                                    <button className='primary-border-button mr-4' onClick={() => backToPostChoice()}> BACK </button>
                                    <button className='primary-bg-button' onClick={() => hidePublicationAndShowthinkly()}>NEXT</button>
                                </div>
                            </>}
                        </InfiniteScroll>
                    </div> : tContentSlide ? <div class="modal-body scroll px-3" id='contentSlide'>
                        <p className='text-center fs-22 fw-bold mb-2'>New {PostType} Post</p>
                        {/* starting of image, video and audio setup */}
                        {PostType === 'Blog' ? <div className='row d-flex justify-content-center mx-4'>
                            {thinklyImage !== undefined && thinklyImage.length > 0 && thinklyImage.map((obj, index) => {
                                return (<div className='col-2' key={index} style={thinklyImage !== undefined && thinklyImage.length > 5 ? { marginBottom: '7rem' } : {}}>
                                    <Card className='mx-auto'>
                                        <img src={obj} style={{ height: '100px', width: '100px', border: 'none', objectFit: 'cover', objectPosition: 'center' }} />
                                        <button onClick={() => deleteFile(index)} className='close-button-post-image-creation'> X </button>
                                    </Card>
                                </div>)
                            })}
                            <div className='col-2'>
                                <Card className='mx-auto card-border' style={{ width: '100px', height: '100px' }}>
                                    <input type='file' multiple name='choose-file' accept="image/*" id='choose-file' style={{ display: 'none' }} onChange={(e) => uploadImage(e)} />
                                    {thinklyImage !== undefined && thinklyImage.length > 0 ?
                                        <label htmlFor='choose-file' className="text-center my-auto"> <Add style={{ color: '#e98c37' }} /> </label>
                                        : <label htmlFor='choose-file' className="text-center my-auto"> <AddPhotoAlternate style={{ color: '#e98c37' }} /> </label>
                                    }
                                    <label className='fs-10 fc-link fw-mid text-center'>
                                        {thinklyImage !== undefined && thinklyImage.length > 0 ? "Add more" : "Add Image"}
                                    </label>
                                </Card>
                            </div>
                        </div> : (PostType === 'Video' && youtubeVideoUrl !== undefined) ? <div className='d-flex mb-2'>
                            <div className='embed-responsive embed-responsive-1by1 mx-auto' style={{ width: "30rem", height: "18rem", backgroundColor: "#fff" }}>
                                <ReactPlayer url={youtubeVideoUrl} className='video' controls />
                            </div>

                        </div> : (PostType === 'Audio' && EmbededUrl !== undefined) && <div className="row my-4 d-flex justify-content-center"  >
                            <iframe src={EmbededUrl} width="60%" height="160" allowtransparency="true" allow="encrypted-media" autoPlay></iframe>
                        </div>}
                        {/* end of image, video and audio setup and starting of post name */}
                        <div className='row d-flex'>
                            <div className='col-11 mb-2'>
                                <input type='text' placeholder='Enter Title' value={thinklyName} onChange={(e) => setthinklyName(e.target.value)} style={{ fontSize: '20px', border: 'none', outline: 'none', width: '100%' }} />
                            </div>
                        </div>
                        {thinklyName === '' && <label id='thinklyNameError' className='error-msg'></label>}
                        <div id="ImageUploadError" className='error-msg'></div>

                        {PostType === 'Video' && <div className='wrapper' style={{ width: "100%", height: "10vh", display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                            <input type='url' className='form-control' id='url' name='myUrl' placeholder='Paste a Youtube link...' value={youtubeVideoUrl !== undefined ? youtubeVideoUrl : ''} onChange={(e) => handleYoutubeChange(e)} />
                        </div>}

                        <label id='youtubeVideoError' className='error-msg'></label>

                        {PostType === 'Audio' && <div className='wrapper' style={{ width: "100%", height: "10vh", display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                            <input type='application/json+oembed' className='form-control' id='spotify' name='mySpotify' placeholder='Paste a Spotify podcast episode link...' value={spotifyUrl} onChange={(e) => handleSpotify(e)} />
                        </div>}
                        {/* {spotifyUrl === undefined && } */}
                        <label id='spotifyUrlError' className='error-msg'></label>

                        {/* end of video & audio input and starting of text editor */}
                        {/* onFocus={() => handlePaste()} add this if want to add smart paste for editor(remove all styling) */}
                        <ReactQuill type="textarea" modules={modules} theme="snow" id="blogFromQuill" placeholder="Write your content here..." value={blogContent} onChange={(e) => handleReactQuillData(e)} />
                        {blogContent === '' && <div id="blogError" className='error-msg'></div>}
                        {/* {publicationPayType === 'Paid' && <> */}
                        {getSelectedPubDetail !== undefined && getSelectedPubDetail.publicationPayType === 'Paid' && <>
                            <div className='row'>
                                <div className='col-3'>
                                    <ListItemText primary={<text className='fs-14 fw-bold'>Is this a Free or a Paid Thinkly?</text>} />
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
                                        <span className='fs-14 fw-bold'>Enable Privilic View Of Comments</span>
                                        {!commentView ? <Tooltip title="Public">
                                            <ToggleOff tooltip="Public" onClick={() => setcommentView(true)} style={{ marginTop: '0px', marginLeft: '28px', fontSize: '40px', color: 'gray' }} />
                                        </Tooltip> : <Tooltip title="Private">
                                            <ToggleOn tooltip="Private" onClick={() => setcommentView(false)} style={{ marginTop: '0px', marginLeft: '28px', fontSize: '40px' }} />
                                        </Tooltip>}
                                    </>}
                                    secondary={<span className='fs-12'>Prevent others from reading comments on your Thinkly</span>}
                                />
                            </div>
                        </div>
                        <div className='text-center mt-4 my-4'>
                            {newThinklyID === 0 && draftID === 0 && <button className='primary-border-button mr-4' style={{ width: '20%' }} onClick={() => backToPublicationSelection()}> BACK </button>}
                            <button className='primary-bg-button' style={{ width: '20%' }} onClick={() => hidethinklyAndShowSettingOrInterest()}>NEXT</button>
                        </div>
                    </div> : settingSlide ? <div class="modal-body px-4">
                        <p className='text-center fs-22 fw-bold'>New {PostType} Post</p>
                        <div className='row'>
                            <div className='col-10'>
                                <ListItemText primary={<span className='fs-14 fw-bold'>Participating in a contest?</span>}
                                    secondary={<span className='fs-12'> Select the contest you are participating in </span>} />
                            </div>
                            <div className='col-1'>
                                {!contest ? <>
                                    <Tooltip title="Not Interested">
                                        <ToggleOff tooltip="Not Interested" onClick={() => setcontest(true)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px', color: 'gray' }} />
                                    </Tooltip>
                                </> : <>
                                    <Tooltip title="Interested">
                                        <ToggleOn tooltip="Interested" onClick={() => setcontest(false)} style={{ marginTop: '0px', marginRight: '0px', fontSize: '40px' }} />
                                    </Tooltip>
                                </>}
                            </div>
                        </div>
                        {contest && <>
                            {thinklyRemoteConfigJson !== undefined && thinklyRemoteConfigJson.contest.map((obj, index) => {
                                return (<List className='row d-flex my-2' key={index} onClick={() => handlContestSelection(index, obj.contestID)}>
                                    <ListItem className='contestHover col-8 mx-auto' style={{ width: '100%', height: '70px' }} id={`${obj.contestID}`}>
                                        <div className='col-1'>
                                            <img src={obj.contestImageURL} alt='' style={{ width: '60px', height: '50px', marginLeft: '-14px' }} />
                                        </div>
                                        <div className='col-11'>
                                            <ListItemText className="line-height-align" style={{ marginTop: '6px', marginBottom: '0px', marginLeft: '40px' }}
                                                primary={<span style={{ fontSize: '14px' }}>{obj.contestTitle}</span>}
                                                secondary={<span className='fs-12 fw-bold' style={{ color: '#3c7493', lineHeight: '0' }}>{obj.contestID}</span>} />
                                            <span style={{ fontSize: '8px', marginLeft: '40px' }}>I agree to the
                                                <a href='#contestTerms&Conditions' style={{ color: '#3c7493' }} onClick={() => handleTermsConditions(index)}> <u>Terms&Conditions</u> </a>
                                            </span>
                                        </div>
                                    </ListItem>
                                </List>)
                            })}
                        </>}
                        <div className='text-center my-4'>
                            <button className='primary-border-button mr-4' style={{ width: '20%' }} onClick={() => backToContent()}> BACK </button>
                            <button className='primary-bg-button' style={{ width: '20%' }} onClick={() => hideSettingAndShowInterest()}>NEXT</button>
                        </div>
                    </div> : InterestSlide ? <div class="modal-body px-3">
                        <h6 className='text-center fs-22 fw-bold'>New {PostType} Post</h6>
                        <p className='text-center'>Tag interests. People with these interests will be able to discover this post.</p>
                        <div className='interest-card'>
                            <div className='row d-flex'>
                                {Interest !== undefined && Interest.map((obj, index) => {
                                    return (<div className='col-4 mb-3' key={index} onClick={() => handleInterest(obj.CategoryID)}>
                                        <Card id={obj.CategoryID} className='sub-interest-card mx-auto my-auto'>
                                            {obj.CategoryDescription}
                                        </Card>
                                    </div>)
                                })}
                            </div>
                        </div>
                        {arrayList.length === 0 && arrayList.length < 1 && <div id="NoInterestError" className='error-msg text-center'></div>}
                        {arrayList.length > 3 && <div id="InterestError" className='error-msg text-center'></div>}
                        <div className='text-center my-4'>
                            <button className='primary-border-button mr-4' onClick={() => backToSeettingOrContent()}> BACK </button>
                            <button className='height-button primary-bg-color fc-white fw-mid' disabled={publishLoader} style={{ width: '40%', border: "transparent", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" }} onClick={() => hideInterestAndShowSuccess()}>
                                {publishLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : showScheduled ? 'Schedule Publish' : 'Publish'}
                            </button>
                            {/* schedule button */}
                            <button className='height-button primary-bg-color fc-white fw-mid dropdown-toggle' id='drop' style={{ width: "6%", border: "transparent", borderLeft: "1px solid #fff", borderBottomRightRadius: "4px", borderTopRightRadius: "4px" }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></button>
                            <ul className="dropdown-menu" id='schedule' style={{ backgroundColor: "#ffe7cc", border: "none" }} >
                                <li data-target="#scheduleModal" data-toggle="modal">Schedule for later</li>
                            </ul>
                        </div>
                        {showScheduled && <div className='row d-flex'>
                            <p className='mx-auto my-auto'>Scheduled to be published on <b>{inputValue}</b></p>
                            <button type='button' class='close' style={{ marginRight: '2.5rem' }} onClick={() => CancelSchedule()}>&times;</button>
                        </div>}
                    </div> : successSlide && <div class="modal-body px-5 text-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
                        <CheckCircleOutline style={{ color: '#ea7f00', width: '80px', height: '80px' }} /> <br />
                        <h3 className='mt-4 fs-20 fw-bold'>Congratulations!</h3> <br />
                        <p style={{ marginTop: '-25px', fontSize: '20px' }}>Your {PostType} Post has been successfully posted</p>
                        <p id='textcopy' style={{ display: 'none' }} >{thinklyURL}</p>
                        <div className='text-center my-4'>
                            <button className='button-new-publication' style={{ width: '40%' }} onClick={(event) => handleCopyLink(event)}>Share Link</button>
                        </div>
                        {copyLinkMsg && <p className='text-center'>Link Copied to your clipboard. Share it in your social networks.</p>}
                    </div>}
                </div>
            </div>
        </div>

        {/* schedule Modal */}
        <div id="scheduleModal" class="modal fade in" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-background">
                    <button type="button" class="close text-right pr-2" data-dismiss="modal">&times;</button>
                    <div className="modal-body py-1 px-5">
                        <p className='text-center fs-22 fw-bold'>Schedule for later</p>
                        <p className='text-center fw-mid fs-18 mt-1'>Please select date and time </p>
                        <div className='mb-3' style={{ display: 'grid', justifyContent: 'center' }}>
                            <MuiPickersUtilsProvider libInstance={moment} utils={DateMomentUtils}>
                                <KeyboardDateTimePicker
                                    label="Pick date & time"
                                    format="DD-MM-YYYY hh:mm A"
                                    value={selectedDate}
                                    onChange={handleDateTime}
                                    inputValue={inputValue}
                                    InputProps={{ readOnly: true }}
                                    minDate={moment()}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className='text-center my-3'>
                            <button className='primary-border-button mr-4 w-30' data-dismiss="modal">Cancel</button>
                            {!enableScheduleButton ? <button style={{ cursor: 'not-allowed' }} className='fw-mid fc-white border-radius-4 border-none bg-lightgray fs-20 text-center w-30 height-button'>Ok</button> :
                                <button className='primary-bg-button w-30' onClick={() => handleScheduleSend()}>Ok</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Draft pop-up Modal */}
        <div id="draftModal" class="modal fade in" tabindex="-1" role="dialog" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-background">
                    <button type="button" class="close text-right pr-2" data-dismiss="modal">&times;</button>
                    <div className="modal-body py-1 px-5">
                        <p className='text-center fs-22 fw-bold'>Save this Thinkly for later?</p>
                        <p className='text-center fw-mid fs-18 mt-1'>If you choose Discard, you will lose all changes</p>
                        <div className='text-center my-3'>
                            <button className='primary-border-button mr-4' style={{ width: '30%', border: '2px solid #faa422', color: '#faa422', background: '#fff' }} data-dismiss="modal" onClick={() => closeFunction('discard')}>Discard</button>
                            <button className='primary-bg-button w-30' onClick={() => insertUpdateDraft(setDraftLoader(true))}>
                                {draftLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Save Draft'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default NewThinkly