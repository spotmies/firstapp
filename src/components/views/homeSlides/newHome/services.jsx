import React from "react";
import "./styles.css";
import { ShopOutlined } from "@ant-design/icons";

function Servcies() {
  return (
    <div>
      <section className="category-section">
        <div className="heading-div">
          <h2>Our Service Category</h2>
        </div>
        <div className="body-div">
          <div className="row-div">
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>

              <h3>Category</h3>
              <p>Service</p>
            </div>
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>

              <h3>Category</h3>
              <p>Service</p>
            </div>
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>

              <h3>Category</h3>
              <p>Service</p>
            </div>
          </div>

          <div className="row-div">
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>

              <div style={{ width: "100%" }}>
                <h3>Category</h3>
                <p>Service</p>
              </div>
            </div>
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>

              <h3>Category</h3>
              <p>Service</p>
            </div>
            <div className="category-cards">
              <div className="icon-div">
                <ShopOutlined className="service-icon" />
              </div>
              <h3>Category</h3>
              <p>Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Servcies;
