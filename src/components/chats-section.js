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
import { Image, List ,Grid,Input,Modal,ImageGroup,Dropdown,Header } from 'semantic-ui-react';
import imageCompression from "browser-image-compression";
import ImageViewer from "react-simple-image-viewer";
import 'firebase/storage';
//micro service
import {getpdetailsbyid,disablechat} from "../mservices/upldmedia";
import {gettbystamps,getorgnl,getstamp, lastMessage} from "../mservices/dateconv";
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

  const click =async(prop)=>{
    console.log("click",prop)
   await db.collection('messaging').doc(prop).onSnapshot(snap=>{
      setchat(snap.data())
    })
    console.log("new chat fetched")
  }
  
  function settrue() {
   return setShowChat(true);
  }



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
        <Grid style={{marginRight: "0"}} fluid={true} className="gridHead">
              {!showChat?   <Grid.Column className="gridHead" floated='left' mobile={16} tablet={16} computer={4}>
      <div style={{position:"-webkit-sticky"}}  onClick={()=> {settrue()}}>
 <List celled>
 { props.data.map((nap)=>
    <List.Item className="gridHead" id={nap.id} onClick={(e)=>click(nap.id)}>
      <Image avatar src={nap.ppic} />
      <List.Content>
        <List.Header as='a'>{nap.pname}</List.Header>
        <List.Description>
            {(nap.body[nap.body.length-1]).slice(0,-1).slice(0, 50)}
        </List.Description>
      </List.Content>
    </List.Item>
    )}
  </List>
 </div>
    </Grid.Column>: null}
    {showChat ?
   <Grid.Column className="gridHead1" floated='right' mobile={16} tablet={16} computer={12} centered style={{padding: "14px 0 0 0", height: "90%"}}>
     
      
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
    <Grid fluid={true}>
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
  const[image,setimage]=useState([]);
  const[image2,setimage2]=useState([]);
  const[chid,setchid]=useState("");
  const[pdetails,setpdetails]=useState({businessname:"business"});
  const[tempimg,settempimg]=useState([]);
  const[upload,setupload]=useState(false);
  const divRef = useRef(null);
  const[mflag,setmflag]=useState(null);
  const[mimage,setmimage]=useState(null);
  const scrollref = useRef(null);
  const [heights, widths] = useWindowSize();
  const[typemsg,settypemsg]=useState("");
  // var [showChat,setShowChat] = useState(false);

db.collection('users').doc(firebase.auth().currentUser.uid)
  .collection('adpost').doc(props.chat.orderid)
  .get().then(snap=>{
setordst(snap.data().orderstate);
//console.log(snap.data())
  })

useEffect(async() => {
  let data;
console.log("fetching partner details..");
data= await getpdetailsbyid(props.chat.partnerid);
console.log(data);
setpdetails(data);
console.log("effect1")
}, [props.chat.partnerid])

  //const divRef = useRef(null);
 const onKeyDownHandler = e => {
    if (e.keyCode === 13) {
      // this.sendMessage();
      console.log("enter key")
     // document.getElementById(props.chat.id).click();
     // divRef.current.click();
     click(props.chat.id);
    }
  };




  let chat=[]
  chat=props.chat;
  let onNameChange=props.onNameChange;

  useEffect(async() => {
  // console.log(await getpdetailsbyid("KrJkoNpybQM7svmRo7CcWOwRGQA3"));

    if(document.getElementById("scrollbtn")){
     document.getElementById("scrollbtn").click();
     console.log("new message");
    }
    console.log("effect2");
    console.log(chat)
  }, [chat.body])



  const click =(prop)=>{
    let newbody=[];
    newbody=chat.body;
    
    console.log("click",prop)
    let timestamp=Math.round(+new Date()/1000);
    let msg=typemsg+"`"+timestamp+'`';
    if(msg!=''){
     newbody.push(msg+"u");
    db.collection('messaging').doc(prop).update({
      body:newbody,
      createdAt:new Date(),
      pread:false
    }).then(()=>{settypemsg("")})
  }
}

  const click2=(id,msg)=>{
    let timestamp=Math.round(+new Date()/1000);
    db.collection('messaging').doc(id).update({
      body:firebase.firestore.FieldValue.arrayUnion(msg+"`"+timestamp+"`"+"um"),
      createdAt:new Date(),
      pread:false
    }).then(()=>{})
  }
const umread=async()=>{
 await db.collection('messaging').doc(chat.id).update({
    uread:true
  })
  return true;
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
if(upload==true){
  console.log("uploading..");
uitf();
}
console.log("effect4")
}, [upload])

async function uitf(){
  let image3=tempimg;
  for(var i=0;i<image3.length;i++){
    let k=Number(i)
 const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/chat/${image3[k].name}`).put(image3[k]);
let upldtask= await uploadTask.on("state_changed",snapshot => {},
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
console.log("effect5")
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

const [scrollDisplay, setScrolldisplay] = useState(false);
const [tbody,settbody]=useState([]);
function scrollhandle(e) {
  //console.log(e,"scrolling mobile");
  const scrolly = scrollref.current.scrollHeight;
  const scrolltop = scrollref.current.scrollTop;
  const clientheight = scrollref.current.clientHeight;
  //console.log(scrolly, scrolltop, clientheight);
  if(scrolly-scrolltop == clientheight){
    setScrolldisplay(false);
    if(tbody!=chat.body)
    {
      umread();
      settbody(chat.body);
      console.log("message read");
    }
    //console.log("bottom scroll");
  }else {
    //console.log("top scroll")
    setScrolldisplay(true);
  }
  
}

if(widths <= 1000) {
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
      
    <div className="chatdiv" ref={scrollref} onScroll={(e)=>{scrollhandle(e)}} style={{overflow:'auto'}}>
    
    {
  chat.body.map((nap,key,array)=>
  
  {


  //  if(key%2==0 || key%2==1){ return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><div className="out-chatbox"><p className="chatList">{nap.slice(0, -1)}{cmpmsg(nap,array[key-1])}</p></div></div>}
  if(nap[nap.length-1]=="u") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
   {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
    <div className="out-chatbox" >
      <p className="chatList">{getorgnl(nap)}&nbsp; <small className="textTime"> {getmsgtime(nap)}</small></p>
      
      </div>
    {/* {key==chat.body.length-1 ?
        <div><p><small className="readText">{chat.pread?"read":"unread"}</small></p></div>
        :null
  
         } */}
      
      </div>
     
  else if(nap[nap.length-1]=="p") return <div className= "in-chat">
       {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
    <div className="in-chatbox" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><p className="chatListP">{getorgnl(nap)}&nbsp; <small className="textTimep"> {getmsgtime(nap)}</small></p></div></div>
   else if(nap.slice(-2)=="um") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
        {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
     <Image floated="right" className="chatPic" onClick={showimage} src={nap.slice(0,-2)} size='small' />
     <p><small className="textTime">{getmsgtime(nap)}</small></p>
     {key==chat.body.length-1
      ?<p className="readText"><small>{chat.pread?"read":"unread"}</small></p>
      :null

      }
      </div>
   else if(nap.slice(-2)=="pm") return <div className= "in-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
        {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
     <Image floated="left" className="chatPic" onClick={showimage} src={nap.slice(0,-2)} size='small' /> 
     <p><small className="textTime">{getmsgtime(nap)}</small></p>

     </div>



}

  
  )}
   {lastMessage(chat.body[chat.body.length-1]) ?
     <div><p><small className="readText">{chat.pread?"seen":"unseen"}</small></p></div>
    : null
    }
  {scrollDisplay ? 
<a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="2rem" style={{position:"fixed",bottom:"60px",float:"right"}}/></a>
  :
<a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="2rem" style={{position:"fixed",bottom:"60px",float:"right", display: "none"}}/></a>
}
  </div>
    <Form.Group className="chat-form" style={{position: "fixed", bottom: "2px", margin: "0"}}>
      <Row className="align-items-center" noGutters>
      {/* <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmedia} style={{display: 'none'}} multiple/> */}
      <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmediatemp} style={{display: 'none'}} multiple/>

     <Col className="chatformicons" xs={2} > <MdAddToPhotos style={{marginLeft: "20px"}} onClick={mediashare} size="2rem" color="gray"/></Col>
          <Col xs={6} >
    <Form.Control type="text" placeholder="Message Here" id="msgtext"/></Col>
   <Col className="chatformicons" xs={4} >
   <a href="#scrolltobottom"> <Button primary style={{marginLeft: "20px"}} className="chatSend" id={props.chat.id} onClick={(e)=>click(props.chat.id)}>Send<MdSend /></Button></a></Col>
    </Row>
  </Form.Group>
  <ImageModal2 image={tempimg}  flag={setupload} setimage={settempimg} addmore={mediashare} removeitems={removeitems}/>
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
         {/* {pdetails.businessname} */}
         Title here
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
  
      
    <div className="chatdiv" style={{overflow:'auto'}} ref={scrollref} onScroll={(e)=>{scrollhandle(e)}}>
    
      {
  chat.body.map((nap,key,array)=>
  
  {


  //  if(key%2==0 || key%2==1){ return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><div className="out-chatbox"><p className="chatList">{nap.slice(0, -1)}{cmpmsg(nap,array[key-1])}</p></div></div>}
  if(nap[nap.length-1]=="u") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
   {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
    <div className="out-chatbox" >
      <p className="chatList">{getorgnl(nap)}&nbsp; <small className="textTime"> {getmsgtime(nap)}</small></p>
      
      </div>
    {/* {key==chat.body.length-1 ?
        <div><p><small className="readText">{chat.pread?"read":"unread"}</small></p></div>
        :null
  
         } */}
      
      </div>
     
  else if(nap[nap.length-1]=="p") return <div className= "in-chat">
       {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
    <div className="in-chatbox" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}><p className="chatListP">{getorgnl(nap)}&nbsp; <small className="textTimep"> {getmsgtime(nap)}</small></p></div></div>
   else if(nap.slice(-2)=="um") return <div className= "out-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
        {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
     <Image floated="right" className="chatPic" onClick={showimage} src={nap.slice(0,-2)} size='small' />
     <p><small className="textTime">{getmsgtime(nap)}</small></p>
     {key==chat.body.length-1
      ?<p className="readText"><small>{chat.pread?"read":"unread"}</small></p>
      :null

      }
      </div>
   else if(nap.slice(-2)=="pm") return <div className= "in-chat" key={key} id={key==chat.body.length-1 ? "scrolltobottom":null}>
        {cmpmsg(nap,array[key-1])!=null
   ?<p>{cmpmsg(nap,array[key-1])}</p>
   :null
   }
     <Image floated="left" className="chatPic" onClick={showimage} src={nap.slice(0,-2)} size='small' /> 
     <p><small className="textTime">{getmsgtime(nap)}</small></p>

     </div>



}

  
  )}
   {lastMessage(chat.body[chat.body.length-1]) ?
     <div><p><small className="readText">{chat.pread?"seen":"unseen"}</small></p></div>
    : null
    }
{scrollDisplay ?
<a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="3rem" style={{position:"fixed",bottom:"150px",float:"right"}}/></a>
 :
 <a href="#scrolltobottom" id="scrollbtn"><MdArrowDropDownCircle size="3rem" style={{position:"fixed",bottom:"150px",float:"right", display: "none"}}/></a>
 }
 </div>

    <Form.Group className="chat-form" onKeyDown={onKeyDownHandler}  style={{position: "fixed", bottom: "2px", margin: "0"}}>
      <Row style={{margin: "0"}}>
      {/* <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmedia} style={{display: 'none'}} multiple/> */}
      <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmediatemp} style={{display: 'none'}} multiple/>

 

    <Col xs={2} > <MdAddToPhotos onClick={mediashare} style={{cursor:"pointer"}} size="2rem" color="gray"/></Col>
          <Col xs={8} style={{marginRight: "0"}}>          
    <Form.Control type="text" placeholder="Message Here" value={typemsg} onChange={(e)=>{settypemsg(e.target.value)}} id="msgtext"/></Col>
   <Col xs={2} style={{marginRight: "0"}}>
     
    <Button primary className="chatSend" id={props.chat.id} ref={divRef} onClick={(e)=>click(props.chat.id)}>Send<MdSend /></Button></Col>
    {/* <Button primary className="chatSend" id={props.chat.id} ref={divRef} onClick={(e)=>tsend(e,props.chat.id)}>tSend<MdSend /></Button></Col> */}

    </Row>
  </Form.Group>
  {/* <Imageviewer image={mimage} /> */}
  {/* <ImageModal className="uploadModal" image={mimage} setflag={setmimage}/> */}
  <ImageModal2 image={tempimg}  flag={setupload} setimage={settempimg} addmore={mediashare} removeitems={removeitems}/>
  </div>
  )



}

function countSpecial(str){
  const punct = "`";
  let count = 0;
  let position=[]
  for(let i = 0; i < str.length; i++){
     if(!punct.includes(str[i])){
        continue;
     };
     count++;
     position.push(i)
  };
  return str.slice(position[0]+1,position[1]);
}

function getmsgtime(nap){
  let stamps=countSpecial(nap)
  let msgtime=gettbystamps(stamps,"time");
  return msgtime;
}

function cmpmsg(cumsg,premsg){
let premsg2=premsg;
if(premsg==null || premsg=='' || premsg==undefined || premsg==NaN){premsg2=cumsg}

let ct=Number(getstamp(cumsg));
let pt=Number(getstamp(premsg2));
if(gettbystamps(ct,"date") != gettbystamps(pt,"date")){
  let temp=gettbystamps(ct,"fulldate");
  return temp;
}
else return null;
//return new Date(ct*1000).getDate();
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
       // size="small"
        className="uploadModal"
       // trigger={<Button>Show Modal</Button>}
      >
        {/* <Modal.Header>Photo</Modal.Header> */}
        <Modal.Content image>
          <Image centered src={image} wrapped />
          <Modal.Description>
            {/* <p>Would you like to upload this image?</p> */}
          </Modal.Description>
        </Modal.Content>
        {/* <Modal.Actions>

        </Modal.Actions> */}
      </Modal>
    )
  }

  
function Imageviewer(props) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  var images = [
    "http://placeimg.com/1200/800/nature",
    "http://placeimg.com/800/1200/nature",
    "http://placeimg.com/1920/1080/nature",
    "http://placeimg.com/1500/500/nature"
  ];
  var image=[props.image];
  
  const openImageViewer = useCallback(index => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };



  useEffect(() => {
    if(image!=false && image!=null){openImageViewer(1)}
    console.log(image);
    
      }, [props.image])

  return (
    <div>
      {/* {images.map((src, index) => (
        <img
          src={src}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px" }}
          alt=""
        />
      ))} */}

      {isViewerOpen && (
        <ImageViewer
          src={image}
          currentIndex={currentImage}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)"
          }}
        />
      )}
    </div>
  );
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
        size='tiny'
        className="uploadModal"
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
