//handle signin with email link
import firebase from 'firebase/compat/app'
import Router from 'next/router';

const AuthenticateIsUser = async (email) => {
    if (firebase.auth().isSignInWithEmailLink(Router.pathname)) {
        console.log(Router.pathname);
        await firebase.auth().signInWithEmailLink(email, window.location.href)
            .then((result) => {
                console.log("inside .then -> authenticateIsUser function", result);
                localStorage.setItem('signInStatus', 'Success');
            })
            .catch((error) => {
                localStorage.setItem('signInStatus', error.code);
                console.log(error);
            });
    }
}

export default AuthenticateIsUser