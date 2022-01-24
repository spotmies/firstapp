import React from "react";
import downloadApp from "../../../../assets/images/downloadApp.png";
import { FaGooglePlay } from "react-icons/fa";
export default function DownloadMobileApp(props) {
  const data = props.data;
  return (
    <>
      <div className="main-content">
        <div className="image">
          <img src={downloadApp} alt="downloadApp" />
        </div>
        <div className="content">
          <p className="head home-page-head">{data.title}</p>
          <p className="description">{data.description}</p>
          <div className="playstore">
            <FaGooglePlay size="2rem" />
            <p> Play Store</p>
          </div>
        </div>
      </div>
    </>
  );
}
