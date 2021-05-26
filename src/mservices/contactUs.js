import firebase from "../firebase";
import constants from "../helpers/constants";
import { addHeader, addHeaderWithOutBody } from "./add_header";
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

async function apiPostPut(body, lastUrl) {
  const uri = constants.baseUrl + `${constants.feedBackurl}/${lastUrl}`;
  //const uri = constants.devBaseUrl + `${constants.feedBackurl}/${feedBackType}`;
  const response = await fetch(uri, await addHeader(body, "POST"));
  console.log("27", response);
  return response;
}

async function apiGetMethod(middleUrl, lastUrl) {
  const response = await fetch(
    constants.baseUrl + middleUrl + lastUrl,
    await addHeaderWithOutBody("GET")
  );
  const data = await response.json();
  return data;
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
export { contactus, partnerRequests, feedBack1, apiPostPut, apiGetMethod };
