import firebase from "./data/Firebase";


const isauth = () => {
    const authUser = null
    firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
      // localStorage.setItem('authUser', JSON.stringify(user))
       } else {

        }
    })
    return authUser;
};

export default isauth();