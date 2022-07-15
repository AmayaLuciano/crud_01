import { initializeApp } from "firebase/app";

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD-qfYCXwSVpovermMFaPLOJiEibJnbnok",
  authDomain: "crud-03-9d6cf.firebaseapp.com",
  projectId: "crud-03-9d6cf",
  storageBucket: "crud-03-9d6cf.appspot.com",
  messagingSenderId: "951449823452",
  appId: "1:951449823452:web:928a3ef8d811e9373b2c19"
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp)
export default firebaseApp