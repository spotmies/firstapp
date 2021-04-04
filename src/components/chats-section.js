import React, { Component,useCallback } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect,useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form} from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
import '../index.css';
import './chats.css';
import { BiArrowBack } from 'react-icons/bi'
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Image, List ,Grid,Input,Modal,ImageGroup,Dropdown } from 'semantic-ui-react';
import ReactScrollableFeed from 'react-scrollable-feed';
import imageCompression from "browser-image-compression";
import 'firebase/storage';
//micro service
import {getpdetailsbyid,disablechat} from "../mservices/upldmedia";
import { toast } from 'react-toastify';

//import icons
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdStar,MdChatBubble,MdAccessTime,MdPhone,MdImage,MdAddToPhotos,MdList,MdFeaturedPlayList,MdSend,MdArrowDropDownCircle, MdPerson, MdViewDay, MdRemoveRedEye} from 'react-icons/md';

import {AiFillEdit} from 'react-icons/ai';
import {RiSendPlaneLine,RiImageAddFill} from 'react-icons/ri'
import {FaFolderPlus} from 'react-icons/fa';

const db=firebase.firestore();
const storage = firebase.storage();
var chatid;
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

const chit=useTimes();
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



if(widths <= 420){
      return (<div style={{height:'100%'}}>
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
 
    <List.Header style={{marginTop: "5px", marginLeft: "5px"}}>{nap.pname}</List.Header></div>


    <List.Description>
        {/* {(nap.body[nap.body.length-1]).slice(0,-1)} */}
        {((nap.body[nap.body.length-1]).substr(-1))=="u" || ((nap.body[nap.body.length-1]).substr(-1))=="p"
        ?((nap.body[nap.body.length-1]).slice(0,-1)).length>17?((nap.body[nap.body.length-1]).slice(0,-1).slice(0,17) + ".....") :(nap.body[nap.body.length-1]).slice(0,-1)
        :<MdImage />
        }
    </List.Description>
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



   

function Chatarea(props){
  const history = useHistory();
  const[ordst,setordst]=useState();
  const[orddtls,setorddtls]=useState(null);
  const[image,setimage]=useState([]);
  const[image2,setimage2]=useState([]);
  const[chid,setchid]=useState("");
  const[pdetails,setpdetails]=useState({businessname:"business"});
  const[mimage,setmimage]=useState(null);
  const[mflag,setmflag]=useState(false);
  const[tempimg,settempimg]=useState([]);
  const[upload,setupload]=useState(false);
  const divRef = useRef(null);
  const [heights, widths] = useWindowSize();
  // var [showChat,setShowChat] = useState(false);

db.collection('users').doc(firebase.auth().currentUser.uid)
  .collection('adpost').doc(props.chat.orderid)
  .get().then(snap=>{
setordst(snap.data().orderstate);
setorddtls(snap.data());
//console.log(snap.data())
  })

useEffect(async() => {
  let data;
console.log("fetching partner details..");
data= await getpdetailsbyid(props.chat.partnerid);
console.log(data);
setpdetails(data);
}, [props.chat.partnerid])


  let chat=[]
  chat=props.chat;
  let onNameChange=props.onNameChange;

  useEffect(async() => {
  // console.log(await getpdetailsbyid("KrJkoNpybQM7svmRo7CcWOwRGQA3"));

    if(document.getElementById("scrollbtn")){
     document.getElementById("scrollbtn").click();
     console.log("new message");
    }
  }, [chat.body])



  const click =(prop)=>{
    let newbody=[];
    newbody=chat.body;
    
    console.log("click",prop)
    let msg=document.getElementById('msgtext');
    console.log(msg.value);
    if(msg.value!=''){
     newbody.push(msg.value+"u");
    db.collection('messaging').doc(prop).update({
      body:newbody,
      createdAt:new Date()
    }).then(()=>{msg.value=''})
  }
}

  const click2=(id,msg)=>{
   
    db.collection('messaging').doc(id).update({
      body:firebase.firestore.FieldValue.arrayUnion(msg+"um"),
      createdAt:new Date()
    }).then(()=>{})
  }

function orderstatus(e){
  console.log(e.target.innerText,e.target.parentElement.id)
  console.log(ordst);
  
}



const handleInputChange = useCallback(event => {
  onNameChange(false)
}, [onNameChange])


const inputFile = useRef(null);

const mediashare=(e)=>{
  inputFile.current.click();
console.log(image);
console.log(image2);
setchid(props.chat.id);

}

useEffect(() => {
  let image3=[];
  image3=image.slice(-1);
  for(var i=0;i<image3.length;i++){
    let k=Number(i)
 const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/chat/${image3[k].name}`).put(image3[k]);
let upldtask= uploadTask.on("state_changed",snapshot => {},
   error => {
     console.log(error);
   },
   () => {
     storage
       .ref(`users/${firebase.auth().currentUser.uid}/chat/`)
       .child(image3[k].name)
       .getDownloadURL()
       .then(url => {
console.log(url);
    setimage2(temp=>[...temp,url]);

       });
   }
 )
  }
}, [image])

useEffect(() => {
if(upload==true){
  console.log("uploading..");
uitf();
}
}, [upload])

async function uitf(){
  let image3=tempimg;
  for(var i=0;i<image3.length;i++){
    let k=Number(i)
 const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/chat/${image3[k].name}`).put(image3[k]);
let upldtask= uploadTask.on("state_changed",snapshot => {},
   error => {
     console.log(error);
   },
   () => {
     storage
       .ref(`users/${firebase.auth().currentUser.uid}/chat/`)
       .child(image3[k].name)
       .getDownloadURL()
       .then(url => {
console.log(url);
    setimage2(temp=>[...temp,url]);

       });
   }
 )
  }
  setupload(false);
  settempimg([]);
  setimage2([]);
}




useEffect(() => {
console.log(image2);
if(image2.length>0){
click2(chid,image2[image2.length-1]);
}
}, [image2])

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
       // setimage(temp=>[...temp,cfile]);
        settempimg(temp=>[...temp,cfile]);
        
         })
      .catch(function (error) {
        console.log(error.message);
      });
console.log(i)

    }
   // setimage(temp=>[...temp,"dummy"]);
    
    
  }
async function uploadmedia(e){
  setimage([]);
  setimage2([]);
compressimage(e);


}
function uploadmediatemp(e){

console.log(e)
compressimage(e);

}

const showimage=(e)=>{
setmflag(true);
setmimage(e.target.src);
console.log(e);
}
const hideimage=(e)=>{
setmflag(false);
}

const pdet =(e,prop)=>{
  history.push(`pdetails/${prop}`)
 console.log(prop)
}
const vieworder =(prop)=>{
  console.log("click",prop)
  history.push(`mybookings/id/${prop}`)
}
const delchat=async(prop)=>{
if(await disablechat(prop) == 200)toast.info("chat deleted")
else toast.info("unable to delete chat try again later")
}

if(widths <= 420) {
  return(
    <div style={{float: "right", width: "100%",overflowY:"auto"}}>
      {/* {showChat ?  */}
      <List className="chatHead" horizontal>
      <List.Item>
     <BiArrowBack style={{width: "50px", fontSize: "24px", background: "rgba(255, 255, 255, 0.92)"}} onClick={handleInputChange} />
      <Image avatar src={props.chat.ppic} />
      <List.Content >
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
        <List.Item onClick={(e)=>{pdet(e,props.chat.partnerid)}} style={{cursor:"pointer"}}>
        <Image avatar src={pdetails.profilepic} />
        <List.Content >
          <List.Header ><b style={{fontSize:"19px"}}>{pdetails.name}</b>  <small>{pdetails.rate>5?pdetails.rate/20:pdetails.rate}<MdStar color="yellow" size="1.1rem"/></small></List.Header>
         {pdetails.businessname}
        </List.Content>
      </List.Item>
      <List.Item style={{float:"right",marginRight:"20px"}}>
      <a 
       href={"tel: +91 "+pdetails.phone}
      // onClick={console.log(pdetails.phone)}
      >
     <MdPhone size="1.5rem" color="black" style={{cursor:"pointer",marginRight:"10px"}} />      
     </a>
     <Dropdown item icon='ellipsis vertical' backgroundColor="white" simple direction="left" color="white">
        <Dropdown.Menu>
        <Dropdown.Item onClick={(e)=>{pdet(e,props.chat.partnerid)}}><MdPerson /> Technician details</Dropdown.Item>
          <Dropdown.Item onClick={()=>{vieworder(props.chat.orderid)}}><MdRemoveRedEye /> View job</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={()=>{delchat(props.chat.id)}}><MdDelete /> Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
  else if(nap[nap.length-1]=="p") return <div className= "in-chat"><div className="in-chatbox" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><p className="chatListP">{nap.slice(0, -1)}</p></div></div>
   else if(nap.slice(-2)=="um") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><Image floated="right" onClick={showimage} src={nap.slice(0,-2)} size='small' /> </div>
   else if(nap.slice(-2)=="pm") return <div className= "in-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><Image floated="left" onClick={showimage} src={nap.slice(0,-2)} size='small' /> </div>

}
  
  
  )}

<a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="3rem" style={{position:"fixed",bottom:"150px",float:"right"}}/></a>
  </div>

    <Form.Group className="chat-form" style={{position: "fixed", bottom: "2px", margin: "0"}}>
      <Row style={{margin: "0"}}>
      {/* <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmedia} style={{display: 'none'}} multiple/> */}
      <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmediatemp} style={{display: 'none'}} multiple/>

 

    <Col xs={2} > <MdAddToPhotos onClick={mediashare} style={{cursor:"pointer"}} size="2rem" color="gray"/></Col>
          <Col xs={8} style={{marginRight: "0"}}>          
    <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
   <Col xs={2} style={{marginRight: "0"}}>
     
    <Button primary className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Send<MdSend /></Button></Col>
    </Row>
  </Form.Group>
  <ImageModal image={mimage} setflag={setmimage}/>
  <ImageModal2 image={tempimg}  flag={setupload} setimage={settempimg} addmore={mediashare} removeitems={removeitems}/>
  </div>
  )
}
function removeitems(data){
  console.log(data);
  settempimg(data);
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

 

  function ImageModal(props) {
    const [open, setOpen] = useState(false);
    var image=props.image;
    var setflag=props.setflag;

    const handleInputChange = useCallback(event => {
      setflag(false)
    }, [setflag])

    const closemodal=()=>{
      handleInputChange();
      setOpen(false);

    }
  useEffect(() => {
if(image!=false && image!=null){setOpen(true)}
console.log(image);

  }, [image])

    return (
      <Modal
        onClose={closemodal}
        onOpen={() => setOpen(true)}
        open={open}
        size="mini"
       // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Upload image</Modal.Header>
        <Modal.Content image>
          <Image size='large' src={image} wrapped />
          <Modal.Description>
            <p>Would you like to upload this image?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
      </Modal>
    )
  }

  

function ImageModal2(props) {
    const [open, setOpen] = useState(false);
    const[image,setimage] =useState([]);
   

   

useEffect(() => {
  setimage(props.image);
  console.log("images change")
 
}, [props.image])

    useEffect(() => {
if(image.length>0)setOpen(true);
if(image.length<=0)setOpen(false);
 console.log(image);
    }, [image])

    const handleInputChange = useCallback(event => {
      props.flag(true);
      setOpen(false);
    }, [props.flag])



  


  const sekhararr=(e)=>{


     console.log(e.target.parentElement.parentElement.id)
     let ritem=image[e.target.parentElement.parentElement.id];

   props.setimage(image.filter((e)=>(e !== ritem)))




      
    }
    return (
      <Modal
        onClose={()=>setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="large"
       // trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Upload image</Modal.Header>
{
  image.length>0
  ?<Image.Group size='small'>
  {
    image.map((nap,key)=>
    
    <Image key={key} id={key}
     label={{ as: 'a', corner: 'right', icon: 'trash', onClick:sekhararr }}
    src={URL.createObjectURL(nap)} />
  
    )}
<RiImageAddFill onClick={props.addmore} color="gray" style={{cursor:"pointer"}}/>
  </Image.Group>
  :null
}

        <Modal.Actions>
          <Button onClick={()=>{setOpen(false)}}>Cancel</Button>
          <Button onClick={handleInputChange} positive>
            Send
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }




function Empty(){
  return <div></div>
}
