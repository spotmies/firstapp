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
import quitting from "../../../assets/svgs/quitting.svg";
import phone_call from "../../../assets/svgs/phone_call.svg";
import expert from "../../../assets/svgs/experts.svg";
import { useStores } from "../../stateManagement";
import { AiOutlineMobile, AiOutlineUsergroupAdd } from "react-icons/ai";
import {
  MdAdminPanelSettings,
  MdChatBubbleOutline,
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
      "In our Busy running life who wants to stop and go to market and get the service done. There should be a source where a well qualified and well reviewed user-firendly service partners. Wondering where can we find them? You have already reached your destination.",
    image: quitting,
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
      title: "Our service partner connect you",
      color: "#008fdb",
      desc: "We recommend you the best service partner who fulfills your request better than any other.",
    },
    {
      icon: FiCheckCircle,
      title: "Get service done",
      color: "#008fdb",
      desc: "Wait untill our service partner reaches your location. He will work on your service or in some cases he might take your product to his place and will return back after service done.",
    },
  ];
  const benefits2Content = {
    title: "Easy To Get Service Online",
    description:
      "It's easy to convey your need to us through our platform. We provide you with a platform where you can easily find the best service partner for your service.",
    image: phone_call,
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
      "We deliver the right service at the right time. Excellence is not achieved without experience. We are here to help you to get the best professional service. When we provide you service we make sure it's worth what you pay for.",
    // description:
    //   "Never get too tied to search service on market, We are here to help you to get the best professional service. You demand, We provide service cause that's what we are here for. When we provide you service we make sure it's worth what you pay for. ",
    image: expert,
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
    title: "Start with Us",
    description:
      "Don't hassle, we help you in expanding your business to the world,",
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
        <div className="home-slide1 page-slide landing-page">
          <Slide1 data={slide1Data} onClick={scrollToSecondSlide} />
        </div>
        <div className="spacer-mobile" />

        <div
          className="home-slide5 center-divy page-slide-web"
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
        {/* <div
          className={`${
            props.userDetails.uId !== undefined
              ? "feedBack fbSlide fab"
              : "feedBack fbSlide"
          }`}
          onClick={() => setOpen(true)}
        >
          {lockst === 1 ? (
            <Fade right>
              <h3 className="fbh3">Feedback</h3>
            </Fade>
          ) : null}
          <span className="iconSpan">
            {" "}
            <MdFeedback className="feedBackIcon" />
          </span>
        </div>
        <FeedbackForm open={open} close={closeModal} /> */}
      </ReactScrollWheelHandler>
    </div>
  );
}
