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
      title: "Daily work progress",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "Daily notifications",
      color: "#008fdb",
    },
    {
      icon: AiOutlineCreditCard,
      title: "Pay on delivery",
      color: "#008fdb",
    },
    {
      icon: AiOutlineYoutube,
      title: "Learn skills",
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
          <div className="image">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div>
          <div className="content">
            <p className="head">Best online course therepy consultantion</p>
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
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
