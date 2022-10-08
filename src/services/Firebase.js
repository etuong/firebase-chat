import firebase from "firebase/compat/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import * as firebaseui from "firebaseui";
import "firebase/compat/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
export const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    new firebase.auth.OAuthProvider("yahoo.com").providerId,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};

export const authUI = new firebaseui.auth.AuthUI(firebase.auth());

const storage = getStorage();

export const sendImage = async (user, image) => {
  const storageRef = ref(storage, 'bucket');
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log(snapshot);
  });
};

export const sendMessage = async (user, text) => {
  try {
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: new Date().toLocaleDateString("en-us", {
        timeZone: "America/Los_Angeles",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        hour12: true,
        minute: "numeric",
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const getMessages = (callback) => {
  return onSnapshot(
    query(collection(db, "messages"), orderBy("timestamp", "asc")),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(messages);
    }
  );
};

export default firebase;
