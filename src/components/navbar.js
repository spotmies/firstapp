import react,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,NavDropdown,Navbar,Nav,Modal,Form,Card } from 'react-bootstrap';
import '../navbar.css';
import logo from '../logo.svg';



// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//react icons
import {IconContext} from 'react-icons';
import { MdAccountCircle,MdChat,MdSettings} from 'react-icons/md';
import {BsReverseLayoutTextSidebarReverse,BsChatFill,BsFillBriefcaseFill,BsChatDotsFill,BsEyeFill} from 'react-icons/bs';
import {BiLogOutCircle,BiTimeFive} from 'react-icons/bi';
import {RiPinDistanceFill} from 'react-icons/ri'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'



function Navibar(){

    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] =useState(false);
    const [modalShow2, setModalShow2] =useState(false);
    const [modalShow3, setModalShow3] =useState(false);
    const [modalShow4, setModalShow4] =useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return <header><Navbar collapseOnSelect expand="lg"  variant="dark" className="navi-bar">
      <IconContext.Provider value={{ size:"1.5em",className:"nav-icons"}}>
        <Link to="/">
    <Navbar.Brand className="title">Spotmies</Navbar.Brand></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">

      </Nav>
      <Nav>
      
      <Link to="/mybookings"><Nav  className="chaticon" onClick={() => setModalShow(true)}><BsFillBriefcaseFill  className="chaticon2" size="1.2em"/> My Bookings</Nav></Link>
      <Link to="/chat"><Nav  className="chaticon" onClick={() => setModalShow2(true)}><MdChat className="chaticon2" size="1.3em"/>  Chat</Nav></Link>
      <MdAccountCircle className="account-icon"/>
      <NavDropdown title="sekhar javvadi" id="collasible-nav-dropdown">
      <Link to="/account"><NavDropdown.Item href="#action/3" onClick={() => setModalShow3(true)}><MdAccountCircle  color="gray" size="1.4em" />   Account</NavDropdown.Item></Link>
      <Link to="/mybookings"><NavDropdown.Item href="#action/3.1" onClick={() => setModalShow(true)}><BsFillBriefcaseFill color="gray" size="1.1em"/>   My Bookings</NavDropdown.Item></Link>
          <Link to="/chat"><NavDropdown.Item href="#action/3.2" onClick={() => setModalShow2(true)}><BsChatFill color="gray" size="1.1em"/>Chats</NavDropdown.Item></Link>
          <Link to="/settings"><NavDropdown.Item href="#action/3.3" onClick={() => setModalShow4(true)}><MdSettings  color="gray" size="1.1em"/>   Settings</NavDropdown.Item></Link>
          <NavDropdown.Divider />
          <Link to="/logout"><NavDropdown.Item href="#action/3.4"><BiLogOutCircle color="gray" size="1.1em"/> Logout</NavDropdown.Item></Link>
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
      {/* <Mybookings
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
       <Mychats
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      /> */}
       <Myaccount
        show={modalShow3}
        onHide={() => setModalShow3(false)}
      />
       {/* <Mysettings
        show={modalShow4}
        onHide={() => setModalShow4(false)}
      /> */}

      </IconContext.Provider>
  </Navbar>
  <div className="spacediv">
    
  </div>
  </header>




}
export default Navibar;




function Mybookings(props) {
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
        <h4>Mybookings</h4>
        <Card
    bg="primary"
    key="2"
    text="black"
    style={{ width: '48rem',borderRadius: '1rem' }}
    className="mb-2"
  >
    <Card.Header>Header</Card.Header>
    <Card.Body className="card-body">
      <Card.Title>
      <img className="post-img" src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="" />
     <h3 className="post-title">interial design </h3> 
     <div className="details-post">
     <p><BsEyeFill /> Views: 105</p>
     <p><RiPinDistanceFill /> Distance: 105</p>
     <p><HiOutlineCurrencyRupee /> Money: 500/-</p>
     <p><BiTimeFive /> Time: 1hr</p>
     </div>
      </Card.Title>
    </Card.Body>
  </Card>
      </Modal.Body>
    </Modal>
  );
}



function Mychats(props) {
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
        <h4>mychats</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Myaccount(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        my account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>mychats</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function Mysettings(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mysettings
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>mychats</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}