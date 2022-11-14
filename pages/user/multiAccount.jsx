import React, { useEffect, useState } from 'react'
import { useRouter, withRouter } from 'next/router';
import { Avatar, Card, ListItemText } from '@material-ui/core'
import { AssignmentIndOutlined } from '@material-ui/icons'
import Image from 'next/image';
import $ from 'jquery'

const MultiAccount = () => {
    const router = useRouter();
    const [accountList, setaccountList] = useState()

    useEffect(() => {
        $("#user_account_type").modal('show');
        if (router.query.userData !== undefined) {
            const data = JSON.parse(router.query.userData)
            console.log(data);
            setaccountList(data.UserDetails)
        }
    }, [])

    const handleAccount = (index) => {
        $("#user_account_type").modal('hide')
        const user_id = accountList[index].UserID
        localStorage.setItem('UserID', user_id);
        router.push('/')
    }

    return (
        <div className='container' style={{ paddingTop: '300px' }}>
            <div id="user_account_type" className="modal fade in" tabindex="-1" role="dialog" data-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-background">
                        <div className="modal-body p-2" style={{ height: "80vh" }}>
                            <div className="row">
                                <div className='text-center p-4'>
                                    {accountList !== undefined && accountList.length > 0 && <>
                                        <h2>Welcome Back</h2>
                                        <p>Hey, we found multiple Thinkly accounts for your email <b>{accountList[0].EmailID}</b>. Choose any one to sign in. </p>
                                        <Card style={{ height: '55vh', overflow: 'auto', boxShadow: 'none', paddingTop: '10px' }} >
                                            {accountList.map((obj, index) => {
                                                const imageUrl = obj.UserImage.charAt(0) === '@' ? obj.UserImage.substring(1) : obj.UserImage
                                                return (<div className='row d-flex mb-3'>
                                                    <div className='col-8 mx-auto'>
                                                        <Card className="row d-flex py-1 account-list-card" onClick={() => handleAccount(index)}>
                                                            <div className='col-1 mx-auto my-auto'>
                                                                <Avatar src={obj.UserImage !== undefined ? imageUrl : <AssignmentIndOutlined />} alt="profile" style={{ width: '44px', height: '44px', objectFit:'contain', objectPosition:'center' }} />
                                                            </div>
                                                            <div className='col-10 text-left mx-auto pl-4'>
                                                                <ListItemText
                                                                    primary={<span className='fs-16'> {obj.PenName.charAt(0) === '@' ? obj.PenName.substring(1) : obj.PenName}</span>}
                                                                    secondary={<div className="row" style={{ marginLeft: '0px' }}>
                                                                        <span className='fs-10'> {obj.FirstName + obj.LastName} </span>
                                                                    </div>} />
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </div>)
                                            })}
                                        </Card>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(MultiAccount)
