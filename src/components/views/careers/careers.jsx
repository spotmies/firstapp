import React, { useRef } from "react";
import "../../../assets/css/careers.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import Banner from "../../../images/35_writing.png";

function valuetext(value) {
  return `${value}°C`;
}

export default function Careers() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const cityRef = useRef("");
  const commentRef = useRef("");

  var appliedFor = "reactJs";
  var languagesKnown = [];
  var previousExperience = [];
  var monthsOfExperience = "1-4";
  var rateYourself = 0;

  // create arrow function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(phoneRef.current.value);
    console.log(cityRef.current.value);
    console.log(commentRef.current.value);
    console.log(appliedFor);
    console.log(languagesKnown);
    console.log(previousExperience);
    console.log(monthsOfExperience);
    console.log(rateYourself);
  };

  const handleChange = (value, arrayName, state) => {
    if (arrayName === "languagesKnown") {
      if (state === "add") {
        languagesKnown.push(value);
      } else {
        languagesKnown.splice(languagesKnown.indexOf(value), 1);
      }
    } else if (arrayName === "previousExperience") {
      if (state === "add") {
        previousExperience.push(value);
      } else {
        previousExperience.splice(previousExperience.indexOf(value), 1);
      }
    }
    console.log(languagesKnown);
    console.log(previousExperience);
  };

  return (
    <div className="careers">
      <Box
        component="form"
        // sx={{
        //   "& .MuiTextField-root": { m: 1, width: "25ch" },
        // }}
        // noValidate
        autoComplete="on"
        onSubmit={handleSubmit}
      >
        <div className="careers-div">
          <img src={Banner} alt="banner" className="Banner" />
          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Name"
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
              inputRef={nameRef}
            />{" "}
          </div>

          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Email"
              inputRef={emailRef}
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />{" "}
          </div>

          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="City/District"
              inputRef={cityRef}
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />{" "}
          </div>

          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Contact Number"
              inputRef={phoneRef}
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />{" "}
          </div>

          {/* <TextField
            required
            id="standard-required"
            label="Languages known"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          />{" "} */}
          <div className="Checks form-card">
            <h5 className="Labels">Languages Known?</h5>
            <FormGroup className="Checks TextField1">
              <FormControlLabel
                control={
                  <Checkbox
                    value="reactJs"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "languagesKnown",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="React Js"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="flutter"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "languagesKnown",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Flutter"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="node Js"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "languagesKnown",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Node Js"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Other"
                className="slider"
              />
            </FormGroup>
          </div>

          {/* <TextField
            required
            id="standard-required"
            label="Rate youself, How good you are in react.js?"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          /> */}
          <div className="Checks form-card">
            <h5 className="Labels">
              Rate yourself, How good you are in React.js?
            </h5>
            <Slider
              onChange={(e) => {
                rateYourself = e.target.value;
              }}
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

          {/* <TextField
            required
            id="standard-required"
            label="Months of experience in react.js"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          /> */}
          <div className="Checks form-card">
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Months of experience in react.js?
              </FormLabel>
              <RadioGroup
                aria-label="experience"
                name="radio-buttons-group"
                onChange={(e) => {
                  monthsOfExperience = e.target.value;
                }}
              >
                <FormControlLabel
                  value="1-4"
                  control={<Radio />}
                  label="1 to 4 months"
                />
                <FormControlLabel
                  value="4-8"
                  control={<Radio />}
                  label="4 to 8 months"
                />
                <FormControlLabel
                  value="8-12"
                  control={<Radio />}
                  label="8 to 12 months"
                />
                <FormControlLabel
                  value=">12"
                  control={<Radio />}
                  label="Above 12 months"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* <TextField
            required
            id="standard-required"
            label="Previous experiences?"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          /> */}
          <div className="Checks form-card">
            <h5 className="Labels">Previous Experience?</h5>
            <FormGroup className="Checks TextField1">
              <FormControlLabel
                control={
                  <Checkbox
                    value="internship"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Internship"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="job"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Job"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="freelancer"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Freelancer"
                className="slider"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    value="learning"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Learning"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="none"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="None of the above"
                className="slider"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="other"
                    onChange={(e) => {
                      handleChange(
                        e.target.value,
                        "previousExperience",
                        e.target.checked ? "add" : "remove"
                      );
                    }}
                  />
                }
                label="Others"
                className="slider"
              />
            </FormGroup>
          </div>

          <div className="form-card">
            <FormControl fullWidth className="TextField">
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Applying for?
              </InputLabel>
              <NativeSelect
                onChange={(e) => {
                  appliedFor = e.target.value;
                }}
                defaultValue="reactJs"
                inputProps={{
                  name: "applying",
                  id: "uncontrolled-native",
                }}
              >
                <option value="reactJs">React.js</option>
                <option value="flutter">Flutter</option>
                <option value="designer">Designer</option>
              </NativeSelect>
            </FormControl>
          </div>

          <div className="Checks form-card">
            <h5 className="Labels">Upload Resume</h5>

            <input type="file" className="TextField1" label="Upload Resume" />
          </div>

          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Comments"
              inputRef={commentRef}
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />
          </div>

          <Button variant="contained" className="Submit" type="submit">
            Submit Form
          </Button>
        </div>
      </Box>
    </div>
  );
}
