import React, { Component } from 'react';
import firebase from '../firebase';
import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal,Card } from 'react-bootstrap';
import '../index.css';
import Navibar from "./navbar";

//import icons
import {IconContext} from 'react-icons';
import { MdAccountCircle,MdChat,MdSettings} from 'react-icons/md';
import {BsReverseLayoutTextSidebarReverse,BsChatFill,BsFillBriefcaseFill,BsChatDotsFill,BsEyeFill} from 'react-icons/bs';
import {BiLogOutCircle,BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'

const db=firebase.firestore();
var problem="nothinbg"
export default class cart extends Component {
    render() {
        return (
            <div className="responses">
                <Mybookings problem={problem}/>
            </div>
        )
    }
   
}

// firebase.auth().onAuthStateChanged(function(user) {

//   if (user) {
//     const resp=document.querySelector('.responses')
//     db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').get().then(snap=>{
//       snap.forEach(nap=>{
//         console.log(nap.data());
//         const divv=document.createElement('div');
//         divv.innerHTML=`
//         <Card 
//       bg="primary"
//       key="2"
//       text="black"
//       style={{ width: '48rem',borderRadius: '1rem' }}
//       className="mb-2 "
//     >
//       <Card.Header >Header</Card.Header>
//       <Card.Body className="card-body">
//         <Card.Title>
//         <img className="post-img" src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="" />
//        <h3 className="post-title">sdf </h3> 
//        <div className="details-post">
//        <p><BsEyeFill /> Views: 105</p>
//        <p><RiPinDistanceFill /> Distance: 105</p>
//        <p><HiOutlineCurrencyRupee /> Money: 500/-</p>
//        <p><BiTimeFive /> Time: 1hr</p>
//        </div>
//         </Card.Title>
//       </Card.Body>
//     </Card>
//         `;
//         resp.append(divv);
//       })
//     })
//   }
//   else{ 
 
// }
// })


function Mybookings(props) {
    return (
      <div>
         <Card 
      bg="primary"
      key="2"
      text="black"
      style={{ width: '48rem',borderRadius: '1rem' }}
      className="mb-2 "
    >
      <Card.Header >Header</Card.Header>
      <Card.Body className="card-body">
        <Card.Title>
        <img className="post-img" src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="" />
       <h3 className="post-title">{props.problem}</h3> 
       <div className="details-post">
       <p><BsEyeFill /> Views: 105</p>
       <p><RiPinDistanceFill /> Distance: 105</p>
       <p><HiOutlineCurrencyRupee /> Money: 500/-</p>
       <p><BiTimeFive /> Time: 1hr</p>
       </div>
        </Card.Title>
      </Card.Body>
    </Card>
    </div>
    );
  }
