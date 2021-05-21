import "../App.css";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import React, { useState, useEffect, useRef } from "react";
//toast
import { toast } from "react-toastify";
import { MdFeedback } from "react-icons/md";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { FaGooglePlay } from "react-icons/fa";
import firebase from "../firebase";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "../assets/css/home.css";
import text from "./usertext";
import ReactReadMoreReadLess from "react-read-more-read-less";
import ScrollAnimation from "react-animate-on-scroll";
import "./txtRotate";
import lock1 from "../images/lock1.png";
import lock2 from "../images/lock2.png";
import lock3 from "../images/lock3.png";
import { feedBack1 } from "../mservices/contactUs";
//import feedback form
import { FeedbackForm } from "./reusable/Modal";
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
  const lockText = useRef(null);
  const [open, setOpen] = useState(false);
  const [sheight1, swidths1] = useWindowSize1();
  const [userText, setUsertext] = useState(text);
  const scrollref = useRef(null);
  const [cstext, setCstext] = useState("********** ********");
  const [lock, setLock] = useState(lock3);
  const [lockst, setlockst] = useState(0);
  // const [condiff, setCondiff] = useState(530);

  const redirect = () => {
    window.open("https://modernsilpi.com", "_blank");
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.onscroll = (e) => {
      var scrolly = e.target.scrollingElement.scrollHeight;
      var scrolltop = e.target.scrollingElement.scrollTop;
      var scrolltop2 =
        lockText.current != null ? lockText.current.offsetTop : 0;
      var clientheight = e.target.scrollingElement.clientHeight;
      var diff = scrolltop2 - scrolltop;

      if (diff <= 520 && diff >= 500) {
        swidths1 < 800 ? setCstext("C********* ") : setCstext("C********* ");
        setlockst(0);
      } else if (diff <= 499 && diff >= 480) {
        swidths1 < 800 ? setCstext("Co******** ") : setCstext("Co******** ");
        setlockst(0);
      } else if (diff <= 479 && diff >= 460) {
        setCstext("Com******* ********");
        setlockst(0);
      } else if (diff <= 459 && diff >= 440) {
        setCstext("Comp****** ********");
      } else if (diff <= 439 && diff >= 420) {
        setCstext("Compl***** ********");
        setlockst(0);
      } else if (diff <= 419 && diff >= 400) {
        setCstext("Comple**** ********");
      } else if (diff <= 399 && diff >= 380) {
        setCstext("Complet*** ********");
        setlockst(0);
      } else if (diff <= 379 && diff >= 360) {
        setCstext("Complete** ********");
        setlockst(0);
      } else if (diff <= 359 && diff >= 340) {
        setCstext("Completel* ********");
        setlockst(0);
      } else if (diff <= 339 && diff >= 320) {
        setCstext("Completely ********");
        setLock(lock2);
        setlockst(0);
      } else if (diff <= 339 && diff >= 320) {
        setCstext("Completely ********");
      } else if (diff <= 319 && diff >= 300) {
        setCstext("Completely S*******");
      } else if (diff <= 299 && diff >= 280) {
        setCstext("Completely Se******");
      } else if (diff <= 279 && diff >= 260) {
        setCstext("Completely Sec*****");
      } else if (diff <= 259 && diff >= 240) {
        setCstext("Completely Secu****");
      } else if (diff <= 239 && diff >= 220) {
        setCstext("Completely Secur***");
      } else if (diff <= 219 && diff >= 200) {
        setCstext("Completely Secure**");
      } else if (diff <= 199 && diff >= 180) {
        setCstext("Completely Secured*");
        setLock(lock1);
        setlockst(1);
      } else if (diff <= 179 && diff >= 160) {
        setCstext("Completely Secured!");
        setlockst(1);
      }
      // if (diff <= condiff + 20 && diff >= condiff + 40) {
      //   // setCstext(cstext.concat("a"));
      //   setCondiff(diff);
      //   console.log(condiff, "condiff");
      // }
      if (scrolly - scrolltop == clientheight) {
        setCstext("Completely Secured!");
        setlockst(1);
      }
      // console.log(
      //   scrolly,
      //   scrolltop,
      //   scrolltop2,
      //   clientheight,
      //   diff,
      //   "scrooling"
      // );
    };
  }, []);

  if (swidths1 < 800) {
    return (
      <div className="slide1">
        {userText.map((message, key) => (
          <section className="home-section" id={key}>
            <ScrollAnimation animateOut="m-img-in" animateIn="m-img-out">
              <div
                className={
                  (key == 1) | (key == 2) | (key == 3)
                    ? "resize"
                    : "home-photos"
                }
              >
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
          {lockst == 1 ? (
            <Fade right>
              <h3 style={{ margin: "auto", paddingRight: "10px" }}>Feedback</h3>
            </Fade>
          ) : null}
          <MdFeedback className="feedBackIcon" />
        </div>
        <FeedbackForm open={open} close={closeModal} />

        <section className="LockPsw" ref={lockText}>
          <Fade top>
            <div id="LockDiv">
              {/* <img src={lock} alt="lock" /> */}
              {lockst == 0 ? (
                <BsFillUnlockFill size="4rem" />
              ) : (
                <BsFillLockFill size="4rem" />
              )}
              <h2>{cstext}</h2>
            </div>
          </Fade>
        </section>

        <section className="home-textBox" id="joinBtn">
          <Fade top>
            <div>
              <h1>Wanna Register As Service Provider / Technician ?</h1>
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
            Made with love by{" "}
            {/* <span style={{ color: "red" }}>&#x2764;</span> by{" "} */}
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
      <div className="slide1" ref={scrollref}>
        {userText.map((message, index) => (
          <div id={index}>
            {index % 2 == 0 ? (
              <section className="home-section">
                <ScrollAnimation animateIn="img-in" animateOut="img-out">
                  <div
                    className={
                      (index == 1) | (index == 2) | (index == 3)
                        ? "resize"
                        : "home-photos"
                    }
                  >
                    <Fade left>
                      <img src={message.img} />
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
                  <div
                    className={
                      (index == 1) | (index == 2) | (index == 3)
                        ? "resize"
                        : "home-photos"
                    }
                  >
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
          {lockst == 1 ? (
            <Fade right>
              <h3 style={{ margin: "auto", paddingRight: "10px" }}>Feedback</h3>
            </Fade>
          ) : null}

          <MdFeedback className="feedBackIcon" />
        </div>
        <FeedbackForm open={open} close={closeModal} />

        <section className="LockPsw" ref={lockText}>
          <Fade top>
            <div id="LockDiv">
              {/* <img src={lock} alt="lock" /> */}
              {lockst == 0 ? (
                <BsFillUnlockFill size="4rem" />
              ) : (
                <BsFillLockFill size="4rem" />
              )}

              <h2 id="pswReveal" ref={scrollref}>
                {cstext}
              </h2>
            </div>
          </Fade>
        </section>

        <section className="home-textBox home-textBox1" id="joinBtn">
          <Fade top>
            <div>
              <h1>Wanna Register As Service Provider / Technician ?</h1>
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
            Made with Love by{" "}
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
