import React from "react";
import Fade from "react-reveal/Fade";
import workImage from "../../../../assets/svgs/work_progress.svg";

export default function Benefits2(props) {
  const data = props.data;
  const content = props.content;

  const card = (icon, color, title) => {
    return (
      <div className="small-card">
        {React.createElement(icon, {
          size: "2.2rem",
          color: color,
          className: "horizontal-spacer",
        })}
        <p className="shead2">{title}</p>
      </div>
    );
  };

  return (
    <Fade>
      <div className="center">
        <div className="benefits2">
          <div className="main-content">
            <div className="image easy-image">
              <img
                src={content.image}
                alt="downloadApp"
                className="image-url"
              />
            </div>
            <div className="content">
              <p className="head home-page-head">{content.title}</p>
              <div className="image mImage">
                <img
                  src={content.image}
                  alt="downloadApp"
                  className="image-url"
                />
              </div>
              <p className="description">{content.description}</p>
              <div className="grid-container-2">
                {data.map((item, index) => {
                  return (
                    <div className="center" key={index}>
                      {card(item.icon, item.color, item.title)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
