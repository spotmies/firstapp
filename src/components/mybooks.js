import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card } from 'react-bootstrap';
import '../index.css';
import {createHashHistory} from 'history'

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'

const db=firebase.firestore();
const history = createHashHistory();

function useTimes(){
  const[times,setTimes]=useState([])
useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').onSnapshot((snap)=>{
        const newtimes=snap.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }))
        if(snap.docs.length<1)alert("nothing in your bookings");
        setTimes(newtimes)
      })
    }
  })
},[])
return times
}
const Sekhar=()=> {
const times=useTimes()
// console.log(times[0].media)
        return( <div className="responses">
                <Mybookings data={times}/>
                </div>  
        )
}

export default Sekhar;
//"https://blog.hubspot.com/hubfs/image8-2.jpg"
function Mybookings(props) {
const click =(prop)=>{
  console.log("click",prop)
}
      return <div>
{
  props.data.map((cap)=>
<div id={cap.id} onClick={(e)=>click(cap.id)}>
  <Card 
  bg="primary"
  key="2"
  text="black"
  style={{ width: '48rem',borderRadius: '1rem' }}
  className="mb-2 "
>
  <Card.Header >{cap.problem}</Card.Header>
  <Card.Body className="card-body">
    <Card.Title>
    <img className="post-img" src={cap.media[0]} alt="" />
   <h3 className="post-title"  value="sekhar">{cap.problem}</h3> 
   <div className="details-post">
   <p><BsEyeFill /> Views: {cap.views}</p>
   <p><RiPinDistanceFill /> Distance: 105</p>
   <p><HiOutlineCurrencyRupee /> Money: {cap.price}</p>
   <p><BiTimeFive /> Time: 1hr</p>
   </div>
    </Card.Title>
  </Card.Body>
</Card>  
</div>
  )}
      </div>
      
 
 
  }


 
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {

  }
})