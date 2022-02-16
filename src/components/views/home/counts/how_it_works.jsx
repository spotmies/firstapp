import React from "react";
import "../style.scss";
import Fade from "react-reveal/Fade";
export default function HowItWorks(props) {
  const data = props.data;

  const children = (icon, color, title, desc, isBackground, iconSize) => {
    return (
      <div
        className={
          isBackground == true ? "child1 background-container" : "child1"
        }
      >
        <div className={isBackground ? "background-circle" : "circle"}>
          <span className="icon">
            {React.createElement(icon, {
              color: color,
              // color: "#696969",
              size:
                iconSize != null || iconSize != undefined
                  ? `${iconSize}rem`
                  : "5rem",
            })}
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
    <Fade>
      <div className="how-it-works">
        <p className="head home-page-head">How it works</p>
        <div className="spacer" />
        <div className="parent">
          {data.map((item, key) => {
            return (
              <div key={key}>
                {children(
                  item.icon,
                  item.color,
                  item.title,
                  item.desc,
                  true,
                  item.iconSize
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Fade>
  );
}
