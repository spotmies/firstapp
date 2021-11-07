import React from "react";
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
          <img src={Banner} alt="banner" className="Banner" />
          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Name"
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />{" "}
          </div>

          <div className="form-card">
            <TextField
              required
              id="standard-required"
              label="Email"
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
              <RadioGroup aria-label="experience" name="radio-buttons-group">
                <FormControlLabel
                  value="1 to 4 months"
                  control={<Radio />}
                  label="1 to 4 months"
                />
                <FormControlLabel
                  value="4 to 8 months"
                  control={<Radio />}
                  label="4 to 8 months"
                />
                <FormControlLabel
                  value="8 to 12 months"
                  control={<Radio />}
                  label="8 to 12 months"
                />
                <FormControlLabel
                  value="Above 12 months"
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
                control={<Checkbox />}
                label="Internship"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Job"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Freelancer"
                className="slider"
              />

              <FormControlLabel
                control={<Checkbox />}
                label="Learning"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="None of the above"
                className="slider"
              />
              <FormControlLabel
                control={<Checkbox />}
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
                defaultValue="React.js"
                inputProps={{
                  name: "applying",
                  id: "uncontrolled-native",
                }}
              >
                <option value="react">React.js</option>
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
              defaultValue="Hello World"
              variant="standard"
              className="TextField"
            />
          </div>

          <Button variant="contained" className="Submit">
            Submit Form
          </Button>
        </div>
      </Box>
    </div>
  );
}
