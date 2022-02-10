import React from "react";
import "./newbook.scss";
import { FaUserCheck, FaShoppingBag, FaWrench } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { RiFeedbackFill } from "react-icons/ri";

function ServiceStatus(props) {
  const getHeight = () => {
    switch (props.status) {
      case 0:
      case 1:
      case 2:
        return "10";
      case 8:
        return "30";
      case 5:
        return "50";
      case 9:
        return "80";
      case 6:
        return "70";
      case 10:
        return "100";
      default:
        return "10";
        break;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="service-status">
        <div className="status-line1">
          <div
            className="status-line"
            style={{ height: `${getHeight()}%` }}
          ></div>
        </div>
        <div className="status-details">
          {/* <MdShoppingBag /> */}

          <FaShoppingBag className="status-icons1" />
          <p>Service Requested</p>
        </div>

        <div className="status-details">
          <FaUserCheck
            className={props.status >= 5 ? "status-icons1" : "status-icons"}
          />
          <p>Order Accepted</p>
        </div>
        <div className="status-details">
          <FaWrench
            className={props.status >= 6 ? "status-icons1" : "status-icons"}
          />
          <p>Service Started</p>
        </div>
        <div className="status-details">
          <GoVerified
            className={props.status >= 9 ? "status-icons1" : "status-icons"}
          />
          <p>Service Completed</p>
        </div>
        <div className="status-details">
          <RiFeedbackFill
            className={props.status >= 10 ? "status-icons1" : "status-icons"}
          />
          <p>Feedback</p>
        </div>
      </div>
    </div>
  );
}

export default ServiceStatus;
