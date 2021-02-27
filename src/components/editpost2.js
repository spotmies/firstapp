import React, { Component } from 'react'

import {
    Button,Checkbox,Form,Input,Radio,Select,TextArea,Card,Label,Image,Dropdown, ImageGroup,Grid,Modal,Header
  } from 'semantic-ui-react'

  import {InputGroup} from 'react-bootstrap';
  import DatePicker from 'react-datepicker';

  import {BsTools,BsCalendar} from 'react-icons/bs';
  import firebase from '../firebase';
  import 'firebase/storage';
  import { createHashHistory } from "history";
  import react,{useState,useEffect} from "react";

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
//console.log(postdata)

if(posttime[1] && avoid2==0){
    console.log(posttime[1])
    setState(posttime[1])
    setarrayvar(postdata.media)
    console.log("setstate")
    avoid2=1;
  }
  function handleChange(date) {
    setState(date)
    console.log(date)
          }


const handleSubmit=(event)=> {
    event.preventDefault();
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
        media:arrayvar,
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
          
        const  upldimg=(e)=>{  
            // console.log(this.state.arrayvar)
         //  alert(this.state.startDate)  
           for (let i = 0; i < e.target.files.length; i++) {
           var file=e.target.files[i];
           console.log("fileis",file.name)
          var uploaderb=document.querySelector('#uploaderb');
          uploaderb.style.display="block";
          // crate storage ref
         var storageref=storage.ref(`users/uid/profile/` + file.name);
         
            //upload file
          var task=storageref.put(file);
         
             //update progress bar
         task.on('state_changed',
         function progress(snapshot){
           var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
            uploaderb.value=percentage;
         
         },
           function error(err){
           console.log(err)
         },
         function complete(){
         console.log("adhar back uploaded successfully ")
     
         task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
           console.log('File available at', downloadURL);
      
        uploaderb.style.display="none";
         });
         },
     
         storageref.getDownloadURL().then((url)=>{
           setarrayvar(nap=>[...nap,url])
         })
     
     
         );
          }
          console.log(imgarr)
         
          }

        const sekhararr=(e)=>{

            console.log(e.target.parentElement.parentElement.id)
            var array = [...arrayvar]; // make a separate copy of the array
            var index = array.indexOf(e.target.parentElement.parentElement.id)
            if (index !== -1) {
              array.splice(index, 1);
           //   this.setState({arrayvar: array});
              setarrayvar(array)
            }
          }



    return <div>
 <Form className="postjobb"  onSubmit={handleSubmit}>
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
              <InputGroup.Text> <BsCalendar size="1.3em"/></InputGroup.Text>
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
                onChange={upldimg}
                 />
            </Form.Field>
            <progress value="0" max="100" id="uploaderb">0%</progress>

            <div className="imgdiv">
      
      <div className="gallery">


      
      </div>
      </div>


<div>

<Image.Group size='small'>
 

{
  arrayvar.map((nap)=>
  
  <Image
  fluid
  id={nap}
  label={{ as: 'a', corner: 'right', icon: 'trash',onClick: sekhararr}}
  src={nap}
 
/>

  )}

</Image.Group>

</div>


          <Form.Field control={Button} style={{textAlign:"Center"}} type="submit" centered>Submit</Form.Field>
        </Form>
    </div>
}




















  function ModalExampleModal() {
    const [open, setOpen] = React.useState(true)
  function click(e){
console.log(e.target.dataset.txt);
jobcate=e.target.dataset.txt;
setOpen(false);
  }
    return (
      <Modal size="small"
      style={{marginLeft:"auto",marginRight:"auto",display:"block"}}
      onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content >
 <h1   
  data-txt="1" onClick={click} >category1</h1>
 <h1 data-txt="2" onClick={click}>category2</h1>

 <h1 data-txt="3" onClick={click}>category3</h1>

 <h1 data-txt="4" onClick={click}>category4</h1>
 <h1 data-txt="5" onClick={click}>category5</h1>
        </Modal.Content>

      </Modal>
    )
  }