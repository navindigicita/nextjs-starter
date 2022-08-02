// Individual thinkly and contest json from remote config

import { fetchAndActivate, getRemoteConfig, getValue } from "@firebase/remote-config";
import FirebaseApp from "../components/firebase/firebaseApp";

export const RemoteConfiguration = async () => {
    const remoteConfig = getRemoteConfig();
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
