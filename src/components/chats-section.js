import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import '../index.css';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Image, List ,Grid } from 'semantic-ui-react'

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdStar,MdChatBubble,MdAccessTime,MdList,MdFeaturedPlayList,MdSend} from 'react-icons/md';

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


      return (<div style={{height:'100%'}}>
        <Grid>
    <Grid.Column floated='left' width={4} >
      <div style={{position:"-webkit-sticky"}}>
 <List celled>
 { props.data.map((nap)=>
    <List.Item id={nap.id} onClick={(e)=>click(nap.id)}>
      <Image avatar src={nap.ppic} />
      <List.Content>
        <List.Header as='a'>{nap.pname}</List.Header>
        <List.Description>
            {(nap.body[nap.body.length-1]).slice(0,-1)}
        </List.Description>
      </List.Content>
    </List.Item>
    )}
  </List>
 </div>
    </Grid.Column>
    <Grid.Column floated='right' width={12} centered>
  
      <div>
{chat.body
    ?< Chatarea chat={chat}/>
    :<Empty />
}
</div>
    </Grid.Column>
  </Grid>  




</div>
  );
  }


function Chatarea(props){
  const[ordst,setordst]=useState();
db.collection('users').doc(firebase.auth().currentUser.uid)
  .collection('adpost').doc(props.chat.orderid)
  .get().then(snap=>{
setordst(snap.data().orderstate);
//console.log(snap.data())
  })

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


  //this function didn't tested yet
function orderstatus(e){
  console.log(e.target.dataset.txt)
  console.log(`partner id is ${props.chat.partnerid}`)
  let orderid=props.chat.orderid;
  let partnerid=props.chat.partnerid
//  console.log(e.target.parentElement.id);

//order accept confim in user addpost
db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(orderid).update({
  orderstate:2,
  partnerid:partnerid
}).then(()=>{
  //update in allads collections
  return db.collection("allads").doc(orderid).update({
    orderstate:2

  })
})
//update in messagin collections
db.collection('messaging').doc(e.target.parentElement.id).update({
  orderstate:2,
  body:firebase.firestore.FieldValue.arrayUnion("Order Accepted by useru"),
  createdAt:new Date()

})

//update all request to "order confirmed by another patner"
updatereq(orderid,partnerid)

db.collection('partner').doc(partnerid).collection('orders').doc(orderid).update({
  orderstate:2
})
}

// async function updatereq(id,pid){
//   await db.collection('request').where('orderid','==',id).where('partnerid','!=',pid).update({
//     orderstate:5
//   })
// }

async function updatereq(id,pid){
  await db.collection("request").where('orderid','==',id).get().then((snap)=>{
    snap.forEach(doc=>{
      console.log(`requests is ${doc.id}`)
    })
  })
}

return(
  <div style={{float: "right", width: "100%",marginTop:"50px",overflowY:"auto"}}>
    <List horizontal>
      <List.Item style={{display:"inline-flex"}}>
      <Image avatar src={props.chat.ppic} />
      <List.Content>
        <List.Header>{props.chat.pname}</List.Header>
       computer technician
      </List.Content>

    </List.Item>
    </List>
    {ordst==0
    ?  <Button.Group style={{width:"100%"}} onClick={orderstatus} id={props.chat.id}>
    <Button data-txt="0">Cancel partner</Button>
    <Button.Or  />
    <Button primary data-txt="1">Confirm partner</Button>
    </Button.Group>
    :<p></p>
    }

    <div style={{height:'400px',overflow:'auto'}}>
    {
chat.body.map((nap)=>

{if(nap[nap.length-1]=="u") return <p className="chatList" style={{listStyle: "none", textAlign: "right", marginTop: "10px", background: "white", borderRadius: "20px", fontSize: "20px", padding: "6px"}}>{nap.slice(0, -1)}</p>
else return <p className="chatList" style={{listStyle: "none", textAlign: "left", marginTop: "10px", background: "white", borderRadius: "20px", fontSize: "20px", padding: "6px"}}>{nap.slice(0, -1)}</p>
}

)}
</div>
<Form.Group style={{position: "sticky", bottom: "2px",width: "98%", margin: "0"}}>
    <Row style={{margin: "0"}}>
        <Col lg="10">
  <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
  <Col lg="2">
  <Button primary className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Send<MdSend /></Button></Col>
  </Row>
</Form.Group>
</div>
)
}

  function Headings() {
    return (
      <div style={{display: "inline-flex", background: "#f6f6f6", color: "white", width: "100%", height: "70px",paddingTop: "28px", marginTop: "-20px", marginBottom: "0"}}>
      <Row style={{width: "100%", textAlign: "center"}}>
      <Col><Link to="/chat" style={{color: "gray", textDecoration: "none"}}><h2><MdFeaturedPlayList size="2.1rem" color="gray"/> Responses</h2></Link></Col>
      <Col style={{borderBottom: "3px solid gray", marginBottom: "0"}}><Link to="/chats-section" style={{color: "gray", textDecoration: "none"}}><h2> <MdChatBubble size="2.1rem" color="gray"/> Chats</h2></Link></Col>
      
     </Row>
    </div>
    );
  }

 




function Empty(){
  return <div></div>
}