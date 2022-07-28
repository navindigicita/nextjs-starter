import firebase from 'firebase/compat/app'
import FirebaseApp from '../../components/firebase/firebaseApp' //imp don't remove
import router from 'next/router'

const HandleGmailSignIn = () => {
    const GoogleAuth = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(GoogleAuth)
        .then(function (result) {
            console.log("inside .then of gmail sign in", result);
            var user = result.user;
            const arr = user._delegate.providerData
            let obj = arr.find(o => o.providerId === 'google.com');
            localStorage.setItem('emailForSignIn', obj.email);
            router.push({ pathname: '/', query: obj })
        }).catch(function (error) {
            console.log(error);
        });
}

export default HandleGmailSignIn