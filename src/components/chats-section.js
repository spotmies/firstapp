import React, { Component,useCallback } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect,useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form} from 'react-bootstrap';
import { Button, Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../index.css';
import './chats.css';
import { BiArrowBack } from 'react-icons/bi'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Image, List ,Grid,Input } from 'semantic-ui-react';
import ReactScrollableFeed from 'react-scrollable-feed';
import imageCompression from "browser-image-compression";

//micro service
import {handleUpload, temp} from "../mservices/upldmedia";


//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdStar,MdChatBubble,MdAccessTime,MdAddToPhotos,MdList,MdFeaturedPlayList,MdSend,MdArrowDropDownCircle} from 'react-icons/md';

import {AiFillEdit} from 'react-icons/ai';
import {RiSendPlaneLine} from 'react-icons/ri'

const db=firebase.firestore();
var showChat = false;
function useWindowSize() {
  
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  return size;
}

// function chatHead() {
//   const [showChat,setShowChat] = useState(false);
//   return showChat;
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
          {/* <div className="comingSoon">
        <h1 className="soonText">Coming Soon ...</h1>
        </div> */}
                <Headings />
                {chit  
                 ?<Mybookings data={chit}/> 
                :<Empty />
                }
                </div> 
        )
}

export default Sekhar;

// function settrue() {
//   return setShowChat(true);
//  }

function settrue() {
   showChat = true;
   return showChat;
  }

  
function Mybookings(props) {
  const history = useHistory();
const[chat,setchat]=useState([]);
const [showChat,setShowChat] = useState(false);
const [heights, widths] = useWindowSize();
// const [heads, setHeads] = chatHead();

  const click =(prop)=>{
    console.log("click",prop)
    db.collection('messaging').doc(prop).onSnapshot(snap=>{
      setchat(snap.data())
    })
  }
  
  function settrue() {
   return setShowChat(true);
  }

  // const setfalse=()=> {
  // return  setShowChat(false);
  // }

  // head data fetching

  // db.collection('users').doc(firebase.auth().currentUser.uid)
  // .collection('adpost').doc(props.chat.orderid)

  // let chat1=[]
  // chat=props.chat1;

if(widths <= 420){
      return (<div style={{height:'100%'}}>
      {props.data==0 ?  <Grid>
              {!showChat?   <Grid.Column floated='left' mobile={16} tablet={16} computer={4}>
      <div style={{position:"-webkit-sticky"}} >
 <List celled>
    <List.Item>
    <Segment className="post-img">
            <Dimmer active inverted>
               <Loader size='large'>Loading</Loader>
             </Dimmer>

             <Image src='/images/wireframe/paragraph.png' />
            </Segment>
      <List.Content>
        <List.Header as='a'></List.Header>
        <List.Description>
           
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
 </div>
    </Grid.Column>: null}
  </Grid>  
 : 
// original data
        <Grid>
              {!showChat?   <Grid.Column floated='left' mobile={16} tablet={16} computer={4}>
      <div style={{position:"-webkit-sticky"}}  onClick={()=> {settrue()}}>
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
    </Grid.Column>: null}
    {showChat ?
   <Grid.Column floated='right' mobile={16} tablet={16} computer={12} centered style={{padding: "14px 0 0 0", height: "90%"}}>
     
      
      <div>
{chat.body
    ?< Chatarea chat={chat} onNameChange={setShowChat}/>
    :<Empty />
}
</div>
    </Grid.Column> : null}
  </Grid>  
}



</div>
  );
  }
   else {
    return (<div style={{height:'100%'}}> 
    <Grid>
        <Grid.Column floated='left' mobile={16} tablet={16} computer={4} style={{marginTop: "20px",border: "0 1px 0 0", boxShadow: "0px 0px 1px rgb(141, 139, 139)"}}>
  <div style={{position:"-webkit-sticky"}}>
<List celled>
{ props.data.map((nap)=>
<List.Item className="" as='a' id={nap.id} onClick={(e)=>click(nap.id)}>
  <div style={{display: "inline-flex"}}><Image avatar src={nap.ppic} />
  {/* <List.Content> */}
    <List.Header style={{marginTop: "5px", marginLeft: "5px"}}>{nap.pname}</List.Header></div>
    <List.Description>
        {(nap.body[nap.body.length-1]).slice(0,-1)}
    </List.Description>
  {/* </List.Content> */}
</List.Item>
)}
</List>
</div>
</Grid.Column>
<Grid.Column floated='right' mobile={16} tablet={16} computer={12} centered style={{padding: "14px 0 0 0", height: "90%"}}>
  <div>
{chat.body
?< Chatarea chat={chat}/>
:<Empty />
}
</div>
</Grid.Column>
</Grid>  
</div>
    );}
  }

  function setfalse() {
  //   console.log(showChat);
  //  const [showChat, setshowChat] = useState(false);
    return showChat;
   
   }

   

function Chatarea(props){
  const[ordst,setordst]=useState();
  const[image,setimage]=useState([]);
  const[image2,setimage2]=useState([]);

  const[upld,setupld]=useState(false);
  const divRef = useRef(null);
  const [heights, widths] = useWindowSize();
  // var [showChat,setShowChat] = useState(false);

db.collection('users').doc(firebase.auth().currentUser.uid)
  .collection('adpost').doc(props.chat.orderid)
  .get().then(snap=>{
setordst(snap.data().orderstate);
//console.log(snap.data())
  })





  let chat=[]
  chat=props.chat;
  let onNameChange=props.onNameChange;

  useEffect(() => {
    if(document.getElementById("scrollbtn")){
     document.getElementById("scrollbtn").click();
     console.log("new message");
    }
    
  }, [chat.body])



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

function setfalse() {
console.log("close icon");
console.log(onNameChange)
}

const handleInputChange = useCallback(event => {
  onNameChange(false)
}, [onNameChange])


const inputFile = useRef(null);

const mediashare=(e)=>{
  inputFile.current.click();
console.log(image);
}

useEffect(() => {
  if(image.length>0){
    console.log(image);
 

  }

}, [image])



 async function compressimage(e){
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };
    let cfile;
    setimage([]);

     for(var i=0;i<e.target.files.length;i++){
      let k=Number(i)

       imageCompression(e.target.files[k], options).then(x => {
        cfile = x;     
        setimage(temp=>[...temp,cfile]);

        
         })
      .catch(function (error) {
        console.log(error.message);
      });
console.log(i)

    }
   // setimage(temp=>[...temp,"dummy"]);
    
    
  }
async function uploadmedia(e){
compressimage(e);
setimage((state) => {
  console.log(state); // "React is awesome!"
  
  return state;
});
}

if(widths <= 420) {
  return(
    <div style={{float: "right", width: "100%",overflowY:"auto"}}>
      {/* {showChat ?  */}
      <List className="chatHead" horizontal>
      <List.Item>
     <BiArrowBack style={{width: "50px", fontSize: "24px", background: "rgba(255, 255, 255, 0.92)"}} onClick={handleInputChange} />
      <Image avatar src={props.chat.ppic} />
      <List.Content>
        <List.Header>{props.chat.pname}</List.Header>
       computer technician
      </List.Content>
    </List.Item>
    </List>
     {/* : null} */}
    
     
     {ordst==0
      ?  <Button.Group style={{width:"100%"}} onClick={orderstatus} id={props.chat.id}>
      <Button >Cancel partner</Button>
      <Button.Or  />
      <Button primary>Confirm partner</Button>
      </Button.Group>
      : null
      }
      
    <div className="chatdiv"  style={{overflow:'auto'}}>
    
      {
  chat.body.map((nap)=>
  
  {if(nap[nap.length-1]=="u") return <div className= "out-chat"><div className="out-chatbox"><p className="chatList">{nap.slice(0, -1)}</p></div></div>
  else return <div className= "in-chat"><div className="in-chatbox"><p className="chatListP">{nap.slice(0, -1)}</p></div></div>
  }
  
  
  )}

  </div>
    <Form.Group className="chat-form" style={{position: "fixed", bottom: "2px", margin: "0"}}>
      <Row style={{margin: "0"}}>
          <Col xs={8} style={{marginRight: "0"}}>
    <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
   <Col xs={4} style={{marginRight: "0"}}>
   <a href="#scrolltobottom"> <Button primary className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Senxzds<MdSend /></Button></a></Col>
    </Row>
  </Form.Group>
  </div>
  )
}

else {
  return(
    <div style={{float: "right", width: "100%",overflowY:"auto"}}>
      <List className="chatHead" horizontal>
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
      : null
      }
  
      
    <div className="chatdiv" style={{overflow:'auto'}}>
    
      {
  chat.body.map((nap,key)=>
  
  {if(nap[nap.length-1]=="u") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><div className="out-chatbox"><p className="chatList">{nap.slice(0, -1)}</p></div></div>
  else return <div className= "in-chat"><div className="in-chatbox" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><p className="chatListP">{nap.slice(0, -1)}</p></div></div>
  }
  
  
  )}

<a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="3rem" style={{position:"fixed",bottom:"150px",float:"right"}}/></a>
  </div>

    <Form.Group className="chat-form" style={{position: "fixed", bottom: "2px", margin: "0"}}>
      <Row style={{margin: "0"}}>
      <input type='file' id='upldfile' ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmedia} style={{display: 'none'}} multiple/>

 

    <Col xs={2} > <MdAddToPhotos onClick={mediashare} size="2rem" color="gray"/></Col>
          <Col xs={8} style={{marginRight: "0"}}>          
    <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
   <Col xs={2} style={{marginRight: "0"}}>
     
    <Button primary className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Send<MdSend /></Button></Col>
    </Row>
  </Form.Group>
  </div>
  )
}
}

  function Headings() {
    return (
      <div className="resHead">
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
