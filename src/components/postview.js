import React ,{Component} from 'react'
import firebase from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel } from 'react-bootstrap';
import react,{useState,useEffect} from "react";


const db=firebase.firestore();

// class Navbar2 extends Component {
//     componentDidMount(){
//        var personId;
//         fetch(`http://localhost:3000/mybookings/id/`, {})
//         .then((res) =>{ res.json()})
//         .then((response) => {
        
//          // console.log(`http://localhost:3000/mybookings/id/${personId}`);
//          personId=window.location.pathname;
//          personId=personId.replace('/mybookings/id/','');
//          console.log(personId)
//          db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
//              console.log(snap.data())
//          })
//         })
//         .catch((error) => console.log(error));
//     }
//     render(){
//         return (
//             <div style={{height:"300px",width:"100%", paddingTop:"80px"}}>
//        <Carousel>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
//       alt="First slide"
//      height="700px"/>
//     <Carousel.Caption>
//       <h3>First slide label</h3>
//       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
//       alt="Second slide"
//     />

//     <Carousel.Caption>
//       <h3>Second slide label</h3>
//       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
//   <Carousel.Item>
//     <img
//       className="d-block w-100"
//       src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
//       alt="Third slide"
//     />

//     <Carousel.Caption>
//       <h3>Third slide label</h3>
//       <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
//     </Carousel.Caption>
//   </Carousel.Item>
// </Carousel>
//           </div>
//         )
//     }
// }


function useTimes(){
    const[times,setTimes]=useState([])
  useEffect(()=>{

//
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {

 
       var personId;
        fetch(`http://localhost:3000/mybookings/id/`, {})
        .then((res) =>{ res.json()})
        .then((response) => {
        
         // console.log(`http://localhost:3000/mybookings/id/${personId}`);
         personId=window.location.pathname;
         personId=personId.replace('/mybookings/id/','');
         console.log(personId)
         db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
             console.log(snap.data())
             setTimes(snap.data())
         })
        })
        .catch((error) => console.log(error));
    }})
//


  },[])
  return times
  }




const Navbar3=()=>{
    const times=useTimes()
    var media=[];
  if(times.media){
    media=times.media;
  console.log("times avail")

  }
  else console.log("time not")

    console.log("this is times",times.media)
    const listItems = media.map((number) =>
    <li>{number}</li>
  );
return<div>
               <div style={{height:"300px",width:"100%", paddingTop:"80px"}}>

 
  
   <Carousel>
 {media.map((nap)=>
 
   
   <Carousel.Item>
     {/* <img
       className="d-block w-100"
        src={nap}
       alt="First slide"
      height="700px"/> */}
     
      <video src={nap} poster={nap} width="100%" 
           height="350" autoPlay loop/>


     <Carousel.Caption>
     </Carousel.Caption>
   </Carousel.Item>

 )

}
</Carousel>
<div>
  <p>{times.problem}</p>
  <p>{times.location}</p>
  <p>{times.descrition}</p>
  <p>{times.job}</p>
  <p>{times.price}</p>
  <ul>{listItems}</ul>
</div>

           </div>
</div>
        

    
    
}

export default Navbar3