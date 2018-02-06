import * as firebase from 'firebase';
import '@firebase/firestore'

let database;

export const init = () => {
  const config = {
    apiKey: "AIzaSyCDbYwlAEhVxWqAUPEa2zPF87YC21wEhag",
    authDomain: "cs582-experiment.firebaseapp.com",
    databaseURL: "https://cs582-experiment.firebaseio.com",
    projectId: "cs582-experiment",
    storageBucket: "",
    messagingSenderId: "802529770356"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
    database = firebase.firestore();
  }
}

export const pushResponse = (sessionId, resp) => {
  return database
    .collection("sessions")
    .doc(`${sessionId}`)
    .collection("responses")
    .add(resp)
    .then(snap => snap.get())
    .then(doc => doc.data())
    .catch(console.error)
}