// import firebase scripts inside service worker js script
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.7.2/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "23857670381",
});

const initMessaging = firebase.messaging();
