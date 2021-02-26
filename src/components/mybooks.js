import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {Card } from 'react-bootstrap';
import {  Card, Image,Label,Dropdown,Icon } from 'semantic-ui-react'
import '../index.css';
import { useHistory } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
//import { Card, Icon,Button,Header, Image, Modal,Step,Menu,Dropdown } from 'semantic-ui-react'


//import icons
import {IconContext} from 'react-icons';
import {BsEyeFill} from 'react-icons/bs';
import {BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {MdDelete,MdCheckCircle} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai';
import {FiMoreHorizontal} from 'react-icons/fi'

const db=firebase.firestore();

function useTimes(){
  const[times,setTimes]=useState([])
useEffect(()=>{
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').onSnapshot((snap)=>{
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
               
                <Mybookings data={times}/>
                </div> 
        )
}

export default Sekhar;


function Mybookings(props) {
  const history = useHistory();

const click =(prop)=>{
  console.log("click",prop)
  history.push(`mybookings/id/${prop}`)
}

const edit =(prop)=>{
  
  console.log("click",prop)
  history.push(`mybookings/id/edit/${prop}`)
}
const delpost=(pro)=>{
  db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(pro).delete()
  .then(()=>{
    alert("ad deleted succefully")
  })
}
      return <div>
        
{/* {
  props.data.map((cap)=>
<div id={cap.id} style={{marginLeft:"22%"}}>
<IconContext.Provider value={{ size:"1.5em"}}>
  <Card 
  bg="primary"
  key="2"
  text="black"
  style={{ width: '48rem',borderRadius: '1rem' }}
  className="mb-2 "
>

 <Card.Header style={{display:'inline-flex'}}>{String(cap.posttime.toDate()).replace('GMT+0530 (India Standard Time)','')}
 <AiFillEdit  color="gray"  onClick={(e)=>edit(cap.orderid)} />
 <MdDelete  color="red"  onClick={(e)=>delpost(cap.orderid)} />

 </Card.Header>
  <Card.Body className="card-body">
    <Card.Title>
    <img className="post-img" src={cap.media[0]} alt="" />
   <h3 className="post-title"  value="sekhar">{cap.problem}</h3> 
   <h4 onClick={(e)=>click(cap.id)}>view post</h4>
   <div className="details-post">
   <p><BsEyeFill />&nbsp; Views: {cap.views}</p>
   <p><RiPinDistanceFill /> Distance: 105</p>
   <p><HiOutlineCurrencyRupee /> Money: {cap.money}</p>
   <p><BiTimeFive /> Time: 1hr</p>
   <p ></p>

   </div>
    </Card.Title>
  </Card.Body>
</Card>
</IconContext.Provider>
</div>
  )} */}
   <Sematiccard data={props.data}/>
      </div>
      
 
 
  }


 function Sematiccard(props){
  const history = useHistory();
  const click =(prop)=>{
    console.log("click",prop)
    history.push(`mybookings/id/${prop}`)
  }
  
  const edit =(prop)=>{
    
    console.log("click",prop)
    history.push(`mybookings/id/edit/${prop}`)
  }
  const delpost=(pro)=>{
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(pro).delete()
    .then(()=>{
      alert("ad deleted succefully")
    })
  }

   return <div style={{paddingTop:"30px"}}>
   {  props.data.map((cap)=>
     <Card.Group>
     <Card style={{width:"70%",borderRadius:"1.5rem",backgroundColor:"#F9F9F9"}} centered fluid color='blue'>
      <Card.Content>
      <Card.Meta style={{display:'inline-flex'}}><Icon name="time" /> {String(cap.posttime.toDate()).replace('GMT+0530 (India Standard Time)','')}</Card.Meta>
      <Dropdown item icon="ellipsis horizontal" simple style={{float:"right"}}>
        <Dropdown.Menu>
  
          <Dropdown.Item onClick={(e)=>click(cap.id)}>View post</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>edit(cap.orderid)}>Edit post</Dropdown.Item>
          <Dropdown.Item onClick={(e)=>delpost(cap.orderid)}>Delete</Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    
      </Card.Content>
      <Card.Content extra style={{display:"inline-block",cursor:"pointer"}} onClick={(e)=>click(cap.id)}>
      <Image
      className="post-img" 
      style={{width:"100px",height:"80px",borderRadius:"1rem",cursor:"pointer"}}
      
          floated='left'
          src={cap.media[0]} />  

        <Card.Header style={{paddingBottom:"10px",cursor:"pointer"}} >{cap.problem}</Card.Header>
        <div style={{display:"inline-flex"}}>
          <div style={{paddingRight:"30px"}}>
   <p><BsEyeFill /> Views: {cap.views}</p>
   <p><RiPinDistanceFill /> Distance: 1km</p>
   </div>
   <div>
   <p><HiOutlineCurrencyRupee /> Money: &#8377;{cap.money}</p>
   <p><BiTimeFive /> Time: 1hr</p>
   </div>

   </div>
      </Card.Content>
      <Card.Content style={{display:"inline-flex"}}>
        <p onClick={(e)=>click(cap.id)} style={{cursor:"pointer"}}><u>View post</u></p>
        {cap.orderstate==2
        ?<Label color="green" attached='bottom right' style={{marginRight:"10px",marginBottom:"10px",borderRadius:"0.7rem"}}><MdCheckCircle /> Completed</Label>
        :<Label color="blue" attached='bottom right' style={{marginRight:"10px",marginBottom:"10px",borderRadius:"0.7rem"}}>Active</Label>
        }
      </Card.Content>
   
    </Card>
    </Card.Group>
   )}
   </div>
 }



firebase.auth().onAuthStateChanged(function(user) {
  if(user) {

  }
})