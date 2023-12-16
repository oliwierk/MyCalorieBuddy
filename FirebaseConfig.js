// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyD2_VHh28rJkuIbZGi_VntwCALruXxUbfc",
	authDomain: "mycaloriebuddy.firebaseapp.com",
	projectId: "mycaloriebuddy",
	storageBucket: "mycaloriebuddy.appspot.com",
	messagingSenderId: "487448066769",
	appId: "1:487448066769:web:ebcdbf606cc13463ace3f0",
	measurementId: "G-E0KQGSPX59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
