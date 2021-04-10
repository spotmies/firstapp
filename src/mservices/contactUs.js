import firebase from '../firebase';
const db=firebase.firestore();
const contactusDB=db.collection('contactus');

async function contactus(details){
    let result;
      result=  await contactusDB.doc('contactUs').update({
        body:firebase.firestore.FieldValue.arrayUnion(details),
        lastModified:new Date()
        })
        .then(()=>{return 200})
        .catch((err)=>{return err})
        return result;
}

async function partnerRequests(details){
    let result;
      result=  await contactusDB.doc('partnerRequests').update({
        body:firebase.firestore.FieldValue.arrayUnion(details),
        lastModified:new Date()
        })
        .then(()=>{return 200})
        .catch((err)=>{return err})
        return result;
}
export {contactus,partnerRequests}
