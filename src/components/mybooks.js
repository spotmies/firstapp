import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card } from 'react-bootstrap';
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
import {MdDelete} from 'react-icons/md';
import {AiFillEdit} from 'react-icons/ai';

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
        
{
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
  )}
  {/* <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
        />
        <Card.Header style={{color:"red"}}>Steve Sanders <MdDelete /></Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
    </Card.Group> */}
      </div>
      
 
 
  }


 
firebase.auth().onAuthStateChanged(function(user) {
  if(user) {

  }
})