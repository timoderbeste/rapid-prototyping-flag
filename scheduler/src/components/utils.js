import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDDkOa7MfoURfERf03NfGlf7rPxmvcbCVA",
    authDomain: "rapid-proto-course-scheduler.firebaseapp.com",
    databaseURL: "https://rapid-proto-course-scheduler.firebaseio.com",
    projectId: "rapid-proto-course-scheduler",
    storageBucket: "",
    messagingSenderId: "949146754091",
    appId: "1:949146754091:web:745e7504b1dee3d8f45e6e",
    measurementId: "G-ZM35QGPTZF"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export { db };
