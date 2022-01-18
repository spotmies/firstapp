import React from "react";
import group from "./group.jpg";
import gunta1 from "./gunta1.jpg";
import gunta2 from "./gunta2.jpg";
import gunta3 from "./gunta3.jpg";
import gunta4 from "./gunta4.jpg";
import gunta5 from "./gunta5.jpg";
import gunta6 from "./gunta6.jpg";
import "./about.css";
import { BsLinkedin } from "react-icons/bs";
import FooterBar from "../home/footer_bar/footer_bar";

function About() {
  return (
    <div>
      <section className="desc">
        <div>
          <p className="text-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            optio, incidunt et nam provident exercitationem quo dolor error
            facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum,
            dicta laborum!
          </p>
        </div>
        <div>
          <img src={group} alt="meeting" />
        </div>
      </section>

      <section className="sec2">
        <h2>Meet Our Team</h2>
        <div className="team-div">
          <div className="desig1">
            <img src={gunta1} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
          <div className="desig1">
            <img src={gunta2} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
          <div className="desig1">
            <img src={gunta3} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
        </div>
        <div className="team-div">
          <div className="desig1">
            <img src={gunta4} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
          <div className="desig1">
            <img src={gunta5} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
          <div className="desig1">
            <img src={gunta6} alt="name" />
            <div className="desig">
              <p>Name</p>
              <p>Designation</p>
            </div>
            <div className="Li-hover">
              <BsLinkedin className="li-icon" />
            </div>
          </div>
        </div>
      </section>

      <section></section>
      <FooterBar />
    </div>
  );
}

export default About;
