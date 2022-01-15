import React from "react";
import "../style.scss";

import HomeCounts from "../counts/home_counts";
import DownloadMobileApp from "../download_app/download_app";
import Benefits from "../counts/benefits";
import Whyspotmies from "../counts/why_spotmies";
import Benefits2 from "../counts/benefits2";
import {
  AiOutlineCheckCircle,
  AiOutlineMobile,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import Benefits3 from "../counts/Benefits3";
import FooterBar from "../footer_bar/footer_bar";
import Benefits4 from "../counts/benefits4";
function Home() {
  const data = [
    {
      icon: AiOutlineMobile,
      title: "Request a Service",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: AiOutlineUsergroupAdd,
      title: "Connect to nearest partner",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: AiOutlineCheckCircle,
      title: "Get service done",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour",
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
            {React.createElement(icon, { color: color, size: "3rem" })}
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
    <div style={{ paddingTop: "50px" }}>
      <div className="how-it-works">
        <p className="head">How it works</p>

        <div className="childrens">
          {data.map((item, key) => {
            return (
              <div key={key} className="center">
                {children(item.icon, item.color, item.title, item.desc, false)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="spacer" />
      <div className="how-it-works">
        <p className="head">How it works</p>

        <div className="childrens">
          {data.map((item, key) => {
            return (
              <div key={key} className="center">
                {children(item.icon, item.color, item.title, item.desc, true)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="spacer" />
      <Benefits3 />
      <div className="spacer" />
      <HomeCounts />
      <div className="spacer" />
      <Benefits />

      <div className="spacer" />
      <Benefits2 />
      <div className="spacer" />
      <Benefits4 />
      <div className="spacer" />
      <DownloadMobileApp />
      <div className="spacer" />
      <Whyspotmies />

      <div className="spacer" />
      <HomeCounts />
      <div className="spacer" />
      <FooterBar />
    </div>
  );
}

export default Home;
