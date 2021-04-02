import firebase from '../firebase';
import 'firebase/storage';
const storage = firebase.storage();

async function handleUpload(mfile){
      
 let image=mfile;
 let surl="null";
        console.log(image.length)
        for(var i=0;i<image.length;i++){
          let k=Number(i)
       const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/chat/${image[k].name}`).put(image[k]);
       uploadTask.on(
         "state_changed",
         snapshot => {

        
         },
         error => {
           console.log(error);
         },
         () => {
           storage
             .ref(`users/${firebase.auth().currentUser.uid}/adpost/`)
             .child(image[k].name)
             .getDownloadURL()
             .then(url => {
               //setUrl(url);
               console.log(url)
                surl=url;
            //          this.setState({ 
            //    arrayvar: arrayvar.concat([url])
            //        })
 
             });
         }
       )
        }
        return surl;
     }

     function temp(){
         return null
     }
export {handleUpload,temp}