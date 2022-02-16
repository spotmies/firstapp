import React, { useState, useRef } from "react";
import { Button, Form } from "semantic-ui-react";
import Fade from "react-reveal/Fade";
import "../../../../assets/css/partner.css";

import { toast } from "react-toastify";
import { Observer } from "mobx-react";
import Select2 from "react-select";
import { useStores } from "../.././../stateManagement/index";
import { apiPostPut } from "../../../../api_services/api_calls/api_calls";
import constants from "../../../../helpers/constants";

export default function PartnerRegistrationForm(props) {
  const ref1 = useRef(null);
  const [pcate, spcate] = useState(null);
  const [sbtn, setsbtn] = useState(false);
  const name = useRef(null);
  const mobile = useRef(null);
  const otherProfession = useRef(null);
  const [showOtherProfession, setShowOtherProfession] = useState(false);
  const { services } = useStores();

  const handleChange2 = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    spcate(selectedOption);
    if (selectedOption.serviceId == 100) {
      setShowOtherProfession(true);
    } else {
      setShowOtherProfession(false);
    }
  };

  const handleChange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
    } else {
      e.target.value = e.target.value.slice(0, -1);
    }
  };

  const formsubmit = async () => {
    console.log(otherProfession);
    let pnum = mobile.current.value;
    let pname = name.current.value;
    if (pnum.length === 10 && pcate !== null) {
      setsbtn(true);
      let pcatee = showOtherProfession
        ? otherProfession?.current?.value
        : pcate.serviceId;
      let body = {
        subject: "Partner Request",
        suggestionFor: "partnerRegistration",
        name: pname,
        mobile: pnum,
        suggestionFrom: "userWeb",
        others: pcatee,
        createdAt: new Date().valueOf(),
      };
      console.log(body);
      await partprereg(body);
    } else {
      if (pnum.length < 10) toast.warning("enter valid number");
      else if (pcate === null) toast.warning("please select your profession");
    }
  };
  const clearfield = () => {
    spcate(null);

    setsbtn(false);
    document.getElementById("pname").value = "";
    document.getElementById("pnum").value = "";
  };
  async function partprereg(details) {
    const result = await apiPostPut(
      details,
      constants.api.new_suggestion,
      "POST"
    );
    if (result != null) {
      clearfield();
      toast.info("Thank you we will contact you soon...");
      if (props.onSuccess === null || props.onSuccess === undefined) return;
      props?.onSuccess(true);
    } else {
      toast.info("please try again");
      setsbtn(false);
    }
  }
  return (
    <Observer>
      {() => (
        <>
          <Fade>
            <div ref={ref1} className="reg-form-div">
              {/* <p className="head home-page-head">Become a Service Partner</p> */}
              <Form onSubmit={formsubmit}>
                <Form.Field>
                  {/* <label>
            <b>Select your Profession</b>
          </label> */}
                  <Select2
                    placeholder="Select your Profession"
                    value={pcate}
                    onChange={handleChange2}
                    options={services.mainServicesList}
                    // style={{ zIndex: "1" }}
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    className="reg-form-select"
                  />
                </Form.Field>
                {showOtherProfession ? (
                  <Form.Field>
                    {/* <label>Enter Your profession</label> */}
                    <input
                      placeholder="Enter Your profession"
                      ref={otherProfession}
                      maxLength="40"
                      required
                    />
                  </Form.Field>
                ) : null}
                <Form.Field>
                  {/* <label>First Name</label> */}
                  <input
                    placeholder="First Name"
                    id="pname"
                    name="pname"
                    ref={name}
                    maxLength="25"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  {/* <label>Mobile Number</label> */}
                  <input
                    ref={mobile}
                    onClick={handleChange}
                    name="pnum"
                    id="pnum"
                    onChange={handleChange}
                    placeholder="Mobile Numer"
                    maxLength="10"
                    required
                  />
                </Form.Field>
                {sbtn === false ? (
                  <Button primary type="submit" className="sub-button">
                    Submit
                  </Button>
                ) : (
                  <Button loading primary>
                    Submit
                  </Button>
                )}
              </Form>
            </div>
          </Fade>
        </>
      )}
    </Observer>
  );
}
