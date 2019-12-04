import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCeSCWgu1_HMY1gtY-YtZ4ZTUutrxafMCA",
  authDomain: "walki-talki-a2ad3.firebaseapp.com",
  databaseURL: "https://walki-talki-a2ad3.firebaseio.com",
  projectId: "walki-talki-a2ad3",
  storageBucket: "walki-talki-a2ad3.appspot.com",
  messagingSenderId: "952890937240",
  appId: "1:952890937240:web:05b6a56c72ba4ee8c865ed",
  measurementId: "G-ZW59STM34W"
};
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export const dbh = firebase.firestore();

// firebaseConfig = {
//       apiKey: "AIzaSyCr2r4tMaLbTvkGABGxeD3KrGh-GaV3mHg",
//       authDomain: "walkitalki-805d5.firebaseapp.com",
//       databaseURL: "https://walkitalki-805d5.firebaseio.com/",
//       projectId: "walkitalki-805d5",
//       storageBucket: "walkitalki-805d5.appspot.com",
//       messagingSenderId: "779785210074",
// };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);}

export const dbh = firebase.database();