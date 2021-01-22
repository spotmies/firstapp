import '../App.css';
import React,{useState,useEffect} from 'react';
import { Button,NavDropdown,Navbar,Nav,Modal,Form,Row,Col,Container,InputGroup,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {IconContext} from 'react-icons';
import {MdComputer} from 'react-icons/md';
import {BiRupee} from 'react-icons/bi';
import {BsTools} from 'react-icons/bs'




function Func(){
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  
    // return <div>
    //      <IconContext.Provider value={{ size:"40px",className:"cat-icons"}}> 
    //     <div className="rect">
    //     <MdComputer />
    //     <h5 className="cat-name">Computer service</h5>
    //     </div>
    //     </IconContext.Provider>
    //     <Icon name="sekhar" icon="MdComputer"/>
    // </div>
  //  return 
    // <div class="container">
    // <div class="row">
    // <div class="col-sm-4">
    //     <div class="single category">
    //         <h3 class="side-title">Category</h3>
    //         <ul class="list-unstyled">
    //             <li><a href="" title=""><MdComputer size="30px" /> Business <span class="pull-right">13</span></a></li>
    //             <li><a href="" title=""><MdComputer />Technology <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">Web <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">Ecommerce <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">Wordpress <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">Android <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">IOS <span class="pull-right">13</span></a></li>
    //             <li><a href="" title="">Windows <span class="pull-right">13</span></a></li>
    //         </ul>
    //    </div>
    // </div> 
    // </div>
    // </div>
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  
    
}
export default Func;

// class Icon extends React.Component{
// render(){
//     const tag=MdComputer;
// return <div>
//     <IconContext.Provider value={{ size:"40px",className:"cat-icons"}}> 
//     <div className="rect">
//     <tag />
//     <h5 className="cat-name">{this.props.name}{this.props.icon}</h5>
//     </div>
//     </IconContext.Provider>
//     </div>
// }
// }



function MyVerticallyCenteredModal(props) {
  const [disjob, setDisjob] = useState(0)
  function cateclick(e){
    setDisjob(disjob=>true)
    alert(disjob)
  }
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
      <div class="container" className="ncontainer">
<div class="row">
<div class="col-sm-4">
	<div class="single category">
		<h3 class="side-title">Category</h3>
		<ul class="list-unstyled">
			<li onClick={cateclick}><a href="#" title="se">Business <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Technology <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Web <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Ecommerce <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Wordpress <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Android <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">IOS <span class="pull-right">13</span></a></li>
			<li><a href="#" title="">Windows <span class="pull-right">13</span></a></li>
		</ul>
   </div>
</div> 
</div>
</div>
{disjob && (
  <Postjob />
)}


      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
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
        <FormControl id="inlineFormInputGroup" placeholder="Username" />
      </InputGroup>

      <Form.Label><b>UPLOAD ANY IMAGES</b></Form.Label>
      <Form.File 
    id="custom-file"
    label="Custom file input"
    custom
  />
  
  <Form.Group controlId="formBasicRange">
  <Form.Label><b>RANGE OF SERVICE</b></Form.Label>
    <Form.Control type="range" min="30%"/>
  </Form.Group>
</Form>
<Button variant="outline-info" type="submit">Request service</Button>
</div>

  )
}

}
