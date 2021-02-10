import React, { Component } from 'react'
import pic from '../images/logo192.png'
import firebase from '../firebase';
import react,{useState,useEffect} from "react";

const db=firebase.firestore();
function profile() {
  return (
    <div>
      <Account />
    </div>
  )
}

function useTimes(){
  const[udata,setudata]=useState([])
useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      db.collection('users').doc(firebase.auth().currentUser.uid).get().then((snap)=>{
      
       console.log(snap.id,snap.data())
      })
    }
  })
},[])
return udata
}


function Account(){
const{udata}=useTimes()
console.log(udata)
return<div>
  <div>
<h1>this is account page</h1>
  </div>
</div>

 }
export default profile