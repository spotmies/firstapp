import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navibar from "./components/navbar/navbar";
import Firstslide from "./components/homeSlides/slide1";
import postview from "./components/viewpost/postview";
import Mybooks from "./components/mybookings/mybooks";
import chat from "./components/chats/chat";
import signup from "./components/signup&profile/signup";
import profile from "./components/signup&profile/profile";
import SimpleMap from "./components/contacts/contact";
import chatssection from "./components/chats/chats-section";
import Rentals from "./components/rentals/bikerental";
import pdetails from "./components/partnerDetails/pdetails";
import newpost2 from "./components/newpost/newpost2";
import editpost2 from "./components/editpost/editpost2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import partnerRegistration from "./components/homeSlides/partnerRegistration";
import ScrollToTop from "./scrolltotop";
import Privacy from "./components/privacyPolicy/privacy";

const Routing = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Firstslide} />
        <Route exact path="/firstapp" component={Firstslide} />
        <Route exact path="/mybookings">
          <Mybooks />
        </Route>
        <Route path="/newpost" component={newpost2} />
        <Route path="/chat" component={chat} />
        <Route path="/chats-section" component={chatssection} />
        <Route path="/signup" component={signup} />
        <Route path="/account" component={profile} />
        <Route path="/mybookings/id/edit" component={editpost2} />
        <Route path="/mybookings/id" component={postview} />
        <Route path="/contact" component={SimpleMap} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/pdetails" component={pdetails} />
        <Route path="/partnerRegistration" component={partnerRegistration} />
        <Route path="/privacy" component={Privacy} />
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
