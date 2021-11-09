import React, { useRef, useState, useEffect } from "react";
import "../../../assets/css/careers.css";
import { apiPostPut } from "../../../api_services/api_calls/api_calls";
import firebase from "../../../firebase";

import "firebase/storage";
import SuccessForm from "../careers/successForm";
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
import Banner from "../../../images/careers-banner.jpg";
import constants from "../../../helpers/constants";
import { allowOnlyNumber } from "../../../helpers/regex/regex";
import { CircularProgress } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}
const storage = firebase.storage();

export default function Careers() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const cityRef = useRef("");
  const commentRef = useRef("");
  const collegeRef = useRef("");
  const moreLangugaesRef = useRef("");
  const [languagesKnown, setlanguagesKnown] = useState([]);
  const [previousExperience, setpreviousExperience] = useState([]);
  const [monthsOfExperience, setmonthsOfExperience] = useState("none");
  const [rateYourself, setrateYourself] = useState(1);
  const [isCompleted, setisCompleted] = useState(false);
  const [submitAgain, setsubmitAgain] = useState(false);

  const [applyingFor, setApplyingFor] = useState("");
  const [addMoreLang, setAddMoreLang] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");
  // create arrow function to handle form submit
  const handleSubmit = async (resumeLinkk) => {
    console.log(languagesKnown);
    if (addMoreLang) {
      languagesKnown.push(moreLangugaesRef.current.value);
    }
    console.log(nameRef.current.value);
    console.log(emailRef.current.value);
    console.log(phoneRef.current.value);
    console.log(cityRef.current.value);
    console.log(commentRef.current.value);
    console.log(applyingFor);
    console.log(languagesKnown);
    console.log(previousExperience);
    console.log(monthsOfExperience);
    console.log(rateYourself);
    var body = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      phone: phoneRef.current?.value,
      programmingLanguage: languagesKnown,
      previousExperience: previousExperience,
      isGraduate: true,
      address: cityRef.current?.value,
      college: collegeRef.current?.value,
      company: "spotmies",
      description: commentRef.current?.value,
      appliedFor: applyingFor,
      createdAt: new Date().valueOf(),
      createdFrom: "web",
      monthsOfExperience: monthsOfExperience,
      resume: resumeLinkk,
      rateYourselfOnTechnology: rateYourself,
    };
    console.log(body);
    setSubmitting(true);
    let path = constants.api.NEW_INTERN_REGISTRATION;
    let result = await apiPostPut(body, path, "POST");
    console.log(result);
    if (result != null) {
      setisCompleted(true);
    }
    setSubmitting(false);
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];

    if (image) {
      const file = image;
      var pattern = /.pdf/;

      if (!file.type.match(pattern)) {
        alert("Please upload PDF format only");
        return;
      } else {
        console.log("working");
        setImageAsFile(file);
      }

      // here you can do whatever you want with your image. Now you are sure that it is an image
    }
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    if (applyingFor === "") {
      alert("Please select the position you are applying for");
      return;
    }
    console.log("start of upload");
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      alert("Please upload your resume in PDF format");
      return;
    }
    setSubmitting(true);
    const uploadTask = storage
      .ref(`/inters/resumes/${imageAsFile.name}`)
      .put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("inters/resumes")
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            console.log(fireBaseUrl);
            setSubmitting(false);
            handleSubmit(fireBaseUrl);
          });
      }
    );
  };

  const handleChange = (value, arrayName, state) => {
    if (arrayName === "languagesKnown") {
      if (state === "add") {
        setlanguagesKnown((oldArray) => [...oldArray, value]);
      } else {
        // languagesKnown.splice(languagesKnown.indexOf(value), 1);
        setlanguagesKnown(languagesKnown.filter((item) => item !== value));
      }
    } else if (arrayName === "previousExperience") {
      if (state === "add") {
        //  previousExperience.push(value);
        setpreviousExperience((oldArray) => [...oldArray, value]);
      } else {
        //previousExperience.splice(previousExperience.indexOf(value), 1);
        setpreviousExperience(
          previousExperience.filter((item) => item !== value)
        );
      }
    }
    console.log(languagesKnown);
    console.log(previousExperience);
  };

  useEffect(() => {
    if (submitAgain) {
      setlanguagesKnown([]);
      setpreviousExperience([]);
      setmonthsOfExperience("none");
      setrateYourself(1);
      setisCompleted(false);
      setsubmitAgain(false);
      setApplyingFor("");
      setAddMoreLang(false);
      setImageAsFile("");
      setSubmitting(false);
    }
  }, [submitAgain]);

  const formAgain = () => {
    console.log("form again");
    setsubmitAgain(true);
  };
  const prefixField = () => {
    cityRef.current.value = "vizag";
  };
  return (
    <div className="careers">
      {isCompleted ? (
        <SuccessForm submitFormAgain={formAgain} />
      ) : (
        <Box
          component="form"
          // sx={{
          //   "& .MuiTextField-root": { m: 1, width: "25ch" },
          // }}
          // noValidate
          autoComplete="on"
          onSubmit={handleFireBaseUpload}
        >
          <div className="careers-div">
            <img src={Banner} alt="banner" className="Banner" />

            <p className="career-heading">
              Make your first step towards a better future with us.
            </p>
            <div className="form-card">
              <TextField
                required
                id="standard-required"
                label="Name"
                // defaultValue="Hello World"
                placeholder="ENTER YOUR NAME HERE"
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
                type="email"
                inputRef={emailRef}
                // defaultValue="Hello World"
                placeholder="ENTER YOUR EMAIL ADDRESS HERE"
                variant="standard"
                className="TextField"
              />{" "}
            </div>

            <div className="form-card">
              <TextField
                required
                id="standard-required"
                label="College Name"
                inputRef={collegeRef}
                // defaultValue="Hello World"
                placeholder="ENTER YOUR COLLEGE NAME"
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
                // defaultValue="Hello World"
                placeholder="ENTER YOUR CITY NAME"
                variant="standard"
                className="TextField"
              />{" "}
              <small
                onClick={prefixField}
                style={{
                  cursor: "pointer",
                  color: "grey",
                  // position: "absolute",
                }}
              >
                {/* Submit Form */}

                <b className="local">
                  From &nbsp;
                  <u> vizag</u>
                </b>
              </small>
            </div>

            <div className="form-card">
              <TextField
                required
                id="standard-required"
                label="Contact Number"
                inputRef={phoneRef}
                onChange={allowOnlyNumber}
                inputProps={{ maxLength: 10, minLength: 10 }}
                // defaultValue="Hello World"
                placeholder="ENTER YOUR CONTACT NUMBER"
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

            <div className="form-card">
              <FormControl fullWidth className="TextField" required>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Applying for?
                </InputLabel>
                <NativeSelect
                  label="Applying for?"
                  onChange={(e) => {
                    setApplyingFor(e.target.value);
                  }}
                  // defaultValue="React Js"
                  inputProps={{
                    name: "applying",
                    id: "uncontrolled-native",
                  }}
                >
                  <option value="none" hidden>
                    Please select here
                  </option>
                  <option value="React Js">React.js</option>
                  <option value="Flutter">Flutter</option>
                  <option value="Designing">Designer</option>
                </NativeSelect>
              </FormControl>
            </div>

            <div className="Checks form-card">
              <h5 className="Labels">
                Rate yourself, How good you are in {applyingFor} ?
              </h5>
              <Slider
                onChange={(e) => {
                  setrateYourself(e.target.value);
                }}
                aria-label="Small steps"
                defaultValue={1}
                getAriaValueText={valuetext}
                step={1}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                className="slider"
              />
            </div>

            <div className="Checks form-card">
              <h5 className="Labels">Languages / Frameworks Known?</h5>
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
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setAddMoreLang(e.target.checked ? true : false);
                      }}
                    />
                  }
                  label="Other"
                  className="slider"
                />
              </FormGroup>
              {addMoreLang ? (
                <div className="moreLange">
                  <TextField
                    id="standard-required"
                    label="others"
                    inputRef={moreLangugaesRef}
                    // defaultValue="Hello World"
                    placeholder="Enter more"
                    variant="standard"
                  />
                </div>
              ) : null}
            </div>

            {/* <TextField
            required
            id="standard-required"
            label="Rate youself, How good you are in react.js?"
            defaultValue="Hello World"
            variant="standard"
            className="TextField"
          /> */}

            {/* <TextField
            required
            id="standard-required"
            label="Months of experience in react.js"
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
                  label="None of the above 'I AM STUDENT' "
                  className="slider"
                />
              </FormGroup>
            </div>

            <div className="Checks form-card">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  experience in {applyingFor} ?
                </FormLabel>
                <RadioGroup
                  aria-label="experience"
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setmonthsOfExperience(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="1-6"
                    control={<Radio />}
                    label="1 to 6 months"
                  />
                  <FormControlLabel
                    value="6-12"
                    control={<Radio />}
                    label="6 to 12 months"
                  />

                  <FormControlLabel
                    value=">12"
                    control={<Radio />}
                    label="Above 12 months"
                  />
                  <FormControlLabel
                    value="none"
                    control={<Radio />}
                    label="No Experience"
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
              <h5 className="Labels">Upload Resume</h5>
              {/* accept pdf only */}
              <input
                type="file"
                onChange={handleImageAsFile}
                className="TextField1"
                label="Upload Resume"
                accept=".pdf"
                required
              />
            </div>

            <div className="form-card">
              <TextField
                id="standard-required"
                label="Portfolio links"
                inputRef={commentRef}
                // defaultValue="Hello World"
                placeholder="SHARE YOUR PORTFOLIO LINKS (ex: github,linkedIn etc..,)"
                variant="standard"
                className="TextField"
              />
            </div>

            <Button variant="contained" className="Submit" type="submit">
              {/* Submit Form */}
              {submitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
