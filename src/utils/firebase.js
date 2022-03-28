import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLhSg3k33UW0ywWzowz5PjqljpYHYX2Kg",
  authDomain: "parasol-finance-21.firebaseapp.com",
  projectId: "parasol-finance-21",
  storageBucket: "parasol-finance-21.appspot.com",
  messagingSenderId: "795707072474",
  appId: "1:795707072474:web:c123c9dc6e35655b9eaae3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);