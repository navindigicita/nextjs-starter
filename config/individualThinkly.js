// Individual thinkly and contest json from remote config

import { fetchAndActivate, getRemoteConfig, getValue } from "@firebase/remote-config";
import { firebaseApp } from "../firebase-config";

export const RemoteConfiguration = async () => {
    const remoteConfig = getRemoteConfig(firebaseApp);
    const isFetched = await fetchAndActivate(remoteConfig)
    console.log("ThinklyConfiguration remote config from firebase@@@@@", isFetched);
    if (!isFetched) {
        let data = getValue(remoteConfig, "ThinklyConfiguration")
        // window.sessionStorage.setItem("ThinklyConfigData", data._value)
        return data._value
    } else {
        console.log("remoteConfig not found in firebase");
    }
}

// star Transactions data from remote config
export const UserTransactionsConfiguration = async () => {
    const remoteConfig = getRemoteConfig();
    const isFetched = await fetchAndActivate(remoteConfig)
    console.log("UserTransactionsFilterSettings remote config from firebase@@@@@", isFetched);
    if (!isFetched) {
        let data = getValue(remoteConfig, "UserTransactionsFilterSettings")
        return data._value;
    } else {
        console.log("user transaction configuration fetch failed");
    }
}
