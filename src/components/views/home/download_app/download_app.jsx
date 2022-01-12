import React from "react";
import downloadApp from "../../../../assets/images/downloadApp.png";
import { FaGooglePlay } from "react-icons/fa";
export default function DownloadMobileApp() {
  return (
    <>
      <div className="main-content">
        <div className="image">
          <img src={downloadApp} alt="downloadApp" />
        </div>
        <div className="content">
          <p className="head">Download the app</p>
          <p className="description">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable
          </p>
          <div className="playstore">
            <FaGooglePlay size="2rem" />
            <p> Play Store</p>
          </div>
        </div>
      </div>
    </>
  );
}
