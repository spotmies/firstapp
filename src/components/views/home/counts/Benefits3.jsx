import React from "react";
import {
  AiOutlineBook,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineNotification,
} from "react-icons/ai";
import { BsWordpress } from "react-icons/bs";
import workImage from "../../../../assets/svgs/programming.svg";

export default function Benefits3(props) {
  let data = [
    {
      icon: BsWordpress,
      title: "No websites business",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "No marketing business",
      color: "#008fdb",
    },
    {
      icon: AiOutlineCreditCard,
      title: "Easy payments business",
      color: "#008fdb",
    },
  ];

  const card = (icon, color, title) => {
    return (
      <div className="mid-card">
        {React.createElement(icon, {
          size: "2.2rem",
          color: color,
          className: "horizontal-spacer",
        })}
        {/* <span className="horizontal-spacer" /> */}
        <p className="shead2">{title}</p>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="benefits2">
        <div className="main-content">
          <div className="content">
            <p className="head">Why you choose Us</p>
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
            <div>
              {data.map((item, index) => {
                return (
                  <div className="center" key={index}>
                    {card(item.icon, item.color, item.title)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="image">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div>
        </div>
      </div>
    </div>
  );
}
