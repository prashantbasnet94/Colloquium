import * as firebase from 'firebase';
// Web app firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBFuMZHrGckWbMcBg4cKfwdgdPQP1YVuPA",
    authDomain: "fir-auth-aea64.firebaseapp.com",
    projectId: "fir-auth-aea64",
    storageBucket: "fir-auth-aea64.appspot.com",
    // messagingSenderId: "961938160993",
    appId: "1:961938160993:web:48bec5c869f134f74fd920",
    measurementId: "G-RP7RLPG8LC"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
