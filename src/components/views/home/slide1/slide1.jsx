import React from "react";
import Fade from "react-reveal/Fade";
export default function Slide1(props) {
  const data = props.data;
  return (
    <Fade>
      <div className="center">
        <div className="benefits2 slide-1">
          <div className="main-content">
            <div className="content">
              <p className="head home-page-head">{data.title}</p>
              <div className="spacer-span" />
              <img src={data.image} className="slide1Img" />
              <div className="spacer-span" />
              <p className="description">{data.description}</p>
              <div className="get-started-btn" onClick={props.onClick}>
                <span>
                  <p>Get started</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
