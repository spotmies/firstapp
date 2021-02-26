import react,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,NavDropdown,Navbar,Nav,Modal,Form,Card } from 'react-bootstrap';
import { Dropdown ,Image} from 'semantic-ui-react'

import '../navbar.css';
import logo from '../logo.svg';
import firebase from '../firebase'


// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//react icons
import {IconContext} from 'react-icons';
import { MdAccountCircle,MdChat,MdSettings} from 'react-icons/md';
import {BsReverseLayoutTextSidebarReverse,BsChatFill,BsFillBriefcaseFill,BsChatDotsFill,BsEyeFill} from 'react-icons/bs';
import {BiLogOutCircle,BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi';
import {IoCarSport} from 'react-icons/io5';

var newpost;

firebase.auth().onAuthStateChanged(function(user) {



  if (user) {
    newpost="/newpost"
    console.log("user login")
    // document.querySelector('.userhere').innerHTML=""
    username="sekhar"
    document.querySelector('.userhere').style.display="block";
    document.querySelector("#mychats").style.display="block"
    document.querySelector("#mybooks").style.display="block"
    document.getElementById('signup').style.display="none";
    document.querySelector('.userdp').style.display="block";
  }
  else{ 
    newpost="/signup"
    console.log("user not login")
  document.querySelector('.userhere').style.display="none";
  document.querySelector("#mychats").style.display="none"
  document.querySelector("#mybooks").style.display="none"
  document.querySelector('.userdp').style.display="none";
  document.getElementById('signup').style.display="block";
}
})

const db=firebase.firestore();
var username="username";
function Navibar(){
   const[name,setName]=useState("undefined")
   const[pic,setpic]=useState("https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png")
   firebase.auth().onAuthStateChanged(function(user) {
     if(user){
      
      db.collection('users').doc(firebase.auth().currentUser.uid).get().then(snap=>{
        if(!snap.data())setName("demouser")
        else{ setName(snap.data().name); setpic(snap.data().pic)}
        // setName(snap.data().name)
      })
     }
   })
    return <header style={{paddingBottom:"50px"}}>    
    <Navbar collapseOnSelect expand="lg"  variant="dark" className="navi-bar" >
      <IconContext.Provider value={{ size:"1.5em",className:"nav-icons"}}>
        <Link to="/">
    <Navbar.Brand className="title">Spotmies</Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">

      </Nav>
      <Nav style={{display:"inline-flex"}}>
      <Link to="/rentals"><Nav  className="chaticon" id="mybooks"><IoCarSport  className="chaticon2" size="1.2em"/> Rentals</Nav></Link>
      <Link to="/mybookings" ><Nav  className="chaticon" id="mybooks"><BsFillBriefcaseFill  className="chaticon2" size="1.2em"/> My Bookings</Nav></Link>
      <Link to="/chat"><Nav  className="chaticon" id="mychats"><MdChat className="chaticon2" size="1.3em"/>  Chat</Nav></Link>
    
     <div style={{display:"inline-flex"}}>
      <img src={pic} className="userdp" style={{height:"20px",width:'20px',borderRadius:"1rem",marginTop:"10px",marginLeft:"6px",display:"none"}} />
      
      <NavDropdown title={name} id="collasible-nav-dropdown" className="userhere" active >
      <Link to="/account"><NavDropdown.Item href="#action/3"><MdAccountCircle  color="gray" size="1.4em" />   Account</NavDropdown.Item></Link>
      <Link to="/mybookings"><NavDropdown.Item href="#action/3.1" ><BsFillBriefcaseFill color="gray" size="1.1em"/>   My Bookings</NavDropdown.Item></Link>
          <Link to="/chat"><NavDropdown.Item href="#action/3.2" ><BsChatFill color="gray" size="1.1em"/>Chats</NavDropdown.Item></Link>
          <Link to="/account"><NavDropdown.Item href="#action/3.3" ><MdSettings  color="gray" size="1.1em"/>   Settings</NavDropdown.Item></Link>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={userlogout}><BiLogOutCircle color="gray" size="1.1em" /> Logout</NavDropdown.Item>
        </NavDropdown>
        </div>
        <Link to="/signup"><Nav className="chaticon" id="signup"> <MdAccountCircle /> Signup/Login</Nav></Link>
        <Link to={`${newpost}`}> <Nav className="chaticon"><b>Ad post</b></Nav></Link>

      </Nav>
    </Navbar.Collapse> 

      </IconContext.Provider>
  </Navbar>
  </header>
  // <div className="spacediv">
    
  // </div>
}
export default Navibar;

function userlogout(){
  firebase.auth().signOut().then(function() {
    alert("logout successfully")
    window.location.reload();
  })

}