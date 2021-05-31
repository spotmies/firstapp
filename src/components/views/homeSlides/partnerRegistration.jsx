import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "semantic-ui-react";

import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "../../../assets/css/partner.css";
//import feedback form

import { FeedbackForm } from "../../reusable/Modal";

import { FaGooglePlay } from "react-icons/fa";

import { toast } from "react-toastify";
import textpart from "../../../helpers/partnerText";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { apiPostPut } from "../../../mservices/contactUs";
import { MdFeedback } from "react-icons/md";
import ScrollAnimation from "react-animate-on-scroll";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Select2 from "react-select";
const options2 = [
  { label: "Ac/Refrigirator services", value: "ac repairs" },
  { label: "Pc/Laptop services", value: "pc/laptop" },
  { label: "Tv repairs", value: "tv" },
  { label: "Electrician", value: "electrician" },
  { label: "Interior design", value: "interior" },
  { label: "Design", value: "design" },
  { label: "Development", value: "development" },
  { label: "Events", value: "events" },
  { label: "Beauty", value: "beauty" },
  { label: "Tutor", value: "tutor" },
  { label: "Photography", value: "photography" },
  { label: "Driver", value: "driver" },
  { label: "Carpenter", value: "carpenter" },
  { label: "Plumber", value: "plumber" },
  { label: "CC tv installation", value: "cc tv installation" },
  { label: "Catering", value: "catering" },
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
  const [sbtn, setsbtn] = useState(false);
  const lockText = useRef(null);

  const redirect = () => {
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com", "_blank");
  };
  const handleChange2 = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    spcate(selectedOption);
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
        console.log(e.target.innerText);
        break;
    }
  };

  const formsubmit = async () => {
    let details = null;
    if (pnum.length == 10 && pcate !== null) {
      setsbtn(true);
      let pcatee = pcate.value;
      details = { pname, pnum, pcatee, date: new Date().valueOf() };
      await partprereg(details);
    } else {
      if (pnum.length < 10) toast.warning("enter valid number");
      else if (pcate == null) toast.warning("please select your profession");
    }
  };
  const clearfield = () => {
    spcate(null);
    spnum(null);
    spname(null);
    setsbtn(false);
    document.getElementById("pname").value = "";
    document.getElementById("pnum").value = "";
    // document.getElementById("pcate").value = null;
  };
  async function partprereg(details) {
    //console.log(details);
    //   toast.success("Thank you we will contact you soon")
    let temp = {};
    temp["body"] = JSON.stringify(details);
    console.log(temp);
    let result = await apiPostPut(temp, "partnerRegistration");
    console.log("117", result);
    if (result.status == 200) {
      clearfield();
      toast.info("Thank you we will contact you soon...");
    } else {
      toast.info("please try again");
      setsbtn(false);
    }
  }
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const [height1, width1] = useWindowSize();
  const [textContent, setTextcontent] = useState(textpart);
  const [chIcon, setchIcon] = useState(0);

  const ref1 = useRef(null);
  const executeScroll = () =>
    ref1.current.scrollIntoView({ behavior: "smooth" });
  useEffect(() => {
    window.onscroll = (e) => {
      let scrolly = e.target.scrollingElement.scrollHeight;
      let scrolltop = e.target.scrollingElement.scrollTop;
      let clientheight = e.target.scrollingElement.clientHeight;
      let scrolltop2 = ref1.current != null ? ref1.current.offsetTop : 0;
      //  console.log("scroll", scrolly, scrolltop, clientheight, scrolltop2);
      if (scrolltop > 300) setchIcon(1);
      else setchIcon(0);

      if (scrolly - scrolltop < clientheight + (scrolly - scrolltop2)) {
        //  console.log("bottom");
        setchIcon(2);
      }
    };
  }, []);
  if (width1 <= 800) {
    return (
      <div className="pslide1">
        <p id="partnerTop"></p>

        {textContent.map((message, index) => (
          <section className="home-section">
            <Fade bottom>
              <ScrollAnimation animateOut="m-img-in" animateIn="m-img-out">
                <div
                  className={
                    (index == 1) | (index == 2) | (index == 3)
                      ? "resize"
                      : "home-photos"
                  }
                >
                  <img src={message.img} />
                </div>
              </ScrollAnimation>
            </Fade>
            <Zoom>
              <div className="home-textBox">
                <ScrollAnimation
                  animateIn="headeranimate-in"
                  animateOut="headeranimate-out"
                >
                  <h1>{message.heading}</h1>
                </ScrollAnimation>
                <ScrollAnimation
                  animateOut="fade-out-section"
                  animateIn="fade-in-section"
                >
                  <p>
                    {" "}
                    {/* <ReactReadMoreReadLess
                      charLimit={100}
                      readMoreText={"Read more ▼"}
                      readLessText={"Read less ▲"}
                      readMoreClassName="read-more-less--more"
                      readLessClassName="read-more-less--less"
                    > */}
                    {message.content}
                    {/* </ReactReadMoreReadLess> */}
                  </p>
                </ScrollAnimation>
              </div>
            </Zoom>
          </section>
        ))}
        <div className="feedBack fbSlide">
          {chIcon == 0 ? (
            <Fade right>
              <h3
                // style={{ margin: "auto", paddingRight: "10px" }}
                className="fbh3"
                onClick={executeScroll}
              >
                Register
              </h3>
            </Fade>
          ) : null}
          {chIcon == 0 || chIcon == 1 ? (
            <span className="iconSpan">
              {" "}
              <BsFillPersonPlusFill
                className="feedBackIcon"
                onClick={executeScroll}
              />
            </span>
          ) : (
            <span className="iconSpan">
              {" "}
              <MdFeedback
                className="feedBackIcon"
                onClick={() => setOpen(true)}
              />
            </span>
          )}
        </div>
        <FeedbackForm open={open} close={closeModal} />

        <div style={{ textAlign: "center", width: "100%" }} ref={ref1}>
          <h2 style={{ fontSize: "34px" }}>Let us know you are Interested.</h2>
          <Form
            style={{
              height: "300px",
              width: "80%",
              margin: "0 auto",
              textAlign: "left",
            }}
            onSubmit={formsubmit}
          >
            <Form.Field>
              <label>
                <b>Select your Profession</b>
              </label>
              <Select2
                placeholder="Select your Profession"
                value={pcate}
                onChange={handleChange2}
                options={options2}
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                id="pname"
                name="pname"
                value={pname}
                onChange={handleChange}
                maxLength="25"
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
              />
            </Form.Field>
            {sbtn == false ? (
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
          style={{
            background: "white",
            width: "100%",
            textAlign: "center",
            padding: "20px auto",
            height: "70px",
            fontSize: "32px",
          }}
        >
          <FaGooglePlay
            style={{ marginTop: "20px" }}
            onClick={() => {
              toast.info("App Launching Soon");
            }}
          />
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
  } else {
    return (
      <div className="pslide1">
        {textContent.map((message, index) => (
          <div>
            {index % 2 == 0 ? (
              <section className="home-section">
                <ScrollAnimation animateIn="img-in" animateOut="img-out">
                  <Fade left>
                    <div
                      className={
                        (index == 1) | (index == 2) | (index == 3)
                          ? "resize"
                          : index == 7
                          ? "navigateClass"
                          : "home-photos"
                      }
                    >
                      <img src={message.img} />
                    </div>
                  </Fade>
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
                        {/* <ReactReadMoreReadLess
                          charLimit={100}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                          readMoreClassName="read-more-less--more"
                          readLessClassName="read-more-less--less"
                        > */}
                        {message.content}
                        {/* </ReactReadMoreReadLess> */}
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
                        {/* <ReactReadMoreReadLess
                          charLimit={100}
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                          readMoreClassName="read-more-less--more"
                          readLessClassName="read-more-less--less"
                        > */}
                        {message.content}
                        {/* </ReactReadMoreReadLess> */}
                      </p>
                    </ScrollAnimation>
                  </div>
                </Zoom>
                <Fade right>
                  <ScrollAnimation animateIn="img-in" animateOut="img-out">
                    <div
                      className={
                        (index == 1) | (index == 2) | (index == 3)
                          ? "resize"
                          : index == 7
                          ? "navigateClass"
                          : "home-photos"
                      }
                    >
                      <img src={message.img} />
                    </div>
                  </ScrollAnimation>
                </Fade>
              </section>
            )}
          </div>
        ))}
        <div className="feedBack fbSlide">
          {chIcon == 0 ? (
            <Fade right>
              <h3
                className="fbh3"
                // style={{ margin: "auto", paddingRight: "10px" }}
                onClick={executeScroll}
              >
                Register
              </h3>
            </Fade>
          ) : null}
          {chIcon == 0 || chIcon == 1 ? (
            <span className="iconSpan">
              {" "}
              <BsFillPersonPlusFill
                className="feedBackIcon"
                onClick={executeScroll}
              />
            </span>
          ) : (
            <span className="iconSpan">
              {" "}
              <MdFeedback
                className="feedBackIcon"
                onClick={() => setOpen(true)}
              />
            </span>
          )}
        </div>
        <FeedbackForm open={open} close={closeModal} />
        <div style={{ textAlign: "center" }} ref={ref1}>
          <h2 style={{ fontSize: "54px" }}>Let us know you are Interested.</h2>
          <Form
            style={{
              height: "300px",
              width: "40%",
              margin: "0 auto",
              textAlign: "left",
            }}
            onSubmit={formsubmit}
          >
            {/* <Form.Select
              name="pcate"
              label="Select Your profession"
              id="pcate"
              onClick={handleChange}
              options={options}
              placeholder="Type of profession"
              required
            /> */}
            <Form.Field>
              <label>
                <b>Select your Profession</b>
              </label>
              <Select2
                placeholder="Select your Profession"
                value={pcate}
                onChange={handleChange2}
                options={options2}
              />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                id="pname"
                name="pname"
                value={pname}
                onChange={handleChange}
                maxLength="25"
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
              />
            </Form.Field>
            {sbtn == false ? (
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
        <div ref={lockText}></div>
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
          <FaGooglePlay
            style={{ marginTop: "20px" }}
            onClick={() => {
              toast.info("App Launching Soon");
            }}
          />
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
  }
}

export default PartnerRegistration;
