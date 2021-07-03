import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navibar from "./components/views/navbar/navbar";
import Firstslide from "./components/views/homeSlides/slide1";
import postview from "./components/views/viewpost/postview";
import Mybooks from "./components/views/mybookings/mybooks";
// import chat from "./components/views/chats/chat";
// import chat from "./components/views/chats/responses"; //this is responses
import chat from "./components/views/newChat/chating"
import signup from "./components/views/signup&profile/signup";
import login from "./components/views/signup&profile/login";
import profile from "./components/views/signup&profile/profile";
import SimpleMap from "./components/views/contacts/contact";
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
        <Route path="/signup" component={login} />
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
