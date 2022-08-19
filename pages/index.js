import head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import Axios from "axios";
import { withRouter, useRouter } from 'next/router';
import { baseUrl } from './api/api'
import { RemoteConfiguration } from '../config/individualThinkly';
import Header from '../components/common/header';
import SideBar from '../components/dashboard/sidebar';
import Thinklies from '../components/posts/thinklies';
import Publication from '../components/publication/publications';
import DashboardPage from '../components/dashboard/deshaboardPage';
import Head from 'next/head';
import Script from 'next/script'


const HomePage = (props) => {
  const router = useRouter()
  const BASE_URL = useContext(baseUrl);
  // const userIDQuery = props.router.query.userID;
  // const userStatusQuery = props.router.query.userStatus;
  const [AuthorID, setAuthorID] = useState()
  const [thinklyConfigData, setthinklyConfigData] = useState()
  const [value, setValue] = useState(null);
  const [getIsValue, setIsvalue] = useState(false);
  const [profileData, setProfileData] = useState();
  // const [Headervisible, setHeadervisible] = useState(false)
  const [supporterData, setsupporterData] = useState()
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await RemoteConfiguration()
      const remoteConfigJson = JSON.parse(data)
      console.log("remote Config Json", remoteConfigJson);
      setthinklyConfigData(remoteConfigJson)  //state
      if (props.userID !== undefined && props.userStatus !== undefined) {  //from multi account(pending)
        // console.log("inside props data condition", props.userID, props.userStatus);
        // setuser_ID(props.userID)
        // setuser_status(props.userStatus)
      } else if (localStorage.getItem('UserID') !== undefined && localStorage.getItem('UserID') !== null) {  //from single account
        const data = localStorage.getItem('UserID')
        //console.log("inside single account@@@@@", data);
        setAuthorID(data) //state
        fetchUserProfileData(data)   //function
        fetchSupporterData(data) //function
      } else {
        router.push('/login')
      }
    }
    fetchData()
  }, []);

  // stooped here

  function fetchUserProfileData(authorID) {
    console.log("inside fetch user profile data@@@@@@", authorID);
    var config = {
      headers: {
        "Content-Type": "application/json",
        "DeviceID": "123456",
        "UserID": authorID
      },
    };
    Axios.get(`${BASE_URL}User/GetUserProfileByID/${authorID}`, config)
      .then((res) => {
        console.log("inside fetchUserProfileData function", res);
        if (res.data.responseCode === '00') {
          console.log("GetUserProfileByID response in Index@@@@", res.data.responseData);
          localStorage.setItem("PublicationCount", res.data.responseData.otherDetails.totalPublicationsCount)
          setProfileData(res.data.responseData);
        } else if (res.data.responseCode === "03") {
          console.log("GetUserProfileByID response@@@@", res);
          setProfileData(res.data.responseData)
        } else {
          console.log("GetUserProfileByID else part", res);
        }
      })
      .catch((err) => {
        console.log("GetUserProfileByID error in catch", err);
      });
  }

  function fetchSupporterData(authorID) {
    var config = {
      headers: {
        "DeviceID": "123456",
        "UserID": authorID
      },
    };
    Axios.get(`${BASE_URL}User/GetMySupportDashboard`, config)
      .then((res) => {
        console.log("support data@@@@@@@@@", res.data.responseData);
        setsupporterData(res.data.responseData);
      })
  }

  const profileDetail = (value) => {
    setIsvalue(true);
    console.log("index", value);
    setValue(value);
  }

  return (<>
    <Head>
      {/* <script type="text/javascript" src="/static/hello.js"></script>
      <script type="text/javascript" defer="" nomodule="" src="/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js"></script>
      <script type="text/javascript" src="/_next/static/chunks/webpack-6df21c39820c95f2.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/framework-4d78cf2ac5283a04.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/main-e1474655dc9df174.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/pages/_app-d219945223898b8e.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/7112840a-9233cf2eb8644501.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/946-40f08817acba64b2.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/632-4b283b51bba168dc.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/426-f214dc14432eda7b.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/728-de8d450c9ae63c9b.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/410-f9782eb379fe5ec9.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/chunks/pages/index-89072a427292e377.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/HeBHKw6USCaNMTHLjnoqM/_buildManifest.js" defer=""></script>
      <script type="text/javascript" src="/_next/static/HeBHKw6USCaNMTHLjnoqM/_ssgManifest.js" defer=""></script> */}
    </Head>
    <p>hello</p>
    {/* {profileData !== undefined && profileData !== null ? <div className={isMobile ? 'container' : 'container pr-5'}>
      <Header publicationCount={profileData.otherDetails.totalPublicationsCount} user_profile={profileData}
        authorID={user_ID} userStatus={user_status} thinklyConfigJSON={thinklyConfigData} />
      <div className='row' style={{ marginTop: '5rem' }}>
        <div className={isMobile ? 'col-12 py-4' : 'col-8 pr-5 card-fixed'}>
          {getIsValue ? <>
            {value === 'Publication' ? <Publication authorID={user_ID} profileJson={profileData} />
              : value === 'Thinkly' ? <Thinklies authorID={user_ID} profileJson={profileData} />
                : value === 'Dashboard' ? <DashboardPage profileJson={profileData} supporterData={supporterData} /> : ''}
          </> : <DashboardPage profileJson={profileData} supporterData={supporterData} />}
        </div>
        <div style={{ background: 'lightgray', height: 'auto', width: '1px', marginRight: '-40px', marginLeft: '38px' }}></div>
        {!isMobile && <>
          <div className='col-1'></div>
          <div className='col-3 card-fixed'>
            <SideBar profileDetail={(setValue) => profileDetail(setValue)} profileJson={profileData} userStatus={user_status} supporterData={supporterData} />
          </div>
        </>}
      </div>
    </div> : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
      <CircularProgress aria-label="Loading..." />
    </div>} */}
  </>)
}

export default withRouter(HomePage)

// export async function getServerSideProps(context) {
//   if (localStorage.getItem('UserID') !== undefined) {
//     const data = await RemoteConfiguration()
//     const remoteConfigJson = JSON.parse(data)
//     console.log("remote Config Json", remoteConfigJson);
//   }
//   return {
//     props: { remoteConfigJson }, // will be passed to the page component as props
//   }
// }
