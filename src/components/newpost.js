import '../App.css';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Dropdown,DropdownButton,Modal,Button,InputGroup,Form,FormControl,ProgressBar} from 'react-bootstrap';
import {BiRupee,BiArrowBack} from 'react-icons/bi';
import {BsTools} from 'react-icons/bs';


export default class Postjob extends Component{
  
    render(){
      return (
          <div>
       <Link to="/" ><BiArrowBack className="back-arrow" size="1.6em"/></Link>
    <div className="postjob">
        
    <Form className="postjobb">
   
      <Form.Group controlId="exampleForm.ControlInput1">
      <InputGroup className="mb-2">
            <InputGroup.Prepend className="nameofser">
              <InputGroup.Text><BsTools /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" className="nameofser" placeholder="Name of service" />
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
    </div>
    
      )
    }
    
    }