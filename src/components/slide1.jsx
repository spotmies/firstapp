import "../App.css";
import repair from "../images/repair.svg";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Modal } from "semantic-ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { BiRupee } from "react-icons/bi";
import { BsTools, BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { MdFeedback } from "react-icons/md";
import { FaGooglePlay } from "react-icons/fa";
import firebase from "../firebase";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "../assets/css/home.css";
//svg images import
// import macbook from "../assets/css/iphone.png";
// import takepic from "../images/undraw_Organize_photos_re_ogcy.svg";
// import location from "../images/undraw_Destination_re_sr74.svg";
//import getquote from "../images/undraw_Hire_re_gn5j.svg";
// import getquote from "../images/undraw_people_search_wctu.svg"
// import service from "../images/undraw_coffee_break_h3uu.svg";
// import about from "../images/undraw_researching_22gp.svg";
import text from "./usertext";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { useWindowSize } from "../hooks/useWindowsize";
// import { useSpring, animated } from "react-spring";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
// import Typewriter from "typewriter-effect";
// import { init } from "ityped";
import "./txtRotate";

// gsap.registerPlugin(ScrollTrigger);
// const lockdiv = document.querySelector("#LockDiv");
// init(lockdiv, {
//   strings: ["Completely Secured!", "********** ********"],
// });

var newpost = "/signup";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    newpost = "/newpost";
    console.log("user exists");
  } else {
    newpost = "/signup";
    console.log("user didn't exixst");
  }
});

function useWindowSize1() {
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

function Slide() {
  // const handlec = (e) => {
  // let nameId = e.target.name;
  // let value = e.target.value;
  // //console.log(value,nameId);
  // let temp = this.state.details;
  // temp[nameId] = value;
  // temp["date"] = new Date();
  // this.setState({
  //   details: temp,
  // });
  // console.log("fbmodal");
  // };
  // const containerRef = useRef < HTMLDivElement > null;
  // const size = useWindowSize();

  // const setBodyHeight = () => {
  //   document.body.style.height = `${
  //     containerRef.current.getBoundingClientRect().height
  //   }px`;
  // };

  // const smoothScroll = useCallback(() => {
  //   data.curr = window.scrollY;
  //   data.prev += (data.curr - data.prev) * data.ease;
  //   data.rounded = Math.round(data.prev * 100) / 100;
  //   containerRef.current.style.tranform = `translateY(-${data.rounded}px)`;
  //   requestAnimationFrame(() => smoothScroll());
  // }, [data]);

  // useEffect(() => {
  //   requestAnimationFrame(() => smoothScroll());
  // }, []);

  // useEffect(() => {
  //   setBodyHeight();
  // }, [size.height]);

  // const data = {
  //   ease: 0.1,
  //   curr: 0,
  //   prev: 0,
  //   rounded: 0,
  // };

  // const textScroll = useRef < HTMLDivElement > null;

  // const initScrollAnimation = useCallback(() => {
  //   const animationObj = {
  //     duration: 0.8,
  //     y: -80,
  //     opacity: 0,
  //   };

  //   gsap.to(textScroll.current, {
  //     scrollTrigger: {
  //       trigger: textScroll.current,
  //       start: "center 30%",
  //       scrub: true,
  //     },
  //     ...animationObj,
  //   });
  // }, []);

  // useEffect(() => {
  //   initScrollAnimation();
  // }, [initScrollAnimation]);

  // const style = useSpring({ opacity: 1 });
  // const lockText = useRef(null);
  // const bodyDiv = useRef(null);
  const [open, setOpen] = useState(false);

  // const lockEffect = () => {
  //   const scrollY = bodyDiv.current.scrollHeight;
  //   const scrollH = lockText.current.scrollTop;
  //   const clientH = lockText.current.clientHeight;
  //   console.log(scrollY, scrollH, clientH);
  //   alert("hell");
  // };

  const redirect = () => {
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com", "_blank");
  };
  // let location="seethamadahar";
  const db = firebase.firestore();
  // const [modalShow, setModalShow] = React.useState(false);
  const [sheight1, swidths1] = useWindowSize1();
  const [userText, setUsertext] = useState(text);
  // const [offset, setOffset] = useState();

  // const handleScroll = () => {
  //   setOffset(window.pageYOffset);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  if (swidths1 < 800) {
    return (
      <div className="slide1">
        {userText.map((message, key) => (
          <section className="home-section">
            <ScrollAnimation animateOut="m-img-in" animateIn="m-img-out">
              <div className="home-photos">
                <img src={message.img} />
              </div>
            </ScrollAnimation>
            <Zoom>
              <div className="home-textBox">
                <ScrollAnimation
                  animateIn="headeranimate-in"
                  animateOut="headeranimate-out"
                >
                  <h1 className={key == 1 ? "headTop" : null}>
                    {message.heading}
                  </h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateOut="fade-out-section"
                  animateIn="fade-in-section"
                >
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
                </ScrollAnimation>
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

        <section className="LockPsw">
          <Fade top>
            <div id="LockDiv">
              {/* <h2 ref={lockText}>Completely Secured.</h2> */}
            </div>
          </Fade>
        </section>

        <section className="home-textBox" id="joinBtn">
          <Fade top>
            <div>
              <h1>Wanna join your business?</h1>
              <Link to="/partnerRegistration">
                <Button>Join here</Button>
              </Link>
            </div>
          </Fade>
        </section>

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

    // return <div className="slide1">
  } else {
    return (
      <div className="slide1">
        {userText.map((message, index) => (
          <div>
            {index % 2 == 0 ? (
              <section className="home-section">
                <ScrollAnimation animateIn="img-in" animateOut="img-out">
                  <div className="home-photos">
                    <Fade left>
                      <img
                        src={message.img}
                        // style={{ width: 100 + offset * 0.3 }}
                        // style={{ style }}
                      />
                    </Fade>
                  </div>
                </ScrollAnimation>
                <Zoom>
                  <div className="home-textBox">
                    <ScrollAnimation
                      animateOut="headeranimate-out"
                      animateIn="headeranimate-in"
                    >
                      <h1>{message.heading}</h1>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fade-in-section"
                      animateOut="fade-out-section"
                    >
                      <p
                      // style={{ opacity: 0 + offset / 3 }}
                      // ref={domRef}
                      // className={`fade-in-section ${
                      //   isVisible ? "is-visible" : ""
                      // }`}
                      >
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
                    </ScrollAnimation>
                  </div>
                </Zoom>
              </section>
            ) : (
              <section className="home-section">
                <Zoom>
                  <div className="home-textBox">
                    <ScrollAnimation
                      animateOut="headeranimate-out"
                      animateIn="headeranimate-in"
                    >
                      <h1>{message.heading}</h1>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fade-in-section"
                      animateOut="fade-out-section"
                    >
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
                    </ScrollAnimation>
                  </div>
                </Zoom>

                <ScrollAnimation animateIn="img-in" animateOut="img-out">
                  <div className="home-photos">
                    <Fade right>
                      {" "}
                      <img src={message.img} />{" "}
                    </Fade>
                  </div>
                </ScrollAnimation>
              </section>
            )}
          </div>
        ))}
        <div className="feedBack" onClick={() => setOpen(true)}>
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

        <section className="LockPsw">
          <Fade top>
            <div id="LockDiv">
              {/* <h2>Completely Secured.</h2> */}{" "}
              <span
                class="txt-rotate"
                data-period="2000"
                data-rotate='[ "Completely Secured!", "********** ********" ]'
              ></span>
            </div>
          </Fade>
        </section>

        <section className="home-textBox home-textBox1" id="joinBtn">
          <Fade top>
            <div>
              <h1>Wanna join your business?</h1>
              <Link to="/partnerRegistration">
                <Button>Join here</Button>
              </Link>
            </div>
          </Fade>
        </section>

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
            background: "white",
            width: "100%",
            textAlign: "center",
            padding: "20px auto",
            height: "70px",
            fontSize: "32px",
          }}
        >
          <p>
            <Link to="/privacy">
              <a>Privacy Policies</a>
            </Link>
          </p>
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

export default Slide;
