import React ,{Component} from 'react'
import firebase from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel } from 'react-bootstrap';
import { Card, Icon, Image,Dropdown } from 'semantic-ui-react'
import react,{useState,useEffect} from "react";
import {MdDelete,MdLocationOn} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai';
import {RiUserSettingsFill} from 'react-icons/ri'
import { useHistory } from 'react-router-dom'

const db=firebase.firestore();



function useTimes(){
    const[postdata,setdata]=useState([])
    const[posttime,setposttime]=useState([])
  useEffect(()=>{

//
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
let arr=[];
 
       var personId;
    
         personId=window.location.pathname;
         personId=personId.replace('/mybookings/id/','');
         console.log(personId)
         db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
             setdata(snap.data())
            arr.push((String(snap.data().posttime.toDate())).replace('GMT+0530 (India Standard Time)',''));
            arr.push((String(snap.data().schedule.toDate())).replace('GMT+0530 (India Standard Time)',''));
            setposttime(arr)
         })
       
    }})
//


  },[])
  return {postdata,posttime}
  }




const Navbar3=()=>{
  const history = useHistory();
    const {postdata,posttime}=useTimes()

    var media=[];
  if(postdata.media){
    media=postdata.media;
  console.log("times avail")
   
  }
  else console.log("time not")
  const click =(prop)=>{
  
    console.log("click",prop)
    history.push(`edit/${prop}`)
  }
  const delpost=(pro)=>{
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(pro).delete()
    .then(()=>{
      alert("ad deleted succefully")
    })
  }
  
return<div>
  <div>
   {/* <Carousel>
 {media.map((nap)=>
   <Carousel.Item>     
      <video src={nap} poster={nap} width="100%" 
           height="350" autoPlay loop/>
     <Carousel.Caption>
     </Carousel.Caption>
   </Carousel.Item>

 )

}
</Carousel> */}
{/* <div>
  <p>Title:{postdata.problem}</p>
  <p> location: {postdata.location}</p>
  <p> Description: {postdata.description}</p>
  <p>Category: {postdata.job}</p>
  <p>Price: {postdata.price}</p>
  <p>time of post: {posttime[0]}</p>
  <p>service start at: {posttime[1]}</p>
  <p>views: {postdata.views}</p>
  <AiFillEdit color="gray" onClick={(e)=>click(postdata.orderid)}/>
  <MdDelete color="red" onClick={(e)=>delpost(postdata.orderid)}/>
 
</div> */}
<div>
<Card centered color="blue" style={{width:"80%",marginBottom:"50px",borderRadius:"1rem"}}>
  <Card.Content>
  <Card.Meta style={{display:'inline-flex'}}><Icon name="time" />{posttime[0]}</Card.Meta>
  <Dropdown item icon="ellipsis horizontal" simple style={{float:"right"}}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e)=>click(postdata.orderid)}><Icon name="edit" />Edit post</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>delpost(postdata.orderid)}><Icon name="trash" /> Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  </Card.Content>
  <Card.Content extra>
  <Carousel>
 {media.map((nap)=>
   <Carousel.Item>     
      <video src={nap} poster={nap}  autoPlay loop style={{width:"100%",height:"100%",borderRadius:"1rem"}} />
     <Carousel.Caption>
     </Carousel.Caption>
   </Carousel.Item>

 )

}
</Carousel>
</Card.Content>
<Card.Content>
<Card.Header textAlign="center">Title: <u>{postdata.problem}</u></Card.Header>
  </Card.Content>
  
  <div style={{display:"inline-flex",marginBottom:"20px"}}>
    <Card.Group style={{display:"inline-flex",
    marginLeft:"2%"}}>
<Card style={{borderRadius:"1rem"}} color="blue">
  <Card.Content>
    <Card.Meta><Icon name="sticky note"/> Descrition</Card.Meta>
  </Card.Content>
  <Card.Content extra>
    <Card.Description>
    {postdata.description}
    </Card.Description>
  </Card.Content>
</Card>

<Card style={{borderRadius:"1rem"}} color="orange">
  <Card.Content>
    <Card.Meta><Icon name="info circle" /> Details</Card.Meta>
  </Card.Content>
  <Card.Content extra>
    <Card.Description>
   <MdLocationOn /> Location: {postdata.location} <br />
   <RiUserSettingsFill /> category : {postdata.job}
    </Card.Description>
  </Card.Content>
</Card>

<Card style={{borderRadius:"1rem"}} color="green">
  <Card.Content>
    <Card.Meta>Descrition</Card.Meta>
  </Card.Content>
  <Card.Content extra>
    <Card.Description>
      kjadsljlcdholkjsdkksjdfhksabiuhsandhcccccccccccccccccccccccccccccccccccccuhkjxzciujasbcukjbaisucjbyiwaudskf
    </Card.Description>
  </Card.Content>
</Card>
</Card.Group>
  </div>
  <Card.Content extra>
<a onClick={(e)=>click(postdata.orderid)}>
<Icon name="edit" />Edit post
</a>
<a onClick={(e)=>delpost(postdata.orderid)} style={{float:"right"}}>
<Icon name="trash" /> Delete
</a>
  </Card.Content>
</Card>
</div>
</div>
</div>  
}

export default Navbar3