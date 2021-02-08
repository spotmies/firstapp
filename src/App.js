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


const Routing = ()=>{
return(
      <Switch>
      <Route exact path="/" component={Firstslide} />
      <Route exact path="/mybookings"  ><Mybooks />
      </Route>
      <Route path="/cart" component={productlist}/>
      <Route path="/newpost" component={newpost}/>
      <Route path="/chat" component={chat}/>
      <Route path="/signup" component={signup}/>
      <Route path="/signup/home" component={Firstslide}/>
      <Route path="/profile" component={profile}/>
      <Route path="/mybookings/id" component={postview}/>
      
    </Switch>
)

}


function App() {
  return (
//  <React.Fragment>
<BrowserRouter>
  <Navibar />
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
