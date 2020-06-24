import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBSUeIpL1j1IInRakvfhI0M19ZKKzUx50Q",
  authDomain: "harmonypay-app.firebaseapp.com",
  databaseURL: "https://harmonypay-app.firebaseio.com",
  projectId: "harmonypay-app",
  storageBucket: "harmonypay-app.appspot.com",
  messagingSenderId: "126818741090",
  appId: "1:126818741090:web:df4d2a54820a58dc079a3b",
  measurementId: "G-T7MZZ592VR",
  // apiKey: "AIzaSyBGU2s8_hNOOijnls_jgVlEad1HKWkmjuw",
  // authDomain: "hpadmin.firebaseapp.com",
  // databaseURL: "https://hpadmin.firebaseio.com",
  // projectId: "hpadmin",
  // storageBucket: "hpadmin.appspot.com",
  // messagingSenderId: "23857670381",
  // appId: "1:23857670381:web:e3e8f1a2f9b9771f",
};
firebase.initializeApp(config);

export default firebase;
