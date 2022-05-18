import getConfig from "next/config"

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const { serverRuntimeConfig } = getConfig();

const firebaseConfig = {
  apiKey: serverRuntimeConfig.apiKey,
  authDomain: serverRuntimeConfig.authDomain,
  projectId: serverRuntimeConfig.projectId,
  storageBucket: serverRuntimeConfig.storageBucket,
  messagingSenderId: serverRuntimeConfig.messagingSenderId,
  appId: serverRuntimeConfig.appId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
