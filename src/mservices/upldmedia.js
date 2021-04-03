import firebase from '../firebase';
import 'firebase/storage';
const storage = firebase.storage();

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
export {handleUpload,temp,getlink}