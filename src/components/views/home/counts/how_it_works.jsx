import React from "react";
import "../style.scss";
import { AiOutlineMobile, AiOutlineUsergroupAdd } from "react-icons/ai";

import { FiCheckCircle } from "react-icons/fi";
export default function HowItWorks() {
  const data = [
    {
      icon: AiOutlineMobile,
      title: "Request a Service",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: AiOutlineUsergroupAdd,
      title: "Connect to nearest partner",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: FiCheckCircle,
      title: "Get service done",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
  ];

  const children = (icon, color, title, desc, isBackground) => {
    return (
      <div
        className={
          isBackground == true ? "child1 background-container" : "child1"
        }
      >
        <div className={isBackground ? "background-circle" : "circle"}>
          <span className="icon">
            {React.createElement(icon, { color: color, size: "5rem" })}
          </span>
        </div>
        <div className="content">
          <p className="shead">{title}</p>
          <p className="description">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="how-it-works">
      <p className="head home-page-head">How it works</p>
      <div className="spacer" />
      <div className="parent">
        {data.map((item, key) => {
          return (
            <div key={key}>
              {children(item.icon, item.color, item.title, item.desc, true)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
