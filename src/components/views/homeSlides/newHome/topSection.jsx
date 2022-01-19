import React from "react";
import girl from "./girl1.jpg";

function TopSection() {
  return (
    <div className="topMain">
      <div className="top-main">
        <div className="top-div txt-div">
          <h2>Life Should Be Easy</h2>
          <p className="web-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            dolor nemo distinctio delectus quia repellat praesentium a numquam
            sapiente? Ipsa itaque consectetur vitae voluptatibus nihil, nostrum
            enim voluptate rerum dolorum!
          </p>
        </div>
        <div className="top-div">
          <img src={girl} alt="girl" className="girl-img" />
        </div>
        <div className="mobile-div">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, esse
            nulla? Ab culpa sint aspernatur atque dolore exercitationem.
            Voluptatem ipsam sint cumque mollitia! In inventore autem ex dicta,
            corporis omnis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
