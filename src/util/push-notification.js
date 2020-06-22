import firebase from "firebase";

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "23857670381",
  });

  navigator.serviceWorker.register("/my-sw.js").then((registration) => {
    firebase.messaging().useServiceWorker(registration);
  });
};
