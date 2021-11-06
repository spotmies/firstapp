import React from "react";
import "../../../assets/css/careers.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

export default function Careers() {
  return (
    <div className="careers">
      <Box
        component="form"
        // sx={{
        //   "& .MuiTextField-root": { m: 1, width: "25ch" },
        // }}
        noValidate
        autoComplete="off"
      >
        <div className="careers-div">
          <TextField
            required
            id="standard-required"
            label="Name"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "}
          <br />
          <TextField
            required
            id="standard-required"
            label="Email"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "}
          <br />
          <TextField
            required
            id="standard-required"
            label="City/District"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "}
          <br />
          <TextField
            required
            id="standard-required"
            label="Contact Number"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "}
          <br />
          {/* <TextField
            required
            id="standard-required"
            label="Languages known"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "} */}
          <div className="Checks">
            <h5>Languages Known?</h5>
            <FormGroup className="Checks TextField">
              <FormControlLabel
                control={<Checkbox />}
                label="HTML5"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Css3"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="React.js"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Others"
                className="slider"
              />
            </FormGroup>
          </div>
          <br />
          {/* <TextField
            required
            id="standard-required"
            label="Rate youself, How good you are in react.js?"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          /> */}
          <div className="Checks">
            <h5>Rate yourself, How good you are in React.js?</h5>
            <Slider
              aria-label="Small steps"
              defaultValue={10}
              getAriaValueText={valuetext}
              step={1}
              marks
              min={0}
              max={10}
              valueLabelDisplay="auto"
              className="slider"
            />
          </div>
          <br />
          <TextField
            required
            id="standard-required"
            label="Months of experience in react.js"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />
          <br />
          <TextField
            required
            id="standard-required"
            label="Previous experiences?"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />
          <br />
          <TextField
            required
            id="standard-required"
            label="Upload Resume"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />
          <br />
          <TextField
            required
            id="standard-required"
            label="Comments"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />
          <br />
        </div>
      </Box>
    </div>
  );
}
