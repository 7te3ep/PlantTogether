// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
   getDatabase,
   ref,
   push,
   onValue,
   remove,
   get,
   off,
   set,
   onDisconnect,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
   signInWithPopup,
   GoogleAuthProvider,
   getAuth,
   onAuthStateChanged,
   signInWithRedirect,
   getRedirectResult,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyD8_zcxZ2yOEjph9HJxMqc5dTC5LqhphS8",
   authDomain: "plant-together-db.firebaseapp.com",
   databaseURL:
      "https://plant-together-db-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "plant-together-db",
   storageBucket: "plant-together-db.appspot.com",
   messagingSenderId: "285017261517",
   appId: "1:285017261517:web:b5c7fed025a6012a5d7084",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
let dev = "";
export class Server {
   async setData(path, data) {
      await set(ref(database, dev + path), data);
   }

   async getData(path) {
      return ((await get(ref(database, dev + path))) || {}).val();
   }

   async exeOnChange(path, func) {
      await onValue(ref(database, dev + path), await func);
   }

   async stopExeOnChange(path) {
      await off(ref(database, dev + path));
   }
}
