import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineFileDone,
  AiOutlineShop,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { MdOutlineQuickreply, MdOutlineStore } from "react-icons/md";
import Fade from "react-reveal/Fade";
export default function Whyspotmies() {
  let data = [
    {
      icon: MdOutlineStore,
      title: "Platform for Business",
      description:
        "You can manage all your business things like earnings, orders, payments, customers, products, reviews and more.",
      color: "#9cb800",
    },
    {
      icon: MdOutlineQuickreply,
      title: "Connect with your customers",
      description:
        "There are more ways than ever to interact with your customers.",
      color: "#008fdb",
    },
    {
      icon: AiOutlineShop,
      title: "Maintain your online store",
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
    <Fade>
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
    </Fade>
    // </div>
  );
}
