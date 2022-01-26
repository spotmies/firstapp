import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineFileDone,
  AiOutlineShop,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
export default function Whyspotmies() {
  let data = [
    {
      icon: AiOutlineFileDone,
      title: "Ease of Doing Business",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      color: "#9cb800",
    },
    {
      icon: AiOutlineUsergroupAdd,
      title: "Single Platform for all",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      color: "#008fdb",
    },
    {
      icon: AiOutlineShop,
      title: "Create your own shop",
      description:
        "You can add your services list, so customers can get an idea of the basic pricing and services you offer",
      color: "#00b877",
    },
  ];

  const whyCard = (shead, desc, icon, color) => {
    return (
      <div className="whycard">
        <div className="main-icon">
          <span className="icon-wrapper" style={{ backgroundColor: color }}>
            {React.createElement(icon, { size: "3rem", color: "white" })}
          </span>
        </div>
        <div className="why-content">
          <p className="shead">{shead}</p>
          <p className="description">{desc}</p>
        </div>
        <div className="read-more" style={{ color: color }}>
          <p>
            Read more &nbsp;
            <AiOutlineArrowRight />
          </p>
        </div>
      </div>
    );
  };

  return (
    // <div className="center">
    <div className="why-spotmies">
      <div>
        <p className="head center-text home-page-head"> Why Spotmies</p>
      </div>
      <div className="spacer" />
      <div className="whycard-parent space-evenly">
        {data.map((item, index) => {
          return (
            <div key={index} className="center">
              {whyCard(item.title, item.description, item.icon, item.color)}
            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
}
