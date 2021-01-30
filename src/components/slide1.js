import '../App.css';
import repair from '../images/repair.svg';
import { Link } from "react-router-dom";
import React,{useState} from 'react';
import {Dropdown,DropdownButton,Modal,Button,InputGroup,Form,FormControl,ProgressBar} from 'react-bootstrap';
import {BiRupee} from 'react-icons/bi';
import {BsTools} from 'react-icons/bs';
import firebase from '../firebase'




function Slide(){
  let location="seethamadahar";
  const db=firebase.firestore();
  const [modalShow, setModalShow] = React.useState(false);
  db.collection('users').get().then(snap=>{
    snap.forEach(nap => {
      console.log(nap.id)
    });
  })
    return <div className="slide1">
        <img  src={repair} alt="logo" width="900" height="500"/>
     <div className="areabg">   
    <DropdownButton
    className="getlocation"
      variant="outline-primary"
      title="Select your location                  "
      id="input-group-dropdown-2"
    >
      
      <Dropdown.Item onClick={() => setModalShow(true)}><Link to="/newpost">{location}</Link></Dropdown.Item>
      
    </DropdownButton>
    {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
      <div>
        <h1>this is heading</h1>
      </div>
    </div>
    </div>
    
}

export default Slide;

function MyVerticallyCenteredModal(props) {
  var now = 0;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {/* <Postjob range={now} close={props.onHide}/> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}






class Postjob extends React.Component{
  
  render(){
    return (
  
  <div className="postjob">
  <Form>
    <Form.Group controlId="exampleForm.ControlInput1">
    <InputGroup className="mb-2">
          <InputGroup.Prepend>
            <InputGroup.Text><BsTools /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="inlineFormInputGroup" placeholder="Name of service" />
        </InputGroup>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlSelect1">
      <Form.Label><b>CATEGORY</b></Form.Label>
      <Form.Control as="select">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Form.Control>
    </Form.Group>
   
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label><b>DESCRIPTION</b></Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>
    <Form.Label><b>PRICE</b></Form.Label>
    <InputGroup className="mb-2">
          <InputGroup.Prepend>
            <InputGroup.Text><BiRupee /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="inlineFormInputGroup" type="number" placeholder="Enter price here" />
        </InputGroup>
  
        <Form.Label><b>UPLOAD ANY IMAGES</b></Form.Label>
        <Form.File 
      id="custom-file"
      label="Custom file input"
      custom
    />
    <br />
    <ProgressBar now={this.props.range} label={`${this.props.range}%`} />
  </Form>
  <br />
  <Button onClick={this.props.close} variant="outline-info" type="submit">Get Service</Button>
  </div>
  
    )
  }
  
  }