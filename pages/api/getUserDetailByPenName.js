import { baseUrl } from "./api";
import Axios from 'axios';

export const FetchUserDetailByPenname = (penName) => {
    console.log("inside api from api, baseUrl, and penname", baseUrl, penName);
    var config = {
        headers: {
            "Content-Type": "application/json",
            "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
            "UserID": 0
        },
    };
    Axios.get(`${baseUrl._currentValue}User/GetDetailsByPenName/${penName}`, config)
        .then((res) => {
            console.log("Get user Details By PenName@@@@@", res.data);
            res.data
        })
        .catch((err) => {
            console.log("getUserProfileDateils error in catch", err);
        });
}