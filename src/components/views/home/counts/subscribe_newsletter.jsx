import React from "react";
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

export default function NewsLetter() {
  return (
    <div className="center">
      <div className="show-card">
        <div className="show-card-content">
          <p className="head-center">Subscribe our news letter</p>
          <p className="description">
            Turn your idea into incredebil business with 30 days trial period.
          </p>

          <div className="center-div">
            <div className="input-div">
              <FormControl className="form-controler">
                <InputBase
                  // id="outlined-adornment-password"
                  type="text"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  endAdornment={
                    <InputAdornment position="end">
                      <AiOutlineArrowRight className="input-icon" />
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
