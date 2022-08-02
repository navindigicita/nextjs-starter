import React, { useEffect, useState } from 'react'
import { Avatar, ListItemText, Card, CircularProgress } from "@material-ui/core"
import { AssignmentIndOutlined } from "@material-ui/icons"

const SideBar = (props) => {
    const [profileData, setProfileData] = useState();
    const [loginStatus, setloginStatus] = useState()
    const [aboutMe, setaboutMe] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0) //set index of thinkly type
    const [CopyUrl, setCopyUrl] = useState(false)
    const [isPartialUser, setisPartialUser] = useState(false)
    const [UserUrl, setUserUrl] = useState()
    const [supporterData, setsupporterData] = useState()

    useEffect(() => {
        if (props.profileJson !== undefined && props.userStatus !== undefined && props.supporterData !== undefined) {
            console.log("props data successed", props.profileJson);
            setProfileData(props.profileJson)
            setloginStatus(props.userStatus)
            setsupporterData(props.supporterData)
        }
    }, []);

    useEffect(() => {
        if (profileData !== undefined && profileData !== null) {
            const t_name = profileData.profileDetails.aboutMe;
            const count = 20;
            const thinkly_name = t_name.slice(0, count) + (t_name.length > count ? "..." : "");
            setaboutMe(thinkly_name)
            setisPartialUser(profileData.profileDetails.isPartialProfile)
            var data = profileData.profileDetails.penName
            var data1 = data.charAt(0) === '@' ? data.substring(1) : data
            var url = process.env.NEXT_PUBLIC_BASE_URL + data1
            setUserUrl(url)
        }
    }, [profileData]);

    const handleListItemClick = (event, index, page) => {
        console.log("thinkly type item index", index);
        setSelectedIndex(index);
        props.profileDetail(page)
        if (index === 0) {
            document.getElementById('publication').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#fff'
            document.getElementById('dashboard').style.background = '#ffe7cc'
        } else if (index === 1) {
            document.getElementById('dashboard').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#fff'
            document.getElementById('publication').style.background = '#ffe7cc'
        } else if (index === 2) {
            document.getElementById('dashboard').style.background = '#fff'
            document.getElementById('publication').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#ffe7cc'
        }
    }

    const copyLink = () => {
        // var url = document.getElementById("userShareUrl").innerHTML;
        navigator.clipboard.writeText(UserUrl).then(function () {
            console.log('Copied!', UserUrl);
            setCopyUrl(true)
            setTimeout(() => {
                setCopyUrl(false)
            }, 2000);
        }, function () {
            console.log('Copy error')
        });
    }

    const handleUserProfile = () => {
        var data = profileData.profileDetails.penName
        var data1 = data.charAt(0) === '@' ? data.substring(1) : data
        var newWindow = window.open(`/${data1}`, '_blank')
        newWindow.penName = data1  //this line is to pass penName to userProfile page
        newWindow.userStauts = loginStatus
    }

    return (<>
        {profileData !== undefined && profileData !== null ? <>
            <div className='row' onClick={() => handleUserProfile()} style={{ cursor: 'pointer' }}>
                {profileData.profileDetails.profileImage !== undefined && profileData.profileDetails.profileImage !== null ?
                    <img src={profileData.profileDetails.profileImage.charAt(0) === '@' ? profileData.profileDetails.profileImage.substring(1) : profileData.profileDetails.profileImage} alt="user profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    : <Avatar style={{ width: '50px', height: '50px' }} src={<AssignmentIndOutlined />} />
                }
                <ListItemText style={{ marginTop: '7px', marginLeft: '15px' }} //onClick={() => props.profileDetail('ProfileDetail')}
                    primary={<div style={{ lineHeight: '1', fontSize: '18px' }}>
                        <span className="header-font"> <b>{profileData.profileDetails.firstName + " " + profileData.profileDetails.lastName}</b> </span> </div>}
                    secondary={<span style={{ fontSize: '14px' }}>{aboutMe}</span>}
                />
                {/* <text className='float-right' style={{ fontSize: '12px', fontWeight: 'bold', color: '#ea7f00', marginTop: '7px' }}>EDIT</text> */}
            </div>
            <div className='row mt-4'>
                <div className='col-1 p-0'>
                    <img src={'bio-link.svg'} alt='Bio_link' />
                </div>
                <div className='col-11' style={{ lineHeight: '0.9' }}>
                    {/* <a style={{ fontSize: '12px', color: '#3c7493', overflowWrap: 'break-word' }} id="userShareUrl">{profileData.profileDetails.profileUrl}</a> <br /> */}
                    <a style={{ fontSize: '12px', color: '#3c7493', overflowWrap: 'break-word' }} id="userShareUrl">{UserUrl}</a> <br />
                    <a style={{ fontSize: '12px', color: '#e98c37', fontWeight: '500', cursor: 'pointer' }} onClick={() => copyLink()}>{CopyUrl ? 'Copied' : 'Copy Link'}</a>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-12' style={{ width: 'auto', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Card className="p-2 mt-2" style={{ fontSize: '16px', fontWeight: '500', cursor: 'pointer', background: '#ffe7cc' }} id="dashboard" selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0, 'Dashboard')}>
                        <text>My True-fans</text>
                        <text className='float-right'>{supporterData !== undefined && supporterData.TotalSupporters}</text>
                    </Card>
                    {!isPartialUser && <>
                    <Card className="p-2 mt-2" style={{ fontSize: '16px', fontWeight: '500', cursor: 'pointer' }} id="publication" selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 1, 'Publication')}>
                        <text>My Publications</text>
                        <text className='float-right'>{profileData.otherDetails.totalPublicationsCount}</text>
                    </Card>
                    <Card className="p-2 mt-2" style={{ fontSize: '16px', fontWeight: '500', cursor: 'pointer' }} id="thinkly" selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 2, 'Thinkly')}>
                        <text>My Posts</text>
                        <text className='float-right'>{profileData.otherDetails.totalThinkliesCount}</text>
                    </Card>
                    </>}
                </div>
            </div>
        </> : <CircularProgress aria-label="Loading..." />}
    </>)
}

export default SideBar;