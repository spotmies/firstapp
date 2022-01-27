import React from "react";
import downloadApp from "../../../../assets/images/partnerAppUi.png";
import { FaGooglePlay } from "react-icons/fa";
import { redirectToPartnerApp } from "../../../../helpers/redirect";
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
          <div className="playstore" onClick={redirectToPartnerApp}>
            <FaGooglePlay size="2rem" />
            <p> Play Store</p>
          </div>
        </div>
      </div>
    </>
  );
}
