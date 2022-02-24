import "./App.css";
import React, { useState, useEffect } from "react";
// import { useBeforeunload } from "react-beforeunload";
import useExitPrompt from "./useExitPrompt.js";
// import MyContext from "./MyContext.js";

import { Switch, Route, BrowserRouter, Navigate, Prompt } from "react-router-dom";
import { Observer } from "mobx-react";
import { useStores } from "./components/stateManagement";
import Navibar from "./components/views/navbar/navbar";
import Firstslide from "./components/views/homeSlides/slide1";
import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";
// import postview from "./components/views/viewpost/postview";
import Mybooks from "./components/views/mybookings/mybooks";
import NewBook from "./components/views/viewpost/newBook";
// import chat from "./components/views/chats/chat";
// import chat from "./components/views/chats/responses"; //this is responses
// import chat from "./components/views/newChat/chating"
import chatComponent from "./components/views/chatMui/chat-component";
import signup from "./components/views/signup&profile/signup";
import login from "./components/views/signup&profile/login";
import profile from "./components/views/signup&profile/profile";
import SimpleMap from "./components/views/contacts/contact";
import NewContact from "./components/views/contacts/newContact";
import chatssection from "./components/views/chats/chats-section";
import Rentals from "./components/views/rentals/bikerental";
import pdetails from "./components/views/partnerDetails/pdetails";
import newpost2 from "./components/views/newpost/newpost2";
import editpost2 from "./components/views/editpost/editpost2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import partnerRegistration from "./components/views/homeSlides/partnerRegistration";
import ScrollToTop from "./scrolltotop";
import Privacy from "./components/views/privacyPolicy/privacy";
// import PartnerPrivacy from "./components/views/privacyPolicy/partner-privacy";
import Tab from "./components/views/chatMui/chat";
import Careers from "./components/views/careers/careers";
import SuccessForm from "./components/views/careers/successForm";
import ChatResponseTab from "./components/views/chatMui/chat";
import ProfileWebMobileUi from "./components/views/profile_mobile/profile_mobile";
import Home from "./components/views/homeSlides/home";
import About from "./components/views/about/about";
import NewHome from "./components/views/home/how_it_works/how_it_works";
import LandingUser from "./components/views/homeSlides/newLandingUser";
import Homepage from "./components/views/home/home_page";
import PartnerPage from "./components/views/home/partner_page";
import PartnerStore from "./components/views/partner_store/partner_store";
import UserConfirmation from "./userConfirmation";
import FeedbackForm from "./components/reusable/feedback_form";

function Routing() {
  const { commonStore } = useStores();
  const [isLogin, setIsLogin] = useState(false);
  console.log("commonStore.isLogin", commonStore.isLogin);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", alertUser);
  //   window.addEventListener("unload", handleTabClosing);
  //   return () => {
  //     window.removeEventListener("beforeunload", alertUser);
  //     window.removeEventListener("unload", handleTabClosing);
  //   };
  // });

  // const handleTabClosing = () => {
  //   console.log("event triggered");
  // };

  // const alertUser = (event) => {
  //   event.preventDefault();
  //   event.returnValue = "";
  // };

  return (
    <Observer>
      {() => (
        <>
          <ScrollToTop />
          {isLogin || commonStore.isUserLogin ? (
            /* ----------------------- LOGIN AND LOGOUT USER PATHS ---------------------- */
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/firstapp" component={Firstslide} />
              <Route exact path="/mybookings">
                <Mybooks />
              </Route>
              <Route path="/landing-user" component={LandingUser} />
              <Route path="/newpost" component={newpost2} />
              <Route path="/chat" component={ChatResponseTab} />
              <Route path="/response" component={ChatResponseTab} />
              <Route path="/chats-section" component={chatssection} />
              <Route path="/newChat" component={chatComponent} />

              <Route path="/mybookings/id/edit" component={editpost2} />
              <Route path="/mybookings/id" component={NewBook} />
              <Route path="/contact" component={NewContact} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/pdetails" component={pdetails} />
              <Route
                path="/partnerRegistration"
                component={partnerRegistration}
              />
              <Route path="/privacy" component={Privacy} />
              {/* <Route path="/partner-privacy" component={PartnerPrivacy} /> */}
              <Route path="/tabs" component={Tab} />
              <Route path="/careers" component={Careers} />
              <Route path="/success-form" component={SuccessForm} />
              <Route path="/account" component={ProfileWebMobileUi} />
              <Route path="/about" component={About} />
              <Route path="/newhome" component={NewHome} />
              <Route path="/home-page" component={Homepage} />
              <Route path="/service-partner" component={PartnerPage} />
              <Route path="/store" component={PartnerStore} />
            </Switch>
          ) : (
            /* ---------------------------- LOGOUT USER PATHS --------------------------- */
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/home" component={Homepage} />
              <Route exact path="/firstapp" component={Firstslide} />
              <Route path="/store" component={PartnerStore} />
              <Route path="/about" component={About} />
              <Route path="/newhome" component={NewHome} />
              <Route path="/home-page" component={Homepage} />
              <Route path="/service-partner" component={PartnerPage} />
              <Route path="/newpost" component={newpost2} />
              <Route
                path="/partnerRegistration"
                component={partnerRegistration}
              />
              <Route path="/privacy" component={Privacy} />
              <Route path="/contact" component={NewContact} />
              <Route path="/signup" component={login} />
              <Route path="/careers" component={Careers} />
              <Route path="/success-form" component={SuccessForm} />
              <Route path="/chat" component={login} />
            </Switch>
          )}
        </>
      )}
    </Observer>
  );
}

const theme = createTheme({
  palette: {
    secondary: {
      main: "#008fdb",
      default: "#008fdb",
    },
    primary: {
      main: "#008fdb",
      default: "#008fdb",
    },
  },
});

function App() {
  // useEffect(() => {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return ev.returnValue = "Are you sure you want to close?";
  //   });
  // }, []);

   const [open, setOpen] = useState(false);
   const closeModal = () => {
     setOpen(false);
   };
   const openFeedbackForm = () => {
     setOpen(true);
   };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    window.addEventListener("unload", handleTabClosing);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
      window.removeEventListener("unload", handleTabClosing);
      handleTabClosing();
    };
  }, []);
  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "Would you like to give a feedback?";
    setOpen(true);
  };
  const handleTabClosing = () => {
    console.log("event triggered");
  };

  // const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   setShowExitPrompt(!showExitPrompt);
  // };

  // //NOTE: this similar to componentWillUnmount()
  // useEffect(() => {
  //   return () => {
  //     setShowExitPrompt(false);
  //   };
  // }, []);

 
  
  return (
    <BrowserRouter
    // getUserConfirmation={(message, callback) => {
    //   // this is the default behavior
    //   const allowTransition = window.confirm(message);
    //   UserConfirmation(message, callback)
    //   setIsFormIncomplete(true);
    //   callback(allowTransition);
    // }}
    >
      {/* <Prompt
        when={isFormIncomplete}
        message="Would you like to give a feedback?"
      /> */}
      <MuiThemeProvider>
        <Navibar />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <FeedbackForm open={open} close={closeModal} />;
        <Routing />
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
