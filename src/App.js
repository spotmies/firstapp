import './App.css';
import React from 'react';
import { Switch, Route,BrowserRouter } from "react-router-dom";
import Navibar from "./components/navbar";
import Firstslide from "./components/slide1";
import postview from "./components/postview";
import Product from "./components/product";
import productlist from "./components/productlist";
import Mybooks from "./components/mybooks";
import newpost from "./components/newpost";
import chat from "./components/chat";
import signup from "./components/signup";
import profile from './components/profile';
import Editpost from './components/editpost';
import SimpleMap from './components/contact';
import chatssection from "./components/chats-section";
import CardExampleCard from './components/bikerental';
import pdetails from './components/pdetails';
import newpost2 from './components/newpost2';
import editpost2 from './components/editpost2'
import nav2 from './components/nav2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import partnerRegistration from './components/partnerRegistration'

const Routing = ()=>{
return(
      <Switch>
      <Route exact path="/" component={Firstslide} />
      <Route exact path="/mybookings"  ><Mybooks />
      </Route>
      <Route path="/cart" component={productlist}/>
      <Route path="/newpost" component={newpost2}/>
      {/* <Route path="/newpost2" component={newpost2}/> */}
      <Route path="/chat" component={chat}/>
      <Route path="/chats-section" component={chatssection}/>
      <Route path="/signup" component={signup}/>
      <Route path="/signup/home" component={Firstslide}/>
      <Route path="/account" component={profile}/>
      {/* <Route path="/mybookings/id/edit" component={Editpost}/> */}
      <Route path="/mybookings/id/edit" component={editpost2}/>
      <Route path="/mybookings/id" component={postview}/>
      <Route path="/contact" component={SimpleMap}/>
      <Route path='/rentals' component={CardExampleCard} />
      <Route path="/pdetails" component={pdetails} />
      <Route path="/nav2" component={nav2} />
      <Route path="/partnerRegistration" component={partnerRegistration}/>
      
    </Switch>
)

}


function App() {
  return (
//  <React.Fragment>
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
    // {/* <Switch>
    //   <Route exact path="/" component={Firstslide} />
    //   <Route path="/mybookings" component={Mybooks} />
    //   <Route path="/cart" component={productlist}/>
    //   <Route path="/newpost" component={newpost}/>
    //   <Route path="/chat" component={chat}/>
    //   <Route path="/signup" component={signup}/>
    //   <Route path="/signup/home" component={Firstslide}/>
    //   <Route path="/profile" component={profile}/>
      
    // </Switch> */}
   
    // </React.Fragment>
   
  
  );
}

export default App;
