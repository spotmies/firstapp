import React from "react";
import { AiOutlineWhatsApp, AiOutlineYoutube } from "react-icons/ai";
import workImage from "../../../../assets/svgs/speechtotext.svg";

export default function Benefits5() {
  let data = [
    {
      icon: AiOutlineYoutube,
      title: "UI & UX Design",
      color: "#3f3d56",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
    {
      icon: AiOutlineWhatsApp,
      title: "React and Vue",
      color: "#3f3d56",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting",
    },
  ];

  const card = (icon, color, title, desc) => {
    return (
      <div className="benefit5-card">
        <span className="circle-icon-wrapper">
          {React.createElement(icon, { size: "3rem", color: color })}
        </span>
        <p className="shead">{title}</p>
        <p className="description">{desc}</p>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="benefits2">
        <div className="main-content">
          <div className="content">
            <p className="head">Best online course therepy consultantion</p>
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
            <div className="grid-container-2">
              {data.map((item, index) => {
                return (
                  <div key={index}>
                    {card(item.icon, item.color, item.title, item.desc)}
                  </div>
                );
              })}
            </div>
            {/* <div className="grid-container-2">
              <div className="benefit5-card">
                <span className="circle-icon-wrapper">
                  <AiOutlineBuild size="3rem" />
                </span>
                <p className="shead">UI & UX Design</p>
                <p className="description">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente quae
                </p>
              </div>
              <div className="benefit5-card">
                <span className="circle-icon-wrapper">
                  <AiOutlineAreaChart size="3rem" />
                </span>
                <p className="shead">React and Vue</p>
                <p className="description">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente quae
                </p>
              </div>
            </div> */}
          </div>
          <div className="image">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div>
        </div>
      </div>
    </div>
  );
}
