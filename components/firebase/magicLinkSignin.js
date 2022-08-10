// import firebase from 'firebase/compat/app'

// const Register = async ({ email }) => {
//     console.log("inside firebase magic link function", email, firebase);
//     const actionCodeSettings = {
//         url: process.env.REACT_APP_ACTIONCODE_URL + email,
//         handleCodeInApp: true,
//         // dynamicLinkDomain: process.env.REACT_APP_DYNAMIC_LINK_DOMAIN
//     };
//     await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
//         .then(() => {
//             console.log("send SignIn Link To Email::", actionCodeSettings);
//             localStorage.setItem('emailForSignIn', email);
//         })
//         .catch((err) => {
//             console.log(err); 
//         })
// }

// export default Register