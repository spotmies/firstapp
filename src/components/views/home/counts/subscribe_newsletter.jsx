import React, { useRef, useState } from "react";
import {
  AiOutlineUserAdd,
  AiOutlineYoutube,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Input from "@material-ui/core/Input";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import FormHelperText from "@mui/material/FormHelperText";
import { CircularProgress } from "@material-ui/core";
import { newSuggestionRequest } from "../../../../api_services/api_calls/api_calls";
import { toast } from "react-toastify";
import { validateEmail } from "../../../../helpers/regex/regex";

export default function NewsLetter() {
  let body = {
    subject: "newsLetter",
    suggestionFor: "newsLetter",
  };
  const emailRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    console.log(emailRef.current.value);
    if (
      emailRef?.current?.value == null ||
      emailRef?.current?.value == "" ||
      emailRef?.current?.value == undefined
    ) {
      return alert("Please Enter Email");
    }
    if (!validateEmail(emailRef.current.value)) {
      return alert("Please Enter Valid Email");
    }
    body.email = emailRef.current.value;
    setLoading(true);
    const result = await newSuggestionRequest(body);
    setLoading(false);
    if (result) {
      clearField();
      return toast.success("Thanks for subscribing");
    }

    return toast.error("Something went wrong please try again");
  };
  const clearField = () => {
    emailRef.current.value = "";
  };
  return (
    <div className="center">
      <div className="show-card">
        <div className="show-card-content">
          <p className="head-center home-page-head">Stay tuned!</p>
          <p className="description">
            Subscribe our newsletter and get notifications to stay update.
          </p>

          <div className="center-div">
            <div className="input-div">
              <FormControl className="form-controler">
                <InputBase
                  // id="outlined-adornment-password"
                  inputRef={emailRef}
                  type="text"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  endAdornment={
                    <InputAdornment position="end">
                      {!loading ? (
                        <AiOutlineArrowRight
                          className="input-icon"
                          onClick={submit}
                        />
                      ) : (
                        <CircularProgress
                          className="input-icon"
                          color="inherit"
                        />
                      )}
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            {/* <div className="small-card">
              <AiOutlineUserAdd
                size="2.2rem"
                color="#008fdb"
                className="horizontal-spacer"
              />
              <p className="shead2">Join as service partner</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
