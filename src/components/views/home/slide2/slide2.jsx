import React from "react";
import Fade from "react-reveal/Fade";
export default function Slide2(props) {
  return (
    <Fade>
      <div className="center">
        <div className="benefits2 slide-1 slide-2">
          <div className="main-content">
            <div className="content">
              <p className="head home-page-head">{props.data.title}</p>
              <div className="spacer-span" />
              <img src={props.data.image} className="slide2-image" alt="" />
              <div className="spacer-span" />
              <p className="description">{props.data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
