import React from "react";
import {
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineNotification,
  AiOutlineYoutube,
} from "react-icons/ai";
import workImage from "../../../../assets/svgs/work_progress.svg";

export default function Benefits2() {
  let data = [
    {
      icon: AiOutlineDashboard,
      title: "Describe your Need",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "Schedule",
      color: "#008fdb",
    },
    {
      icon: AiOutlineCreditCard,
      title: "Connect with partner",
      color: "#008fdb",
    },
    {
      icon: AiOutlineYoutube,
      title: "Get service Done",
      color: "#008fdb",
    },
  ];

  const card = (icon, color, title) => {
    return (
      <div className="small-card">
        {React.createElement(icon, {
          size: "2.2rem",
          color: color,
          className: "horizontal-spacer",
        })}
        <p className="shead2">{title}</p>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="benefits2">
        <div className="main-content">
          <div className="image easy-image">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div>
          <div className="content">
            <p className="head home-page-head">Easy to Convey</p>
            <div className="image mImage">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div>
            <p className="description">
              It's easy to convey your need to us through our platform. We
              provide you with a platform where you can easily find the best
              service partner for your need.
            </p>
            <div className="grid-container-2">
              {data.map((item, index) => {
                return (
                  <div className="center" key={index}>
                    {card(item.icon, item.color, item.title)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
