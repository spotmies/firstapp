import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import PartnerRegistrationForm from "../partner_registration_form/registration_form";

export default function PartnerSlide1() {
  const [showForm, setShowForm] = React.useState(false);
  const closeForm = () => {
    setShowForm(false);
  };
  const openForm = () => {
    setShowForm(true);
  };

  return (
    <div className="center">
      <div className="benefits2 slide-1">
        <div className="main-content">
          <div className="content">
            <p className="head home-page-head">
              Easy To Provide Service Online.
            </p>
            <div className="spacer-span" />
            <div className="spacer-span" />
            <p className="description">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text.
            </p>
            <div className="slide-button">
              <div className="get-started-btn">
                <span>
                  <p>Get started</p>
                </span>
              </div>
              <div
                className={
                  showForm
                    ? "get-started-btn get-started-btn-fill"
                    : "get-started-btn"
                }
                onClick={() => {
                  showForm ? closeForm() : openForm();
                }}
              >
                <span>
                  <p>Click Here To Join</p>
                </span>
              </div>
            </div>

            {showForm ? (
              <div className="partner-reg-form">
                <PartnerRegistrationForm onSuccess={closeForm} />
              </div>
            ) : null}
            <div className="spacer-span" />
            <div className="spacer-span" />
            <p>
              Get App on Playstore&nbsp;&nbsp;
              <FaGooglePlay size="1rem" color="gray" />{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
