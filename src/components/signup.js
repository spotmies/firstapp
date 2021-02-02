import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button,NavDropdown,Navbar,Nav,Modal,Form,Card } from 'react-bootstrap';
import firebase from '../firebase';
import { Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import '../index.css';
const db=firebase.firestore();
var usrno;
const history = createHashHistory();

export default class signup extends Component {
    render() {
        return (
            <div className="signupform">
                <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label style={{marginTop: "120px"}}>Enter your Mobile number</Form.Label>
                <Form.Control type="phone" placeholder="phone number" id="phno" required />
               
            </Form.Group>
            <Button variant="outline-info" type="button" onClick={genotp}>Get Otp</Button>
            <div id="recaptcha-container"></div>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter otp here</Form.Label>
                <Form.Control type="number" placeholder="otp" id="otp" required/>
            </Form.Group>
            <Button variant="outline-info" type="button" onClick={vrfyotp}>Verify</Button>

            <Form.Group controlId="username" style={{display:"none"}} className="username">
                <Form.Label>Enter your name here</Form.Label>
                <Form.Control type="text" placeholder="sweetname here" id="username" required/>
            </Form.Group>

            <Button variant="outline-info" type="button" onClick={rgstusr} style={{display:"none"}} className="signsub">
                Submit
            </Button>
            </Form>
            </div>
        )
    }
}


function genotp(e){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    const phno="+91" + document.getElementById('phno').value;
    console.log(phno)
    firebase.auth().signInWithPhoneNumber(phno,window.recaptchaVerifier) 
    .then(function(confirmationResult) {
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
      document.querySelector('#recaptcha-container').style.display="none";
     
  
  
  
    }).catch(function(error){alert(error)});
  }
  
  function vrfyotp(e){
 
    const otp=document.getElementById('otp');
    window.confirmationResult.confirm(otp.value)
    .then(function(result) {
     usrno=document.getElementById('phno').value;
      console.log(result);
      var doc = db.collection('users').doc(firebase.auth().currentUser.uid);
      doc.get().then((docData) => {
        if (docData.exists) {
          // document exists (online/offline)
          console.log("document exist")
          history.go(-1)
        } else {
          // document does not exist (only on online)
          console.log("document not exist")
          document.querySelector('.username').style.display="block";
          document.querySelector(".signsub").style.display="block";
        }
      }).catch((fail) => {
        console.log("error while reading document")
      });
         
      })
      
  }
  
  // firebase.auth().onAuthStateChanged(function(user) {
  
  //   if (user) {
  //     console.log("user login")
  //   }
  //   else console.log("user not login")
  // })
  
  
//   function userlogout(){
//     firebase.auth().signOut().then(function() {
//       alert("logout successfully")
//     })
//   }

function rgstusr(e){
    e.preventDefault();
    
let name=document.getElementById('username').value;
let userid=firebase.auth().currentUser.uid;
if(name){
    db.collection('users').doc(userid).set({
        name:name,
        phone:usrno
    }).then(()=>{
        alert("data added")
        history.go(-1)
    })
}

else{
alert("please enter your name");
}
}

