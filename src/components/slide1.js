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
    return <div className="slide1" >
        <img  src={repair} alt="logo" width="900" height="500"/>

    </div>
    
}

export default Slide;



