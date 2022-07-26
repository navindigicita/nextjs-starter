import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/compat/auth";
import { getAnalytics, logEvent, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

let analytics = null;

isSupported().then((result) => {
    if (result) {
        analytics = getAnalytics(firebaseApp);
    }
})
const firebaseApp = initializeApp(firebaseConfig);
// const firebaseApp = getAuth(app);

export default firebaseApp