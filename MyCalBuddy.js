// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBqy5S1AxB5H3Z1XGQ8lepUzhwnEnycq2o",
	authDomain: "mycalbuddy.firebaseapp.com",
	projectId: "mycalbuddy",
	storageBucket: "mycalbuddy.appspot.com",
	messagingSenderId: "57339158022",
	appId: "1:57339158022:web:e759608b26bc597f3e6d87",
	measurementId: "G-Q2RSQS9WLE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db2 = getFirestore(app);
