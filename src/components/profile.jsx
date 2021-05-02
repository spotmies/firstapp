import React, { Component } from "react";
import pic from "../images/logo192.png";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Card, Icon, Image, Dropdown } from "semantic-ui-react";

import "../index.css";
import "../assets/css/profile.css";

import imageCompression from "browser-image-compression";

import {
  MdAccountCircle,
  MdPhone,
  MdEmail,
  MdSmartphone,
} from "react-icons/md";

var availuser = false;

function useTimes() {
  const [postdata, setdata] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        availuser = true;
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snap) => {
            setdata({ data: snap.data(), id: snap.id });
          })
          .then(() => {
            availuser = true;
          });
      }
    });
  }, []);

  return { postdata };
}

const db = firebase.firestore();
const storage = firebase.storage();
const Profile = () => {
  const { postdata } = useTimes();
  let profile = [];
  let uid;
  if (postdata) {
    profile = postdata.data;
    console.log(profile);
    uid = postdata.id;
  } else console.log("kjdflk");

  function userlogout() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        alert("logout successfully");
        window.location.reload();
      });
  }

  function editpro(e) {
    e.preventDefault();
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .update({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        pic: document.getElementById("editpic").src,
        altnum: document.getElementById("altnum").value,
      })
      .then(() => {
        alert("details updated...");
        window.location.reload();
      });
  }

  async function upldimg(e) {
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

  return (
    <div>
      <div style={{ paddingBottom: "50px" }}>
        <Card centered color="blue" className="detailsContainer">
          <Card.Content>
            <Card.Header style={{ textAlign: "center" }}>
              <Card.Meta>
                <MdAccountCircle size="2rem" /> Account Details
              </Card.Meta>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <img src={profile.pic} className="postImg" />
          </Card.Content>
          <Card.Content style={{ textAlign: "center" }}>
            <Card.Header>
              <h2>
                <MdAccountCircle /> {profile.name}
              </h2>
            </Card.Header>
            <Card.Meta>
              <span className="accInfo">
                <small>
                  <MdSmartphone className="Icons" /> {profile.phone}
                </small>
              </span>
              <span className="accInfo">
                <small>
                  <MdPhone className="Icons" /> {profile.altnum}
                </small>
              </span>
              <span className="accInfo">
                <small>
                  <MdEmail className="Icons" /> {profile.email}
                </small>
              </span>
            </Card.Meta>
            <Card.Description>{profile.desc}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="setting" />
              <Dropdown text="Settings">
                <Dropdown.Menu>
                  <Dropdown.Item text="Edit my profile" onClick={editdet} />
                  <Dropdown.Item text="Delete my account" onClick={delmyac} />
                </Dropdown.Menu>
              </Dropdown>
            </a>
            <a onClick={userlogout} style={{ float: "right" }}>
              <Icon name="sign-out" />
              Logout
            </a>
          </Card.Content>
        </Card>
      </div>

      <div>
        <div className="editpro">
          <Form className="EditForm" onSubmit={editpro}>
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
                <input id="fileid" type="file" onChange={upldimg} hidden />
                <img
                  className="post-img"
                  id="editpic"
                  style={{ cursor: "pointer", border: "none" }}
                  itemType="file"
                  onClick={uploadpic}
                  src=""
                  alt=""
                />
                <div
                  className="post-img imageOverlay"
                  id="editpic"
                  style={{ cursor: "pointer" }}
                  itemType="file"
                  onClick={uploadpic}
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
                <FormControl id="name" placeholder="Enter your name" required />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <InputGroup className="mb-2 mr-sm-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="email" placeholder="Enter your email " />
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
  function delmyac() {
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
  function uploadpic(e) {
    e.preventDefault();
    document.getElementById("fileid").click();
  }

  function editdet(e) {
    document.querySelector(".editpro").style.display = "block";
    document.getElementById("name").value = profile.name;
    document.getElementById("email").value = profile.email;
    document.getElementById("altnum").value = profile.altnum;
    document.getElementById("editpic").src = profile.pic;
  }
};

export default Profile;