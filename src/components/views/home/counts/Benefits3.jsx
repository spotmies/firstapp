import React from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";
import Fade from "react-reveal/Fade";
import { MdOutlineQuickreply, MdOutlineStore } from "react-icons/md";
import workImage from "../../../../assets/svgs/programming.svg";
// import workImage from "../../../../assets/images/sp10.jpg";

export default function Benefits3(props) {
  let data = [
    {
      icon: BsGlobe,
      title: "No websites Required",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "No marketing Required",
      color: "#008fdb",
    },
    {
      icon: MdOutlineStore,
      title: "Create your online Store",
      color: "#008fdb",
    },
    {
      icon: MdOutlineQuickreply,
      title: "Connect with your customers",
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
    <Fade>
      <div className="center">
        <div className="benefits2">
          <div className="main-content">
            <div className="content">
              <p className="head home-page-head">Why you choose Us</p>
              <p className="description">
                No need for world tours, we provide service orders near you. But
                we won't limit you. No marketing and advertising are needed. We
                will look after that for you.
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
    </Fade>
  );
}
