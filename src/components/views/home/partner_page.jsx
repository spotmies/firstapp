import React from "react";
import Benefits2 from "./counts/benefits2";
import Benefits3 from "./counts/Benefits3";
import HowItWorks from "./counts/how_it_works";
import Whyspotmies from "./counts/why_spotmies";
import DownloadMobileApp from "./download_app/download_app";
import "./partner_style.scss";
import ServicesList from "./services_list/services_list";
import PartnerSlide1 from "./slide1/partner_slide1";
import "./style.scss";
import {
  AiOutlineMobile,
  AiOutlineUsergroupAdd,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineNotification,
  AiOutlineYoutube,
} from "react-icons/ai";

import { FiCheckCircle } from "react-icons/fi";

export default function PartnerPage() {
  const downloadAppData = {
    title: "Download Android App",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
    appLink: "https://play.google.com/store/apps/details?id=com.app.app.app",
  };
  const howItWorksData = [
    {
      icon: AiOutlineMobile,
      title: "Request a Service",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: AiOutlineUsergroupAdd,
      title: "Connect to nearest service partner",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: FiCheckCircle,
      title: "Get service done",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
  ];
  const benefit2Data = [
    {
      icon: AiOutlineDashboard,
      title: "Describe your Need",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "Schedule",
      color: "#008fdb",
    },
    {
      icon: AiOutlineCreditCard,
      title: "Connect with partner",
      color: "#008fdb",
    },
    {
      icon: AiOutlineYoutube,
      title: "Get service Done",
      color: "#008fdb",
    },
  ];
  return (
    <div className="partner-page">
      <div className="partner-slide-1 page-slide">
        <PartnerSlide1 />
      </div>
      <div className="partner-slide-2 page-slide">
        <ServicesList />
      </div>
      <div className="partner-slide-3 page-slide">
        <HowItWorks data={howItWorksData} />
      </div>
      <div className="partner-slide-4 page-slide">
        <Benefits3 />
      </div>
      <div className="partner-slide-5 page-slide">
        <Benefits2 data={benefit2Data} />
      </div>
      <div className="partner-slide-6 page-slide">
        <DownloadMobileApp data={downloadAppData} />
      </div>

      <div className="partner-slide-7 page-slide">
        <Whyspotmies />
      </div>
    </div>
  );
}
