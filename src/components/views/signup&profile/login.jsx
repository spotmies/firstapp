import React, { Component, useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import "./login.css";
import { onlyNumRegEx } from "../../../helpers/regex/regex";
import FullScreenWidget from "../../reusable/helpers";
import firebase from "../../../firebase";
import { toast } from "react-toastify";
import { loginUser, newUser } from "../../controllers/login/login_controller";
import { connect } from "react-redux";
import { saveState } from "../../../helpers/localStorage";
import { constants } from "../../../helpers/constants";
import { useStores } from "../../stateManagement/index";
var loginDetails;
class Login extends Component {
  constructor(props) {
    super(props);
    // this.commonStore = useStores(this);
    this.state = {
      getOtpButton: true,
      submitButton: true,
      loader: false,
      numberController: React.createRef(),
      nameController: React.createRef(),
      otpController: React.createRef(),
      checkController: React.createRef(),
      otpSection: false,
      registrationSection: false,
      userName: null,

      allowedNumber: [
        8341980196, 8309708021, 8019933883, 7095695690, 9502831877, 7993613685,
        8330933883, 7075229282, 8919387141,
      ],
      userDetails: {},
      userRegistered: false,
    };
    this.genotp = this.genotp.bind(this);
  }
  //turn on off loader
  eventLoader = (value) => {
    this.setState({
      loader: value,
    });
  };

  genotp = (e) => {
    let phNumber = this.state.numberController.current.value;
    if (constants.restrictLogin) {
      if (!this.state.allowedNumber.includes(Number(phNumber))) {
        toast.info("Your number not allowed This web in demo");
        // return;
      }
    }
    if (phNumber.length < 10) {
      toast.warning("Enter valid Number");
      return;
    }
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    const phno = "+91" + phNumber;
    console.log(phno);
    firebase
      .auth()
      .signInWithPhoneNumber(phno, window.recaptchaVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        document.querySelector("#recaptcha-container").style.display = "none";
        document.querySelector("#otpSection").style.display = "block";
        return true;
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.code);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      });
  };

  verifyOtp = async () => {
    this.eventLoader(true);
    const otp = this.state.otpController.current.value;
    var data = await window.confirmationResult
      .confirm(otp)
      .then(async function (result) {
        console.log(result);
        loginDetails = result;
        let response = await loginUser(loginDetails.user.uid);
        if (response === false) {
          toast.info("Please enter your name to register");
          return "registerUser";
        } else {
          toast.info("Login Successfully");
          return response;
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
        return "inValidOtp";
      });
    console.log(data);
    this.setState({
      loader: false,
      registrationSection: data === "registerUser" ? true : false,
    });

    if (data !== "registerUser" && data !== "inValidOtp") {
      this.props.updateUser(data);
      saveState("userDetails", data);
      this.props.history.go(-1);
    }
  };

  handleChange = (e) => {
    const name = e.target.name;
    const state = this.state;
    const value = e.target.value;
    switch (name) {
      case "phone":
        if (onlyNumRegEx(value)) state.numberController.current.value = value;
        else {
          state.numberController.current.value = value.slice(
            0,
            value.length - 1
          );
        }
        if (state.numberController.current.value.length > 9) {
          this.setState({
            getOtpButton: false,
          });
        }

        break;
      case "otp":
        if (onlyNumRegEx(value)) state.otpController.current.value = value;
        else {
          state.otpController.current.value = value.slice(0, value.length - 1);
        }
        if (state.otpController.current.value.length === 6) this.verifyOtp();
        break;

      default:
        break;
    }
  };

  registerUser = async () => {
    loginDetails.user.name = this.state.nameController.current.value;
    if (loginDetails.user.name === null || loginDetails.user.name.trim() === "")
      return;
    this.eventLoader(true);
    let response = await newUser(loginDetails);
    this.eventLoader(false);
    if (response !== null) {
      this.props.updateUser(response);
      saveState("userDetails", response);
      toast.success("Registration Completed");
      this.setState({
        userDetails: response,
        userRegistered: true,
      });
      setTimeout(() => {
        this.props.history.go(-1);
      }, 1000);
    } else {
      toast.info("something went wrong");
    }
  };
  onCheck = () => {
    this.setState({
      submitButton: this.state.checkController.current.state.checked,
    });
  };
  render() {
    const state = this.state;
    console.log("screen started ......");
    return (
      <div>
        <FullScreenWidget
          type="loader"
          show={state.loader}
          data="Please Wait..."
        />
        <div className="loginForm" style={{ paddingTop: "60px" }}>
          <Form>
            <Form.Field>
              <label>Mobile Number</label>
              <input
                placeholder="Enter Phone number hrer"
                ref={state.numberController}
                maxLength="10"
                name="phone"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Button onClick={this.genotp} disabled={this.state.getOtpButton}>
              Get OTP
            </Button>
            <div id="recaptcha-container" style={{ marginTop: "10px" }}></div>

            <Form.Field id="otpSection" style={{ display: "none" }}>
              <label>Enter OTP</label>
              <input
                placeholder="Enter OTP here"
                ref={state.otpController}
                maxLength="6"
                name="otp"
                onChange={this.handleChange}
              />
            </Form.Field>

            {state.registrationSection ? (
              <>
                <Form.Field>
                  <label>Enter Name</label>
                  <input
                    placeholder="your Name"
                    ref={state.nameController}
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    label="I agree to the Terms and Conditions"
                    ref={state.checkController}
                    required
                    onClick={this.onCheck}
                  />
                </Form.Field>

                <Button
                  type="submit"
                  disabled={this.state.submitButton}
                  onClick={this.registerUser}
                >
                  Submit
                </Button>
                {this.state.userRegistered ? (
                  <LoginUser userDetails={this.state.userDetails} />
                ) : null}
              </>
            ) : null}
          </Form>
        </div>
        {/* <ReduxPersistent /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reduxStore: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (data) => {
      dispatch({ type: "UPDATE_USER_DETAILS", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

function LoginUser(props) {
  const { commonStore } = useStores();
  useEffect(() => {
    commonStore.setUserDetails(props.userDetails);
    commonStore.setUserLogin(true);
  }, []);
  return (
    <div>
      <h1>login successfully</h1>
    </div>
  );
}
