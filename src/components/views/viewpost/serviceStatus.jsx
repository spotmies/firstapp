import React from "react";
import './newbook.css';
import { FaUserCheck, FaShoppingBag, FaWrench } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { RiFeedbackFill } from "react-icons/ri";


function ServiceStatus() {
  return (
    <div style={{position:"relative"}}>
      <div className="service-status">
        <div className="status-line1">
          <div className="status-line"></div>
        </div>
        <div className="status-details">
          {/* <MdShoppingBag /> */}
          <FaShoppingBag className="status-icons1" />
          <p>Service Requested</p>
        </div>
        <div className="status-details">
          <FaUserCheck className="status-icons" />
          <p>Order Accepted</p>
        </div>
        <div className="status-details">
          <FaWrench className="status-icons" />
          <p>Service Started</p>
        </div>
        <div className="status-details">
          <GoVerified className="status-icons" />
          <p>Service Completed</p>
        </div>
        <div className="status-details">
          <RiFeedbackFill className="status-icons" />
          <p>Feedback</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
