import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import Image from 'next/image';

const ShareLink = (props) => {
    const [penName, setpenName] = useState(props.linkUrl)
    const [CopyUrl, setCopyUrl] = useState(false)
    const [Path, setPath] = useState()

    useEffect(() => {
        console.log("penName", penName);
        var windowURL = window.location.href
        if (windowURL.indexOf('uat.stars.thinkly.me') > 0) {
            setPath(process.env.NEXT_PUBLIC_BASE_URL + penName)
        } else if (windowURL.indexOf('stars.thinkly.me') > 0) {
            setPath(process.env.NEXT_PUBLIC_BASE_URL + penName)
        } else if (windowURL.indexOf('localhost') > 0) {
            setPath(process.env.NEXT_PUBLIC_BASE_URL + penName)
        }
    }, [penName])



    const shareFacebook = () => {
        console.log("share the facebook link", Path);
        window.open("https://www.facebook.com/sharer/sharer.php?u=" + Path, '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700');
        return false;
    }

    const shareTwitter = () => {
        console.log("share the twitter link", Path);
        window.open("http://twitter.com/share?text=&url=" + Path, '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700');
        return false;
    }

    const shareLinkedin = () => {
        console.log("share the linkedin link", Path);
        window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + Path, '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700');
        return false;
    }

    const shareWhatsapp = () => {
        console.log("share the whatsapp link", Path);
        window.open("https://api.whatsapp.com/send?text=" + Path, '',
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=700');
        return false;
    }

    const shareLink = () => {
        var url = document.getElementById("userShareUrl").innerHTML;
        navigator.clipboard.writeText(url).then(function () {
            console.log('Copied!', url);
            setCopyUrl(true)
            setTimeout(() => {
                setCopyUrl(false)
            }, 2000);
        }, function () {
            console.log('Copy error')
        });
    }

    const handleUrlClick = () => {
        var data1 = penName
        // var data1 = data.charAt(0) === '@' ? data.substring(1) : data
        var newWindow = window.open(`/${data1}`, '_blank')
        newWindow.penName = data1  //this line is to pass penName to userProfile page
    }

    return (<>
        <p className='fs-18 mb-3 fc-link pointer' id="userShareUrl" onClick={() => handleUrlClick()}> {Path}</p>
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={'/facebook.svg'} alt="facebook" width={60} height={40}  className="px-2 pointer" onClick={() => shareFacebook()} />
            <Image src={'/twitter.svg'} alt="twitter" width={60} height={40} className="px-2 pointer" onClick={() => shareTwitter()} />
            <Image src={'/linkend.svg'} alt="linkend" width={60} height={40} className="px-2 pointer" onClick={() => shareLinkedin()} />
            <Image src={'/whatsapp.svg'} alt="whatsapp" width={60} height={40} className="px-2 pointer" onClick={() => shareWhatsapp()} />
        </div>
        <div className='row d-flex'>
            <button type='button' onClick={() => shareLink()} className='button-sign-in mt-4 mx-auto fw-bold border-radius-4 fc-white border-none primary-bg-color height-button fs-18 ff-roboto' style={isMobile ? { width: '78%' } : { width: '50%' }} > {CopyUrl ? 'Copied' : 'Copy Link'} </button>
        </div>
    </>)
}

export default ShareLink