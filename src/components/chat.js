import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Col } from 'react-bootstrap';
import '../index.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai';

const db=firebase.firestore();


function useTimes(){
  const[times,setTimes]=useState([])
useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection('response').onSnapshot((snap)=>{
        const newtimes=snap.docs.map((doc)=>({
          id:doc.id,
          ...doc.data()
        }))
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
        return(
         
        <div className="responses">
                <Headings />
                <Mybookings data={times}/>
                </div> 
        )
}

export default Sekhar;



function Mybookings(props) {
  const history = useHistory();
//console.log((props.data[0].time.toDate()).toUTCString())
// console.log((props.data[0].time.seconds))

const click =(prop)=>{
  console.log("click",prop)
  history.push(`mybookings/id/${prop}`)
}


      return <div>
        
{
  props.data.map((cap)=>
<div id={cap.id} style={{marginLeft:"22%"}}>
  
  <Card 
  bg="primary"
  key="2"
  text="black"
  style={{ width: '48rem',borderRadius: '1rem' }}
  className="mb-2 "
>

 <Card.Header >{cap.name}</Card.Header>
  <Card.Body className="card-body">
    <Card.Title>
    <img className="post-img" src={cap.media} alt="" />
   <h3 className="post-title"  value="sekhar">{cap.problem}</h3> 
   <h4 onClick={(e)=>click(cap.id)}>view post</h4>
   <div className="details-post">
   <p><RiPinDistanceFill /> Distance: {cap.distance}km</p>
   <p><HiOutlineCurrencyRupee /> Money: {cap.money}</p>
   <p><BiTimeFive /> Time:{(String(cap.time.toDate())).replace('GMT+0530 (India Standard Time)','')}</p>
   
   </div>
    </Card.Title>
  </Card.Body>
</Card>
</div>
  )}
      </div>
      
 
 
  }


  function Headings() {
    return (
     <div style={{display: "inline-flex", background: "#1687a7", color: "white", width: "100%", marginTop: "-50px", marginBottom: "30px"}}>
       <Row style={{width: "100%", textAlign: "center"}}>
       <Col style={{borderBottom: "3px solid white", marginBottom: "0"}}><Link to="/chat" style={{color: "white", textDecoration: "none"}}><h2>Responses</h2></Link></Col>
       <Col><Link to="/chats-section" style={{color: "white", textDecoration: "none"}}><h2>Chats</h2></Link></Col>
       </Row>
     </div>
    );
  }

 
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {

  }
})