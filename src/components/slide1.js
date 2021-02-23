import '../App.css';
import repair from '../images/repair.svg';
import { Link } from "react-router-dom";
import React,{useState} from 'react';
import {Dropdown,DropdownButton,Modal,Button,InputGroup,Form,FormControl,ProgressBar} from 'react-bootstrap';
import {BiRupee} from 'react-icons/bi';
import {BsTools} from 'react-icons/bs';
import firebase from '../firebase'

var newpost="/signup"
firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
 newpost="/newpost"
 console.log("user exists")
  }
  else{ 
  newpost="/signup"
  console.log("user didn't exixst")
}
})


function Slide(){
  let location="seethamadahar";
  const db=firebase.firestore();
  const [modalShow, setModalShow] = React.useState(false);
  db.collection('users').get().then(snap=>{
    snap.forEach(nap => {
      console.log(nap.id)
    });
  })
    return <div className="slide1" >
        <img  src={repair} alt="logo" width="900" height="500"/>
     <div className="areabg">   
    <DropdownButton
    className="getlocation"
      variant="outline-primary"
      title="Select your location                  "
      id="input-group-dropdown-2"
    >
      
      <Dropdown.Item onClick={() => setModalShow(true)}><Link to={`${newpost}`}>{location}</Link></Dropdown.Item>
      
    </DropdownButton>


    </div>
    </div>
    
}

export default Slide;



