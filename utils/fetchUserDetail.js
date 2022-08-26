export const fetchUserAccessToken = () => {
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem("accessToken") !== undefined
            ? JSON.parse(localStorage.getItem("accessToken"))
            : localStorage.clear();

        return accessToken;
    }
}


export const fetchUserInfo = () => {
    if (typeof window !== 'undefined') {
        const userInfo = localStorage.getItem("user") !== undefined
            ? JSON.parse(localStorage.getItem("user"))
            : localStorage.clear();

        return userInfo;
    }
}