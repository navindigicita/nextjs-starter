// handle gmail signin using popup
import firebase from 'firebase/compat/app'
import FirebaseApp from '../../components/firebase/firebaseApp' //imp don't remove
import router from 'next/router'

const HandleGplusSignIn = () => {
    const GoogleAuth = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(GoogleAuth)
        .then(function (result) {
            console.log("inside .then of gmail sign in", result);
            var user = result.user;
            const arr = user._delegate.providerData
            let obj = arr.find(o => o.providerId === 'google.com');
            localStorage.setItem('emailForSignIn', obj.email);
            router.push({ pathname: '/user/userAuth', query: obj })
        }).catch(function (error) {
            console.log(error);
        });
}

export default HandleGplusSignIn



// // user authentication after userAuth.js called only when signIn via magic link
// import firebase from 'firebase/compat/app'

// const AuthenticateIsUser = async (email) => {
//     console.log("inside auth for magic link");
//     // console.log("inside authenticateIsUser function1", window.location.href);
//     // if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
//     //     console.log("inside if isSignInWithEmailLink condition -> authenticateIsUser function1");
//     //     await firebase.auth().signInWithEmailLink(email, window.location.href)
//     //         .then((result) => {
//     //             console.log("inside .then -> authenticateIsUser function1", result);
//     //             localStorage.setItem('signInStatus', 'Success');
//     //         })
//     //         .catch((error) => {
//     //             localStorage.setItem('signInStatus', error.code);
//     //             console.log(error);
//     //         });
//     // }
// }

// export default AuthenticateIsUser