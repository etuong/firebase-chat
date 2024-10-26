import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  TwitterAuthProvider,
  getAuth, signInWithPopup
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";

const typistCollection = "typists";
const messageCollection =
  process.env.NODE_ENV === "production" ? "messages" : "test";
// const redirectOnSuccessAuth =
//   process.env.NODE_ENV === "production" ? "/firebase-chat/" : "/";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// Providers
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const yahooProvider = new OAuthProvider('yahoo.com');

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);
export const loginWithTwitter = () => signInWithPopup(auth, twitterProvider);
export const loginWithFacebook = () => signInWithPopup(auth, facebookProvider);
export const loginWithYahoo = () => signInWithPopup(auth, yahooProvider);

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
    await addDoc(collection(db, messageCollection), {
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
  if (messageId) {
    await deleteDoc(doc(db, messageCollection, messageId)).then(() => {
      console.log(`Message ${messageId} has been deleted successfully.`);
    });
  }
};

export const getMessages = (callback) => {
  return onSnapshot(
    query(collection(db, messageCollection), orderBy("serverTimestamp", "asc")),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(messages);
    }
  );
};

export const addTypist = async (typist) => {
  try {
    await addDoc(collection(db, typistCollection), {
      uid: typist.uid,
      displayName: typist.displayName,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTypist = async (typistId) => {
  if (typistId) {
    const querySnapshot = await getDocs(
      query(collection(db, typistCollection), where("uid", "==", typistId))
    );
    querySnapshot.forEach((snapshot) => {
      deleteDoc(doc(db, typistCollection, snapshot.id));
    });
  }
};

export const getTypists = (callback, { user }) => {
  return onSnapshot(
    query(collection(db, typistCollection)),
    (querySnapshot) => {
      const typists = querySnapshot.docs.map((doc) => ({
        uid: doc.uid,
        ...doc.data(),
      }));

      callback(
        typists.filter((typist) => {
          console.log(user)
          return typist.uid !== user.uid;
        })
      );
    }
  );
};

export default auth;
