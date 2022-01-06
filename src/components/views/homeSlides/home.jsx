import React from "react";
import "./home.css";
import img1 from "./loc1.svg";
import { FaGooglePlay } from "react-icons/fa";
// import Select from "@mui/material/Select";
// import { Button, Card, Image, Dropdown, Icon } from "semantic-ui-react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import pic from "./pic.svg";
import pic2 from "./pic2.svg";
import pic3 from "./pic3.svg";

function Home() {
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="MainDiv">
      <section className="setLoc">
        <div className="locPic">
          <img src={img1} alt="location1" />
        </div>
        <div className="loc-div">
          <h2 className="loc-h2">
            SET <br /> YOUR <br /> LOCATION
          </h2>
          <p>To Know About The Services That Are Available In Your City.</p>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}
            style={{ textAlign: "left" }}
            className="form"
          >
            <InputLabel id="demo-controlled-open-select-label">
              Your Location
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={age}
              label="Your Location"
              onChange={handleChange}
              style={{ width: "100%;", textAlign: "left;" }}
            >
              <MenuItem value={10}>Seethamadhara</MenuItem>
              <MenuItem value={20}>Maddilapalem</MenuItem>
              <MenuItem value={30}>Gajuwaka</MenuItem>
            </Select>
          </FormControl>
        </div>
      </section>

      <section className="sec2">
        <h2>What we have</h2>
        <div className="locCard">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="locCard">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>

      <section className="step-sec">
        <h2>Steps</h2>
        <div className="step-div">
          <div className="step-card">
            <div>
              <h2>TAKE A PICTURE</h2>
              <p>
                Capture the issue you are facing and let the solution come to
                your place.
              </p>
            </div>
            <img src={pic} alt="" />
          </div>
          <div className="step-card">
            <div>
              <h2>SET LOCATION</h2>
              <p>Share your location and we share our service.</p>
            </div>

            <img src={pic2} alt="" />
          </div>
          <div  className="step-card">
            <div>
              <h2>GET QUOTE</h2>
              <p>Choice of cost is yours and service is ours.</p>
            </div>

            <img src={pic3} alt="" />
          </div>
        </div>
      </section>

      <section className="foot">
        <h2>Get the App</h2>
        <p>
          <FaGooglePlay className="psIcon" />
          &nbsp;&nbsp; Play Store
        </p>
      </section>
    </div>
  );
}

export default Home;
