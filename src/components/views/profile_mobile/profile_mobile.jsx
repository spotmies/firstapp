import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Badge,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import Compressor from "compressorjs";
import { allowOnlyNumber } from "../../../helpers/regex/regex";
import { loadState } from "../../../helpers/localStorage";

// import { makeStyles } from "@material-ui/core/styles";
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
import { updateUserDetails } from "../../controllers/login/login_controller";
const storage = firebase.storage();
const ProfileMobileUi = (props) => {
  const history = useHistory();
  const user = props.userDetails;
  const [readyForSubmit, setreadyForSubmit] = useState(false);
  const [showUi, setShowUi] = useState(true);
  const [userPic, setuserPic] = useState(null);
  const photoPic = React.useRef(null);
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const altNumRef = React.useRef(null);
  useEffect(() => {
    console.log(user);
  }, []);
  useEffect(() => {
    if (readyForSubmit) {
      formSubmit();
    }
  }, [readyForSubmit]);

  const onclick = (labelName) => {
    switch (labelName) {
      case "Logout":
        userlogout();
        break;

      default:
        break;
    }
  };
  const toggleEditUi = (value) => {
    setShowUi(value);
  };
  const formSubmit = async () => {
    console.log(nameRef);
    setreadyForSubmit(false);
    console.log("submitting...");
    let uplodObject = user;
    uplodObject["name"] = nameRef.current?.value ?? "unknow";
    uplodObject["altNum"] = altNumRef.current?.value ?? "unknow";
    uplodObject["eMail"] = emailRef.current?.value ?? "unknow";
    console.log(uplodObject);
    let response = await updateUserDetails(user.uId, uplodObject);

    if (response !== false) {
      props.updateUser(response);
    }
    props.updateLoader(false);
    toggleEditUi(true);
  };
  const uploadFiles = async (e) => {
    console.log(nameRef);
    e.preventDefault();
    props.updateLoader(true);
    console.log("upload...");

    if (userPic == null) {
      setreadyForSubmit(true);
      return;
    }
    let blob = await fetch(userPic).then((r) => r.blob());
    let cfile = blob;
    var storageref = storage.ref(
      `users/${firebase.auth().currentUser.uid}/profile/` + cfile.name
    );

    var task = storageref.put(cfile);

    task.on(
      "state_changed",
      function progress(snapshot) {},
      function error(err) {
        console.log(err);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("downloadURL....", downloadURL);
          user["pic"] = downloadURL;
          setreadyForSubmit(true);
        });
      }
    );
  };
  const compressorJs = (e) => {
    let file = e.target.files[0];
    new Compressor(file, {
      quality: 0.3,
      success(result) {
        setuserPic(URL.createObjectURL(result));
      },
      error(err) {
        console.log(err.message);
      },
    });
  };
  const userlogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        localStorage.clear();
        console.log("logout");
        history.push("/");
        setTimeout(() => {}, 1000);
        window.location.reload();
      });
  };
  const settingsCard = (title, iconss) => {
    return (
      <div
        className={
          title === "Logout" ? "settings-card background-red" : "settings-card"
        }
        onClick={() => {
          onclick(title);
        }}
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
                onClick={() => {
                  toggleEditUi(false);
                }}
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
                  alt={user.name}
                  src={user.pic}
                />
              </Badge>
              <div className="profile-name">
                <h3>{user.name}</h3>
                <p>{user.eMail != "" ? user.eMail : user.phNum}</p>
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
                <h3>{user?.orders?.length}</h3>
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
              src={userPic ?? user.pic}
            />

            <Button
              onClick={() => {
                photoPic.current.click();
              }}
            >
              change
            </Button>

            <input
              accept="image/*"
              ref={photoPic}
              type="file"
              onChange={compressorJs}
              hidden
            />
          </div>
          <div className="edit-section">
            <form
              autoComplete="off"
              className="form-fields"
              onSubmit={uploadFiles}
            >
              <TextField
                id="standard-basic"
                label="Name"
                required
                inputRef={nameRef}
                className="text-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdPerson />
                    </InputAdornment>
                  ),
                  defaultValue: `${user.name}`,
                }}
              />
              <TextField
                id="standard-basic"
                label="Email Address"
                className="text-field"
                type="email"
                inputRef={emailRef}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdMail />
                    </InputAdornment>
                  ),
                  defaultValue: `${user.eMail ?? ""}`,
                }}
              />
              <TextField
                id="standard-basic"
                label="Alternative number"
                className="text-field"
                inputRef={altNumRef}
                onChange={allowOnlyNumber}
                inputProps={{
                  maxLength: 10,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <MdPhone />
                    </InputAdornment>
                  ),
                  defaultValue: `${user.altNum ?? ""}`,
                }}
              />
              <div className="action-buttons">
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => {
                    toggleEditUi(true);
                  }}
                >
                  cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disableElevation
                >
                  save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails:
      Object.keys(state.userDetails).length !== 0
        ? state.userDetails
        : loadState("userDetails") ?? [],
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => {
      dispatch({ type: "UPDATE_USER_DETAILS", value: data });
    },
    updateLoader: (data) => {
      dispatch({ type: "UPDATE_UNIVERSAL_LOADER", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileMobileUi);
