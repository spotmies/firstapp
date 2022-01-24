import React, { useState, useEffect, useRef } from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import "../../../assets/css/partner.css";
//import feedback form

import FeedbackForm from "../../reusable/feedback_form";

import { FaGooglePlay } from "react-icons/fa";

import { toast } from "react-toastify";
import textpart from "../../../helpers/partnerText";
// import { apiPostPut } from "../../../mservices/contactUs";
import { MdFeedback } from "react-icons/md";
import ScrollAnimation from "react-animate-on-scroll";
import { BsFillPersonPlusFill } from "react-icons/bs";
import Select2 from "react-select";
import { useStores } from "../../stateManagement/index";
import { loadState } from "../../../helpers/localStorage";
import { apiPostPut } from "../../../api_services/api_calls/api_calls";
import constants from "../../../helpers/constants";

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

function PartnerRegistration(props) {
  const [pcate, spcate] = useState(null);
  const [sbtn, setsbtn] = useState(false);
  const name = useRef(null);
  const mobile = useRef(null);
  const lockText = useRef(null);
  const otherProfession = useRef(null);
  const [showOtherProfession, setShowOtherProfession] = useState(false);
  const { services, commonStore } = useStores();

  const redirect = () => {
    // window.location.href = 'https://modernsilpi.com';
    window.open("https://modernsilpi.com", "_blank");
  };

  const handleChange2 = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    spcate(selectedOption);
    if (selectedOption.serviceId == 100) {
      setShowOtherProfession(true);
    } else {
      setShowOtherProfession(false);
    }
  };

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  const formsubmit = async () => {
    console.log(otherProfession);
    let pnum = mobile.current.value;
    let pname = name.current.value;
    if (pnum.length === 10 && pcate !== null) {
      setsbtn(true);
      let pcatee = showOtherProfession
        ? otherProfession?.current?.value
        : pcate.serviceId;
      let body = {
        subject: "Partner Request",
        suggestionFor: "partnerRegistration",
        name: pname,
        mobile: pnum,
        suggestionFrom: "userWeb",
        others: pcatee,
        createdAt: new Date().valueOf(),
      };
      console.log(body);
      await partprereg(body);
    } else {
      if (pnum.length < 10) toast.warning("enter valid number");
      else if (pcate === null) toast.warning("please select your profession");
    }
  };
  const clearfield = () => {
    spcate(null);
    // mobile.current.value = "",
    // name.current.value = "",
    setsbtn(false);
    document.getElementById("pname").value = "";
    document.getElementById("pnum").value = "";
    // document.getElementById("pcate").value = null;
  };
  async function partprereg(details) {
    const result = await apiPostPut(
      details,
      constants.api.new_suggestion,
      "POST"
    );
    if (result != null) {
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
    commonStore.setCurrentConstants("others");
    window.onscroll = (e) => {
      let scrolly = e.target.scrollingElement.scrollHeight;
      let scrolltop = e.target.scrollingElement.scrollTop;
      let clientheight = e.target.scrollingElement.clientHeight;
      let scrolltop2 = ref1.current !== null ? ref1.current.offsetTop : 0;
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
                    (index === 1) | (index === 2) | (index === 3)
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
        <div
          className={`${
            props.userDetails.uId !== undefined
              ? "feedBack fbSlide fab"
              : "feedBack fbSlide sddsf"
          }`}
        >
          {chIcon === 0 ? (
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
          {chIcon === 0 || chIcon === 1 ? (
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
          <h2 style={{ fontSize: "34px" }}>
            {commonStore.getText("partner_reg_heading")}
          </h2>
          <Form
            style={{
              paddingBottom: "20px",
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
                options={services.mainServicesList}
                style={{ zIndex: "1" }}
              />
            </Form.Field>
            {showOtherProfession ? (
              <Form.Field>
                <label>Enter Your profession</label>
                <input
                  placeholder="Profession name"
                  ref={otherProfession}
                  maxLength="40"
                  required
                />
              </Form.Field>
            ) : null}
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                id="pname"
                name="pname"
                ref={name}
                maxLength="25"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Mobile Number</label>
              <input
                ref={mobile}
                onClick={handleChange}
                name="pnum"
                id="pnum"
                onChange={handleChange}
                placeholder="Mobile Numer"
                maxLength="10"
                required
              />
            </Form.Field>
            {sbtn === false ? (
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
            {index % 2 === 0 ? (
              <section className="home-section">
                <ScrollAnimation animateIn="img-in" animateOut="img-out">
                  <Fade left>
                    <div
                      className={
                        (index === 1) | (index === 2) | (index === 3)
                          ? "resize"
                          : index === 7
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
                        (index === 1) | (index === 2) | (index === 3)
                          ? "resize"
                          : index === 7
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
        <div
          className={`${
            props.userDetails.uId !== undefined
              ? "feedBack fbSlide fab"
              : "feedBack fbSlide sddsf"
          }`}
        >
          {chIcon === 0 ? (
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
          {chIcon === 0 || chIcon === 1 ? (
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
          <h2 style={{ fontSize: "54px" }}>
            {commonStore.getText("partner_reg_heading")}
          </h2>
          <Form
            style={{
              paddingBottom: "20px",
              width: "40%",
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
                options={services.mainServicesList}
              />
            </Form.Field>
            {showOtherProfession ? (
              <Form.Field>
                <label>Enter Your profession</label>
                <input
                  placeholder="Profession name"
                  id="pname"
                  name="pname"
                  ref={otherProfession}
                  maxLength="40"
                  required
                />
              </Form.Field>
            ) : null}
            <Form.Field>
              <label>First Name</label>
              <input
                placeholder="First Name"
                id="pname"
                name="pname"
                ref={name}
                maxLength="25"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Mobile Number</label>
              <input
                ref={mobile}
                name="pnum"
                id="pnum"
                onChange={handleChange}
                placeholder="Mobile Numer"
                maxLength="10"
                required
              />
            </Form.Field>
            {sbtn === false ? (
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

const mapStateToProps = (state) => {
  return {
    userDetails:
      Object.keys(state.userDetails).length !== 0
        ? state.userDetails
        : loadState("userDetails") ?? [],
    orders: state.orders,
  };
};

export default connect(mapStateToProps, null)(PartnerRegistration);

function PartnerRegistrationForm(params) {
  const ref1 = useRef(null);
  const [pcate, spcate] = useState(null);
  const [sbtn, setsbtn] = useState(false);
  const name = useRef(null);
  const mobile = useRef(null);
  const otherProfession = useRef(null);
  const [showOtherProfession, setShowOtherProfession] = useState(false);
  const { services, commonStore } = useStores();

  const handleChange2 = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    spcate(selectedOption);
    if (selectedOption.serviceId == 100) {
      setShowOtherProfession(true);
    } else {
      setShowOtherProfession(false);
    }
  };

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  const formsubmit = async () => {
    console.log(otherProfession);
    let pnum = mobile.current.value;
    let pname = name.current.value;
    if (pnum.length === 10 && pcate !== null) {
      setsbtn(true);
      let pcatee = showOtherProfession
        ? otherProfession?.current?.value
        : pcate.serviceId;
      let body = {
        subject: "Partner Request",
        suggestionFor: "partnerRegistration",
        name: pname,
        mobile: pnum,
        suggestionFrom: "userWeb",
        others: pcatee,
        createdAt: new Date().valueOf(),
      };
      console.log(body);
      await partprereg(body);
    } else {
      if (pnum.length < 10) toast.warning("enter valid number");
      else if (pcate === null) toast.warning("please select your profession");
    }
  };
  const clearfield = () => {
    spcate(null);

    setsbtn(false);
    document.getElementById("pname").value = "";
    document.getElementById("pnum").value = "";
  };
  async function partprereg(details) {
    const result = await apiPostPut(
      details,
      constants.api.new_suggestion,
      "POST"
    );
    if (result != null) {
      clearfield();
      toast.info("Thank you we will contact you soon...");
    } else {
      toast.info("please try again");
      setsbtn(false);
    }
  }
  return (
    <div style={{ textAlign: "center", width: "100%" }} ref={ref1}>
      <h2 style={{ fontSize: "34px" }}>
        {commonStore.getText("partner_reg_heading")}
      </h2>
      <Form
        style={{
          paddingBottom: "20px",
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
            options={services.mainServicesList}
            style={{ zIndex: "1" }}
          />
        </Form.Field>
        {showOtherProfession ? (
          <Form.Field>
            <label>Enter Your profession</label>
            <input
              placeholder="Profession name"
              ref={otherProfession}
              maxLength="40"
              required
            />
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            id="pname"
            name="pname"
            ref={name}
            maxLength="25"
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Mobile Number</label>
          <input
            ref={mobile}
            onClick={handleChange}
            name="pnum"
            id="pnum"
            onChange={handleChange}
            placeholder="Mobile Numer"
            maxLength="10"
            required
          />
        </Form.Field>
        {sbtn === false ? (
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
  );
}
