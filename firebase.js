import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAudjReBhbanAOefWw_qbQx402eybE1GWo",
  authDomain: "metromusica-d3a2d.firebaseapp.com",
  projectId: "metromusica-d3a2d",
  storageBucket: "metromusica-d3a2d.appspot.com",
  messagingSenderId: "92490277834",
  appId: "1:92490277834:web:c45ce328fa39083c886533",
  measurementId: "G-TV54KQKTZJ",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();
const credential = firebase.auth.EmailAuthProvider;
const googleProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();

export { storage, auth, googleProvider, db, credential, firebase as default };
