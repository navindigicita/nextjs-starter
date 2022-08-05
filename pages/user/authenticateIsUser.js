// user authentication after userAuth.js called
import firebase from 'firebase/compat/app'

const AuthenticateIsUser = async (email) => {
    console.log("inside authenticateIsUser function1");
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        console.log("inside if isSignInWithEmailLink condition -> authenticateIsUser function1");
        await firebase.auth().signInWithEmailLink(email, window.location.href)
            .then((result) => {
                console.log("inside .then -> authenticateIsUser function1", result);
                localStorage.setItem('signInStatus', 'Success');
            })
            .catch((error) => {
                localStorage.setItem('signInStatus', error.code);
                console.log(error);
            });
    }
}

export default AuthenticateIsUser