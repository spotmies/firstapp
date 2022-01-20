import "./style.scss";
import React from "react";
import Slide1 from "./slide1/slide1";
import FooterBar from "./footer_bar/footer_bar";
import Benefits2 from "./counts/benefits2";
import Benefits from "./counts/benefits";
import HowItWorks from "./counts/how_it_works";
import Slide2 from "./slide2/slide2";

export default function Homepage() {
  return (
    <div className="home-page">
      <div className="home-slide1 smooth-scroll">
        <Slide1 />
      </div>
      <div className="home-slide2 smooth-scroll">
        <HowItWorks />
      </div>
      <div className="home-slide3 smooth-scroll">
        <Benefits2 />
      </div>
      <div className="home-slide6 center-divy view-hight smooth-scroll"> 
        <Slide2 />
      </div>
      {/* <div className="home-slide4">
        <Benefits />
      </div> */}
      <div className="home-slide5 smooth-scroll">

      </div>
      <div className="home-footer">
        <FooterBar />
      </div>
    </div>
  );
}
