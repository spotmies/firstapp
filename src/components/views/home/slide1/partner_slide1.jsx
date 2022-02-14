import React, { useRef } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { redirectToPartnerApp } from "../../../../helpers/redirect";
import PartnerRegistrationForm from "../partner_registration_form/registration_form";
// import image from "../../../../assets/svgs/speechtotext.svg";
import playStoreIcon from "../../../../assets/svgs/play-store-icon.svg";
import Fade from "react-reveal/Fade";
export default function PartnerSlide1(props) {
  const [showForm, setShowForm] = React.useState(false);
  const formRef = useRef(null);
  const closeForm = () => {
    setShowForm(false);
  };
  const openForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
  };

  return (
    <Fade>
      <div
        className="slide-1"
        ref={formRef}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <div className="benefits2">
          <div className="main-content">
            <div className="content">
              <p className="head home-page-head">
                {/* Easy To Provide Service Online. */}
                Start your online business Today.
              </p>

              <div className="spacer-span" />
              <img src={props.image} className="slide1Img" />
              <div className="spacer-span" />
              <p className="description">
                Do not hassle, We help you in expanding your business , We pave
                the way to grow your business bigger and better.
              </p>
              <div className="slide-button">
                <div className="get-started-btn" onClick={props.onClick}>
                  <span>
                    <p>Get started</p>
                  </span>
                </div>
                <div
                  className={
                    showForm
                      ? "get-started-btn get-started-btn-fill"
                      : "get-started-btn"
                  }
                  onClick={() => {
                    showForm ? closeForm() : openForm();
                  }}
                >
                  <span>
                    <p>Click Here To Join</p>
                  </span>
                </div>
              </div>

              {showForm ? (
                <div className="partner-reg-form">
                  <PartnerRegistrationForm onSuccess={closeForm} />
                </div>
              ) : null}
              <div className="spacer-span" />
              <div className="spacer-span" />
              <p>
                Get App on Playstore&nbsp;&nbsp;
                {/* <span className="icon-cover"> */}
                <img
                  src={playStoreIcon}
                  alt="google play"
                  className="pointer google-play-icon"
                  onClick={redirectToPartnerApp}
                />
                {/* <FaGooglePlay
                  size="1rem"
                  color="gray"
                  className="pointer"
                  onClick={redirectToPartnerApp}
                />{" "} */}
                {/* </span> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
