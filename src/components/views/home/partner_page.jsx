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
  AiOutlineCreditCard,
  AiOutlineDashboard,
  AiOutlineNotification,
  AiOutlineYoutube,
  AiOutlineInbox,
} from "react-icons/ai";
import {
  MdOutlinePermPhoneMsg,
  MdOutlineQuickreply,
  MdOutlineStore,
} from "react-icons/md";
import { BsGlobe } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { useStores } from "../../stateManagement";
import FooterBar from "./footer_bar/footer_bar";
import NewsLetter from "./counts/subscribe_newsletter";
import PartnerRegistrationForm from "./partner_registration_form/registration_form";

// import images
import note_list from "../../../assets/svgs/note_list.svg";
import easy_to_use from "../../../assets/svgs/it-is-easy-to-use.svg";
// import work_rocket from "../../../assets/images/Work_7.png";
import work_rocket from "../../../assets/svgs/start-your-online-business-today-1.svg";

import confirmed from "../../../assets/svgs/confirmed.svg";
// import choose_us from "../../../assets/images/why.png";
import choose_us from "../../../assets/svgs/why-you-choose-us.svg";

export default function PartnerPage() {
  const { commonStore } = useStores();
  const secondSlideRef = useRef(null);
  const downloadAppData = {
    title: "Download Android App",
    description:
      "Get spotmies partner App. Register with your mobile number. Signup by giving basic details, add your service, get work recommendations based on your location preferences, Do the service and get the money. That's it.",
    link: "play.google.com/store/apps/details?id=com.spotmiespartner",
  };
  const howItWorksData = [
    {
      icon: AiOutlineInbox,
      title: "Get service Request",
      color: "#008fdb",
      desc: "Specify your work profession during Registration. Get the order recommendations from your selected profession and location.",
    },
    {
      icon: MdOutlinePermPhoneMsg,
      iconSize: 4.5,
      title: "Connect with Customer",
      color: "#008fdb",
      desc: "There are more ways than ever to interact with your customers. Chat, call, etc.",
    },
    {
      icon: BiRupee,
      title: "Earn Money",
      color: "#008fdb",
      desc: "Complete the work and get paid for your valuable skills and hard work.",
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
      "You can track your earnings, orders, and payments from your dashboard. You can also get notifications for new orders and payments. Connect to customers with in-app messaging & calling. Hassle-free payments, cost-effective promotions",
    image: easy_to_use,
  };

  const benefit3Data = [
    {
      icon: BsGlobe,
      title: "No websites Required",
      color: "#008fdb",
    },
    {
      icon: AiOutlineNotification,
      title: "No marketing Required",
      color: "#008fdb",
    },
    {
      icon: MdOutlineStore,
      title: "Create your online Store",
      color: "#008fdb",
    },
    {
      icon: MdOutlineQuickreply,
      title: "Connect with your customers",
      color: "#008fdb",
    },
  ];

  const benefit3Content = {
    title: "Why choose Us",
    description:
      "  No need for world tours, we provide service orders near you. But we won't limit you. No marketing and advertising are needed. We will look after that for you.",
    image: choose_us,
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
          <PartnerSlide1 onClick={scrollToSecondSlide} image={work_rocket} />
        </div>

        <div className="partner-slide-2 page-slide-web" ref={secondSlideRef}>
          <ServicesList />
        </div>

        <div className="spacer-mobile" />
        <div className="spacer-mobile" />

        <div className="partner-slide-3 page-slide-web">
          <HowItWorks data={howItWorksData} />
        </div>

        <div className="partner-slide-4 page-slide-web">
          <Benefits3 data={benefit3Data} content={benefit3Content} />
        </div>

        <div className="spacer-mobile" />

        <div className="partner-slide-5 page-slide-web">
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
