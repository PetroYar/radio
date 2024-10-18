import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyCBRWmts3g_dYDiR8w7OYMQUH72Tb54pBI",
  authDomain: "worldradio-86b01.firebaseapp.com",
  projectId: "worldradio-86b01",
  storageBucket: "worldradio-86b01.appspot.com",
  messagingSenderId: "128944610542",
  appId: "1:128944610542:web:1e252fe345c6a7f6e127ff",
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider()
export const database = getDatabase(app)