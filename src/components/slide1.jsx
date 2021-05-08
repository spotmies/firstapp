import "../App.css";
import repair from "../images/repair.svg";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Modal, Form, Button, Header, TextArea } from "semantic-ui-react";
import React, { useState, useEffect, useRef, useCallback } from "react";
//toast
import { toast } from "react-toastify";

import {
  Dropdown,
  DropdownButton,
  // Modal,
  // Button,
  InputGroup,
  // Form,
  Col,
  Row,
  FormControl,
  ProgressBar,
} from "react-bootstrap";
import { BiRupee } from "react-icons/bi";
import { BsTools, BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import {
  MdFeedback,
  MdHelp,
  MdKeyboardArrowLeft,
  MdSentimentSatisfied,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
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
import { useSpring, animated } from "react-spring";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

//import db files
import { feedBack1 } from "../mservices/contactUs";
// gsap.registerPlugin(ScrollTrigger);

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
  const [open, setOpen] = useState(false);
  const redirect = () => {
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com", "_blank");
  };

  const closeModal = () => {
    setOpen(false);
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
        <ModalExampleModal open={open} close={closeModal} />
        {/* <Modal
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
        {/* </Modal> */}

        <section className="LockPsw">
          <Fade top>
            <div>
              <h2>Completely Secured.</h2>
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
        <ModalExampleModal open={open} close={closeModal} />
        {/* <Modal
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
        {/*    </Modal> */}

        <section className="LockPsw">
          <Fade top>
            <div>
              <h2>Completely Secured.</h2>
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

function ModalExampleModal(props) {
  const [open, setOpen] = useState(false);
  const [count, setcount] = useState(0);
  const [que, setque] = useState([]);

  useEffect(() => {
    setOpen(props.open);
    setcount(0);
    setque([]);
  }, [props.open]);

  useEffect(() => {
    if (count == 10) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  }, [count]);

  const onClose = useCallback(() => {
    props.close();
  });

  const nextQue = (ans, index) => {
    setcount(index + 1);
    let tempque = que;
    tempque[index] = ans;
    setque(tempque);
  };

  const prevQue = () => {
    if (count != 0) setcount(count - 1);
  };

  const textArea = (e, index) => {
    // console.log(e);
    let ans = e.target.value;
    let tempque = que;
    tempque[index] = ans;
    setque(tempque);
  };

  const formSubmit = async () => {
    console.log(que);
    var obj = {
      q0: que[0],
      q1: que[1],
      q2: que[2],
      q3: que[3],
      q4: que[4] == undefined ? "" : que[4],
    };
    console.log(obj);
    console.log(JSON.stringify(obj));
    var strobj = JSON.stringify(obj);
    let result = await feedBack1(strobj);
    if (result == 200) {
      toast.success("Thanks For Your Feedback");
      setcount(10);
    } else {
      toast.error("Something went wrong please try again");
      onClose();
    }
  };

  return (
    <Modal
      className="fbModal"
      onClose={onClose}
      onOpen={() => setOpen(true)}
      open={open}
      size="tiny"
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Feedback Here</Modal.Header>
      <Modal.Content>
        {count > 0 ? (
          <MdKeyboardArrowLeft size="2rem" onClick={prevQue} />
        ) : null}
        <Modal.Description>
          {count == 0 ? (
            <div>
              <Header>Do You Understand What Does This Website Means</Header>
              <div>
                <Button
                  basic
                  color={que[0] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 0);
                  }}
                >
                  <MdThumbUp /> Yeah
                </Button>
                <Button
                  basic
                  color={que[0] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 0);
                  }}
                >
                  <MdThumbDown /> Nope
                </Button>
                <Button
                  basic
                  color={que[0] == "no idea" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no idea", 0);
                  }}
                >
                  <MdHelp /> No Idea
                </Button>
              </div>
            </div>
          ) : null}

          {count == 1 ? (
            <div>
              <Header>Is This Platform Is Useful</Header>
              <div>
                <Button
                  basic
                  color={que[1] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 1);
                  }}
                >
                  <MdThumbUp /> Yes
                </Button>
                <Button
                  basic
                  color={que[1] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 1);
                  }}
                >
                  <MdThumbDown /> No
                </Button>
                <Button
                  basic
                  color={que[1] == "maybe" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("maybe", 1);
                  }}
                >
                  <MdSentimentSatisfied /> Maybe
                </Button>
                <Button
                  basic
                  color={que[1] == "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 1);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button>
              </div>
            </div>
          ) : null}

          {count == 2 ? (
            <div>
              <Header>How This Website Looks</Header>
              <div>
                <Button
                  basic
                  color={que[2] == "good" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("good", 2);
                  }}
                >
                  <MdThumbUp /> Looks Good
                </Button>
                <Button
                  basic
                  color={que[2] == "its ok" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("its ok", 2);
                  }}
                >
                  <MdSentimentSatisfied /> It's Ok
                </Button>
                <Button
                  basic
                  color={que[2] == "bad" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("bad", 2);
                  }}
                >
                  <MdThumbDown /> Looks Bad
                </Button>
                <Button
                  basic
                  color={que[2] == "i don't know" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("i don't know", 2);
                  }}
                >
                  <MdHelp /> I Don't Know
                </Button>
              </div>
            </div>
          ) : null}

          {count == 3 ? (
            <div>
              <Header>Have You Face Any Issue With The Website</Header>
              <div>
                <Button
                  basic
                  color={que[3] == "no" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("no", 3);
                  }}
                >
                  <MdThumbUp /> No
                </Button>
                <Button
                  basic
                  color={que[3] == "yes" ? "blue" : "grey"}
                  onClick={() => {
                    nextQue("yes", 3);
                  }}
                >
                  <MdThumbDown /> Yes
                </Button>
              </div>
            </div>
          ) : null}

          {count == 4 ? (
            <div>
              <Header>
                If You Have Any Other Feedback Please Tell Us Here. We Love To
                Improve Our Service
              </Header>
              <div>
                <Form>
                  <TextArea
                    onChange={(e) => {
                      textArea(e, 4);
                    }}
                    placeholder="Tell us more"
                    value={que[4]}
                  />
                </Form>
              </div>
            </div>
          ) : null}

          {count == 10 ? (
            <div>
              <Header>Thanks For Your Feedback</Header>
            </div>
          ) : null}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={onClose}>
          Cancel
        </Button>
        {count > 3 ? (
          <Button
            content="Submit"
            labelPosition="right"
            icon="checkmark"
            onClick={formSubmit}
            positive
          />
        ) : null}
      </Modal.Actions>
    </Modal>
  );
}
