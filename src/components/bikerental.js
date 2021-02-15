import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon,Button,Header, Image, Modal,Step,Menu } from 'semantic-ui-react'
import '../rental.css';
import {SiCoronaengine} from 'react-icons/si'
import {BsFillGearFill} from 'react-icons/bs'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {FaPeopleCarry} from 'react-icons/fa'
import react,{useState,useEffect} from "react";
import firebase from '../firebase';

const db=firebase.firestore();



function Rentals(){
  const times=useTimes()
  const [open, setOpen] = useState(false)
  const [col,setcol]=useState('primary')

    return <div>
        <div>
            <div style={{padding:"10px",marginLeft:"auto",marginRight:"auto"}}>
            <Card.Group>     
                {times.map((nap,key)=>     
  <Card className="rentcard" id={nap.id} key={key} style={{width:'370px'}}> 
    <Image src={nap.photo} wrapped ui={true} />
    <Card.Content>
      <Card.Header style={{textAlign:"center"}}>{nap.model}</Card.Header>

      <Card.Description>
     {/* <b> &#8377; {nap.price}/Day</b> */}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div style={{display:"inline-flex"}}>
      <p ><a>
        <BsFillGearFill />
        &nbsp; {nap.geartype} 
        </a></p>
        <p style={{marginLeft:"20px"}}><a>
        <SiCoronaengine />
        &nbsp; {nap.toc} 
                  </a>
          </p>
        <p style={{marginLeft:"20px"}}> <a>
        <Icon name='wheelchair' />
        {nap.seats}seats
       
      </a></p>
      
      <p style={{marginLeft:"20px"}}><a>
        <IoSpeedometerOutline />
        &nbsp;{nap.kmslimit} km
        </a></p>
      </div>
      <div>
      <Button.Group style={{width:'320px',marginTop:'10px'}}>
    <Button primary> &#8377;{nap.price*50} <br /> <small> 50km  </small></Button>

    <Button> &#8377;{nap.price*100}<br /> <small> 100km </small></Button>
    <Button>&#8377;{nap.price*150} <br />  <small> 150km </small></Button>
  </Button.Group>

      </div>
    </Card.Content>
    <Button id={nap.id} color="blue" onClick={(e)=>setOpen(true)}>Book now</Button>
    <div>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      
      <Modal.Header>{nap.model}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={nap.photo} wrapped/>
        <Modal.Description>
          <Header><h1>{nap.model}</h1></Header>
          <p>
          {/* <b> &#8377; {nap.price}/Day</b> */}
          </p>
        <div style={{display:'inline-flex'}}> 
        <p><a>
          <SiCoronaengine />
        &nbsp; {nap.toc} 
        </a></p>

        <p style={{marginLeft:"20px"}}><a>
        <BsFillGearFill />
        &nbsp; {nap.geartype} 
        </a></p>

        <p style={{marginLeft:"20px"}}> <a>
        <Icon name='wheelchair' />
        {nap.seats}seats
      </a></p>

      <p style={{marginLeft:"20px"}}><a>
        <IoSpeedometerOutline />
        &nbsp;{nap.kmslimit} km
        </a></p>

        {nap.fuelincl
        ?<p style={{marginLeft:"20px"}}> <Icon name="tint" />fuel: include</p>
        :<p style={{marginLeft:"20px"}}> <Icon name="tint" />fuel: exclude</p>
        }

        </div>
        <div style={{display:"inline-flex"}}>
        {nap.delivery
        ?<p><FaPeopleCarry />&nbsp;door delivery: yes</p>
        :<p style={{marginLeft:"20px"}}><FaPeopleCarry />delivery: no</p>
        }
        <p style={{marginLeft:"20px"}}><a>
        <IoSpeedometerOutline />
        &nbsp;{nap.maxspeed} kmph
        </a></p>

        <p style={{marginLeft:"20px"}}><a>
        <IoSpeedometerOutline />
        &nbsp;Model by: {nap.carcomp}
        </a></p>
        </div>
        <p>
          {nap.descr}
        </p>
        <div>
      <Button.Group style={{width:'320px',marginTop:'10px'}}>
    <Button> &#8377;{nap.price*50} <br /> <small> 50km  </small></Button>

    <Button> &#8377;{nap.price*100}<br /> <small> 100km </small></Button>
    <Button>&#8377;{nap.price*150} <br />  <small> 150km </small></Button>
  </Button.Group>

      </div>
      <div>

      </div>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Exit
        </Button>
        <Button
          content="Rent Now"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>
  </Card>
  
)}
</Card.Group>
            </div>
           {/* <ModalExampleModal state={open}/> */}

        </div>
    </div>


}


// function ModalExampleModal(props) {
//   const [open, setOpen] = useState(props.state)

// console.log(open)

//   return (
    
//     <Modal
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//       open={open}
//       trigger={<Button>Show Modal</Button>}
//     >
      
//       <Modal.Header>Select a Photo</Modal.Header>
//       <Modal.Content image>
//         <Image size='medium' src='http://cdn.carbuzz.com/gallery-images/1600/523000/700/523781.jpg' wrapped />
//         <Modal.Description>
//           <Header>Default Profile Image</Header>
//           <p>
//             We've found the following gravatar image associated with your e-mail
//             address.
//           </p>
//           <p>Is it okay to use this photo?</p>
//         </Modal.Description>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button color='black' onClick={() => setOpen(false)}>
//           Nope
//         </Button>
//         <Button
//           content="Yep, that's me"
//           labelPosition='right'
//           icon='checkmark'
//           onClick={() => setOpen(false)}
//           positive
//         />
//       </Modal.Actions>
//     </Modal>
//   )
// }


function useTimes(){
  const[times,setTimes]=useState([])
  useEffect(()=>{
    var newtimes;
    db.collection('rentals').get().then((snap)=>{
      snap.docs.forEach(nap=>{
        if(nap.data().permission){
          db.collection('rentals').doc(nap.id).collection('products').get().then(snap=>{
            newtimes=snap.docs.map((doc)=>({
              id:doc.id,
              ...doc.data()
            }))
             setTimes(newtimes);
            
          })
        }
      })
    })
    .then(()=>{
     // setTimes(newtimes);
    })
  },[])
  return times;
}

export default Rentals