import React from "react";
import workImage from "../../../../assets/svgs/speechtotext.svg";
import slide1Img from "../../../../assets/svgs/speechtotext.svg";
export default function Slide1() {
  return (
    <div className="center">
      <div className="benefits2 slide-1">
        <div className="main-content">
          <div className="content">
            <p className="head home-page-head">Life Should Be Easy.</p>
            <div className="spacer-span" />
            <img src={slide1Img} className="slide1Img" />
            <div className="spacer-span" />
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
            <div className="get-started-btn">
              <span>
                <p>Get started</p>
              </span>
            </div>
          </div>
          {/* <div className="image">
            <img src={workImage} alt="downloadApp" className="image-url" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
