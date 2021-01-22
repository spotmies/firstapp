import react,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,NavDropdown,Navbar,Nav,Modal,Form } from 'react-bootstrap';
import '../navbar.css';
import logo from '../logo.svg';



// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//react icons
import {IconContext} from 'react-icons';
import { MdAccountCircle,MdChat,MdSettings} from 'react-icons/md';
import {BsReverseLayoutTextSidebarReverse,BsChatFill,BsFillBriefcaseFill,BsChatDotsFill} from 'react-icons/bs';
import {BiLogOutCircle} from 'react-icons/bi';
import {BiChat} from 'react-icons/bi'



function Navibar(){

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return <Navbar collapseOnSelect expand="lg"  variant="dark" className="navi-bar">
      <IconContext.Provider value={{ size:"1.5em",className:"nav-icons"}}>
    <Navbar.Brand href="#home" className="title">Spotmies</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        {/* <Nav.Link href="#features">Features</Nav.Link>
      
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Chats</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
      <Nav>
      <Nav href="#" className="chaticon"><BsFillBriefcaseFill  className="chaticon2" size="1.2em"/> My Bookings</Nav>
      <Nav href="#" className="chaticon"><MdChat className="chaticon2" size="1.3em"/>  Chat</Nav>
      <MdAccountCircle className="account-icon"/>
      <NavDropdown title="sekhar javvadi" id="collasible-nav-dropdown">
      <NavDropdown.Item href="#action/3"><MdAccountCircle  color="gray" size="1.4em" />   Account</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.1"><BsFillBriefcaseFill color="gray" size="1.1em"/>   My Bookings</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2"><BsChatFill color="gray" size="1.1em"/>   Chats</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3"><MdSettings  color="gray" size="1.1em"/>   Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4"><BiLogOutCircle color="gray" size="1.1em"/> Logout</NavDropdown.Item>
        </NavDropdown>

        <Nav.Link href="#deets" onClick={handleShow} ><MdAccountCircle /> Signup/Login</Nav.Link>
        
      </Nav>
    </Navbar.Collapse>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title><MdAccountCircle color="gray" size="1.5em"/> Login or Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter your Mobile number</Form.Label>
                <Form.Control type="phone" placeholder="phone number" required />
               
            </Form.Group>
            <Button variant="outline-info" type="button">Get Otp</Button>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Enter otp here</Form.Label>
                <Form.Control type="number" placeholder="otp" required/>
            </Form.Group>
            <Button variant="outline-info" type="button">Verify</Button>

            <Form.Group controlId="username">
                <Form.Label>Enter your name here</Form.Label>
                <Form.Control type="text" placeholder="sweetname here" required/>
            </Form.Group>

            <Button variant="outline-info" type="submit">
                Submit
            </Button>
            </Form>


        </Modal.Body>

      </Modal>
      </IconContext.Provider>
  </Navbar>





}
export default Navibar;