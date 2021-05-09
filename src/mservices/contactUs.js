import firebase from "../firebase";
const db = firebase.firestore();
const contactusDB = db.collection("contactus");

async function contactus(details) {
  let result;
  result = await contactusDB
    .doc("contactUs")
    .update({
      body: firebase.firestore.FieldValue.arrayUnion(details),
      lastModified: Math.round(+new Date() / 1000),
    })
    .then(() => {
      return 200;
    })
    .catch((err) => {
      return err;
    });
  return result;
}

async function partnerRequests(details) {
  let result;
  result = await contactusDB
    .doc("partnerRequests")
    .update({
      body: firebase.firestore.FieldValue.arrayUnion(details),
      lastModified: Math.round(+new Date() / 1000),
    })
    .then(() => {
      return 200;
    })
    .catch((err) => {
      return err;
    });
  return result;
}
async function feedBack1(details) {
  let result;
  result = await contactusDB
    .doc("feedBack1")
    .update({
      body: firebase.firestore.FieldValue.arrayUnion(details),
      lastModified: Math.round(+new Date() / 1000),
    })
    .then(() => {
      return 200;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  return result;
}
export { contactus, partnerRequests, feedBack1 };
