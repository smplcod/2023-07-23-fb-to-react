import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  databaseURL:
    "https://t20230723-22609-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "AIzaSyCVG_Mo3uroHyskBJvT_UBFcq_Gf-RwEm4",
  authDomain: "t20230723-22609.firebaseapp.com",
  projectId: "t20230723-22609",
  storageBucket: "t20230723-22609.appspot.com",
  messagingSenderId: "618711784510",
  appId: "1:618711784510:web:c01cc15e23ea85f570456f",
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
