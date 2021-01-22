import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Firstslide from "./components/slide1";
import Secondslide from "./components/slide2";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
ReactDOM.render(
  <Firstslide />,document.getElementById('firstslide')
)
ReactDOM.render(
  <Secondslide />,document.getElementById('secondslide')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
