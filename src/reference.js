import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBAILkx6DGv718QXek03KNOlVkHmlP2lng",
  authDomain: "auth-3ad5e.firebaseapp.com",
  databaseURL: "https://auth-3ad5e.firebaseio.com",
  storageBucket: "auth-3ad5e.appspot.com",
  messagingSenderId: "556128165137"
});
export const authRef = firebase.auth();
