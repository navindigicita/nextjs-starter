// user authentication after userAuth.js called
import firebase from 'firebase/compat/app'
import { useRouter } from 'next/router'

const AuthenticateIsUser = async (email) => {
    const router = useRouter()
    console.log("inside authenticateIsUser function1");
    if (firebase.auth().isSignInWithEmailLink(router.asPath)) {
        console.log("inside if isSignInWithEmailLink condition -> authenticateIsUser function1");
        await firebase.auth().signInWithEmailLink(email, router.asPath)
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