import './App.css';
import React from 'react';
import { Switch, Route } from "react-router-dom";
import Navibar from "./components/navbar";
import Firstslide from "./components/slide1";
import Navbar2 from "./components/navbar2";
import Product from "./components/product";
import productlist from "./components/productlist";
import Mybooks from "./components/mybooks";
import newpost from "./components/newpost";
import chat from "./components/chat";
import signup from "./components/signup";

function App() {
  return (
 <React.Fragment>
  <Navibar />
    <Switch>
      <Route exact path="/" component={Firstslide} />
      <Route path="/mybookings" component={Mybooks} />
      <Route path="/cart" component={productlist}/>
      <Route path="/newpost" component={newpost}/>
      <Route path="/chat" component={chat}/>
      <Route path="/signup" component={signup}/>
      <Route path="/signup/home" component={Firstslide}/>
      
    </Switch>
   
    </React.Fragment>
   
  
  );
}

export default App;
