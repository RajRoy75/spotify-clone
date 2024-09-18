// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCYYrvIBAKUyuN-tlDPehmc12gBpzDYk14",
    authDomain: "musicplayground-a682d.firebaseapp.com",
    projectId: "musicplayground-a682d",
    storageBucket: "musicplayground-a682d.appspot.com",
    messagingSenderId: "271034801855",
    appId: "1:271034801855:web:07abdd40e5aacb5947700a",
    measurementId: "G-YK5MMJN3DT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
