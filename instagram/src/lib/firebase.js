// import { seedDatabase } from "../seed";
const config = {
  apiKey: "AIzaSyAY7veU3pyXhz8laG5KOglDMQTu7M-aEeI",
  authDomain: "instagram-12ac4.firebaseapp.com",
  projectId: "instagram-12ac4",
  storageBucket: "instagram-12ac4.appspot.com",
  messagingSenderId: "180272439161",
  appId: "1:180272439161:web:731f580d44a88510ab99a8",
};
const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
