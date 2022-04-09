import { Button } from "@material-ui/core";
import React, { useState } from "react";
import {
  AiOutlineArrowRight,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import FeedbackForm from "../../../reusable/feedback_form";
import {
  redirectFB,
  redirectInstagram,
  redirectLinedin,
  redirectToPartnerApp,
  redirectToPartnerPage,
  redirectTwitter,
  redirectWhatsapp,
  redirectYoutube,
} from "../../../../helpers/redirect";
import { Link } from "react-router-dom";
import flag from "../../../../assets/images/india_flg.png";
import "./footer_bar.scss";

export default function FooterBar() {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const openFeedbackForm = () => {
    setOpen(true);
  };

  const socialMediaIcons = () => {
    return (
      <>
        <FaFacebook className="sm-icon fb" onClick={redirectFB} />
        <FaInstagram
          className="sm-icon instagram"
          onClick={redirectInstagram}
        />
        <FaWhatsapp className="sm-icon whatsapp" onClick={redirectWhatsapp} />
        <FaLinkedin className="sm-icon linkedin" onClick={redirectLinedin} />
        <FaTwitter className="sm-icon twitter" onClick={redirectTwitter} />
        <FaYoutube className="sm-icon youtube" onClick={redirectYoutube} />
      </>
    );
  };

  return (
    <div className="footer-center">
      <FeedbackForm open={open} close={closeModal} />
      <div className="footer1-section">
        <div className="footer1">
          <p className="footer-head">Start growing with spotmies Today</p>
          <Button
            onClick={redirectToPartnerPage}
            variant="outlined"
            endIcon={<AiOutlineArrowRight />}
            className="join-button"
          >
            Join Now
          </Button>
        </div>
      </div>
      <div className="footer2-section">
        <div className="footer2">
          <div className="footer2-section1">
            <div className="footer-child">
              <p className="footer-shead">Company</p>

              <p className="footer-desc">
                <Link to="/contact">Contact us </Link>
              </p>

              <p className="footer-desc">
                {" "}
                <Link to="/about">About us</Link>
              </p>

              <p className="footer-desc">
                {" "}
                <Link to="/careers">Career </Link>
              </p>
              <p className="footer-desc" onClick={openFeedbackForm}>
                {" "}
                Feedback
              </p>
            </div>
            <div className="footer-child">
              <p className="footer-shead">Resources</p>
              <p className="footer-desc">
                <Link to="/terms">Terms</Link>
              </p>
              <p className="footer-desc">
                <Link to="/privacy">Privacy </Link>
              </p>
              <p className="footer-desc">
                <Link to="/faq"> FAQ'S</Link>
              </p>
              {/* <p className="footer-desc"> Info company</p> */}
            </div>
          </div>
          <div className="footer2-section2">
            <div className="footer-child footer-child-web">
              <p className="footer-shead">Important links</p>
              <p className="footer-desc">
                <Link to="/partnerRegistration">Join as Service partner </Link>
              </p>
              <p className="footer-desc">Download Spotmies App</p>
              <p className="footer-desc" onClick={redirectToPartnerApp}>
                Download Spotmies Partner App
              </p>
            </div>
            <div className="footer-child-mobile">
              <p className="footer-shead">Links</p>
              <p className="footer-desc">
                <Link to="/partnerRegistration">Join Now</Link>
              </p>
              <p className="footer-desc">Spotmies App</p>
              <p className="footer-desc" onClick={redirectToPartnerApp}>
                Partner App
              </p>
            </div>
            {/* <div className="footer-child">
            <p className="footer-shead">Policy</p>
            <p className="footer-desc">Contact us</p>
            <p className="footer-desc">About us</p>
            <p className="footer-desc">Blos us</p>
            <p className="footer-desc"> Info company</p>
          </div> */}
            <div className="footer-child">
              <p className="footer-shead">More</p>
              <p className="footer-desc">
                <AiOutlineMail />
                &nbsp; info@spotmies.com
              </p>
              <p className="footer-desc">
                <AiOutlinePhone /> &nbsp; +91 8341980196
              </p>
              <div className="social-media">
                {socialMediaIcons()}
                {/* <FaFacebook className="sm-icon fb" />
                <FaInstagram className="sm-icon instagram" />
                <FaWhatsapp className="sm-icon whatsapp" />
                <FaLinkedin className="sm-icon linkedin" />
                <FaTwitter className="sm-icon twitter" />
                <FaYoutube className="sm-icon youtube" /> */}
              </div>
            </div>
          </div>
        </div>
        <div className="social-media-mobile">
          {socialMediaIcons()}
          {/* <FaFacebook className="sm-icon fb" onClick={redirectFB}/>
          <FaInstagram className="sm-icon instagram" onClick={redirectInstagram}/>
          <FaWhatsapp className="sm-icon whatsapp" onClick={redirectWhatsapp}/>
          <FaLinkedin className="sm-icon linkedin" onClick={redirectLinedin}/>
          <FaTwitter className="sm-icon twitter" onClick={redirectTwitter}/>
          <FaYoutube className="sm-icon youtube" onClick={redirectYoutube}/> */}
        </div>
      </div>
      <div className="footer3-section">
        <div className="horizontal-line" />
        <div className="footer3">
          <span className="rights-reserved">
            <Link>
              {" "}
              <p className="footer-shead">
                © 2021-2022 Spotmies&nbsp;|&nbsp;All rights reserved&nbsp;|
              </p>
            </Link>
            <Link>
              <p> &nbsp;Privacy Policy&nbsp;</p>
            </Link>
            <Link>
              {" "}
              <p>|&nbsp;Terms & Conditions</p>
            </Link>
          </span>
          <span className="made-in-india">
            <p>Made in</p>
            <img src={flag} alt="flag" className="india-emoji" />
            {/* <p className="india-emoji">&nbsp;🇮🇳</p> */}
          </span>
        </div>
      </div>
    </div>
  );
}
