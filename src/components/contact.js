import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { contactus } from "../mservices/contactUs";
import { toast } from 'react-toastify';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      details:{
        email:null,
        name:null,
        phone:null,
        sub:null,
        message:null,
        date:new  Date()
      }
    };
    this.handlec = this.handlec.bind(this);
    this.submitForm=this.submitForm.bind(this);

  }
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handlec(e){
let nameId=e.target.name;
let value=e.target.value
//console.log(value,nameId);
let temp=this.state.details;
temp[nameId]=value
temp["date"]=new Date()
this.setState({
  details:temp
});
  }

  async submitForm(e){
    e.preventDefault();
    //console.log(this.state.details);
    let temp=JSON.stringify(this.state.details);
    //console.log(temp)
    //console.log(JSON.parse(temp));
let result = await contactus(temp);
if(result==200){
  this.clearfield();
  toast.success("Thank you we will contact you soon...");
}
else toast.info("please try again") 

   }
   

  clearfield(){
    let tempd=this.state.details
    tempd={
      email:"",
      name:"",
      phone:'',
      sub:'',
      message:'',
      date:new  Date()
    };
    this.setState({
      details:tempd
    })

  }

  
  render() {
  let det=this.state.details
    return (
    //   Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '95%', marginLeft: '2%', alignItems:"center" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDUAqHmXwTZU1caOWJ-LC-dBl3R7uzOkPo" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="SpotMiess"
          />
        </GoogleMapReact>
        <div style={{marginTop: "30px"}} className="contactAddress">
            <h2>Our Phones are waiting for your call!</h2>
            <hr></hr>
            <h3>Email:</h3>
            <p>modernsilpi@gmail.com</p>
            <h3>Mobile no:</h3>
            <p>9502831877</p>
            <h3>Address:</h3>
            <p>D.No: 58-38-10,<br></br> KRM Colony,<br></br> Visakhapatnam,<br></br> Andhra Pradesh,<br></br> 530027.</p>
        </div>
        <hr></hr>
        <Form className="contactForm" onSubmit={this.submitForm}>
            <h2>Wanna say something?</h2>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" value={det.email} name="email" onChange={this.handlec} required/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="pallavi mella" name="name"value={det.name} onChange={this.handlec} required/>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Mobile no:</Form.Label>
    <Form.Control type="number" placeholder="9999999999" name="phone" value={det.phone} onChange={this.handlec} required/>
  </Form.Group>
  

  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Subject</Form.Label>
    <Form.Control as="textarea" placeholder="ex:- want to approach spotmies" rows={1} name="sub" value={det.sub} onChange={this.handlec} />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Message</Form.Label>
    <Form.Control as="textarea" rows={3} placeholder="put what you want to message" name="message" value={det.message} onChange={this.handlec} required/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
      </div>
      
    );
  }
}
 
export default SimpleMap;
