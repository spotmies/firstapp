import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import GoogleMapReact from "google-map-react";
import { apiPostPut } from "../../../mservices/contactUs";
import { toast } from "react-toastify";
import { MdFeedback } from "react-icons/md";
import { Form } from "react-bootstrap";
import { Button } from "semantic-ui-react";

//feedback form
import { FeedbackForm } from "../../reusable/Modal";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        email: null,
        name: null,
        phone: null,
        sub: null,
        message: null,
        date: Math.round(+new Date() / 1000),
      },
      open: false,
      sbtn: false,
      wWidth: window.innerWidth,
    };
    this.handlec = this.handlec.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleResize = (e) => {
    this.setState({ wWidth: window.innerWidth });
  };
  closeModal = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  }

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  handlec(e) {
    let nameId = e.target.name;
    let value = e.target.value;
    //console.log(value,nameId);
    let temp = this.state.details;
    temp[nameId] = value;
    temp["date"] = new Date().valueOf();
    this.setState({
      details: temp,
    });
  }

  async submitForm(e) {
    this.setState({
      sbtn: true,
    });
    e.preventDefault();
    let temp = {};
    temp["body"] = JSON.stringify(this.state.details);
    let result = await apiPostPut(temp, "contactUs");
    if (result.status == 200) {
      this.clearfield();
      toast.info("Thank you we will contact you soon...");
    } else {
      toast.info("please try again");
      this.setState({
        sbtn: false,
      });
    }
  }

  clearfield() {
    let tempd = this.state.details;
    tempd = {
      email: "",
      name: "",
      phone: "",
      sub: "",
      message: "",
      date: new Date(),
    };
    this.setState({
      details: tempd,
      sbtn: false,
    });
  }

  render() {
    let det = this.state.details;

    return (
      //   Important! Always set the container height explicitly
      <div
        style={{
          height: "100vh",
          width: "95%",
          marginLeft: "2%",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <GoogleMapReact
          // bootstrapURLKeys={{ key: "AIzaSyDUAqHmXwTZU1caOWJ-LC-dBl3R7uzOkPo" }}
          bootstrapURLKeys={{ key: "AIzaSyAJuo4r4xk6TkcDOCMk16G_AIIBBbOPV88" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={17.686815} lng={83.218483} text="SPOTMIES" />
        </GoogleMapReact>
        <div
          style={{
            marginTop: "30px",
            width: this.state.wWidth > 625 ? "50%" : "85%",
          }}
          className="contactAddress"
        >
          <h2>Our Phones are waiting for your call!</h2>
          <hr></hr>
          <h3>Email:</h3>
          <p>spotmies@gmail.com</p>
          <p>modernsilpi@gmail.com</p>
          <h3>Mobile no:</h3>
          <p>9502831877</p>
          <p>8019933883</p>
          <h3>Address:</h3>
          <p>
            D.No: 58-38-10,<br></br> KRM Colony,<br></br> Visakhapatnam,
            <br></br> Andhra Pradesh,<br></br> 530027.
          </p>
        </div>
        <hr></hr>
        <div style={{ paddingBottom: "5px" }}>
          <Form
            className="contactForm"
            style={{ width: this.state.wWidth > 625 ? "50%" : "85%" }}
            onSubmit={this.submitForm}
          >
            <h2>Wanna say something?</h2>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={det.email}
                name="email"
                onChange={this.handlec}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="pallavi mella"
                name="name"
                value={det.name}
                onChange={this.handlec}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Mobile no:</Form.Label>
              <Form.Control
                type="number"
                placeholder="9999999999"
                name="phone"
                value={det.phone}
                onChange={this.handlec}
                required
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="ex:- want to approach spotmies"
                rows={1}
                name="sub"
                value={det.sub}
                onChange={this.handlec}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="put what you want to message"
                name="message"
                value={det.message}
                onChange={this.handlec}
                required
              />
            </Form.Group>
            <br></br>
            {this.state.sbtn == false ? (
              <Button primary type="submit">
                Submit
              </Button>
            ) : (
              <Button loading primary>
                Submit
              </Button>
            )}
          </Form>
        </div>
        <div
          className="feedBack "
          onClick={() => this.setState({ open: true })}
        >
          <MdFeedback color="black" size="3rem" className="feedBackIcon" />
        </div>
        <FeedbackForm open={this.state.open} close={this.closeModal} />
      </div>
    );
  }
}

export default SimpleMap;
