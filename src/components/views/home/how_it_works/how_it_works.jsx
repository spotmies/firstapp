import React from "react";
import "../style.scss";
import {
  MdOutlineCheckCircleOutline,
  MdOutlinePeopleOutline,
  MdOutlinePhoneIphone,
} from "react-icons/md";
import HomeCounts from "../counts/home_counts";
import DownloadMobileApp from "../download_app/download_app";
import Benefits from "../counts/benefits";
import Whyspotmies from "../counts/why_spotmies";
function Home() {
  return (
    <div style={{ paddingTop: "50px" }}>
      <div className="how-it-works">
        <p className="head">How it works</p>

        <div className="childrens">
          <div className="child1">
            <div className="circle">
              <span className="icon icon1">
                <MdOutlinePhoneIphone size="2.5rem" />
              </span>
            </div>
            <div className="content">
              <p className="shead">Request a Service</p>
              <p className="description">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
          </div>
          <div className="child2">
            {" "}
            <div className="circle">
              <span className="icon icon2">
                <MdOutlinePeopleOutline size="2.5rem" />
              </span>
            </div>
            <div className="content">
              <p className="shead"> Connect to nearest partner</p>
              <p className="description">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
          </div>
          <div className="child3">
            {" "}
            <div className="circle">
              <span className="icon icon3">
                <MdOutlineCheckCircleOutline size="2.5rem" />
              </span>
            </div>
            <div className="content">
              <p className="shead"> Get service done</p>
              <p className="description">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer" />
      <HomeCounts />
      <div className="spacer" />
      <Benefits />

      <div className="spacer" />
      <DownloadMobileApp />
      <div className="spacer" />
      <Whyspotmies />

      <div className="spacer" />
      <HomeCounts />
      <div className="spacer" />
    </div>
  );
}

export default Home;
