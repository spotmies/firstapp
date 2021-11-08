import React from "react";
import "../../../assets/css/careers.css";

import {
   MdCheckCircle,
} from "react-icons/md";
import redirectToAnotherPage from "../../../helpers/redirect";
export default function SuccessForm() {
  console.log("SuccessForm");
  return (
    <div className="success-div">
      <div className="success-card">
      <MdCheckCircle size="5rem" color="green"/>
      <h2>Form submitted Successfully.</h2>
      <h3>Thank you for applying. We will get back to you soon.</h3>
      <h3 onClick={() => {window.location.reload()}} style={{ cursor: "pointer", color:"blueviolet"}}>Submit another response</h3>
      <small>for more information reach out at  <a onClick={(e) => {redirectToAnotherPage("mail.google.com")}} target="blank" style={{ cursor: "pointer" }}><b>info@spotmies.com</b></a></small>
      </div>
    </div>
  );
}
