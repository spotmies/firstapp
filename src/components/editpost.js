import React from 'react'
import react,{useState,useEffect} from "react";
import firebase from '../firebase';
import '../App.css';
import {Button,InputGroup,Form,FormControl} from 'react-bootstrap';
import {BiRupee} from 'react-icons/bi';
import {BsTools,BsCalendar} from 'react-icons/bs';

import DatePicker from 'react-datepicker';
 
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const db=firebase.firestore();
const storage = firebase.storage();
var imgarr=[];

function useTimes(){
    const[postdata,setdata]=useState([])
    const[posttime,setposttime]=useState([])
  useEffect(()=>{
//
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
let arr=[];
 avoid=0;
 avoid2=0;
       var personId;
        // fetch(`http://localhost:3000/mybookings/id/`, {})
        // .then((res) =>{ res.json()})
        // .then((response) => {
        
         // console.log(`http://localhost:3000/mybookings/id/${personId}`);
         personId=window.location.pathname;
         personId=personId.replace('/mybookings/id/edit/','');
         console.log(personId)
         db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(personId).get().then(snap=>{
             console.log(snap.data().posttime.toDate())
             setdata(snap.data())
            arr.push(String(snap.data().posttime.toDate()));
            arr.push((snap.data().schedule.toDate()));
            setposttime(arr)
            document.querySelector('#nameofserv').value=snap.data().problem;
            document.querySelector('.desc').value=snap.data().description;
            document.querySelector('.cate').value=snap.data().job;
            document.querySelector('.price').value=snap.data().price;
         }).then(()=>{


         })
    
    }})
//


  },[])
  return {postdata,posttime}
  }


  let avoid=0;
  let avoid2=0;
const Editpost=()=>{
    const {postdata,posttime}=useTimes()
    const [startDate, setState] = useState('')
    console.log(postdata)
  
if(posttime[1] && avoid2==0){
  console.log(posttime[1])
  setState(posttime[1])
  avoid2=1;
}


    function prevmed(){
    if(postdata.media && avoid==0){
imgarr=postdata.media;
const gallery=document.querySelector('.gallery')
imgarr.map((nap)=>{

  


     var div=document.createElement('div')
     var html = document.createElement("IMG");
     var btn = document.createElement('p');
      html.setAttribute('src',nap);
      html.setAttribute('class',"items");
      div.setAttribute('id',`i${nap}`)
      btn.setAttribute('class','close')
      btn.setAttribute('id',nap)
      btn.innerHTML = "x";
      btn.onclick = function(){
        let imgid=btn.getAttribute('id')
      //  alert(`del id is ${imgid}`);
      console.log(imgarr)
        imgarr = imgarr.filter(e => e !== imgid);
        console.log(imgarr)
        document.getElementById(`i${imgid}`).remove()
      };
    
    div.append(html)
    div.appendChild(btn) 
    gallery.append(div)
}
)
avoid=1;
 }
}
prevmed();

   function handleChange(date) {
setState(date)
console.log(date)
      } 

    const  handleSubmit=(event)=> {
        event.preventDefault();
        let schedule=startDate
        let name=document.querySelector('#nameofserv').value
        let desc=document.querySelector('.desc').value
        let cat=document.querySelector('.cate').value
        let price=document.querySelector('.price').value
        if(cat=="true")alert("please select category")
        else{
          cat=parseInt(cat);
          price=parseInt(price);
          console.log(name,desc,cat,price,imgarr)
         const newpost= db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc(postdata.orderid)
         var d=new Date();
         console.log(d)
         newpost.update({
            job:cat,
            problem:name,
            description:desc,
            price:price,
            userid:firebase.auth().currentUser.uid, 
            orderid:postdata.orderid,
            media:imgarr,
            location:"seethammadhara",
            schedule:schedule
          }).then(()=>{
            return db.collection('allads').doc(postdata.orderid).update({
              job:cat,
              problem:name,
              description:desc,
              price:price,
              userid:firebase.auth().currentUser.uid, 
              orderid:postdata.orderid,
              media:imgarr,
              location:"seethammadhara",
              schedule:schedule
            })
          }).then(()=>{
            alert("post edited successfully")
            // history.go(-1)
          })
        }
        
      }


     const upldimg=(e)=>{  
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
        imgarr.push(downloadURL);
      
        const gallery=document.querySelector('.gallery')
       // const html='';
       var div=document.createElement('div')
         var html = document.createElement("IMG");
         var btn = document.createElement('p');
          html.setAttribute('src',downloadURL);
          html.setAttribute('class',"items");
          div.setAttribute('id',`i${downloadURL}`)
          btn.setAttribute('class','close')
          btn.setAttribute('id',downloadURL)
          btn.innerHTML = "x";
          btn.onclick = function(){
            let imgid=btn.getAttribute('id')
          //  alert(`del id is ${imgid}`);
          console.log(imgarr)
            imgarr = imgarr.filter(e => e !== imgid);
            console.log(imgarr)
            document.getElementById(`i${imgid}`).remove()
          };
        
        div.append(html)
        div.appendChild(btn) 
        gallery.append(div)
        uploaderb.style.display="none";
        });
        }
        );
         }//
         console.log(imgarr)
        
         }
      

    return  <div style={{paddingTop:"80px"}}>
  
  <div className="postjob">
        
    <Form className="postjobb"  onSubmit={handleSubmit}>
   
      <Form.Group controlId="exampleForm.ControlInput1" >
      <InputGroup className="mb-2">
            <InputGroup.Prepend className="nameofser">
              <InputGroup.Text><BsTools /></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control id="nameofserv" className="nameofser" placeholder="Name of service" required />
          </InputGroup>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label required><b>CATEGORY</b></Form.Label>
        <Form.Control required as="select" className="cate"required>
        <option disabled selected value> -- select an option -- </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label><b>DESCRIPTION</b></Form.Label>
        <Form.Control as="textarea" rows={3} className="desc" placeholder="type something here"/>
      </Form.Group>
      <Form.Label><b>PRICE</b></Form.Label>
      <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text><BiRupee /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" type="number" placeholder="Enter price here" className="price"  required/>
          </InputGroup>
    
        
      <InputGroup className="mb-2">
            <InputGroup.Prepend className="nameofser">
              <InputGroup.Text> <BsCalendar size="1.3em"/></InputGroup.Text>
            </InputGroup.Prepend>
            <DatePicker className="datepicker"
              selected={ startDate }
              placeholderText="when you want service"
              onChange={ handleChange }
              minDate={new Date()}
              name="startDate"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="dd/MM/yyyy"
           required/>
          </InputGroup>


          <Form.Label><b>UPLOAD ANY IMAGES</b></Form.Label>
          <Form.File 
        id="custom-file"
        label="Custom file input"
        custom
        onChange={upldimg}
      />
      
      <progress value="0" max="100" id="uploaderb">0%</progress>
      <Form.Group>
        <div className="imgdiv">
      <div className="gallery">

      </div>
      </div>
      </Form.Group>
     
      <Button variant="outline-info" type="submit" >Save changes</Button>
     
    </Form>
  
   
    </div>

</div>
}
export default Editpost
