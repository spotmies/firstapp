import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navibar from "./components/views/navbar/navbar";
import Firstslide from "./components/views/homeSlides/slide1";
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

const Routing = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Firstslide} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/firstapp" component={Firstslide} />
        <Route exact path="/mybookings">
          <Mybooks />
          {/* <NewBook /> */}
        </Route>
        <Route path="/landing-user" component={LandingUser} />
        <Route path="/newpost" component={newpost2} />
        <Route path="/chat" component={ChatResponseTab} />
        <Route path="/response" component={ChatResponseTab} />
        <Route path="/chats-section" component={chatssection} />
        <Route path="/newChat" component={chatComponent} />
        <Route path="/signup" component={login} />
        <Route path="/mybookings/id/edit" component={editpost2} />
        <Route path="/mybookings/id" component={NewBook} />
        <Route path="/contact" component={SimpleMap} />
        <Route path="/new-contact" component={NewContact} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/pdetails" component={pdetails} />
        <Route path="/partnerRegistration" component={partnerRegistration} />
        <Route path="/privacy" component={Privacy} />
        {/* <Route path="/partner-privacy" component={PartnerPrivacy} /> */}
        <Route path="/tabs" component={Tab} />
        <Route path="/careers" component={Careers} />
        <Route path="/success-form" component={SuccessForm} />
        <Route path="/account" component={ProfileWebMobileUi} />
        <Route path="/about" component={About} />
        <Route path="/newhome" component={NewHome} />
      </Switch>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
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
      <Routing />
    </BrowserRouter>
  );
}

export default App;
