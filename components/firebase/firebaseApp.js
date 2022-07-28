import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import FirebaseConfig from './firebase';
require('firebase/auth')

firebase.initializeApp(FirebaseConfig);
const FirebaseApp = firebase.auth();

export default FirebaseApp;