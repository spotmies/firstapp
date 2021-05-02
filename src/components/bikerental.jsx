import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Card,
  Icon,
  Button,
  Header,
  Image,
  Modal,
  Step,
  Menu,
  Dropdown,
  Checkbox,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import "./rental.css";
import { Row, Col } from "react-bootstrap";
import { SiCoronaengine } from "react-icons/si";
import { BsFillGearFill } from "react-icons/bs";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaPeopleCarry } from "react-icons/fa";
import { useState, useEffect } from "react";
import firebase from "../firebase";
import ScrollEvent from "react-onscroll";
import { toast } from "react-toastify";

const db = firebase.firestore();

function Rentals() {
  //  var times=useTimes()
  const [times, setTimes] = useState([]);

  function useWindowSize() {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
    useEffect(() => {
      const handleResize = () => {
        setSize([window.innerHeight, window.innerWidth]);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return size;
  }

  //cartype filter
  const [count, setcount] = useState("true");
  const [ftype, settype] = useState("status");

  //fuel filter
  const [count2, setcount2] = useState("true");
  const [ftype2, settype2] = useState("status");

  //seats filter
  const [count3, setcount3] = useState("true");
  const [ftype3, settype3] = useState("status");

  //gear type
  const [count4, setcount4] = useState("true");
  const [ftype4, settype4] = useState("status");

  //toc filter typ of car petrol or diesel
  const [count5, setcount5] = useState("true");
  const [ftype5, settype5] = useState("status");

  const [checkt, setcheck] = useState(true);

  const [scr, setscr] = useState(true);

  // filter function

  function uncheckall(data) {
    setTimes([]);
    if (data == "ctype") settype("cartype");
    else {
      settype("status");
      setcount("true");
    }
    settype2("status");
    setcount2("true");
    settype3("status");
    setcount3("true");
    settype4("status");
    setcount4("true");
    settype5("status");
    setcount5("true");

    var box = document.querySelector(".check1");
    box.isChecked = true;
    setcheck(false);
    // for(var i=0;i<=2;i++){
    //   let box=document.querySelector(`.check${i}`)
    //   box.checked=false;
    // }
  }

  function newfunk(e) {
    //if(ftype=="status") setTimes([]);

    uncheckall("ctype");
    // setcount(e.target.innerText)
    // settype("cartype")
    setcount(e.target.innerText);

    // for(var i=0;i<=2;i++){
    //   let ctype=document.getElementById(`type${i}`)
    //   if(ctype.checked){
    //     console.log(ctype.value,"is checked")
    //     //  setTimes([]);
    //       settype("cartype")
    //        setcount(ctype.value)
    //        console.log(count)
    //   }
    //   else{
    //     console.log(ctype.value,"nocheck")
    //   }
    // }
  }

  //fuel filter
  function fuelf(e) {
    setTimes([]);
    if (e.target.checked) {
      settype2("fuelincl");
      setcount2("true");
    } else {
      settype2("fuelincl");
      setcount2("false");
    }
  }

  //tranmission filter
  function transfilt(e) {
    setTimes([]);
    settype4("geartype");
    //if(e.target.checked)console.log("checkd",e.target.value)
    if (
      (document.getElementById("trans1").checked &&
        document.getElementById("trans2").checked) ||
      (!document.getElementById("trans1").checked &&
        !document.getElementById("trans2").checked)
    ) {
      settype4("status");
      setcount4("true");
    } else {
      if (document.getElementById("trans1").checked) setcount4("automatic");
      else if (document.getElementById("trans2").checked) setcount4("manual");
    }
  }

  //type of car filter petrol or diesel fitelr
  function toc(e) {
    setTimes([]);
    settype5("toc");
    //if(e.target.checked)console.log("checkd",e.target.value)
    if (
      (document.getElementById("toc1").checked &&
        document.getElementById("toc2").checked) ||
      (!document.getElementById("toc1").checked &&
        !document.getElementById("toc2").checked)
    ) {
      settype5("status");
      setcount5("true");
    } else {
      if (document.getElementById("toc1").checked) {
        setcount5("petrol");
        console.log("petr");
      } else if (document.getElementById("toc2").checked) setcount5("diesel");
    }
  }

  function satish(e) {
    if (!e.target.checked) {
      setTimes([]);
    } else {
    }
    console.log("stish");
  }

  function seatfil(e) {
    setTimes([]);
    settype3("seats");
    if (e.target.checked) console.log("checkd", e.target.value);
    if (
      (document.getElementById("seat0").checked &&
        document.getElementById("seat1").checked) ||
      (!document.getElementById("seat0").checked &&
        !document.getElementById("seat1").checked)
    ) {
      settype3("status");
      setcount3("true");
    } else {
      if (e.target.checked) {
        settype3("seats");
        setcount3(e.target.value);
      } else {
        if (document.getElementById("seat0").checked) setcount3("5");
        else if (document.getElementById("seat1").checked) setcount3("7");
      }
    }
  }

  useEffect(() => {
    let newtimes;
    db.collection("rentals")
      .get()
      .then((snap) => {
        snap.docs.forEach((nap) => {
          if (nap.data().permission) {
            // if(keys==0){
            db.collection("rentals")
              .doc(nap.id)
              .collection("products")
              .where(ftype, "==", count)
              .where(ftype2, "==", count2)
              .where(ftype3, "==", count3)
              .where(ftype4, "==", count4)
              .where(ftype5, "==", count5)
              // .orderBy("price")
              .get()
              .then((snap) => {
                newtimes = snap.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setTimes((cap) => [...cap, ...newtimes]);
                // console.log(times)
              });
          }
        });
      });
  }, [
    count,
    ftype,
    count2,
    ftype2,
    count3,
    ftype3,
    count4,
    ftype4,
    count5,
    ftype5,
  ]);

  //console.log(times)

  var arr = [];
  for (var i = 0; i <= 100; i++) {
    arr.push(false);
  }
  const [open, setOpen] = useState(arr);
  const [menu, setMenu] = useState(false);

  function settrue() {
    setMenu(!menu);
  }
  const scrollevent = () => {
    // console.log("scroll")
    setscr(false);
    setTimeout(() => {
      console.log("scroll");
      setscr(true);
    }, 500);
  };

  const [heights, widths] = useWindowSize();
  return (
    <div>
      {/* <div className="comingSoon">
        <h1 className="soonText">Coming Soon ...</h1>
        </div> */}

      <div>
        {/* <  car Filtering /> */}
        {scr ? (
          <Button
            primary
            onClick={() => {
              settrue();
            }}
            style={{
              position: "fixed",
              zIndex: "200",
              margin: "10px 0 0 17px",
            }}
          >
            Filters
          </Button>
        ) : null}
        {menu ? (
          <div className="filter-div">
            <Dropdown
              text="Filter"
              icon="filter"
              labeled
              button
              className="icon"
              style={{ marginTop: "40px" }}
            >
              <Dropdown.Menu id="filtmenu" onClick={newfunk}>
                <Dropdown.Item>
                  <Icon name="attention" className="right floated" />
                  sport
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="comment" className="right floated" />
                  suv
                </Dropdown.Item>
                <Dropdown.Item>
                  <Icon name="conversation" className="right floated" />
                  sedan
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <br />
            <Button
              onClick={(e) => uncheckall("all")}
              style={{ marginTop: "20px" }}
            >
              Show me all cars
            </Button>
            <br />

            {/* <Segment compact 
    onClick={newfunk} 
    id="segmttype">
      <Checkbox label="sport" id="type0" value="sport" onClick={satish}/><br/>
      <Checkbox label="sedan" id="type1" value="sedan" onClick={satish}/><br/>
      <Checkbox label="suv" id="type2" value="suv" onClick={satish}/><br/>
    </Segment> */}

            <Checkbox
              toggle
              style={{ marginTop: "20px" }}
              onChange={fuelf}
              id="fuelid"
              label="petrol"
              className="check0"
            />

            <Segment compact onClick={seatfil} id="segmttype">
              <Checkbox
                label="5seats"
                id="seat0"
                value="5"
                className="check1"
              />
              <br />
              <Checkbox
                label="7seats"
                id="seat1"
                value="7"
                className="check2"
              />
              <br />
            </Segment>

            <Segment compact onClick={transfilt} id="segmttype2">
              <Checkbox label="Automatic" id="trans1" value="automatic" />
              <br />
              <Checkbox label="Manual" id="trans2" value="manual" />
              <br />
            </Segment>

            <Segment compact onClick={toc} id="segmttype3">
              <Checkbox label="Petrol" id="toc1" value="petrol" />
              <br />
              <Checkbox label="Diesel" id="toc2" value="diesel" />
              <br />
            </Segment>
          </div>
        ) : null}

        {/* car display cards */}
        <div className="newdiv">
          <div
            style={{ padding: "10px", marginLeft: "auto", marginRight: "auto" }}
            className="maindiv"
            id="scrollcard"
          >
            {widths <= 420 ? (
              <ScrollEvent handleScrollCallback={scrollevent} />
            ) : null}
            {times.length == 0 ? (
              //            <Row>
              //    <Col xs={12} lg={4}> <Segment className="rentcard">
              //       <Dimmer active inverted>
              //         <Loader size='large'>Loading</Loader>
              //       </Dimmer>

              //       <Image src='/images/wireframe/paragraph.png' />
              //     </Segment></Col>

              //    <Col xs={12} lg={4}> <Segment className="rentcard">
              //     <Dimmer active inverted>
              //       <Loader size='large'>Loading</Loader>
              //     </Dimmer>

              //     <Image src='/images/wireframe/paragraph.png' />
              //   </Segment></Col>

              //        <Col xs={12} lg={4}>  <Segment className="rentcard">
              //          <Dimmer active inverted>
              //           <Loader size='large'>Loading</Loader>
              //          </Dimmer>

              //   <Image src='/images/wireframe/paragraph.png' />
              // </Segment></Col>

              //         <Col xs={12} lg={4}> <Segment className="rentcard">
              //            <Dimmer active inverted>
              //                <Loader size='large'>Loading</Loader>
              //            </Dimmer>

              //              <Image src='/images/wireframe/paragraph.png' />
              //           </Segment></Col>

              //           <Col xs={12} lg={4}> <Segment className="rentcard">
              //             <Dimmer active inverted>
              //               <Loader size='large'>Loading</Loader>
              //             </Dimmer>

              //             <Image src='/images/wireframe/paragraph.png' />
              //            </Segment></Col></Row>
              <Card.Group>
                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>

                <Card className="rentcard">
                  <Segment className="loaderSegment">
                    <Dimmer active inverted>
                      <Loader size="large">Loading</Loader>
                    </Dimmer>

                    <Image
                      className="loaderImg"
                      src="/images/wireframe/paragraph.png"
                    />
                  </Segment>
                  <Card.Content>
                    <Card.Header
                      style={{ textAlign: "center", height: "fit-content" }}
                    ></Card.Header>
                  </Card.Content>

                  <Card.Content className="carBtn" extra>
                    <div style={{ display: "inline-flex" }}>
                      <p className="carContent">
                        <a>
                          <BsFillGearFill />
                          -- &nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        <a>
                          <SiCoronaengine />
                          --&nbsp;
                        </a>
                      </p>
                      <p className="carContent">
                        {" "}
                        <a>
                          <Icon name="wheelchair" />
                          --&nbsp;seats
                        </a>
                      </p>

                      <p className="carContent">
                        <a>
                          <IoSpeedometerOutline />
                          <br />
                          --&nbsp;km
                        </a>
                      </p>
                    </div>
                    <div>
                      <Button.Group className="priceBar">
                        <Button>
                          {" "}
                          &#8377; <br /> <small> 50km </small>
                        </Button>

                        <Button>
                          {" "}
                          &#8377;
                          <br /> <small> 100km </small>
                        </Button>
                        <Button>
                          &#8377; <br /> <small> 150km </small>
                        </Button>
                      </Button.Group>
                    </div>
                  </Card.Content>

                  <Button color="blue">Book now</Button>
                </Card>
              </Card.Group>
            ) : (
              //  real cars card appearance
              <Card.Group>
                {times.map((nap, key) => (
                  <Card className="rentcard" id={nap.id} key={key}>
                    <Image
                      className="carPic"
                      src={nap.photo}
                      wrapped
                      ui={true}
                    />
                    <Card.Content>
                      <Card.Header
                        style={{ textAlign: "center", height: "fit-content" }}
                      >
                        {nap.model}
                      </Card.Header>

                      {/* <Card.Description>
     <b> &#8377; {nap.price}/Day</b>
      </Card.Description> */}
                    </Card.Content>
                    {/* loader images */}

                    <Card.Content className="carBtn" extra>
                      <div style={{ display: "inline-flex" }}>
                        <p className="carContent">
                          <a>
                            <BsFillGearFill />
                            &nbsp; {nap.geartype}
                          </a>
                        </p>
                        <p className="carContent">
                          <a>
                            <SiCoronaengine />
                            &nbsp; {nap.toc}
                          </a>
                        </p>
                        <p className="carContent">
                          {" "}
                          <a>
                            <Icon name="wheelchair" />
                            {nap.seats}&nbsp;seats
                          </a>
                        </p>

                        <p className="carContent">
                          <a>
                            <IoSpeedometerOutline />
                            <br />
                            {nap.kmslimit}&nbsp;km
                          </a>
                        </p>
                      </div>
                      <div>
                        <Button.Group className="priceBar">
                          <Button>
                            {" "}
                            &#8377;{nap.price * 50} <br /> <small> 50km </small>
                          </Button>

                          <Button>
                            {" "}
                            &#8377;{nap.price * 100}
                            <br /> <small> 100km </small>
                          </Button>
                          <Button>
                            &#8377;{nap.price * 150} <br />{" "}
                            <small> 150km </small>
                          </Button>
                        </Button.Group>
                      </div>
                    </Card.Content>
                    {nap.status ? (
                      <Button
                        id={nap.id}
                        color="blue"
                        onClick={(e) => blynk(key, true)}
                      >
                        Book now
                      </Button>
                    ) : (
                      <Button
                        disabled
                        id={nap.id}
                        color="brown"
                        onClick={(e) => setOpen(true)}
                      >
                        Sold out
                      </Button>
                    )}

                    <div>
                      <Modal
                        onClose={() => setOpen({ key: false })}
                        onOpen={() => setOpen({ key: true })}
                        open={open[key]}
                        className="categoryModal"
                      >
                        <Modal.Header>{nap.model}</Modal.Header>
                        <Modal.Content image>
                          <Image size="medium" src={nap.photo} wrapped />
                          <Modal.Description>
                            <Header>
                              <h1>{nap.model}</h1>
                            </Header>
                            <p>{/* <b> &#8377; {nap.price}/Day</b> */}</p>
                            <div style={{ display: "inline-flex" }}>
                              <p>
                                <a>
                                  <SiCoronaengine />
                                  &nbsp; {nap.toc}
                                </a>
                              </p>

                              <p style={{ marginLeft: "20px" }}>
                                <a>
                                  <BsFillGearFill />
                                  &nbsp; {nap.geartype}
                                </a>
                              </p>

                              <p style={{ marginLeft: "20px" }}>
                                {" "}
                                <a>
                                  <Icon name="wheelchair" />
                                  {nap.seats}seats
                                </a>
                              </p>

                              <p style={{ marginLeft: "20px" }}>
                                <a>
                                  <IoSpeedometerOutline />
                                  &nbsp;{nap.kmslimit} km
                                </a>
                              </p>

                              {nap.fuelincl == "true" ? (
                                <p style={{ marginLeft: "20px" }}>
                                  {" "}
                                  <Icon name="tint" />
                                  fuel: include
                                </p>
                              ) : (
                                <p style={{ marginLeft: "20px" }}>
                                  {" "}
                                  <Icon name="tint" />
                                  fuel: exclude
                                </p>
                              )}
                            </div>
                            <div style={{ display: "inline-flex" }}>
                              {nap.delivery ? (
                                <p>
                                  <FaPeopleCarry />
                                  &nbsp;door delivery: yes
                                </p>
                              ) : (
                                <p style={{ marginLeft: "20px" }}>
                                  <FaPeopleCarry />
                                  delivery: no
                                </p>
                              )}
                              <p style={{ marginLeft: "20px" }}>
                                <a>
                                  <IoSpeedometerOutline />
                                  &nbsp;{nap.maxspeed} kmph
                                </a>
                              </p>

                              <p style={{ marginLeft: "20px" }}>
                                <a>
                                  <IoSpeedometerOutline />
                                  &nbsp;Model by: {nap.carcomp}
                                </a>
                              </p>
                            </div>
                            <p>{nap.descr}</p>
                            <div>
                              <Button.Group className="priceBar">
                                <Button>
                                  {" "}
                                  &#8377;{nap.price * 50} <br />{" "}
                                  <small> 50km </small>
                                </Button>

                                <Button>
                                  {" "}
                                  &#8377;{nap.price * 100}
                                  <br /> <small> 100km </small>
                                </Button>
                                <Button>
                                  &#8377;{nap.price * 150} <br />{" "}
                                  <small> 150km </small>
                                </Button>
                              </Button.Group>
                            </div>
                            <div></div>
                          </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button
                            color="black"
                            onClick={(e) => blynk(key, false)}
                          >
                            Exit
                          </Button>
                          <Button
                            content="Rent Now"
                            labelPosition="right"
                            icon="checkmark"
                            onClick={() => setOpen({ key: false })}
                            positive
                          />
                        </Modal.Actions>
                      </Modal>
                    </div>
                  </Card>
                ))}
              </Card.Group>
            )}
          </div>
        </div>
        {/* <ModalExampleModal state={open} /> */}
      </div>
    </div>
  );
  function blynk(props, crops) {
    arr[props] = crops;
    // console.log(arr)
    setOpen(arr);
  }
}

function useTimes() {
  const [times, setTimes] = useState([]);
  useEffect(() => {
    var newtimes;
    let count = 0;
    db.collection("rentals")
      .get()
      .then((snap) => {
        snap.docs.forEach((nap) => {
          if (nap.data().permission) {
            db.collection("rentals")
              .doc(nap.id)
              .collection("products")
              .get()
              .then((snap) => {
                newtimes = snap.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                setTimes((cap) => [...cap, ...newtimes]);
              });
          }
        });
      });
  }, []);
  return times;
}

function Empty() {
  return (
    <div>
      <p>this is empalyt</p>
    </div>
  );
}

export default Rentals;
