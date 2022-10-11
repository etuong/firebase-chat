import firebase from "firebase/compat/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import * as firebaseui from "firebaseui";
import "firebase/compat/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";

const db_collection = process.env.NODE_ENV  === "production" ? "messages" : "test";
const redirectOnSuccessAuth =
  process.env.NODE_ENV  === "production" ? "/firebase-chat/" : "/";

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
  signInSuccessUrl: redirectOnSuccessAuth,
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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
  const storageRef = ref(
    storage,
    `${user.uid}-${Math.floor(Math.random() * 100)}`
  );
  let promise;

  // This app supports selfies (data:image/jpeg;base64) and standard images
  if (typeof image === "string" && image.includes("data:image/jpeg;base64,")) {
    promise = uploadString(storageRef, image, "data_url");
  } else {
    promise = uploadBytes(storageRef, image);
  }

  promise.then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      sendMessage(user, downloadURL);
    });
  });
};

export const sendMessage = async (user, text) => {
  try {
    await addDoc(collection(db, db_collection), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      serverTimestamp: serverTimestamp(),
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

export const deleteMessage = async (messageId) => {
  await deleteDoc(doc(db, db_collection, messageId)).then(() => {
    console.log(`Message ${messageId} has been deleted successfully.`);
  });
};

export const getMessages = (callback) => {
  return onSnapshot(
    query(collection(db, db_collection), orderBy("serverTimestamp", "asc")),
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
