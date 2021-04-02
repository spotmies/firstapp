import React, {useState, useEffect} from 'react'
import { Button, Checkbox, Form,Card } from 'semantic-ui-react'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import macbook from "../assets/css/iphone.png"
import "../assets/css/partner.css"
import {FaGooglePlay} from 'react-icons/fa';
import takepic from "../images/undraw_Organize_photos_re_ogcy.svg";
import location from "../images/undraw_Destination_re_sr74.svg";
//import getquote from "../images/undraw_Hire_re_gn5j.svg";
import getquote from "../images/undraw_people_search_wctu.svg"
import service from "../images/undraw_coffee_break_h3uu.svg";
import about from "../images/undraw_researching_22gp.svg";
import firebase from '../firebase';
import { toast } from 'react-toastify';
// import { withRouter } from 'react-router-dom';

const db=firebase.firestore();
const contactdb=db.collection("contactus");



const options = [
  { key: 'a', text: 'Ac/Refrigirator services', value: 'ac repairs' },
  { key: 'pc', text: 'pc/laptop services', value: 'pc/laptop' },
  { key: 'tv', text: 'tv repairs', value: 'tv' },
  { key: 'elec', text: 'electrician', value: 'electrician' },
  { key: 'id', text: 'interior design', value: 'id' },
  { key: 'fd', text: 'Design', value: 'design' },
  { key: 'dev', text: 'development', value: 'development' },
  { key: 'eve', text: 'events', value: 'events' },
  { key: 'b', text: 'beauty', value: 'beauty' },
  { key: 't', text: 'tutor', value: 'tutor' },
  { key: 'p', text: 'photography', value: 'photography' },
  { key: 'd', text: 'driver', value: 'driver' },
  { key: 'c', text: 'carpenter', value: 'carpenter' },
  { key: 'plum', text: 'plumber', value: 'plumber' },
  { key: 'cc', text: 'cc tv installation', value: 'cc tv installation' },
  { key: 'cat', text: 'catering', value: 'catering' },
]


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

function PartnerRegistration() {
  const[pcate,spcate]=useState(null);
  const[pname,spname]=useState(null);
  const[pnum,spnum]=useState(null);
  
  const redirect=()=>{
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com",'_blank')
   }
  
   const handleChange=(e)=> {
     const re = /^[0-9\b]+$/;
     console.log("change")
     const name=e.target.name==undefined?e.target.parentElement.id:e.target.name;
     const value=e.target.value;
    

     switch (name) {
       case "pname":
         spname(value)
         break;
         case "pnum":
           if (e.target.value === '' || re.test(e.target.value)) {
           spnum(value);
           }
          break;

       default:
        console.log("pcate",e.target.innerText)
        spcate(e.target.innerText);
         break;
     }
    

  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }
   

    const formsubmit =(e)=>{
      let details=null;
      // e.preventDefault();
      console.log("submit")
      console.log(pname,pnum,pcate)
      if(pnum.length==10 && pcate!==null){
      details={pname,pnum,pcate}
      partprereg(details)
      spcate(null);spnum(null);spname(null);
      }
      else{
        if(pnum.length<10)toast.warning("enter valid number");
        else if(pcate==null)toast.warning("please select your profession");
      }
    }
    const clearfield=()=>{
      spcate(null);
      spnum(null);
      spname(null);
      document.getElementById("pname").value="";
      document.getElementById("pnum").value="";
      document.getElementById("pcate").value=null;
    }
    function partprereg(details){
      console.log(details); 
  //   toast.success("Thank you we will contact you soon")
     contactdb.doc().set(details).then(()=>{
       toast.success("Thank you we will contact you soon...");
       clearfield();
     })
    }
    

   const [height1, width1] = useWindowSize();
   if(width1 <= 800) {
    return (
      <div className="pslide1">
<p id="partnerTop"></p>

<section className="home-section">
<Fade right>
       <div className="home-photos">
         <img src={about} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox">
        <h1>Turn your time into money with spotmies.</h1>
        {/* <p>It is a platform where service seeker and technicians get connected to each other. we help you to solve your basic home service needs at your door steps.</p> */}
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
        <h1>Register</h1>
        <p>Download our spotmies partner app and get registered with your aadhar and mobile number.</p>
        </div>         
      </Zoom>
      
    </section>

    <section className="home-section">
    <Fade right>
       <div className="home-photos">
         <img src={location} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox">
        <h1 style={{color: "rgba(29, 29, 29, 0.884)"}}>Select your profession</h1>
        <p> Specify your profession during registration.<br/>You can develop your skills further from our highly recommended tutorials.</p>
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
        <h1>Quote your price</h1>
        <p>Quote your reasonable service price and negotiate with your customer.</p>
        </div>         
      </Zoom>
    </section>

    <section className="home-section">
    <Fade right>
       <div className="home-photos1" id="servicepic">
         <img src={service} />
       </div>
      </Fade>
      <Zoom>
        <div className="home-textBox" style={{marginTop: "-100px", marginBottom: "100px"}}>
        <h1 >Get orders from your range area.</h1>
        <p>Limit your coverage area in the app and get orders within the range.</p>
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
        <h1>Navigate to the customer location</h1>
        <p>Explore and use your skills at customer location and get the credit you deserve.</p>
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
        <h1>Get paid for your valuable skills and hardwork.</h1>
        {/* <p>Quote your reasonable service price and negotiate with your customer.</p> */}
        </div>         
      </Zoom>

     
    </section>

    <Form style={{height: "300px", width: "80%", margin: "0 auto"}} onSubmit={formsubmit}>
         <label><b>Select Your Proffesion</b></label>
         <Form.Select name="pcate" id="pcate" onChange={handleChange} options={options} placeholder='Type of profession' required/>
           <Form.Field >
             <label>First Name</label>
             <input placeholder='First Name' id="pname" name="pname" value={pname} onChange={handleChange} maxLength="15" required/>
           </Form.Field>
           <Form.Field>
             <label>Mobile Number</label>
             <input  value={pnum} 
             onClick={handleChange} name="pnum" id="pnum" onChange={handleChange} placeholder='Mobile Numer' maxLength = "10" required/>
           </Form.Field>
             <Button primary type='submit'>Submit</Button>
         </Form>

         <div style={{background: "white", width: "100%", textAlign: "center", padding: "20px auto",height: "70px", fontSize: "32px"}}>
        <FaGooglePlay style={{marginTop: "20px"}} />
     </div>

     <div style={{background: "black", width: "100%", textAlign: "center", color: "white", letterSpacing: "2px"}}>
       <p style={{marginTop: "3px", marginBottom: "3px"}} >Made  with  <span style={{color: 'red'}}>&#x2764;</span>   by  <a onClick={redirect} target="blank" style={{cursor:"pointer"}}>Modern Silpi</a></p>
     </div>

      </div>
  )
   }
   else {
    return (
      <div className="pslide1">


<section className="home-section">
      <Zoom>
        <div className="home-textBox textBox1">
        <h1>Turn your time into money with spotmies.</h1>
        {/* <p>It is a platform where service seeker and technicians get connected to each other. we help you to solve your basic home service needs at your door steps.</p> */}
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
        <h1>Register</h1>
        <p>Download our spotmies partner app and get registered with your aadhar and mobile number.</p>
        </div>         
      </Zoom>
      
    </section>

    <section className="home-section">
      <Zoom>
        <div className="home-textBox textBox1">
        <h1 style={{color: "rgba(29, 29, 29, 0.884)"}}>Select your profession</h1>
        <p> Specify your profession during registration.<br/>You can develop your skills further from our highly recommended tutorials.</p>
        </div>         
      </Zoom>
      <Fade right>
       <div className="home-photos">
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
        <h1>Quote your price</h1>
        <p>Quote your reasonable service price and negotiate with your customer.</p>
        </div>         
      </Zoom>
    </section>

    <section className="home-section">
     
      <Zoom>
        <div className="home-textBox" style={{marginTop: "0px"}}>
        <h1 >Get orders from your range area.</h1>
        <p>Limit your coverage area in the app and get orders within the range.</p>
        </div>         
      </Zoom>
      <Fade right>
       <div className="home-photos1" id="servicepic">
         <img src={service} />
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
        <h1>Navigate to the customer location</h1>
        <p>Explore and use your skills at customer location and get the credit you deserve.</p>
        </div>         
      </Zoom>
    </section>

    <section className="home-section">
    
      <Zoom>
        <div className="home-textBox">
        <h1>Get paid for your valuable skills and hardwork.</h1>
        {/* <p>Quote your reasonable service price and negotiate with your customer.</p> */}
        </div>         
      </Zoom>

      <Fade left>
       <div className="home-photos1">
         <img src={getquote} />
       </div>
       </Fade>
    </section>

         <Form style={{height: "300px", width: "40%", margin: "0 auto"}} onSubmit={formsubmit}>
         <label><b>Select Your Proffesion</b></label>
         <Form.Select name="pcate" id="pcate" onChange={handleChange} options={options} placeholder='Type of profession' required/>
           <Form.Field >
             <label>First Name</label>
             <input placeholder='First Name' id="pname" name="pname" value={pname} onChange={handleChange} maxLength="15" required/>
           </Form.Field>
           <Form.Field>
             <label>Mobile Number</label>
             <input  value={pnum} 
             onClick={handleChange} name="pnum" id="pnum" onChange={handleChange} placeholder='Mobile Numer' maxLength = "10" required/>
           </Form.Field>
             <Button primary type='submit'>Submit</Button>
         </Form>

         <div style={{background: "white", width: "100%", textAlign: "center", padding: "20px auto",height: "70px", fontSize: "32px"}}>
        <FaGooglePlay style={{marginTop: "20px"}} />
     </div>

     <div style={{background: "black", width: "100%", textAlign: "center", color: "white", letterSpacing: "2px"}}>
       <p style={{marginTop: "3px", marginBottom: "3px"}} >Made  with  <span style={{color: 'red'}}>&#x2764;</span>   by  <a onClick={redirect} target="blank" style={{cursor:"pointer"}}>Modern Silpi</a></p>
     </div>

      </div>
  )
   }
    
}

export default PartnerRegistration;
