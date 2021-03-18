import '../App.css';
import repair from '../images/repair.svg';
import { Link } from "react-router-dom";
import React,{useState} from 'react';
import {Dropdown,DropdownButton,Modal,Button,InputGroup,Form,FormControl,ProgressBar} from 'react-bootstrap';
import {BiRupee} from 'react-icons/bi';
import {BsTools} from 'react-icons/bs';
import {FaGooglePlay} from 'react-icons/fa';
import firebase from '../firebase';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import "../assets/css/home.css"
import macbook from "../assets/css/iphone.png"


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
  const redirect=()=>{
   // window.location.href = 'https://modernsilpi.com';
   window.open("https://modernsilpi.com",'_blank')
  }
  let location="seethamadahar";
  const db=firebase.firestore();
  const [modalShow, setModalShow] = React.useState(false);
    return <div className="slide1">
      <section className="home-section">
        <Zoom>
          <div className="home-textBox">
          <h2>This is the main Heading</h2>
          <p>Markup that will be revealed on scroll</p>
          </div>         
        </Zoom>
        <Fade right>
         <div className="home-photos">
           <img src={macbook} style={{width: "150px", height: "250px"}} />
         </div>
        </Fade>
      </section>

      <section className="home-section">
      <Fade left>
         <div className="home-photos1">
           <img src={"../assets/css/iphone.png"} style={{width: "150px", height: "250px"}} />
         </div>
        </Fade>
        <Zoom>
          <div className="home-textBox">
          <h2>This is the main Heading</h2>
          <p>Markup that will be revealed on scroll</p>
          </div>         
        </Zoom>
        
      </section>

      <section className="home-section">
        <Zoom>
          <div className="home-textBox">
          <h2>This is the main Heading</h2>
          <p>Markup that will be revealed on scroll</p>
          </div>         
        </Zoom>
        <Fade right>
         <div className="home-photos">
           <img src={"../assets/css/iphone.png"} style={{width: "150px", height: "250px"}} />
         </div>
        </Fade>
      </section>
       
      <section className="home-section">
        <Fade left>
         <div className="home-photos1">
           <img src={"../assets/css/iphone.png"} style={{width: "150px", height: "250px"}} />
         </div>
        </Fade>
        <Zoom>
          <div className="home-textBox">
          <h2>This is the main Heading</h2>
          <p>Markup that will be revealed on scroll</p>
          </div>         
        </Zoom>
      </section>
       
       <div style={{background: "white", width: "100%", textAlign: "center", padding: "20px auto",height: "70px", fontSize: "32px"}}>
          <FaGooglePlay style={{marginTop: "20px"}} />
       </div>

       <div style={{background: "black", width: "100%", textAlign: "center", color: "white", letterSpacing: "2px"}}>
         <p style={{marginTop: "3px", marginBottom: "3px"}} >Made  with  <span style={{color: 'red'}}>&#x2764;</span>   by  <a onClick={redirect} target="blank" style={{cursor:"pointer"}}>Modern Silpi</a></p>
       </div>

    </div>
    
}

export default Slide;



