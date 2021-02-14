import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button } from 'react-bootstrap';
import '../index.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdSend} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai';
import {RiSendPlaneLine} from 'react-icons/ri'

const db=firebase.firestore();


function useTimes(){
  // const[times,setTimes]=useState([])
  const[chit,setchit]=useState([])
useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {

var temp=[];

      db.collection("messaging")
      .where("userid", "==", firebase.auth().currentUser.uid)
      .where('chatbuild', '==', true)
      .orderBy('createdAt','desc')
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              temp.push(doc.data())
              // setchit(doc.data())
          });
      }).then(()=>setchit(temp))
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    }
  })
},[])
return chit
}
const Sekhar=()=> {

const chit=useTimes()
console.log(chit)
if(chit.body){
console.log(chit)}
        return(
         
        <div className="responses">
                <Headings />
                {chit  
                 ?<Mybookings data={chit}/> 
                :<Empty />
                }
                </div> 
        )
}

export default Sekhar;



function Mybookings(props) {
  const history = useHistory();
const[chat,setchat]=useState([]);

  const click =(prop)=>{
    console.log("click",prop)
    db.collection('messaging').doc(prop).onSnapshot(snap=>{
      setchat(snap.data())
    })
  }


      return (<div>
          <Row style={{margin: "0"}}>
  <Col lg="3" style={{margin: "0", padding: "0"}}>
<div style={{width: "100%", borderRight: "1px solid black", height: "600px", overflow: "auto"}}>
  { props.data.map((nap)=>
  <div style={{display: "inline-flex", width: "100%"}}>
      <img className="chat-pic" style={{width: "30px", height: "30px", borderRadius: "50%"}} src={nap.ppic} />
      <h3 id={nap.id} onClick={(e)=>click(nap.id)}>{nap.pname}</h3>
  </div>
  )}
 
</div>
</Col>
<Col lg="9">
<div>
{chat.body
    ?< Chatarea chat={chat}/>
    :<Empty />
}
</div>
</Col>
</Row>
</div>
  );
  }


function Chatarea(props){
  let chat=[]
  chat=props.chat;

  const click =(prop)=>{
    console.log("click",prop)
    let msg=document.getElementById('msgtext');
    db.collection('messaging').doc(prop).update({
      body:firebase.firestore.FieldValue.arrayUnion(msg.value+"u"),
      createdAt:new Date()
    }).then(()=>{msg.value=''})
  }

return(
  <div style={{float: "right", width: "50%"}}>
    {
chat.body.map((nap)=>
    
  <p className="chatList" style={{listStyle: "none", textAlign: "right", marginTop: "10px", background: "#faf3e0", borderRadius: "20px", fontSize: "20px", padding: "6px"}}>{nap.slice(0, -1)}</p>
)}
<Form.Group style={{position: "center", bottom: "2px",width: "98%", margin: "0"}}>
    <Row style={{margin: "0"}}>
        <Col lg="10">
  <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
  <Col lg="2">
  <Button variant="outline-primary" className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Send <MdSend /></Button>{' '}</Col>
  </Row>
</Form.Group>
</div>
)
}

  function Headings() {
    return (
     <div style={{display: "inline-flex", background: "#1687a7", color: "white", width: "100%", marginTop: "-50px", marginBottom: "0"}}>
       <Row style={{width: "100%", textAlign: "center"}}>
       <Col><Link to="/chat" style={{color: "white", textDecoration: "none"}}><h2 >Responses</h2></Link></Col>
       <Col style={{borderBottom: "3px solid white", marginBottom: "0"}}><Link to="/chats-section" style={{color: "white", textDecoration: "none"}}><h2>Chats</h2></Link></Col>
       
      </Row>
     </div>
    );
  }

 




function Empty(){
  return <div></div>
}