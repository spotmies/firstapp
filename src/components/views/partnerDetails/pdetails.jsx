import firebase from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Icon, Dropdown } from "semantic-ui-react";
import { useState, useEffect } from "react";
import {
  MdAccountCircle,
  MdSmartphone,
  MdPhone,
  MdEmail,
} from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const db = firebase.firestore();

export default function pdetails() {
  var personId = window.location.pathname;
  personId = personId.replace("/pdetails/", "");
  return (
    <div>
      <Partdetail id={personId} />
    </div>
  );
}

function Partdetail(props) {
  const [pdata, setpdata] = useState([]);
  console.log(props.id);
  useEffect(() => {
    db.collection("partner")
      .doc(props.id)
      .collection("ProfileInfo")
      .doc(props.id)
      .get()
      .then((snap) => {
        setpdata(snap.data());
      })
      .then(() => {
        console.log(pdata);
      });
  }, []);

  var dhref = "tel: +91 " + pdata.phone;

  return (
    <div style={{ paddingBottom: "50px", paddingTop: "40px" }}>
      <Card
        centered
        color="blue"
        style={{ borderRadius: "1rem", width: "80%" }}
      >
        <Card.Content>
          <Card.Header style={{ textAlign: "center" }}>
            <Card.Meta>
              <MdAccountCircle size="2rem" /> Technician Details
            </Card.Meta>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <img
            src={pdata.profilepic}
            style={{ width: "100%", borderRadius: "1rem", height: "100%" }}
          />
        </Card.Content>
        <Card.Content style={{ textAlign: "center" }}>
          <Card.Header>
            <h2>
              <MdAccountCircle /> {pdata.name}
            </h2>
          </Card.Header>
          <Card.Meta>
            <span>
              <small>
                <MdSmartphone /> {pdata.phone}
              </small>
            </span>
            <span>
              <small>
                <MdPhone /> {pdata.altNum}
              </small>
            </span>
            <span>
              <small>
                <MdEmail /> {pdata.email}
              </small>
            </span>
          </Card.Meta>
          <Card.Description>{pdata.desc}</Card.Description>
        </Card.Content>

        <Card centered color="orange" style={{ borderRadius: "1rem" }}>
          <Card.Content>
            <Card.Header>
              <FaAddressCard /> Technician address
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>{pdata.addrs}</Card.Description>
          </Card.Content>
        </Card>
        <Card.Content extra>
          <a href={dhref}>
            <MdPhone size="1.3rem" />
            Call
          </a>
          <a style={{ float: "right" }}>
            <Icon name="setting" />
            <Dropdown text="more">
              <Dropdown.Menu>
                <Dropdown.Item text="Raise complaint" />
                <Dropdown.Item text="Report" />
              </Dropdown.Menu>
            </Dropdown>
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}
