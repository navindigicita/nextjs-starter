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
import { fetchUserAccessToken } from '../utils/fetchUserDetail';
import Libraries from '../components/publication/libraries';


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
      if (data !== undefined) {
        const remoteConfigJson = JSON.parse(data)
        setthinklyConfigData(remoteConfigJson)
      }
      if (localStorage.getItem('UserID') !== undefined && localStorage.getItem('UserID') !== null) {  //from single account
        const data = localStorage.getItem('UserID')
        setAuthorID(data) //state
        fetchUserProfileData(data)   //function
        fetchSupporterData(data) //function
      } else {
        router.push('/login')
      }
    }
    fetchData()
  }, []);

  function fetchUserProfileData(authorID) {
    var config = {
      headers: {
        "Content-Type": "application/json",
        "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
        "UserID": authorID
      },
    };
    Axios.get(`${BASE_URL}User/GetUserProfileByID/${authorID}`, config)
      .then((res) => {
        if (res.data.responseCode === '00') {
          localStorage.setItem("PublicationCount", res.data.responseData.otherDetails.totalPublicationsCount)
          setProfileData(res.data.responseData);
          console.log("inside fetchUserProfileData function", res.data.responseData);
        } else if (res.data.responseCode === "03") {
          localStorage.clear()
          router.push('/login')
        }
      })
      .catch((err) => {
        console.log("GetUserProfileByID error in catch", err);
      });
  }

  function fetchSupporterData(authorID) {
    var config = {
      headers: {
        "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
        "UserID": authorID
      },
    };
    Axios.get(`${BASE_URL}User/GetMySupportDashboard`, config)
      .then((res) => {
        setsupporterData(res.data.responseData);  //return total supporter count and use balance count
      })
  }

  const profileDetail = (value) => {
    setIsvalue(true);
    setValue(value);
  }

  return (<>
    {/* {props.isSSR ? <p>hello</p> : <p>index page.</p>} */}
    {profileData !== undefined ? <div className={isMobile ? 'container' : 'container pr-5'}>
      <Header user_profile={profileData} thinklyConfigJSON={thinklyConfigData} />
      <div className='row' style={{ marginTop: '5rem' }}>
        <div className={isMobile ? 'col-12 py-4' : 'col-8 pr-5 card-fixed'}>
          {getIsValue ? <>
            {value === 'Libraries' ? <Libraries authorID={AuthorID} />
              : value === 'Publication' ? <Publication authorID={AuthorID} profileJson={profileData} />
                : value === 'Thinkly' ? <Thinklies authorID={AuthorID} profileJson={profileData} />
                  : value === 'Dashboard' ? <DashboardPage profileJson={profileData} supporterData={supporterData} /> : ''}
          </> : <DashboardPage profileJson={profileData} supporterData={supporterData} />}
        </div>
        <div style={{ background: 'lightgray', height: 'auto', width: '1px', marginRight: '-40px', marginLeft: '38px' }}></div>
        {!isMobile && <>
          <div className='col-1'></div>
          <div className='col-3 card-fixed'>
            <SideBar profileDetail={(setValue) => profileDetail(setValue)} profileJson={profileData} supporterData={supporterData} />
          </div>
        </>}
      </div>
    </div> : <div className='grid place-items-center h-screen'>
      <CircularProgress aria-label="Loading..." />
    </div>}
  </>)
}

export default withRouter(HomePage)

// export function getServerSideProps() {
//   const authSession = fetchUserAccessToken();
//   if (!authSession) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       authorized: true,
//     },
//   };
// }

// export async function getServerSideProps() {
//   return { props: { isSSR: true } }
// }
