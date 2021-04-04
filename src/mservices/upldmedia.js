import firebase from '../firebase';
import 'firebase/storage';
const storage = firebase.storage();
const db=firebase.firestore();

async function handleUpload(mfile){
      
 let image=mfile;
 var surl="null";
        console.log(image.length)
        for(var i=0;i<image.length;i++){
          let k=Number(i)
       const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/chat/${image[k].name}`).put(image[k]);
      let upldtask= uploadTask.on("state_changed",snapshot => {},
         error => {
           console.log(error);
         },
         () => {
           storage
             .ref(`users/${firebase.auth().currentUser.uid}/chat/`)
             .child(image[k].name)
             .getDownloadURL()
             .then(url => {
               //console.log(url)
               console.log("image uploaded")
                surl=url;
                return url;
 
             });
         }
       )
        }
        
        return surl;
     }

     function temp(){
         return null
     }


     async function getlink(image){
       try{
        let urll= await  storage.ref(`users/${firebase.auth().currentUser.uid}/chat/`).child(image[image.length-1].name)
        .getDownloadURL()
        .then(url => {
  
           return url;
  
        });
    return urll;
       }
       catch{
        return null
       }

     }

async function getpdetailsbyid(id){
  let data;
 await db.collection("partner").doc(id).collection("ProfileInfo").doc(id).get().then(snap=>{
   console.log(snap.data());
   data=snap.data();
 });
 console.log("data fetched")
 return data;

}     
async function disablechat(id){
  let status;
  try{
   await db.collection("messaging").doc(id).update({
     chatbuild:false
   })
    .then(()=>{status=200})
    .catch((e)=>
    {
      console.log(e)
      status=100;
    })
  }
  catch{
    status=404
  }
  return status;
}

export {handleUpload,temp,getlink,getpdetailsbyid,disablechat}