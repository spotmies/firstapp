import React, { Component } from "react";
import pic from "../../../images/logo192.png";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Card, Icon, Image, Dropdown } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { sharemydetails } from "../../../mservices/userDB";

import "../../../index.css";
import "../../../assets/css/profile.css";

import imageCompression from "browser-image-compression";

import {
  MdAccountCircle,
  MdPhone,
  MdEmail,
  MdSmartphone,
} from "react-icons/md";

const db = firebase.firestore();
const storage = firebase.storage();

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
    };
    this.handlechange = this.handlechange.bind(this);
    this.editpro = this.editpro.bind(this);
  }

  async componentDidMount() {
    if (firebase.auth().currentUser.uid) {
      let details = await sharemydetails(firebase.auth().currentUser.uid);
      this.setState({ profile: details });
    }
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
        //  alert("logout successfully");
        toast.success("Logout Successfully");
        this.props.history.push("/");
        setTimeout(() => {}, 1000);
        window.location.reload();
      });
  }

  editpro(e) {
    toast.info("Details Updating...");
    e.preventDefault();
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name: this.state.profile.name,
        email: this.state.profile.email,
        pic: document.getElementById("editpic").src,
        altnum: this.state.profile.altnum,
      })
      .then(() => {
        // alert("details updated...");
        toast.success("Details Updated");
        document.querySelector(".editpro").style.display = "none";
        let temp = this.state.profile;
        temp["pic"] = document.getElementById("editpic").src;
        this.setState({ profile: temp });

        // window.location.reload();
      });
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

    console.log("fileis", file.name);
    var uploaderb = document.querySelector("#uploaderb");
    uploaderb.style.display = "block";
    // crate storage ref
    var storageref = storage.ref(
      `users/${firebase.auth().currentUser.uid}/profile/` + cfile.name
    );

    //upload file
    var task = storageref.put(cfile);

    //update progress bar
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
      function complete() {
        console.log("adhar back uploaded successfully ");
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          document.getElementById("editpic").setAttribute("src", downloadURL);
          uploaderb.style.display = "none";
        });
      }
    );
  }
  handlechange(e) {
    let value = e.target.value;
    let id = e.target.id;
    console.log(id, value);
    let temp = this.state.profile;

    temp[id] = value;
    this.setState({ profile: temp });
  }
  render() {
    // document.getElementById("name").value = this.state.profile.name;
    // document.getElementById("email").value = this.state.profile.email;
    // document.getElementById("altnum").value = this.state.profile.altnum;
    // document.getElementById("editpic").src = this.state.profile.pic;
    return (
      <div>
        <div style={{ paddingBottom: "50px" }}>
          <Card
            centered
            color="blue"
            // style={{ width: wWidth > 625 ? "50%" : "85%" }}
            className="detailsContainer"
          >
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
              <img src={this.state.profile.pic} className="postImg" />
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
                    {this.state.profile.phone}
                  </small>
                </span>
                <span className="accInfo">
                  <small>
                    <MdPhone className="Icons" /> {this.state.profile.altnum}
                  </small>
                </span>
                <span className="accInfo">
                  <small>
                    <MdEmail className="Icons" /> {this.state.profile.email}
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
                      onClick={this.editdet}
                    />
                    <Dropdown.Item
                      text="Delete my account"
                      onClick={this.delmyac}
                    />
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
          <div className="editpro">
            <Form className="EditForm" onSubmit={this.editpro}>
              <Form.Group controlId="formBasicEmail">
                <p
                  className="crossBtn"
                  onClick={(e) =>
                    (document.querySelector(".editpro").style.display = "none")
                  }
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
                    value={this.state.profile.name}
                    onChange={this.handlechange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="email"
                    placeholder="Enter your email "
                    value={this.state.profile.email}
                    onChange={this.handlechange}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <InputGroup className="mb-2 mr-sm-2">
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    id="altnum"
                    placeholder="Enter your alternative phone number"
                    value={this.state.profile.altnum}
                    onChange={this.handlechange}
                  />
                </InputGroup>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  delmyac() {
    var r = window.confirm(
      "you can't recover to do this all data about you deleted"
    );
    if (r == true) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .delete()
        .then(() => {
          firebase
            .auth()
            .signOut()
            .then(function () {
              window.location.href = "http://localhost:3000/";
            });
        });
    }
  }
  uploadpic(e) {
    e.preventDefault();
    document.getElementById("fileid").click();
  }

  editdet(e) {
    document.querySelector(".editpro").style.display = "block";
  }
}

export default withRouter(Profile);
