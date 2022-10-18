import React, { useEffect, useState } from 'react'
import { Avatar, ListItemText, Card, CircularProgress } from "@material-ui/core"
import { AssignmentIndOutlined } from "@material-ui/icons"
import Image from 'next/image';

const SideBar = (props) => {
    const [profileData, setProfileData] = useState();
    const [aboutMe, setaboutMe] = useState();
    const [CopyUrl, setCopyUrl] = useState(false)
    const [isPartialUser, setisPartialUser] = useState(false)
    const [UserUrl, setUserUrl] = useState()
    const [supporterData, setsupporterData] = useState()

    useEffect(() => {
        if (props.profileJson !== undefined && props.supporterData !== undefined) {
            setProfileData(props.profileJson)
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
        props.profileDetail(page)
        if (index === 0) {
            document.getElementById('dashboard').style.background = '#ffe7cc'
            document.getElementById('Publication').style.background = '#fff'
            document.getElementById('Libraries').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#fff'
        } else if (index === 1) {
            document.getElementById('dashboard').style.background = '#fff'
            document.getElementById('Publication').style.background = '#ffe7cc'
            document.getElementById('Libraries').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#fff'
        } else if (index === 2) {
            document.getElementById('dashboard').style.background = '#fff'
            document.getElementById('Publication').style.background = '#fff'
            document.getElementById('Libraries').style.background = '#ffe7cc'
            document.getElementById('thinkly').style.background = '#fff'
        } else if (index === 3) {
            document.getElementById('dashboard').style.background = '#fff'
            document.getElementById('Publication').style.background = '#fff'
            document.getElementById('Libraries').style.background = '#fff'
            document.getElementById('thinkly').style.background = '#ffe7cc'
        }
    }

    const copyLink = () => {
        // var url = document.getElementById("userShareUrl").innerHTML;
        navigator.clipboard.writeText(UserUrl).then(function () {
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
        if (typeof window !== "undefined") {
            var newWindow = window.open(`/${data1}`, '_blank')
            newWindow.penName = data1  //this line is to pass penName to userProfile page
            // newWindow.userStauts = loginStatus
        }
    }

    return (<>
        {profileData !== undefined && profileData !== null ? <>
            {/* profile Image and user name show and onclick of it will take user to new tab with user profile url */}
            <div className='row cursor-pointer' onClick={() => handleUserProfile()}>
                {profileData.profileDetails.profileImage !== undefined && profileData.profileDetails.profileImage !== null ?
                    <Image src={profileData.profileDetails.profileImage.charAt(0) === '@' ? profileData.profileDetails.profileImage.substring(1) : profileData.profileDetails.profileImage} alt="user profile" height={50} width={50} style={{ borderRadius: '50%' }} />
                    : <Avatar style={{ width: '50px', height: '50px' }} src={<AssignmentIndOutlined />} />
                }
                <ListItemText style={{ marginTop: '7px', marginLeft: '15px' }} //onClick={() => props.profileDetail('ProfileDetail')}
                    primary={<div className='fs-18' style={{ lineHeight: '1' }}>
                        <span className="header-font">
                            <b>{profileData.profileDetails.firstName + " " + profileData.profileDetails.lastName}</b>
                        </span>
                    </div>}
                    secondary={<span className='fs-14'>{aboutMe}</span>} />
                {/* <text className='float-right' style={{ fontSize: '12px', fontWeight: 'bold', color: '#ea7f00', marginTop: '7px' }}>EDIT</text> */}
            </div>
            <div className='row mt-4'>
                <div className='col-1 p-0'>
                    <Image src={'/bio-link.svg'} alt='Bio_link' height={25} width={25} />
                </div>
                <div className='col-11' style={{ lineHeight: '1' }}>
                    <h6 className='fs-12 fc-link break-words' id="userShareUrl">{UserUrl}</h6>
                    <h6 className='fs-12 fc-primary fw-mid cursor-pointer' onClick={() => copyLink()}>{CopyUrl ? 'Copied' : 'Copy Link'}</h6>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col-12' style={{ width: 'auto', paddingLeft: '0px', paddingRight: '0px' }}>
                    <Card className="p-2 mt-2 fs-16 fw-mid cursor-pointer" style={{ background: '#ffe7cc' }} id="dashboard" onClick={(event) => handleListItemClick(event, 0, 'Dashboard')}>
                        <span>My True-fans</span>
                        <span className='float-right'>{supporterData !== undefined && supporterData.TotalSupporters}</span>
                    </Card>
                    {!isPartialUser && <>
                        <Card className="p-2 mt-2 fs-16 fw-mid cursor-pointer" id="Publication" onClick={(event) => handleListItemClick(event, 1, 'Publication')}>
                            <span>My Publication</span>
                            <span className='float-right'>{profileData.otherDetails.totalPublicationsCount}</span>
                        </Card>
                        <Card className="p-2 mt-2 fs-16 fw-mid cursor-pointer" id="Libraries" onClick={(event) => handleListItemClick(event, 2, 'Libraries')}>
                            <span>My Library</span>
                        </Card>
                        {/* <Card className="p-2 mt-2 fs-16 fw-mid cursor-pointer" id="thinkly" onClick={(event) => handleListItemClick(event, 2, 'Thinkly')}>
                            <span>My Posts</span>
                            <span className='float-right'>{profileData.otherDetails.totalThinkliesCount}</span>
                        </Card> */}
                    </>}
                </div>
            </div>
        </> : <CircularProgress aria-label="Loading..." />}
    </>)
}

export default SideBar;