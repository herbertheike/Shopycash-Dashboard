import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDbMfsIVrEr7cmv6Ln7Y-aaNzyYncKH0m0",
    authDomain: "shopycash-19409.firebaseapp.com",
    databaseURL: "https://shopycash-19409.firebaseio.com",
    projectId: "shopycash-19409",
    storageBucket: "shopycash-19409.appspot.com",
    messagingSenderId: "98141338607",
    appId: "1:98141338607:web:a43a18be7277b8bcb9d41a",
  };

firebase.initializeApp(firebaseConfig);
export default firebase;