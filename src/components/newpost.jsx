import "../App.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, InputGroup, Form, FormControl } from "react-bootstrap";
import { Card } from "semantic-ui-react";
import { BiRupee, BiArrowBack } from "react-icons/bi";
import { BsTools, BsCalendar } from "react-icons/bs";
import firebase from "../firebase";
import "firebase/storage";
import { createHashHistory } from "history";
import { toast } from "react-toastify";

//date picker in class componets
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import "bootstrap/dist/css/bootstrap.min.css";

const history = createHashHistory();

const db = firebase.firestore();
const storage = firebase.storage();

var imgarr = [];

export default class Postjob extends Component {
  //date picker code here

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let schedule = this.state.startDate;
    let name = document.querySelector("#nameofserv").value;
    let desc = document.querySelector(".desc").value;
    let cat = document.querySelector(".cate").value;
    let price = document.querySelector(".price").value;
    if (cat == "true") {
      // alert("please select category")
      toast.warning("please select category");
    } else {
      cat = parseInt(cat);
      price = parseInt(price);
      console.log(name, desc, cat, price, imgarr);
      const newpost = db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("adpost")
        .doc();
      var d = new Date();
      console.log(d);
      newpost
        .set({
          job: cat,
          problem: name,
          description: desc,
          money: price,
          userid: firebase.auth().currentUser.uid,
          orderid: newpost.id,
          media: imgarr,
          request: "nothing",
          posttime: d,
          views: 0,
          location: "seethammadhara",
          schedule: schedule,
          orderstate: null,
        })
        .then(() => {
          return db.collection("allads").doc(newpost.id).set({
            job: cat,
            problem: name,
            description: desc,
            money: price,
            userid: firebase.auth().currentUser.uid,
            orderid: newpost.id,
            media: imgarr,
            request: "nothing",
            posttime: d,
            views: 0,
            location: "seethammadhara",
            schedule: schedule,
            orderstate: null,
          });
        })
        .then(() => {
          //  alert("post added successfully")
          toast.success("post added successfully");
          history.go(-1);
          imgarr = [];
        });
    }
  };
  upldimg = (e) => {
    //  alert(this.state.startDate)
    for (let i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      console.log("fileis", file.name);
      var uploaderb = document.querySelector("#uploaderb");
      uploaderb.style.display = "block";
      // crate storage ref
      var storageref = storage.ref(`users/uid/profile/` + file.name);

      //upload file
      var task = storageref.put(file);

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
            imgarr.push(downloadURL);

            const gallery = document.querySelector(".gallery");
            // const html='';
            //  var html = document.createElement("IMG");
            //   html.setAttribute('src',downloadURL);
            //   html.setAttribute('class',"items")

            // gallery.append(html)
            var div = document.createElement("div");
            var html = document.createElement("IMG");
            var btn = document.createElement("p");
            html.setAttribute("src", downloadURL);
            html.setAttribute("class", "items");
            div.setAttribute("id", `i${downloadURL}`);
            btn.setAttribute("class", "close");
            btn.setAttribute("id", downloadURL);
            btn.innerHTML = "x";
            btn.onclick = function () {
              let imgid = btn.getAttribute("id");
              //  alert(`del id is ${imgid}`);
              console.log(imgarr);
              imgarr = imgarr.filter((e) => e !== imgid);
              console.log(imgarr);
              document.getElementById(`i${imgid}`).remove();
            };

            div.append(html);
            div.appendChild(btn);
            gallery.append(div);
            uploaderb.style.display = "none";
          });
        }
      );
    }
    console.log(imgarr);
  };

  render() {
    return (
      <>
      <div className="comingSoon">
        <h1 className="soonText">Coming Soon ...</h1>
        </div>

      <div style={{ paddingTop: "-20px" }}>
        <Link to="/">
          <BiArrowBack className="back-arrow" size="1.6em" />
        </Link>
        <div className="postjob">
          <Form className="postjobb" onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <InputGroup className="mb-2">
                <InputGroup.Prepend className="nameofser">
                  <InputGroup.Text>
                    <BsTools />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  id="nameofserv"
                  className="nameofser"
                  placeholder="Name of service"
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label required>
                <b>CATEGORY</b>
              </Form.Label>
              <Form.Control required as="select" className="cate" required>
                <option disabled selected value>
                  {" "}
                  -- select an option --{" "}
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                <b>DESCRIPTION</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="desc"
                placeholder="type something here"
              />
            </Form.Group>
            <Form.Label>
              <b>PRICE</b>
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <BiRupee />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="inlineFormInputGroup"
                type="number"
                placeholder="Enter price here"
                className="price"
                required
              />
            </InputGroup>

            <InputGroup className="mb-2">
              <InputGroup.Prepend className="nameofser">
                <InputGroup.Text>
                  {" "}
                  <BsCalendar size="1.3em" />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <DatePicker
                className="datepicker"
                selected={this.state.startDate}
                placeholderText="when you want service"
                onChange={this.handleChange}
                minDate={new Date()}
                name="startDate"
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="time"
                dateFormat="dd/MM/yyyy"
                required
              />
            </InputGroup>

            <Form.Label>
              <b>UPLOAD ANY IMAGES</b>
            </Form.Label>
            <Form.File
              id="custom-file"
              label="Custom file input"
              custom
              onChange={this.upldimg}
            />

            <progress value="0" max="100" id="uploaderb">
              0%
            </progress>
            <Form.Group>
              <div className="imgdiv">
                <div className="gallery">
                  {/* <img className="items" src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" alt="" /> */}
                </div>
              </div>
            </Form.Group>

            <Button variant="outline-info" type="submit">
              Get Service
            </Button>
          </Form>
        </div>
      </div>
      </>
    );
  }
}
