import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, get, push, remove, onValue } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQIHXCMVWEmN-tjKmpOawfbbJtWZLvoEQ",
  authDomain: "momfies.firebaseapp.com",
  databaseURL: "https://momfies-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "momfies",
  storageBucket: "momfies.firebasestorage.app",
  messagingSenderId: "971133243290",
  appId: "1:971133243290:web:c28486a54a9c1f0a503423"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, set, get, push, remove, onValue };