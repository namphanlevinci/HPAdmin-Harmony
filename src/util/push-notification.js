import firebase from "firebase";

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "126818741090",
  });

  navigator.serviceWorker.register("/my-sw.js").then((registration) => {
    firebase.messaging().useServiceWorker(registration);
  });
};
