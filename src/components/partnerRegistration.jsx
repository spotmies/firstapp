import React, { useState, useEffect } from "react";
import { Modal, Select } from "semantic-ui-react";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "../assets/css/partner.css";
import { FaGooglePlay } from "react-icons/fa";

import { toast } from "react-toastify";
import textpart from "./partnerText";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { partnerRequests } from "../mservices/contactUs";
import { MdFeedback } from "react-icons/md";
import {
  Dropdown,
  DropdownButton,
  // Modal,
  Button,
  InputGroup,
  Form,
  Col,
  Row,
  FormControl,
  ProgressBar,
} from "react-bootstrap";

const options = [
  { key: "a", text: "Ac/Refrigirator services", value: "ac repairs" },
  { key: "pc", text: "pc/laptop services", value: "pc/laptop" },
  { key: "tv", text: "tv repairs", value: "tv" },
  { key: "elec", text: "electrician", value: "electrician" },
  { key: "id", text: "interior design", value: "id" },
  { key: "fd", text: "Design", value: "design" },
  { key: "dev", text: "development", value: "development" },
  { key: "eve", text: "events", value: "events" },
  { key: "b", text: "beauty", value: "beauty" },
  { key: "t", text: "tutor", value: "tutor" },
  { key: "p", text: "photography", value: "photography" },
  { key: "d", text: "driver", value: "driver" },
  { key: "c", text: "carpenter", value: "carpenter" },
  { key: "plum", text: "plumber", value: "plumber" },
  { key: "cc", text: "cc tv installation", value: "cc tv installation" },
  { key: "cat", text: "catering", value: "catering" },
];

function useWindowSize() {
  const [swidth, setSWidth] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSWidth([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return swidth;
}

function PartnerRegistration() {
  const [pcate, spcate] = useState(null);
  const [pname, spname] = useState(null);
  const [pnum, spnum] = useState(null);

  const redirect = () => {
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com", "_blank");
  };

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    //console.log("change")
    const name =
      e.target.name == undefined ? e.target.parentElement.id : e.target.name;
    const value = e.target.value;

    switch (name) {
      case "pname":
        spname(value);
        break;
      case "pnum":
        if (e.target.value === "" || re.test(e.target.value)) {
          spnum(value);
        }
        break;

      default:
        //console.log("pcate",e.target.innerText)
        spcate(e.target.innerText);
        break;
    }
  };

  // const maxLengthCheck = (object) => {
  //   if (object.target.value.length > object.target.maxLength) {
  //    object.target.value = object.target.value.slice(0, object.target.maxLength)
  //     }
  //   }

  const formsubmit = async (e) => {
    let details = null;
    // e.preventDefault();
    //console.log("submit")
    //console.log(pname,pnum,pcate)
    if (pnum.length == 10 && pcate !== null) {
      details = { pname, pnum, pcate };
      await partprereg(details);
      spcate(null);
      spnum(null);
      spname(null);
    } else {
      if (pnum.length < 10) toast.warning("enter valid number");
      else if (pcate == null) toast.warning("please select your profession");
    }
  };
  const clearfield = () => {
    spcate(null);
    spnum(null);
    spname(null);
    document.getElementById("pname").value = "";
    document.getElementById("pnum").value = "";
    document.getElementById("pcate").value = null;
  };
  async function partprereg(details) {
    //console.log(details);
    //   toast.success("Thank you we will contact you soon")

    let temp = JSON.stringify(details);
    //console.log(temp);
    let result = await partnerRequests(temp);
    //console.log(result)
    if (result == 200) {
      clearfield();
      toast.success("Thank you we will contact you soon...");
    } else toast.info("please try again");
  }
  const [open, setOpen] = useState(false);
  const [height1, width1] = useWindowSize();
  const [textContent, setTextcontent] = useState(textpart);
  if (width1 <= 800) {
    return (
      <div className="pslide1">
        <p id="partnerTop"></p>

        {textContent.map((message) => (
          <section className="home-section">
            <Fade bottom>
              <div className="home-photos">
                <img src={message.img} />
              </div>
            </Fade>
            <Zoom>
              <div className="home-textBox">
                <h1>{message.heading}</h1>
                <p>
                  {" "}
                  <ReactReadMoreReadLess
                    charLimit={100}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                    readMoreClassName="read-more-less--more"
                    readLessClassName="read-more-less--less"
                  >
                    {message.content}
                  </ReactReadMoreReadLess>
                </p>
              </div>
            </Zoom>
          </section>
        ))}
        <div className="feedBack " onClick={() => setOpen(true)}>
          <MdFeedback className="feedBackIcon" />
        </div>

        <Modal
          className="fbModal"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          // trigger={<Button>Show Modal</Button>}
        >
          <Form
            className="contactForm"
            // style={{ width: this.state.wWidth > 625 ? "50%" : "85%" }}
            // onSubmit={this.submitForm}
          >
            <h2>Do you have any feedback?</h2>
            <Form.Group className="formgroup">
              <Form.Label>
                Do you understand what does this website mean
              </Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Is this platform useful?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>How does the website looks?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>

            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Did you face any issues with the website?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                If you have any other feedback please let us know. We love to
                give you the best.
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="put what you want to message"
                name="message"
                value="nothing"
                // onChange={this.handlec}
              />
            </Form.Group>

            <Row style={{ margin: "0 auto", width: "fit-content" }}>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" style={{ marginLeft: "30px" }}>
                Submit
              </Button>
            </Row>
          </Form>
          {/* <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            >
              Submit{" "}
            </Button>
          </Modal.Actions> */}
        </Modal>

        <Form
          style={{ height: "300px", width: "80%", margin: "0 auto" }}
          onSubmit={formsubmit}
        >
          {/* <label>
            <b>Select Your Proffesion</b>
          </label>
          <Form.Select
            name="pcate"
            id="pcate"
            onChange={handleChange}
            options={options}
            placeholder="Type of profession"
            required
          /> */}
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>
              <b>Select Your Proffesion</b>
            </Form.Label>
            <Form.Control
              as="select"
              name="pcate"
              id="pcate"
              onChange={handleChange}
              options={options}
              placeholder="Type of profession"
              required
            />
          </Form.Group>

          {/* <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              id="pname"
              name="pname"
              value={pname}
              onChange={handleChange}
              maxLength="15"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Mobile Number</label>
            <input
              value={pnum}
              onClick={handleChange}
              name="pnum"
              id="pnum"
              onChange={handleChange}
              placeholder="Mobile Numer"
              maxLength="10"
              required
            /> */}
          {/* </Form.Field> */}
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First Name"
              id="pname"
              name="pname"
              value={pname}
              onChange={handleChange}
              maxLength="15"
              required
            />
          </Form.Group>
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              value={pnum}
              onClick={handleChange}
              name="pnum"
              id="pnum"
              onChange={handleChange}
              placeholder="Mobile Numer"
              maxLength="10"
              required
            />
          </Form.Group>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>

        <div
          style={{
            background: "white",
            width: "100%",
            textAlign: "center",
            padding: "20px auto",
            height: "70px",
            fontSize: "32px",
          }}
        >
          <FaGooglePlay style={{ marginTop: "20px" }} />
        </div>

        <div
          style={{
            background: "black",
            width: "100%",
            textAlign: "center",
            color: "white",
            letterSpacing: "2px",
          }}
        >
          <p style={{ marginTop: "3px", marginBottom: "3px" }}>
            Made with <span style={{ color: "red" }}>&#x2764;</span> by{" "}
            <a onClick={redirect} target="blank" style={{ cursor: "pointer" }}>
              Modern Silpi
            </a>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="pslide1">
        {textContent.map((message, index) => (
          <div>
            {index % 2 == 0 ? (
              <section className="home-section">
                <Fade left>
                  <div className="home-photos">
                    <img src={message.img} />
                  </div>
                </Fade>
                <Zoom>
                  <div className="home-textBox">
                    <h1>{message.heading}</h1>
                    <p>
                      <ReactReadMoreReadLess
                        charLimit={100}
                        readMoreText={"Read more ▼"}
                        readLessText={"Read less ▲"}
                        readMoreClassName="read-more-less--more"
                        readLessClassName="read-more-less--less"
                      >
                        {message.content}
                      </ReactReadMoreReadLess>
                    </p>
                  </div>
                </Zoom>
              </section>
            ) : (
              <section className="home-section">
                <Zoom>
                  <div className="home-textBox">
                    <h1>{message.heading}</h1>
                    <p>
                      <ReactReadMoreReadLess
                        charLimit={100}
                        readMoreText={"Read more ▼"}
                        readLessText={"Read less ▲"}
                        readMoreClassName="read-more-less--more"
                        readLessClassName="read-more-less--less"
                      >
                        {message.content}
                      </ReactReadMoreReadLess>
                    </p>
                  </div>
                </Zoom>
                <Fade right>
                  <div className="home-photos">
                    <img src={message.img} />
                  </div>
                </Fade>
              </section>
            )}
          </div>
        ))}
        <div className="feedBack " onClick={() => setOpen(true)}>
          <MdFeedback className="feedBackIcon" />
        </div>

        <Modal
          className="fbModal"
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          // trigger={<Button>Show Modal</Button>}
        >
          <Form
            className="contactForm"
            // style={{ width: this.state.wWidth > 625 ? "50%" : "85%" }}
            // onSubmit={this.submitForm}
          >
            <h2>Do you have any feedback?</h2>
            <Form.Group className="formgroup">
              <Form.Label>
                Do you understand what does this website mean
              </Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formVerticalRadios"
                  id="formVerticalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Is this platform useful?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios1"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>How does the website looks?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios2"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>

            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Did you face any issues with the website?</Form.Label>
              <Col classname="formcol">
                <Form.Check
                  inline
                  type="radio"
                  label="first radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="second radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  inline
                  type="radio"
                  label="third radio"
                  name="formHorizontalRadios3"
                  id="formHorizontalRadios3"
                />
              </Col>
            </Form.Group>
            <Form.Group
              className="formgroup"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                If you have any other feedback please let us know. We love to
                give you the best.
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="put what you want to message"
                name="message"
                value="nothing"
                // onChange={this.handlec}
              />
            </Form.Group>

            <Row style={{ margin: "0 auto", width: "fit-content" }}>
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button type="submit" style={{ marginLeft: "30px" }}>
                Submit
              </Button>
            </Row>
          </Form>
          {/* <Modal.Actions>
            <Button color="black" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              content="Yep, that's me"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setOpen(false)}
              positive
            >
              Submit{" "}
            </Button>
          </Modal.Actions> */}
        </Modal>
        <Form
          style={{ height: "300px", width: "40%", margin: "0 auto" }}
          onSubmit={formsubmit}
        >
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>
              <b>Select Your Proffesion</b>
            </Form.Label>
            <Form.Control
              as="select"
              name="pcate"
              id="pcate"
              onChange={handleChange}
              options={options}
              placeholder="Type of profession"
              required
            />
          </Form.Group>

          {/* <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              id="pname"
              name="pname"
              value={pname}
              onChange={handleChange}
              maxLength="15"
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Mobile Number</label>
            <input
              value={pnum}
              onClick={handleChange}
              name="pnum"
              id="pnum"
              onChange={handleChange}
              placeholder="Mobile Numer"
              maxLength="10"
              required
            /> */}
          {/* </Form.Field> */}
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              placeholder="First Name"
              id="pname"
              name="pname"
              value={pname}
              onChange={handleChange}
              maxLength="15"
              required
            />
          </Form.Group>
          <Form.Group
            className="formgroup"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              value={pnum}
              onClick={handleChange}
              name="pnum"
              id="pnum"
              onChange={handleChange}
              placeholder="Mobile Numer"
              maxLength="10"
              required
            />
          </Form.Group>
          <Button primary type="submit">
            Submit
          </Button>
        </Form>

        <div
          style={{
            background: "white",
            width: "100%",
            textAlign: "center",
            padding: "20px auto",
            height: "70px",
            fontSize: "32px",
          }}
        >
          <FaGooglePlay style={{ marginTop: "20px" }} />
        </div>

        <div
          style={{
            background: "black",
            width: "100%",
            textAlign: "center",
            color: "white",
            letterSpacing: "2px",
          }}
        >
          <p style={{ marginTop: "3px", marginBottom: "3px" }}>
            Made with <span style={{ color: "red" }}>&#x2764;</span> by{" "}
            <a onClick={redirect} target="blank" style={{ cursor: "pointer" }}>
              Modern Silpi
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default PartnerRegistration;
