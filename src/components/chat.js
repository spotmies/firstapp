import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col } from 'react-bootstrap';
import { Button, Card, Image,Menu,Dropdown,Icon } from 'semantic-ui-react'
import '../index.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdStar} from 'react-icons/md';
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
 console.log(times)
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
const pdet =(prop)=>{
  history.push(`pdetails/${prop}`)
}
const click2=(prope)=>{
  console.log('click2',prope)
  db.collection('messaging').doc(prope).update({
    chatbuild:true,
    userid:firebase.auth().currentUser.uid,
    uname:uname,
    upic:upic
  }).then(()=>{
    // alert("go to chat for make a conversation")
    history.push('chats-section')
  })
}
const delpost=(pro)=>{
  db.collection('users').doc(firebase.auth().currentUser.uid).collection('response').doc(pro).delete()
  .then(()=>{
    alert("response deleted succefully")
  })
}

const copy=(prop)=>{
  let data;
  db.collection('request').doc('pRxd1QTwQEyIIMr68n4p').get().then(snap=>{
    data=snap.data()
  }).then(()=>{
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('response').doc('pRxd1QTwQEyIIMr68n4p').set(data)

  })
}

      return <div>   
{
  props.data.map((cap)=>
<div id={cap.id} style={{marginLeft:"22%"}}>
 
{/* {
(cap.request)?  <Card
  bg="success"
  key="2"
  text="black"
  style={{ width: '48rem',borderRadius: '1rem' }}
  className="mb-2 ">

 <Card.Header >{cap.pname} accepted your order </Card.Header>
  <Card.Body className="card-body">
    <Card.Title>
    <img className="post-img" src={cap.media} alt="" />
   <h3 className="post-title"  value="sekhar">{cap.problem}</h3> 
   <h4 onClick={(e)=>click(cap.orderid)}>view post</h4>
   <h4 onClick={(e)=>click2(cap.msgid)}>chat with him</h4>
   <div className="details-post">
   <p><RiPinDistanceFill /> Distance: {cap.distance}km</p>
   <p><HiOutlineCurrencyRupee /> Money: {cap.money}</p>
   <p><BiTimeFive /> Time:{(String(cap.time.toDate())).replace('GMT+0530 (India Standard Time)','')}</p>
   <p onClick={(e)=>delpost(cap.id)}><MdDelete />delete</p>
   
   </div>
    </Card.Title>
  </Card.Body>
</Card>

: <Card
bg="primary"
key="2"
text="black"
style={{ width: '48rem',borderRadius: '1rem' }}
className="mb-2 ">

<Card.Header >{cap.pname}</Card.Header>
<Card.Body className="card-body">
  <Card.Title>
  <img className="post-img" src={cap.media} alt="" />
 <h3 className="post-title"  value="sekhar">{cap.problem}</h3> 
 <h4 onClick={(e)=>click(cap.orderid)}>view post</h4>
 <h4 onClick={(e)=>click2(cap.msgid)}>chat with him</h4>
 <div className="details-post">
 <p><RiPinDistanceFill /> Distance: {cap.distance}km</p>
 <p><HiOutlineCurrencyRupee /> Money: {cap.pmoney}</p>
 <p><BiTimeFive /> Time:{(String(cap.time.toDate())).replace('GMT+0530 (India Standard Time)','')}</p>
 <p onClick={(e)=>delpost(cap.id)}><MdDelete />delete</p>
 
 </div>
  </Card.Title>
</Card.Body>
</Card>
} */}

{/* sematic ui react */}
<Card.Group>
<Card color="blue"
style={{width:"80%",borderRadius:"1.5rem",backgroundColor:"#F9F9F9"}}>
 <Card.Content>
      <Card.Meta style={{display:'inline-flex'}}>{String(cap.time.toDate()).replace('GMT+0530 (India Standard Time)','')}</Card.Meta>
      
      <Dropdown item icon='ellipsis horizontal' backgroundColor="white" simple  style={{float:"right"}} color="white">
        <Dropdown.Menu>
        <Dropdown.Item onClick={(e)=>pdet(cap.partnerid)}>Technician details</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>click2(cap.msgid)}>chat with partner</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>click(cap.orderid)}>view job</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={(e)=>delpost(cap.id)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      </Card.Content>
<Card.Content>  
        <Image
style={{width:"60px",height:"60px",borderRadius:"1rem",cursor:"pointer"}}     
     floated='left'
          size='mini'
          src={cap.ppic}/>
        <Card.Header><u>{cap.pname}</u>
        </Card.Header>
        <Card.Meta><small>computer</small> | <small>4.5</small><MdStar color="gold"/>
        </Card.Meta>
          <div style={{display:"inline-flex",fontSize:"22px", paddingLeft:"15%"}}>
        <p> Money: <strong>&#8377; {cap.pmoney}</strong> </p>
         <p style={{marginLeft:"30px"}}>Away: <strong> 1km</strong></p>
        </div>
      
      </Card.Content>
      <Card.Content extra>
      <div>
    <Button content='Aprove' color="green"  />
    <Button onClick={(e)=>delpost(cap.id)} content='Decline' color="red" floated="right"/>
  </div>
      </Card.Content>
    </Card>
    </Card.Group>







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

var uname;
var upic;
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    db.collection('users').doc(firebase.auth().currentUser.uid).get().then(snap=>{
      if(snap.data()){
      uname=snap.data().name;
      upic=snap.data().pic
      }
    })
  }
})