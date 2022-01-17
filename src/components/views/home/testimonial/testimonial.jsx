import React from "react";
import { FaLinkedin, FaQuoteLeft } from "react-icons/fa";
import "./testimonial.scss";

export default function Testimonial() {
  const data = [
    {
      quote:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
      name: "John Doe",
      designation: "CEO, XYZ",
      socialMedia: "https://www.linkedin.com/in/john-doe-1b9b7b1a/",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg",
    },
    {
      quote:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
      name: "Mahesh babu",
      designation: "CEO, AMB films",
      socialMedia: "https://www.linkedin.com/in/john-doe-1b9b7b1a/",
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/9/9a/Mahesh_Babu_in_Spyder_%28cropped%29.jpg",
    },
    {
      quote:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.",
      name: "Tony stark",
      designation: "CEO, XYZ",
      socialMedia: "https://www.linkedin.com/in/john-doe-1b9b7b1a/",
      photo:
        "https://i.pinimg.com/736x/db/38/29/db382916e20ffe546ff6e5ae6a1b0de0.jpg",
    },
  ];
  const testimonialCard = ({
    quote,
    name,
    designation,
    photo,
    socialMedia,
  }) => {
    return (
      <div className="testimonial-card">
        <FaQuoteLeft className="icon-color-primary" />
        <p>{quote}</p>
        <div className="testimonial-contact">
          <span className="flex">
            <img className="testimonial-img" src={photo} alt="" />
            <span className="testimonial-name-designation">
              <p className="testimonial-name">{name}</p>
              <p className="testimonial-designation">{designation}</p>
            </span>
          </span>
          {/* linkedin blue */}

          <FaLinkedin
            size="1.4rem"
            className="icon-linkedin testimonial-social-icon"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="center">
      <div className="testimonial">
        <span>
          <p className="head center-text">Hear from our client!</p>
        </span>
        <div className="testmonial-card-parent">
          {data.map((item, index) => {
            return (
              <div className="center" key={index}>
                {testimonialCard(item)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
