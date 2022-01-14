import React from "react";
import chick from "./hot-girl.jpg";
import card from "./card.jpg";

function Secure() {
  return (
    <div>
      <section className="secure-section">
        <div className="secure-pic">
          <img src={chick} className="chick-img" alt="chick" />
        </div>
        <div className="secure-body-div">
          <h2>Completely secure!</h2>
          <div className="secure-desc">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reiciendis
            sed fuga quibusdam a possimus incidunt ad iusto vel fugiat aperiam
            dignissimos odit ipsam, molestias quia deserunt impedit et earum
            voluptates?
          </div>
          <div className="secure-card-holder">
            <div className="secure-card">
              <img src={card} alt="card" className="secure-card-img" />
              <h3>Secure 1</h3>
              <p>
                Everything is nothing but nothing is not everything. Happy
                birthday.
              </p>
            </div>
            <div className="secure-card">
              <img src={card} alt="card" className="secure-card-img" />
              <h3>Secure 2</h3>
              <p>
                Everything is nothing but nothing is not everything. Happy
                birthday.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Secure;
