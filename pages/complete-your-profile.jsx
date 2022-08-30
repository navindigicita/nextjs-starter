import React, { useContext, useState, useEffect } from 'react'
import Axios from "axios";
import $ from 'jquery'
import { isMobile } from 'react-device-detect'
import { Card, CircularProgress } from '@material-ui/core'
import { AddPhotoAlternate } from '@material-ui/icons'
import { baseUrlThinkly } from './api/api';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const NewProfile = () => {
  const router = useRouter()
  const BASE_URL_THINKLY = useContext(baseUrlThinkly);
  const [getEmail, setEmail] = useState()
  const [propsData, setpropsData] = useState(router.query.state)
  const [apiCallUpdate, setapiCallUpdate] = useState(router.query.updateCall)
  const [ProfileImage, setProfileImage] = useState('');
  const [imageUploadedMsg, setimageUploadedMsg] = useState(false)
  const [Name, setName] = useState('')
  const [userPenName, setuserPenName] = useState('')
  const [penNameResponse, setpenNameResponse] = useState();
  const [aboutUser, setaboutUser] = useState('')
  // const [ImageForPreview, setImageForPreview] = useState()
  const [source, setsource] = useState(null)
  const [UID, setUID] = useState(null)
  const [publishLoader, setpublishLoader] = useState(false) //loader hide and show
  // const [CopyUrl, setCopyUrl] = useState(false)

  useEffect(() => {
    if (propsData !== undefined) {
      console.log("props data from checkuser to create account@@@ ", propsData);
      setUID(propsData.uid)
      setsource(propsData.providerId)
      setName(propsData.displayName)
    }
    const localStorageName = window.localStorage.getItem('userName')
    if (localStorageName !== undefined && localStorageName !== null) {
      const data = window.localStorage.getItem('userName')
      console.log("userpen name@@@@@", data);
      // penNameApiCall()
      setuserPenName(data)
    }
    const email = window.localStorage.getItem('emailForSignIn')
    console.log("email@@@@", email);
    setEmail(email)
  }, [])

  useEffect(() => {
    async function checkPenName() {
      if (userPenName !== undefined && userPenName !== null) {
        console.log("user pen Name before check pen name api call@@@@@", userPenName);
        await penNameApiCall()
      }
    }
    checkPenName()
  }, [userPenName])

  const uploadImage = (event) => {
    const chooseFile = document.getElementById("choose-file");
    const imgPreview = document.getElementById("img-preview");
    const imgSelect = document.getElementById("select-image-card");
    const files = chooseFile.files[0];  //in case multiple image got selected then pick 1st one only
    const str = files.type;
    const image_extension = str.substring(str.indexOf('/') + 1)
    const myRenamedFile = new File([files], `${files.lastModified}.${image_extension}`)
    if (myRenamedFile) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(myRenamedFile);
      fileReader.addEventListener("load", function () {
        //make sure all styling attributes which getting update are added in Inline css format only else it will thruogh error
        imgSelect.style.display = 'none';
        imgPreview.style.height = '200px';
        imgPreview.innerHTML = '<img src="' + this.result + '" />';
        setimageUploadedMsg(true)
      });
    }
    setProfileImage(myRenamedFile)
  }

  const fetchPenName = async (event, data) => {
    if (event === "null") {
      console.log("inside event null");
      setuserPenName(userPenName)
      // await penNameApiCall()
    } else {
      console.log("inside penname event", event.target.value);
      var pen_name = event.target.value
      setuserPenName(pen_name)
      // await penNameApiCall()
    }
    // await penNameApiCall()
  }

  useEffect(() => {
    $('#penName').focusout(function () {
      console.log("out", userPenName);
    })
  }, [])


  const penNameApiCall = async () => {
    console.log("inside pen name api call function", userPenName);
    if (userPenName.length >= 5 || userPenName.length === 15) {
      console.log("pen name passed  in api", userPenName);
      var config = {
        headers: {
          DeviceID: '123456',
          UserID: '1234'
        }
      }
      Axios.get(`${BASE_URL_THINKLY}Publication/IsPennameAvailable/@${userPenName}`, config)
        .then((res) => {
          console.log("inside api call", res, userPenName);
          if (res.data.responseCode === '00') {
            const response = res.data.responseData.available;
            setpenNameResponse(response)
            if (response === false) {
              document.getElementById('penNameAvailableError').style.display = "block";
              document.getElementById('penNameAvailableError').style.top = "calc(62% - 10px)";
              document.getElementById('penNameAvailableError').innerHTML = 'This Pen name is already taken'
            }
          }
        })
        .catch((err) => {
          console.log("IsPennameAvailable error in catch", err);

        });
    }
  }

  const handleDataValidation = () => {
    if (ProfileImage === '') {
      document.getElementById('imageError').style.display = "block";
      document.getElementById('imageError').innerHTML = "Please select an Image for profile"
    } else if (Name === '') {
      document.getElementById('NameError').style.display = "block";
      document.getElementById('NameError').innerHTML = "Please enter your name"
    } else if (userPenName === null || userPenName === '' || userPenName.length === 0) {
      document.getElementById('penNameError').style.display = "block";
      document.getElementById('penNameError').innerHTML = "Please enter the pen name"
    } else if (aboutUser === '') {
      document.getElementById('aboutUserError').style.display = "block";
      document.getElementById('aboutUserError').innerHTML = 'Please write something about yourself'
    } else if (userPenName.length < 5) {
      document.getElementById('penNameFormatError').style.display = "block";
      document.getElementById('penNameFormatError').innerHTML = 'Please match the requested format(Should include minimum 5 characters, maximum 15 characters, no space, no special characters except _). '
    } else {
      fetchPenName("null", userPenName)
      if (penNameResponse === true) {
        setpublishLoader(true)
        var data = new FormData(); // api call for upload Image in azure
        data.append("FileName", ProfileImage);
        const config = {
          headers: {
            "Content-type": "multipart/form-data"
          }
        }
        Axios.post(`${BASE_URL_THINKLY}Image/PostUploadFile/${ProfileImage.name}`, data, config)
          .then((res) => {
            console.log("PostUploadFile@@@@@@@@", res);
            const user_name = Name.trim().replace(/  +/g, ' ').split(" ");
            const firstName = user_name[0];
            const lastName = user_name.length > 0 ? user_name[1] : ''
            if (apiCallUpdate !== undefined && apiCallUpdate !== null) {
              handleUpdateProfile(firstName, lastName)
            } else {
              handleCreateProfile(firstName, lastName)
            }
          })
          .catch((err) => {
            console.log("PostUploadFile error in catch", err);
            document.getElementById('pubImageUploadError').innerHTML = 'Oops! Something went wrong. Try again'
          });
      }
    }

  }

  const handleCreateProfile = (firstName, lastName) => {
    // const user_name = Name.trim().replace(/  +/g, ' ').split(" ");
    // const firstName = user_name[0];
    // const lastName = user_name.length > 0 ? user_name[1] : '' 
    var data = new FormData();
    data.append("FirstName", firstName);
    data.append("LastName", lastName);
    data.append("Penname", "@" + userPenName);
    data.append("SourceName", source !== null ? 'Gplus' : "Application"); //pass source name according to signIn source
    data.append("DeviceID", "12345");
    data.append("GCMID", "");
    data.append("EmailID", getEmail !== undefined ? getEmail : '');
    data.append("AboutMe", aboutUser);
    data.append("ImageName", "@" + ProfileImage.name);
    data.append("Password", UID !== null ? UID : '');  //if gmail then pass Uid here else empty
    data.append("SelectedCategory", []);
    data.append("UserName", Name);
    data.append("InviteCode", "");
    data.append("EnableSupport", true);

    var config = {
      headers: {
        "Channel": "WEB",
      }
    };
    Axios.post(`${BASE_URL_THINKLY}User/v2/RegisterUser`, data, config)
      .then((res) => {
        console.log("RegisterUser response", res.data);
        if (res.data.responseCode === '00') {
          const userID = res.data.responseData.UserID;
          const pen_name = res.data.responseData.PenName.charAt(0) === '@' ? res.data.responseData.PenName.substring(1) : res.data.responseData.PenName
          const ImageName = res.data.responseData.ImageName.charAt(0) === '@' ? res.data.responseData.ImageName.substring(1) : res.data.responseData.ImageName
          setpublishLoader(false)
          history.push({
            pathname: '/account/Created',
            userID: userID,
            penName: pen_name,
            profile: ImageName,
          })
        } else if (res.data.responseCode === '01') {
          // alert("not registered")
        }
      })
      .catch((err) => {
        console.log("RegisterUser error in catch", err);
      });
  }

  const handleUpdateProfile = (firstName, lastName) => {
    console.log(firstName, lastName, aboutUser, ProfileImage.name, userPenName);
    var config = {
      method: 'POST',
      headers: {
        "DeviceID": process.env.REACT_APP_DEVICE_ID,
        "UserID": apiCallUpdate
      },
      data: {
        FirstName: firstName,
        LastName: lastName,
        AboutMeText: aboutUser,
        ProfileImage: ProfileImage.name,
        Penname: "@" + userPenName
      }
    };
    Axios(`${BASE_URL_THINKLY}User/v2/UpdateUser`, config)
      .then((res) => {
        console.log(firstName, lastName, aboutUser, ProfileImage.name, userPenName);
        console.log("UpdateUser response", res.data);
        if (res.data.responseCode === '00') {
          const pen_name = res.data.responseData.PenName.charAt(0) === '@' ? res.data.responseData.PenName.substring(1) : res.data.responseData.PenName
          const ImageName = res.data.responseData.ProfileImage.charAt(0) === '@' ? res.data.responseData.ProfileImage.substring(1) : res.data.responseData.ProfileImage
          setpublishLoader(false)
          history.push({
            pathname: '/account/Created',
            userID: res.data.responseData.UserID,
            penName: pen_name,
            profile: ImageName,
          })
        } else if (res.data.responseCode === '01') {
          // alert("not registered")
        }
      })
      .catch((err) => {
        console.log("UpdateUser error in catch", err);
      });
  }

  return (<>
    <Header />
    <div className='container header-gap'>
      {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='fs-30 fw-bold mb-4 '>Complete My Page</div>
            <div className='text-center'>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                </div>
            </div>
        </div> */}
      <div className='text-center' style={isMobile ? { marginTop: '30px', marginBottom: '70px' } : {}}>
        <div className='fs-30 fw-bold mb-4 '>Complete My Page</div>
        <Card id="img-preview" style={{ height: 'auto', width: '200px', border: 'none', display: 'inline-flex', objectFit: 'cover', objectPosition: 'center' }}> </Card>
        <div className='row d-flex'>
          <div className='col-12'>
            <Card className='mx-auto' id="select-image-card" style={!isMobile ? { width: '15%', paddingTop: '70px', paddingBottom: '60px' } : { width: '50%', paddingTop: '70px', paddingBottom: '60px' }}>
              <input type='file' name='choose-file' accept="image/*" id='choose-file' style={{ display: 'none' }} onChange={(e) => uploadImage(e.target.value)} />
              <label htmlFor='choose-file'>
                <AddPhotoAlternate style={{ color: '#e98c37' }} />
              </label>
            </Card>
            <p htmlFor='choose-file' style={{ color: 'rgb(60, 116, 147)', fontWeight: '500' }}> {imageUploadedMsg ? <label htmlFor='choose-file'>Change Profile Picture</label> : 'Add Profile Picture'} </p>
            {ProfileImage === '' && <div id="imageError" className='error-msg' style={{ display: 'none' }}></div>}
            <div id="pubImageUploadError" className='error-msg' style={{ display: 'none' }}></div>
          </div>
        </div>
        <div className='row d-flex'>
          <div className={isMobile ? 'col-12 mx-auto' : 'col-4 mx-auto'}>
            <div className='row pl-4 pr-4'>
              <label className='float-left fs-15'>Full Name</label>
              <input type="text" name='Name' id='Name' className="input-field fs-18" style={{ textTransform: 'capitalize' }} minLength='5' maxLength='50' placeholder='Example: "Madhuri Yadav"' value={Name} onChange={(e) => setName(e.target.value)} required />
              {Name === '' && <div id='NameError' className='float-left error-msg' style={{ display: 'none' }}></div>}
            </div>
            <div className='row pl-4 pr-4 pt-4' style={{ position: 'relative' }}>
              <label className='float-left fs-15'>My web page link</label>
              <span className='fs-18' style={{ position: 'absolute', color: '#717171', top: 'calc(75% - 10px)', left: '30px' }}>uat.thinkly.me/</span>
              <input type="text" name='penName' id='penName' minLength='5' maxLength='15' className='input-field fs-18 fc-black' style={{ paddingLeft: '124px', marginTop: '3px' }}
                placeholder='mypagename' value={userPenName} onChange={(e) => fetchPenName(e, "null")} required />
              {penNameResponse !== undefined && penNameResponse === false && <div id="penNameAvailableError" className='float-left error-msg' style={{ display: 'none' }}></div>}
              {userPenName !== null && userPenName.length < 5 && <div id="penNameFormatError" className='float-left error-msg' style={{ display: 'none' }}></div>}
              {userPenName === null || userPenName === '' && <label id='penNameError' className='float-left error-msg' style={{ display: 'none' }}></label>}
            </div>

            <div className='row pl-4 pr-4 pt-4'>
              <label className='float-left fs-15'>About Me</label>
              <textarea rows="4" name='aboutUser' id='aboutUser' maxLength={1000} className='input-field fs-18' placeholder='Tell us something about yourself' value={aboutUser} onChange={(e) => setaboutUser(e.target.value)} required />
              {aboutUser === '' && <label id='aboutUserError' className='float-left error-msg'></label>}
              <button type='button' className='button-sign-in mt-4 fw-bold border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto' style={{ width: '100%' }} onClick={() => handleDataValidation()}>
                {publishLoader ? <CircularProgress style={{ width: '20px', height: '20px', color: '#fff' }} /> : 'Done'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>)
}

export default NewProfile