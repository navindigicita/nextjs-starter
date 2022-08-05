// user authentication after userAuth.js called
import firebase from 'firebase/compat/app'

const AuthenticateIsUser = async (email, url) => {
    console.log("inside authenticateIsUser function1");
    if (firebase.auth().isSignInWithEmailLink(url)) {
        console.log("inside if isSignInWithEmailLink condition -> authenticateIsUser function1");
        await firebase.auth().signInWithEmailLink(email, url)
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