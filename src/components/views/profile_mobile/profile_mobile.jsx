import React, { Component, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./profile_mobile.css";
import {
  MdShare,
  MdNavigateNext,
  MdSecurity,
  MdWork,
  MdLoyalty,
  MdHelp,
  MdSettings,
  MdPowerSettingsNew,
  MdModeEdit,
  MdPerson,
  MdPhone,
  MdMail,
} from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
const ProfileMobileUi = (props) => {
  const classes = useStyles();
  const [showUi, setShowUi] = useState(false);
  const onclick = () => {};
  const settingsCard = (title, iconss) => {
    return (
      <div
        className={
          title === "Logout" ? "settings-card background-red" : "settings-card"
        }
        onClick={onclick}
      >
        <div className="card-elements">
          <div className="setting-name">
            <span>{iconss}</span>

            <h3>{title}</h3>
          </div>
          <span>
            <MdNavigateNext size="2rem" color="grey" />
          </span>
        </div>
      </div>
    );
  };
  return (
    <div>
      {showUi ? (
        <div className="profileUi">
          <div className="profile-card">
            <div className="profile">
              <Badge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  <div className="editIcon">
                    <MdModeEdit size="1.2rem" />
                  </div>
                }
              >
                <Avatar
                  className="profile-avatar"
                  alt="Travis Howard"
                  src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                />
              </Badge>
              <div className="profile-name">
                <h3>Prabhas Uppalapati</h3>
                <p>prabashupalapada@gmail.com</p>
              </div>
            </div>
            <div className="info">
              <div className="money">
                <h3>₹ 123</h3>
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
            {settingsCard(
              "Invite Friend",
              <MdShare size="1.5rem" className="account-icons" />
            )}
            {settingsCard("Privacy Policies", <MdSecurity size="1.5rem" />)}
            {settingsCard("Orders History", <MdWork size="1.5rem" />)}
            {settingsCard("Promotions", <MdLoyalty size="1.5rem" />)}
            {settingsCard("Help & Support", <MdHelp size="1.5rem" />)}
            {settingsCard("Settings", <MdSettings size="1.5rem" />)}
            {settingsCard(
              "Logout",
              <MdPowerSettingsNew size="1.5rem" color="red" />
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="profile-card">
            <Avatar
              className="profile-avatar"
              alt="Travis Howard"
              src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
            />
            <Button>change</Button>
          </div>
          <div className="edit-section">
            <form noValidate autoComplete="off" className="form-fields">
              <TextField
                id="standard-basic"
                label="Name"
                className="text-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdPerson />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="standard-basic"
                label="Email Address"
                className="text-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdMail />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="standard-basic"
                label="Alternative number"
                className="text-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdPhone />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileMobileUi;
