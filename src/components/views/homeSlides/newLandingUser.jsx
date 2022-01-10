import React from "react";
import "./landingUser.css";

function LandingUser() {
  return (
    <div>
      <section className="category-section">
        <div className="heading-div">
          <h2>Our Service Category</h2>
        </div>
        <div className="body-div">
          <div>
            <div className="category-cards">
              <p>Service</p>
            </div>
            <div className="category-cards">
              <p>Service</p>
            </div>
            <div className="category-cards">
              <p>Service</p>
            </div>
          </div>

          <div>
            <div className="category-cards">
              <p>Service</p>
            </div>
            <div className="category-cards">
              <p>Service</p>
            </div>
            <div className="category-cards">
              <p>Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingUser;
