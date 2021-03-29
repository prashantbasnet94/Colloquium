import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCxOTwkD0Kf9Q_RolKb065wC3plbZJlg4s",
    authDomain: "lubhu-279204.firebaseapp.com",
    databaseURL: "https://lubhu-279204.firebaseio.com",
    projectId: "lubhu-279204",
    storageBucket: "lubhu-279204.appspot.com",
    messagingSenderId: "668546197417",
    appId: "1:668546197417:web:352332f858edb2de6086b8",
    measurementId: "G-6Y9ERG8Q95"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}
