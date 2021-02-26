import React, { Component } from 'react'

import {
    Button,Checkbox,Form,Input,Radio,Select,TextArea,Card,Label,Image,Dropdown
  } from 'semantic-ui-react'

  import {InputGroup} from 'react-bootstrap';
  import DatePicker from 'react-datepicker';

  import {BsTools,BsCalendar} from 'react-icons/bs';
  import firebase from '../firebase';
  import 'firebase/storage';
  import { createHashHistory } from "history";

  import '../post.css';

  const history = createHashHistory();

const db=firebase.firestore();
const storage = firebase.storage();

var imgarr=[];

var jobcate;

  const options = [
    { key: '1', text: '1', value: '1' },
    { key: '2', text: '2', value: '2' },
    { key: '3', text: '3', value: '3' },
    { key: '4', text: '4', value: '4' },
    { key: '5', text: '5', value: '5' },
    { key: '6', text: '6', value: '6' },
    { key: '7', text: '7', value: '7' },
    { key: '8', text: '8', value: '8' },
    { key: '9', text: '9', value: '9' },
  ]


export default function newpost2() {
    return (
        <div>
            <Postnew />
        </div>
    )
}

function Postnew(){
return <div style={{paddingTop:"20px"}}>
    <Card centered id="formcard">
    <Card.Content>
        <Card.Header style={{textAlign:"center"}}>New Post</Card.Header>
    </Card.Content>
    <Card.Content>
        <Postform />
    </Card.Content>
    
    </Card>
</div>
}
 var src='https://www.w3schools.com/howto/img_snow.jpg'

class Postform extends Component {
    state = {}
  
    handleChange = (e, { value }) => this.setState({ value })

//from old

  //date picker code here

  constructor (props) {
    super(props)
    this.state = {
      startDate: "",
      sekcate:""
    };
    this.handleChange2 = this.handleChange2.bind(this);
  }
  
  handleChange2(date) {
    this.setState({
      startDate: date
    })
  }
  
  
    handleSubmit=(event)=> {
      event.preventDefault();
      console.log(this.state.sekcate)
      let schedule=this.state.startDate
      let name=document.querySelector('#nameofserv').value
      let desc=document.querySelector('#sdesc').value
     // let cat=document.querySelector('#scate').value
     let cat=jobcate;
      let price=document.querySelector('#sprice').value
      if(cat=="true")alert("please select category")
      else{
        cat=parseInt(cat);
        price=parseInt(price);
        console.log(name,desc,cat,price,imgarr,schedule)
       const newpost= db.collection('users').doc(firebase.auth().currentUser.uid).collection('adpost').doc()
       var d=new Date();
       console.log(d)
       newpost.set({
          job:cat,
          problem:name,
          description:desc,
          money:price,
          userid:firebase.auth().currentUser.uid, 
          orderid:newpost.id,
          media:imgarr,
          request:"nothing",
          posttime:d,
          views:0,
          location:"seethammadhara",
          schedule:schedule,
          orderstate:null
        }).then(()=>{
          return db.collection('allads').doc(newpost.id).set({
            job:cat,
            problem:name,
            description:desc,
            money:price,
            userid:firebase.auth().currentUser.uid, 
            orderid:newpost.id,
            media:imgarr,
            request:"nothing",
            posttime:d,
            views:0,
            location:"seethammadhara",
            schedule:schedule,
            orderstate:null
          })
        }).then(()=>{
          alert("post added successfully")
          history.go(-1)
          imgarr=[];
        })
      }
      
    }
    upldimg=(e)=>{  
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
    //  var html = document.createElement("IMG");
    //   html.setAttribute('src',downloadURL);
    //   html.setAttribute('class',"items")
  
    // gallery.append(html)
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
     }
     console.log(imgarr)
    
     }

newfunk=(e)=>{
  console.log(e.target.id)
  jobcate=e.target.id;
}



  
    render() {
      const { value } = this.state
      return (
        <Form className="postjobb" onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First name'
              placeholder='enter name of service'
              id="nameofserv" className="nameofser"
            />
            <Form.Field>
  <Dropdown text='File'>
    <Dropdown.Menu onClick={this.newfunk}>
    <Dropdown.Item id="1">new </Dropdown.Item>
    <Dropdown.Item id="2"> open </Dropdown.Item>


    </Dropdown.Menu>
  </Dropdown>
            
            </Form.Field>


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
            <Label basic>$</Label>
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
              selected={ this.state.startDate }
              placeholderText="when you want service"
              onChange={ this.handleChange2 }
              minDate={new Date()}
              name="startDate"
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
              onChange={this.upldimg}
                 />
            </Form.Field>
            <progress value="0" max="100" id="uploaderb">0%</progress>

            {/* <div className="imgdiv">
      
      <div className="gallery">


      
      </div>
      </div> */}




          {/* <Form.Field
            control={Checkbox}
            label='I agree to the Terms and Conditions'
          /> */}
          <Form.Field control={Button} style={{textAlign:"Center"}} type="submit" centered>Submit</Form.Field>
        </Form>
      )
    }
  }