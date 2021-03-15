import React, { Component } from 'react'

import {
    Button,Checkbox,Form,Input,Radio,Select,TextArea,Card,Label,Image,Dropdown, ImageGroup,Grid,Modal,Header,Feed,Menu
  } from 'semantic-ui-react'

  import {InputGroup} from 'react-bootstrap';
  import DatePicker from 'react-datepicker';

  import {BsTools,BsCalendar} from 'react-icons/bs';
  import { Link } from "react-router-dom";
  import imageCompression from "browser-image-compression";



  import {MdAlarmAdd,MdLaptopMac,MdTv,MdEventNote,MdDriveEta,MdFace,MdCheckCircle,MdFileUpload} from 'react-icons/md'
  import {BiCodeBlock} from 'react-icons/bi'
  import{FaChalkboardTeacher,FaTools} from 'react-icons/fa'
  import{IoCameraSharp} from 'react-icons/io5'




  import firebase from '../firebase';
  import 'firebase/storage';
  import { createHashHistory } from "history";

  import '../post.css';

  const history = createHashHistory();

const db=firebase.firestore();
const storage = firebase.storage();

//var imgarr=['https://www.w3schools.com/howto/img_snow.jpg','https://www.w3schools.com/howto/img_snow.jpg'];

var imgarr=[];
var jobcate;


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
    <ModalExampleModal />  
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
      sekcate:"",
      arrayvar:[],
      mopen:false,
      image:[],
      imgurl:"",
      valprogress:0
    };
    this.handleChange2 = this.handleChange2.bind(this);
  }
  
  handleChange2(date) {
    console.log(this.state.arrayvar)

    this.setState({
      startDate: date
    })
  }


  
  
    handleSubmit=(event)=> {
      event.preventDefault();
      console.log(this.state.arrayvar)
      let schedule=this.state.startDate
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
          media:this.state.arrayvar,
          request:"nothing",
          posttime:d,
          views:0,
          location:"seethammadhara",
          schedule:schedule,
          orderstate:null,
          fback:null
        }).then(()=>{
          return db.collection('allads').doc(newpost.id).set({
            job:cat,
            problem:name,
            description:desc,
            money:price,
            userid:firebase.auth().currentUser.uid, 
            orderid:newpost.id,
            media:this.state.arrayvar,
            request:"nothing",
            posttime:d,
            views:0,
            location:"seethammadhara",
            schedule:schedule,
            orderstate:null,
            fback:null
          })
        }).then(()=>{
          alert("post added successfully")
          history.go(-1)
          imgarr=[];
        })
      }
      
    }



    handleChangeg = e => {
      const options = {
        maxSizeMB: 0.15,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      let cfile;

      this.setState({image:[]})
      for(var i=0;i<e.target.files.length;i++){
        let k=Number(i)

         imageCompression(e.target.files[k], options).then(x => {
          cfile = x;
          this.setState({ 
            image: this.state.image.concat([cfile])
                })
          document.getElementById('upldbtn').style.display="block"
        }).catch(function (error) {
          console.log(error.message);
        });


      }
      
    };


     handleUpload = () => {
       document.getElementById("uploaderb").style.display="block"
       document.getElementById('upldbtn').style.display="none"


       console.log(this.state.image.length)
       for(var i=0;i<this.state.image.length;i++){
         let k=Number(i)
      const uploadTask = storage.ref(`users/${firebase.auth().currentUser.uid}/adpost/${this.state.image[k].name}`).put(this.state.image[k]);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
         // setProgress(progress);
         this.setState({valprogress:progress})
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref(`users/${firebase.auth().currentUser.uid}/adpost/`)
            .child(this.state.image[k].name)
            .getDownloadURL()
            .then(url => {
              //setUrl(url);
              console.log(url)

                    this.setState({ 
              arrayvar: this.state.arrayvar.concat([url])
                  })

            });
        }
      )
       }
       document.getElementById("uploaderb").style.display="none"       
    }






  //    upldimg=async(e)=>{ 
  //      let logicc=0 
      // const options = {
      //   maxSizeMB: 0.05,
      //   maxWidthOrHeight: 800,
      //   useWebWorker: true
      // };
      // let cfile;

  //   //  for (let i = 0; i < e.target.files.length; i++) {
  //     var file=e.target.files[0];
  //     console.log("fileis",file.name)
      // await imageCompression(file, options).then(x => {
      //   cfile = x;
      // }).catch(function (error) {
      //   console.log(error.message);
      // });
  //    var uploaderb=document.querySelector('#uploaderb');
  //    uploaderb.style.display="block";
  //    // crate storage ref
  //   var storageref=storage.ref(`users/uid/profile/` + file.name);
    
  //      //upload file
  //    var task=storageref.put(cfile);
    
  //       //update progress bar
  //   task.on('state_changed',
  //   function progress(snapshot){
  //     var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
  //      uploaderb.value=percentage;
    
  //   },
  //     function error(err){
  //     console.log(err)
  //   },
  //     function complete(){
  //   console.log("adhar back uploaded successfully ")

  //    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //     console.log('File available at', downloadURL);
 
  //  uploaderb.style.display="none";
  //  logicc=1;
  //   }).catch((err)=>{console.log(err)});
  //   },
  //    task.snapshot.ref.getDownloadURL().then((url)=>{
  //     console.log("download linked set")
  //     this.setState({ 
  //       arrayvar: this.state.arrayvar.concat([url])
  //     })
  //   }).catch((err)=>{console.log(err)})
  


  //   )

  //   // }
  //    console.log(imgarr)
    
  //    }

newfunk=(e)=>{
  console.log(e.target.id)
  this.setState({jobcate:e.target.id})
  this.setState({mopen:true})
}

sekhararr=(e)=>{
  // this.setState({ 
  //   arrayvar: this.state.arrayvar.concat(['https://www.w3schools.com/howto/img_snow.jpg'])
  // })
  console.log(e.target.parentElement.parentElement.id)
  var array = [...this.state.arrayvar]; // make a separate copy of the array
  var index = array.indexOf(e.target.parentElement.parentElement.id)
  if (index !== -1) {
    array.splice(index, 1);
    this.setState({arrayvar: array});
  }
}

  
    render() {
      const { value } = this.state
      return (
        <Form className="postjobb" onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
            required
              control={Input}
              label='Name of Service'
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

<div style={{display:"inline-block"}}>
        <Form.Field>
            <Input
            icon='photo'
            iconPosition='Right'
              type="file"
              placeholder='Enter tags'
             // onChange={this.upldimg}
              accept=".gif,.jpg,.jpeg,.png"
              onChange={this.handleChangeg}
              multiple
                 />
                
            </Form.Field>
            <Form.Field control={Button} color="green"  id="upldbtn" type="button" onClick={this.handleUpload} style={{marginBottom:"10px"}}>
            <MdFileUpload />  upload images
            </Form.Field>
            </div>
            <progress value={this.state.valprogress} max="100" id="uploaderb">progress</progress>

            <div className="imgdiv">
      
      <div className="gallery">


      
      </div>
      </div>


<div>

<Image.Group size='small'>
 

{
  this.state.arrayvar.map((nap,key)=>
  
  <Image
  fluid
  key={key}
  id={nap}
  label={{ as: 'a', corner: 'right', icon: 'trash',onClick: this.sekhararr}}
  src={nap}
 
/>

  )}

</Image.Group>

</div>


          <Form.Field control={Button}  type="submit" centered color="primary"><MdCheckCircle size="1.3rem" style={{textAlign:"left"}}  />Submit</Form.Field>

        </Form>
      )
    }
  }











  function ModalExampleModal() {


    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
      //  history.go('/login')
        console.log("user login")
        document.getElementById('redirectsignup').click()
      }
  
    })


    var imgsrc="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorgraphit.com%2Ffree-svg-illustrations-for-your-next-website-or-blog%2Famp&psig=AOvVaw28FMPvsnbckOWg5KwrbFDM&ust=1614586813687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDUruGSjO8CFQAAAAAdAAAAABAJ"
    const [open, setOpen] = React.useState(true)

  function click(e){
 console.log(e.target.dataset.txt);
 jobcate=e.target.dataset.txt;
 setOpen(false);
  }

    return (
    <>
    <div >
      <Modal size="small"
     // style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"70%"}}
     
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
          <Menu.Item link data-txt="0" onClick={click}><FaTools size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Ac/Refrigirator Service</Menu.Item>
          <Menu.Item link data-txt="1" onClick={click}><MdLaptopMac size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Computer/Laptop Service</Menu.Item>
          <Menu.Item link data-txt="2" onClick={click}><MdTv size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Tv Repair</Menu.Item>
          <Menu.Item link data-txt="9" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Electrician</Menu.Item>
          <Menu.Item link data-txt="12" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Interior Design</Menu.Item>
          <Menu.Item link data-txt="13" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Design</Menu.Item>
          <Menu.Item link data-txt="3" onClick={click}><BiCodeBlock size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Development</Menu.Item>
          <Menu.Item link data-txt="8" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Events</Menu.Item>
          <Menu.Item link data-txt="5" onClick={click}><MdFace size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Beauty</Menu.Item>
          <Menu.Item link data-txt="4" onClick={click}><FaChalkboardTeacher size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Tutor</Menu.Item>
          <Menu.Item link data-txt="6" onClick={click}><IoCameraSharp size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Photographer</Menu.Item>
          <Menu.Item link data-txt="7" onClick={click}><MdDriveEta size="1.5rem"/>&nbsp;&nbsp;&nbsp;&nbsp; Driver</Menu.Item>
          <Menu.Item link data-txt="10" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Carpenter</Menu.Item>
          <Menu.Item link data-txt="11" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Plumber</Menu.Item>
          <Menu.Item link data-txt="14" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; CC Tv Installation</Menu.Item>
          <Menu.Item link data-txt="15" onClick={click}><MdEventNote size="1.5rem" />&nbsp;&nbsp;&nbsp;&nbsp; Catering</Menu.Item>
        </Menu>
        <Link to="/signup" style={{display:"none"}} ><p  id="redirectsignup">signup</p></Link>

    </Card.Content>
  </Card>
      </Modal>
      </div>
      </>
    )
  }




  
