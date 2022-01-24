import React from "react";
import Benefits2 from "./counts/benefits2";
import Benefits3 from "./counts/Benefits3";
import HowItWorks from "./counts/how_it_works";
import DownloadMobileApp from "./download_app/download_app";
import "./partner_style.scss";
import ServicesList from "./services_list/services_list";
import PartnerSlide1 from "./slide1/partner_slide1";
import "./style.scss";

export default function PartnerPage() {
  const downloadAppData = {
    title: "Download Android App",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
    appLink: "https://play.google.com/store/apps/details?id=com.app.app.app",
  };

  return (
    <div className="partner-page">
      <div className="partner-slide-1 page-slide">
        <PartnerSlide1 />
      </div>
      <div className="partner-slide-2 page-slide">
        <ServicesList />
      </div>
      <div className="partner-slide-3 page-slide">
        <HowItWorks />
      </div>
      <div className="partner-slide-4 page-slide">
        <Benefits3 />
      </div>
      <div className="partner-slide-5 page-slide">
        <Benefits2 />
      </div>
      <div className="partner-slide-6 page-slide">
        <DownloadMobileApp data={downloadAppData} />
      </div>
    </div>
  );
}
