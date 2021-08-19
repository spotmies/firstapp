import React, { Component } from "react";
import { Avatar, Badge } from "@material-ui/core";

import "./profile_mobile.css";
import { MdShare, MdStar, MdNavigateNext } from "react-icons/md";
export default class ProfileMobileUi extends Component {
  onclick = () => {};
  settingsCard = (title, iconss) => {
    return (
      <div className="settings-card" onClick={onclick}>
        <div className="card-elements">
          <div className="setting-name">
            <span>{iconss}</span>

            <h3>{title}</h3>
          </div>
          <span>
            <MdNavigateNext size="2rem" />
          </span>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="profile-card">
          <div className="profile">
            <Avatar
              className="profile-avatar"
              alt="Travis Howard"
              src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
            />
            <div className="profile-name">
              <h3>Prabhas Uppalapati</h3>
              <p>prabashupalapada@gmail.com</p>
            </div>
          </div>
          <div className="info">
            <div className="money">
              <h3>123</h3>
              <p>
                <small>Total Savings</small>
              </p>
            </div>
            <div className="line"></div>
            <div className="orders">
              <h3>24</h3>
              <p>
                <small>Total orders</small>
              </p>
            </div>
          </div>
        </div>
        <div className="settings">
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
          {this.settingsCard("settingsss", <MdShare size="1.5rem" />)}
        </div>
      </div>
    );
  }
}
