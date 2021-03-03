import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import '../index.css';
import './chats.css';
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

// function useWindowSize() {
//   const [size, setsize] = useState([window.innerHeight, window.innerWidth]);
//   useEffect(()=> {
//     const handleResize = () => {
//       setsize = [window.innerHeight, window.innerWidth];
//     }
//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     }
//   }, []);
//   return size;
// }

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
  const [showChat, setShowChat] = useState(false);

  const click =(prop)=>{
    console.log("click",prop)
    db.collection('messaging').doc(prop).onSnapshot(snap=>{
      setchat(snap.data())
    })
  }

  function settrue() {
    setShowChat(true);
  }

  function setfalse() {
    setShowChat(false);
  }

      return (<div style={{height:'100%'}}> 
        <Grid>
          {!showChat?   <Grid.Column floated='left' mobile={16} tablet={16} computer={4} >
      <div style={{position:"-webkit-sticky"}}>
 <List celled>
 { props.data.map((nap)=>
    <List.Item as='a' id={nap.id} onClick={(e)=>click(nap.id)}>
      <div style={{display: "inline-flex"}} onClick={()=> {settrue()}}><Image avatar src={nap.ppic} />
      {/* <List.Content> */}
        <List.Header >{nap.pname}</List.Header></div>
        <List.Description>
            {(nap.body[nap.body.length-1]).slice(0,-1)}
        </List.Description>
      {/* </List.Content> */}
    </List.Item>
    )}
  </List>
 </div>
    </Grid.Column>: null}
    {showChat ?
    <Grid.Column floated='right' mobile={16} tablet={16} computer={12} centered style={{padding: "14px 0 0 0", height: "90%"}}>
  <button onClick={()=> {setfalse()}}>Goback</button>
      <div>
{chat.body
    ?< Chatarea chat={chat}/>
    :<Empty />
}
</div>
    </Grid.Column> : null}
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

function orderstatus(e){
  console.log(e.target.innerText,e.target.parentElement.id)
  console.log(ordst);
  
}

return(
  <div style={{float: "right", width: "100%",marginTop:"0px",overflowY:"auto"}}>
    <List horizontal>
      <List.Item>
      <Image avatar src={props.chat.ppic} />
      <List.Content>
        <List.Header>{props.chat.pname}</List.Header>
       computer technician
      </List.Content>
    </List.Item>
    </List>
    {ordst==0
    ?  <Button.Group style={{width:"100%"}} onClick={orderstatus} id={props.chat.id}>
    <Button >Cancel partner</Button>
    <Button.Or  />
    <Button primary>Confirm partner</Button>
    </Button.Group>
    :<p></p>
    }
    <div style={{height: "420px"}}>
    <div style={{height:'100%',overflow:'auto'}}>
    {
chat.body.map((nap)=>

{if(nap[nap.length-1]=="u") return <div className= "out-chat"><div className="out-chatbox"><p className="chatList">{nap.slice(0, -1)}</p></div></div>
else return <div className= "in-chat"><div className="in-chatbox"><p className="chatListP">{nap.slice(0, -1)}</p></div></div>
}

)}
</div></div>
<Form.Group style={{position: "fixed", bottom: "2px",width: "80%", margin: "0"}}>
    <Row style={{margin: "0"}}>
        <Col lg="10" style={{marginRight: "0"}}>
  <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
  <Col lg="2" style={{marginRight: "0"}}>
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