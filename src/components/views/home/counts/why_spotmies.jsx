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
      title: "Get certification",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      color: "#9cb800",
    },
    {
      icon: AiOutlineUsergroupAdd,
      title: "Get connect with us",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
      color: "#008fdb",
    },
    {
      icon: AiOutlineShop,
      title: "Create your own shop",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting",
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
    <div className="center">
      <div className="why-spotmies">
        <div>
          <p className="head center-text"> Why spotmies</p>
        </div>
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
    </div>
  );
}
