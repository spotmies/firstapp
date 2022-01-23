import "./style.scss";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";

import React, { useRef } from "react";
import Slide1 from "./slide1/slide1";
import FooterBar from "./footer_bar/footer_bar";
import Benefits2 from "./counts/benefits2";
import Benefits from "./counts/benefits";
import HowItWorks from "./counts/how_it_works";
import Slide2 from "./slide2/slide2";
import { useEffect } from "react";
import ServicesList from "./services_list/services_list";

export default function Homepage() {
  //   const section1Ref = useRef(null);

  // useEffect(() => {
  // window.onscroll = function() {
  //   console.log(window.pageYOffset, section1Ref.current.offsetTop, section1Ref.current.offsetHeight, window.innerHeight, window.pageYOffset + window.innerHeight);
  //   if (window.pageYOffset > section1Ref.current.offsetTop) {
  //     section1Ref.current.classList.add("sticky");
  //   } else {
  //     section1Ref.current.classList.remove("sticky");
  //   }

  // }}, []);

  // const scrollUp =()=>{

  // }

  return (
    <div className="home-page headerrr">
      {/* <ReactScrollWheelHandler
  upHandler={(e) => scrollUp()}
  downHandler={(e) => console.log("scroll down")}
> */}
      <div className="home-slide1">
        <Slide1 />
      </div>
      <div className="home-slide2">
        <HowItWorks />
      </div>
      <div className="home-slide3" id="toBeScrolledTo">
        <Benefits2 />
      </div>
      <div className="home-slide6 center-divy view-hight">
        <Slide2 />
      </div>
      {/* <div className="home-slide4">
        <Benefits />
      </div> */}
      <div className="home-slide5 view-hight center-divy">
        <ServicesList />
      </div>
      <div className="home-footer">
        <FooterBar />
      </div>
      {/* </ReactScrollWheelHandler> */}
    </div>
  );
}
