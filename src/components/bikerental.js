import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Card, Icon,Button,Header, Image, Modal,Step,Menu,Dropdown } from 'semantic-ui-react'
import '../rental.css';
import {SiCoronaengine} from 'react-icons/si'
import {BsFillGearFill} from 'react-icons/bs'
import {IoSpeedometerOutline} from 'react-icons/io5'
import {FaPeopleCarry} from 'react-icons/fa'
import {useState,useEffect} from "react";
import firebase from '../firebase';

const db=firebase.firestore();


function Rentals(){
  var times=useTimes()
var arr=[];
for(var i=0;i<=100;i++){
  arr.push(false)
}
const [open, setOpen] = useState(arr)
const[daty,setdaty]=useState([]);

function getfilt(e){
  const wdiv=document.querySelector('.newdiv')
  document.querySelector('.maindiv').remove();
  console.log(e.target.innerText,"filtering")
  db.collection('rentals').get().then((snap)=>{
    snap.docs.forEach(nap=>{
      if(nap.data().permission){
        db.collection('rentals').doc(nap.id).collection('products').where("cartype","==",e.target.innerText).get().then(snap=>{
          const divm=document.createElement('div');
          divm.setAttribute('class','maindiv ui cards');
          snap.docs.forEach(nap=>{
            const div=document.createElement('div');
            div.setAttribute('id',`${nap.id}`)
            div.innerHTML=`
            <div class="ui card"><div class="image">
            <img src=${nap.data().photo} />
            </div>
            <div class="content">
            <div class="header">Matthew</div>
            <div class="meta"><span class="date">Joined in 2015</span>
            </div><div class="description">Matthew is a musician living in Nashville.</div></div>
            <div class="extra content"><a><i aria-hidden="true" class="user icon"></i>22 Friends</a>
            </div></div>`;
            divm.append(div);
            wdiv.append(divm)
          })
         

        })
      }
    })
  })
console.log(daty)
}


 
    return <div>
        <div>
          {/* < Filtering /> */}
          <Dropdown
    text='Filter'
    icon='filter'
    labeled
    button
    className='icon'
    
  >
    <Dropdown.Menu onClick={getfilt}>
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




// const Filtering = () => (
//   <Dropdown
//     text='Filter'
//     icon='filter'
//     labeled
//     button
//     className='icon'
    
//   >
//     <Dropdown.Menu onClick={getfilt}>
//       <Dropdown.Item>
//         <Icon name='attention' className='right floated' />
//         sport
//       </Dropdown.Item>
//       <Dropdown.Item>
//         <Icon name='comment' className='right floated' />
//         suv
//       </Dropdown.Item>
//       <Dropdown.Item>
//         <Icon name='conversation' className='right floated' />
//         sedan
//       </Dropdown.Item>
//     </Dropdown.Menu>
//   </Dropdown>
// )


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

