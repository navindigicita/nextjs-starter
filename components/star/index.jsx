import React, { useState, useEffect, useContext } from 'react'
import { CircularProgress, ListItemText, Box } from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { isMobile } from 'react-device-detect'
// import "../css/myStar.css"
// import { UserTransactionsConfiguration } from '../../../configs/remoteConfig'
// import { RemoteConfiguration } from '../config/individualThinkly';
import Axios from 'axios'
import { baseUrl, baseUrlTest, baseUrlThinkly, baseUrlThinklyApi2 } from '../../pages/api/api'
import $ from 'jquery' 
import { Card } from 'react-bootstrap'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateMomentUtils from '@date-io/moment'
import moment from "moment";
import Reward from '../../public/Rewards.svg'
import { Star } from '@material-ui/icons'
import RedeemModal from './redeemModal'

const MyStar = (props) => {
    const BASE_URL_THINKLY = useContext(baseUrlThinkly)
    const BASE_URL_THINKLY_API2 = useContext(baseUrlThinklyApi2)
    const [userTransactionsData, setUserTransactionsData] = useState([])  //api data store, sorted according to filter
    const [myRewardsData, setMyRewardsData] = useState() //for StarAwards/MyRewards api
    const [FilterData, setFilterData] = useState([])  //store config return data in it for button binding
    const [TransactionsFilterType, setTransactionsFilterType] = useState() //set filterType
    const [TransactionsNoOfDays, setTransactionsNoOfDays] = useState(0) //set noOfDays
    const [fromDate, setFromDate] = useState(moment()) //for from date in standard format in object
    const [inputValueFrom, setInputValueFrom] = useState(moment().format("DD-MM-YYYY"));  //for from date in custom format
    const [toDate, setToDate] = useState(moment()) //for to date in standard format in object
    const [inputValueToDate, setInputValueToDate] = useState(moment().format("DD-MM-YYYY"));  //for to date in custom format
    const [selectedIndex, setselectedIndex] = useState(0)
    const [authorID, setAuthorID] = useState(props.authorID)
    const [StartDate, setStartDate] = useState()  //standard formated start date
    const [EndDate, setEndDate] = useState()  //standard formated end date
    const [EnableCustomDataButton, setEnableCustomDataButton] = useState(false)
    const [show, setShow] = useState(false); //for reedem modal
    const [UserBalance, setUserBalance] = useState(props.UserBalance)
    const [StartIndex, setStartIndex] = useState(0)
    const [EndIndex, setEndIndex] = useState(10)


    useEffect(() => {
        document.getElementById("defaultOpen").click();
        if (props.authorID !== undefined && props.UserBalance !== undefined) {
            setAuthorID(props.authorID)  //state
            MyRewards()  //function
            setUserBalance(props.UserBalance)  //state
        }
        const fetchfilterdata = async () => {
            const data = await UserTransactionsConfiguration()
            if (data !== undefined && data !== null && data !== '') {
                const TransConfigData = JSON.parse(data)
                setFilterData(TransConfigData)  //remote config data store in state
                GetMyTransactions(TransConfigData[0].filterType, TransConfigData[0].noOfDays)  //function call
            } 
            // else {
            //     const jsonData = transactionFilterData;  //json hardcoded data
            //     setFilterData(jsonData)
            //     GetMyTransactions(jsonData[0].filterType, jsonData[0].noOfDays)   //function call
            // }
        }
        fetchfilterdata()
    }, [])

    const handleButtonIndex = (index, filterType, noOfDays) => {
        if (filterType !== 'OTHER') {
            setUserTransactionsData(undefined)
        } else {
            setUserTransactionsData('custom')
        }
        setselectedIndex(index)  //index of filter store in state to handle background color and get data of that filter as well
        setTransactionsFilterType(filterType)  //store filter type in state
        setTransactionsNoOfDays(noOfDays)  //store number of days according to respective filter type iun state
        var date = ''
        if (filterType === 'LASTWEEK') {
            date = moment().subtract(7, 'days').format("DD-MM-YYYY")
        } else if (filterType === 'LASTMONTH') {
            date = moment().subtract(30, 'days').format("DD-MM-YYYY")
        }
        if (filterType !== 'OTHER') {
            GetMyTransactions(filterType, noOfDays, date)  //function
        }
    }

    const openTab = (event, tabName) => {
        var i, tabContent, tablinks;
        tabContent = document.getElementsByClassName("tabContent");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
    }

    const GetMyTransactions = (filterType, noOfDays, Fromdate, todate) => {
        var config = {
            method: 'POST',
            headers: {
                'DeviceID': '123456',
                'UserID': authorID
            },
            data: {
                "FromDate": filterType === 'LAST10' ? '' : Fromdate,
                "ToDate": filterType !== 'OTHER' ? '' : todate,
                "FilterType": filterType,
                "NoOfDays": noOfDays
            }
        }
        Axios(`${BASE_URL_THINKLY}User/GetMyTransactions`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    setUserTransactionsData(res.data.responseData)
                } else if (res.data.responseCode === '03') {
                    setUserTransactionsData(null)
                }
            })
            .catch((err) => {
                console.log("error response of My Transactions", err);
            });

    }

    function scrollThinklies() {
        setStartIndex(EndIndex)
        setEndIndex(EndIndex + 10)
    }

    //function for My Redemptions 
    const MyRewards = () => {
        var config = {
            method: 'POST',
            data: {
                "touserID": authorID,
                "startIndex": StartIndex,
                "endIndex": EndIndex,
                "ChannelID": process.env.REACT_APP_CHANNEL_ID
            }
        }
        Axios(`${BASE_URL_THINKLY_API2}StarAwards/MyRewards`, config)
            .then((res) => {
                if (res.data.responseCode === '00') {
                    const response = JSON.parse(res.data.responseData)
                    const rewardData = response.Table
                    if (myRewardsData !== undefined && myRewardsData.length > 0) {
                        setMyRewardsData(myRewardsData => [...myRewardsData, ...rewardData])
                        scrollThinklies()
                    } else {
                        setMyRewardsData(rewardData)
                    }
                }
            })
            .catch((err) => {
                // console.log("error of MyRewards", err);
            });
    }

    const startDate = (date, value) => {
        var todaysDate = new Date()
        if (Date.parse(todaysDate) > Date.parse(date._d)) {
            document.getElementById('error').innerHTML = "";
            setFromDate(value);
            setInputValueFrom(value)
            setStartDate(date._d)
        } else {
            document.getElementById('error').innerHTML = "Selected date should be less than today's date";
        }
    };

    const endDate = (date, value) => {
        var todaysDate = new Date()  //today date
        var formattedSelectedDate = date._d //selected date
        if (StartDate !== undefined) {
            document.getElementById('error').innerHTML = "";
            if (Date.parse(formattedSelectedDate) < Date.parse(todaysDate) && Date.parse(formattedSelectedDate) > Date.parse(StartDate)) {
                document.getElementById('error').innerHTML = "";
                setToDate(value)
                setInputValueToDate(value)
                setEndDate(date._d)
                var Difference_In_Time = formattedSelectedDate.getTime() - StartDate.getTime();  //substraction of end date to start date
                var Final_Days = Difference_In_Time / (1000 * 3600 * 24);  // number of days in long float

                var days_limit = FilterData.filter(obj => obj.filterType === 'OTHER')

                if (Final_Days >= days_limit[0].noOfDays) {
                    document.getElementById('error').innerHTML = "Oops! days limit exceeds";
                    setUserTransactionsData('custom')
                    setEnableCustomDataButton(false)  //enable button
                } else {
                    document.getElementById('error').innerHTML = "";
                    setEnableCustomDataButton(true)  //enable button
                }
            } 
            // else {
            //     document.getElementById('error').innerHTML = "Selected date should be less than start and today's date";
            //     setUserTransactionsData('custom')
            //     setEnableCustomDataButton(false)
            // }
        } else {
            document.getElementById('error').innerHTML = "Please select start data first";
        }
    }

    const handleDateValidation = (fromDate, toDate, inputValueFrom, inputValueToDate) => {
        GetMyTransactions(TransactionsFilterType, TransactionsNoOfDays, inputValueFrom, inputValueToDate)
    }

    const handleShow = () => {
        setShow(true); //on click show redeem modal
    }

    return (<>
        <div className='container'>
            <div className='col-12'>
                <Card className='py-2' style={{ border: 'lightgray 1px solid', borderRadius: '10px' }}>
                    <div className={`fw-bold text-center ${isMobile ? 'fs-18' : 'f2-20'}`}>My Stars Balance</div>
                    <div className={isMobile ? 'fw-bold text-center fs-20' : 'fw-bold text-center fs-40'}>
                        {UserBalance !== undefined ? UserBalance : '0'} <Star className='fc-primary' style={{ height: '42px', width: '42px', marginTop: '-7px' }} />
                    </div>
                    <div className={isMobile ? 'fw-mid text-center fs-18' : 'fw-mid text-center fs-20'}>
                        <div>
                            <button data-toggle="modal" data-target="#redeemModal" className='border-none text-center fs-18 p-10 fc-link bg-white fw-mid-bold' onClick={() => handleShow()}>Redeem</button>
                        </div>
                    </div>
                </Card>

                <div className="tab mt-1 " >
                    <button className='col-6 tablinks fc-gray active' onClick={(event) => openTab(event, 'Translations')} id="defaultOpen" ><b>My Transactions</b></button>
                    <button className='col-6 tablinks fc-gray' onClick={(event) => openTab(event, 'Redemptions')} ><b>My Redemptions</b></button>
                </div>
                <div id="Translations" className="tabContent" >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {FilterData !== undefined && FilterData.length > 0 && FilterData.map((obj, index) => {
                            return (<>
                                <button className='transactionbydate mt-3' style={selectedIndex === index ? { background: '#ffe7cc' } : { background: '#fff' }} key={index} selected={selectedIndex === 0} onClick={() => handleButtonIndex(index, obj.filterType, obj.noOfDays)}>{obj.filterName}</button>
                            </>)
                        })}
                    </div>
                    {TransactionsFilterType === 'OTHER' && <div className='row calendarSetUp'>
                        <MuiPickersUtilsProvider utils={DateMomentUtils} libInstance={moment} >
                            <span className='col-1'></span>
                            <KeyboardDatePicker className='col-3'
                                label='Start Date'
                                autoOk={true}
                                showTodayButton={true}
                                value={fromDate}
                                format="DD-MM-YYYY"
                                inputValue={inputValueFrom}
                                onChange={startDate}
                                InputProps={{ readOnly: true }}
                            />
                            <span className='col-1'></span>
                            <KeyboardDatePicker className='col-3'
                                disableFuture
                                label='End Date'
                                autoOk={true}
                                showTodayButton={true}
                                value={toDate}
                                format="DD-MM-YYYY"
                                inputValue={inputValueToDate}
                                onChange={endDate}
                                InputProps={{ readOnly: true }}
                            />
                        </MuiPickersUtilsProvider>
                        <span className='col-1'></span>
                        <div className='col-1'>
                            {!EnableCustomDataButton ? <button id='customgo' style={{ width: '84px', cursor: 'not-allowed' }} className=' mt-2 fw-mid fc-white border-radius-6 border-none bg-lightgray fs-20 text-center height-button'>Go</button>
                                : <button id='customgo' style={{ width: '84px' }} className=' mt-2 fw-mid fc-white border-radius-6 border-none primary-bg-color fs-20 text-center height-button' onClick={() => handleDateValidation(fromDate, toDate, inputValueFrom, inputValueToDate)} >Go</button>}
                        </div>
                        <label id="error" className='error-msg' />
                    </div>}

                    {userTransactionsData === 'custom' ? '' : <>
                        {userTransactionsData === null ? <div className='text-center'>No Transactions Found</div> : <>
                            {userTransactionsData !== undefined && userTransactionsData.length > 0 ? userTransactionsData.map((obj) => {
                                const countIcon = obj.trnStarImage !== undefined && obj.trnStarImage.charAt(0) === '@' ? obj.trnStarImage.substring(1) : obj.trnStarImage //img url format
                                const transcationIcon = obj.trnImage !== undefined && obj.trnImage.charAt(0) === '@' ? obj.trnImage.substring(1) : obj.trnImage //img url format
                                var trnColor = ''
                                if (obj.trnSign === "-") {
                                    trnColor = 'negative'
                                } else {
                                    trnColor = 'positive'
                                }
                                return (<>
                                    <Card className='my-3'>
                                        <div className='row'>
                                            <div className='col-1 py-2 mt-1'>
                                                <img src={transcationIcon} alt="transcation Icon" style={{ height: '30px', width: '30px' }} />
                                            </div>
                                            <div className='col-8'>
                                                <ListItemText primary={<div>
                                                    <span className='fw-bold'>{obj.trnName}</span>
                                                    <FiberManualRecordIcon className='mx-1' style={{ fontSize: '0.6em' }} />
                                                    <span>{obj.trnDate}</span>
                                                </div>}
                                                    secondary={<p>{obj.trnDescription}</p>} />
                                            </div>
                                            <div className='col-3'>
                                                <ListItemText className='float-right'
                                                    primary={<Box component="span" className='float-right border-radius-4 bg-lightgray fs-12 px-2'>{obj.trnSource}</Box>}
                                                    secondary={<div className={`${trnColor === 'negative' ? 'fc-red' : 'fc-green'} fs-20 float-right fw-mid-bold`} >
                                                        <span>{obj.trnSign}</span>
                                                        <span>{obj.trnNoOfStars}</span>
                                                        <span> <img style={{ width: "20px", marginTop: '-5px' }} src={countIcon} alt="transcation star Icon" /></span>
                                                    </div>}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                    <hr />
                                </>)
                            }) : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                                <CircularProgress aria-label="Loading..." />
                            </div>}
                        </>}
                    </>}
                </div>

                {/* Redemption Tab */}
                <div id="Redemptions" className="tabContent">
                    <p className='mt-2 text-center fs-22 fw-bold'>You have {myRewardsData !== undefined ? myRewardsData.length : '0'} rewards</p>
                    {myRewardsData !== undefined && myRewardsData.length > 0 ? myRewardsData.map((obj, index) => {
                        const imageUrl = obj.CatalogueImage !== undefined && obj.CatalogueImage.charAt(0) === '@' ? obj.CatalogueImage.substring(1) : obj.CatalogueImage //img url format
                        var d = new Date(obj.ExpiryDate)
                        var expdate = d.toDateString() //expiry date format
                        return (<>
                            <div className='row my-1' key={index}>
                                <div className='col-12 px-3' style={{ backgroundImage: `url(${Reward})`, backgroundRepeat: "no-repeat", backgroundPosition: 'center', backgroundSize: "500px", width: "100%", padding: "70px" }}>
                                    <div className='row d-flex'>
                                        <div className='col-8 mx-auto'>
                                            <div className='row'>
                                                <ListItemText className='col-8' style={{ height: "110px" }} primary={<h2 className='fs-18'>{obj.CatalogueName}</h2>} secondary={<p className='fs-12'>{obj.Description}</p>} />
                                                <div className='col-4'>
                                                    <img src={imageUrl} style={{ height: "80px", width: "80px" }} alt='image'></img>
                                                </div>
                                            </div>
                                            <hr style={{ borderTop: "1px dashed #8f8f8f" }} />
                                            <p>Expires On {expdate}</p>
                                            <Box component="span" style={{ background: "#ffefd0", color: "#8f8f8f", borderRadius: 1, fontSize: 15, padding: "15px" }}>{obj.Code}</Box>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>)
                    }) : <> {myRewardsData !== undefined && myRewardsData.length === 0 ? '' : <div style={{ padding: '150px 0px', textAlign: 'center' }}>
                        <CircularProgress aria-label="Loading..." />
                    </div>}
                    </>}
                </div>
            </div>
        </div>
        {/* on redeem click */}
        <RedeemModal authorID={authorID} UserBalance={UserBalance} showModal={show} onChangeCallback={props.onChangeCallback} onChangeCallback1={props.onChangeCallback1} />
    </>)

}

export default MyStar