import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import react,{useState,useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
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
        <div style={{marginTop: "30px"}}>
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
        <Form style={{width: '50%', justifySelf: 'center', margin: '30px 0 30px 0', paddingBottom: '30px' }}>
            <h2>Wanna say something?</h2>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Name</Form.Label>
    <Form.Control type="email" placeholder="Mia Khalifa" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Mobile no:</Form.Label>
    <Form.Control type="email" placeholder="9999999999" />
  </Form.Group>
  
  {/* <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Example select</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Example multiple select</Form.Label>
    <Form.Control as="select" multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group> */}
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Subject</Form.Label>
    <Form.Control as="textarea" rows={1} />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Message</Form.Label>
    <Form.Control as="textarea" rows={3} />
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
// const Contact = () =>{
// return <div>
//     <Contact1 />
// </div>
// }

// const Contact1 =() => {
//   return <div>
//       {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d584.6097260216209!2d83.31646073466659!3d17.74181849641085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39434bbca7c8ed%3A0xbbeddcd73bf0b9bd!2sKRM%20Colony%2C%20Maddilapalem%2C%20Visakhapatnam%2C%20Andhra%20Pradesh%20530013!5e0!3m2!1sen!2sin!4v1612941685350!5m2!1sen!2sin" style={{width="600px", height="450px"}}></iframe> */}
    
//   </div>
// }

// export default Contact;