import firebase from "./data/Firebase.js";


const isauth = () => {
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
       } else {

        }
    })
};

export default isauth();