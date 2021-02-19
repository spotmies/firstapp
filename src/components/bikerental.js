import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon,Button,Header, Image, Modal,Step,Menu,Dropdown,Checkbox } from 'semantic-ui-react'
import '../rental.css';
import {SiCoronaengine} from 'react-icons/si'
import {BsFillGearFill} from 'react-icons/bs'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {FaPeopleCarry} from 'react-icons/fa'
import {useState,useEffect} from "react";
import firebase from '../firebase';

const db=firebase.firestore();

function Rentals(){
//  var times=useTimes()
const[times,setTimes]=useState([])

//trigger point
// const keyboard={
//   count:"true",
//   count2:"true",
//   count3:"true",
//   count4:"true",
//   ftype:"status",
//   ftype2:"status",
//   ftype3:"status",
//   ftype4:"status"
// }

//cartype filter
const[count,setcount]=useState("true");
const[ftype,settype]=useState("status");

//fuel filter
const[count2,setcount2]=useState("true");
const[ftype2,settype2]=useState("status");

const[count3,setcount3]=useState("true");
const[ftype3,settype3]=useState("status");

const[count4,setcount4]=useState("true");
const[ftype4,settype4]=useState("status");



function newfunk(e){
  // keys=1;
  // console.log(keys)
  setTimes([]);
  setcount(e.target.innerText)
  settype("cartype")
}



function fuelf(e){
  setTimes([]);
if(e.target.checked){
  console.log("checked")
  settype2("fuelincl");
  setcount2("true");
}
else{ console.log("nockedk")
settype2("fuelincl");
setcount2("false");
}
}

useEffect(() => {
  console.log("useeffect")
  let newtimes
  db.collection('rentals').get().then((snap)=>{
    snap.docs.forEach(nap=>{
      if(nap.data().permission){
        // if(keys==0){
        db.collection('rentals').doc(nap.id).collection('products')
        .where(ftype,"==",count)
        .where(ftype2,"==",count2)
        .where(ftype3,"==",count3)
        .where(ftype4,"==",count4)
        // .orderBy("price")
        .get().then(snap=>{
          newtimes=snap.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
          }))
          setTimes(cap=>[...cap,...newtimes])
          // console.log(times)
        })

      }
    })
  })

},[count,ftype,count2,ftype2,count3,ftype3,count4,ftype4])




var arr=[];
for(var i=0;i<=100;i++){
  arr.push(false)
}
const [open, setOpen] = useState(arr)

    return <div>
     
        <div>
          {/* <  car Filtering /> */}
          <Dropdown
    text='Filter'
    icon='filter'
    labeled
    button
    className='icon'
    
  >
    <Dropdown.Menu id="filtmenu" onClick={newfunk}>
      <Dropdown.Item>
        <Icon name='attention' className='right floated' />
        sport
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name='comment' className='right floated' />
        suv
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name='conversation' className='right floated' />
        sedan
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>


{/* price filtering */}
  <Dropdown
    text='Filter'
    icon='filter'
    labeled
    button
    className='icon'
    
  >
    <Dropdown.Menu id="pricef">
      <Dropdown.Item >
        Low to High
      </Dropdown.Item>
      <Dropdown.Item>
        High to Low
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>


  <Checkbox toggle  style={{float:"right"}} onChange={fuelf} id="fuelid"/>
  <div className="newdiv">
            <div style={{padding:"10px",marginLeft:"auto",marginRight:"auto"}} className="maindiv">
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
    <Button > &#8377;{nap.price*50} <br /> <small> 50km  </small></Button>

    <Button> &#8377;{nap.price*100}<br /> <small> 100km </small></Button>
    <Button>&#8377;{nap.price*150} <br />  <small> 150km </small></Button>
  </Button.Group>

      </div>
    </Card.Content>
    {nap.status
      ?<Button id={nap.id} color="blue" onClick={(e)=>blynk(key,true)}>Book now</Button>
      :<Button disabled id={nap.id} color="brown" onClick={(e)=>setOpen(true)}>Sold out</Button>
    }
    
    <div>
    <Modal
      onClose={() => setOpen({key:false})}
      onOpen={() => setOpen({key:true})}
      open={open[key]}
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
        <Button color='black' onClick={(e)=>blynk(key,false)}>
          Exit
        </Button>
        <Button
          content="Rent Now"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen({key:false})}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>
  </Card>

  
)}
</Card.Group>
            </div>
            </div>
           {/* <ModalExampleModal state={open} /> */}

        </div>
    </div>
function blynk(props,crops){
  arr[props]=crops;
  console.log(arr)
  setOpen(arr)
}

}







function useTimes(){
  const[times,setTimes]=useState([])
  useEffect(()=>{
    var newtimes;
    let count=0;
    db.collection('rentals').get().then((snap)=>{
      snap.docs.forEach(nap=>{
        if(nap.data().permission){
          db.collection('rentals').doc(nap.id).collection('products').get().then(snap=>{
            newtimes=snap.docs.map((doc)=>({
              id:doc.id,
              ...doc.data()
            }))
            setTimes(cap=>[...cap,...newtimes])
          })
        }
      })
    })
  },[])
  return times;
}




function Empty(){
  return <div>
    <p>this is empalyt</p>
  </div>
}











export default Rentals




































// function ModalExampleModal(props) {
//   const [open, setOpen] = useState(props.state)

// console.log(open)

//   return (
    
//     <Modal
//     onClose={() => setOpen(false)}
//     onOpen={() => setOpen(true)}
//     open={open}
//   >
    
//     <Modal.Header>{nap.model}</Modal.Header>
//     <Modal.Content image>
//       <Image size='medium' src={nap.photo} wrapped/>
//       <Modal.Description>
//         <Header><h1>{nap.model}</h1></Header>
//         <p>
//         {/* <b> &#8377; {nap.price}/Day</b> */}
//         </p>
//       <div style={{display:'inline-flex'}}> 
//       <p><a>
//         <SiCoronaengine />
//       &nbsp; {nap.toc} 
//       </a></p>

//       <p style={{marginLeft:"20px"}}><a>
//       <BsFillGearFill />
//       &nbsp; {nap.geartype} 
//       </a></p>

//       <p style={{marginLeft:"20px"}}> <a>
//       <Icon name='wheelchair' />
//       {nap.seats}seats
//     </a></p>

//     <p style={{marginLeft:"20px"}}><a>
//       <IoSpeedometerOutline />
//       &nbsp;{nap.kmslimit} km
//       </a></p>

//       {nap.fuelincl
//       ?<p style={{marginLeft:"20px"}}> <Icon name="tint" />fuel: include</p>
//       :<p style={{marginLeft:"20px"}}> <Icon name="tint" />fuel: exclude</p>
//       }

//       </div>
//       <div style={{display:"inline-flex"}}>
//       {nap.delivery
//       ?<p><FaPeopleCarry />&nbsp;door delivery: yes</p>
//       :<p style={{marginLeft:"20px"}}><FaPeopleCarry />delivery: no</p>
//       }
//       <p style={{marginLeft:"20px"}}><a>
//       <IoSpeedometerOutline />
//       &nbsp;{nap.maxspeed} kmph
//       </a></p>

//       <p style={{marginLeft:"20px"}}><a>
//       <IoSpeedometerOutline />
//       &nbsp;Model by: {nap.carcomp}
//       </a></p>
//       </div>
//       <p>
//         {nap.descr}
//       </p>
//       <div>
//     <Button.Group style={{width:'320px',marginTop:'10px'}}>
//   <Button> &#8377;{nap.price*50} <br /> <small> 50km  </small></Button>

//   <Button> &#8377;{nap.price*100}<br /> <small> 100km </small></Button>
//   <Button>&#8377;{nap.price*150} <br />  <small> 150km </small></Button>
// </Button.Group>

//     </div>
//     <div>

//     </div>
//       </Modal.Description>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button color='black' onClick={() => setOpen(false)}>
//         Exit
//       </Button>
//       <Button
//         content="Rent Now"
//         labelPosition='right'
//         icon='checkmark'
//         onClick={() => setOpen(false)}
//         positive
//       />
//     </Modal.Actions>
//   </Modal>
//   )
// }

