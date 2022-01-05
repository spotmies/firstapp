import React from "react";
import "./newbook.css";
import { FaUserCheck, FaShoppingBag, FaWrench } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { RiFeedbackFill } from "react-icons/ri";

function ServiceStatus(props) {
  return (
    <div style={{ position: "relative" }}>
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
          <FaUserCheck className={props.status >= 8 ? "status-icons1" : "status-icons"} />
          <p>Order Accepted</p>
        </div>
        <div className="status-details">
          <FaWrench className={props.status >= 8 ? "status-icons1" : "status-icons"} />
          <p>Service Started</p>
        </div>
        <div className="status-details">
          <GoVerified className={props.status >= 9 ? "status-icons1" : "status-icons"} />
          <p>Service Completed</p>
        </div>
        <div className="status-details">
          <RiFeedbackFill className={props.status >=10 ? "status-icons1" : "status-icons"} />
          <p>Feedback</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
