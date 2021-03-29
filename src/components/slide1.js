import '../App.css';
import repair from '../images/repair.svg';
import { Link } from "react-router-dom";
import React,{useState, useEffect} from 'react';
import {Dropdown,DropdownButton,Modal,Button,InputGroup,Form,FormControl,ProgressBar} from 'react-bootstrap';
import {BiRupee} from 'react-icons/bi';
import {BsTools, BsFillLockFill, BsFillUnlockFill} from 'react-icons/bs';
import {FaGooglePlay} from 'react-icons/fa';
import firebase from '../firebase';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import "../assets/css/home.css"
//svg images import
import macbook from "../assets/css/iphone.png";
import takepic from "../images/undraw_Organize_photos_re_ogcy.svg";
import location from "../images/undraw_Destination_re_sr74.svg";
//import getquote from "../images/undraw_Hire_re_gn5j.svg";
import getquote from "../images/undraw_people_search_wctu.svg"
import service from "../images/undraw_coffee_break_h3uu.svg";
import about from "../images/undraw_researching_22gp.svg";
import {useSpring, animated} from 'react-spring'


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


function useWindowSize() {
  const [swidth, setSWidth] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSWidth([window.innerHeight, window.innerWidth]);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  return swidth;
}


function Slide(){
  const redirect=()=>{
   // window.location.href = 'https://modernsilpi.com';
   window.open("https://modernsilpi.com",'_blank')
  }
  // let location="seethamadahar";
  const db=firebase.firestore();
  // const [modalShow, setModalShow] = React.useState(false);
  const [sheight1,swidths1] = useWindowSize();


  if(swidths1 < 800){
    return <div className="slide1">
    <section className="home-section">
    <Fade right>
       <div className="home-photos">
         <img src={about} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox">
        <h1>What is Spotmies ?</h1>
        <p>It is a platform where service seeker and technicians get connected to each other. we help you to solve your basic home service needs at your door steps.</p>
        </div>         
      </Zoom>
     
    </section>

    <section className="home-section">
    <Fade left>
       <div className="home-photos1" id="takepic">
         <img src={takepic} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox textBox1">
        <h1>Take a picture</h1>
        <p>Click a picture of your service and post an ad.</p>
        </div>         
      </Zoom>
      
    </section>

    <section className="home-section">
    <Fade right>
       <div className="home-photos locationpic">
         <img src={location} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox">
        <h1 style={{color: "rgba(29, 29, 29, 0.884)"}}>Set location</h1>
        <p>Set location of your service place.<br/> To get faster service.</p>
        </div>         
      </Zoom>
    
    </section>
     
    <section className="home-section">
      <Fade left>
       <div className="home-photos1">
         <img src={getquote} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox">
        <h1>Get Quote</h1>
        <p>Get Select the best quote from all technicians around you.</p>
        </div>         
      </Zoom>
    </section>

    <section className="home-section">
    <Fade right>
       <div className="home-photos" id="servicepic">
         <img src={service} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox" style={{marginTop: "-100px", marginBottom: "100px"}}>
        <h1 >Get your service done at your door steps.</h1>
      
        </div>         
      </Zoom>
    
    </section>

    <section className="home-textBox" id="joinBtn">
      <Fade top>
      <div>

        <h1>Privacy by default</h1>
      </div> 
      </Fade> 
    </section>

    <section className="home-textBox" id="joinBtn">
      <Fade top>
      <div>
        <h1>Wanna join your business?</h1>
        <Link to="/partnerRegistration"><Button>Join here</Button></Link>
      </div> 
      </Fade> 
    </section>
     
     <div style={{background: "white", width: "100%", textAlign: "center", padding: "20px auto",height: "70px", fontSize: "32px"}}>
        <FaGooglePlay style={{marginTop: "20px"}} />
     </div>

     <div style={{background: "black", width: "100%", textAlign: "center", color: "white", letterSpacing: "2px"}}>
       <p style={{marginTop: "3px", marginBottom: "3px"}} >Made  with  <span style={{color: 'red'}}>&#x2764;</span>   by  <a onClick={redirect} target="blank" style={{cursor:"pointer"}}>Modern Silpi</a></p>
     </div>

  </div>
  
  }
   else {
    return <div className="slide1">
      <section className="home-section">
        <Zoom>
          <div className="home-textBox">
          <h1>What is Spotmies ?</h1>
          <p>It is a platform where service seeker and technicians get connected to each other. we help you to solve your basic home service needs at your door steps.</p>
          </div>         
        </Zoom>
        <Fade right>
         <div className="home-photos">
           <img src={about} />
         </div>
        </Fade>
      </section>

      <section className="home-section">
      <Fade left>
         <div className="home-photos1" id="takepic">
           <img src={takepic} />
         </div>
        </Fade>
        <Zoom>
          <div className="home-textBox">
          <h1>Take a picture</h1>
          <p>Click a picture of your service and post an ad.</p>
          </div>         
        </Zoom>
        
      </section>

      <section className="home-section">
        <Zoom>
          <div className="home-textBox textBox1">
          <h1 style={{color: "rgba(29, 29, 29, 0.884)"}}>Set location</h1>
          <p>Set location of your service place.<br/> To get faster service.</p>
          </div>         
        </Zoom>
        <Fade right>
         <div className="home-photos locationpic">
           <img src={location} />
         </div>
        </Fade>
      </section>
       
      <section className="home-section">
        <Fade left>
         <div className="home-photos1">
           <img src={getquote} />
         </div>
        </Fade>
        <Zoom>
          <div className="home-textBox">
          <h1>Get Quote</h1>
          <p>Get Select the best quote from all technicians around you.</p>
          </div>         
        </Zoom>
      </section>

      <section className="home-section">
       
        <Zoom>
          <div className="home-textBox" style={{marginTop: "0px"}}>
          <h1 >Get your service done at your door steps.</h1>
          {/* <p>.</p> */}
          </div>         
        </Zoom>
        <Fade right>
         <div className="home-photos" id="servicepic">
           <img src={service} />
         </div>
        </Fade>
      </section>

      <section className="home-textBox" id="joinBtn">
        <Fade top>
        <div>
          <h1>Wanna join your business?</h1>
          <Link to="/partnerRegistration"><Button>Join here</Button></Link>
        </div> 
        </Fade> 
      </section>
       
       <div style={{background: "white", width: "100%", textAlign: "center", padding: "20px auto",height: "70px", fontSize: "32px"}}>
          <FaGooglePlay style={{marginTop: "20px"}} />
       </div>

       <div style={{background: "black", width: "100%", textAlign: "center", color: "white", letterSpacing: "2px"}}>
         <p style={{marginTop: "3px", marginBottom: "3px"}} >Made  with  <span style={{color: 'red'}}>&#x2764;</span>   by  <a onClick={redirect} target="blank" style={{cursor:"pointer"}}>Modern Silpi</a></p>
       </div>

    </div>
  }
    
}

export default Slide;



