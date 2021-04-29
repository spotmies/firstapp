import firebase from "../firebase";
const db = firebase.firestore();
const userDb = db.collection("users");

async function getresponse(id) {
  return null;
}

async function sharemydetails(uid) {
  return userDb
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data();
    });
}

export { getresponse, sharemydetails };
