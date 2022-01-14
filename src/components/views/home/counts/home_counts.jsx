import React from "react";

import {
  AiOutlineFileDone,
  AiOutlineShop,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";

export default function HomeCounts() {
  const data = [
    {
      icon: AiOutlineFileDone,
      count: "500",
      title: "Orders every day",
      color: "#008fdb",
    },
    {
      icon: AiOutlineUsergroupAdd,
      count: "70",
      title: "Active Users",
      color: "#008fdb",
    },
    {
      icon: AiOutlineShop,
      count: "50",
      title: "Working Partners",
      color: "#008fdb",
    },
  ];

  const componentDiv = (count, description, icon, color) => {
    return (
      <div className="component-div">
        <div className="circle-outer">
          <span className="icon">
            {React.createElement(icon, { size: "3rem", color: color })}
          </span>
        </div>
        <div className="count-section">
          <p className="number-count">{count} +</p>
          <p className="description">{description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="center">
        <div className="home-count">
          <div>
            <p className="head">Our numbers tell more about us</p>
          </div>
          <div className="home-count-parent">
            {data.map((item, index) => {
              return componentDiv(
                item.count,
                item.title,
                item.icon,
                item.color
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
