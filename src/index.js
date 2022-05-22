import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <Router>
    {" "}
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// history.listen((location, action) => {
//   isNavBarOpen = false; //use global variable to manage NavBar isOpen in nested component
// });

// ReactDOM.render(
//   <Firstslide />,document.getElementById('firstslide')
// )
// ReactDOM.render(
//   <Secondslide />,document.getElementById('secondslide')
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
