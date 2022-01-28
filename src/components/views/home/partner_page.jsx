import React, { useRef } from "react";
import ReactScrollWheelHandler from "react-scroll-wheel-handler";
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
  AiOutlineInbox,
} from "react-icons/ai";

import { FiCheckCircle } from "react-icons/fi";
import { useStores } from "../../stateManagement";
import FooterBar from "./footer_bar/footer_bar";
import NewsLetter from "./counts/subscribe_newsletter";
import PartnerRegistrationForm from "./partner_registration_form/registration_form";

export default function PartnerPage() {
  const { commonStore } = useStores();
  const secondSlideRef = useRef(null);
  const downloadAppData = {
    title: "Download Android App",
    description:
      "Get spotmies partner App. Register with your mobile number. Signup by giving basic details, add your service, get work recommendations based on your location preferences, Do the service and get the money. That's it.",
    appLink: "https://play.google.com/store/apps/details?id=com.app.app.app",
  };
  const howItWorksData = [
    {
      icon: AiOutlineMobile,
      title: "Register on Partner App",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: AiOutlineInbox,
      title: "Get Orders",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
    {
      icon: FiCheckCircle,
      title: "Complete your order",
      color: "#008fdb",
      desc: "There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form, by injected humour. the majority have suffered alteration in some form, by injected humour",
    },
  ];
  const benefit2Data = [
    {
      icon: AiOutlineDashboard,
      title: "Track your Orders",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "Orders from your Locality",
      color: "#008fdb",
    },
    {
      icon: AiOutlineCreditCard,
      title: "Hassle free Payments",
      color: "#008fdb",
    },
    {
      icon: AiOutlineYoutube,
      title: "Learn New Skills",
      color: "#008fdb",
    },
  ];
  const benefits2Content = {
    title: "It's Easy To Use",
    description:
      "It's easy to convey your need to us through our platform. We provide you with a platform where you can easily find the best service partner for your service.",
  };

  const scrollToSecondSlide = () => {
    secondSlideRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    setTimeout(() => {
      commonStore.setNavBar(false);
    }, 800);
  };

  return (
    <div className="partner-page">
      <ReactScrollWheelHandler
        upHandler={(e) => {
          commonStore.setNavBar(true);
        }}
        downHandler={(e) => {
          commonStore.setNavBar(false);
        }}
      >
        <div className="partner-slide-1 page-slide-web landing-page">
          <PartnerSlide1 onClick={scrollToSecondSlide} />
        </div>

        <div className="partner-slide-2 page-slide" ref={secondSlideRef}>
          <ServicesList />
        </div>
        <div className="spacer-mobile" />
        <div className="spacer-mobile" />
        <div className="partner-slide-3 page-slide-web">
          <HowItWorks data={howItWorksData} />
        </div>
        <div className="partner-slide-4 page-slide">
          <Benefits3 />
        </div>
        <div className="spacer-mobile" />
        <div className="partner-slide-5 page-slide">
          <Benefits2 data={benefit2Data} content={benefits2Content} />
        </div>
        <div className="spacer-mobile" />
        <div className="partner-slide-6 page-slide-web">
          <DownloadMobileApp data={downloadAppData} />
        </div>
        <div className="spacer-mobile" />
        <div className="partner-slide-7 page-slide-web">
          <Whyspotmies />
        </div>
        <div className="partner-slide-8 page-slide-web">
          <div className="partner-slide-8-sub">
            <p className="head home-page-head">Register as a Service Partner</p>
            <PartnerRegistrationForm />
          </div>
        </div>
        <div>
          <div className="spacer" />
          <NewsLetter />
          <div className="spacer" />
        </div>
        <div>
          <FooterBar />
        </div>
      </ReactScrollWheelHandler>
    </div>
  );
}
