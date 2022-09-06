import { baseUrl } from "./api";

const FetchUserDetailByPenname = (penName) => {
    var config = {
        headers: {
            "Content-Type": "application/json",
            "DeviceID": process.env.NEXT_PUBLIC_DEVICE_ID,
            "UserID": "3223"
        },
    };
    Axios.get(`${baseUrl}User/GetDetailsByPenName/${penName}`, config)
        .then((res) => {
            console.log("Get user Details By PenName@@@@@", res.data);
            if (res.data.responseCode === '00') {
                const response = res.data.responseData
                console.log("inside Get User Profile details@@@@@@@@", res.data.responseData);
                return response
            }
        })
        .catch((err) => {
            console.log("getUserProfileDateils error in catch", err);
        });
}

export default FetchUserDetailByPenname