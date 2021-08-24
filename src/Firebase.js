import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

{ /*Firebase is a real-time database provided by Google */}

const firebaseConfig = {
    apiKey: "AIzaSyCB7JQDrnf5MTNd8dEbI7LxKMw2QRAuq4g",
    authDomain: "react-spas-0821.firebaseapp.com",
    databaseURL: "https://react-spas-0821-default-rtdb.firebaseio.com",
    projectId: "react-spas-0821",
    storageBucket: "react-spas-0821.appspot.com",
    messagingSenderId: "1031406276749",
    appId: "1:1031406276749:web:47342ef728982fe32f52c4",
    measurementId: "G-MMHPYRV4MV"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;