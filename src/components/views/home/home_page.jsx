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
import ShowCard from "./counts/show_card";
import speechtotext from "../../../assets/svgs/speechtotext.svg";
import { useStores } from "../../stateManagement";
import {
  AiOutlineMobile,
  AiOutlineUsergroupAdd,
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineNotification,
  AiOutlineYoutube,
  AiOutlineFileDone,
  AiOutlineSchedule,
  AiOutlineCalendar,
} from "react-icons/ai";
import {
  MdAdminPanelSettings,
  MdChatBubbleOutline,
  MdOutlineConnectWithoutContact,
  MdOutlineNoteAlt,
  MdOutlinePrivacyTip,
} from "react-icons/md";

import { FiCheckCircle } from "react-icons/fi";
import {
  BsBagCheck,
  BsCalendar2Event,
  BsClipboard,
  BsPeople,
} from "react-icons/bs";
export default function Homepage() {
  const { commonStore } = useStores();
  const secondSlideRef = useRef(null);

  const slide1Data = {
    title: "Make Your Life Easy.",
    description:
      "In our Busy running life who wants to stop and go to market and get the service done or to get overwhelmed by the results from the internet? . There should be a source where a well qualified and well reviewed user-firendly service providers. Wondering where can we find them? You have already reached your destination.",
    image: speechtotext,
  };
  const howItWorksData = [
    {
      icon: AiOutlineMobile,
      title: "Request a Service",
      color: "#008fdb",
      desc: "Use our Android App or Website to describe about your required Service, and Select your location to get the best serivce.",
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
      desc: "Wait untill your service provider reaches your location. He will work on your service or in some cases he might take your product to his place and will return back after service done.",
    },
  ];
  const benefits2Content = {
    title: "Easy To Get Service Online",
    description:
      "It's easy to convey your need to us through our platform. We provide you with a platform where you can easily find the best service partner for your service.",
  };
  const benefit2Data = [
    {
      icon: BsClipboard,
      title: "Describe your Need",
      color: "#008fdb",
    },
    {
      icon: BsCalendar2Event,
      title: "Schedule",
      color: "#008fdb",
    },
    {
      icon: BsPeople,
      title: "Connect with partner",
      color: "#008fdb",
    },
    {
      icon: BsBagCheck,
      title: "Get service Done",
      color: "#008fdb",
    },
  ];
  const slide2Data = {
    title: "Get quality professional service",
    description:
      "Never get too tied to search technician on market ,make your work with spotmies now. Lorem Ipsum has been the industry's standard dummy text There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable",
    image: speechtotext,
  };

  const benefitData = [
    {
      icon: MdAdminPanelSettings,
      color: "rgb(0 203 119)",
      bg: "rgb(125 239 192)",
      title: "Secure transaction",
      description: "Cash on service",
    },
    {
      icon: MdChatBubbleOutline,
      color: "#0890ff",
      bg: "#80c6ff",
      title: "Easy Communication",
      description: "In App chating, internet calling",
    },
    {
      icon: MdOutlinePrivacyTip,
      color: "#e3b900",
      bg: "#ffe369",
      title: "Better privacy",
      description: "Choice to share your contact details",
    },
  ];

  const showCardData = {
    title: "Get started with Spotmies Today",
    description:
      "Do not hassle, we help you in expanding your business to the world,",
    buttonText: "Join as service partner",
    buttonLink: "/service-partner",
  };

  useEffect(() => {
    return () => {
      commonStore.setNavBar(true);
    };
  }, []);

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
    <div className="home-page headerrr">
      <ReactScrollWheelHandler
        upHandler={(e) => {
          commonStore.setNavBar(true);
        }}
        downHandler={(e) => {
          commonStore.setNavBar(false);
        }}
      >
        <div className="home-slide1 page-slide">
          <Slide1 data={slide1Data} onClick={scrollToSecondSlide} />
        </div>
        <div className="spacer-mobile" />

        <div
          className="home-slide5 view-hight center-divy page-slide"
          ref={secondSlideRef}
        >
          <ServicesList />
        </div>
        <div className="spacer-mobile" />
        <div className="home-slide2">
          <HowItWorks data={howItWorksData} />
        </div>
        <div className="spacer-mobile" />
        <div className="home-slide3 center-divy page-slide">
          <Benefits2 data={benefit2Data} content={benefits2Content} />
        </div>

        <div className="spacer-mobile" />

        <div className="home-slide6 center-divy view-hight page-slide">
          <Slide2 data={slide2Data} />
        </div>

        <div className="spacer-mobile" />

        <div className="home-slide4">
          <Benefits data={benefitData} />
        </div>

        <div className="spacer-mobile" />

        <div className="home-slide7">
          <div className="spacer" />
          <ShowCard data={showCardData} />
          <div className="spacer" />
        </div>

        <div className="spacer-mobile" />

        <div className="home-footer">
          <FooterBar />
        </div>
      </ReactScrollWheelHandler>
    </div>
  );
}
