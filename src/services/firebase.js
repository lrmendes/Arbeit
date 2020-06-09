import * as firebase from 'firebase';
import "firebase/firestore"

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCw2UrczMRS3EKBxjJNvHxa4TmNUE0UbiA",
    authDomain: "arbeit-d110e.firebaseapp.com",
    databaseURL: "https://arbeit-d110e.firebaseio.com",
    projectId: "arbeit-d110e",
    storageBucket: "arbeit-d110e.appspot.com",
    messagingSenderId: "1030326602485",
    appId: "1:1030326602485:web:727dab5be865892c5d13bc"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
