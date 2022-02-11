import React from "react";

import Fade from "react-reveal/Fade";

import workImage from "../../../../assets/svgs/programming.svg";

export default function Benefits3(props) {
  const content = props.content;
  const data = props.data;

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
              <p className="head home-page-head">{content.title}</p>
              <p className="description">{content.description}</p>
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
              <img
                src={content.image}
                alt="downloadApp"
                className="image-url"
              />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
