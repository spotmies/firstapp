import firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};
const firebaseConfig = {
    apiKey: "AIzaSyDUAqHmXwTZU1caOWJ-LC-dBl3R7uzOkPo",
    authDomain: "spotmiess.firebaseapp.com",
    databaseURL: "https://spotmiess.firebaseio.com",
    projectId: "spotmiess",
    storageBucket: "spotmiess.appspot.com",
    messagingSenderId: "277034750528",
    appId: "1:277034750528:web:9ff791aa208640225b45a5",
    measurementId: "G-CB9E1ZNL3C"
  };
  firebase.initializeApp(firebaseConfig);

firebase.firestore().settings(settings);

export default firebase;

// import  firebase from "firebase";
// import "firebase/firestore";

// let config = {
//   apiKey: "xxx",
//   authDomain: "bezkoder-firebase.firebaseapp.com",
//   databaseURL: "https://bezkoder-firebase.firebaseio.com",
//   projectId: "bezkoder-firebase",
//   storageBucket: "bezkoder-firebase.appspot.com",
//   messagingSenderId: "xxx",
//   appId: "xxx",
// };

// firebase.initializeApp(config);

// export default firebase.firestore();