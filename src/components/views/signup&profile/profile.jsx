import React, { Component } from "react";
import firebase from "../../../firebase";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Card, Icon, Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import { sharemydetails } from "../../../mservices/userDB";
import { validURL } from "../../../helpers/dateconv";
import "../../../index.css";
import "../../../assets/css/profile.css";
import { updateUserDetails } from "../../controllers/login/login_controller";
import imageCompression from "browser-image-compression";

import { connect } from "react-redux";
import FullScreenWidget from "../../reusable/helpers";

import {
  MdAccountCircle,
  MdPhone,
  MdEmail,
  MdSmartphone,
} from "react-icons/md";
import { allowOnlyNumber } from "../../../helpers/regex/regex";
import { loadState } from "../../../helpers/localStorage";

const db = firebase.firestore();
const storage = firebase.storage();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      editSection: false,
      loader: false,
      nameController: React.createRef(),
      altNumController: React.createRef(),
      eMailController: React.createRef(),
    };
    this.submitForm = this.submitForm.bind(this);
    this.upldimg = this.upldimg.bind(this);
  }

  async componentDidMount() {
    this.setState({ profile: await this.props.userDetails });
  }

  async componentDidUpdate() {
    if (this.state.profile.name == "") {
      let details = await sharemydetails(firebase.auth().currentUser.uid);
      this.setState({ profile: details });
    }
  }

  userlogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        toast.success("Logout Successfully");
        this.props.history.push("/");
        setTimeout(() => {}, 1000);
        window.location.reload();
      });
  }

  async submitForm(e) {
    e.preventDefault();
    this.eventLoader(true);
    let uId = this.state.profile.uId;
    let updateObject = this.state.profile;
    updateObject["lastLogin"] = new Date().valueOf();
    updateObject["name"] = this.state.nameController.current.value;
    updateObject["altNum"] = this.state.altNumController.current.value;
    updateObject["eMail"] = this.state.eMailController.current.value;
    let response = await updateUserDetails(uId, updateObject);
    this.eventLoader(false);
    this.editProfileSection(false);
    if (response != false) {
      this.props.updateUser(response);
    }
  }

  async upldimg(e) {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    let cfile;

    var file = e.target.files[0];

    await imageCompression(file, options)
      .then((x) => {
        cfile = x;
      })
      .catch(function (error) {
        console.log(error.message);
      });

    var uploaderb = document.querySelector("#uploaderb");
    uploaderb.style.display = "block";

    var storageref = storage.ref(
      `users/${firebase.auth().currentUser.uid}/profile/` + cfile.name
    );

    var task = storageref.put(cfile);

    task.on(
      "state_changed",
      function progress(snapshot) {
        var percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploaderb.value = percentage;
      },
      function error(err) {
        console.log(err);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          uploaderb.style.display = "none";
          let temp = this.state.profile;
          temp["pic"] = downloadURL;
          this.setState({ profile: temp });
        });
      }
    );
  }

  //turn on off loader
  eventLoader = (value) => {
    this.setState({
      loader: value,
    });
  };
  render() {
    return (
      <div>
        <FullScreenWidget
          data="Updating your details..."
          type="loader"
          show={this.state.loader}
        />
        <div style={{ paddingBottom: "50px" }}>
          <Card centered color="blue" className="detailsContainer">
            <Card.Content>
              <Card.Header style={{ textAlign: "center" }}>
                <Card.Meta>
                  <MdAccountCircle size="2rem" /> Account Details
                </Card.Meta>
              </Card.Header>

              <Dropdown
                item
                icon="ellipsis horizontal"
                simple
                style={{ float: "right" }}
              >
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon name="edit" />
                    Edit post
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Icon name="trash" /> Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Content>
            <Card.Content>
              {validURL(this.state.profile.pic) ? (
                <img src={this.state.profile.pic} className="postImg" />
              ) : (
                <MdAccountCircle className="postImg" />
              )}
            </Card.Content>
            <Card.Content style={{ textAlign: "center" }}>
              <Card.Header>
                <h2>
                  <MdAccountCircle /> {this.state.profile.name}
                </h2>
              </Card.Header>
              <Card.Meta>
                <span className="accInfo">
                  <small>
                    <MdSmartphone className="Icons" />{" "}
                    {this.state.profile.phNum}
                  </small>
                </span>
                <span className="accInfo">
                  <small>
                    <MdPhone className="Icons" /> {this.state.profile.altNum}
                  </small>
                </span>
                <span className="accInfo">
                  <small>
                    <MdEmail className="Icons" /> {this.state.profile.eMail}
                  </small>
                </span>
              </Card.Meta>
              <Card.Description>{this.state.profile.desc}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="setting" />
                <Dropdown text="Settings">
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="Edit my profile"
                      onClick={() => {
                        this.editProfileSection(true);
                      }}
                    />
                    <Dropdown.Item text="Delete my account" />
                  </Dropdown.Menu>
                </Dropdown>
              </a>
              <a onClick={this.userlogout} style={{ float: "right" }}>
                <Icon name="sign-out" />
                Logout
              </a>
            </Card.Content>
          </Card>
        </div>

        <div>
          {this.state.editSection ? (
            <div className="editpro">
              <Form className="EditForm" onSubmit={this.submitForm}>
                <Form.Group controlId="name">
                  <p
                    className="crossBtn"
                    onClick={() => {
                      this.editProfileSection(false);
                    }}
                  >
                    X
                  </p>

                  <InputGroup className="mb-2 mr-sm-2">
                    <input
                      id="fileid"
                      type="file"
                      onChange={this.upldimg}
                      hidden
                    />
                    <img
                      className="post-img"
                      id="editpic"
                      style={{ cursor: "pointer", border: "none" }}
                      itemType="file"
                      onClick={this.uploadpic}
                      src={this.state.profile.pic}
                      alt=""
                    />
                    <div
                      className="post-img imageOverlay"
                      id="editpic"
                      style={{ cursor: "pointer" }}
                      itemType="file"
                      onClick={this.uploadpic}
                    >
                      +
                    </div>
                    <progress value="0" max="100" id="uploaderb">
                      0%
                    </progress>
                  </InputGroup>

                  <Form.Label htmlFor="inlineFormInputGroupUsername2" srOnly>
                    Username
                  </Form.Label>
                  <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="name"
                      placeholder="Enter your name"
                      required
                      defaultValue={this.state.profile.name}
                      ref={this.state.nameController}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="eMail">
                  <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="eMail"
                      placeholder="Enter your email "
                      defaultValue={this.state.profile.eMail}
                      type="email"
                      ref={this.state.eMailController}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="altNum">
                  <InputGroup className="mb-2 mr-sm-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="altNum"
                      placeholder="Enter your alternative phone number"
                      defaultValue={this.state.profile.altNum}
                      maxLength="10"
                      onChange={allowOnlyNumber}
                      ref={this.state.altNumController}
                    />
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  uploadpic(e) {
    e.preventDefault();
    document.getElementById("fileid").click();
  }

  editProfileSection(value) {
    this.setState({ editSection: value });
  }
}
const mapStateToProps = (state) => {
  return {
    userDetails:
      Object.keys(state.userDetails).length != 0
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
