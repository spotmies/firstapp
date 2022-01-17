import { Button } from "@material-ui/core";
import React from "react";
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
import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import "./footer_bar.scss";

export default function FooterBar() {
  return (
    <div className="footer-center">
      <div className="footer1-section">
        <div className="footer1">
          <p className="footer-head">Start growing with spotmies Today</p>
          <Button
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
          <div className="footer-child">
            <p className="footer-shead">Company</p>
            <p className="footer-desc">Contact us</p>
            <p className="footer-desc">About us</p>
            <p className="footer-desc">Blos us</p>
            <p className="footer-desc"> Info company</p>
          </div>
          <div className="footer-child">
            <p className="footer-shead">Resources</p>
            <p className="footer-desc">Contact us</p>
            <p className="footer-desc">About us</p>
            <p className="footer-desc">Blos us</p>
            <p className="footer-desc"> Info company</p>
          </div>
          <div className="footer-child">
            <p className="footer-shead">Policy</p>
            <p className="footer-desc">Contact us</p>
            <p className="footer-desc">About us</p>
            <p className="footer-desc">Blos us</p>
            <p className="footer-desc"> Info company</p>
          </div>
          <div className="footer-child">
            <p className="footer-shead">Policy</p>
            <p className="footer-desc">Contact us</p>
            <p className="footer-desc">About us</p>
            <p className="footer-desc">Blos us</p>
            <p className="footer-desc"> Info company</p>
          </div>
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
              <FaFacebook className="sm-icon fb" />
              <FaInstagram className="sm-icon instagram" />
              <FaWhatsapp className="sm-icon whatsapp" />
              <FaLinkedin className="sm-icon linkedin" />
              <FaTwitter className="sm-icon twitter" />
              <FaYoutube className="sm-icon youtube" />
            </div>
          </div>
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
            <p className="india-emoji">&nbsp;🇮🇳</p>
          </span>
        </div>
      </div>
    </div>
  );
}
