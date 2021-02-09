import React ,{Component} from 'react'
import firebase from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel } from 'react-bootstrap';
import react,{useState,useEffect} from "react";
import {MdDelete} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai'
import { useHistory } from 'react-router-dom'

const db=firebase.firestore();



function useTimes(){
    const[postdata,setdata]=useState([])
    const[posttime,setposttime]=useState([])
  useEffect(()=>{

//
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
let arr=[];
 
       var personId;
        // fetch(`http://localhost:3000/mybookings/id/`, {})
        // .then((res) =>{ res.json()})
        // .then((response) => {
        
         // console.log(`http://localhost:3000/mybookings/id/${personId}`);
         personId=window.location.pathname;
         personId=personId.replace('/mybookings/id/','');
         console.log(personId)
         db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
             console.log(snap.data().posttime.toDate())
             setdata(snap.data())
            arr.push((String(snap.data().posttime.toDate())).replace('GMT+0530 (India Standard Time)',''));
            arr.push((String(snap.data().schedule.toDate())).replace('GMT+0530 (India Standard Time)',''));
            setposttime(arr)
         })
        // })
        // .catch((error) => console.log(error));
    }})
//


  },[])
  return {postdata,posttime}
  }




const Navbar3=()=>{
  const history = useHistory();
    const {postdata,posttime}=useTimes()

    var media=[];
  if(postdata.media){
    media=postdata.media;
  console.log("times avail")
   
  }
  else console.log("time not")
  const click =(prop)=>{
  
    console.log("click",prop)
    history.push(`edit/${prop}`)
  }
  const delpost=(pro)=>{
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(pro).delete()
    .then(()=>{
      alert("ad deleted succefully")
    })
  }
  
return<div>
  <div style={{height:"300px",width:"100%", paddingTop:"80px"}}>
   <Carousel>
 {media.map((nap)=>
   <Carousel.Item>     
      <video src={nap} poster={nap} width="100%" 
           height="350" autoPlay loop/>
     <Carousel.Caption>
     </Carousel.Caption>
   </Carousel.Item>

 )

}
</Carousel>
<div>
  <p>Title:{postdata.problem}</p>
  <p> location: {postdata.location}</p>
  <p> Description: {postdata.description}</p>
  <p>Category: {postdata.job}</p>
  <p>Price: {postdata.price}</p>
  <p>time of post: {posttime[0]}</p>
  <p>service start at: {posttime[1]}</p>
  <p>views: {postdata.views}</p>
  <AiFillEdit color="gray" onClick={(e)=>click(postdata.orderid)}/>
  <MdDelete color="red" onClick={(e)=>delpost(postdata.orderid)}/>
 
</div>
</div>
</div>  
}

export default Navbar3