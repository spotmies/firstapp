import React, { Component } from 'react'

import {
    Button,Form,Input,TextArea,Card,Label,Image,Modal,Header,Menu
  } from 'semantic-ui-react'

  import {InputGroup} from 'react-bootstrap';
  import DatePicker from 'react-datepicker';
  import imageCompression from "browser-image-compression";

  import {MdLaptopMac,MdTv,MdEventNote,MdEvent,MdDriveEta,MdFace} from 'react-icons/md'
  import {BiCodeBlock} from 'react-icons/bi'
  import{FaChalkboardTeacher,FaTools} from 'react-icons/fa'
  import{IoCameraSharp} from 'react-icons/io5'
  import firebase from '../firebase';
  import 'firebase/storage';
  import { createHashHistory } from "history";
  import {useState,useEffect} from "react";

  import '../post.css';

  const history = createHashHistory();

const db=firebase.firestore();
const storage = firebase.storage();


var imgarr=[];
var jobcate=1;
let avoid=0;
let avoid2=0;
 
function useTimes(){
    const[postdata,setdata]=useState([])
    const[posttime,setposttime]=useState([])
    const[madia,setmadia]=useState([])
  useEffect(()=>{
//
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
let arr=[];
let inj=[];
avoid=0;
avoid2=0;
console.log("usetime")
       var personId;
  
         personId=window.location.pathname;
         personId=personId.replace('/mybookings/id/edit/','');
         console.log(personId)
         db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
             console.log(snap.data().posttime.toDate())
             setdata(snap.data())
            arr.push(String(snap.data().posttime.toDate()));
            arr.push((snap.data().schedule.toDate()));
            setposttime(arr)
            inj.push(snap.data().media)
            setmadia(inj)
            document.querySelector('#nameofserv').value=snap.data().problem;
            document.querySelector('#sdesc').value=snap.data().description;
          //  document.querySelector('.cate').value=snap.data().job;
            document.querySelector('#sprice').value=snap.data().money;
            snap.data().media.map((nap)=>
            src.push(nap)
            )
         }).then(()=>{


         })
    
    }})
//


  },[])
  return {postdata,posttime}
  }



export default function newpost2() {
    return (
        <div>
            <Postnew />
        </div>
    )
}

function Postnew(){

const{postdata,posttime}=useTimes()

return <div style={{paddingTop:"20px"}}>
    <Card centered id="formcard">
    <Card.Content>
        <Card.Header style={{textAlign:"center"}}>New Post</Card.Header>
    </Card.Content>
    <Card.Content>
        {/* <Postform data={src}/> */}
        <Postform2 />
    </Card.Content>
    
    </Card>
    <ModalExampleModal />  
</div>
}
// var src=['https://www.w3schools.com/howto/img_snow.jpg']
var src=[];














function Postform2(){
const{postdata,posttime}=useTimes();
console.log(postdata)
const [startDate, setState] = useState('')
const[arrayvar,setarrayvar]=useState([])
const[arrayvar2,setarrayvar2]=useState([])
const[image,setimage]=useState([]);
const [progress,setprogress]=useState(0);
//console.log(postdata)

if(posttime[1] && avoid2==0){
    console.log(posttime[1])
    setState(posttime[1])
    setarrayvar2(postdata.media)
    console.log("setstate")
    avoid2=1;
  }
  function handleChange(date) {
    setState(date)
    console.log(date)
          }


const handleSubmit=(newar)=> {
   // event.preventDefault();
    console.log(arrayvar)
    let schedule=startDate
    let name=document.querySelector('#nameofserv').value
    let desc=document.querySelector('#sdesc').value
   // let cat=document.querySelector('#scate').value
   let cat=jobcate;
    let price=document.querySelector('#sprice').value
    if(desc==NaN)desc='';
    if(cat=="true")alert("please select category")
    else{
      cat=parseInt(cat);
      price=parseInt(price);
      console.log(name,desc,cat,price,imgarr,schedule)
     const newpost= db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(postdata.orderid)
     var d=new Date();
     console.log(d)
     newpost.update({
        job:cat,
        problem:name,
        description:desc,
        money:price,
        media:newar,
        request:"nothing",
        utime:d,
        schedule:schedule,
      }).then(()=>{
        return db.collection('allads').doc(newpost.id).update({
          job:cat,
          problem:name,
          description:desc,
          money:price,
          media:arrayvar,
          utime:d,
          schedule:schedule,
        })
      }).then(()=>{
        alert("post added successfully")
        history.go(-1)
        imgarr=[];
      })
    }
    
  }    
  
  

 const handleChangeg = e => {
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 800,
      useWebWorker: true
    };
    let cfile;

   // setimage([]);
    for(var i=0;i<e.target.files.length;i++){
      let k=Number(i)

       imageCompression(e.target.files[k], options).then(x => {
        cfile = x;

   //     setimage(image.concat([cfile]))
        setimage(nap=>[...nap,cfile])
        document.getElementById('upldbtn').style.display="block"
      }).catch(function (error) {
        console.log(error.message);
      });


    }
    
  };
useEffect(() => {
if(arrayvar.length>0){
  if(arrayvar.length==image.length){
    let newar=arrayvar2.concat(arrayvar)
    setarrayvar(newar);
    handleSubmit(newar);
  }
}
}, [arrayvar])

 const handleUpload = (e) => {
   e.preventDefault();
  //  document.getElementById("uploaderb").style.display="block"
   // document.getElementById('upldbtn').style.display="none"

if(image.length>0){
    for(var i=0;i<image.length;i++){
      let k=Number(i)
   const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/adpost/${image[k].name}`).put(image[k]);
   uploadTask.on(
     "state_changed",
     snapshot => {
       const progress = Math.round(
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
       );
       setprogress(progress);
     },
     error => {
       console.log(error);
     },
     () => {
       storage
         .ref(`users/${firebase.auth().currentUser.uid}/adpost/`)
         .child(image[k].name)
         .getDownloadURL()
         .then(url => {
           console.log(url)
           setarrayvar(nap=>[...nap,url])
         }).catch((err)=>console.log(err))
     }
   )
    }
  }
  else {
    setarrayvar([]);
    handleSubmit(e);
  }
    //document.getElementById("uploaderb").style.display="none"       
 }


        const sekhararr=(e)=>{

            console.log(e.target.parentElement.parentElement.id)
            var array = [...image]; // make a separate copy of the array
           // var index = array.indexOf(e.target.parentElement.parentElement.id)
            let index2 =Number(e.target.parentElement.parentElement.id)
            console.log(e)
            if (index2 !== -1) {
              array.splice(index2, 1);
              setimage(array)
            }
          }

          const sekhararr2=(e)=>{

            console.log(e.target.parentElement.parentElement.id)
            var array = [...arrayvar2]; // make a separate copy of the array
           // var index = array.indexOf(e.target.parentElement.parentElement.id)
            let index2 =Number(e.target.parentElement.parentElement.id)
            console.log(e)
            if (index2 !== -1) {
              array.splice(index2, 1);
              setarrayvar2(array)
            }
          }       



    return <div>
 <Form className="postjobb"  onSubmit={handleUpload}>
          <Form.Group widths='equal'>
            <Form.Field
            required
              control={Input}
              label='First name'
              placeholder='enter name of service'
              id="nameofserv" className="nameofser"
            />

          </Form.Group>

          <Form.Field
            control={TextArea}
            label='Description'
            id="sdesc"
            placeholder='Tell us more about your problem or any note here...'
          />
          <Form.Field>
            Enter Amount             
            <Input labelPosition='right' type='number' id="sprice" placeholder='Amount'>
            <Label basic>₹</Label>
            <input />
            <Label>.00</Label>
            </Input>
            </Form.Field>
            



        <Form.Field >
        <InputGroup className="mb-2">
            <InputGroup.Prepend className="nameofser">
              <InputGroup.Text> <MdEvent size="1.3em"/></InputGroup.Text>
            </InputGroup.Prepend>
            <DatePicker className="datepicker"
              selected={ startDate }
              placeholderText="when you want service"
              minDate={new Date()}
              name="startDate"
              onChange={ handleChange }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="dd/MM/yyyy"
           required/>
          </InputGroup>
        </Form.Field>


        <Form.Field>
            <Input
            icon='photo'
            iconPosition='Right'
              type="file"
              placeholder='Enter tags'
             //   onChange={upldimg}
             accept=".gif,.jpg,.jpeg,.png"
             onChange={handleChangeg}
             multiple
                 />
            </Form.Field>
            {/* <Form.Field control={Button} color="green" id="upldbtn" type="button" onClick={handleUpload}>
              upload images
            </Form.Field> */}
            <progress value={progress} max="100" id="uploaderb">progress</progress>

            <div className="imgdiv">
      
      <div className="gallery">


      
      </div>
      </div>


<div>
<Image.Group size='small'>
 

{
  arrayvar2.map((nap,key)=>
  
  <Image
  fluid
  key={key}
  id={key}
  label={{ as: 'a', corner: 'right', icon: 'trash',onClick: sekhararr2}}
  src={nap}
 
/>

  )}

</Image.Group>


<Image.Group size='small'>
 

{
  image.map((nap,key)=>
  
  <Image
  fluid
  key={key}
  id={key}
  label={{ as: 'a', corner: 'right', icon: 'trash',onClick: sekhararr}}
  src={URL.createObjectURL(nap)}
 
/>

  )}

</Image.Group>

</div>


          <Form.Field control={Button} style={{textAlign:"Center"}} type="submit" centered>Submit</Form.Field>
        </Form>
    </div>
}



















function ModalExampleModal() {
  var imgsrc="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorgraphit.com%2Ffree-svg-illustrations-for-your-next-website-or-blog%2Famp&psig=AOvVaw28FMPvsnbckOWg5KwrbFDM&ust=1614586813687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDUruGSjO8CFQAAAAAdAAAAABAJ"
  const [open, setOpen] = React.useState(true)

function click(e){
console.log(e.target.dataset.txt);
jobcate=e.target.dataset.txt;
setOpen(false);
}

  return (
  <>
    <Modal size="small"
    style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"70%"}}
    onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Select Job Category</Modal.Header>
      <Modal.Content >


      </Modal.Content>
      <Card centered id="jobcate">
  <Card.Content>
    <Card.Header>Select Category here</Card.Header>
  </Card.Content>
  <Card.Content>
  <Menu  vertical centered style={{width:"auto"}}>
        <Menu.Item link data-txt="0" onClick={click}><FaTools size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Ac Service</Menu.Item>
        <Menu.Item link data-txt="1" onClick={click}><MdLaptopMac size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Computer/Laptop Service</Menu.Item>
        <Menu.Item link data-txt="2" onClick={click}><MdTv size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Tv Repair</Menu.Item>
        <Menu.Item link data-txt="3" onClick={click}><BiCodeBlock size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Development</Menu.Item>
        <Menu.Item link data-txt="4" onClick={click}><FaChalkboardTeacher size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Tutor</Menu.Item>
        <Menu.Item link data-txt="5" onClick={click}><MdFace size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Beuty</Menu.Item>
        <Menu.Item link data-txt="6" onClick={click}><IoCameraSharp size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Photographer</Menu.Item>
        <Menu.Item link data-txt="7" onClick={click}><MdDriveEta size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Driver</Menu.Item>
        <Menu.Item link data-txt="8" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Events</Menu.Item>
      </Menu>
  </Card.Content>
</Card>
    </Modal>

    </>
  )
}



