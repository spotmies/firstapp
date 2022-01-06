import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { apiPostPut } from "../../../api_services/api_calls/api_calls";
import { toast } from "react-toastify";
import { MdFeedback } from "react-icons/md";
import { Form } from "react-bootstrap";
import { Button } from "semantic-ui-react";
//feedback form
import FeedbackForm from "../../reusable/feedback_form";
import constants from "../../../helpers/constants";
import ShowMap from "../leaflet/showMap";


class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        email: null,
        name: null,
        mobile: null,
        subject: null,
        body: null,
        createdAt: new Date().valueOf(),
        suggestionFor: "contactUs",
        suggestionFrom: "userWeb",
      },
      open: false,
      sbtn: false,
      wWidth: window.innerWidth,
      companyPostion: {
        lat: 17.744231,
        lng: 83.312809,
      },
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
    let result = await apiPostPut(
      this.state.details,
      constants.api.new_suggestion,
      "POST"
    );
    if (result != null) {
      this.clearfield();
      toast.success("Thank you we will contact you soon...");
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
      mobile: "",
      subject: "",
      body: "",
      createdAt: new Date().valueOf(),
      suggestionFor: "contactUs",
      suggestionFrom: "userWeb",
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

        <ShowMap position={this.state.companyPostion} mapHeight={50}/>
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
          <p>info@spotmies.com</p>
          <p>spotmies@gmail.com</p>
          <h3>Mobile no:</h3>
          <p>8019933883</p>
          <p>9502831877</p>
          <h3>Address:</h3>
          <p>
            D.No: 50-95-5/1,<br></br> A.P.S.E.B colony, saibaba temple road,
            seethammadara<br></br> Visakhapatnam,
            <br></br> Andhra Pradesh,<br></br> 530013.
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
                placeholder="Your name"
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
                placeholder="9876543620"
                name="mobile"
                value={det.mobile}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/;

                  if (e.target.value === "" || re.test(e.target.value)) {
                    return this.handlec(e);
                  }
                }}
                // maxLength={10}
                // minLength={10}
                required
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="ex:- want to approach spotmies"
                rows={1}
                name="subject"
                value={det.subject}
                onChange={this.handlec}
                required
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="put what you want to message"
                name="body"
                value={det.body}
                onChange={this.handlec}
                required
              />
            </Form.Group>
            <br></br>
            {this.state.sbtn === false ? (
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
