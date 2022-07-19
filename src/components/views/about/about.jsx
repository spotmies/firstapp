import React from "react";
import group from "./group.jpg";
// import group from "./images/group-image.png";
import sekharImage from "./images/sekhar6.jpeg";
import ank from "./images/ANK.png";
import hemanth from "./images/hemanth_image.jpeg";
import satish from "./images/satish1.jpeg";
import Carouseltimeline from "./Carouseltimeline.js";
import gowri from "./images/gowri_image.jpeg";
import teja from "./images/teja.jpeg";
import "./about.scss";
import { BsLinkedin } from "react-icons/bs";
import FooterBar from "../home/footer_bar/footer_bar";
import {
  satishLinkedin,
  sekharLinkedin,
  naveenLinkedin,
  gowriLinkedin,
  hemanthLinkedin,
  tejaLinkedin,
} from "../../../helpers/redirect";

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <p className="about-head">
          ABOUT &nbsp;<b>SPOTMIES</b>
        </p>
        <p className="about-desc">
          Spotmies aims to be the best of platforms to bring service providers
          and customers together. Our team is working passionately to provide
          the best solutions for the problems faced by customers and service
          providers. We have 50+ service providers covering 10 different
          services to the entire city and selecting more best providers
          ourselves to improve the quality of service. What makes us stand alone
          from our competitors is the problem set we are trying to solve Along
          with additional modifications to the existing solutions. Our team
          believes user data privacy is as important as the quality of service
          and that is what makes our application user's first choice.
        </p>
      </div>
      {/* 
      <div className="about-container">
        <p className="about-head">Vision</p>
        <p className="about-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          optio, incidunt et nam provident exercitationem quo dolor error
          facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum, dicta
          laborum! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Aperiam optio, incidunt et nam provident exercitationem quo dolor
          error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum,
          dicta laborum!Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aperiam optio, incidunt et nam provident exercitationem quo
          dolor error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi.
          Eum, dicta laborum!Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aperiam optio, incidunt et nam provident exercitationem quo
          dolor error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi.
          Eum, dicta laborum!
        </p>
      </div>

      <div className="about-container">
        <p className="about-head">Mission</p>
        <p className="about-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
          optio, incidunt et nam provident exercitationem quo dolor error
          facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum, dicta
          laborum! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Aperiam optio, incidunt et nam provident exercitationem quo dolor
          error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum,
          dicta laborum!Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aperiam optio, incidunt et nam provident exercitationem quo
          dolor error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi.
          Eum, dicta laborum!Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Aperiam optio, incidunt et nam provident exercitationem quo
          dolor error facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi.
          Eum, dicta laborum!
        </p>
      </div> */}
      {/* <section className="desc">
        <div className="desc-img-m">
          <img src={group} alt="meeting" />
        </div>
        <div className="transperent-card">
          <p className="text-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
            optio, incidunt et nam provident exercitationem quo dolor error
            facilis fugit? Qui dignissimos, ipsa quam quaerat ex nisi. Eum,
            dicta laborum!
          </p>
        </div>
        <div className="img-web">
          <img src={group} alt="meeting" />
        </div>
      </section> */}

      <section className="sec2">
        <p className="about-head">
          <u>Meet Our Team</u>
        </p>
        <div className="team-div">
          <div className="desig1">
            <img src={satish} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Satish kumar saride</p>
                <p className="mem-deg">CEO, Co-founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={satishLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
          <div className="desig1">
            <img src={sekharImage} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Sekhar Javvadi</p>
                <p className="mem-deg">CTO, Co-founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={sekharLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
          <div className="desig1">
            <img src={ank} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Naveen kumar</p>
                <p className="mem-deg">Chief Designer, Co-founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={naveenLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
          <div className="desig1">
            <img src={hemanth} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Hemanth veeranala</p>
                <p className="mem-deg">Marketing, Co-founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={hemanthLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="team-div">
          <div className="desig1">
            <img src={hemanth} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Hemanth veeranala</p>
                <p className="mem-deg">Marketing, Co-founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={hemanthLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
          <div className="desig1">
            <img src={gowri} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Gowri shankar</p>
                <p className="mem-deg">Co-Founder</p>
              </div>
              <div className="li-icon-div pointer" onClick={gowriLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
        
          <div className="desig1">
            <img src={teja} alt="name" />
            <div className="desig desig-gwr">
              <div>
                <p className="mem-name">Teja pekala</p>
                <p className="mem-deg">Designation</p>
              </div>
              <div className="li-icon-div pointer" onClick={tejaLinkedin}>
                <BsLinkedin className="li-icon" />
              </div>
            </div>
          </div>
        </div> */}
      </section>

      <section></section>
      {/* <Carouseltimeline /> */}
      <FooterBar />
    </div>
  );
}

export default About;
