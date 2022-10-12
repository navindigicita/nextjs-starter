import "firebase/compat/auth";
import firebase from 'firebase/compat/app'
require('firebase/auth')

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};


const app = firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.auth();
export default firebaseApp