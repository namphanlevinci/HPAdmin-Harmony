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
};
firebase.initializeApp(config);

export default firebase;
