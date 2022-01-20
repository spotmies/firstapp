import "./style.scss";
import React from "react";
import Slide1 from "./slide1/slide1";
import FooterBar from "./footer_bar/footer_bar";
import Benefits2 from "./counts/benefits2";
import Benefits from "./counts/benefits";

export default function Homepage() {
  return (
    <div className="home-page">
      <div className="home-slide1">
        <Slide1 />
      </div>
      <div className="home-slide3">
        <Benefits2 />
      </div>
      <div className="home-slide4">
        <Benefits />
      </div>
      <div className="home-footer">
        <FooterBar />
      </div>
    </div>
  );
}
