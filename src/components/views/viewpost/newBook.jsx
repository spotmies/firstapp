import React from "react";
import "./newbook.css";
import {
  MdArrowBack,
  MdCancel,
  MdSettings,
  MdModeEdit,
  MdSchedule,
  MdLocationOn,
  MdCheckCircle
} from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { RiFeedbackFill } from "react-icons/ri";
import {
  BsFillQuestionCircleFill,
  BsThreeDotsVertical,
  BsImage,
} from "react-icons/bs";
import { FaUserCheck, FaShoppingBag, FaWrench } from "react-icons/fa";
import Button from "@mui/material/Button";
import { AiOutlineReload } from "react-icons/ai";

function NewBook() {
  return (
    <div>
      <div className="head-card">
        <MdArrowBack className="head-icons1" />
        <div className="head-details">
          <h2>Interior Designer</h2>
          <p>Order-ID: 1684DU5iu98</p>
          <div>
            <Button variant="outlined" className="head-cancel-btn">
              <MdCancel className="button-icons" />
              &nbsp;&nbsp; Cancel
            </Button>
            <Button
              className="head-buttons"
              variant="contained"
              color="primary"
            >
              <AiOutlineReload className="button-icons" />
              &nbsp;&nbsp;Re-Schedule
            </Button>
          </div>
        </div>
        <div className="head-menu">
          <BsFillQuestionCircleFill className="head-icons" />
          <BsThreeDotsVertical className="head-icons" />
        </div>
      </div>

      <div className="body-cards">
        <div className="left-card">
          <h3 className="heading">Service Details:</h3>
          <div className="service-details">
            <div className="detail-div">
              <MdSettings className="detail-icons" />
              <div>
                <h4>Issue /Problem</h4>
                <p>Designing</p>
              </div>
              <MdModeEdit className="detail-icons" />
            </div>
            <div className="detail-div">
              <MdSchedule className="detail-icons" />
              <div>
                <h4>Schedule</h4>
                <p>26 Nov, 2021 - 12:00 P.M.</p>
              </div>
            </div>
            <div className="detail-div">
              <MdLocationOn className="detail-icons" />
              <div>
                <h4>Location</h4>
                <p>
                  192-2/2, Chandranagar, <br />
                  Gopalapatnam,
                  <br />
                  Visakhapatnam - 530027
                </p>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="media-div">
            <div className="media-card">
              <h2>Media Files:</h2>
              <BsImage className="image-icon" />
              <br />
              <BsImage className="image-icon" />
            </div>
            <div className="media-card">
              <h2>Warranty card</h2>
              <div className="warranty">warranty card</div>
            </div>
          </div>
        </div>
        <div className="right-card">
          <div style={{ display: "inline-flex" }}>
            <h3 className="heading">Service Status</h3>
            <Button variant="outlined" className="service-btn">
              <AiOutlineReload className="button-icons" />
              &nbsp;&nbsp; Request order again
            </Button>
          </div>
          <div className="service-status">
              <div className="status-line"></div>
            <div className="status-details">
              {/* <MdShoppingBag /> */}
              <FaShoppingBag className="status-icons1" />
              <p>Service Requested</p>
            </div>
            <div className="status-details">
              <FaUserCheck className="status-icons"  />
              <p>Order Accepted</p>
            </div>
            <div className="status-details">
                <FaWrench className="status-icons"  />
              <p>Service Started</p>
            </div>
            <div className="status-details">
                <GoVerified className="status-icons"  />
              <p>Service Completed</p>
            </div>
            <div className="status-details">
                <RiFeedbackFill className="status-icons"  />
              <p>Feedback</p>
            </div>
          </div>
          <div className="conclusion">
              <p>Is this order completed?</p>
              <div>
            <Button variant="outlined" className="head-cancel-btn">
              <MdCancel className="button-icons" />
              &nbsp;&nbsp; Not Yet
            </Button>
            <Button
              className="head-buttons"
              variant="contained"
              color="primary"
            >
              <MdCheckCircle className="button-icons" />
              &nbsp;&nbsp;Completed
            </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBook;
