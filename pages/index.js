import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import Axios from "axios";
import { withRouter } from 'next/router';
import { baseUrl } from './api/api'
import { RemoteConfiguration } from '../config/individualThinkly';
import Header from '../components/common/header';
import SideBar from '../components/dashboard/sidebar';
import Thinklies from '../components/posts/thinklies';
import Publication from '../components/publication/publications';
import DashboardPage from '../components/dashboard/deshaboardPage';

const HomePage = (props) => {
  const BASE_URL = useContext(baseUrl);
  const userIDQuery = props.router.query.userID;
  const userStatusQuery = props.router.query.userStatus;
  const [user_ID, setuser_ID] = useState()
  const [user_status, setuser_status] = useState()
  const [thinklyConfigData, setthinklyConfigData] = useState()
  const [value, setValue] = useState(null);
  const [getIsValue, setIsvalue] = useState(false);
  const [profileData, setProfileData] = useState();
  // const [Headervisible, setHeadervisible] = useState(false)
  const [supporterData, setsupporterData] = useState()

  useEffect(() => {
    async function fetchData() {
      console.log("inside fetchData@@@@@@@");
      const remoteConfigData = await RemoteConfiguration()
      console.log("remote Config Json", remoteConfigData);
      const remoteConfigJson = JSON.parse(remoteConfigData)
      setthinklyConfigData(remoteConfigJson)
      if (props.userID !== undefined && props.userStatus !== undefined) {  //from multi account
        console.log("inside props data condition", props.userID, props.userStatus);
        setuser_ID(props.userID)
        setuser_status(props.userStatus)
      } else if (userIDQuery !== undefined && userStatusQuery !== undefined) {  //from single account
        console.log("inside history data props", userIDQuery, userStatusQuery);
        setuser_ID(userIDQuery)
        setuser_status(userStatusQuery)
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    if (user_ID !== undefined) {
      fetchUserProfileData(user_ID)
      fetchSupporterData(user_ID)
    }
  }, [user_ID])


  function fetchUserProfileData(authorID) {
    console.log("inside fetch user profile data@@@@@@", authorID, BASE_URL);
    var config = {
      headers: {
        "Content-Type": "application/json",
        "DeviceID": "123456",
        "UserID": authorID
      },
    };
    Axios.get(`${BASE_URL}User/GetUserProfileByID/${authorID}`, config)
      .then((res) => {
        console.log("inside api function", res);
        if (res.data.responseCode === '00') {
          // setHeadervisible(true)
          console.log("GetUserProfileByID response in Index@@@@", res.data.responseData);
          window.sessionStorage.setItem("PublicationCount", res.data.responseData.otherDetails.totalPublicationsCount)
          setProfileData(res.data.responseData);
        } else if (res.data.responseCode === "02") {
          console.log("GetUserProfileByID response@@@@", res);
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
    console.log("inside fetch support data@@@@@", authorID, BASE_URL);
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
    {profileData !== undefined && profileData !== null ? <div className={isMobile ? 'container' : 'container pr-5'}>
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
    </div>}
  </>)
}

export default withRouter(HomePage)
